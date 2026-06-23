const WHATSAPP_URL = 'https://wa.me/5511924082310'

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="interactive-surface whatsapp-fab"
    >
      <span className="whatsapp-fab-icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current">
          <path d="M16.04 3.2c-7.02 0-12.72 5.66-12.72 12.63 0 2.23.59 4.41 1.7 6.33L3 29l7.06-1.84a12.79 12.79 0 0 0 5.98 1.52h.01c7.02 0 12.75-5.66 12.75-12.64A12.67 12.67 0 0 0 16.04 3.2zm0 23.35h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-4.19 1.1 1.12-4.06-.25-.41a10.48 10.48 0 0 1-1.61-5.63c0-5.8 4.76-10.52 10.62-10.52 2.84 0 5.5 1.1 7.49 3.08a10.4 10.4 0 0 1 3.12 7.43c0 5.8-4.77 10.52-10.5 10.52zm5.76-7.86c-.31-.15-1.82-.9-2.1-1-.28-.1-.48-.15-.68.15s-.78.99-.96 1.2c-.18.2-.36.23-.67.08-.31-.15-1.32-.48-2.5-1.54-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.14-.63.13-.13.31-.36.46-.54.15-.18.2-.31.31-.52.1-.2.05-.39-.03-.54-.08-.15-.69-1.65-.95-2.27-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.54.08-.83.39-.28.31-1.08 1.06-1.08 2.58 0 1.52 1.12 2.99 1.27 3.2.15.2 2.17 3.3 5.25 4.63.73.32 1.3.51 1.75.64.74.24 1.42.2 1.96.12.6-.09 1.82-.74 2.07-1.46.26-.72.26-1.34.18-1.46-.08-.13-.28-.21-.59-.36z" />
        </svg>
      </span>
      <span className="whatsapp-fab-copy">
        <strong>Fale com um consultor</strong>
        <small>WhatsApp comercial</small>
      </span>
    </a>
  )
}

export default FloatingWhatsApp
