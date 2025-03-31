"use client"
import { User, UserTableData } from "@/types/user.type"
import api from '@/services/api.service';
import { SortingState } from "@tanstack/react-table";

const BASE_URL = '/users';

export const getUsers = async (page: number, sorting: SortingState): Promise<UserTableData> => {
	let URL = BASE_URL;
	URL = `${BASE_URL}?page=${page}`
	if (sorting && sorting.length > 0) {
		const sortingParams = sorting
			.map(({ id, desc }) => `sort=${id}&order=${desc ? 'desc' : 'asc'}`)
			.join('&');
		URL += `&${sortingParams}`;
	}
	const { data } = await api.get(URL);
	return data;
};

export const createUser = async (user: User): Promise<User> => {
	const { data } = await api.post(BASE_URL, user);
	return data;
};

export const updateUser = async (id: number, user: User): Promise<User> => {
	const { data } = await api.put(`${BASE_URL}/${id}`, user);
	return data;
};

export const deleteUser = async (id: number): Promise<User> => {
	return api.delete(`${BASE_URL}/${id}`);
};

export const deleteAllUsers = async (): Promise<User> => {
	return api.delete(`${BASE_URL}`);
};

