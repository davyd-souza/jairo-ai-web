// COMPONENT
import { AiResponse } from '@/components/ai-response'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'

// CONTEXT
import { AiContextProvider } from '@/contexts/ai-context'

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-root gap-4 pb-4">
      <Header />

      <AiContextProvider>
        <main className="grid px-4 md:grid-cols-main md:gap-8">
          <section className="grid gap-4 md:gap-8">
            <AiResponse />
          </section>

          <Sidebar className="hidden md:grid md:gap-4" />
        </main>
      </AiContextProvider>
    </div>
  )
}
