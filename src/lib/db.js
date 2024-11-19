import { MongoClient, ServerApiVersion } from "mongodb";

let client;
let clientPromise;

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
};

if (!global._mongoClientPromise) {
  client = new MongoClient(process.env.DB_URI, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function getDatabase() {
  if (!clientPromise) {
    clientPromise = client.connect();
  }
  const client = await clientPromise;
  return client.db("mind-flow");
}
