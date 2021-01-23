import * as apiService from '../../services/apiService';
import Status from '../../services/status';
import Loader from '../../components/Loader/Loader';
import ErrorImg from '../../components/ErrorImg/ErrorImg';
import noImg from '../../img/dummy.jpg';
import s from './Cast.module.css';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cast() {
  const { slug } = useParams();
  const movieId = slug.match(/[a-z0-9]+$/)[0];
  const [authors, setAuthors] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    apiService
      .getMovieCredits(movieId)
      .then(({ cast }) => {
        if (cast.length === 0) {
          toast.error('No results!');
          setStatus(Status.IDLE);
          return;
        }
        setAuthors(cast);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        console.log(error);
        setError('Something went wrong. Please, try again.');
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  return (
    <>
      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <ErrorImg message={error} />}

      {status === Status.RESOLVED && (
        <ul className={s.cast}>
          {authors.map(author => (
            <li key={author.id} className={s.item}>
              <img
                src={
                  author.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${author.profile_path}`
                    : noImg
                }
                alt={author.original_name}
                className={s.photo}
              />
              <h4 className={s.name}>{author.original_name}</h4>
              <p className={s.character}>{author.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Cast;
