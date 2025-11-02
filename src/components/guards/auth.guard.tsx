import { Navigate, Outlet } from 'react-router-dom';
import AuthStorage from '../utilities/auth-storage.utility';

const AuthGuard = () => {
  const token = AuthStorage.getToken();

  console.log("AuthGuard: Checking authentication");

  if (!token || AuthStorage.isTokenExpired(token)) {
    AuthStorage.logout();
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
