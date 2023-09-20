'use client'

// DEPENDENCY
import { useContext } from 'react'

// CONTEXT
import { AiContext } from '@/contexts/ai-context'

export function useAi() {
  return useContext(AiContext)
}
