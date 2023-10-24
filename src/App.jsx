import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

// import { MainLayout } from 'components/MainLayout/MainLayout';
// import { Container } from 'Styles/Container';
// import Spinner from './Spinner/spinner';

const MainPage = lazy(() => import('pages/MainPage/MainPage'));

const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'));


export function App() {
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch();
  }, [dispatch]);

  return (
    <Container>
            <Routes>
          <Route element={<PublicRoute />}>
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<MainPage />} />
          </Route>
        </Routes>
    </Container>
  );
}
