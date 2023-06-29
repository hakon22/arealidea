/* eslint-disable import/no-anonymous-default-export */
const apiPath = '/api';

export default {
  add: [apiPath, 'article-add'].join('/'),
  all: [apiPath, 'article-all'].join('/'),
  delete: [apiPath, 'article-delete/:id'].join('/'),
};
