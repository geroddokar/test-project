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
import WaitingDialog from "../WaitingDialog";
import ConfirmDialog from "../ConfirmDialog";

export function DataTable<TData, TValue>() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [page, setPage] = useState(0);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [isConfirm, setIsConfirm] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<UserTableData>({
    queryKey: ["users", page, sorting],
    queryFn: () => getUsers(page, sorting),
  });

  if (isError) {
    return (<div>Помилка отримання данних. Спробуйте пізніше.</div>);
  }
  

  const onDeleteSuccess = async (user: User) => {
    queryClient.invalidateQueries({ queryKey: ["users", page, sorting] });
    onOpenChange(false);
    setIsWaiting(false);
    toast.success("Користувача успішно видалено.");
  };
  const onRequestError = () => {
    toast.error("Ой! Щось пішло не так", {
      description: 'Виникла проблема з вашим запитом.',
    });
    setIsWaiting(false)
  };

  const delMut = useMutation({
    mutationFn: deleteUser,
    onSuccess: onDeleteSuccess,
    onError: onRequestError,
  });

  const onDelete = useCallback((user: User) => {
    setIsWaiting(true)
    delMut.mutate(user.id)
  }, [queryClient, page, sorting, delMut]);

  const onEdit = useCallback((user: User) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
    toast.success("Користувача успішно відредаговано.");

  }, [isDialogOpen, selectedUser]);

  const onUploadEnd = useCallback((value: boolean) => {
    queryClient.invalidateQueries({ queryKey: ["users", page, sorting] });
  }, [queryClient, page, sorting]);

  const onOpenChange = useCallback((value: boolean) => {
    setIsDialogOpen(value);

    if (!value) {
      setSelectedUser(null);
      queryClient.invalidateQueries({ queryKey: ["users", page, sorting] });
    }
  }, [queryClient, page, sorting])
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

  const changePage = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const onDeleteAll = async (event: any) => {
    event.preventDefault();
    setIsConfirm(true);
    
    
  }
  const closeEvent = async (val: boolean) => {
    if(val) {
      try {
        setIsDeletingAll(true);
        setIsWaiting(true);
        await deleteAllUsers();
        queryClient.invalidateQueries({ queryKey: ["users", page, sorting] });
      } catch (error) {
        toast.error("Ошибка при удалении всех пользователей.");
      } finally {
        setIsDeletingAll(false);
        setIsWaiting(false);
        toast.success("Усі користувачі успішно видалені.");
      }
    }
    setIsConfirm(false);
  };

  return (

    <div className="conteiner">
      <WaitingDialog isOpen={isWaiting}/>
      <ConfirmDialog isOpen={isConfirm} onCloseEvent={closeEvent} />
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 py-5">
        <div className="flex items-center gap-4">

          <UserDialog isOpen={isDialogOpen} onOpenChange={onOpenChange} user={selectedUser} />
          <Button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition" onClick={onDeleteAll}>{isDeletingAll ? "Видаляю...." : "Видалити усіх"}</Button>
        </div>
        <UploadFile onUploadEnd={onUploadEnd} />

      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader  className=" bg-gray-100 text-gray-700 font-semibold text-left uppercase tracking-wider border-b border-gray-300">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th className="p-4 " key={header.id} colSpan={header.colSpan}>
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
                    <TableCell key={cell.id} className="text-left">
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
            onClick={() => changePage(0)}
            disabled={page === 0 || totalPages === 0}
          >
            Перша сторінка
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => changePage(page - 1)}
            disabled={page === 0 || totalPages === 0}
          >
            Попередня
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => changePage(page + 1)}
            disabled={(page + 1) >= totalPages || totalPages === 0}
          >
            Наступна
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => changePage(totalPages - 1)}
            disabled={(page + 1) >= totalPages || totalPages === 0}
          >
            Остання сторінка
          </Button>
        </div>
      </div>
    </div>
  )
}
