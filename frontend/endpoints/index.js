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
        query: `{
          login(email: "${email}", password: "${password}")
        }`
      })
    };
    const res = await fetch(
      API_ENDPOINT,
      OPTIONS,
    ).then(res => res.json());

    console.log({ res });

    const result = res.data.login;
    if (result === 'Unauthorized') {
      return { success: false, error: result };
    } else {
      return { success: true, token: result };
    }
  },
  RETRIEVE_COMMENTER: async (options) => {
    const { commenterId } = options;
    const OPTIONS = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        query: `
          {
            retrieveCommenter(_id: "${commenterId}") {
              _id
              email
              name
              avatar
            }
          }
        `
      })
    };
    const res = await fetch(
      API_ENDPOINT,
      OPTIONS,
    ).then(res => res.json());
    return res.data.retrieveCommenter;
  },
  RETRIEVE_COMMENTS_BY_ARTICLE: async (options) => {
    const { articleId } = options;
    const OPTIONS = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        query: `
          {
            retrieveCommentsByArticle(articleId: "${articleId}") {
              _id
              content
              timestamp
              likes
              commenter {
                _id
                email
                name
                avatar
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
    return res.data.retrieveCommentsByArticle;
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
              thumbnail
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
              thumbnail
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
  RETRIEVE_RECOMMENDATIONS: async (options) => {
    const { currentId } = options;
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
              slug
              thumbnail
            }
          }
        `
      })
    };
    const res = await fetch(
      API_ENDPOINT,
      OPTIONS,
    ).then(res => res.json());
    return res.data.retrieveAllArticles.filter(i => i.slug !== currentId).splice(0, 2);
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
              thumbnail: "${""}"
            }) {
              _id,
              title,
              created,
              author_id,
              slug,
              thumbnail,
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
    const { title, id, slug, blocks, thumbnail } = options;
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
              thumbnail: "${thumbnail}"
              blocks: [${(blocks || []).map(block => 
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
              thumbnail,
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
  VERIFY_EMAIL: async (options) => {
    const { email, hash } = options;
    const OPTIONS = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        query: `
          mutation {
            verifyEmail(email: "${email}", hash: "${hash}")
          }
        `
      })
    };
    const res = await fetch(API_ENDPOINT, OPTIONS)
      .then(res => res.json())
      .catch(err => {
        return { success: false, error: err.message };
      });
    return { success: res.data.verifyEmail };
  },
  CREATE_COMMENT: async (options) => {
    const { text, id, commenter, articleId } = options;
    const OPTIONS = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        query: `
          mutation {
            createComment(_id: "${id}", input: {
              content: "${text}"
              articleId: "${articleId}"
              timestamp: "${new Date().toLocaleDateString()}"
              likes: ${0}
              commenter: {
                name: "${commenter.name}"
                email: "${commenter.email}"
                avatar: "${commenter.avatar}"
              }
            }) {
              _id,
              content,
              articleId,
              timestamp,
              likes,
              commenter {
                name,
                email,
                avatar,
              }
            }
          }
        `
      })
    };
    const res = await fetch(API_ENDPOINT, OPTIONS).then(res => res.json());
    return res.data.createComment;
  },
  CREATE_COMMENTER: async (options) => {
    const { profile } = options;
    const OPTIONS = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        query: `
          mutation {
            createCommenter(_id: "${profile.id}", input: {
              email: "${profile.email}"
              name: "${profile.name}"
              avatar: "${profile.picture.data.url}"
            }) {
              _id,
              email,
              name,
              avatar,
            }
          }
        `
      })
    };
    const res = await fetch(API_ENDPOINT, OPTIONS).then(res => res.json());
    return res.data.createCommenter;
  },
  LIKE_COMMENT: async (options) => {
    const { id } = options;
    const OPTIONS = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        query: `
          mutation {
            likeComment(_id: "${id}") {
              _id
              content
              timestamp
              likes
              commenter {
                _id
                email
                name
                avatar
              }
            }
          }
        `
      })
    };
    const res = await fetch(API_ENDPOINT, OPTIONS).then(res => res.json());
    return res.data.likeComment;
  }
};
