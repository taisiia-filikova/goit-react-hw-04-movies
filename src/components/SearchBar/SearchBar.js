import { useState } from 'react';
import { toast } from 'react-toastify';
import propTypes from 'prop-types';
import s from './SearchBar.module.css';

function SearchBar({ onHandleSubmit }) {
  const [query, setQuery] = useState('');

  const onSubmit = evt => {
    evt.preventDefault();
    if (query.trim() === '') {
      return toast.info('What do you want to find?');
    }
    onHandleSubmit(query.trim());
    setQuery('');
  };

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <input
        className={s.input}
        type="text"
        value={query}
        autoComplete="off"
        autoFocus
        placeholder="Search"
        onChange={({ target }) => setQuery(target.value)}
      />
      <button type="submit" className={s.button}>
        <span className={s.label}>Search</span>
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  onHandleSubmit: propTypes.func.isRequired,
};

export default SearchBar;
