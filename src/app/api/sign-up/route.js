// pages/api/users.js

import getDb from "@/lib/db";

export default async function handler(req, res) {

    if (req.method !== 'GET') {
        return res.status(4052).json({ error: 'Method Not Allowed' });
    }

    try {
        const db = await getDb();
        // const users = await db.collection("users").find();
        const user = await db.collection('users').findOne({ name: "noman" });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }

}