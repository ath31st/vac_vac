import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const useAuth = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const token = useSelector((state: RootState) => state.auth.token);

  return { isAuthenticated, token };
};

export default useAuth;
