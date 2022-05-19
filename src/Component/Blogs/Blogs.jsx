import { Container, Card, Col, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Blogs.css';
import moment from 'moment';
import 'moment/locale/id';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles as getBlogs, resetArticle } from '../../redux/actions/blogActions';
import Pages from './Pages';
import SearchIcon from '@mui/icons-material/Search';
export const Blogs = () => {
  const dispatch = useDispatch();
  const getArticles = useSelector((state) => state.getBlogs);
  const { blogs, loading, error } = getArticles;

  const [currentPage, setCurrentPage] = useState(1);
  const [sessionsPerPage, setSessionsPerPage] = useState(4);
  const [totalItems, setTotalItems] = useState(0);
  const [SearchText, setSearchText] = useState('');
  useEffect(() => {
    // getArticles();
    dispatch(getBlogs(SearchText, currentPage));
    return () => {
      dispatch(resetArticle());
    };
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (blogs && blogs.meta) {
      // setTotalItems(blogs.meta.total);
      // setSessionsPerPage(blogs.meta.per_page);

      setCurrentPage(blogs.meta.current_page <= blogs.meta.last_page ? blogs.meta.current_page : 1);
    }
  }, [blogs]);

  // const getArticles = () => {
  // axios
  //   .get('http://localhost:3001/blogs')
  //   .then((res) => {
  //     setBlogs(res.data);
  //     setLoadng(!Loading);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // };

  const handleInput = (e) => {
    setSearchText(e.target.value);
  };
  const handleEnterKeyPressed = (e) => {
    if (e.key === 'Enter') {
      // onSearch(searchText); // <- ambil di action redux

      dispatch(getBlogs(SearchText, 1));
    }
  };
  return (
    <main>
      <section>
        <div className="blogs-container">
          <Container>
            <h1 className="title-blogs-section mb-1">
              <span>Artikel</span>
            </h1>
            <div className="p-2 mb-4">
              <div className="navbar-search-container w-75 m-auto">
                <SearchIcon style={{ color: 'gray', fontSize: 25 }} /> <input onKeyPress={handleEnterKeyPressed} value={SearchText} onChange={handleInput} type="text" className="navbar-input" placeholder="Ketik Pencarian..." />;
              </div>
            </div>
            {loading || loading === undefined ? (
              <div className="loading">
                <Spinner animation="border" variant="warning" role="status" className="m-auto">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : error ? (
              <div className="alert alert-danger" role="alert">
                {error}{' '}
              </div>
            ) : blogs.meta && blogs.meta.total !== 0 ? (
              blogs &&
              blogs.data.map((item, index) => {
                return (
                  <div className="px-2" key={index}>
                    <Col md={12}>
                      <div className="blog-card w-100">
                        <div className="meta">
                          <div className="photo" style={{ backgroundImage: `url("${item.image}")` }}></div>
                        </div>
                        <div className="description">
                          <h3>{item.title}</h3>
                          <div className="pt-2 pb-2 meta-tag">
                            <Link className="read-more-size" to="#">
                              <i className="fa-solid fa-calendar"></i>
                              {moment(item.created_at).format('Do MMMM YYYY')}
                            </Link>
                            {/* <Link className="read-more-size " to="#">
                              <i className="fa-solid fa-eye"></i>
                              {item.views}
                            </Link> */}
                          </div>

                          <p
                            className="pt-1 pb-4 text-article"
                            dangerouslySetInnerHTML={{
                              __html: `${item.excerpt}`,
                            }}
                          ></p>

                          <p className="read-more">
                            <Link className="read-more-right" to={`/article/${item.slug}`}>
                              Baca Selengkapnya
                            </Link>
                          </p>
                        </div>
                      </div>
                    </Col>
                  </div>
                );
              })
            ) : (
              <h2 className="text-white text-center p-3">Artikel Tidak Ditemukan</h2>
            )}
            {blogs.meta && blogs.meta.total !== 0 ? (
              <div className="d-flex justify-content-center">
                <Pages itemsCount={blogs.meta.total} itemsPerPage={blogs.meta.per_page} currentPage={blogs.meta.current_page} setCurrentPage={setCurrentPage} />
              </div>
            ) : undefined}
          </Container>
        </div>
      </section>
    </main>
  );
};
