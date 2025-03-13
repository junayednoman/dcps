import { hash } from "bcrypt";
export async function createUeo(db) {
  const usersCollection = db.collection("users");

  // Check if an admin user already exists
  const existingUeo = await usersCollection.findOne({ role: "ueo" });

  if (existingUeo) {
    console.log("Admin already exists.");
    return;
  }

  // Define the admin user
  const hashedPassword = await hash("ueo", 10); // Use a default password for now
  const adminUser = {
    unique_id: "ueo", // Set a default email
    password: hashedPassword,
    role: "ueo", // You can adjust the roles as needed
    createdAt: new Date(),
  };

  // Insert the admin user into the collection
  await usersCollection.insertOne(adminUser);
  console.log("Admin created successfully!");
}
