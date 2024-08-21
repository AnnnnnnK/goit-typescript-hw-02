import { FC, FormEvent } from "react";
import css from "./Searchbar.module.css";

interface SearchbarProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Searchbar: FC<SearchbarProps> = ({ onSubmit }) => {
  return (
    <header className={css.header}>
      <form onSubmit={onSubmit} className={css.form}>
        <input
          className={css.input}
          name="search"
          type="text"
          placeholder="Search images and photos"
        />
        <button type="submit" className={css.btn}>
          <span>Search</span>
        </button>
      </form>
    </header>
  );
};

export default Searchbar;
