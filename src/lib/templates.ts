import type { BlockType, BlockSize } from '../types'

export interface TemplateBlock {
  type: BlockType
  size: BlockSize
  data: Record<string, any>
}

export interface Template {
  id: string
  name: string
  description: string
  emoji: string
  category: 'objective' | 'profession'
  blocks: TemplateBlock[]
}

export const TEMPLATES: Template[] = [
  {
    id: 'get-clients',
    name: 'Conseguir clientes',
    description: 'Mostre seus serviços e facilite o contato',
    emoji: '🤝',
    category: 'objective',
    blocks: [
      { type: 'header', size: 'full', data: { displayName: 'Seu nome', bio: 'Profissional especializado em transformar ideias em resultados', avatarUrl: '' } },
      { type: 'text', size: 'full', data: { content: 'Olá! Sou especialista em ajudar empresas a alcançarem seus objetivos.' } },
      { type: 'service', size: '2x2', data: { title: 'Consultoria', description: 'Análise completa do seu negócio', actionLabel: 'Agendar consulta', actionUrl: '' } },
      { type: 'service', size: '2x1', data: { title: 'Auditoria', description: 'Identifique pontos de melhoria', actionLabel: 'Solicitar', actionUrl: '' } },
      { type: 'link', size: '2x1', data: { title: 'Ver portfólio', url: 'https://', description: 'Confira nossos trabalhos' } },
      { type: 'newsletter', size: '2x1', data: { title: 'Receba dicas exclusivas', description: 'Conteúdo semanal', placeholder: 'seu@email.com', buttonText: 'Inscrever' } },
      { type: 'socials', size: '1x1', data: { items: [{ platform: 'instagram', url: '' }, { platform: 'linkedin', url: '' }] } },
    ],
  },
  {
    id: 'sell-products',
    name: 'Vender produtos',
    description: 'Destaque seus produtos com preço e imagens',
    emoji: '🛒',
    category: 'objective',
    blocks: [
      { type: 'header', size: 'full', data: { displayName: 'Sua loja', bio: 'Produtos selecionados com carinho', avatarUrl: '' } },
      { type: 'product', size: '2x2', data: { title: 'Produto em destaque', description: 'Nosso item mais vendido', imageUrl: '', price: '99', linkUrl: '' } },
      { type: 'product', size: '2x1', data: { title: 'Kit especial', description: 'Leve 3 pague 2', imageUrl: '', price: '149', linkUrl: '' } },
      { type: 'product', size: '2x1', data: { title: 'Novidade', description: 'Acabou de chegar', imageUrl: '', price: '79', linkUrl: '' } },
      { type: 'text', size: 'full', data: { content: 'Frete grátis para compras acima de R$ 200' } },
      { type: 'link', size: '2x1', data: { title: 'Falar no WhatsApp', url: 'https://wa.me/', description: 'Tire suas dúvidas' } },
      { type: 'socials', size: '1x1', data: { items: [{ platform: 'instagram', url: '' }] } },
    ],
  },
  {
    id: 'show-portfolio',
    name: 'Mostrar portfólio',
    description: 'Destaque seus melhores trabalhos',
    emoji: '🎨',
    category: 'objective',
    blocks: [
      { type: 'header', size: 'full', data: { displayName: 'Seu nome', bio: 'Criador visual | Design e identidade visual', avatarUrl: '' } },
      { type: 'gallery', size: '2x2', data: { images: [] } },
      { type: 'video', size: '2x2', data: { title: 'Showreel 2024', embedUrl: '' } },
      { type: 'text', size: 'full', data: { content: 'Mais de 50 projetos entregues | 100% satisfação' } },
      { type: 'link', size: '2x1', data: { title: 'Baixar CV', url: 'https://', description: 'Currículo atualizado' } },
      { type: 'newsletter', size: '2x1', data: { title: 'Acompanhe meu trabalho', description: 'Novos projetos toda semana', placeholder: 'seu@email.com', buttonText: 'Seguir' } },
      { type: 'socials', size: '1x1', data: { items: [{ platform: 'instagram', url: '' }, { platform: 'behance', url: '' }, { platform: 'dribbble', url: '' }] } },
    ],
  },
  {
    id: 'share-work',
    name: 'Divulgar trabalho',
    description: 'Promova seu projeto ou conteúdo',
    emoji: '📢',
    category: 'objective',
    blocks: [
      { type: 'header', size: 'full', data: { displayName: 'Seu projeto', bio: 'Transformando o mundo', avatarUrl: '' } },
      { type: 'video', size: '2x2', data: { title: 'Conheça nosso trabalho', embedUrl: '' } },
      { type: 'text', size: 'full', data: { content: 'Estamos em busca de parceiros e apoiadores!' } },
      { type: 'link', size: '2x1', data: { title: 'Apoiar o projeto', url: 'https://', description: 'Qualquer valor ajuda' } },
      { type: 'link', size: '2x1', data: { title: 'Ser voluntário', url: 'https://', description: 'Junte-se a nós' } },
      { type: 'newsletter', size: '2x1', data: { title: 'Fique por dentro', description: 'Atualizações semanais', placeholder: 'seu@email.com', buttonText: 'Receber' } },
      { type: 'socials', size: '1x1', data: { items: [{ platform: 'twitter', url: '' }, { platform: 'instagram', url: '' }] } },
    ],
  },
  {
    id: 'receive-contacts',
    name: 'Receber contatos',
    description: 'Facilite como as pessoas encontram você',
    emoji: '📬',
    category: 'objective',
    blocks: [
      { type: 'header', size: 'full', data: { displayName: 'Seu nome', bio: 'Disponível para projetos e parcerias', avatarUrl: '' } },
      { type: 'text', size: 'full', data: { content: 'Precisa falar comigo? Escolha a melhor forma:' } },
      { type: 'link', size: '2x1', data: { title: 'Enviar e-mail', url: 'mailto:seu@email.com', description: 'Respondo em até 24h' } },
      { type: 'link', size: '2x1', data: { title: 'WhatsApp', url: 'https://wa.me/', description: 'Mensagem direta' } },
      { type: 'link', size: '2x1', data: { title: 'Agendar ligação', url: 'https://calendly.com/', description: 'Escolha um horário' } },
      { type: 'link', size: '2x1', data: { title: 'LinkedIn', url: 'https://linkedin.com/in/', description: 'Conecte-se comigo' } },
      { type: 'socials', size: '1x1', data: { items: [{ platform: 'instagram', url: '' }, { platform: 'twitter', url: '' }] } },
    ],
  },
  {
    id: 'build-brand',
    name: 'Criar marca',
    description: 'Construa sua presença digital',
    emoji: '✨',
    category: 'objective',
    blocks: [
      { type: 'header', size: 'full', data: { displayName: 'Sua marca', bio: 'Construindo algo incrível juntos', avatarUrl: '' } },
      { type: 'text', size: 'full', data: { content: 'Nossa missão é transformar a experiência dos nossos clientes.' } },
      { type: 'video', size: '2x2', data: { title: 'Nossa história', embedUrl: '' } },
      { type: 'gallery', size: '2x2', data: { images: [] } },
      { type: 'product', size: '2x1', data: { title: 'Produto principal', description: 'Nosso carro-chefe', imageUrl: '', price: '199', linkUrl: '' } },
      { type: 'newsletter', size: '2x1', data: { title: 'Junte-se a nós', description: 'Faça parte da comunidade', placeholder: 'seu@email.com', buttonText: 'Participar' } },
      { type: 'socials', size: '1x1', data: { items: [{ platform: 'instagram', url: '' }, { platform: 'twitter', url: '' }, { platform: 'youtube', url: '' }] } },
    ],
  },
  {
    id: 'designer',
    name: 'Designer',
    description: 'Showcase criativo com galeria e projetos',
    emoji: '🎨',
    category: 'profession',
    blocks: [
      { type: 'header', size: 'full', data: { displayName: 'Designer', bio: 'Criando experiências visuais memoráveis', avatarUrl: '' } },
      { type: 'gallery', size: '2x2', data: { images: [] } },
      { type: 'video', size: '2x2', data: { title: 'Showreel', embedUrl: '' } },
      { type: 'text', size: 'full', data: { content: 'Premiado | Clientes globais | Disponível para projetos' } },
      { type: 'link', size: '2x1', data: { title: 'Behance', url: 'https://behance.net', description: 'Portfólio completo' } },
      { type: 'link', size: '2x1', data: { title: 'Fiverr', url: 'https://fiverr.com', description: 'Contratar serviços' } },
      { type: 'socials', size: '1x1', data: { items: [{ platform: 'instagram', url: '' }, { platform: 'dribbble', url: '' }] } },
    ],
  },
  {
    id: 'developer',
    name: 'Desenvolvedor',
    description: 'Portfólio técnico com links e projetos',
    emoji: '💻',
    category: 'profession',
    blocks: [
      { type: 'header', size: 'full', data: { displayName: 'Dev', bio: 'Full-stack developer | Open source enthusiast', avatarUrl: '' } },
      { type: 'text', size: 'full', data: { content: 'Tech stack: React, Node.js, TypeScript, PostgreSQL' } },
      { type: 'link', size: '2x1', data: { title: 'GitHub', url: 'https://github.com', description: 'Projetos open source' } },
      { type: 'link', size: '2x1', data: { title: 'LinkedIn', url: 'https://linkedin.com', description: 'Networking' } },
      { type: 'video', size: '2x2', data: { title: 'Demo reel', embedUrl: '' } },
      { type: 'service', size: '2x1', data: { title: 'Freelance', description: 'Desenvolvimento web e mobile', actionLabel: 'Orçamento', actionUrl: '' } },
      { type: 'newsletter', size: '2x1', data: { title: 'Newsletter tech', description: 'Dicas semanais de código', placeholder: 'email@dev.com', buttonText: 'Inscrever' } },
      { type: 'socials', size: '1x1', data: { items: [{ platform: 'github', url: '' }, { platform: 'twitter', url: '' }] } },
    ],
  },
  {
    id: 'musician',
    name: 'Musico',
    description: 'Compartilhe musica e shows',
    emoji: '🎵',
    category: 'profession',
    blocks: [
      { type: 'header', size: 'full', data: { displayName: 'Musico', bio: 'Producer | Singer | Multi-instrumentalist', avatarUrl: '' } },
      { type: 'video', size: '2x2', data: { title: 'Ultimo clipe', embedUrl: '' } },
      { type: 'gallery', size: '2x2', data: { images: [] } },
      { type: 'link', size: '2x1', data: { title: 'Spotify', url: 'https://open.spotify.com', description: 'Ouca agora' } },
      { type: 'link', size: '2x1', data: { title: 'YouTube', url: 'https://youtube.com', description: 'Clipe oficial' } },
      { type: 'text', size: 'full', data: { content: 'Shows: Sao Paulo, Rio, Curitiba | Proximo: 15/09' } },
      { type: 'newsletter', size: '2x1', data: { title: 'Fa club', description: 'Novidades e bastidores', placeholder: 'email@musica.com', buttonText: 'Participar' } },
      { type: 'socials', size: '1x1', data: { items: [{ platform: 'instagram', url: '' }, { platform: 'youtube', url: '' }] } },
    ],
  },
  {
    id: 'photographer',
    name: 'Fotografo',
    description: 'Galeria de fotos com servicos',
    emoji: '📸',
    category: 'profession',
    blocks: [
      { type: 'header', size: 'full', data: { displayName: 'Fotografo', bio: 'Capturando momentos especiais', avatarUrl: '' } },
      { type: 'gallery', size: '2x2', data: { images: [] } },
      { type: 'gallery', size: '2x2', data: { images: [] } },
      { type: 'service', size: '2x1', data: { title: 'Ensaio fotografico', description: '2h de sessao + 20 fotos editadas', actionLabel: 'Agendar', actionUrl: '' } },
      { type: 'service', size: '2x1', data: { title: 'Cobertura de evento', description: 'Evento completo com edicao profissional', actionLabel: 'Cotacao', actionUrl: '' } },
      { type: 'link', size: '2x1', data: { title: 'prints', url: 'https://', description: 'Compre suas fotos' } },
      { type: 'newsletter', size: '2x1', data: { title: 'Dicas de fotografia', description: 'Tecnicas toda semana', placeholder: 'email@foto.com', buttonText: 'Seguir' } },
      { type: 'socials', size: '1x1', data: { items: [{ platform: 'instagram', url: '' }, { platform: 'behance', url: '' }] } },
    ],
  },
  {
    id: 'streamer',
    name: 'Streamer',
    description: 'Links de transmissao e redes',
    emoji: '🎮',
    category: 'profession',
    blocks: [
      { type: 'header', size: 'full', data: { displayName: 'Streamer', bio: 'Live todos os dias as 20h | GTA, Valorant, Variety', avatarUrl: '' } },
      { type: 'video', size: '2x2', data: { title: 'Ultimo highlight', embedUrl: '' } },
      { type: 'link', size: '2x1', data: { title: 'Twitch', url: 'https://twitch.tv', description: 'Assista ao vivo' } },
      { type: 'link', size: '2x1', data: { title: 'YouTube', url: 'https://youtube.com', description: 'VODs e clipes' } },
      { type: 'product', size: '2x1', data: { title: 'Camiseta exclusiva', description: 'Merch oficial do canal', imageUrl: '', price: '89', linkUrl: '' } },
      { type: 'link', size: '2x1', data: { title: 'Assinar', url: 'https://', description: 'Suporte o canal' } },
      { type: 'newsletter', size: '2x1', data: { title: 'Alertas de live', description: 'Receba quando eu for ao ar', placeholder: 'email@live.com', buttonText: 'Ativar' } },
      { type: 'socials', size: '1x1', data: { items: [{ platform: 'instagram', url: '' }, { platform: 'twitter', url: '' }] } },
    ],
  },
  {
    id: 'teacher',
    name: 'Professor',
    description: 'Cursos, aulas e materiais',
    emoji: '📚',
    category: 'profession',
    blocks: [
      { type: 'header', size: 'full', data: { displayName: 'Professor', bio: 'Ensino de qualidade para todos os niveis', avatarUrl: '' } },
      { type: 'text', size: 'full', data: { content: '+10 anos de experiencia | 5000+ alunos | Avaliacao 4.9' } },
      { type: 'service', size: '2x2', data: { title: 'Curso completo', description: 'Do basico ao avancado com certificado', actionLabel: 'Matricular', actionUrl: '' } },
      { type: 'link', size: '2x1', data: { title: 'YouTube', url: 'https://youtube.com', description: 'Aulas gratuitas' } },
      { type: 'link', size: '2x1', data: { title: 'Material', url: 'https://', description: 'PDFs e exercicios' } },
      { type: 'newsletter', size: '2x1', data: { title: 'Dicas de estudo', description: 'Conteudo toda segunda', placeholder: 'email@aula.com', buttonText: 'Receber' } },
      { type: 'socials', size: '1x1', data: { items: [{ platform: 'instagram', url: '' }, { platform: 'youtube', url: '' }] } },
    ],
  },
  {
    id: 'company',
    name: 'Empresa',
    description: 'Pagina institucional com servicos',
    emoji: '🏢',
    category: 'profession',
    blocks: [
      { type: 'header', size: 'full', data: { displayName: 'Empresa', bio: 'Inovando desde 2020 | Solucoes para o seu negocio', avatarUrl: '' } },
      { type: 'text', size: 'full', data: { content: 'Somos especializados em transformar negocios com tecnologia.' } },
      { type: 'service', size: '2x1', data: { title: 'Consultoria', description: 'Diagnostico completo do seu negocio', actionLabel: 'Falar com especialista', actionUrl: '' } },
      { type: 'service', size: '2x1', data: { title: 'Implementacao', description: 'Colocamos seu projeto no ar', actionLabel: 'Solicitar proposta', actionUrl: '' } },
      { type: 'gallery', size: '2x2', data: { images: [] } },
      { type: 'link', size: '2x1', data: { title: 'Catalogo', url: 'https://', description: 'Veja nossas solucoes' } },
      { type: 'newsletter', size: '2x1', data: { title: 'News corporativa', description: 'Novidades e cases de sucesso', placeholder: 'email@empresa.com', buttonText: 'Assinar' } },
      { type: 'socials', size: '1x1', data: { items: [{ platform: 'linkedin', url: '' }, { platform: 'instagram', url: '' }] } },
    ],
  },
  {
    id: 'store',
    name: 'Loja',
    description: 'Vitrine de produtos com precos',
    emoji: '🛍️',
    category: 'profession',
    blocks: [
      { type: 'header', size: 'full', data: { displayName: 'Loja', bio: 'Produtos selecionados com os melhores precos', avatarUrl: '' } },
      { type: 'product', size: '2x2', data: { title: 'Mais vendido', description: 'Nosso queridinho', imageUrl: '', price: '129', linkUrl: '' } },
      { type: 'product', size: '2x1', data: { title: 'Novidade', description: 'Recem-chegado', imageUrl: '', price: '89', linkUrl: '' } },
      { type: 'product', size: '2x1', data: { title: 'Promocao', description: 'Por tempo limitado', imageUrl: '', price: '59', linkUrl: '' } },
      { type: 'text', size: 'full', data: { content: 'Frete gratis acima de R$ 150 | Entrega expressa disponivel' } },
      { type: 'link', size: '2x1', data: { title: 'WhatsApp', url: 'https://wa.me/', description: 'Tire duvidas' } },
      { type: 'newsletter', size: '2x1', data: { title: 'Ofertas exclusivas', description: 'Descontos para inscritos', placeholder: 'email@loja.com', buttonText: 'Receber ofertas' } },
      { type: 'socials', size: '1x1', data: { items: [{ platform: 'instagram', url: '' }] } },
    ],
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    description: 'Servicos freelance com portfolio',
    emoji: '⚡',
    category: 'profession',
    blocks: [
      { type: 'header', size: 'full', data: { displayName: 'Freelancer', bio: 'Profissional autonomo | Entrega rapida', avatarUrl: '' } },
      { type: 'service', size: '2x2', data: { title: 'Servico principal', description: 'O que voce faz de melhor', actionLabel: 'Contratar', actionUrl: '' } },
      { type: 'gallery', size: '2x2', data: { images: [] } },
      { type: 'text', size: 'full', data: { content: 'Entrega em 48h | Preco justo | 100% satisfacao' } },
      { type: 'link', size: '2x1', data: { title: 'Upwork', url: 'https://upwork.com', description: 'Perfil verificado' } },
      { type: 'link', size: '2x1', data: { title: 'Fiverr', url: 'https://fiverr.com', description: 'Gigs disponiveis' } },
      { type: 'newsletter', size: '2x1', data: { title: 'Disponibilidade', description: 'Avise quando disponivel', placeholder: 'email@freela.com', buttonText: 'Avisar-me' } },
      { type: 'socials', size: '1x1', data: { items: [{ platform: 'instagram', url: '' }, { platform: 'linkedin', url: '' }] } },
    ],
  },
  {
    id: 'content-creator',
    name: 'Criador de conteudo',
    description: 'Links para todas as plataformas',
    emoji: '📱',
    category: 'profession',
    blocks: [
      { type: 'header', size: 'full', data: { displayName: 'Criador', bio: 'Criando conteudo que conecta e inspira', avatarUrl: '' } },
      { type: 'video', size: '2x2', data: { title: 'Video em destaque', embedUrl: '' } },
      { type: 'link', size: '2x1', data: { title: 'YouTube', url: 'https://youtube.com', description: 'Canal principal' } },
      { type: 'link', size: '2x1', data: { title: 'TikTok', url: 'https://tiktok.com', description: 'Videos curtos' } },
      { type: 'link', size: '2x1', data: { title: 'Instagram', url: 'https://instagram.com', description: 'Reels e stories' } },
      { type: 'link', size: '2x1', data: { title: 'Twitter/X', url: 'https://x.com', description: 'Threads e opinoes' } },
      { type: 'product', size: '2x1', data: { title: 'E-book exclusivo', description: 'Guia completo', imageUrl: '', price: '49', linkUrl: '' } },
      { type: 'newsletter', size: '2x1', data: { title: 'Newsletter', description: 'Bastidores e conteudo exclusivo', placeholder: 'email@conteudo.com', buttonText: 'Inscrever' } },
      { type: 'socials', size: '1x1', data: { items: [{ platform: 'instagram', url: '' }, { platform: 'youtube', url: '' }, { platform: 'tiktok', url: '' }] } },
    ],
  },
]

export function getTemplatesByCategory(category: 'objective' | 'profession'): Template[] {
  return TEMPLATES.filter((t) => t.category === category)
}

export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id)
}
