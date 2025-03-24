export async function createCluster(db, cluster_name, schools) {
  const clustersCollection = db.collection("clusters");
  // Check if an cluster user already exists
  const existingCluster = await clustersCollection.findOne({ cluster_name });
  if (existingCluster) {
    return;
  }
  const clusterData = {
    cluster_name,
    schools,
  };
  await clustersCollection.insertOne(clusterData);
}