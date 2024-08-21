import css from "./Button.module.css";
import { FC } from "react";

interface ButtonProps {
  onLoadMore: () => void;
}

const Button: FC<ButtonProps> = ({ onLoadMore }) => {
  return (
    <button onClick={onLoadMore} className={css.btn}>
      Load more
    </button>
  );
};

export default Button;
