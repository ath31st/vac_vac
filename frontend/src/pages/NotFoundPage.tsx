import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      This page doesn't exist. Go <Link to="/">home</Link>
    </div>
  );
};

export default NotFoundPage;
