import { Row } from "@tanstack/react-table";
import * as React from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import { MoreHorizontal } from "lucide-react"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    onEdit: (value: TData) => void;
    onDelete: (value: TData) => void;
}

const DataTableRowActions = <TData,>({row, onEdit, onDelete}: DataTableRowActionsProps<TData>) => {

    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Опції</span>
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(row.original)}>Редагувати</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(row.original)}>Видалити</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    )

}


export default DataTableRowActions;
