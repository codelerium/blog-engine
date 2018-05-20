export const resolvers = (User, Article) => ({
  Query: {
    retrieveUser: async (root, {_id}) => (await User.findOne({ _id })),
    retrieveAllUsers: async () => (await User.find({}).toArray()),
    retrieveArticle: async (root, {slug}) => (await Article.findOne({ slug })),
    retrieveAllArticles: async () => (await Article.find({}).toArray()),
  },
  Mutation: {
    createUser: async (root, {_id, input}) => {
			await User.insert({ _id, ...input});
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
  },
});
