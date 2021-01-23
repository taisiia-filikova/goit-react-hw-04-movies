import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addBackToTop } from 'vanilla-back-to-top';

import Container from './components/Container/Container';
import AppBar from './components/AppBar/AppBar';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() =>
  import('./views/HomePage/HomePage' /* webpackChunkName: "home-view" */),
);

const MoviesPage = lazy(() =>
  import('./views/MoviesPage/MoviesPage' /* webpackChunkName: "movies-view" */),
);

const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage/MovieDetailsPage' /* webpackChunkName: "movies-details-view" */
  ),
);

const NotFoundImg = lazy(() =>
  import(
    './views/NotFoundImg/NotFoundImg' /* webpackChunkName: "not-found-view" */
  ),
);

function App() {
  useEffect(() => {
    addBackToTop({
      backgroundColor: '#000000',
    });
  }, []);

  return (
    <Container>
      <AppBar />

      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:slug">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundImg />
          </Route>
        </Switch>
      </Suspense>

      <ToastContainer autoClose={3700} position="bottom-center" />
    </Container>
  );
}

export default App;
