import { Container, Card, Col, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Blogs.css';
import moment from 'moment';
import 'moment/locale/id';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles as getBlogs } from '../../redux/actions/blogActions';

export const Blogs = () => {
  const dispatch = useDispatch();
  const getArticles = useSelector((state) => state.getBlogs);
  const { blogs, loading, error } = getArticles;

  useEffect(() => {
    // getArticles();
    dispatch(getBlogs());
  }, []);
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

  return (
    <main>
      <section>
        <div className="blogs-container">
          <Container>
            <h1 className="title-blogs-section">
              <span>Artikel</span>
            </h1>
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
            ) : (
              blogs &&
              blogs.data.map((item, index) => {
                return (
                  <Row className="p-5" key={index}>
                    <Col md={12}>
                      <div className="blog-card w-100">
                        <div className="meta">
                          <div className="photo" style={{ backgroundImage: 'url(' + '/' + item.image + ')' }}></div>
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
                  </Row>
                );
              })
            )}
          </Container>
        </div>
      </section>
    </main>
  );
};
