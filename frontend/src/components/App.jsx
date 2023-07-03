import { Provider } from 'react-redux';
import store from '../slices/index.js';
import Articles from './Articles.jsx';
import News from './News.jsx';

const App = () => (
  <Provider store={store}>
    <div className="container">
      <div className="row">
        <div className="col d-flex justify-content-center">
          <Articles />
          <News />
        </div>
      </div>
    </div>
  </Provider>
);

export default App;
