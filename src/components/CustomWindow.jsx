import styled from 'styled-components';

const CustomWindow = styled.div.attrs({ className: 'px' })`
  background: var(--crt-cream);
  box-shadow: inset 0 0 0 2px var(--crt-line), .22em .26em 0 rgba(0, 0, 0, .34);
  padding: .18em;
  display:grid;
  grid-template-rows:2.3em minmax(0,1fr);
  font-size: clamp(12px, .75em, 17px);
  font-family: 'DotGothic16',monospace;
  overflow: hidden;
  position: relative;
`;

export default CustomWindow;
