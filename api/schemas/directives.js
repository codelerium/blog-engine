import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server';

export default class RequireAuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        const { role } = this.args;
        console.log(role);
        field.resolve = async function(...args) {
            const [, , ctx] = args;
            if (ctx.req && ctx.req.user) {
                if (role && (!ctx.req.user.role || !ctx.req.user.role.includes(role))) {
                    throw new AuthenticationError(
                        "You are not authorized to view this resource."
                    );
                } else {
                    const result = await resolve.apply(this, args);
                    return result;
                }
            } else {
                throw new AuthenticationError(
                    "You must be signed in to view this resource."
                );
            }
        };
    }
}
