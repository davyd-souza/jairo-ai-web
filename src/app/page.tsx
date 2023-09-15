// COMPONENT
import { Header } from '@/components/header'
import { Textarea } from '@/components/ui/textarea'

export default function Home() {
  return (
    <div className="grid-rows-root grid min-h-screen gap-4 pb-4">
      <Header />

      <main className="md:grid-cols-main grid px-4 md:gap-8">
        <section className="grid gap-4 md:gap-8">
          <Textarea
            placeholder="Include AI prompt here..."
            className="resize-none bg-soft-violet leading-relaxed"
          />
          <Textarea
            placeholder="Result generated by AI..."
            className="resize-none bg-lime leading-relaxed"
          />
        </section>

        <aside className="hidden bg-white md:block">aside</aside>
      </main>
    </div>
  )
}
