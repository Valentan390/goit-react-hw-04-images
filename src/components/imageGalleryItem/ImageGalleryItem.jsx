import { useState } from 'react';
import styles from './ImageGalleryItem.module.css';
import { Modal } from 'components/modal/Modal';

export const ImageGalleryItem = ({ item }) => {
  const [shownModal, setShownModal] = useState(false);

  const onModal = () => {
    setShownModal(!shownModal);
  };

  return (
    <li className={styles.ImageGalleryItem}>
      <img
        onClick={onModal}
        className={styles.ImageGalleryItemImage}
        src={item.webformatURL}
        alt="img"
      />
      {shownModal && <Modal onClose={onModal} image={item} />}
    </li>
  );
};
