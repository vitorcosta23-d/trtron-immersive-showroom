import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const pillars = [
  {
    value: '36',
    suffix: 'anos no setor',
    title: 'Expertise eletrônica',
    description: 'A autoridade técnica da TRtron vem de décadas no segmento eletrônico, aplicadas ao presente da automação.',
  },
  {
    value: '100%',
    suffix: 'nacional',
    title: 'Fabricação brasileira',
    description: 'Produtos desenvolvidos e fabricados no Brasil com padrão elevado de qualidade e proximidade no suporte.',
  },
  {
    value: '5',
    suffix: 'anos',
    title: 'Garantia estendida',
    description: 'Confiança de longo prazo para projetos residenciais e prediais que pedem durabilidade real.',
  },
]

const milestones = [
  {
    year: '2009',
    title: 'Nascimento da TRtron',
    description: 'A marca inicia sua trajetória projetando e fabricando interruptores touch para o mercado brasileiro.',
  },
  {
    year: '2016',
    title: 'Garantia de 5 anos',
    description: 'A confiança no processo produtivo se transforma em uma garantia robusta para toda a linha.',
  },
  {
    year: '2017 - 2022',
    title: 'Personalização e inovação',
    description: 'A TRtron amplia soluções sob medida e atualiza continuamente sua linha com novas tecnologias.',
  },
  {
    year: 'Hoje',
    title: 'Referência nacional',
    description: 'Com fabricação local, qualidade certificada e foco total no cliente, a marca segue olhando para o futuro.',
  },
]

function History() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section
      id="history"
      ref={sectionRef}
      className="relative overflow-hidden border-y border-white/8 bg-trtron-950 py-24 sm:py-32"
    >
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-x-0 top-16 mx-auto h-72 w-72 rounded-full bg-trtron-500/15 blur-[120px]"
      />
      <div className="section-shell relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.65rem] uppercase tracking-[0.36em] text-white/70">
              Nossa história
            </span>
            <h2 className="mt-6 max-w-lg font-serif text-4xl leading-tight text-white sm:text-5xl">
              Uma marca brasileira que cresceu com consistência, qualidade e relação próxima com o cliente.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl justify-self-end text-base leading-8 text-white/70"
          >
            A TRtron nasceu em 2009, mas carrega uma bagagem de 36 anos no setor eletrônico.
            Esse histórico, somado à fabricação nacional, à certificação ISO 9001 e à garantia de 5
            anos, explica por que a marca transmite segurança em projetos residenciais e prediais.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, delay: index * 0.1 }}
              className="sensor-card glass-panel rounded-[2rem] p-7"
            >
              <div className="flex items-end gap-2">
                <span className="font-serif text-5xl text-white">{pillar.value}</span>
                <span className="pb-2 text-sm uppercase tracking-[0.24em] text-white/45">
                  {pillar.suffix}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-white">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/68">{pillar.description}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75 }}
            className="sensor-card glass-panel rounded-[2rem] p-7"
          >
            <span className="text-xs uppercase tracking-[0.32em] text-white/45">Qualidade certificada</span>
            <h3 className="mt-4 font-serif text-3xl text-white">Qualidade de fábrica, personalização e atendimento próximo.</h3>
            <p className="mt-5 text-sm leading-7 text-white/68">
              No site institucional, a TRtron reforça responsabilidade, melhoria contínua e
              compromisso com a satisfação do cliente. Aqui, isso aparece de forma mais clara e
              objetiva: produto bem resolvido, acabamento bonito e uma marca que inspira confiança.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {milestones.map((milestone, index) => (
              <motion.article
                key={milestone.year}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="sensor-card rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-[0.28em] text-trtron-200">{milestone.year}</span>
                    <h3 className="mt-2 text-lg font-semibold text-white">{milestone.title}</h3>
                  </div>
                  <div className="h-px w-full bg-white/10 sm:hidden" />
                  <p className="max-w-xl text-sm leading-7 text-white/65">{milestone.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default History
