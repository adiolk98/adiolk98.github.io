import React, { useState, useRef, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// 只註冊字型，不要去改 body/*：那會把整個桌面的字型一起換掉。
const FontStyle = createGlobalStyle`
  @font-face {
    font-family: 'Cubic';
    src: url('/assets/Cubic_11.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

// Dither 1-bit風格背景
const ditherPattern = `
  repeating-linear-gradient(
    45deg,
    #000 0px, #000 1px,
    #fff 1px, #fff 2px,
    #000 2px, #000 3px,
    #fff 3px, #fff 4px
  )
`;

const PlayerWrapper = styled.div`
  background: #fff;
  border: 3px solid #000;
  font-family: 'Cubic', monospace;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  user-select: none;
  position: relative;
  overflow: hidden;
  image-rendering: pixelated;
  box-shadow: 
    inset -2px -2px 0 #808080,
    inset 2px 2px 0 #ffffff;
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.1;
    pointer-events: none;
    z-index: 0;
    background: ${ditherPattern};
  }
`;

const DisplayPanel = styled.div`
  background: #000;
  border: 3px inset #c0c0c0;
  flex: 0 0 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  margin: 4px;
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.4;
    pointer-events: none;
    background: ${ditherPattern};
    z-index: 0;
  }
`;

const DisplayText = styled.div`
  color: #0f0;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  font-family: 'Cubic', monospace;
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  width: 90%;
  text-overflow: ellipsis;
  margin-bottom: 2px;
  position: relative;
  z-index: 1;
  text-shadow: 0 0 2px #0f0;
`;

const DisplayInfo = styled.div`
  color: #0f0;
  font-size: 10px;
  font-family: 'Cubic', monospace;
  text-align: center;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
  text-shadow: 0 0 2px #0f0;
`;

const VisualizerBar = styled.div`
  display: flex;
  align-items: end;
  gap: 1px;
  height: 20px;
  margin-top: 4px;
  position: relative;
  z-index: 1;
`;

const VisualizerColumn = styled.div`
  width: 2px;
  background: #0f0;
  transition: height 0.1s ease;
  box-shadow: 0 0 2px #0f0;
`;

const ModePanel = styled.div`
  display: flex;
  gap: 4px;
  margin: 8px 0;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

const ModeBtn = styled.button`
  width: 24px;
  height: 18px;
  background: #c0c0c0;
  border: 2px outset #c0c0c0;
  color: #000;
  font-size: 8px;
  font-family: 'Cubic', monospace;
  cursor: pointer;
  transition: none;
  position: relative;
  z-index: 1;
  
  &:active {
    border: 2px inset #c0c0c0;
    background: #a0a0a0;
  }
  
  &:hover {
    background: #d0d0d0;
  }
  
  &.active {
    border: 2px inset #c0c0c0;
    background: #808080;
    color: #fff;
  }
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.1;
    pointer-events: none;
    background: ${ditherPattern};
    z-index: 0;
  }
`;

const ControlPanel = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2px;
  background: #fff;
  padding: 8px;
  position: relative;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.05;
    pointer-events: none;
    background: ${ditherPattern};
    z-index: 0;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
  position: relative;
  z-index: 1;
`;

const ControlButton = styled.button`
  width: 32px;
  height: 24px;
  background: #c0c0c0;
  border: 2px outset #c0c0c0;
  color: #000;
  font-size: 11px;
  font-family: 'Cubic', monospace;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: none;
  position: relative;
  z-index: 1;
  image-rendering: pixelated;
  
  &:active {
    border: 2px inset #c0c0c0;
    background: #a0a0a0;
  }
  
  &:hover {
    background: #d0d0d0;
  }
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.1;
    pointer-events: none;
    background: ${ditherPattern};
    z-index: 0;
  }
`;

const ProgressBarWrapper = styled.div`
  width: 92%;
  height: 12px;
  background: #000;
  border: 2px inset #c0c0c0;
  margin: 4px 0;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.3;
    pointer-events: none;
    background: ${ditherPattern};
    z-index: 0;
  }
`;

const ProgressBar = styled.div`
  height: 100%;
  background: #0f0;
  transition: none;
  position: relative;
  z-index: 1;
  box-shadow: 0 0 2px #0f0;
`;

const VolumeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 4px 0;
  position: relative;
  z-index: 1;
`;

const Playlist = styled.div`
  flex: 1;
  /* ControlPanel 是 align-items:center 的直向 flex，不 stretch 的話清單只會有內容寬度。 */
  align-self: stretch;
  min-height: 0;
  overflow-y: auto;
  margin: 4px;
  border: 2px inset #c0c0c0;
  background: #000;
  position: relative;
  z-index: 1;
`;

const PlaylistItem = styled.button`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 3px 6px;
  border: none;
  text-align: left;
  cursor: pointer;
  font-family: 'Cubic', monospace;
  font-size: 10px;
  background: ${props => (props.$current ? '#0f0' : 'transparent')};
  color: ${props => (props.$current ? '#000' : '#0f0')};

  &:hover { background: ${props => (props.$current ? '#0f0' : '#032003')}; }
`;

const VolumeBar = styled.input`
  width: 60px;
  height: 6px;
  accent-color: #000;
  background: #c0c0c0;
  border: 1px inset #c0c0c0;
`;

const songList = [
  { name: "周杰倫-稻香", path: "/assets/mp3/Jay_chou-1.mp3" },
  { name: "Save as-tobylane", path: "/assets/mp3/Save-as-tobylane.mp3" },
  { name: "錄音_0477（未命名）", path: "/assets/mp3/Save-as-tobylane.mp3" },
];

