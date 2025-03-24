"use client"
import * as React from "react"
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table"
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserColumns } from "./UserColumns"
import { useCallback, useMemo, useState } from "react";
import { User, UserTableData } from "@/types/user.type"
import UserDialog from "../UserDialog"
import { getUsers, deleteAllUsers, deleteUser } from "@/services/users.service";
import { Button } from "../ui/button";
import { toast } from "sonner"
import UploadFile from "../ui/uploadBtn";

export function DataTable<TData, TValue>() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [page, setPage] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<UserTableData>({
    queryKey: ["users", page, sorting],
    queryFn: () => getUsers(page, sorting),
  });

  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const onDeleteSuccess = async (user: User) => {
		console.log(`Користувач ${user.user_name} був видаленний`);
    queryClient.invalidateQueries({ queryKey: ["users", page, sorting] });
		onOpenChange(false);
		
	};
  const onRequestError = () => {
		toast.error("Ой! Щось пішло не так", {
			description: 'Виникла проблема з вашим запитом.',
		});
	};

  const delMut = useMutation({
      mutationFn: deleteUser,
      onSuccess: onDeleteSuccess,
      onError: onRequestError,
    });
  
  const onDelete = useCallback((user: User) => {
    delMut.mutate(user.id)
  }, []);

  const onEdit = useCallback((user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);

  }, []);

  const onUploadEnd = useCallback((value:boolean) => {
    queryClient.invalidateQueries({ queryKey: ["users", page, sorting] });
  }, []);

  const onOpenChange = useCallback((value:boolean) => {
    console.log("onOpenChange")
    console.log("value", value)
    setIsDialogOpen(value);
    
    if (!value) {
      setSelectedUser(null);
      console.log("selectedUser", selectedUser)
      queryClient.invalidateQueries({ queryKey: ["users", page, sorting] });
    
    } else {
      console.log("selectedUser", selectedUser)
    }
  }, [])
  const columns = useMemo(() => UserColumns({ onEdit, onDelete }), []);

  const totalPages = data?.total ? Math.ceil(data.total / 10) : 0;
  const users: User[] = data?.users || [];
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    manualSorting: true,
    rowCount: data?.total ? data.total : 0,
  })

  const nextPage = () => {
    setPage(page + 1)
  }
  const previousPage = () => {
    setPage(page - 1)
  }

  const onDeleteAll = async (event:any)=>{
    setIsDeleting(true)
    await deleteAllUsers()
    queryClient.invalidateQueries({ queryKey: ["users", page, sorting] });
    setIsDeleting(false)
    toast("Видалив усе!",{
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })
  }

  return (

    <div className="conteiner">
      <div className="rowflex flex-row py-5">
        <Button onClick={onDeleteAll}>{isDeleting? "Видаляю...." : "Видалити усіх"}</Button>
        <UploadFile onUploadEnd={onUploadEnd}/>
        <UserDialog isOpen={isDialogOpen} onOpenChange={onOpenChange} user={selectedUser}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === 'asc'
                              ? 'Сортувати за зростанням'
                              : header.column.getNextSortingOrder() === 'desc'
                                ? 'Сортувати за спаданням'
                                : 'Очистити сортування'
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Завантаження...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Нет данных
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
        <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(0)}
            disabled={page === 0}
          >
            Перша сторінка
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => previousPage()}
            disabled={page === 0}
          >
            Попередня
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => nextPage()}
            disabled={(page + 1) >= totalPages}
          >
            Наступна
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(totalPages-1)}
            disabled={(page + 1) >= totalPages}
          >
            Остання сторінка
          </Button>
        </div>
      </div>
    </div>
  )
}
