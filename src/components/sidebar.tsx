// COMPONENT
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
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

// ASSET
import { FileVideo2, Info, Upload, Wand2 } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="hidden border-3 border-black bg-white py-4 md:grid md:gap-4">
      <form className="px-4 text-dark-gray" id="select-video">
        <input
          type="file"
          id="video"
          accept="video/  mp4"
          className="peer/input sr-only"
        />
        <label
          htmlFor="video"
          className="flex aspect-video flex-col items-center justify-center gap-1 border-2 border-dashed border-black font-medium transition-colors hover:cursor-pointer hover:bg-gray peer-focus-visible/input:bg-gray"
        >
          <FileVideo2 />
          Select a video
        </label>
      </form>

      <Separator />

      <article className="space-y-3 px-4">
        <div className="space-y-2">
          <Label htmlFor="transcription-prompt">Transcription prompt</Label>
          <Textarea
            id="transcription-prompt"
            form="select-video"
            placeholder="Include key words mentioned on video separated by comma (,)"
            className="resize-none bg-gray shadow-md placeholder:text-sm"
          />
        </div>

        <Button className="w-full" form="select-video" type="submit">
          Load video
          <Upload className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </article>

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
