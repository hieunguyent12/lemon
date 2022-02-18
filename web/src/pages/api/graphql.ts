import { ApolloServer } from "apollo-server-micro";
import type { NextApiRequest, NextApiResponse } from "next";
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

const apolloServer = new ApolloServer({ typeDefs, resolvers });

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
