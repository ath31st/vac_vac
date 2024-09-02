import { useSelector } from 'react-redux';

const useAuth = () => {
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  const token = useSelector((state) => state.auth.token);
  return { isAuthenticated, token };
};

export default useAuth;
