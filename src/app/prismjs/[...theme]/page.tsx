import { listThemes } from "@/utils/list-prism.js-themes.mjs";
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import Link from "next/link";
import Image from "next/image";
import githubLogo from "@/assets/github-mark.png";
import jsCode from "@/code-snippets/js";
import { camelToSnakeCase, snakeToNormal } from "@/utils/string-transformer";

const html = Prism.highlight(jsCode, Prism.languages.typescript, 'typescript');

export default async function HighlightDemo({
  params,
}: {
  params: { theme: string[] };
}) {
  
  const theme = params.theme.map((p) => camelToSnakeCase(p)).join("/");

  const styleLink = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/${theme === 'prism' ? 'prism' : 'prism-' + theme}.min.css`;
  return (
    <div className="p-6 h-full">
      <link rel="stylesheet" href={styleLink}></link>
      <div className="w-2/3 h-full m-auto shadow-md hover:shadow-lg rounded-lg">
        <pre className="language-typescript rounded-br-none rounded-bl-none" data-code-theme={theme}>

       
        <div className="prism py-1 rounded-t-lg">
          <Link href="/prismjs">
          <span className="material-symbols-outlined prism-keyword" >arrow_back</span>
          </Link>
        </div>
          <code dangerouslySetInnerHTML={{ __html: html }}></code>
         </pre>
        <div className="px-2 py-4">
          <div className="flex flex-row items-center">
            <h1 className="text-xl  leading-loose">
              {snakeToNormal(params.theme.join(" "))}
            </h1>{" "}
            <a
              href={`https://github.com/PrismJS/prism/tree/master/themes/${theme === 'prism' ? 'prism' : 'prism-' + theme}.css`}
              target="_blank"
              className="ml-2 text-blue-600 hover:text-blue-900 break-normal"
              style={{ overflowWrap: "anywhere" }}
            >
              <Image
                src={githubLogo}
                alt="logo of github"
                width="20"
                height="20"
              />
            </a>
          </div>

        
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const themes = await listThemes();

  return themes.map((theme) => ({
    theme: [...theme.split("/")],
  }));
}
