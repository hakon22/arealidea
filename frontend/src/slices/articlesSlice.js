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
  initialState: {
    loadingStatus: 'idle', error: null, ids: [], entities: {},
  },
  reducers: {
    addArticle: articlesAdapter.addOne,
    changeChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
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
        state.entities = payload;
        state.ids = payload.map((value) => value.id);
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
