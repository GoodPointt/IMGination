import { useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { SearchForm } from './SearchForm/SearchForm';
import { Modal } from './Modal/Modal';

import { StyledApp } from './Styled';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImgPath, setLargeImgPath] = useState(null);
  const [tags, setTags] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const toggleModal = (img, alts) => {
    setLargeImgPath(img);
    setTags(alts);
    setShowModal(prevState => !prevState);
  };

  const onSearch = e => {
    e.preventDefault();
    const searchInput = e.currentTarget.elements[1].value.trim();
    if (searchInput === '') {
      toast.info('Enter search query fisrst!');
      return;
    }
    setCurrentPage(1);
    setSearchQuery(searchInput);
  };

  const loadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  return (
    <StyledApp>
      <SearchForm onSearch={onSearch} />

      <ImageGallery
        onImgClick={toggleModal}
        searchQuery={searchQuery}
        currentPage={currentPage}
        loadMore={loadMore}
      />

      {showModal && (
        <Modal toggleModal={toggleModal} showModal={showModal}>
          <img src={largeImgPath} alt={tags} />
        </Modal>
      )}

      <ToastContainer
        position="top-right"
        autoClose={1700}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </StyledApp>
  );
};
