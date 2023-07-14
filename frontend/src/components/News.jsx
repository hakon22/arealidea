import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { Bucket } from 'react-bootstrap-icons';
import { fetchLoading } from '../slices/articlesSlice.js';
import { ModalDelete } from './ModalForm.jsx';

const News = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    dispatch(fetchLoading());
  }, [dispatch]);

  const { loadingStatus, entities } = useSelector((state) => state.articles);

  return loadingStatus !== 'finish'
    ? (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" role="status" />
      </div>
    )
    : (
      entities.map((news) => (
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
          <div className="card-footer text-muted">
            {news.createdAt}
          </div>
        </div>
      ))
    );
};

export default News;
