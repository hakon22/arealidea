import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from '../slices/index.js';
import Articles from './Articles.jsx';
import News from './News.jsx';

const App = () => (
  <Provider store={store}>
    <ToastContainer />
    <div className="container">
      <div className="row d-flex justify-content-center">
        <Articles />
        <div className="col-md-8">
          <News />
        </div>
      </div>
    </div>
  </Provider>
);

export default App;
