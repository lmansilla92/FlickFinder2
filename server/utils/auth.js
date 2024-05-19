// Import the GraphQLError class from the 'graphql' package
const { GraphQLError } = require('graphql');
// Import the 'jsonwebtoken' package for working with JWT tokens
const jwt = require('jsonwebtoken');

// Define the secret key used for signing JWT tokens
const secret = 'mysecretssshhhhhhh';
// Define the expiration time for JWT tokens
const expiration = '2h';

// Export an instance of GraphQLError as AuthenticationError with specific extensions
module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  // Middleware function for authentication
  authMiddleware: function ({ req }) {
    // Extract the token from the request body, query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // Split the token string if it exists in the headers
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // If no token is found, return the request object
    if (!token) {
      return req;
    }

    try {
      // Verify the token and extract data from it
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // Attach the extracted user data to the request object
      req.user = data;
    } catch {
      // Log an error message if the token is invalid
      console.log('Invalid token');
    }

    // Return the modified request object
    return req;
  },
  // Function to generate a JWT token
  signToken: function ({ email, username, _id }) {
    // Define the payload for the token which is the data the token will contain
    const payload = { email, username, _id };

    // Sign the token with the payload, secret key, and expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};