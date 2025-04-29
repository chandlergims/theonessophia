import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Initial candidates to ensure we always have 4 candidates
const initialCandidates = [
  {
    id: '1',
    name: 'Donald J. Trump',
    description: 'President of the United States',
    votes: 0,
    imageUrl: '/45_donald_trump_w-1250.jpg'
  },
  {
    id: '2',
    name: 'Joe Biden',
    description: 'President of the United States',
    votes: 0,
    imageUrl: '/Joe_Biden_presidential_portrait.jpg'
  },
  {
    id: '3',
    name: 'Elon Musk',
    description: 'CEO of Tesla, SpaceX, and X',
    votes: 0,
    imageUrl: '/images (23).jpg'
  },
  {
    id: '4',
    name: 'Vitalik Buterin',
    description: 'Ethereum Founder',
    votes: 0,
    imageUrl: '/images (24).jpg'
  }
];

export async function POST(request: Request) {
  try {
    const { name, description, imageUrl } = await request.json();
    
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('regenesis');
    
    // Create a new candidate
    const result = await db.collection('candidates').insertOne({
      name,
      description: description || '',
      imageUrl: imageUrl || '',
      votes: 0,
      createdAt: new Date()
    });
    
    return NextResponse.json({ 
      success: true, 
      candidateId: result.insertedId 
    });
  } catch (error) {
    console.error('Error creating candidate:', error);
    return NextResponse.json({ error: 'Failed to create candidate' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('regenesis');
    
    // Get all candidates from the database
    const dbCandidates = await db.collection('candidates').find({}).toArray();
    
    // If we have less than 4 candidates in the database, add our initial candidates
    if (dbCandidates.length < 4) {
      // Check which initial candidates are missing
      const existingIds = new Set(
        dbCandidates
          .filter(c => c.id && c.id.length <= 5)
          .map(c => c.id)
      );
      
      const missingCandidates = initialCandidates.filter(c => !existingIds.has(c.id));
      
      // Add missing candidates to the database
      if (missingCandidates.length > 0) {
        await db.collection('candidates').insertMany(
          missingCandidates.map(c => ({
            ...c,
            createdAt: new Date()
          }))
        );
        
        // Get the updated list of candidates
        const updatedCandidates = await db.collection('candidates').find({}).toArray();
        return NextResponse.json(updatedCandidates);
      }
    }
    
    return NextResponse.json(dbCandidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return NextResponse.json({ error: 'Failed to fetch candidates' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Candidate ID is required' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db('regenesis');
    
    // Delete the candidate
    let query = {};
    
    // Handle both string IDs (for our initial candidates) and MongoDB ObjectIds
    if (id.length === 24) {
      try {
        query = { _id: new ObjectId(id) };
      } catch (e) {
        query = { id };
      }
    } else {
      query = { id };
    }
    
    const result = await db.collection('candidates').deleteOne(query);
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    return NextResponse.json({ error: 'Failed to delete candidate' }, { status: 500 });
  }
}
