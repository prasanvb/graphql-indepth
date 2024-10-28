import { GraphQLError } from 'graphql';

export const toISOdate = (UTCTimeStamp) => {
  return UTCTimeStamp.slice(0, 'yyyy-mm-dd'.length);
};

export const notFoundError = (message) => {
  return new GraphQLError(message, {
    extensions: { code: 'NOT_FOUND' },
  });
};

export const internalServerError = (message) => {
  return new GraphQLError(message, {
    extensions: { code: 'SERVER_ERROR' },
  });
};
