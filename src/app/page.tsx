import Entry from '@/components/entry'
import Header from '@/components/header'
import Image from 'next/image'
import hljsLogo from './hljs.png'
import prismLogo from './prism.svg'

export default async function Home() {
  return (
    <>
      <Header />
      <main className="max-w-full">
        <div className="max-w-full h-full p-4 flex gap-4 justify-center flex-wrap box-border">
          <Entry
            title="highlight.js"
            logo={<Image src={hljsLogo} alt="highlight.js" width={24} height={24} className="inline-block mr-2" />}
            description={<>192 languages and 496 themes. Support Node.js and Deno.</>}
            to="/highlightjs"
          />

          <Entry
            title="prism.js"
            logo={<Image src={prismLogo} alt="highlight.js" width={24} height={24} className="inline-block mr-2 bg-slate-950" />}
            description={<>192 languages and 496 themes. Support Node.js and Deno.</>}
            to="/prismjs"
          />
        </div>
      </main>
    </>
  )
}
