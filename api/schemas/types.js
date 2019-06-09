module.exports = {
  typeDefs: [
    `
      input UserInput {
        email: String
        password: String
      }
      input SubscriberInput {
        email: String
        validated: Boolean
        hash: String
      }
      input CommentInput {
        content: String
        articleId: String
        timestamp: String
        likes: Int
        commenter: CommenterInput
      }
      input CommenterInput {
        name: String
        email: String
        avatar: String
      }
      type Subscriber {
        _id: String
        email: String
        validated: Boolean
        hash: String
      }
      type Commenter {
        _id: String
        name: String
        email: String
        avatar: String
      }
      type Comment {
        _id: String
        content: String
        articleId: String
        timestamp: String
        likes: Int
        commenter: Commenter
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
        thumbnail: String
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
        thumbnail: String
        title: String
        created: String
        author_id: String
        blocks: [Block]
      }
      type Query {
        login(email: String, password: String): User
        retrieveArticle(slug: String): Article
        retrieveAllArticles: [Article]
        retrieveCommentsByArticle(articleId: String): [Comment]
        retrieveCommenter(_id: String): Commenter
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
        subscribe(_id: String, input: SubscriberInput): Subscriber
        verifyEmail(email: String, hash: String): Boolean
        unsubscribe(_id: String): Boolean
        createCommenter(_id: String, input: CommenterInput): Commenter
        createComment(_id: String, input: CommentInput): Comment
        likeComment(_id: String): Comment
      }
      schema {
        query: Query
        mutation: Mutation
      }
    `
  ],
};
