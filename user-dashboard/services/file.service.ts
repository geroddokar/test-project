"use client"
import api from '@/services/api.service';

const BASE_URL = '/files';


export const uploadUsersFile = async (data: FormData): Promise<void> => {
	return api.post(BASE_URL, data);
};