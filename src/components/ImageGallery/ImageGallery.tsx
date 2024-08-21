import { FC } from "react";
import { Image } from "../../types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: Image[];
  openModal: (largeImgUrl: string, tag: string) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, openModal }) => {
  return (
    <ul className={css.container}>
      {images.map((image) => (
        <ImageGalleryItem key={image.id} image={image} openModal={openModal} />
      ))}
    </ul>
  );
};

export default ImageGallery;
