import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthenticated } from '../redux/auth/selectors'; // Предположим, что у вас есть селектор для этого

export const PrivateRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? (
    <div style={{ display: 'flex' }}>
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};
