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
   BLOCK SYSTEM
   ═══════════════════════════════════════════════════════════════ */

export type BlockType = 'profile' | 'link' | 'link-featured' | 'socials' | 'project' | 'image'

export interface ProfileBlockData {
  displayName: string
  bio: string
  avatarUrl: string
  themeColor: string
}

export interface LinkBlockData {
  title: string
  url: string
  description: string
}

export interface LinkFeaturedBlockData {
  title: string
  url: string
  description: string
  imageUrl?: string
}

export interface SocialsBlockData {
  items: { platform: string; url: string }[]
}

export interface ProjectBlockData {
  title: string
  description: string
  imageUrl: string
  linkUrl: string
}

export interface ImageBlockData {
  imageUrl: string
  caption: string
}

export type BlockDataMap = {
  profile: ProfileBlockData
  link: LinkBlockData
  'link-featured': LinkFeaturedBlockData
  socials: SocialsBlockData
  project: ProjectBlockData
  image: ImageBlockData
}

export interface Block<T extends BlockType = BlockType> {
  id: string
  type: T
  order: number
  userId: string
  data: BlockDataMap[T]
}
