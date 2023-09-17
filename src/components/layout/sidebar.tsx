// COMPONENT
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { VideoInputForm } from '@/components/video-input-form'

// ASSET
import { Info, Wand2 } from 'lucide-react'

// LIB
import { cn } from '@/lib/utils'

// TYPE
type SidebarProps = {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <aside className={cn('border-3 border-black bg-white py-4', className)}>
      <VideoInputForm />
      <Separator />

      <form className="space-y-4" id="generate-response">
        <div className="grid gap-3 px-4">
          <article className="space-y-2">
            <Label>Prompt</Label>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a prompt..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="video-title">Youtube Title</SelectItem>
                  <SelectItem value="video-description">
                    Youtube Description
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </article>

          <article className="space-y-2">
            <Label className="flex items-center justify-between">
              Model
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-5 w-5" />
                  </TooltipTrigger>
                  <TooltipContent align="end" sideOffset={6}>
                    You will be able to customize this option soon.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>

            <Select disabled defaultValue="gpt3.5">
              <SelectTrigger>
                <SelectValue placeholder="Select a model..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </article>
        </div>

        <Separator />

        <div className="space-y-2 px-4">
          <Label className="flex items-center justify-between">
            Temperature
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-5 w-5" />
                </TooltipTrigger>
                <TooltipContent align="end" sideOffset={6}>
                  A higher value will give a more creative result but is prone
                  to error.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>

          <Slider min={0} max={1} step={0.1} defaultValue={[0.5]} />
        </div>

        <Separator />

        <div className="mt-auto px-4">
          <Button className="w-full" type="submit" form="generate-response">
            Generate
            <Wand2 />
          </Button>
        </div>
      </form>
    </aside>
  )
}
