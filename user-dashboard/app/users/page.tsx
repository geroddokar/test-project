
import { DataTable } from "@/components/data-table/DataTable"
import { User } from "@/types/user.type"
// import { toast } from "sonner"
import { queryKeys } from "@/lib/db"
import { Metadata } from 'next';
import {  QueryClient, QueryClientProvider, useQuery, dehydrate, HydrationBoundary, } from '@tanstack/react-query';
import { getUsers } from "@/services/users.service";




import {
  
} from '@tanstack/react-query'

// This could also be getServerSideProps



export const metadata: Metadata = {
  title: 'Користувачі',
};


export default async function Users()  {
  return (
    <div className="container mx-auto py-10">
       <DataTable />
    </div>
  )
}
