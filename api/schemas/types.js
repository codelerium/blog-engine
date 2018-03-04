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
      paragraphs: [String]
    }
    type Article {
      _id: String
      title: String
      created: String
      author_id: String
      paragraphs: [String]
    }
    type Query {
      retrieveUser(_id: String): User
      retrieveAllUsers: [User]
      retrieveArticle(_id: String): Article
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
