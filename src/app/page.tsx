"use client";

import style from "./page.module.css";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Head from "next/head";

import { type FC, useState } from "react";
import { Editor } from "@/components/Editor";
import { Button } from "@/components/Button";
import { useWindowSizeMediaQuery } from "@/lib/useMediaQuery";

import { MathJaxContext, MathJax } from "better-react-mathjax";

import { Copy, Download } from "lucide-react";
import { download, imageBlob } from "@/lib/image";

const Display: FC<{ input: string }> = ({ input }) => {
  const id = "tex-output";

  return (
    <>
      <Head>
        <title>Latex Editor</title>
      </Head>
      <div className={style.display}>
        <MathJax id={id} text={input || " "} dynamic />

        <div className={style.toolbar}>
          <Button
            loads
            icon={Copy}
            onClick={() =>
              navigator.clipboard?.write?.([
                new ClipboardItem({
                  "image/png": (async () => {
                    const svg = document?.getElementById(id) as HTMLElement;
                    if (!svg) return null as never;
                    return imageBlob(svg, "image/png");
                  })(),
                }),
              ])
            }
          />

          <Button
            loads
            icon={Download}
            onClick={() => {
              const svg = document?.getElementById(id) as HTMLElement;
              if (!svg) return null as never;
              return download(svg, "Latex.png");
            }}
          />
        </div>
      </div>
    </>
  );
};

const DEFAULT_INPUT = String.raw`\begin{align} 
   
\iiint_R \left( \nabla \cdot \vec F \right) dV = \oint_{\partial R} \vec F \cdot  d \vec S

\\
\\ 

u(t) = \begin{cases} 
 0 & t < 0 \\
 1 & t \ge 0
\end{cases} 

\\
\\ 

\begin{bmatrix} 
        1 & 2 & 3 \\
        4 & 1 & 8 \\
        0 & 5 & 1
     \end{bmatrix}  
     \xrightarrow{\operatorname{rref}}
     \begin{bmatrix} 
        1 & 0 & 0 \\
        0 & 1 & 0 \\
        0 & 0 & 1
     \end{bmatrix} 

\\
\\ 

\overbrace{a+b+c}^{\text{note}} && {a \brack b} && a \over b

\end{align}

% This is a comment
`;

const config = {
  "fast-preview": { disabled: true },
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
  messageStyle: "none",
};

export default function Home() {
  const [input, setInput] = useState(DEFAULT_INPUT);

  const vertical = useWindowSizeMediaQuery(
    "(max-width: 1000) or ((min-height: 700) and (max-width: 1600))",
  );

  return (
    <MathJaxContext
      version={4}
      hideUntilTypeset="first"
      config={config}
      renderMode="pre"
      typesettingOptions={{
        fn: "tex2svg",
        options: {
          // containerWidth:
        },
      }}
      src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-svg.js"
    >
      <div className={style.page}>
        <PanelGroup
          autoSaveId="panel"
          direction={vertical ? "vertical" : "horizontal"}
        >
          <Panel defaultSize={50} minSize={25}>
            <Editor defaultValue={DEFAULT_INPUT} setInput={setInput} />
          </Panel>
          <PanelResizeHandle className={style.resize} />
          <Panel defaultSize={50} minSize={25}>
            <Display input={input} />
          </Panel>
        </PanelGroup>
      </div>
    </MathJaxContext>
  );
}
