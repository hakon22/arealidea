import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Badge } from 'react-bootstrap';
import { Bucket, ChatDots, Heart } from 'react-bootstrap-icons';
import { fetchLoading, selectors } from '../slices/articlesSlice.js';
import { ModalDelete } from './ModalForm.jsx';

const News = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    dispatch(fetchLoading());
  }, [dispatch]);

  const { loadingStatus } = useSelector((state) => state.articles);
  const articles = useSelector(selectors.selectAll);

  return loadingStatus !== 'finish'
    ? (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" role="status" />
      </div>
    )
    : (
      articles.map((news) => (
        <div key={news.id} className="card mt-4">
          <h5 className="card-header d-flex justify-content-between align-items-center">
            {news.title}
            <Bucket role="button" onClick={() => setModalShow(true)} />
            <ModalDelete
              show={modalShow}
              onHide={() => setModalShow(false)}
              id={news.id}
            />
          </h5>
          <div className="card-body">
            <p className="card-text">{news.article}</p>
            <a href="index.html" className="btn btn-outline-primary btn-sm">Комментировать</a>
          </div>
          <div className="card-footer text-muted d-flex justify-content-between align-items-center">
            {news.createdAt}
            <span className="position-relative">
              <Heart className="fs-4" role="button" />
              <Badge bg="secondary" className="position-absolute top-0 start-100 translate-middle">9</Badge>
              <span className="visually-hidden">Лайки</span>
            </span>
            <span className="position-relative">
              <ChatDots className="fs-4" role="button" />
              <Badge bg="secondary" className="position-absolute top-0 start-100 translate-middle">9</Badge>
              <span className="visually-hidden">Комментарии</span>
            </span>
          </div>
        </div>
      ))
    );
};

export default News;
