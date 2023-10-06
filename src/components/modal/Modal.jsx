import { useEffect } from 'react';
import style from './Modal.module.css';
import { createPortal } from 'react-dom';

const ModalRoot = document.getElementById('ModalRoot');

export const Modal = ({ onClose, image }) => {
  const handleBackdrop = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return createPortal(
    <div onClick={handleBackdrop} className={style.Overlay}>
      <div className={style.Modal}>
        <img src={image.largeImageURL} alt="img" />
      </div>
    </div>,
    ModalRoot
  );
};
