import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './ArticlesSlice.js';

export default configureStore({
  reducer: {
    articles: articlesReducer,
  },
});
