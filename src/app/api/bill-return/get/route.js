import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import decodeJwt from "@/lib/handleLogout";
import getDb from '@/lib/db';

export async function POST(req, res) {
    try {
        if (!req.method === 'POST') {
            return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
        }

        const token = cookies().get("authToken").value;
        const tokenExp = decodeJwt(token)?.exp;
        const currentTime = Math.floor(Date.now() / 1000);
        const isExpired = tokenExp < currentTime;

        // verify token
        if (!token || isExpired) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        const db = await getDb();
        // uniqueId from the client side
        const uniqueId = await req.json();

        const result = await db.collection("bills").findOne({ unique_id: uniqueId });

        if (result.unique_id !== uniqueId) {
            return NextResponse.json({ message: 'Failed to fetch' }, { status: 500 })
        }

        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Server Error' }, { status: 500 })
    }
}