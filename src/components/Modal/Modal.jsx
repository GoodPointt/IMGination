import PropTypes from 'prop-types';
// import { AnimatePresence } from 'framer-motion';

import { ModalBackdrop, ModalContent } from 'components/Styled';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ toggleModal, showModal, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
      window.scrollTo(0, scrollY);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  const handleKeyDown = e => {
    if (e.code === 'Escape') toggleModal();
  };

  const handleBackdropClick = e => {
    e.currentTarget === e.target && toggleModal();
  };

  return createPortal(
    <ModalBackdrop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ overflow: 'hidden' }}
      transition={{ duration: 0.3 }}
      onClick={handleBackdropClick}
    >
      <ModalContent
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        style={{ overflow: 'hidden' }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </ModalContent>
    </ModalBackdrop>,
    modalRoot
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};
