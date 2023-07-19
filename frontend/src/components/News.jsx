import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Badge } from 'react-bootstrap';
import { Bucket, ChatDots, Heart } from 'react-bootstrap-icons';
import axios from 'axios';
import cn from 'classnames';
import { actions, fetchLoading, selectors } from '../slices/articlesSlice.js';
import { ModalDelete } from './ModalForm.jsx';
import routes from '../routes.js';

const News = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    dispatch(fetchLoading());
  }, [dispatch]);

  const { loadingStatus } = useSelector((state) => state.articles);
  const articles = useSelector(selectors.selectAll);

  const addLike = async (id) => {
    const isLike = localStorage.getItem(`news_${id}`);
    if (isLike) {
      await axios.get(`${routes.removeLike}${id}`);
      dispatch(actions.removeLike(id));
      localStorage.removeItem(`news_${id}`);
    } else {
      await axios.get(`${routes.addLike}${id}`);
      dispatch(actions.addLike(id));
      window.localStorage.setItem(`news_${id}`, 'like');
    }
  };

  return loadingStatus !== 'finish'
    ? (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" role="status" />
      </div>
    )
    : (
      articles.sort((news) => news.id).map((news) => {
        const isLike = localStorage.getItem(`news_${news.id}`);
        return (
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
              <span role="button" className="position-relative" onClick={() => addLike(news.id)} onKeyPress={() => addLike(news.id)} tabIndex={0}>
                <Heart className={cn('fs-4', {
                  'text-danger': isLike,
                  animate__heartBeat: isLike,
                })}
                />
                <Badge
                  bg={cn({
                    secondary: !isLike,
                    danger: isLike,
                  })}
                  className={cn(
                    'position-absolute top-0 start-100 translate-middle',
                    { transition: isLike },
                  )}
                >
                  {news.likes}
                </Badge>
                <span className="visually-hidden">Лайки</span>
              </span>
              <span role="button" className="position-relative">
                <ChatDots className="fs-4" />
                <Badge bg="secondary" className="position-absolute top-0 start-100 translate-middle">{news.comments}</Badge>
                <span className="visually-hidden">Комментарии</span>
              </span>
            </div>
          </div>
        );
      })
    );
};

export default News;
