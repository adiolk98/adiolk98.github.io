import React, { useRef, useEffect } from 'react';
import { GameContent, GameVideo } from '../styles/styledComponents';

const OpeningVideo = ({ onVideoEnd }) => {
  const videoRef = useRef(null);

  // 帶聲音的 autoplay 幾乎一定會被瀏覽器擋下來，play() 一被拒絕影片就永遠停在
  // 第一格、onEnded 也不會發生——整台 GBA 就卡在黑畫面。所以失敗要退回靜音播放，
  // 再失敗就直接跳過開場。
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => onVideoEnd());
    });

    // 影片也可能不是「出錯」而是「一直載不動」（連線很慢、瀏覽器沒有這個
    // 編解碼器），這時 onError 不會發生。給它幾秒，還播不起來就直接進 PRESS START，
    // 不要把整台掌機留在黑畫面。
    const watchdog = setTimeout(() => {
      if (video.readyState < 3) onVideoEnd();
    }, 4000);
    return () => clearTimeout(watchdog);
  }, [onVideoEnd]);

  return (
    <GameContent onClick={onVideoEnd} title="點一下跳過開場">
      <GameVideo
        ref={videoRef}
        onEnded={onVideoEnd}
        onError={onVideoEnd}
        playsInline
        controls={false}
      >
        <source src="/assets/gameboy-opening.mp4" type="video/mp4" />
        您的瀏覽器不支援影片播放
      </GameVideo>
    </GameContent>
  );
};

export default OpeningVideo;
