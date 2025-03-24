import mysql from "mysql2/promise"


export const queryKeys = {
    users: {
      all: ['fetchUsers'] as const,
    },
  };
  
export interface IDBSettings {
    host: string
  
    port: number
  
    user: string
  
    password: string
  
    database: string
  }

export const GetDBSettings = (): IDBSettings => {
    const env = process.env.NODE_ENV
    return {
        host: process.env.DATABASE_HOST!,
  
        port: parseInt(process.env.DATABASE_PORT!),
  
        user: process.env.DATABASE_USER!,
  
        password: process.env.DATABASE_PASSWORD!,
  
        database: process.env.DATABASE_NAME!,
      }
}