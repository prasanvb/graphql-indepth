import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloExpressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import { readFile } from 'node:fs/promises';
import { authMiddleware, handleLogin } from './lib/auth.js';
import { resolvers } from './lib/resolver.js';

const PORT = 9000;

const createApp = async () => {
  const app = express();
  // NOTE: authMiddleware uses express-jwt for validation the JWTs
  app.use(cors(), express.json(), authMiddleware);

  app.post('/login', handleLogin);

  // NOTE: The express-jwt decoded JWT payload is available on the request via the `auth` property.
  const getContext = ({ req }) => {
    return { auth: req.auth };
  };

  const typeDefs = await readFile('./graphql/schema.graphql', 'utf-8');
  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  // NOTE: apolloExpressMiddleware accepts `context` as optional parameter and context has access to `req` and `res` object
  await apolloServer.start();
  app.use(
    '/graphql',
    apolloExpressMiddleware(apolloServer, { context: getContext }),
  );

  app.listen({ port: PORT }, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
};

createApp();
