'use client'

// DEPENDENCY
import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { fetchFile } from '@ffmpeg/util'
import { createPortal } from 'react-dom'
import path from 'path'
import { useAi } from '@/hooks/useAi'

// COMPONENT
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

// LIB
import { getFfmpeg } from '@/lib/ffmpeg'
import { api } from '@/lib/axios'

// UTIL
import { removeDiacritics } from '@/util/removeDiacritics'

// ASSET
import {
  BadgeCheck,
  FileAudio2,
  FilePlus2,
  FileVideo2,
  Upload,
  XCircle,
} from 'lucide-react'

// TYPE
type Status =
  | 'waiting'
  | 'converting'
  | 'generating'
  | 'uploading'
  | 'success'
  | 'error'

type ButtonStatus = Record<
  Exclude<Status, 'waiting'>,
  { label: string; icon: ReactNode }
>
const buttonStatus: ButtonStatus = {
  converting: {
    label: 'Converting...',
    icon: <FileAudio2 />,
  },
  generating: { label: 'Trascribing...', icon: <FilePlus2 /> },
  uploading: { label: 'Uploading...', icon: <Upload /> },
  success: { label: 'Success!', icon: <BadgeCheck /> },
  error: { label: 'Error!', icon: <XCircle /> },
}

export function VideoInputForm() {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('waiting')
  const [progress, setProgress] = useState<number | null>(null)

  const { handleGetVideoId } = useAi()

  const headerElementRef = useRef<Element | null>(null)
  const promptTextareaRef = useRef<HTMLTextAreaElement | null>(null)

  const isActionsDisabled = status !== 'waiting'

  const handleFileSelected = (evt: ChangeEvent<HTMLInputElement>) => {
    const { files } = evt.currentTarget

    if (!files) {
      return
    }

    const selectedFile = files[0]

    setVideoFile(selectedFile)
    setProgress(null)
  }

  const handleUploadVideo = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    const prompt = promptTextareaRef.current?.value

    if (!videoFile) {
      return
    }

    setStatus('converting')

    const audioFile = await convertVideoToAudio(videoFile)
    const data = new FormData()

    data.append('file', audioFile)

    setStatus('uploading')

    const response = await api.post('/videos', data, {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=',
      },
    })
    // return

    const videoId = response.data.video.id

    setStatus('generating')

    await api.post(
      `/videos/${videoId}/transcription`,
      {
        prompt,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    setStatus('success')
    handleGetVideoId(videoId)
    console.log('Finished')
  }

  const convertVideoToAudio = async (video: File) => {
    const extension = path.extname(video.name)
    const fileBasename = path.basename(video.name, extension)
    const fileName = removeDiacritics(fileBasename)
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .split(' ')
      .join('-')

    const ffmpeg = await getFfmpeg()

    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    // ffmpeg.on('log', (log) => {
    //   console.log('convertVideoToAudio > log', log)
    // })

    ffmpeg.on('progress', ({ progress }) => {
      setProgress(progress)

      console.log(
        `convertVideoToAudio > progress > ${Math.round(progress * 100)}`,
      )
    })

    await ffmpeg.exec([
      '-i',
      'input.mp4',
      '-map',
      '0:a',
      '-b:a',
      '20k',
      '-acodec',
      'libmp3lame',
      'output.mp3',
    ])

    const data = await ffmpeg.readFile('output.mp3')

    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
    const audioFile = new File([audioFileBlob], `${fileName}.mp3`, {
      type: 'audio/mpeg',
    })

    console.log('[VideoInputForm > convert finished]')

    return audioFile
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null
    }

    return URL.createObjectURL(videoFile)
  }, [videoFile])

  useEffect(() => {
    if (!headerElementRef.current) {
      headerElementRef.current = document.querySelector('#header')
    }
  }, [])

  return (
    <>
      {headerElementRef.current &&
        createPortal(
          <div
            className="absolute -bottom-1 left-0 h-1 bg-soft-violet transition-all"
            style={{
              width: `${progress ? Math.round(progress * 100) : 0}%`,
              visibility: progress === 1 ? 'hidden' : 'visible',
            }}
          />,
          headerElementRef.current,
        )}

      <form
        onSubmit={handleUploadVideo}
        className="px-4 text-dark-gray"
        id="select-video"
      >
        <input
          type="file"
          id="video"
          accept="video/mp4"
          className="peer/input sr-only"
          onChange={handleFileSelected}
          disabled={isActionsDisabled}
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
            ref={promptTextareaRef}
            id="transcription-prompt"
            form="select-video"
            placeholder="Include key words mentioned on video separated by comma (,)"
            className="resize-none bg-gray shadow-md placeholder:text-sm"
            disabled={isActionsDisabled}
          />
        </div>

        <Button
          className="w-full"
          form="select-video"
          type="submit"
          disabled={isActionsDisabled}
        >
          {status === 'waiting' ? (
            <>
              Load video
              <Upload className="h-5 w-5 sm:h-6 sm:w-6" />
            </>
          ) : (
            <>
              {buttonStatus[status].label}
              {buttonStatus[status].icon}
            </>
          )}
        </Button>
      </article>
    </>
  )
}
