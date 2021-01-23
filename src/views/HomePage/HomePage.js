import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import slugify from 'slugify';
import { Pagination } from '@material-ui/lab';

import * as apiService from '../../services/apiService';
import Status from '../../services/status';
import PaginationStyles from './Pagination';
import Loader from '../../components/Loader/Loader';
import ErrorImg from '../../components/ErrorImg/ErrorImg';
import noImg from '../../img/dummy.jpg';

import s from './HomePage.module.css';

const makeSlug = string => slugify(string, { lower: true });

function HomePage() {
  const classes = PaginationStyles();
  const history = useHistory();
  const location = useLocation();
  const [movies, setMovies] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const page = new URLSearchParams(location.search).get('page') ?? 1;

  useEffect(() => {
    setStatus(Status.PENDING);
    apiService
      .getTrending(page)
      .then(({ results, total_pages }) => {
        setMovies(results);
        setTotalPage(total_pages);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError('Something went wrong. Please, try again.');
        setStatus(Status.REJECTED);
      });
  }, [page]);

  const onHandlePage = (event, page) => {
    history.push({ ...location, search: `page=${page}` });
  };

  return (
    <main className={s.main}>
      <h1 className={s.title}>The Most Popular Movies</h1>

      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErrorImg message={error.message} />}

      {status === Status.RESOLVED && (
        <>
          <ul className={s.moviesList}>
            {movies.map(movie => (
              <li key={movie.id} className={s.moviesItem}>
                <Link
                  to={{
                    pathname: `movies/${makeSlug(
                      `${movie.title} ${movie.id}`,
                    )}`,
                    state: { from: location },
                  }}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : noImg
                    }
                    alt={movie.title}
                    className={s.poster}
                  />
                </Link>
                <span className={s.movieTitle}>{movie.title}</span>
              </li>
            ))}
          </ul>
          {totalPage > 1 && (
            <Pagination
              className={classes.root}
              count={totalPage}
              onChange={onHandlePage}
              page={Number(page)}
              showFirstButton
              showLastButton
              size="medium"
            />
          )}
        </>
      )}
    </main>
  );
}

export default HomePage;
