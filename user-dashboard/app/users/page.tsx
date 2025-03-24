
import { DataTable } from "@/components/data-table/DataTable"
import { Metadata } from 'next';

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
