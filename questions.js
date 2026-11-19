// 問卷題目設定：學員頁與結果頁共用。要改題目只需要改這個檔案。
window.SURVEY = {
  title: "AI 運用現況調查",
  intro: "這份問卷是匿名的，不限時間，填完大約 5 到 6 分鐘。上課時老師會一起看整體結果，你的答案會幫助我們調整課程內容。",
  sections: [
    {
      title: "A. 基本背景",
      questions: [
        { id: "job", type: "single", title: "你目前的工作性質？", required: true,
          options: ["自己經營事業或品牌", "公司內的行銷或營運", "專業服務（顧問、設計、講師等）", "其他受雇工作", "學生或轉職準備中"] }
      ]
    },
    {
      title: "B. 工具與使用程度",
      questions: [
        { id: "tools", type: "multi", sort: true, required: true,
          title: "你用過或正在用哪些 AI 工具？（可多選）",
          groups: [
            { name: "對話型助理", options: ["ChatGPT", "Claude", "Gemini", "Copilot（微軟）", "Perplexity", "Grok", "DeepSeek", "Meta AI", "Kimi、通義千問等中文模型"] },
            { name: "研究與知識整理", options: ["NotebookLM", "Notion AI", "Gamma（簡報）"] },
            { name: "圖像生成與設計", options: ["Midjourney", "ChatGPT 或 DALL·E 生圖", "Nano Banana（Gemini 生圖）", "Canva AI", "Adobe Firefly", "Leonardo、Stable Diffusion 等"] },
            { name: "影音與音樂", options: ["Sora", "Veo", "Runway", "Kling（可靈）", "剪映或 CapCut AI", "HeyGen 或 D-ID（數位人）", "ElevenLabs（語音）", "Suno 或 Udio（音樂）"] },
            { name: "程式與 Agent", options: ["Claude Code", "Cursor", "GitHub Copilot", "Codex", "Lovable、Bolt、v0 等（AI 網站生成）"] },
            { name: "自動化與串接", options: ["Make", "n8n", "Zapier", "自己建的 GPTs、Gems 或 Skills"] },
            { name: "其他", options: ["其他工具", "都還沒用過"] }
          ] },
        { id: "freq", type: "single", required: true, title: "你使用 AI 的頻率？",
          options: ["幾乎每天，每天多次", "每週數次", "每月數次", "偶爾試試", "從未使用"] },
        { id: "level", type: "single", required: true, title: "哪一句最接近你現在的使用程度？",
          options: [
            "1. 只聽過，還沒開始用",
            "2. 偶爾問問題，像搜尋引擎",
            "3. 會寫提示詞，產出文案、翻譯、摘要",
            "4. 已經固定融入工作流程",
            "5. 建立自己的流程、GPTs 或 Skills，或串接自動化",
            "6. 讓 AI 自動跑任務，或開發工具給別人用"
          ] },
        { id: "paid", type: "single", required: true, title: "目前的付費狀況？",
          options: ["全部使用免費版", "付費 1 個工具", "付費 2 個以上", "公司有提供"] }
      ]
    },
    {
      title: "C. 怎麼用 AI",
      questions: [
        { id: "mode", type: "multi", max: 3, required: true, title: "你主要的使用方式？（最多選 3 項）",
          options: ["一問一答對話", "上傳檔案或圖片請它分析", "生成簡報", "生成網頁或網站", "生成圖片或影片",
                    "使用 Agent（讓 AI 自己多步驟執行任務）", "串接自動化流程", "自己開發 AI 應用或工具", "都還沒用過"] },
        { id: "scene", type: "multi", max: 3, required: true, title: "你主要拿 AI 做什麼？（最多選 3 項）",
          options: ["寫文案或貼文", "研究與整理資料", "客服或客戶溝通", "數據分析或報表", "寫程式或做網站", "翻譯與語言", "規劃與決策輔助", "其他"] },
        { id: "git", type: "single", required: true, title: "你對 Git 版本控制的熟悉程度？",
          options: [
            "1. 沒聽過 Git",
            "2. 聽過，但不知道在做什麼",
            "3. 會 commit、push（上傳、下載檔案）",
            "4. 會用分支（branch），也開過 Pull Request（PR）",
            "5. 日常協作都用 Git，也會請 AI 幫忙 commit 或開 PR"
          ] }
      ]
    },
    {
      title: "D. 困難與期待",
      questions: [
        { id: "block", type: "multi", max: 2, required: true, title: "你覺得用 AI 最大的卡關是什麼？（最多選 2 項）",
          options: ["不知道該從哪裡開始", "提示詞寫不好，結果不如預期", "產出品質不穩定，需要大量修改", "擔心資料安全與隱私",
                    "工具太多，不知道選哪個", "沒時間學習", "無法接進現有工作流程"] },
        { id: "confidence", type: "scale", required: true, title: "你對自己使用 AI 的信心程度？",
          min: 1, max: 5, minLabel: "完全沒信心", maxLabel: "可以教別人" },
        { id: "wish", type: "text", required: false, hidden: true,
          title: "這堂課你最想解決的一件事？（選填）" }
      ]
    }
  ]
};
