import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Editor from '@monaco-editor/react';
import YAML from 'yaml';

export const YamlFormatter: React.FC = () => {
  const [inputYaml, setInputYaml] = useState<string>('');
  const [outputYaml, setOutputYaml] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [errorLine, setErrorLine] = useState<number | null>(null);
  const [fixMessage, setFixMessage] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<number>(15);
  // Keep track of the input editor instance so we can scroll/jump to line
  const editorRef = useRef<any>(null);

  // Helper to extract line number from YAML parse errors
  const extractErrorLine = (errMsg: string, rawText: string): number | null => {
    const lineMatch = errMsg.match(/at line\s+(\d+)/i) || errMsg.match(/line\s+(\d+)/i);
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

  // Helper to auto-fix common YAML formatting issues
  const repairYamlText = (rawStr: string): string => {
    let cleaned = rawStr;
    // 1. Replace tab characters with 2 spaces (YAML forbids tabs for indentation)
    cleaned = cleaned.replace(/\t/g, '  ');

    // 2. If user pasted raw JSON, convert JSON to YAML!
    const trimmed = cleaned.trim();
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      try {
        const parsedJson = JSON.parse(cleaned);
        return YAML.stringify(parsedJson, { indent: 2 });
      } catch {
        // Not valid JSON, continue with normal YAML repair
      }
    }

    // 3. Remove trailing whitespace on lines
    cleaned = cleaned.split('\n').map(line => line.trimEnd()).join('\n');

    return cleaned;
  };

  const formatYaml = () => {
    setFixMessage(null);
    try {
      if (!inputYaml.trim()) {
        setOutputYaml('');
        setError(null);
        setErrorLine(null);
        return;
      }
      const parsed = YAML.parse(inputYaml);
      const formatted = YAML.stringify(parsed, { indent: 2 });
      setOutputYaml(formatted);
      setError(null);
      setErrorLine(null);
    } catch (e: any) {
      const msg = e.message || 'Invalid YAML syntax';
      setError(msg);
      setErrorLine(extractErrorLine(msg, inputYaml));
    }
  };

  const convertToJson = () => {
    setFixMessage(null);
    try {
      if (!inputYaml.trim()) {
        setOutputYaml('');
        setError(null);
        setErrorLine(null);
        return;
      }
      const parsed = YAML.parse(inputYaml);
      const jsonStr = JSON.stringify(parsed, null, 2);
      setOutputYaml(jsonStr);
      setError(null);
      setErrorLine(null);
    } catch (e: any) {
      const msg = e.message || 'Invalid YAML syntax';
      setError(msg);
      setErrorLine(extractErrorLine(msg, inputYaml));
    }
  };

  const autoFixYaml = () => {
    if (!inputYaml.trim()) return;
    try {
      const repaired = repairYamlText(inputYaml);
      const parsed = YAML.parse(repaired);
      const formatted = YAML.stringify(parsed, { indent: 2 });
      setInputYaml(repaired);
      setOutputYaml(formatted);
      setError(null);
      setErrorLine(null);
      setFixMessage('Successfully auto-repaired and formatted YAML!');
    } catch (e: any) {
      const msg = e.message || 'Unknown syntax error';
      setError(`Auto-fix attempted, but could not resolve all errors: ${msg}`);
      setErrorLine(extractErrorLine(msg, inputYaml));
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
    if (outputYaml) {
      navigator.clipboard.writeText(outputYaml);
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
        <title>YAML Formatter | adi's Toolbox</title>
        <meta name="description" content="Format, validate, repair, convert YAML to JSON, powered by Monaco Editor." />
      </Helmet>

      <div style={{ width: '100%', maxWidth: '1200px', zIndex: 1 }}>
        {/* Header Navigation */}
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
              YAML FORMATTER
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
              <span style={{ color: "var(--crt-rose-lo)", minWidth: '40px', textAlign: 'center' }}>{fontSize}px</span>
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

        {/* Action Bar */}
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
            onClick={formatYaml}
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
             FORMAT YAML
          </button>

          <button className="px"
            onClick={convertToJson}
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
             CONVERT TO JSON
          </button>

          <button className="px"
            onClick={autoFixYaml}
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
             AUTO-FIX YAML
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
            gap: '8px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div> YAML PARSE ERROR: {error}</div>
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
            <div style={{ fontFamily: "'DotGothic16', monospace", fontSize: "1em", color: "var(--crt-ink-2)" }}>
              Tip: Click <strong>" AUTO-FIX YAML"</strong> above to auto-convert invalid tabs to 2 spaces or convert JSON to YAML!
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
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "0.8em", color: "var(--crt-rose-lo)" }}>INPUT YAML</span>
              <button className="px"
                onClick={() => { setInputYaml(''); setOutputYaml(''); setError(null); setErrorLine(null); setFixMessage(null); }}
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
                language="yaml"
                theme="vs"
                value={inputYaml}
                onChange={(value) => setInputYaml(value || '')}
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
                language="yaml"
                theme="vs"
                value={outputYaml}
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
