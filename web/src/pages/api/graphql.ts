import { ApolloServer } from "apollo-server-micro";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import resolvers from "../../graphql/resolvers";
// @ts-ignore
import typeDefs from "../../graphql/schema.graphql";
import initCORS from "../../utils/cors";

/*
  ******** THIS API IS JUST TEMPORARY *********
  In the the future, we will have a separate server to handle graphql requests
*/
const ALLOWED_ORIGINS = [
  "https://studio.apollographql.com",
  "http://localhost:3000",
];

const cors = initCORS({
  origins: ALLOWED_ORIGINS,
});

const jwt_secret = process.env.JWT_SECRET;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const user = await getToken({ req, secret: jwt_secret });
    return {
      user,
    };
  },
});

const startServer = apolloServer.start();

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export default cors(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
