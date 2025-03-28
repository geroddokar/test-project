import { NextRequest, NextResponse } from 'next/server'
import { getAllUsers, userCreate, deleteAllUser } from '@/services/db.service'
import { User } from '@/types/user.type';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const query = searchParams.get('search') || '';
    const pageStr = searchParams.get('page') || "0";
     const sort = searchParams.getAll('sort'); 
     const order = searchParams.getAll('order'); 
     const sorting = sort.map((field, index) => ({
       id: field,
       desc: order[index] === 'desc',
     }));
    const page = parseInt(pageStr, 10)
    console.log(sorting)
    return getAllUsers(page, query, sorting)
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message)

    const response = {
      error: (err as Error).message,

      returnedStatus: 200,
    }

    return NextResponse.json(response, { status: 200 })
  }
}

export async function POST(req: Request) {
  const { id, user_name, email, create_at } = await req.json();
  const update_user: User = { id, user_name, email, create_at: create_at};
  try {
    return userCreate(update_user)
  }

  catch (err ) {
    console.log('ERROR: API - ', (err as Error).message)
    console.log(err)
    const response = {
      error: (err as Error).message,

      returnedStatus: 200,
    }

    return NextResponse.json(response, { status: 200 })
  }
 
 
}




export async function DELETE(req: NextRequest) {
    try {
     return deleteAllUser()
    }
    catch (err) {
      console.log('ERROR: API - ', (err as Error).message)
  
      const response = {
        error: (err as Error).message,
  
        returnedStatus: 200,
      }
  
      return NextResponse.json(response, { status: 200 })
    }
  }