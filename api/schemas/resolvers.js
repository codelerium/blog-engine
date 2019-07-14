const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
const Guid = require('guid');
const base64 = require('base-64');
const { sendEmail } = require('../helpers/email');

module.exports = {
  resolvers: (User, Article, Subscriber, Commenter, Comment) => ({
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
        return await Article.findOne({ slug });
      },
      retrieveAllArticles: async (root, { published }) => {
        console.log({ published });
        let articles;
        if (published) {
          articles = await Article.find({ published: true }).toArray();
        } else {
          articles = await Article.find({}).toArray();
        }
        return articles;
      },
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
        const updated = Object.entries(input).reduce((res, [field, value]) => {
          res = { ...res, [field]: value };
          return res;
        }, {});
        await Article.findOneAndUpdate(
          {_id},
          { $set: updated }
        );
        return await Article.findOne({ _id });
      },
      deleteArticle: async (root, {_id}) => {
        const resp = await Article.deleteOne({ _id });
        return !!resp.result.ok;
      },
      deleteAllArticles: async () => (await Article.remove({})),
      subscribe: async (root, {_id, input}) => {
        const found = await Subscriber.findOne({ email: input.email });
        if (found) {
          return false;
        }
        const validationHash = Guid.raw();
        await Subscriber.insert({
          _id,
          email: input.email,
          validated: false,
          hash: validationHash,
        });
        const encoded = base64.encode(`${input.email}:${validationHash}`);
        await sendEmail({
          to: input.email,
          link: `https://codelirium.io/verify/${encoded}?`,
        });
        return await Subscriber.findOne({ _id });
      },
      verifyEmail: async (root, { email, hash }) => {
        const found = await Subscriber.findOne({ email });
        console.log(found, found.validated, hash)
        if (found && found.validated) {
          return true;
        }
        if (found.hash && found.hash === hash) {
          console.log('HERE')
          await Subscriber.findOneAndUpdate({ email }, {
            $set: { validated: true }
          })
          return true;
        }
        return false;
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
      likeComment: async (root, { _id}) => {
        const comment = await Comment.findOne({ _id });
        await Comment.update({ _id }, { $set: { likes: comment.likes + 1 }});
        return await Comment.findOne({ _id });
      }
    },
  }),
};
