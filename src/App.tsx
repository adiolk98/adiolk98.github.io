import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import CrtTube from './components/CrtTube'
import ToolLayout from './pages/Tools/Layout'
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
const Works = lazy(() => import('./pages/Works').then(m => ({ default: m.Works })))

function App() {
  return (
    <HashRouter>
      <CrtTube>
        <Suspense fallback={<div style={{ background: 'var(--crt-phos-2)', color: 'var(--crt-cream)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>Loading system...</div>}>
          <Routes>
            <Route path="/" element={<RetroPC />} />
            <Route path="/tools" element={<ToolsIndex />} />
            <Route path="/tools" element={<ToolLayout />}>
              <Route path="gifToZip" element={<GifToZip />} />
              <Route path="jsonFormatter" element={<JsonFormatter />} />
              <Route path="yamlFormatter" element={<YamlFormatter />} />
              <Route path="videoToGif" element={<VideoToGif />} />
              <Route path="audioToMp3" element={<AudioToMp3 />} />
            </Route>
            <Route path="/me" element={<Me />} />
            <Route path="/works" element={<Works />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </Suspense>
      </CrtTube>
    </HashRouter>
  )
}

export default App
