/* ═══════════════════════════════════════════════════════════════
   LEGACY TYPES
   ═══════════════════════════════════════════════════════════════ */

export interface Link {
  id: string
  title: string
  url: string
  description?: string
  userId: string
  createdAt?: any
  clicks?: number
  order?: number
  isActive?: boolean
}

export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  themeColor: string;
  createdAt: any;
}

export type LinkInput = Omit<Link, 'id' | 'createdAt' | 'clicks' | 'order'>

export type LinkWithId = Required<Pick<Link, 'id' | 'title' | 'url' | 'userId'>> & Omit<Link, 'id' | 'title' | 'url' | 'userId'>

/* ═══════════════════════════════════════════════════════════════
   BLOCK SYSTEM — GetLink Style
   ═══════════════════════════════════════════════════════════════ */

export type BlockType =
  | 'header'
  | 'link'
  | 'product'
  | 'service'
  | 'gallery'
  | 'video'
  | 'text'
  | 'newsletter'
  | 'socials'

export type BlockSize = '1x1' | '2x1' | '2x2' | 'full'

export interface HeaderBlockData {
  displayName: string
  bio: string
  avatarUrl: string
}

export interface LinkBlockData {
  title: string
  url: string
  description: string
}

export interface ProductBlockData {
  title: string
  description: string
  imageUrl: string
  price: string
  linkUrl: string
}

export interface ServiceBlockData {
  title: string
  description: string
  actionLabel: string
  actionUrl: string
}

export interface GalleryBlockData {
  images: { url: string; caption?: string }[]
}

export interface VideoBlockData {
  title: string
  embedUrl: string
}

export interface TextBlockData {
  content: string
}

export interface NewsletterBlockData {
  title: string
  description: string
  placeholder: string
  buttonText: string
}

export interface SocialsBlockData {
  items: { platform: string; url: string }[]
}

export type BlockDataMap = {
  header: HeaderBlockData
  link: LinkBlockData
  product: ProductBlockData
  service: ServiceBlockData
  gallery: GalleryBlockData
  video: VideoBlockData
  text: TextBlockData
  newsletter: NewsletterBlockData
  socials: SocialsBlockData
}

export interface Block<T extends BlockType = BlockType> {
  id: string
  type: T
  size: BlockSize
  order: number
  userId: string
  data: BlockDataMap[T]
}

/* ═══════════════════════════════════════════════════════════════
   BLOCK TYPE DEFINITIONS
   ═══════════════════════════════════════════════════════════════ */

export interface BlockTypeDef {
  type: BlockType
  label: string
  description: string
  defaultSize: BlockSize
  allowedSizes: BlockSize[]
}

export const BLOCK_LIBRARY: BlockTypeDef[] = [
  {
    type: 'header',
    label: 'Cabeçalho',
    description: 'Sua foto, nome e bio',
    defaultSize: 'full',
    allowedSizes: ['full', '2x1'],
  },
  {
    type: 'link',
    label: 'Link',
    description: 'Botão para qualquer URL',
    defaultSize: '2x1',
    allowedSizes: ['1x1', '2x1'],
  },
  {
    type: 'product',
    label: 'Produto',
    description: 'Item com preço e imagem',
    defaultSize: '2x2',
    allowedSizes: ['2x1', '2x2'],
  },
  {
    type: 'service',
    label: 'Serviço',
    description: 'Agendamento ou orçamento',
    defaultSize: '2x1',
    allowedSizes: ['1x1', '2x1', '2x2'],
  },
  {
    type: 'gallery',
    label: 'Galeria',
    description: 'Grade de imagens',
    defaultSize: '2x2',
    allowedSizes: ['2x1', '2x2'],
  },
  {
    type: 'video',
    label: 'Vídeo',
    description: 'YouTube, Vimeo, embed',
    defaultSize: '2x2',
    allowedSizes: ['2x1', '2x2'],
  },
  {
    type: 'text',
    label: 'Texto',
    description: 'Bloco de texto livre',
    defaultSize: '2x1',
    allowedSizes: ['1x1', '2x1', 'full'],
  },
  {
    type: 'newsletter',
    label: 'Newsletter',
    description: 'Captura de e-mails',
    defaultSize: '2x1',
    allowedSizes: ['2x1', 'full'],
  },
  {
    type: 'socials',
    label: 'Redes sociais',
    description: 'Ícones de perfis',
    defaultSize: '1x1',
    allowedSizes: ['1x1', '2x1'],
  },
]

export const SIZE_LABELS: Record<BlockSize, string> = {
  '1x1': 'Pequeno',
  '2x1': 'Largo',
  '2x2': 'Grande',
  'full': 'Faixa',
}

/* ═══════════════════════════════════════════════════════════════
   PAGE DESIGN SETTINGS
   ═══════════════════════════════════════════════════════════════ */

export type DesignPreset = 'neon' | 'editorial' | 'minimal-mono' | 'sunset' | 'brutalist'
export type TitleFont = 'grotesk' | 'sans' | 'serifada' | 'mono'
export type BlockStyle = 'filled' | 'outline' | 'glass'
export type Density = 'compact' | 'standard' | 'spaced'
export type CornerStyle = 'sharp' | 'soft' | 'medium' | 'round'

export interface PageSettings {
  preset: DesignPreset
  accentColor: string
  titleFont: TitleFont
  blockStyle: BlockStyle
  density: Density
  corners: CornerStyle
}

export const DEFAULT_PAGE_SETTINGS: PageSettings = {
  preset: 'neon',
  accentColor: '#8B5CF6',
  titleFont: 'grotesk',
  blockStyle: 'glass',
  density: 'standard',
  corners: 'medium',
}
