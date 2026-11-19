# AI 運用現況調查系統

純 HTML，部署在 GitHub Pages，資料存在 Supabase（免費方案）。

| 檔案 | 用途 |
|---|---|
| `index.html` | 學員填寫頁（免登入） |
| `admin.html` | 講師即時結果頁（需登入，上課時展示） |
| `questions.js` | 題目設定，改題目只改這裡 |
| `config.js` | 填入 Supabase 網址與 anon 金鑰 |
| `supabase-setup.sql` | 建立資料表與權限規則 |

## 安全設計
- 學員只能新增資料，無法讀取任何人的答案。
- 只有登入的講師帳號能讀取、匯出。
- `config.js` 的 anon 金鑰是公開金鑰，放在網頁裡正常；**不要**放 service_role 金鑰。

## 設定步驟
1. 到 supabase.com 建立免費專案。
2. SQL Editor 貼上 `supabase-setup.sql` 執行。
3. Authentication → Users → Add user，建立你自己的講師帳號（Email＋密碼）。
4. Authentication → Sign In / Providers → 關閉「Allow new users to sign up」，避免別人自行註冊後讀取資料。
5. Project Settings → API，複製 Project URL 與 anon public key，填進 `config.js`。
6. 推上 GitHub，Settings → Pages → 選 main 分支與根目錄（或此資料夾）。
7. 學員連結：`https://<帳號>.github.io/<倉庫>/`；講師頁：`.../admin.html`。

## 本機測試
`config.js` 留空時是展示模式，資料只存在瀏覽器；`admin.html` 可按「加入 25 筆範例資料」預覽圖表。
