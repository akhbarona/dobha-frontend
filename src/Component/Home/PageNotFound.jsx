import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Container className="pnf p-3" fluid>
      <h1 className="text-white">404 Error Page</h1>
      <p className="zoom-area text-white">
        <b>Page Not Found</b>
      </p>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <Link to="/" className="more-link">
          Back To Home
        </Link>
      </div>
    </Container>
  );
};

export default PageNotFound;
