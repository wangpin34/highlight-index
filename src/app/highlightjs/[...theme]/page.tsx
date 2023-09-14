import { listThemes } from "@/utils/list-highlight.js-themes.mjs";
import hljs from "highlight.js";
import Link from "next/link";
import Image from "next/image";
import githubLogo from "@/assets/github-mark.png";
import jsCode from "@/code-snippets/js";
import { camelToSnakeCase, snakeToNormal } from "@/utils/string-transformer";

const html = hljs.highlight(jsCode, { language: "typescript" }).value;

export default function HighlightDemo({
  params,
}: {
  params: { theme: string[] };
}) {
  const theme = params.theme.map((p) => camelToSnakeCase(p)).join("/");
  const styleLink = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/${theme}.min.css`;
  return (
    <div className="p-6 h-full">
      <link rel="stylesheet" href={styleLink}></link>
      <div className="w-2/3 h-full m-auto shadow-md hover:shadow-lg rounded-lg">
        <div className="hljs py-1 rounded-t-lg">
          <Link href="/highlightjs">
          <span className="material-symbols-outlined hljs-keyword" >arrow_back</span>
          </Link>
        </div>
        <pre className="hljs p-2" data-code-theme={theme}>
          <code dangerouslySetInnerHTML={{ __html: html }}></code>
        </pre>
        <div className="px-2 py-4">
          <div className="flex flex-row items-center">
            <h1 className="text-xl  leading-loose">
              {snakeToNormal(params.theme.join(" "))}
            </h1>{" "}
            <a
              href={`https://github.com/highlightjs/highlight.js/blob/main/src/styles/${theme}.css`}
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

          {/* <div className="flex text-md py-2 mt-4">
              <a
                href={styleLink}
                target="_blank"
                className="text-blue-600 hover:text-blue-900 break-normal"
                style={{ overflowWrap: "anywhere" }}
              >
                Theme CSS
              </a>
            </div> */}
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
