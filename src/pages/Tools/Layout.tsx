import { useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CrtHeader from '../../components/CrtHeader';
import CrtNavigation from '../../components/CrtNavigation';

export default function ToolLayout() {
  const board = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  useLayoutEffect(() => { board.current?.scrollTo(0, 0); }, [pathname]);
  return <main className="screen-page tool-workspace">
    <CrtHeader section="TOOL BOX / UTILITY" />
    <div className="screen-board tool-workspace-board" ref={board}><Outlet /></div>
    <div className="screen-status"><span>LOCAL PROCESSING</span><span>檔案在瀏覽器內處理</span></div>
    <CrtNavigation />
  </main>;
}
