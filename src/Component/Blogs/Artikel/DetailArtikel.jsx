import { Row, Col, Card, Container } from 'react-bootstrap';
import './DetailArtikel.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleDetail, getArtikelRelated } from '../../../redux/actions/blogActions';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
const DetailArtikel = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const articleDetails = useSelector((state) => state.getBlogDetails);
  const articleRelated = useSelector((state) => state.getBlogsRelated);
  const { blog, loading, error } = articleDetails;

  useEffect(() => {
    dispatch(getArticleDetail(id));
    dispatch(getArtikelRelated());
  }, [dispatch, id]);

  console.log(blog);

  return (
    <main>
      <section>
        <div className="body-artikel">
          <Row className="row-cols-1 row-cols-lg-2 row-cols-xl-2">
            {loading || loading === undefined ? (
              <h2>Loading...</h2>
            ) : error ? (
              <h2>{error}</h2>
            ) : (
              <Col xl={8} lg={7}>
                <Container fluid>
                  <div className="konten">
                    <Card className="card-main">
                      <div className="image-artikel">
                        <Card.Img variant="top" src={blog.data.image} className="img-card-main w-100" />
                      </div>
                      {console.log(blog.data)}
                      <Card.Body>
                        <h2 className="title-card-main">{blog.data.title}</h2>
                        <Card.Text className="title-card-main">{parse(blog.data.body)}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </Container>
              </Col>
            )}

            <Col xl={4} lg={5}>
              {articleRelated.loading ? (
                <h2>Loading...</h2>
              ) : error ? (
                <h2>{error}</h2>
              ) : (
                <div className="style-artikel-terkait">
                  <h3>Artikel Terkait</h3>
                  {articleRelated.blogs &&
                    articleRelated.blogs.map((items, index) => {
                      return (
                        <Card className="Card-Detail" key={index}>
                          <Card.Img variant="top" src={'/' + items.image_file_data} className="img-card" />
                          <Card.Body>
                            <Card.Title className="title-card">{items.title}</Card.Title>
                          </Card.Body>
                        </Card>
                      );
                    })}
                </div>
              )}
            </Col>
          </Row>
        </div>
      </section>
    </main>
  );
};

export default DetailArtikel;
