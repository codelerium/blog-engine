import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from 'dotenv';

export const resolvers = (User, Article, Subscriber, Commenter, Comment) => ({
  Query: {
    /* retrieveUser: async (root, {_id}) => (await User.findOne({ _id })),
    retrieveAllUsers: async () => (await User.find({}).toArray()), */
    login: async (root, { email, password }) => {
      const user = await User.findOne({ email });
      const valid = await bcrypt.compare(password, user.password);
      const config = env.config();
      if (valid) {
        return jwt.sign({ email }, config.parsed.SECRET);
      } else {
        return 'Unauthorized';
      }
    },
    retrieveArticle: async (root, { slug }) => {
      console.log('SLUG', slug)
      return await Article.findOne({ slug })
    },
    retrieveAllArticles: async () => (await Article.find({}).toArray()),
    retrieveCommenter: async (root, { _id }) => (await Commenter.findOne({ _id })),
    retrieveCommentsByArticle: async (root, { articleId }) => (
      await Comment.find({ articleId }).toArray()
    ),
  },
  Mutation: {
    createUser: async (root, {_id, input}) => {
      const hashedPassword = await bcrypt.hash(input.password, 10);
			await User.insert({ 
        _id,
        email: input.email,
        password: hashedPassword,
      });
			return await User.findOne({ _id });
    },
		updateUser: async (root, {_id, input}) => {
			await User.findOneAndUpdate(
				{_id},
				Object.entries(input).reduce((res, [field, value]) => {
					res = { ...res, $set: { [field]: value }};
					return res;
				}, {})
			);
			return await User.findOne({ _id });
		},
		deleteUser: async (root, {_id}) => (await User.remove({ _id })),
		deleteAllUsers: async () => (await User.remove({})),
    createArticle: async (root, {_id, input}) => {
      await Article.insert({ _id, ...input});
      return await Article.findOne({ _id });
    },
    updateArticle: async (root, {_id, input}) => {
      await Article.findOneAndUpdate(
        {_id},
        Object.entries(input).reduce((res, [field, value]) => {
          res = { ...res, $set: { [field]: value }};
          return res;
        }, {})
      );
      return await Article.findOne({ _id });
    },
    deleteArticle: async (root, {_id}) => (await Article.remove({ _id })),
    deleteAllArticles: async () => (await Article.remove({})),
    subscribe: async (root, {_id, input}) => {
      const found = await Subscriber.findOne({ email: input.email });
      if (found) {
        return false;
      }
      await Subscriber.insert({
        _id,
        email: input.email,
      });
			return await Subscriber.findOne({ _id });
    },
    unsubscribe: async (root, {_id}) => (await Subscriber.remove({ _id })),
    createComment: async (root, { _id, input }) => {
      await Comment.insert({
        _id,
        ...input,
      });
      return await Comment.findOne({ _id });
    },
    createCommenter: async (root, {_id, input}) => {
      const found = await Commenter.findOne({ _id });
      if (found) {
        return found;
      }
      await Commenter.insert({
        _id,
        ...input,
      });
      return await Commenter.findOne({ _id });
    },
  },
});
