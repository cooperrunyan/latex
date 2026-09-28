import { useMonacoLatex } from "@/lib/monaco";
import style from "./Editor.module.css";

import MonacoEditor from "@monaco-editor/react";
import { type FC, useCallback } from "react";

type Props = {
  defaultValue: string;
  setInput: (input: string) => void;
};

export const Editor: FC<Props> = ({ defaultValue, setInput }) => {
  useMonacoLatex();

  return (
    <div className={style.editor} data-html2canvas-ignore>
      <div className={style.head} />
      <MonacoEditor
        height="calc(100% - 36rem / 16)"
        width="100%"
        defaultLanguage="latex"
        defaultValue={defaultValue}
        onChange={(value, e) => setInput(value ?? "")}
        theme="github-dark"
        options={{
          bracketPairColorization: { enabled: true },
          fontFamily: "var(--font-geist-mono)",
          glyphMargin: false,
          // guides: { highlightActiveIndentation: false, indentation: false },
          scrollBeyondLastLine: false,
          minimap: { enabled: false },
          overviewRulerBorder: false,
          selectionHighlight: false,
          hideCursorInOverviewRuler: true,
          renderLineHighlight: "none",
          contextmenu: false,
          // renderValidationDecorations: "off",
          overviewRulerLanes: 0,
          // lineNumbers: "off",
          wordWrap: "on",
        }}
      />
    </div>
  );
};
