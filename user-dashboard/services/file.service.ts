"use client"
import { User, UserTableData } from "@/types/user.type"
import api from '@/services/api.service';
import { SortingState } from "@tanstack/react-table";

const BASE_URL = '/files';


export const uploadUsersFile = async (data:FormData):  Promise<void> => {
    return api.post(BASE_URL, data);
  };