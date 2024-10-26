import { Company } from "@/../interfaces";
import { getCachedCompany } from "@/lib/api/cachedCalls";
import clientPromise from "@/lib/integeration/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//Watchlist route

export const GET = async (request: Request) => {
  try {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: 'Not logged in: Unauthorized' },
        { status: 401 }
      );
    }
    const client = await clientPromise;
    const db = client.db('database');
    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found: Unauthorized' },
        { status: 401 }
      );
    }

    const collection = db.collection('userFavourites');
    const result = await collection.find({ userId: user._id }).toArray();
    if (!result) {
      return NextResponse.json({ error: 'Failed to fetch watchlist' }, { status: 500 });
    }
    
    const companies: Company[] = [];

    await Promise.allSettled(result.map(async (item) => {
      try {
        const company = await getCachedCompany(item.stockId, db.collection('stocks')) as Company;
        
      companies.push(company);
      } catch (error) {
        console.log(error);
      }
    }));
    

    
    return NextResponse.json({ watchlist: companies });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

export const POST = async (request: Request) => {
  try {
    const session = await getServerSession();
    console.log(session);
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: 'Not logged in: Unauthorized' },
        { status: 401 }
      );
    }
    const client = await clientPromise; 
    const db = client.db('database');
    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found: Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await request.json();
    const collection = db.collection('userFavourites');
    const existing = await collection.findOne({ userId: user._id, stockId: id });
    if (existing) {
      return NextResponse.json({ error: 'Already in watchlist' }, { status: 400 });
    }
    const result = await collection.insertOne({ userId: user._id, stockId: id });
    if (result.insertedId) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Failed to add to watchlist' }, { status: 500 });

  }
   catch (error) {
    console.log(error);
    return NextResponse.error();
   }
  
}

export const DELETE = async (request: Request) => {
  try {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: 'Not logged in: Unauthorized' },
        { status: 401 }
      );
    }
    const client = await clientPromise;
    const db = client.db('database');
    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found: Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await request.json();
    const collection = db.collection('userFavourites');
    const result = await collection.deleteOne({ userId: user._id, stockId: id });
    if (result.deletedCount) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Failed to remove from watchlist' }, { status: 500 });

  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

