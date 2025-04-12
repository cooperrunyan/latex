"use client";

import { type FC, type RefObject, useEffect, useRef } from "react";

type Props = {
  children?: HTMLElement;
  skip?: (element: HTMLElement) => boolean;
  ref?: RefObject<HTMLDivElement | null>;
};

export const HTMLElementRenderer: FC<Props> = ({
  children: element,
  skip,
  ref: refArg,
}) => {
  const backupRef = useRef<HTMLDivElement>(null);
  const ref = refArg ? refArg : backupRef;

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (ref.current && element && !skip?.(element))
      ref.current.replaceChildren(element);
    // if (element.querySelector('[data-mml-node="merror"]')) return;
  }, [element]);

  return <div ref={ref} />;
};
