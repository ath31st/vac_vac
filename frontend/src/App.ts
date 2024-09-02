import { Routes, Route } from 'react-router-dom';
// @ts-expect-error TS(6142): Module './pages/Signup' was resolved to '/home/lin... Remove this comment to see the full error message
import Signup from './pages/Signup';
// @ts-expect-error TS(6142): Module './pages/NotFoundPage' was resolved to '/ho... Remove this comment to see the full error message
import NotFoundPage from './pages/NotFoundPage';
// @ts-expect-error TS(6142): Module './components/Layout' was resolved to '/hom... Remove this comment to see the full error message
import Layout from './components/Layout';
// @ts-expect-error TS(6142): Module './pages/Vacancies' was resolved to '/home/... Remove this comment to see the full error message
import Vacancies from './pages/Vacancies';
// @ts-expect-error TS(6142): Module './pages/HomePage' was resolved to '/home/l... Remove this comment to see the full error message
import HomePage from './pages/HomePage';
// @ts-expect-error TS(6142): Module './pages/Login' was resolved to '/home/linu... Remove this comment to see the full error message
import Login from './pages/Login';
// @ts-expect-error TS(6142): Module './components/PrivateRoute' was resolved to... Remove this comment to see the full error message
import PrivateRoute from './components/PrivateRoute';
// @ts-expect-error TS(6142): Module './pages/CreateVacancy' was resolved to '/h... Remove this comment to see the full error message
import CreateVacancy from './pages/CreateVacancy';
// @ts-expect-error TS(6142): Module './pages/ActiveVacancies' was resolved to '... Remove this comment to see the full error message
import ActiveVacancies from './pages/ActiveVacancies';
// @ts-expect-error TS(6142): Module './pages/MyVacancies' was resolved to '/hom... Remove this comment to see the full error message
import MyVacancies from './pages/MyVacancies';

function App() {
  return (
    // @ts-expect-error TS(2304): Cannot find name 'div'.
    <div className="App">
      // @ts-expect-error TS(2749): 'Routes' refers to a value, but is being used as a... Remove this comment to see the full error message
      <Routes>
        // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
        <Route path="/" element={<Layout />}>
          // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
          <Route index element={<HomePage />} />
          // @ts-expect-error TS(2304): Cannot find name 'path'.
          <Route path="/signup" element={<Signup />} />
          // @ts-expect-error TS(2304): Cannot find name 'path'.
          <Route path="/login" element={<Login />} />
          // @ts-expect-error TS(2304): Cannot find name 'path'.
          <Route path="/vacancies"
            // @ts-expect-error TS(2304): Cannot find name 'element'.
            element={<PrivateRoute element={<Vacancies />} />} />
          // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
          <Route path="/my-vacancies"
            // @ts-expect-error TS(2304): Cannot find name 'element'.
            element={<PrivateRoute element={<MyVacancies />} />} />
          // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
          <Route path="/active-vacancies"
            // @ts-expect-error TS(2304): Cannot find name 'element'.
            element={<PrivateRoute element={<ActiveVacancies />} />} />
          // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
          <Route path="/create-vacancy"
            // @ts-expect-error TS(2304): Cannot find name 'element'.
            element={<PrivateRoute element={<CreateVacancy />} />} />
          // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
