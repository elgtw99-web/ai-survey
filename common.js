// 資料存取層：有設定 Supabase 就用雲端，沒有就用瀏覽器本機（展示模式）。
(function () {
  const cfg = window.SURVEY_CONFIG || {};
  const LIVE = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase);
  const sb = LIVE ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;
  const DEMO_KEY = "ai_survey_demo_rows";

  const readDemo = () => { try { return JSON.parse(localStorage.getItem(DEMO_KEY) || "[]"); } catch (e) { return []; } };

  window.Store = {
    live: LIVE,
    sb,
    async submit(nickname, answers) {
      if (LIVE) {
        // 不回傳資料（學員沒有讀取權限），只需要確認寫入成功
        const { error } = await sb.from("responses").insert({ nickname: nickname || null, answers });
        if (error) throw error;
      } else {
        const rows = readDemo();
        rows.push({ id: String(Date.now()) + Math.random().toString(36).slice(2, 6), created_at: new Date().toISOString(), nickname: nickname || null, answers });
        localStorage.setItem(DEMO_KEY, JSON.stringify(rows));
      }
    },
    async fetchAll() {
      if (LIVE) {
        const { data, error } = await sb.from("responses").select("*").order("created_at", { ascending: true }).limit(5000);
        if (error) throw error;
        return data;
      }
      return readDemo();
    },
    // 有新資料就通知；同時用輪詢當備援，避免即時連線中斷
    subscribe(onChange) {
      if (LIVE) {
        sb.channel("responses-live")
          .on("postgres_changes", { event: "*", schema: "public", table: "responses" }, onChange)
          .subscribe();
      } else {
        window.addEventListener("storage", onChange);
      }
      setInterval(onChange, 15000);
    },
    async deleteAll() {
      if (LIVE) {
        const { error } = await sb.from("responses").delete().neq("id", "00000000-0000-0000-0000-000000000000");
        if (error) throw error;
      } else {
        localStorage.removeItem(DEMO_KEY);
      }
    },
    seedDemo(n) {
      const S = window.SURVEY, rows = readDemo();
      const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
      const picks = (arr, k) => [...arr].sort(() => Math.random() - 0.5).slice(0, k);
      for (let i = 0; i < n; i++) {
        const a = {};
        S.sections.forEach((s) => s.questions.forEach((q) => {
          const opts = q.groups ? q.groups.flatMap((g) => g.options) : q.options;
          if (q.type === "single") a[q.id] = pick(opts);
          else if (q.type === "multi") a[q.id] = picks(opts, 1 + Math.floor(Math.random() * (q.max || 4)));
          else if (q.type === "scale") a[q.id] = 1 + Math.floor(Math.random() * 5);
          else a[q.id] = Math.random() > 0.5 ? "想學會用 AI 省時間" : "";
        }));
        rows.push({ id: "demo" + i + Date.now(), created_at: new Date().toISOString(), nickname: Math.random() > 0.5 ? "學員" + (i + 1) : null, answers: a });
      }
      localStorage.setItem(DEMO_KEY, JSON.stringify(rows));
    }
  };
})();
