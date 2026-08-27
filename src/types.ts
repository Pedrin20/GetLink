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
  order: number
  userId: string
  data: BlockDataMap[T]
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
