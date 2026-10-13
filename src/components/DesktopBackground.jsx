import React from 'react';

// Integer-aligned blocks keep the wallpaper's edges crisp under the tube glass.
const buildings = [
  [0, 188, 70, 150], [60, 158, 72, 180], [125, 211, 75, 127],
  [193, 137, 82, 201], [268, 181, 62, 157], [323, 226, 88, 112],
  [405, 196, 66, 142], [461, 160, 79, 178], [531, 219, 88, 119],
  [611, 135, 74, 203], [677, 184, 79, 154], [748, 215, 100, 123],
  [839, 164, 79, 174], [910, 203, 90, 135],
];

export default function DesktopBackground({ background }) {
  return <div className={`desktop-wallpaper wallpaper-${background?.variant || 'dusk'}`} aria-hidden="true">
    <svg viewBox="0 0 1000 650" preserveAspectRatio="xMidYMid slice" className="desktop-city" shapeRendering="crispEdges">
      <defs>
        <pattern id="city-windows" width="20" height="24" patternUnits="userSpaceOnUse"><rect x="6" y="6" width="5" height="8" fill="var(--city-light)" opacity=".55" /></pattern>
        <pattern id="city-water" width="90" height="28" patternUnits="userSpaceOnUse"><rect width="35" height="2" fill="var(--city-light)" opacity=".1" /><rect x="54" y="14" width="20" height="2" fill="var(--city-light)" opacity=".12" /></pattern>
      </defs>
      <path d="M650 100h60v8h32v12h20v20h12v56h-12v20h-20v12h-32v8h-60v-8h-32v-12h-20v-20h-12v-56h12v-20h20v-12h32z" fill="var(--city-sun)" />
      <g fill="var(--city-cloud)"><path d="M320 99h116v6h68v7H320zM714 265h129v7h-59v5H672v-6h42zM430 68h40v5h51v5h-91z" /><rect x="766" y="115" width="126" height="4" /></g>
      <g fill="var(--city-far)"><path d="M0 295v-32h30v-38h58v38h25v-75h22v-10h39v101h24v-24h81v-50h45v42h53v-95h65v112h20v-22h51v-62h25v-15h41v86h44v-44h62v-45h61v122h25v-74h31v-39h29v39h30v58h48v-20h34v-55h56v83h26v-42h55v59h35v-96h68v198H0z" /></g>
      <g transform="translate(0 84)">{buildings.map(([x,y,w,h],i)=><g key={x}>
        <rect x={x} y={y} width={w} height={h} fill={i%3===0 ? 'var(--city-building-alt)' : 'var(--city-building)'} />
        <rect x={x+5} y={y+8} width={w-10} height={h-8} fill="url(#city-windows)" />
        <rect x={x-2} y={y} width={w+4} height="5" fill="var(--city-outline)" />
        {i%4===0 && <rect x={x+w/2-2} y={y-30} width="3" height="30" fill="var(--city-outline)" />}
      </g>)}</g>
      <rect y="422" width="1000" height="228" fill="var(--city-water)" />
      <rect y="426" width="1000" height="224" fill="url(#city-water)" />
      <path d="M550 478h113v3H550zM594 511h86v3h-86zM523 549h171v3H523zM601 588h120v3H601z" fill="var(--city-sun)" opacity=".2" />
      <rect y="415" width="1000" height="7" fill="var(--city-outline)" />
      <path d="M0 593h160v-5h224v11h325v-9h291v60H0z" fill="var(--city-outline)" />
    </svg>
    <div className="wallpaper-sign"><span>adi</span><small>SMALL COMPUTER, BIG IDEAS.</small></div>
  </div>;
}
