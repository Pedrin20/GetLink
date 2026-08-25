import type { Block } from '../../types'
import { ProfileBlock } from './ProfileBlock'
import { LinkBlock } from './LinkBlock'
import { FeaturedBlock } from './FeaturedBlock'
import { SocialsBlock } from './SocialsBlock'
import { ProjectBlock } from './ProjectBlock'
import { ImageBlock } from './ImageBlock'

type BlockRendererProps = {
  block: Block
  isEditing?: boolean
}

export function BlockRenderer({ block, isEditing }: BlockRendererProps) {
  switch (block.type) {
    case 'profile':
      return <ProfileBlock data={block.data as any} />
    case 'link':
      return <LinkBlock data={block.data as any} isEditing={isEditing} />
    case 'link-featured':
      return <FeaturedBlock data={block.data as any} isEditing={isEditing} />
    case 'socials':
      return <SocialsBlock data={block.data as any} isEditing={isEditing} />
    case 'project':
      return <ProjectBlock data={block.data as any} isEditing={isEditing} />
    case 'image':
      return <ImageBlock data={block.data as any} />
    default:
      return null
  }
}
