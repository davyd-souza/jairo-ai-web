// DEPENDENCY
import Link from 'next/link'

// ASSET
import { GithubIcon, Menu } from 'lucide-react'

// COMPONENT
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="flex items-center justify-between border-3 border-black bg-white px-4">
      <h1 className="font-display text-lg font-extrabold sm:text-2xl">
        jairo.ai
      </h1>

      <div>
        <Button className="px-6 py-4 sm:px-8" variant="flat" asChild>
          <Link href="https://github.com/davyd-souza" target="_blank">
            <GithubIcon className="h-5 w-5 sm:h-8 sm:w-8" />
            <span className="sr-only md:not-sr-only">GitHub</span>
          </Link>
        </Button>
        <Button className="px-6 py-4 sm:px-8 md:hidden" variant="flat">
          <Menu className="h-5 w-5 sm:h-8 sm:w-8" />
        </Button>
      </div>
    </header>
  )
}
