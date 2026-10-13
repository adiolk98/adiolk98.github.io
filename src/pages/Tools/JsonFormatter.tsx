import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Editor from '@monaco-editor/react';

interface StructureDiagnostic {
  isValid: boolean;
  message?: string;
  unmatchedLines?: { line: number; col: number; char: string; desc: string }[];
  errorLine?: number;
}

export const JsonFormatter: React.FC = () => {
  const [inputJson, setInputJson] = useState<string>('');
  const [outputJson, setOutputJson] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [errorLine, setErrorLine] = useState<number | null>(null);
  const [diagnostic, setDiagnostic] = useState<StructureDiagnostic | null>(null);
  const [fixMessage, setFixMessage] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(15);
  // Keep track of the input editor instance so we can scroll/jump to line
  const editorRef = useRef<any>(null);

  // Diagnostic tool to analyze unbalanced brackets/braces
  const diagnoseJsonStructure = (rawStr: string): StructureDiagnostic => {
    const stack: { char: string; line: number; col: number; context: string }[] = [];
    let inString = false;
    let isEscaped = false;
    let line = 1;
    let col = 0;

    const lines = rawStr.split('\n');

    for (let i = 0; i < rawStr.length; i++) {
      const ch = rawStr[i];

      if (ch === '\n') {
        line++;
        col = 0;
        continue;
      }
      col++;

      if (inString) {
        if (isEscaped) {
          isEscaped = false;
        } else if (ch === '\\') {
          isEscaped = true;
        } else if (ch === '"') {
          inString = false;
        }
        continue;
      }

      if (ch === '"') {
        inString = true;
        continue;
      }

      if (ch === '{' || ch === '[') {
        const lineText = lines[line - 1]?.trim() || '';
        stack.push({ char: ch, line, col, context: lineText.slice(0, 45) });
      } else if (ch === '}' || ch === ']') {
        const expectedChar = ch === '}' ? '{' : '[';
        if (stack.length === 0) {
          return {
            isValid: false,
            message: `Unexpected closing '${ch}' at Line ${line}, Column ${col} (no matching '${expectedChar}' was opened).`,
            unmatchedLines: [{ line, col, char: ch, desc: `Extra closing '${ch}'` }],
            errorLine: line
          };
        }

        const top = stack[stack.length - 1];
        if (top.char !== expectedChar) {
          return {
            isValid: false,
            message: `Mismatched bracket at Line ${line}: encountered '${ch}', but expected '${top.char === '{' ? '}' : ']'}' to close '${top.char}' opened at Line ${top.line} ("${top.context}").`,
            unmatchedLines: [
              { line: top.line, col: top.col, char: top.char, desc: `Unclosed '${top.char}' (${top.context})` },
              { line, col, char: ch, desc: `Mismatched '${ch}'` }
            ],
            errorLine: line
          };
        }

        stack.pop();
      }
    }

    if (inString) {
      return {
        isValid: false,
        message: `Unterminated string starting around Line ${line}. Missing closing double quote '"'.`,
        errorLine: line
      };
    }

    if (stack.length > 0) {
      const unclosed = stack.map(s => ({
        line: s.line,
        col: s.col,
        char: s.char,
        desc: `Unclosed '${s.char}' opened at Line ${s.line}: "${s.context}"`
      }));

      const top = stack[stack.length - 1];
      return {
        isValid: false,
        message: `Missing closing bracket(s)! Unclosed '${top.char}' opened at Line ${top.line}: "${top.context}". Total unclosed elements: ${stack.length}.`,
        unmatchedLines: unclosed,
        errorLine: top.line
      };
    }

    return { isValid: true };
  };

  // Helper to extract line number from JSON parse error message
  const extractErrorLine = (errMsg: string, rawText: string): number | null => {
    const lineMatch = errMsg.match(/line\s+(\d+)/i);
    if (lineMatch) {
      return parseInt(lineMatch[1], 10);
    }

    const posMatch = errMsg.match(/position\s+(\d+)/i);
    if (posMatch) {
      const pos = parseInt(posMatch[1], 10);
      const textUpToPos = rawText.slice(0, pos);
      return textUpToPos.split('\n').length;
    }

    return null;
  };

  // Helper to repair common JSON syntax errors
  const repairJsonText = (rawStr: string): string => {
    let cleaned = rawStr;
    cleaned = cleaned.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
    cleaned = cleaned.replace(/\/\/.*/g, '');
    cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
    cleaned = cleaned.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, '"$1"');
    cleaned = cleaned.replace(/([{,]\s*)([a-zA-Z0-9_$]+)\s*:/g, '$1"$2":');
    cleaned = cleaned.replace(/\bNone\b/g, 'null')
                     .replace(/\bTrue\b/g, 'true')
                     .replace(/\bFalse\b/g, 'false')
                     .replace(/\bundefined\b/g, 'null')
                     .replace(/\bNaN\b/g, 'null');
    cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');

    // Structural repair: auto-close unclosed brackets/braces if any remain
    const diag = diagnoseJsonStructure(cleaned);
    if (!diag.isValid && diag.unmatchedLines && diag.unmatchedLines.length > 0) {
      let closingSuffix = '';
      for (let i = diag.unmatchedLines.length - 1; i >= 0; i--) {
        const item = diag.unmatchedLines[i];
        if (item.char === '{') closingSuffix += '\n}';
        if (item.char === '[') closingSuffix += '\n]';
      }
      cleaned += closingSuffix;
    }

    return cleaned;
  };

  const formatJson = () => {
    setFixMessage(null);
    setDiagnostic(null);
    try {
      if (!inputJson.trim()) {
        setOutputJson('');
        setError(null);
        setErrorLine(null);
        return;
      }
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutputJson(formatted);
      setError(null);
      setErrorLine(null);
    } catch (e: any) {
      const msg = e.message || 'Invalid JSON syntax';
      setError(msg);
      setErrorLine(extractErrorLine(msg, inputJson));
      setDiagnostic(diagnoseJsonStructure(inputJson));
    }
  };

  const minifyJson = () => {
    setFixMessage(null);
    setDiagnostic(null);
    try {
      if (!inputJson.trim()) {
        setOutputJson('');
        setError(null);
        setErrorLine(null);
        return;
      }
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputJson(minified);
      setError(null);
      setErrorLine(null);
    } catch (e: any) {
      const msg = e.message || 'Invalid JSON syntax';
      setError(msg);
      setErrorLine(extractErrorLine(msg, inputJson));
      setDiagnostic(diagnoseJsonStructure(inputJson));
    }
  };

  const autoFixJson = () => {
    if (!inputJson.trim()) return;
    try {
      const repairedText = repairJsonText(inputJson);
      const parsed = JSON.parse(repairedText);
      const formatted = JSON.stringify(parsed, null, 2);
      setInputJson(repairedText);
      setOutputJson(formatted);
      setError(null);
      setErrorLine(null);
      setDiagnostic(null);
      setFixMessage('Successfully auto-repaired and formatted JSON syntax & structure!');
    } catch (e: any) {
      const msg = e.message || 'Unknown syntax error';
      setError(`Auto-fix attempted, but could not resolve all errors: ${msg}`);
      setErrorLine(extractErrorLine(msg, inputJson));
      setDiagnostic(diagnoseJsonStructure(inputJson));
      setFixMessage(null);
    }
  };

  const jumpToInputLine = (targetLine: number) => {
    if (editorRef.current) {
      editorRef.current.revealLineInCenter(targetLine);
      editorRef.current.setPosition({ lineNumber: targetLine, column: 1 });
      editorRef.current.focus();
    }
  };

  const copyToClipboard = () => {
    if (outputJson) {
      navigator.clipboard.writeText(outputJson);
      alert('Copied output to clipboard!');
    }
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div className="tool-detail" style={{
      fontFamily: "'DotGothic16', monospace",
      background: "var(--crt-phos-2)",
      color: "var(--crt-cream)",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100%',
      padding: '1em',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      <Helmet>
        <title>JSON Formatter | adi's Toolbox</title>
        <meta name="description" content="Format, validate, repair, line jump, diagnose structure, search, and replace JSON strings easily." />
      </Helmet>

      <div style={{ width: '100%', maxWidth: '1200px', zIndex: 1 }}>
        {/* Header and Controls */}
        <div style={{
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div className="tool-controls-heading" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link className="px"
              to="/tools"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "0.65em",
                color: "var(--crt-rose-lo)",
                textDecoration: 'none',
                background: "var(--crt-tan)",
                padding: '10px 16px',
                boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
                imageRendering: 'pixelated'
              }}
            >
              ◄ BACK TO TOOLBOX
            </Link>

            <h1
              className="game-color-shift"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "1.2em",
                margin: 0
              }}
            >
              JSON FORMATTER
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ fontFamily: "'DotGothic16', monospace", color: "var(--crt-cream)", fontSize: "0.9em" }}>
              Powered by Monaco Editor (Press <kbd className="px" style={{boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",  background: "var(--crt-tan)", padding: '2px 6px',  }}>Ctrl+F</kbd> inside editor to search)
            </div>

            {/* Font Zoom Controls */}
            <div className="px" style={{boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: "var(--crt-cream)",
              padding: '4px 8px',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.65em"
            }}>
              <span style={{ color: "var(--crt-ink-2)" }}>ZOOM:</span>
              <button className="px"
                onClick={() => setFontSize((prev) => Math.max(10, prev - 2))}
                style={{boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
                  background: "var(--crt-tan)",
                  color: "var(--crt-ink)",
                  padding: '2px 6px',
                  cursor: 'pointer'
                }}
                title="Decrease font size"
              >-</button>
              <span style={{ color: "var(--crt-green)", minWidth: '40px', textAlign: 'center' }}>{fontSize}px</span>
              <button className="px"
                onClick={() => setFontSize((prev) => Math.min(32, prev + 2))}
                style={{boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
                  background: "var(--crt-tan)",
                  color: "var(--crt-ink)",
                  padding: '2px 6px',
                  cursor: 'pointer'
                }}
                title="Increase font size"
              >+</button>
              <button className="px"
                onClick={() => setFontSize(15)}
                style={{boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
                  background: "var(--crt-tan)",
                  color: "var(--crt-ink-2)",
                  padding: '2px 6px',
                  cursor: 'pointer',
                  marginLeft: '4px'
                }}
              >RESET</button>
            </div>
          </div>
        </div>

        {/* Middle Action Bar */}
        <div className="px" style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          flexWrap: 'wrap',
          background: "var(--crt-cream)",
          padding: '12px 16px',

          boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
          justifyContent: 'center'
        }}>
          <button className="px"
            onClick={formatJson}
            style={{
              background: "var(--crt-rose-lo)",
              color: "var(--crt-ink)",
              padding: '10px 20px',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.85em",
              cursor: 'pointer',
              boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
              transition: 'transform 0.1s'
            }}
          >
             FORMAT / BEAUTIFY
          </button>

          <button className="px"
            onClick={minifyJson}
            style={{
              background: "var(--crt-green)",
              color: "var(--crt-ink)",
              padding: '10px 20px',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.85em",
              cursor: 'pointer',
              boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
              transition: 'transform 0.1s'
            }}
          >
             MINIFY
          </button>

          <button className="px"
            onClick={autoFixJson}
            style={{
              background: "var(--crt-red-lo)",
              color: "var(--crt-ink)",
              padding: '10px 20px',
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "0.85em",
              cursor: 'pointer',
              boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
              transition: 'transform 0.1s'
            }}
          >
             AUTO-FIX JSON
          </button>
        </div>

        {/* Status / Messages */}
        {fixMessage && (
          <div className="px" style={{boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
            color: "var(--crt-green)",
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.65em",
            background: 'rgba(44, 182, 125, 0.15)',
            padding: '10px 16px',

          }}>
            ✓ {fixMessage}
          </div>
        )}

        {error && (
          <div className="px" style={{boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
            color: '#FF3B30',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "0.65em",
            background: 'rgba(255, 59, 48, 0.15)',
            padding: '12px 16px',

            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div> PARSE ERROR: {error}</div>
              {errorLine && (
                <button className="px"
                  onClick={() => jumpToInputLine(errorLine)}
                  style={{
                    background: '#FF3B30',
                    color: "var(--crt-ink)",
                    padding: '4px 10px',
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "0.55em",
                    cursor: 'pointer',
                    boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)"
                  }}
                >
                   JUMP TO LINE {errorLine}
                </button>
              )}
            </div>

            {/* Structural Diagnostic info for Unbalanced Brackets / Braces */}
            {diagnostic && !diagnostic.isValid && (
              <div className="px" style={{boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
                background: "var(--crt-cream)",
                padding: '10px 12px',
                color: "var(--crt-rose-lo)",
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.6em" }}>
                   BRACKET / STRUCTURAL ANALYSIS:
                </div>
                <div style={{ fontFamily: "'DotGothic16', monospace", fontSize: "1.1em", color: "var(--crt-ink)" }}>
                  {diagnostic.message}
                </div>

                {diagnostic.unmatchedLines && diagnostic.unmatchedLines.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                    {diagnostic.unmatchedLines.map((item, idx) => (
                      <button className="px"
                        key={idx}
                        onClick={() => jumpToInputLine(item.line)}
                        style={{boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
                          background: "var(--crt-tan)",
                          color: "var(--crt-rose-lo)",
                          padding: '4px 8px',
                          fontFamily: "'Press Start 2P', monospace",
                          fontSize: "0.55em",
                          cursor: 'pointer'
                        }}
                      >
                         JUMP TO LINE {item.line} ({item.char})
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div style={{ fontFamily: "'DotGothic16', monospace", fontSize: "1em", color: "var(--crt-ink-2)" }}>
              Tip: Click <strong>" AUTO-FIX JSON"</strong> above to attempt automatic repair of unclosed braces/brackets, missing quotes, single quotes, and trailing commas!
            </div>
          </div>
        )}

        {/* Side-by-side Editors layout */}
        <div className="px editor-columns" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          background: '#000',
          boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)"
        }}>
          {/* INPUT EDITOR */}
          <div style={{boxShadow: "inset -.14em 0 0 var(--crt-line)",   }}>
            <div style={{boxShadow: "inset 0 -.14em 0 var(--crt-line)",
              background: "var(--crt-cream)",
              padding: '10px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.8em", color: "var(--crt-rose-lo)" }}>INPUT JSON</span>
              <button className="px"
                onClick={() => { setInputJson(''); setOutputJson(''); setError(null); setErrorLine(null); setDiagnostic(null); setFixMessage(null); }}
                style={{boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)",
                  background: "var(--crt-tan)",
                  color: "var(--crt-ink-2)",
                  padding: '2px 8px',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.55em",
                  cursor: 'pointer'
                }}
              >
                CLEAR
              </button>
            </div>
            <div style={{ height: '500px', width: '100%' }}>
              <Editor
                height="100%"
                language="json"
                theme="vs"
                value={inputJson}
                onChange={(value) => setInputJson(value || '')}
                onMount={handleEditorDidMount}
                options={{
                  minimap: { enabled: false },
                  fontSize: fontSize,
                  wordWrap: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  insertSpaces: true
                }}
              />
            </div>
          </div>

          {/* OUTPUT EDITOR */}
          <div>
            <div style={{boxShadow: "inset 0 -.14em 0 var(--crt-line)",
              background: "var(--crt-cream)",
              padding: '10px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.8em", color: "var(--crt-green)" }}>OUTPUT</span>
              <button className="px"
                onClick={copyToClipboard}
                style={{
                  background: "var(--crt-green)",
                  color: "var(--crt-ink)",
                  padding: '2px 8px',
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "0.55em",
                  cursor: 'pointer',
                  boxShadow: "inset 0 0 0 .18em var(--crt-line), .18em .22em 0 rgba(0,0,0,.25)"
                }}
              >
                 COPY
              </button>
            </div>
            <div style={{ height: '500px', width: '100%' }}>
              <Editor
                height="100%"
                language="json"
                theme="vs"
                value={outputJson}
                options={{
                  minimap: { enabled: false },
                  fontSize: fontSize,
                  wordWrap: 'on',
                  readOnly: true,
                  scrollBeyondLastLine: false,
                  automaticLayout: true
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
