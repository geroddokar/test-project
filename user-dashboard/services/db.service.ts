import { GetDBSettings } from "@/lib/db";
import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'
import { User } from "@/types/user.type";
import { array } from "zod";

let connectionParams = GetDBSettings()

export const getAllUsers = async (page: number, search: string, sorting: { id: string; desc: boolean }[]) => {
      try {
            
            let getExpQuery = 'SELECT {S_S} FROM user_data.user'
            const connection = await mysql.createConnection(connectionParams)
            if (search) {
              getExpQuery = getExpQuery +` WHERE name LIKE '%${search}%' or email LIKE '%${search}%'`
            }
            const count_sql = getExpQuery.replace("{S_S}","COUNT(id) as count")
            const [result, fields] = await connection.query(count_sql, [])
            const rows = result as mysql.RowDataPacket[];
            let totalCount = rows[0].count;

            console.log(sorting);
            
            if (sorting.length > 0) {
              const orderBy = sorting
                .map(({ id, desc }) => `${id} ${desc ? 'DESC' : 'ASC'}`)
                .join(', ');
              getExpQuery += ` ORDER BY ${orderBy}`;
            }

            if (page) {
              const offset = page * 10
              getExpQuery = `${getExpQuery} LIMIT 10 OFFSET ${offset}`
            } else{
              getExpQuery = `${getExpQuery} LIMIT 10 OFFSET 0`
            }
            
            let values: any[] = []
            console.log("API SQL " + getExpQuery)
            getExpQuery = getExpQuery.replace("{S_S}","*")
            const [results] = await connection.execute(getExpQuery, values)
            connection.end()
            const data = {
              users: results,
              total: totalCount
            }
            return NextResponse.json(data)
      }
      catch (err ) {
        console.log('ERROR: API - ', (err as Error).message)
        console.log(err)
        const response = {
          error: (err as Error).message,
          users: [],
          total: 0,
          returnedStatus: 200,
        }
    
        return NextResponse.json(response, { status: 200 })
      }
}


export const userCreate = async (user: User) =>  {
  try {
    const connection = await mysql.createConnection(connectionParams)
    const [results] = await connection.execute('INSERT INTO user_data.user (user_name, email) VALUES (?, ?)', [user.user_name, user.email])
    connection.end()
    return NextResponse.json(results)
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

export const userDelete = async (id: number) =>  {
  try {
    const connection = await mysql.createConnection(connectionParams)
    const [results] = await connection.execute('DELETE FROM user_data.user WHERE id = ?', [id])
    connection.end()
    return NextResponse.json(results)
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


export const userUpdate = async (id:number, user: User) => {
  try {
    console.log(user)
    const connection = await mysql.createConnection(connectionParams)
    const results = await connection.execute('UPDATE user_data.user SET user_name = ?, email = ? WHERE id = ?', [user.user_name, user.email, id])
    connection.end()
    return NextResponse.json(results); 
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

export const createAllItems = async (users:User[]) => {

  try {
    const connection = await mysql.createConnection(connectionParams)
    const values = users.map(user => [user.user_name, user.email, user.create_at]); // Создаем массив массивов

    const query = `
      INSERT INTO user_data.user (user_name, email, create_at) 
      VALUES ${values.map(() => "(?, ?, ?)").join(", ")}
    `;
    
    const flattenedValues = values.flat(); // Преобразуем в одномерный массив для передачи в execute
    
    const [results] = await connection.execute(query, flattenedValues);

    return NextResponse.json({
      status: "Ok"
    }, { status: 200 })
    
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message)
    const response = {
      error: (err as Error).message,

      returnedStatus: 200,
    }

    return NextResponse.json(response, { status: 200 })
  }

 
}

export const deleteAllUser = async () => {
  try {
    const connection = await mysql.createConnection(connectionParams)
    const [results] = await connection.execute('DELETE FROM user_data.user where id > 0;')
    connection.end()
    return NextResponse.json(results)
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