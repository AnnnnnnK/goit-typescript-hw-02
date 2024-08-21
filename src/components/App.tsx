import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import Loader from "./Loader/Loader";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { FC, FormEvent, useCallback, useEffect, useState } from "react";
import { getAllImages } from "../api/images";
import Searchbar from "./Searchbar/Searchbar";
import { Image } from "../types";

interface Response {
  hits: Image[];
  total: number;
  totalHits: number;
}

const App: FC = () => {
  const [images, setImages] = useState<Image[] | null>(null);
  const [largeImgUrl, setLargeImgUrl] = useState<string>("");
  const [tag, setTag] = useState<string>("");

  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const [q, setQ] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const getImages = useCallback(async () => {
    try {
      setLoader(true);

      const response: Response = await getAllImages(q, page);
      const { totalHits, hits } = response;

      if (totalHits === 0) {
        setLoadMore(false);
        Notify.info(`There is no such images like ${q}`);
        return;
      } else if (hits.length === 0) {
        setLoadMore(false);
        Notify.info(`There is no more images`);
        return;
      } else if (response) {
        Notify.success(`Yey, we found ${hits.length} images`);
      }

      const newImages: Image[] = hits.map(
        ({ id, webformatURL, largeImageURL, tags }: Image) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        })
      );

      setImages((prevImgs: Image[] | null): Image[] =>
        prevImgs ? [...prevImgs, ...newImages] : newImages
      );

      setLoadMore(true);
    } catch {
      Notify.failure(`Oops, something went wrong`);
    } finally {
      setLoader(false);
    }
  }, [q, page]);

  useEffect(() => {
    if (!q) return;
    getImages();
  }, [page, q, getImages]);

  const onSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const q = (form.elements.namedItem("search") as HTMLInputElement).value;

    console.dir(q);

    if (q === "") {
      Notify.warning("Please enter your request");
      return;
    }

    setQ(q);
    setPage(1);
    setImages(null);
  };

  const onLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
    setLoader(true);
  };

  const hideModal = (): void => {
    setIsShowModal(false);
  };

  const openModal = (largeImgUrl: string, tag: string): void => {
    setIsShowModal(true);
    setLargeImgUrl(largeImgUrl);
    setTag(tag);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmit} />
      {images && <ImageGallery images={images} openModal={openModal} />}
      {loader && <Loader />}
      {loadMore && <Button onLoadMore={onLoadMore} />}
      {isShowModal && (
        <Modal hideModal={hideModal} largeImgUrl={largeImgUrl} tag={tag} />
      )}
    </>
  );
};
export default App;
