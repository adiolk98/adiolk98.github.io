import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';


const VSCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 97%;
  width: 100%;
  background-color: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Cubic', 'Monaco', monospace;
  font-size: 10px;
  overflow: hidden;
  image-rendering: pixelated;
`;

const TopBar = styled.div`
  display: flex;
  height: 35px;
  background-color: #2d2d30;
  border-bottom: 1px solid #3e3e42;
`;

const MenuBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  font-size: 8px;
  background-color: #3c3c3c;
  height: 100%;
  min-width: 200px;
  color: #cccccc;
`;

const TabBar = styled.div`
  display: flex;
  flex: 1;
  background-color: #2d2d30;
  height: 100%;
  border-left: 1px solid #3e3e42;
`;

const Tab = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})`
  display: flex;
  align-items: center;
  padding: 0 12px;
  background-color: ${props => props.active ? '#1e1e1e' : '#2d2d30'};
  border-right: 1px solid #3e3e42;
  border-bottom: ${props => props.active ? 'none' : '1px solid #3e3e42'};
  cursor: pointer;
  font-size: 8px;
  min-width: 120px;
  position: relative;
  color: ${props => props.active ? '#ffffff' : '#cccccc'};
  
  &:hover {
    background-color: ${props => props.active ? '#1e1e1e' : '#383838'};
  }
`;

const TabCloseButton = styled.span`
  margin-left: 8px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  cursor: pointer;
  color: #cccccc;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const MainArea = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const ActivityBar = styled.div`
  width: 48px;
  background-color: #333333;
  border-right: 1px solid #3e3e42;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
`;

const ActivityBarIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${props => props.active ? '#007acc' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#cccccc'};
  font-size: 14px;
  
  &:hover {
    background-color: ${props => props.active ? '#007acc' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const SideBar = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'collapsed'
})`
  width: ${props => props.collapsed ? '0' : '250px'};
  background-color: #252526;
  border-right: 1px solid #3e3e42;
  overflow: hidden;
  transition: width 0.2s ease;
`;

const SideBarHeader = styled.div`
  padding: 8px 12px;
  font-size: 8px;
  text-transform: uppercase;
  color: #cccccc;
  font-weight: 600;
  background-color: #2d2d30;
  border-bottom: 1px solid #3e3e42;
  letter-spacing: 1px;
`;

const FileList = styled.div`
  padding: 8px;
`;

const FileItem = styled.div`
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 3px;
  font-size: 8px;
  display: flex;
  align-items: center;
  position: relative;
  color: ${props => props.className?.includes('active') ? '#ffffff' : '#cccccc'};
  background-color: ${props => props.className?.includes('active') ? '#007acc' : 'transparent'};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background-color: #007acc;
  }
`;



const EditorArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
`;

const EditorContent = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const LineNumbers = styled.div`
  flex: 0 0 50px;
  background-color: #1e1e1e;
  color: #858585;
  /* 字級與 line-height 必須跟 TextArea 一致，行號才會對齊；捲動由 onScroll 同步。 */
  font-size: 10px;
  font-family: monospace;
  line-height: 14px;
  padding: 10px 8px;
  text-align: right;
  user-select: none;
  overflow: hidden;
  border-right: 1px solid #3e3e42;
`;

const TextArea = styled.textarea`
  flex: 1;
  background-color: #1e1e1e;
  color: #d4d4d4;
  border: none;
  outline: none;
  font-family: monospace;
  font-size: 10px;
  line-height: 14px;
  padding: 10px;
  resize: none;
  white-space: pre;
  overflow-wrap: normal;
  overflow-x: auto;
  pointer-events: auto;
  user-select: text;
  
  &::selection {
    background-color: #264f78;
  }
  
  &::placeholder {
    color: #6a6a6a;
  }
  
  &:focus {
    outline: none;
  }
`;

const StatusBar = styled.div`
  height: 22px;
  background-color: #007acc;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  font-size: 8px;
  font-family: monospace;
`;

const StatusLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatusRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PreviewPanel = styled.div`
  flex: 1;
  background-color: #fafafa;
  color: #2c3e50;
  padding: 32px 40px;
  overflow-y: auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.7;
  border-left: 1px solid #3e3e42;
  max-width: 800px;
  margin: 0 auto;
  
  /* 滾動條樣式 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
  
  h1, h2, h3, h4, h5, h6 {
    color: #1a202c;
    margin-top: 32px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.3;
  }
  
  h1:first-child, h2:first-child, h3:first-child {
    margin-top: 0;
  }
  
  h1 { 
    font-size: 28px; 
    border-bottom: 3px solid #e2e8f0; 
    padding-bottom: 12px;
    margin-bottom: 24px;
  }
  h2 { 
    font-size: 24px; 
    border-bottom: 2px solid #e2e8f0; 
    padding-bottom: 8px;
    margin-bottom: 20px;
  }
  h3 { 
    font-size: 20px;
    margin-bottom: 16px;
  }
  h4 { 
    font-size: 18px;
    margin-bottom: 14px;
  }
  h5 { 
    font-size: 16px;
    margin-bottom: 12px;
  }
  h6 { 
    font-size: 14px;
    margin-bottom: 10px;
    color: #4a5568;
  }
  
  p { 
    margin-bottom: 20px; 
    font-size: 16px;
    line-height: 1.8;
    color: #2d3748;
  }
  
  code {
    background-color: #edf2f7;
    color: #d53f8c;
    padding: 3px 8px;
    border-radius: 4px;
    font-family: 'SFMono-Regular', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    font-size: 14px;
    border: 1px solid #e2e8f0;
  }
  
  pre {
    background-color: #2d3748;
    color: #e2e8f0;
    border-radius: 8px;
    padding: 20px;
    overflow-x: auto;
    margin: 20px 0;
    font-family: 'SFMono-Regular', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
    font-size: 14px;
    line-height: 1.5;
    border: 1px solid #4a5568;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  pre code {
    background: none;
    color: #e2e8f0;
    padding: 0;
    border: none;
    font-size: 14px;
  }
  
  blockquote {
    border-left: 4px solid #4299e1;
    background-color: #ebf8ff;
    padding: 16px 20px;
    margin: 20px 0;
    color: #2a4365;
    font-style: italic;
    border-radius: 0 4px 4px 0;
  }
  
  ul, ol {
    padding-left: 28px;
    margin: 16px 0;
  }
  
  li {
    margin: 8px 0;
    line-height: 1.7;
    color: #2d3748;
  }
  
  ul li {
    list-style-type: disc;
  }
  
  ol li {
    list-style-type: decimal;
  }
  
  strong { 
    font-weight: 600;
    color: #1a202c;
  }
  
  em { 
    font-style: italic;
    color: #4a5568;
  }
  
  hr {
    border: none;
    border-top: 2px solid #e2e8f0;
    margin: 32px 0;
  }
  
  /* 連結樣式 */
  a {
    color: #3182ce;
    text-decoration: none;
  }
  
  a:hover {
    color: #2c5282;
    text-decoration: underline;
  }
  
  /* 表格樣式 */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  
  th {
    background-color: #f7fafc;
    font-weight: 600;
    color: #2d3748;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
`;

