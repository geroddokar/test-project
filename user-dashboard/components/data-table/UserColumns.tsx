"use client";

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import DataTableRowActions from "@/components/data-table/DataTableRowActions"
import { User } from "@/types/user.type"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

interface UserColumsProps {
    onEdit: (user: User) => void
    onDelete: (user: User) => void
}

//

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
            return <div className="text-right font-medium">{formatted}</div>
        },
        enableSorting: true,

    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />,
        size: 50
    },
]

