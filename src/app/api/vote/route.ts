import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request: Request) {
  try {
    const { candidateId } = await request.json();
    
    if (!candidateId) {
      return NextResponse.json({ error: 'Candidate ID is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('regenesis');
    
    // Check if the candidate exists
    let query = {};
    
    // Handle both string IDs (for our initial candidates) and MongoDB ObjectIds
    if (candidateId.length === 24) {
      try {
        query = { _id: new ObjectId(candidateId) };
      } catch (e) {
        query = { id: candidateId };
      }
    } else {
      query = { id: candidateId };
    }
    
    // Update vote count for the candidate
    const result = await db.collection('candidates').updateOne(
      query,
      { $inc: { votes: 1 } },
      { upsert: false }
    );
    
    if (result.matchedCount === 0) {
      // If no candidate was found with the ObjectId, try to find by string ID
      // This is for our initial candidates that might not be in the database yet
      if (candidateId.length <= 5) {
        // For our initial test candidates, create them if they don't exist
        const initialCandidate = {
          id: candidateId,
          name: `Candidate ${candidateId}`,
          description: `Description for Candidate ${candidateId}`,
          votes: 1,
          createdAt: new Date()
        };
        
        await db.collection('candidates').insertOne(initialCandidate);
        return NextResponse.json({ success: true });
      }
      
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error voting for candidate:', error);
    return NextResponse.json({ error: 'Failed to vote' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('regenesis');
    
    // Get all candidates with their vote counts
    const candidates = await db.collection('candidates').find({}).sort({ votes: -1 }).toArray();
    
    return NextResponse.json(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return NextResponse.json({ error: 'Failed to fetch candidates' }, { status: 500 });
  }
}
