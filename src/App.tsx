import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import CrtTube from './components/CrtTube'
import './App.css'

const RetroPC = lazy(() => import('./pages/RetroPC'))
const ToolsIndex = lazy(() => import('./pages/Tools/Index').then(m => ({ default: m.ToolsIndex })))
const GifToZip = lazy(() => import('./pages/Tools/GifToZip').then(m => ({ default: m.GifToZip })))
const JsonFormatter = lazy(() => import('./pages/Tools/JsonFormatter').then(m => ({ default: m.JsonFormatter })))
const YamlFormatter = lazy(() => import('./pages/Tools/YamlFormatter').then(m => ({ default: m.YamlFormatter })))
const VideoToGif = lazy(() => import('./pages/Tools/VideoToGif').then(m => ({ default: m.VideoToGif })))
const AudioToMp3 = lazy(() => import('./pages/Tools/AudioToMp3').then(m => ({ default: m.AudioToMp3 })))
const Me = lazy(() => import('./pages/Me').then(m => ({ default: m.Me })))
const Game = lazy(() => import('./pages/Game').then(m => ({ default: m.Game })))

function App() {
  return (
    <HashRouter>
      <CrtTube>
        <Suspense fallback={<div style={{ background: '#000', color: '#00ff00', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>Loading system...</div>}>
          <Routes>
            <Route path="/" element={<RetroPC />} />
            <Route path="/tools" element={<ToolsIndex />} />
            <Route path="/tools/gifToZip" element={<GifToZip />} />
            <Route path="/tools/jsonFormatter" element={<JsonFormatter />} />
            <Route path="/tools/yamlFormatter" element={<YamlFormatter />} />
            <Route path="/tools/videoToGif" element={<VideoToGif />} />
            <Route path="/tools/audioToMp3" element={<AudioToMp3 />} />
            <Route path="/me" element={<Me />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </Suspense>
      </CrtTube>
    </HashRouter>
  )
}

export default App
