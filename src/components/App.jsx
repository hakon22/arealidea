import { Provider } from 'react-redux';
import store from '../slices/index.js';
import Articles from './Articles.jsx';
import News from './News.jsx';

const App = () => (
  <Provider store={store}>
    <Articles />
    <News />
  </Provider>
);

export default App;