function formatTime(sec) {
  if (isNaN(sec)) return '00:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const MP3Player = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [playMode, setPlayMode] = useState('normal'); // 'normal', 'loop', 'random'
  const [showVisualizer, setShowVisualizer] = useState(true);
  const [visualizerData, setVisualizerData] = useState(Array(16).fill(0));
  const [showPlaylist, setShowPlaylist] = useState(true);
  const lastVolume = useRef(0.7);
  const audioRef = useRef(null);

  const currentSong = songList[currentSongIndex];

  // Visualizer animation
  useEffect(() => {
    if (isPlaying && showVisualizer) {
      const interval = setInterval(() => {
        setVisualizerData(prev => prev.map(() => Math.random() * 20));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setVisualizerData(Array(16).fill(0));
    }
  }, [isPlaying, showVisualizer]);

  useEffect(() => {
    try {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => console.warn('Audio play failed (handled):', e.message));
        }
      } else {
        audioRef.current.pause();
      }
    } catch (error) {
      console.warn('Audio play sync error (handled):', error.message);
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    const update = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };
    const onError = () => {
      console.error('Audio loading error');
      setIsPlaying(false);
    };
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    audio.addEventListener('timeupdate', update);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('error', onError);
    
    return () => {
      audio.removeEventListener('timeupdate', update);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('error', onError);
    };
  }, [currentSongIndex]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const playPause = () => setIsPlaying((p) => !p);
  const playNext = () => {
    if (playMode === 'random') {
      setCurrentSongIndex(Math.floor(Math.random() * songList.length));
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % songList.length);
    }
    setIsPlaying(true);
  };
  const playPrev = () => {
    if (playMode === 'random') {
      setCurrentSongIndex(Math.floor(Math.random() * songList.length));
    } else {
      setCurrentSongIndex((prev) => (prev - 1 + songList.length) % songList.length);
    }
    setIsPlaying(true);
  };
  const selectSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };
  // currentTarget：點在綠色進度條上時 e.target 是內層的 fill，量到的寬度會是錯的。
  const onProgressBarClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const seekTime = Math.min(Math.max(percent, 0), 1) * duration;
    if (!Number.isFinite(seekTime)) return;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const toggleMute = () => setVolume(v => {
    if (v === 0) return lastVolume.current || 0.7;
    lastVolume.current = v;
    return 0;
  });
  
  const togglePlayMode = () => {
    const modes = ['normal', 'loop', 'random'];
    const currentIndex = modes.indexOf(playMode);
    setPlayMode(modes[(currentIndex + 1) % modes.length]);
  };
  
  const getPlayModeIcon = () => {
    switch (playMode) {
      case 'loop': return '↻';
      case 'random': return '⚡';
      default: return '→';
    }
  };
  
  const toggleVisualizer = () => {
    setShowVisualizer(prev => !prev);
  };

  return (
    <>
      <FontStyle />
      <PlayerWrapper>
        <DisplayPanel>
          <DisplayText>
            ♪ {currentSong.name}
          </DisplayText>
          <DisplayInfo>
            {formatTime(currentTime)} / {formatTime(duration)} {isPlaying ? '►' : '■'} | {playMode.toUpperCase()}
          </DisplayInfo>
          {showVisualizer && (
            <VisualizerBar>
              {visualizerData.map((height, i) => (
                <VisualizerColumn key={i} style={{ height: `${height}px` }} />
              ))}
            </VisualizerBar>
          )}
        </DisplayPanel>
        
        <ControlPanel>
          <ModePanel>
            <ModeBtn 
              className={playMode === 'normal' ? 'active' : ''}
              onClick={togglePlayMode}
              title={`Mode: ${playMode}`}
            >
              {getPlayModeIcon()}
            </ModeBtn>
            <ModeBtn onClick={toggleVisualizer}>
              {showVisualizer ? '█' : '▢'}
            </ModeBtn>
            <ModeBtn onClick={toggleMute} title={volume === 0 ? '取消靜音' : '靜音'}>
              {volume === 0 ? '🔇' : '🔊'}
            </ModeBtn>
            <ModeBtn
              className={showPlaylist ? 'active' : ''}
              onClick={() => setShowPlaylist(p => !p)}
              title="播放清單"
            >
              ♫
            </ModeBtn>
          </ModePanel>
          
          <Controls>
            <ControlButton onClick={playPrev}>◄</ControlButton>
            <ControlButton onClick={playPause}>
              {isPlaying ? '■' : '►'}
            </ControlButton>
            <ControlButton onClick={playNext}>►</ControlButton>
          </Controls>
          
          <ProgressBarWrapper onClick={onProgressBarClick}>
            <ProgressBar style={{ width: `${progress}%` }} />
          </ProgressBarWrapper>
          
          <VolumeWrapper>
            <span style={{ color: '#000', fontSize: 10 }}>VOL</span>
            <VolumeBar 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={e => setVolume(Number(e.target.value))} 
            />
          </VolumeWrapper>
          
          <div style={{ fontSize: 10, color: '#000', textAlign: 'center', marginTop: 4 }}>
            Track {currentSongIndex + 1}/{songList.length} | {Math.round(volume * 100)}%
          </div>

          {showPlaylist && (
            <Playlist>
              {songList.map((song, i) => (
                <PlaylistItem
                  key={song.name}
                  $current={i === currentSongIndex}
                  onClick={() => selectSong(i)}
                  title={song.name}
                >
                  <span>{String(i + 1).padStart(2, '0')}. {song.name}</span>
                  <span>{i === currentSongIndex && isPlaying ? '►' : ''}</span>
                </PlaylistItem>
              ))}
            </Playlist>
          )}
          
          <audio
            ref={audioRef}
            src={currentSong.path}
            onEnded={playMode === 'loop' ? undefined : playNext}
            loop={playMode === 'loop'}
          />
        </ControlPanel>
      </PlayerWrapper>
    </>
  );
};

export default MP3Player; 