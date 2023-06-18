import { Provider } from 'react-redux';
import store from '../slices/index.js';
import Articles from './Articles.jsx';

const App = () => (
  <Provider store={store}>
    <Articles />
  </Provider>
);

export default App;
