import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import store from '../slices/index.js';
import Articles from './Articles.jsx';
import News from './News.jsx';
import { actions } from '../slices/articlesSlice.js';
import ApiContext from './Context.jsx';

const App = () => {
  const socket = io();
  const socketConnect = (param, arg) => socket.emit(param, arg);
  const socketApi = {
    addLike: (like) => socketConnect('addLike', like),
    removeLike: (like) => socketConnect('removeLike', like),
  };
  socket.on('addLike', (data) => store.dispatch(actions.addLike(data)));
  socket.on('removeLike', (data) => store.dispatch(actions.removeLike(data)));
  return (
    <Provider store={store}>
      <ToastContainer />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <ApiContext.Provider value={socketApi}>
            <Articles />
            <div className="col-md-8">
              <News socketApi={socketApi} />
            </div>
          </ApiContext.Provider>
        </div>
      </div>
    </Provider>
  );
};

export default App;
