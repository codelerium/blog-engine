import fetch from 'isomorphic-fetch';
import { API_ENDPOINT } from '../config/dev';

export const API = {
  LOGIN: async (options) => {
    const { email, password } = options;
    const OPTIONS = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        query: `{ login(email: "${email}", password: "${password}") }`
      })
    };
    const res = await fetch(
      API_ENDPOINT,
      OPTIONS,
    ).then(res => res.json());
    const result = res.data.login;
    if (result === 'Unauthorized') {
      return { success: false, error: result };
    } else {
      return { success: true, token: result };
    }
  },
  RETRIEVE_ARTICLE: async (options) => {
    const { slug } = options;
    const OPTIONS = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        query: `
          {
            retrieveArticle(slug: "${slug}") {
              _id
              title
              created
              author_id
              slug
              blocks {
                _id
                type
                content
              }
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
              slug
              blocks {
                _id
                type
                content
              }
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
    const { title, created, slug, authorId, id } = options;
    const OPTIONS = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('c_token')}`,
      },
      method: 'POST',
      body: JSON.stringify({
        query: `
          mutation {
            createArticle(_id: "${id}", input: {
              title: "${title}"
              created: "${created}"
              author_id: "${authorId}"
              slug: "${slug}"
            }) {
              _id,
              title,
              created,
              author_id,
              slug,
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
  UPDATE_ARTICLE: async (options) => {
    const { title, created, authorId, id, slug, blocks } = options;
    const OPTIONS = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('c_token')}`,
      },
      method: 'POST',
      body: JSON.stringify({
        query: `
          mutation {
            updateArticle(_id: "${id}", input: {
              title: "${title}",
              slug: "${slug}",
              blocks: [${blocks.map(block => 
                (
                  `{
                    _id: "${block._id}", 
                    type: "${block.type}", 
                    content: """${block.content}"""
                  }`
                )
              )}],
            }) {
              title, 
              _id, 
              author_id, 
              created,
              slug,
            }
          }
        `
      })
    };
    const res = await fetch(
      API_ENDPOINT,
      OPTIONS,
    ).then(res => res.json());
    return res.data.updateArticle;
  },
  DELETE_ARTICLE: async (options) => {
    const { id } = options;
    const OPTIONS = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('c_token')}`,
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
  },
  SUBSCRIBE: async (options) => {
    const { email, id } = options;
    const OPTIONS = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('c_token')}`,
      },
      method: 'POST',
      body: JSON.stringify({
        query: `
          mutation {
            subscribe(_id: "${id}", input: {
              email: "${email}"
            }) {
              _id,
              email,
            }
          }
        `
      })
    };
    const res = await fetch(API_ENDPOINT, OPTIONS)
      .then(res => res.json())
      .catch(err => {
        return { success: false, error: err.message };
      });
    return res.data.subscribe;
  },
};
