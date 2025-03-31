import { GetDBSettings } from "@/lib/db";
import { NextResponse } from 'next/server'
import mysql from 'mysql2/promise'
import { User } from "@/types/user.type";
import { formatDate } from "@/lib/utils";
let connectionParams = GetDBSettings()

export const getAllUsers = async (page: number,  sorting: { id: string; desc: boolean }[]) => {
	const connection = await mysql.createConnection(connectionParams);
	try {

		let getExpQuery = 'SELECT {S_S} FROM user_data.user'
		let values: any[] = []
		const count_sql = getExpQuery.replace("{S_S}", "COUNT(id) as count")
		const [result, fields] = await connection.query(count_sql, values)
		const rows = result as mysql.RowDataPacket[];
		let totalCount = rows[0].count;

		if (sorting.length > 0) {
			const allowedFields = ['name', 'email', 'create_at'];
			const orderBy = sorting
			  .filter(({ id }) => allowedFields.includes(id))
			  .map(({ id, desc }) => `${id} ${desc ? 'DESC' : 'ASC'}`)
			  .join(', ');
			getExpQuery += ` ORDER BY ${orderBy}`;
		}

		const offset = isNaN(page) ? 0 : page * 10;
		getExpQuery = `${getExpQuery} LIMIT 10 OFFSET ${offset}`;

		values = []
		getExpQuery = getExpQuery.replace("{S_S}", "*")
		const [results] = await connection.execute(getExpQuery, values)
		const data = {
			users: results,
			total: totalCount
		}
		return NextResponse.json(data)
	}
	catch (err) {
		const response = {
			error: (err as Error).message,
			users: [],
			total: 0,
			returnedStatus: 500,
		}

		return NextResponse.json(response, { status: 500 });
	} finally {
		connection.end(); // Гарантированное закрытие соединения
	}
}


export const userCreate = async (user: User) => {
	const connection = await mysql.createConnection(connectionParams);
	try {
		const [results] = await connection.execute('INSERT INTO user_data.user (user_name, email, create_at) VALUES (?, ?, ?)', [user.user_name, user.email, formatDate(user.create_at)])
		return NextResponse.json(results)
	}
	catch (err) {
		const response = {
			error: (err as Error).message,
			users: [],
			total: 0,
			returnedStatus: 500,
		}

		return NextResponse.json(response, { status: 500 });
	} finally {
		connection.end(); // Гарантированное закрытие соединения
	}
}

export const userDelete = async (id: number) => {
	const connection = await mysql.createConnection(connectionParams);
	try {
		const [results] = await connection.execute('DELETE FROM user_data.user WHERE id = ?', [id])
		return NextResponse.json(results)
	}
	catch (err) {
		const response = {
			error: (err as Error).message,
			users: [],
			total: 0,
			returnedStatus: 500,
		}

		return NextResponse.json(response, { status: 500 });
	} finally {
		connection.end(); // Гарантированное закрытие соединения
	}
}


export const userUpdate = async (id: number, user: User) => {
	const connection = await mysql.createConnection(connectionParams);
	try {
		const results = await connection.execute('UPDATE user_data.user SET user_name = ?, email = ?, create_at = ? WHERE id = ?', [user.user_name, user.email, formatDate(user.create_at), id])
		return NextResponse.json(results);
	}
	catch (err) {
		const response = {
			error: (err as Error).message,
			users: [],
			total: 0,
			returnedStatus: 500,
		}

		return NextResponse.json(response, { status: 500 });
	} finally {
		connection.end(); // Гарантированное закрытие соединения
	}
}

export const createAllItems = async (users: User[]) => {
	const connection = await mysql.createConnection(connectionParams);
	try {
		if (users.length === 0) {
			return NextResponse.json({ status: "Користувачів не знайдено" }, { status: 400 });
		}

		const values = users.map(user => [user.user_name, user.email, user.create_at]);

		const query = `
      INSERT INTO user_data.user (user_name, email, create_at) 
      VALUES ${values.map(() => "(?, ?, ?)").join(", ")}
    `;

		const flattenedValues = values.flat();

		const [results] = await connection.execute(query, flattenedValues);

		return NextResponse.json({
			status: "Ok"
		}, { status: 200 })

	} catch (err) {
		const response = {
			error: (err as Error).message,
			users: [],
			total: 0,
			returnedStatus: 500,
		}

		return NextResponse.json(response, { status: 500 });
	} finally {
		connection.end(); // Гарантированное закрытие соединения
	}
}

export const deleteAllUser = async () => {
	const connection = await mysql.createConnection(connectionParams);
	try {
		const [results] = await connection.execute('DELETE FROM user_data.user where id > 0;')
		return NextResponse.json(results)
	}
	catch (err) {
		const response = {
			error: (err as Error).message,
			users: [],
			total: 0,
			returnedStatus: 500,
		}

		return NextResponse.json(response, { status: 500 });
	} finally {
		connection.end(); // Гарантированное закрытие соединения
	}
}