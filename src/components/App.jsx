import { useEffect, useState } from 'react';
import { getArticlesService } from './services/articlesServices';
import Notiflix from 'notiflix';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import './App.css';
import { Loader } from './loader/Loader';
import { Button } from './button/Button';

const fetchStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const PER_PAGE = 12;

let totalResults = null;

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState(fetchStatus.IDLE);

  useEffect(() => {
    if (search.trim() === '') {
      return;
    }
    const fetchItems = async () => {
      setStatus(fetchStatus.LOADING);

      try {
        const { data } = await getArticlesService(search, page);

        totalResults = data.totalHits;

        if (data.totalHits < 1) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );

          setStatus(fetchStatus.SUCCESS);
        }

        Notiflix.Notify.info(`Total found ${data.total} photos.`);

        setItems(prev => (page > 1 ? [...prev, ...data.hits] : [...data.hits]));
        setStatus(fetchStatus.SUCCESS);
      } catch (error) {
        setStatus(fetchStatus.ERROR);

        Notiflix.Notify.failure('Sorry something went wrong.');
      }
    };

    fetchItems();
  }, [search, page]);

  const handleChangeSearch = value => {
    if (value.trim() === '') {
      Notiflix.Notify.info('Please enter your search term.');
      return;
    }
    setSearch(value);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const canLoadMore = Math.ceil(totalResults / PER_PAGE) > page;

  return (
    <div className="App">
      <Searchbar onSubmit={handleChangeSearch} />

      <ImageGallery items={items} />

      {status === fetchStatus.LOADING && <Loader />}

      {canLoadMore && <Button onClick={handleLoadMore} />}
    </div>
  );
};
