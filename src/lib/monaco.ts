import { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

export function useMonacoLatex() {
  const monaco = useMonaco();

  useEffect(() => {
    if (!monaco) return;

    monaco.editor.defineTheme("cooperrunyan-dark", dark() as any);
    monaco.editor.defineTheme("cooperrunyan-light", light() as any);

    monaco.editor.setTheme("cooperrunyan-dark");

    monaco.languages.register({ id: "latex" });
    monaco.languages.setMonarchTokensProvider("latex", {
      displayName: "Latex",
      name: "latex",
      mimeTypes: ["text/latex", "text/tex"],
      fileExtensions: ["tex", "sty", "cls"],

      lineComment: "% ",

      builtin: [
        "addcontentsline",
        "addtocontents",
        "addtocounter",
        "address",
        "addtolength",
        "addvspace",
        "alph",
        "appendix",
        "arabic",
        "author",
        "backslash",
        "baselineskip",
        "baselinestretch",
        "bf",
        "bibitem",
        "bigskipamount",
        "bigskip",
        "boldmath",
        "boldsymbol",
        "cal",
        "caption",
        "cdots",
        "centering",
        "chapter",
        "circle",
        "cite",
        "cleardoublepage",
        "clearpage",
        "cline",
        "closing",
        "color",
        "copyright",
        "dashbox",
        "date",
        "ddots",
        "documentclass",
        "dotfill",
        "em",
        "emph",
        "ensuremath",
        "epigraph",
        "euro",
        "fbox",
        "flushbottom",
        "fnsymbol",
        "footnote",
        "footnotemark",
        "footnotesize",
        "footnotetext",
        "frac",
        "frame",
        "framebox",
        "frenchspacing",
        "hfill",
        "hline",
        "href",
        "hrulefill",
        "hspace",
        "huge",
        "Huge",
        "hyphenation",
        "include",
        "includegraphics",
        "includeonly",
        "indent",
        "input",
        "it",
        "item",
        "kill",
        "label",
        "large",
        "Large",
        "LARGE",
        "LaTeX",
        "LaTeXe",
        "ldots",
        "left",
        "lefteqn",
        "line",
        "linebreak",
        "linethickness",
        "linewidth",
        "listoffigures",
        "listoftables",
        "location",
        "makebox",
        "maketitle",
        "markboth",
        "mathcal",
        "mathop",
        "mbox",
        "medskip",
        "multicolumn",
        "multiput",
        "newcommand",
        "newcolumntype",
        "newcounter",
        "newenvironment",
        "newfont",
        "newlength",
        "newline",
        "newpage",
        "newsavebox",
        "newtheorem",
        "nocite",
        "noindent",
        "nolinebreak",
        "nonfrenchspacing",
        "normalsize",
        "nopagebreak",
        "not",
        "onecolumn",
        "opening",
        "oval",
        "overbrace",
        "overline",
        "pagebreak",
        "pagenumbering",
        "pageref",
        "pagestyle",
        "par",
        "paragraph",
        "parbox",
        "parindent",
        "parskip",
        "part",
        "protect",
        "providecommand",
        "put",
        "raggedbottom",
        "raggedleft",
        "raggedright",
        "raisebox",
        "ref",
        "renewcommand",
        "right",
        "rm",
        "roman",
        "rule",
        "savebox",
        "sbox",
        "sc",
        "scriptsize",
        "section",
        "setcounter",
        "setlength",
        "settowidth",
        "sf",
        "shortstack",
        "signature",
        "sl",
        "slash",
        "small",
        "smallskip",
        "sout",
        "space",
        "sqrt",
        "stackrel",
        "stepcounter",
        "subparagraph",
        "subsection",
        "subsubsection",
        "tableofcontents",
        "telephone",
        "TeX",
        "textbf",
        "textcolor",
        "textit",
        "textmd",
        "textnormal",
        "textrm",
        "textsc",
        "textsf",
        "textsl",
        "texttt",
        "textup",
        "textwidth",
        "textheight",
        "thanks",
        "thispagestyle",
        "tiny",
        "title",
        "today",
        "tt",
        "twocolumn",
        "typeout",
        "typein",
        "uline",
        "underbrace",
        "underline",
        "unitlength",
        "usebox",
        "usecounter",
        "uwave",
        "value",
        "vbox",
        "vcenter",
        "vdots",
        "vector",
        "verb",
        "vfill",
        "vline",
        "vphantom",
        "vspace",

        "RequirePackage",
        "NeedsTeXFormat",
        "usepackage",
        "input",
        "include",
        "documentclass",
        "documentstyle",
        "def",
        "edef",
        "defcommand",
        "if",
        "ifdim",
        "ifnum",
        "ifx",
        "fi",
        "else",
        "begingroup",
        "endgroup",
        "definecolor",
        "textcolor",
        "color",
        "eifstrequal",
        "eeifstrequal",
      ],
      tokenizer: {
        root: [
          [
            "(\\\\begin)(\\s*)(\\{)([\\w\\-\\*\\@]+)(\\})",
            [
              "keyword.predefined",
              "white",
              "punctuation.bracket",
              { token: "tag.env-$4", bracket: "@open" },
              "punctuation.bracket",
            ],
          ],
          [
            "(\\\\end)(\\s*)(\\{)([\\w\\-\\*\\@]+)(\\})",
            [
              "keyword.predefined",
              "white",
              "punctuation.bracket",
              { token: "tag.env-$4", bracket: "@close" },
              "punctuation.bracket",
            ],
          ],
          ["\\{|\\}|\\\\left\\(|\\\\right\\)", "punctuation.bracket"],
          ["\\\\\\\\", "comment"],
          ["\\\\[^a-zA-Z@]", "keyword"],
          ["&|=|-|\\+|\\<|\\>|\\^", "operator"],
          ["\\@[a-zA-Z@]+", "keyword.at"],
          [
            "\\\\([a-zA-Z@]+)",
            {
              cases: {
                "$1@builtin": "keyword.predefined",
                "@default": "keyword",
              },
            },
          ],
          { include: "@whitespace" },
          ["[{}()\\[\\]]", "punctuation.bracket"],
          ["#+\\d", "number.arg"],
          [
            "\\-?(?:\\d+(?:\\.\\d+)?|\\.\\d+)\\s*(?:em|ex|pt|pc|sp|cm|mm|in)",
            "number.len",
          ],
        ],

        whitespace: [
          ["[ \\t\\r\\n]+", "white"],
          ["%.*$", "comment"],
        ],
      },
    });

    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) monaco.editor.setTheme("cooperrunyan-dark");
      else monaco.editor.setTheme("cooperrunyan-light");
    };

    listener(mq);
    mq.addEventListener("change", listener);

    return () => mq.removeEventListener("change", listener);
  }, [monaco]);
}

