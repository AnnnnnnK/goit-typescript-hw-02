import { FC } from "react";
import { Image } from "../../types";
import css from "./ImageGalleryItem.module.css";

interface ImageGalleryItemProps {
  image: Image;
  openModal: (largeImgUrl: string, tag: string) => void;
}

const ImageGalleryItem: FC<ImageGalleryItemProps> = ({ image, openModal }) => {
  const { tags, webformatURL, largeImageURL } = image;

  const handleClick = () => {
    openModal(largeImageURL, tags);
  };

  return (
    <li onClick={handleClick} className={css.item}>
      <img src={webformatURL} alt="tags" loading="lazy" className={css.img} />
    </li>
  );
};

export default ImageGalleryItem;
