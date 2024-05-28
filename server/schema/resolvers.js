// import signToken, AuthentificationError and User model.
const { signToken, AuthenticationError } = require('../utils/auth');
const { User } = require('../models');
const { Movie } = require('../models');

// Queries and Mutations that we can use in graphql(apollo sandbox).
// Where we tell GraphQL HOW to get back the data
const resolvers = {

    // Queries
    Query: {
        // A query to get all users.
        users: async () => await User.find(),
        user: async (parent, args, context) => {
            const username = context.user._id;
            console.log('username: ', username);
            if (context.user) {
                const userData = await User.findOne({ username: username }).select('-__v -password');
              return userData;
            }
            throw new AuthenticationError('User not authenticated');
          },
    },

    // Mutations
    Mutation: {
        // mutation to add a user
        addUser: async (parent, args) => {
            const user = await User.create(args);

            //assign JWT token to user created
            const token = signToken(user);

            // send back user with the token to the front end
            return { token, user };
        },

        // mutation for a user login
        login: async (parent, { username, password}) => {
            // find user by their email
            const user = await User.findOne({ username });

            // error if no user is found 
            if (!user) {
                throw AuthenticationError
            }

            // check the user's password
            const correctPw = await user.isCorrectPassword(password);

            // If the password is incorrect, throw error
            if (!correctPw) {
                throw AuthenticationError
            }

            // if password is correct, return a user and their token to front end
            const token = signToken(user);
            return { user, token };
        },
        // TODO FINISH LOGOUT FUNCTIONALITY
        logout: (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('User is not authenticated');
            }
        }
    }
}

module.exports = resolvers;