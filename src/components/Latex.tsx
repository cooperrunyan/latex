"use client";
import { type FC, type RefObject, useMemo } from "react";

import { mathjax } from "mathjax-full/js/mathjax";
import { TeX } from "mathjax-full/js/input/tex";
import { SVG } from "mathjax-full/js/output/svg";
import type { MathDocument } from "mathjax-full/js/core/MathDocument";
import { browserAdaptor } from "mathjax-full/js/adaptors/browserAdaptor";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html";
import { AllPackages } from "mathjax-full/js/input/tex/AllPackages";

import { HTMLElementRenderer } from "@/components/HTMLElementRenderer";

type Doc = MathDocument<HTMLElement, Text, Document>;

type Props = {
  input: string;
  convertOptions?: { [key: string]: unknown };
  inputOptions?: { [key: string]: unknown };
  outputOptions?: { [key: string]: unknown };
  ref?: RefObject<HTMLDivElement | null>;
};

export const Latex: FC<Props> = ({
  ref,
  input,
  convertOptions: _convertOptions = {},
  inputOptions: _inputOptions = {},
  outputOptions: _outputOptions = {},
}) => {
  const inputOptions = { packages: AllPackages, ..._inputOptions };
  const outputOptions = { scale: 1, ..._outputOptions };
  const convertOptions = { display: false, ..._convertOptions };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const doc = useMemo(() => {
    if (typeof window === "undefined") return;

    RegisterHTMLHandler(browserAdaptor());
    return mathjax.document("", {
      InputJax: new TeX<HTMLElement, Text, Document>(inputOptions),
      OutputJax: new SVG<HTMLElement, Text, Document>(outputOptions),
    }) as Doc;
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const result = useMemo(
    () => doc?.convert(input, convertOptions),
    [doc, input],
  ) as HTMLElement;

  return (
    <HTMLElementRenderer
      ref={ref}
      skip={(e) => !!e.querySelector('[data-mml-node="merror"]')}
    >
      {result}
    </HTMLElementRenderer>
  );
};
