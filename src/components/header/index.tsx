import { GearIcon, GitHubLogoIcon, SunIcon } from '@radix-ui/react-icons'
import { Heading, IconButton } from '@radix-ui/themes'

export default function Header() {
  return (
    <nav className="w-screen h-16 fixed top-0 left-0 flex items-center shadow-sm">
      <div className="relative w-full h-full flex items-center">
        <div className="flex-auto"></div>
        <Heading className="h-full absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center text-slate-700">
          <span>Theme Hub</span>
        </Heading>
        <div className="flex items-center gap-3 p-5 z-10">
          <IconButton variant="ghost" color="gray">
            <GearIcon width={16} height={16} />
          </IconButton>
          <IconButton variant="ghost" color="gray">
            <SunIcon width={16} height={16} />
          </IconButton>
          <a href="https://github.com/wangpin34/highlight-index" target="_blank">
            <GitHubLogoIcon width={16} height={16} />
          </a>
        </div>
      </div>
    </nav>
  )
}