type Color = [number, number, number];

function hex(n: number) {
  const h = n.toString(16);
  return h.length === 1 ? `0${h}` : h;
}

function blend(a: Color, b: Color, r: number) {
  const c = [
    Math.round(a[0] * r + (1 - r) * b[0]),
    Math.round(a[1] * r + (1 - r) * b[1]),
    Math.round(a[2] * r + (1 - r) * b[2]),
  ];

  return `#${hex(c[0])}${hex(c[1])}${hex(c[2])}`;
}

function dark() {
  const primary: Color = [0, 0x9d, 0xff];
  const bg: Color = [0xcc, 0xcc, 0xcc];

  const p = {
    grey: [
      "#000000",
      "#0a0a0a",
      "#141414",
      "#1f1f1f",
      "#3d3d3d",
      "#5c5c5c",
      "#808080",
      "#a3a3a3",
      "#cccccc",
      "#ffffff",
    ],

    // primary: "#009dff",
    primary: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((r) =>
      blend(primary, bg, r),
    ),

    secondary: "#b030ff",
    orange: "#ff442c",
  };

  return {
    base: "vs-dark",
    inherit: true,
    rules: [
      {
        foreground: p.grey[5],
        token: "comment",
      },
      {
        foreground: "79c0ff",
        token: "constant",
      },
      {
        foreground: "79c0ff",
        token: "entity.name.constant",
      },
      {
        foreground: "79c0ff",
        token: "variable.other.constant",
      },
      {
        foreground: "79c0ff",
        token: "entity",
      },
      {
        foreground: p.grey[8],
        token: "tag",
      },
      {
        foreground: p.primary[4],
        token: "keyword",
      },
      {
        foreground: "ea4a5a",
        token: "storage",
      },
      {
        foreground: "a5d6ff",
        token: "string",
      },
      {
        foreground: p.grey[6],
        token: "punctuation",
      },
      // {
      //   foreground: p.secondary,
      //   token: "bracket",
      // },
      {
        foreground: "c9d1d9",
        token: "variable",
      },
      {
        foreground: p.primary[9],
        token: "operator",
      },
    ],
    colors: {
      "editor.foreground": p.grey[8],
      "editor.background": p.grey[1],
      "editor.selectionBackground": p.grey[2],
      "editor.inactiveSelectionBackground": p.grey[2],
      "editor.lineHighlightBackground": "#444d56",
      "editorCursor.foreground": p.grey[8],
      "editorWhitespace.foreground": "#0d111700",
      "editorIndentGuide.background": "#6a737d",
      "editorIndentGuide.activeBackground": "#f6f8fa",
      "editor.selectionHighlightBorder": "#444d56",
      "editor.wordHighlightBackground": p.grey[3],
      "editor.wordHighlightTextBackground": p.grey[3],
      "editorStickyScrollHover.background": p.grey[2],
      focusBorder: "#00000000",
    },
  };
}

