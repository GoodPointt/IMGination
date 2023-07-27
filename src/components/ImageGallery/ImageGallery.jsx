import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button, ImageGalleryList } from 'components/Styled';
import { BASE_URL, API_KEY, perPage } from 'api/api';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { LoaderSpinner } from 'components/Loader/Loader';

export const ImageGallery = ({
  onImgClick,
  searchQuery,
  currentPage,
  loadMore,
}) => {
  const [initialRender, setInitialRender] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImgs = async (BASE_URL, API_KEY, perPage) => {
      const SEARCH_URL = `${BASE_URL}?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;

      try {
        const res = await fetch(SEARCH_URL);
        if (res.ok) {
          const { hits, total } = await res.json();
          if (hits.length === 0) {
            setLoading(false);
            toast.warn(
              `Sorry! But nothing found matches your query "${searchQuery}"`
            );
          } else {
            setSearchResult(prevState => [...prevState, ...hits]);
            setTotalHits(total);
            setShowLoadMore(total / currentPage > 12);
          }
        } else {
          throw new Error('Oops! 😒');
        }
      } catch (error) {
        toast.error(`Oops!😒 Some error occured: "${error.message}"`);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery !== '' && currentPage === 1) {
      setSearchResult([]);
      setLoading(true);
      setShowLoadMore(false);
      fetchImgs(BASE_URL, API_KEY, perPage);
    }

    if (currentPage > 1) {
      setLoading(true);
      fetchImgs(BASE_URL, API_KEY, perPage);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      toast.success(`We found ${totalHits} ${searchQuery}s for you`);
    }
    // eslint-disable-next-line
  }, [totalHits]);

  useEffect(() => {
    if (currentPage !== 1) {
      const { scrollHeight, clientHeight } = document.documentElement;
      const scrollPosition = scrollHeight - clientHeight;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [currentPage, searchResult]);

  return (
    <>
      {loading && <LoaderSpinner loading={loading} />}
      <ImageGalleryList>
        {searchResult &&
          searchResult.map(searchResultEl => (
            <ImageGalleryItem
              key={searchResultEl.id}
              onImgClick={onImgClick}
              searchResultEl={searchResultEl}
            />
          ))}
      </ImageGalleryList>

      {showLoadMore && (
        <Button type="button" onClick={loadMore}>
          Load more...
        </Button>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  onImgClick: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};
