'use client'

// DEPENDENCY
import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from 'react'
import { useCompletion } from 'ai/react'

// LIB
import { api } from '@/lib/axios'

// TYPE
type Prompt = {
  id: string
  title: string
  template: string
}

type AiContextData = {
  prompt: Prompt[] | null
  template: string | null
  temperature: number | null
  videoId: string | null
  completion: string
  isLoading: boolean
  handleChangeTemperature: (temperature: number[]) => void
  handleSelectTemplate: (promptId: string) => void
  handleTemplateChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void
  handleGetVideoId: (videoId: string) => void
  handleSubmit: (evt: FormEvent<HTMLFormElement>) => void
}

export const AiContext = createContext({} as AiContextData)

export function AiContextProvider({ children }: { children: ReactNode }) {
  const [prompt, setPrompt] = useState<Prompt[] | null>(null)
  const [temperature, setTemperature] = useState<number>(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

  const {
    input: template,
    setInput: setTemplate,
    handleInputChange: handleTemplateChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: `${process.env.NEXT_API_URL}/ai/response`,
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const handleSelectTemplate = (promptId: string) => {
    const selectedPrompt = prompt?.find(({ id }) => promptId === id)

    if (!selectedPrompt) {
      return
    }

    setTemplate(selectedPrompt.template)
  }

  const handleChangeTemperature = (newTemperature: number[]) => {
    setTemperature(newTemperature[0])
  }

  const handleGetVideoId = (newVideoId: string) => {
    setVideoId(newVideoId)
  }

  useEffect(() => {
    api.get<Prompt[]>('/prompts').then(({ data }) => {
      setPrompt(data)
    })
  }, [])

  return (
    <AiContext.Provider
      value={{
        prompt,
        template,
        temperature,
        videoId,
        completion,
        isLoading,
        handleSelectTemplate,
        handleTemplateChange,
        handleChangeTemperature,
        handleGetVideoId,
        handleSubmit,
      }}
    >
      {children}
    </AiContext.Provider>
  )
}