function light() {
  const primary: Color = [0, 0x70, 0xff];
  const bg: Color = [0x33, 0x33, 0x33];

  const p = {
    grey: [
      "#000000",
      "#0a0a0a",
      "#141414",
      "#1f1f1f",
      "#3d3d3d",
      "#5c5c5c",
      "#808080",
      "#a3a3a3",
      "#ebebeb",
      "#ffffff",
    ],

    // primary: "#009dff",
    primary: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((r) =>
      blend(primary, bg, r),
    ),

    secondary: "#b030ff",
    orange: "#ff442c",
  };

  return {
    base: "vs-dark",
    inherit: false,
    rules: [
      {
        foreground: p.grey[5],
        token: "comment",
      },
      {
        foreground: "79c0ff",
        token: "constant",
      },
      {
        foreground: "79c0ff",
        token: "entity.name.constant",
      },
      {
        foreground: "79c0ff",
        token: "variable.other.constant",
      },
      {
        foreground: "79c0ff",
        token: "entity",
      },
      {
        foreground: p.grey[3],
        token: "tag",
      },
      {
        foreground: p.primary[4],
        token: "keyword",
      },
      {
        foreground: "ea4a5a",
        token: "storage",
      },
      {
        foreground: "a5d6ff",
        token: "string",
      },
      {
        foreground: p.grey[5],
        token: "punctuation",
      },
      // {
      //   foreground: p.secondary,
      //   token: "bracket",
      // },
      {
        foreground: "c9d1d9",
        token: "variable",
      },
      {
        foreground: p.primary[9],
        token: "operator",
      },
    ],
    colors: {
      "editor.foreground": p.grey[0],
      "editor.background": p.grey[9],
      "editor.selectionBackground": p.grey[8],
      "editor.inactiveSelectionBackground": p.grey[8],
      "editor.lineHighlightBackground": "#444d56",
      "editorCursor.foreground": p.grey[0],
      "editorWhitespace.foreground": "#0d111700",
      "editorIndentGuide.background": "#6a737d",
      "editorIndentGuide.activeBackground": "#f6f8fa",
      "editor.selectionHighlightBorder": "#444d56",
      "editor.wordHighlightBackground": "#dadada",
      "editor.wordHighlightTextBackground": "#dadada",
      "editorStickyScrollHover.background": "#dadada",
      focusBorder: "#00000000",
    },
  };
}
