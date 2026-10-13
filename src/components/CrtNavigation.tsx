import { NavLink } from 'react-router-dom';

const pages = [['/', '首頁'], ['/works', '作品'], ['/tools', '工具箱'], ['/me', '關於'], ['/game', '遊戲']] as const;

export default function CrtNavigation() {
  return <nav className="crt-nav px screen-nav" aria-label="主要導覽">
    {pages.map(([to, label], index) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'on' : ''}>
      <span className="screen-key" aria-hidden="true">{index + 1}</span>{label}
    </NavLink>)}
  </nav>;
}
