export default function CrtHeader({ section }: { section: string }) {
  return <header className="crt-bar px screen-header">
    <span className="screen-brand">ADI-9800</span>
    <span className="screen-section">{section}</span>
    <span className="screen-online"><span aria-hidden="true" /> SYSTEM READY</span>
  </header>;
}
