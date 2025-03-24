import { allClusterList } from "./allClusters";
import { createCluster } from "./createClusters";
import { createUeo } from "./createUeo";

const { MongoClient } = require("mongodb");

const uri = process.env.DB_URI;

const dbName = `${process.env.DB_NAME}`;
let client;

async function connect() {
  try {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect(); // Wait for the connection to be established
    console.log("connected to database");

    const db = client.db(dbName);
    // create admin and cluster
    createUeo(db);
    allClusterList?.map((cluster) => {
      createCluster(db, cluster.cluster_name, cluster.schools);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default async function getDb() {
  if (!client) {
    await connect();
  }
  return client.db(dbName);
}
