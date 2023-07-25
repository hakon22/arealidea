import { Provider } from 'react-redux';
import { useMemo, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import store from '../slices/index.js';
import Articles from './Articles.jsx';
import News from './News.jsx';
import { actions } from '../slices/articlesSlice.js';
import ApiContext from './Context.jsx';

const App = () => {
  const socket = io();
  const socketConnect = useCallback((param, arg) => {
    socket.emit(param, arg);
  }, [socket]);
  const socketApi = useMemo(() => ({
    addLike: (like) => socketConnect('addLike', like),
    removeLike: (like) => socketConnect('removeLike', like),
    addArticle: (article) => socketConnect('addArticle', article),
    removeArticle: (article) => socketConnect('removeArticle', article),
  }), [socketConnect]);

  socket.on('addLike', (data) => store.dispatch(actions.addLike(data)));
  socket.on('removeLike', (data) => store.dispatch(actions.removeLike(data)));
  socket.on('addArticle', (data) => store.dispatch(actions.addArticle(data)));
  socket.on('removeArticle', (data) => store.dispatch(actions.removeArticle(data)));
  return (
    <Provider store={store}>
      <ApiContext.Provider value={socketApi}>
        <ToastContainer />
        <div className="container">
          <div className="row d-flex justify-content-center">
            <Articles />
            <div className="col-md-8">
              <News />
            </div>
          </div>
        </div>
      </ApiContext.Provider>
    </Provider>
  );
};

export default App;
