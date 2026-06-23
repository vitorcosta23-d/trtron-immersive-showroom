import { create } from 'zustand'

export const modelOptions = [
  {
    id: 1,
    label: '1 tecla',
    accent: 'Essencial',
    plateScale: [0.92, 0.84, 1],
    positions: [[0, 0, 0.2]],
  },
  {
    id: 2,
    label: '2 teclas',
    accent: 'Duplo comando',
    plateScale: [1, 1.02, 1],
    positions: [
      [0, 0.45, 0.2],
      [0, -0.45, 0.2],
    ],
  },
  {
    id: 4,
    label: '4 teclas',
    accent: 'Cenas inteligentes',
    plateScale: [1.14, 1.18, 1],
    positions: [
      [-0.34, 0.55, 0.2],
      [0.34, 0.55, 0.2],
      [-0.34, -0.55, 0.2],
      [0.34, -0.55, 0.2],
    ],
  },
  {
    id: 6,
    label: '6 teclas',
    accent: 'Automacao total',
    plateScale: [1.2, 1.52, 1],
    positions: [
      [-0.36, 0.95, 0.2],
      [0.36, 0.95, 0.2],
      [-0.36, 0, 0.2],
      [0.36, 0, 0.2],
      [-0.36, -0.95, 0.2],
      [0.36, -0.95, 0.2],
    ],
  },
]

export const finishOptions = [
  {
    id: 'black',
    label: 'Preto Brilhante',
    swatch: '#0a0a0b',
    plateColor: '#101011',
    keyColor: '#111214',
    accentColor: '#8f724d',
    edgeColor: '#1c1c1f',
    buttonBorder: 'rgba(255,255,255,0.78)',
    reflection:
      'linear-gradient(145deg, rgba(255,255,255,0), rgba(255,255,255,0.12) 48%, rgba(255,255,255,0) 100%)',
    texture: 'none',
  },
  {
    id: 'white',
    label: 'Branco Minimalista',
    swatch: '#f4f3ef',
    plateColor: '#f4f3ef',
    keyColor: '#f6f5f1',
    accentColor: '#d8cab4',
    edgeColor: '#d7d4cb',
    buttonBorder: 'rgba(76,84,92,0.44)',
    reflection:
      'linear-gradient(145deg, rgba(0,0,0,0), rgba(255,255,255,0.35) 48%, rgba(0,0,0,0) 100%)',
    texture: 'none',
  },
  {
    id: 'marble',
    label: 'Marmore Calacata',
    swatch: '#f7f3eb',
    plateColor: '#f7f3eb',
    keyColor: '#f8f5ef',
    accentColor: '#cf9f85',
    edgeColor: '#ddd6cb',
    buttonBorder: 'rgba(49,53,56,0.56)',
    reflection:
      'linear-gradient(145deg, rgba(0,0,0,0), rgba(255,255,255,0.3) 48%, rgba(0,0,0,0) 100%)',
    texture:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-50,150 Q100,120 180,300 T450,350' fill='none' stroke='%23d19b84' stroke-width='4' opacity='0.7'/%3E%3Cpath d='M180,300 Q200,450 300,650' fill='none' stroke='%23d19b84' stroke-width='3' opacity='0.6'/%3E%3Cpath d='M300,50 Q350,150 450,100' fill='none' stroke='%23d19b84' stroke-width='2' opacity='0.5'/%3E%3Cpath d='M-20,400 Q100,380 150,500' fill='none' stroke='%23d19b84' stroke-width='1.5' opacity='0.4'/%3E%3C/svg%3E\")",
  },
  {
    id: 'wood',
    label: 'Madeira Premium',
    swatch: '#8a6240',
    plateColor: '#8a6240',
    keyColor: '#956c49',
    accentColor: '#d6b48a',
    edgeColor: '#603f25',
    buttonBorder: 'rgba(255,255,255,0.34)',
    reflection:
      'linear-gradient(145deg, rgba(0,0,0,0), rgba(255,255,255,0.12) 48%, rgba(0,0,0,0) 100%)',
    texture:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04 0.001' numOctaves='3' result='noise'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
  },
]

export const ledOptions = [
  { id: 'blue', label: 'Azul', color: '#6fb0dd', bloom: '#aad2ed' },
  { id: 'green', label: 'Verde', color: '#53f28d', bloom: '#8dffb3' },
  { id: 'yellow', label: 'Ambar', color: '#e8b34b', bloom: '#f6d58d' },
]

export const environmentOptions = [
  {
    id: 'living',
    label: 'Sala',
    wall: '#eadfce',
    accent: '#9e6330',
    copy: 'Acabamento elegante para cenas sociais com calor visual e linguagem sofisticada.',
  },
  {
    id: 'bedroom',
    label: 'Quarto',
    wall: '#e7ddd3',
    accent: '#6f4b2a',
    copy: 'Leitura noturna, led suave e um clima acolhedor para o descanso.',
  },
]

const findById = (collection, id) => collection.find((item) => item.id === id)

export const useConfiguratorStore = create((set, get) => ({
  selectedModel: 4,
  selectedFinish: 'black',
  selectedLed: 'yellow',
  selectedEnvironment: 'living',
  budgetCapture: null,
  setModel: (selectedModel) => set({ selectedModel }),
  setFinish: (selectedFinish) => set({ selectedFinish }),
  setLed: (selectedLed) => set({ selectedLed }),
  setEnvironment: (selectedEnvironment) => set({ selectedEnvironment }),
  captureBudget: () => {
    const state = get()
    const model = findById(modelOptions, state.selectedModel)
    const finish = findById(finishOptions, state.selectedFinish)
    const led = findById(ledOptions, state.selectedLed)
    const environment = findById(environmentOptions, state.selectedEnvironment)

    set({
      budgetCapture: {
        model: model?.label,
        finish: finish?.label,
        led: led?.label,
      },
    })
  },
}))