const WELCOME_FILE = {
  id: 'welcome',
  name: 'welcome.md',
  content: `# VSCode Editor

這是一個可以真的用的編輯器：

- \`Ctrl/Cmd + S\` 儲存（內容存在瀏覽器 localStorage）
- \`Tab\` 插入縮排，不會跳走焦點
- 左側 ➕ 新增檔案、👁️ 預覽 Markdown
- 打字會自動存檔，重新整理不會不見

開始寫點什麼吧。
`,
  isModified: false,
};

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const VSCodeTextEditor = () => {
  // 一開啟就要有檔案可以打字：原本是空陣列＋不存在的 activeFileId，
  // 使用者按鍵盤完全沒有反應。
  const [files, setFiles] = useState([WELCOME_FILE]);
  const [activeFileId, setActiveFileId] = useState(WELCOME_FILE.id);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });

  const activeFile = files.find(f => f.id === activeFileId);

  // 從 localStorage 載入資料
  useEffect(() => {
    const savedFiles = localStorage.getItem('vscode-editor-files');
    if (!savedFiles) return;
    try {
      const parsedFiles = JSON.parse(savedFiles);
      if (Array.isArray(parsedFiles) && parsedFiles.length > 0) {
        setFiles(parsedFiles);
        setActiveFileId(parsedFiles[0].id);
      }
    } catch (e) {
      console.error('Failed to load files from localStorage:', e);
    }
  }, []);

  // 自動存檔：真的編輯器不會因為忘記按儲存就把東西弄丟。
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem('vscode-editor-files', JSON.stringify(files));
      } catch (e) {
        console.warn('Autosave failed (handled):', e.message);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [files]);


  const handleTextChange = (e) => {
    const newContent = e.target.value;
    setFiles(prevFiles => prevFiles.map(file => 
      file.id === activeFileId 
        ? { ...file, content: newContent, isModified: true }
        : file
    ));
    
    // 更新游標位置
    updateCursorPosition(e.target);
  };
  
  const updateCursorPosition = (textarea) => {
    if (!textarea) return;
    
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPos);
    const lines = textBeforeCursor.split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;
    
    setCursorPosition({ line, column });
  };
  
  const handleTextareaClick = (e) => {
    updateCursorPosition(e.target);
  };
  
  const handleKeyUp = (e) => {
    updateCursorPosition(e.target);
  };

  const createNewFile = () => {
    const newFileId = `file_${Date.now()}`;
    let n = files.length;
    while (files.some(f => f.name === `untitled_${n}.md`)) n += 1;
    const newFile = {
      id: newFileId,
      name: `untitled_${n}.md`,
      content: '',
      isModified: false
    };
    setFiles([...files, newFile]);
    setActiveFileId(newFileId);
  };



  const closeFile = (fileId, e) => {
    e.stopPropagation();
    const updatedFiles = files.filter(f => f.id !== fileId);
    // 關掉最後一個分頁時補一個空白檔，不然編輯區會變成打字沒反應的死畫面。
    if (updatedFiles.length === 0) {
      const blank = { id: `file_${Date.now()}`, name: 'untitled.md', content: '', isModified: false };
      setFiles([blank]);
      setActiveFileId(blank.id);
      return;
    }
    setFiles(updatedFiles);
    if (activeFileId === fileId) setActiveFileId(updatedFiles[0].id);
  };

  const saveFile = () => {
    // 先算出要存的內容再一起寫進去，不然存到 localStorage 的會是上一輪的舊狀態。
    const saved = files.map(file => (file.id === activeFileId ? { ...file, isModified: false } : file));
    setFiles(saved);
    try {
      localStorage.setItem('vscode-editor-files', JSON.stringify(saved));
    } catch (e) {
      console.warn('Save failed (handled):', e.message);
    }
  };

  // Ctrl/Cmd+S 儲存、Tab 插入縮排（預設 Tab 會把焦點移走，在編輯器裡很反直覺）。
  const handleEditorKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      saveFile();
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = e.target;
      const { selectionStart, selectionEnd, value } = el;
      const next = `${value.slice(0, selectionStart)}  ${value.slice(selectionEnd)}`;
      setFiles(prev => prev.map(file =>
        file.id === activeFileId ? { ...file, content: next, isModified: true } : file
      ));
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = selectionStart + 2;
      });
    }
  };
  
  const getFileLanguage = (fileName) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'js': return 'JavaScript';
      case 'css': return 'CSS';
      case 'html': return 'HTML';
      case 'md': return 'Markdown';
      case 'json': return 'JSON';
      case 'txt': return 'Plain Text';
      default: return 'Plain Text';
    }
  };


  const renderLineNumbers = () => {
    const content = activeFile?.content || '';
    const actualLineCount = Math.max(1, content.split('\n').length);
    const lines = [];
    for (let i = 1; i <= actualLineCount; i++) {
      lines.push(<div key={i}>{i}</div>);
    }
    return lines;
  };

  // 簡單的 Markdown 渲染器
  const renderMarkdown = (content) => {
    if (!content) return '';

    // 先跳脫 HTML：預覽是用 dangerouslySetInnerHTML 塞進去的，
    // 沒跳脫的話文件裡的 <script> 會真的被執行。
    let html = escapeHtml(content)
      // Code blocks (處理在其他替換之前)
      .replace(/```([\w+]*)\s*\n([\s\S]*?)\n```/g, '<pre><code>$2</code></pre>')
      .replace(/```([\w+]*)\s*([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      // Lists
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>')
      // Horizontal rules
      .replace(/^---$/gim, '<hr>')
      // Line breaks
      .replace(/\n/g, '<br>');

    // Wrap lists
    html = html.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
    
    return html;
  };

  return (
    <VSCodeContainer>
      <TopBar>
        <MenuBar>
          VSCode Editor
        </MenuBar>
        <TabBar>
          {files.map(file => (
            <Tab 
              key={file.id} 
              active={file.id === activeFileId}
              onClick={() => setActiveFileId(file.id)}
            >
              {file.name}
              {file.isModified && '*'}
              <TabCloseButton onClick={(e) => closeFile(file.id, e)}>
                ×
              </TabCloseButton>
            </Tab>
          ))}
        </TabBar>
      </TopBar>

      <MainArea>
        <ActivityBar>
          <ActivityBarIcon 
            active={!sidebarCollapsed}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            title="檔案總管"
          >
            📁
          </ActivityBarIcon>
          <ActivityBarIcon onClick={() => createNewFile()} title="新增文件">
            ➕
          </ActivityBarIcon>
          <ActivityBarIcon onClick={saveFile} title="儲存">
            💾
          </ActivityBarIcon>
          {activeFile?.name.endsWith('.md') && (
            <ActivityBarIcon 
              active={previewMode}
              onClick={() => setPreviewMode(!previewMode)} 
              title={previewMode ? "編輯模式" : "預覽模式"}
            >
              {previewMode ? '📝' : '👁️'}
            </ActivityBarIcon>
          )}
        </ActivityBar>

        <SideBar collapsed={sidebarCollapsed}>
          <SideBarHeader>
            檔案總管
          </SideBarHeader>
          <FileList>
            {files.map(file => (
              <FileItem 
                key={file.id}
                className={file.id === activeFileId ? 'active' : ''}
                onClick={() => setActiveFileId(file.id)}
              >
                {file.name}{file.isModified && '*'}
              </FileItem>
            ))}
          </FileList>
        </SideBar>

        <EditorArea>
          <EditorContent>
            {!previewMode && (
              <>
                <LineNumbers ref={lineNumbersRef}>
                  {renderLineNumbers()}
                </LineNumbers>
                <TextArea
                  ref={textareaRef}
                  value={activeFile?.content || ''}
                  onChange={handleTextChange}
                  onClick={handleTextareaClick}
                  onKeyUp={handleKeyUp}
                  onKeyDown={handleEditorKeyDown}
                  onScroll={(e) => {
                    if (lineNumbersRef.current) lineNumbersRef.current.scrollTop = e.target.scrollTop;
                  }}
                  placeholder="開始輸入程式碼..."
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                />
              </>
            )}
            {previewMode && activeFile?.name.endsWith('.md') && (
              <PreviewPanel
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(activeFile?.content || '')
                }}
              />
            )}
          </EditorContent>
        </EditorArea>
      </MainArea>

      <StatusBar>
        <StatusLeft>
          <span>{activeFile ? activeFile.name : 'No file'}</span>
          <span>{activeFile ? getFileLanguage(activeFile.name) : 'No language'}</span>
          <span>UTF-8</span>
        </StatusLeft>
        <StatusRight>
          {!previewMode && (
            <span>第 {cursorPosition.line} 行，第 {cursorPosition.column} 列</span>
          )}
          <span>{activeFile?.content?.length || 0} 字元</span>
          <span>{files.filter(f => f.isModified).length > 0 ? '未儲存' : '已儲存'}</span>
        </StatusRight>
      </StatusBar>
    </VSCodeContainer>
  );
};

export default VSCodeTextEditor;