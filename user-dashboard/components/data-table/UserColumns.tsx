"use client";

import { ColumnDef } from "@tanstack/react-table"
import DataTableRowActions from "@/components/data-table/DataTableRowActions"
import { User } from "@/types/user.type"
interface UserColumsProps {
    onEdit: (user: User) => void
    onDelete: (user: User) => void
}
export const UserColumns = ({onEdit, onDelete}: UserColumsProps): ColumnDef<User>[] => [
        {
        accessorKey: "user_name",
        header: "Ім'я",
    },
    {
        accessorKey: "email",
        enableSorting: true,
        sortingFn: 'alphanumeric',
        header: "Email"
    },
    {
        accessorKey: "create_at",
        sortingFn: 'datetime',
        header: "Час створення",
        cell: ({ row }) => {
            const formatted = new Date(row.getValue("create_at")).toLocaleString()
            return <div className="text-left font-medium">{formatted}</div>
        },
        enableSorting: true,

    },
    {
        id: "actions",
        header: "Дії",
        cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
        size: 50
    },
]

