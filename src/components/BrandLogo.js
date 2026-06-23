function WifiMark() {
  return (
    <span className="brand-wifi" aria-hidden="true">
      <span className="brand-wifi-arc brand-wifi-arc-1" />
      <span className="brand-wifi-arc brand-wifi-arc-2" />
      <span className="brand-wifi-arc brand-wifi-arc-3" />
      <span className="brand-wifi-dot" />
    </span>
  )
}

function BrandLogo({ className = '' }) {
  return (
    <div className={`brand-logo ${className}`} aria-label="TRtron">
      <span className="brand-logo-text">TR</span>
      <WifiMark />
      <span className="brand-logo-text">tron</span>
    </div>
  )
}

export default BrandLogo
