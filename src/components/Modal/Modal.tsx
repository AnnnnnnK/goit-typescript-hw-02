import { FC, useEffect, MouseEvent } from "react";
import css from "./Modal.module.css";

interface ModalProps {
  hideModal: () => void;
  largeImgUrl: string;
  tag: string;
}

const Modal: FC<ModalProps> = ({ hideModal, largeImgUrl, tag }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent): void => {
      if (e.code === "Escape") hideModal();
    };

    document.addEventListener("keydown", handleEsc);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [hideModal]);

  const onBackdropClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      hideModal();
    }
  };

  return (
    <div className={css.modal} onClick={onBackdropClick}>
      <div className={css.modal_content}>
        <img src={largeImgUrl} alt={tag} />
      </div>
    </div>
  );
};

export default Modal;
