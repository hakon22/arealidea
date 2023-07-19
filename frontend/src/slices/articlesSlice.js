import axios from 'axios';
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.js';

export const fetchLoading = createAsyncThunk(
  'articles/fetchLoading',
  async () => {
    const res = await axios.get(routes.all);
    return res.data;
  },
);

const articlesAdapter = createEntityAdapter({});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: articlesAdapter.getInitialState({
    loadingStatus: 'idle', error: null,
  }),
  reducers: {
    addArticle: articlesAdapter.addOne,
    addLike: (state, { payload }) => {
      state.entities[payload].likes += 1;
    },
    removeLike: (state, { payload }) => {
      state.entities[payload].likes -= 1;
    },
    removeArticle: articlesAdapter.removeOne,
    renameChannel: (state, { payload }) => {
      const channel = state.channels.find((c) => c.id === payload.id);
      channel.name = payload.name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoading.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchLoading.fulfilled, (state, { payload }) => {
        articlesAdapter.addMany(state, payload);
        state.loadingStatus = 'finish';
        state.error = null;
      })
      .addCase(fetchLoading.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectors = articlesAdapter.getSelectors((state) => state.articles);
export const { actions } = articlesSlice;
export default articlesSlice.reducer;
