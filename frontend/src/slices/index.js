import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './articlesSlice.js';

export default configureStore({
  reducer: {
    articles: articlesReducer,
  },
});
