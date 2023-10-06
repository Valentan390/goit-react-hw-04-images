import styles from './Searchbar.module.css';
import { useState } from 'react';

import { ImSearch } from 'react-icons/im';

export const Searchbar = ({ onSubmit }) => {
  const [inputData, setinputData] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(inputData);
    setinputData('');
  };

  const onChangeInput = event => {
    const { value } = event.target;
    setinputData(value);
  };

  return (
    <div>
      <header className={styles.Searchbar}>
        <form onSubmit={handleSubmit} className={styles.SearchForm}>
          <button type="submit" className={styles.SearchFormButton}>
            <ImSearch size={25} />
            {/* <span class="button-label">Search</span> */}
          </button>

          <input
            name="inputData"
            value={inputData}
            onChange={onChangeInput}
            className={styles.SearchFormInput}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </div>
  );
};
