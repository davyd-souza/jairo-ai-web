// COMPONENT
import { Separator } from '@/components/ui/separator'
import { VideoInputForm } from '@/components/video-input-form'

// LIB
import { cn } from '@/lib/utils'
import { AiResponseForm } from '../ai-response-form'

// TYPE
type SidebarProps = {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn('border-3 border-black bg-white py-4', className)}>
      <VideoInputForm />

      <Separator />

      <AiResponseForm />
    </aside>
  )
}
