import React from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  pointer-events: none;
`;

const VideoBackground = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8) contrast(1.1) saturate(1.2);
`;

const ColorBackground = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.src};
`;

const ImageBackground = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  filter: brightness(0.9) contrast(1.1);
`;

const DesktopBackground = ({ background }) => {
  if (!background) return null;

  return (
    <BackgroundContainer>
      {background.type === 'video' && (
        <VideoBackground
          key={background.src}
          src={background.src}
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      {background.type === 'image' && (
        <ImageBackground src={background.src} />
      )}
      {background.type === 'color' && (
        <ColorBackground src={background.src} />
      )}
    </BackgroundContainer>
  );
};

export default DesktopBackground; 