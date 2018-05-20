export const typeDefs = [
  `
    input UserInput {
      email: String
      password: String
    }
    type Comment {
      _id: String
      text: String
      author_id: String
    }
    type User {
      _id: String
      email: String
      password: String
    }
    input ArticleInput {
      title: String
      created: String
      author_id: String
      slug: String
      blocks: [BlockInput]
    }
    type Block {
      _id: String
      type: String
      content: String
    }
    input BlockInput {
      _id: String
      type: String
      content: String
    }
    type Article {
      _id: String
      slug: String
      title: String
      created: String
      author_id: String
      blocks: [Block]
    }
    type Query {
      retrieveUser(_id: String): User
      retrieveAllUsers: [User]
      retrieveArticle(slug: String): Article
      retrieveAllArticles: [Article]
    }
    type Mutation {
      createUser(_id: String, input: UserInput): User
      updateUser(_id: String, input: UserInput): User
      deleteUser(_id: String): Boolean
      deleteAllUsers: Boolean
      createArticle(_id: String, input: ArticleInput): Article
      updateArticle(_id: String, input: ArticleInput): Article
      deleteArticle(_id: String): Boolean
      deleteAllArticles: Boolean
    }
    schema {
      query: Query
      mutation: Mutation
    }
  `
];
