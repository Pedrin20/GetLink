import type { Block } from '../../types'
import { HeaderBlock } from './HeaderBlock'
import { LinkBlock } from './LinkBlock'
import { ProductBlock } from './ProductBlock'
import { ServiceBlock } from './ServiceBlock'
import { GalleryBlock } from './GalleryBlock'
import { VideoBlock } from './VideoBlock'
import { TextBlock } from './TextBlock'
import { NewsletterBlock } from './NewsletterBlock'
import { SocialsBlock } from './SocialsBlock'
import { GitHubBlock } from './GitHubBlock'
import { SpotifyBlock } from './SpotifyBlock'
import { YouTubeBlock } from './YouTubeBlock'
import { CalendarBlock } from './CalendarBlock'
import { FormBlock } from './FormBlock'
import { FaqBlock } from './FaqBlock'
import { TestimonialBlock } from './TestimonialBlock'

type BlockRendererProps = {
  block: Block
  isEditing?: boolean
}

export function BlockRenderer({ block, isEditing }: BlockRendererProps) {
  switch (block.type) {
    case 'header':
      return <HeaderBlock data={block.data as any} isEditing={isEditing} />
    case 'link':
      return <LinkBlock data={block.data as any} isEditing={isEditing} />
    case 'product':
      return <ProductBlock data={block.data as any} isEditing={isEditing} />
    case 'service':
      return <ServiceBlock data={block.data as any} isEditing={isEditing} />
    case 'gallery':
      return <GalleryBlock data={block.data as any} isEditing={isEditing} />
    case 'video':
      return <VideoBlock data={block.data as any} isEditing={isEditing} />
    case 'text':
      return <TextBlock data={block.data as any} isEditing={isEditing} />
    case 'newsletter':
      return <NewsletterBlock data={block.data as any} isEditing={isEditing} />
    case 'socials':
      return <SocialsBlock data={block.data as any} isEditing={isEditing} />
    case 'github':
      return <GitHubBlock data={block.data as any} isEditing={isEditing} />
    case 'spotify':
      return <SpotifyBlock data={block.data as any} isEditing={isEditing} />
    case 'youtube':
      return <YouTubeBlock data={block.data as any} isEditing={isEditing} />
    case 'calendar':
      return <CalendarBlock data={block.data as any} isEditing={isEditing} />
    case 'form':
      return <FormBlock data={block.data as any} isEditing={isEditing} />
    case 'faq':
      return <FaqBlock data={block.data as any} isEditing={isEditing} />
    case 'testimonial':
      return <TestimonialBlock data={block.data as any} isEditing={isEditing} />
    default:
      return null
  }
}
