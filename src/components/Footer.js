import BrandLogo from './BrandLogo'

const menuLinks = [
  { label: 'Início', href: '#welcome' },
  { label: 'História', href: '#history' },
  { label: 'Showroom', href: '#showroom' },
  { label: 'Site oficial', href: 'https://www.trtron.com.br/' },
]

const importantLinks = [
  { label: 'Política de Privacidade', href: 'https://www.trtron.com.br/politica-de-privacidade/' },
  {
    label: 'Política de LGPD',
    href: 'https://www.trtron.com.br/politica-de-privacidade-e-protecao-de-dados-lgpd-tr-tron/',
  },
  { label: 'Tipos e Dados Técnicos', href: 'https://www.trtron.com.br/tipos-e-dados-tecnicos/' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/trtrontec/' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100089662610725' },
  { label: 'WhatsApp', href: 'https://wa.me/5511924082310' },
]

function FooterIcon({ type }) {
  const paths = {
    phone: 'M6.6 10.8c1.6 3.1 4.2 5.6 7.3 7.3l2.4-2.4a1 1 0 0 1 1-.25c1.1.36 2.26.55 3.47.55a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C11.5 22 2 12.5 2 1.5a1 1 0 0 1 1-1H6a1 1 0 0 1 1 1c0 1.2.19 2.36.55 3.47a1 1 0 0 1-.25 1z',
    mail: 'M3 6.75 12 13l9-6.25M4.5 5h15A1.5 1.5 0 0 1 21 6.5v11A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11A1.5 1.5 0 0 1 4.5 5z',
    pin: 'M12 21s6-5.33 6-11a6 6 0 1 0-12 0c0 5.67 6 11 6 11zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    clock: 'M12 7v5l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d={paths[type]}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0e0906]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,154,67,0.18),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(246,239,226,0.07),transparent_20%)]" />
      <div className="section-shell relative z-10 py-16 sm:py-20">
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-panel backdrop-blur-xl lg:grid-cols-[1.1fr_0.8fr_0.8fr_0.9fr] lg:p-8">
          <div>
            <div className="brand-shell justify-start p-0">
              <BrandLogo className="scale-[0.84] origin-left sm:scale-100" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/68">
              Tecnologia eletrônica com design sofisticado, fabricação nacional e foco em
              interruptores inteligentes que valorizam o ambiente.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="interactive-surface rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/72 transition hover:border-trtron-300/40 hover:bg-trtron-400/10 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-trtron-100/48">Navegação</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
              {menuLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.34em] text-trtron-100/48">Importante</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
              {importantLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-trtron-100/48">Contato</p>
            <div className="mt-5 space-y-4 text-sm text-white/72">
              <div className="flex items-start gap-3">
                <span className="mt-1 text-trtron-300">
                  <FooterIcon type="phone" />
                </span>
                <div>
                  <p className="text-white">(11) 92408-2310</p>
                  <p className="text-white/48">Comercial</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-trtron-300">
                  <FooterIcon type="phone" />
                </span>
                <div>
                  <p className="text-white">(11) 91173-3194</p>
                  <p className="text-white/48">Administrativo</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-trtron-300">
                  <FooterIcon type="phone" />
                </span>
                <div>
                  <p className="text-white">(11) 95610-2907</p>
                  <p className="text-white/48">Suporte</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-trtron-300">
                  <FooterIcon type="mail" />
                </span>
                <a href="mailto:[email protected]" className="transition hover:text-white">
                  [email protected]
                </a>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-trtron-300">
                  <FooterIcon type="pin" />
                </span>
                <p>Rua Tupi Paulista, 120 - Estância Flora Rica, Peruíbe - SP</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.34em] text-trtron-100/48">Atendimento</p>
            <div className="mt-5 space-y-4 text-sm text-white/72">
              <div className="flex items-start gap-3">
                <span className="mt-1 text-trtron-300">
                  <FooterIcon type="clock" />
                </span>
                <div>
                  <p className="text-white">Segunda a quinta-feira</p>
                  <p className="text-white/48">07:30 - 12:00 / 13:00 - 17:30</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 text-trtron-300">
                  <FooterIcon type="clock" />
                </span>
                <div>
                  <p className="text-white">Sexta-feira</p>
                  <p className="text-white/48">07:30 - 12:00 / 13:00 - 16:30</p>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-trtron-100/45">TRtron</p>
                <p className="mt-3 text-sm leading-7 text-white/66">
                  100% brasileira, com 36 anos de experiência no setor eletrônico e 5 anos de
                  garantia na linha de interruptores.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.18em] text-white/38 md:flex-row md:items-center md:justify-between">
          <p>TRtron Tecnologia Eletrônica • CNPJ 10.797.606/0001-53</p>
          <p>Copyright © 2024 TRtron</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
