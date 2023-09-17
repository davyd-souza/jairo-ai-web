'use client'

// DEPENDENCY
import { ChangeEvent, useMemo, useState } from 'react'

// COMPONENT
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

// ASSET
import { FileVideo2, Upload } from 'lucide-react'

export function VideoInputForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null)

  const handleFileSelected = (evt: ChangeEvent<HTMLInputElement>) => {
    const { files } = evt.currentTarget

    if (!files) {
      return
    }

    const selectedFile = files[0]

    setVideoFile(selectedFile)
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null
    }

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <>
      <form className="px-4 text-dark-gray" id="select-video">
        <input
          type="file"
          id="video"
          accept="video/mp4"
          className="peer/input sr-only"
          onChange={handleFileSelected}
        />
        <label
          htmlFor="video"
          className="relative flex aspect-video flex-col items-center justify-center gap-1 overflow-hidden border-2 border-dashed border-black font-medium transition-colors hover:cursor-pointer hover:bg-gray peer-focus-visible/input:bg-gray"
        >
          {previewURL ? (
            <video
              src={previewURL}
              controls={false}
              className="pointer-events-none absolute inset-0"
            />
          ) : (
            <>
              <FileVideo2 />
              Select a video
            </>
          )}
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
    </>
  )
}
