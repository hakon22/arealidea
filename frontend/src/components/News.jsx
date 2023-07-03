import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { fetchLoading } from '../slices/articlesSlice.js';

const News = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoading());
  }, [dispatch]);

  const { loadingStatus, entities } = useSelector((state) => state.articles);

  return loadingStatus !== 'finish'
    ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" role="status" />
      </div>
    )
    : (
      entities.map((news) => (
        <div key={news.id} className="card">
          <h5 className="card-header">{news.title}</h5>
          <div className="card-body">
            <p className="card-text">{news.article}</p>
            <a href="index.html" className="btn btn-primary">Перейти куда-нибудь</a>
          </div>
          <div className="card-footer text-muted">
            {news.createdAt}
          </div>
        </div>
      ))
    );
};

export default News;
