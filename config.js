// Supabase 連線設定。anon 公開金鑰本來就可以放在網頁裡，
// 資料安全由資料庫的權限規則（RLS）控制：學員只能新增，只有登入的講師能讀取。
// 兩個欄位留空時，頁面會進入「展示模式」，資料只存在這台瀏覽器。
window.SURVEY_CONFIG = {
  SUPABASE_URL: "https://gephvsaonvevjvgfgrbk.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlcGh2c2FvbnZldmp2Z2ZncmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUwNzgyODgsImV4cCI6MjExMDY1NDI4OH0.Y2uvbyauk4ErZyLVViG2vJCPW51nN17-lvBdoWqUdug"
};
