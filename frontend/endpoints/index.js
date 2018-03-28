import fetch from 'isomorphic-fetch';
import { API_ENDPOINT } from '../config/dev';

export const API = {
  RETRIEVE_ARTICLE: async (options) => {
    const { id } = options;
    const OPTIONS = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        query: `
          {
            retrieveArticle(_id: "${id}") {
              _id
              title
              created
              author_id
            }
          }
        `
      })
    };
    const res = await fetch(
      API_ENDPOINT,
      OPTIONS,
    ).then(res => res.json());
    return res.data.retrieveArticle;
  },
  RETRIEVE_ALL_ARTICLES: async () => {
    const OPTIONS = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        query: `
          {
            retrieveAllArticles {
              _id
              title
              created
              author_id
            }
          }
        `
      })
    };
    const res = await fetch(
      API_ENDPOINT,
      OPTIONS,
    ).then(res => res.json());
    return res.data.retrieveAllArticles;
  },
  CREATE_ARTICLE: async (options) => {
    const { title, created, authorId, id } = options;
    const OPTIONS = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        query: `
          mutation {
            createArticle(_id: "${id}", input: {
              title: "${title}"
              created: "${created}"
              author_id: "${authorId}"
            }) {
              _id,
              title,
              created,
              author_id,
            }
          }
        `
      })
    };
    const res = await fetch(
      API_ENDPOINT,
      OPTIONS,
    ).then(res => res.json());
    return res.data.createArticle;
  },
  DELETE_ARTICLE: async (options) => {
    const { id } = options;
    const OPTIONS = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        query: `
          mutation {
            deleteArticle(_id: "${id}")
          }
        `
      })
    };
    const res = await fetch(
      API_ENDPOINT,
      OPTIONS,
    ).then(res => res.json());
    return { isSuccess: res.data.deleteArticle };
  }
};
