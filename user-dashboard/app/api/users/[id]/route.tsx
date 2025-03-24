
import { userDelete, userUpdate } from "@/services/db.service";
import { User } from "@/types/user.type";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: Request) {
    const { id, user_name, email } = await req.json()
    try {
      const update_user: User = { id, user_name, email, create_at: undefined };
        return userUpdate(update_user.id, update_user)
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


  
export async function DELETE(req: NextRequest, {params}:{params: Promise<{id: number}>}) {
    console.log(req.url)
    const id = (await params).id
    console.log("API ID="+id)
    try {
     return userDelete(id)
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