import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME;

if (!uri) {
  throw new Error("Missing DB_URI environment variable. Check your .env.local file.");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const dbConnect = (collectionName) => {
  return client.db(dbName).collection(collectionName);
};