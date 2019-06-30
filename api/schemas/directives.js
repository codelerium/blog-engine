const { SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const env = require('dotenv');

const config = env.config();

class RequireAuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function(...args) {
            const [, , ctx] = args;
            const token = ctx.Authorization.split(' ')[1];

            if (token !== 'null') {
                const valid = jwt.verify(token, config.parsed.SECRET);
                if (!valid) {
                    throw new AuthenticationError('Unauthorized');
                } else {
                    const result = await resolve.apply(this, args);
                    return result;
                }
            } else {
                throw new AuthenticationError('Unauthorized');
            }
        };
    }
}

module.exports = {
    RequireAuthDirective,
}