import { hash } from "bcrypt";
export async function createUeo(db) {
  const usersCollection = db.collection("users");

  // Check if an admin user already exists
  const existingUeo = await usersCollection.findOne({ role: "ueo" });

  if (existingUeo) {
    return;
  }

  // Define the admin user
  const hashedPassword = await hash("ueo", 10); // Use a default password for now
  const adminUser = {
    unique_id: "ueo", // Set a default email
    password: hashedPassword,
    user_name: "ueo",
    role: "ueo", // You can adjust the roles as needed
    createdAt: new Date(),
  };

  await usersCollection.insertOne(adminUser);
}
