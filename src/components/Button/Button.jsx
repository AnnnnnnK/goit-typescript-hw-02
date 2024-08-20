import css from "./Button.module.css";

const Button = ({ onLoadMore }) => {
  return (
    <button onClick={onLoadMore} className={css.btn}>
      Load more
    </button>
  );
};

export default Button;
