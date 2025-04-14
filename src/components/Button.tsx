import style from "./Button.module.css";

import { type FC, useState } from "react";

import { type Download, LoaderCircle } from "lucide-react";

type Props = {
  icon: typeof Download;
  onClick: (() => unknown) | (() => Promise<unknown>);
  loads?: boolean;
};

export const Button: FC<Props> = ({ icon: Icon, onClick, loads = false }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      type="button"
      className={style.button}
      data-is-loading={isLoading}
      onClick={() => {
        if (isLoading) return;
        if (loads) {
          setIsLoading(true);
          Promise.resolve(onClick()).then(() => {
            setIsLoading(false);
          });
        } else onClick();
      }}
    >
      <LoaderCircle
        size={16}
        className={`${style.loading} ${isLoading ? style.show : style.hide}`}
      />
      <Icon
        size={16}
        className={`${style.icon} ${isLoading ? style.hide : style.show}`}
      />
    </button>
  );
};
