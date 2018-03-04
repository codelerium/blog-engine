import fetch from 'isomorphic-fetch';
import { API_ENDPOINT } from '../config/dev';

export const API = {
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
    console.log('RES', res);
    return res.data.retrieveAllArticles;
  },
};
