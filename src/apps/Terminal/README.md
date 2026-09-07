# Terminal 元件說明

## 結構
- `Terminal.jsx`：主要的 Terminal UI 元件，管理輸出行、指令歷史、Tab 補完與 Ctrl+C。
- `TerminalInput.jsx`：處理使用者輸入（Enter 送出、↑↓ 翻歷史、Tab 補完、Ctrl+C 中斷）。
- `TerminalOutput.jsx`：顯示單行輸出；輸入行會記住執行當下的路徑。
- `commands.jsx`：指令對應表與 `completeInput()` 補完邏輯。
- `terminal.css`：Terminal 樣式。
- `index.jsx`：統一 export。

檔案系統指令（`ls` / `cd` / `mkdir` / `touch` / `rm` / `cat` / `write` / `tree` / `pwd`）
操作的是 `apps/FileSystemContext.jsx` 的共用檔案系統，跟 Finder 看到的是同一份，
並且會存進 localStorage。

## 如何擴充指令
1. 在 `commands.jsx` 的 `commands` 物件新增一個回傳字串的函式。
2. 在 `help` 的說明文字補上這個指令。
3. Tab 補完會自動涵蓋新指令，不必另外註冊。

## 測試
`src/apps/__tests__/retroApps.test.ts` 涵蓋 `completeInput()` 與檔案系統的輔助函式。
