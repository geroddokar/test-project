import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { uk as ua } from "date-fns/locale";
import { CalendarIcon } from "lucide-react"
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { User } from "@/types/user.type";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner"
import { createUser, updateUser } from "@/services/users.service"
import { Loader2 } from 'lucide-react';
import { useEffect, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";

interface UserDialogProps {
	isOpen: boolean;
	onOpenChange: (value: boolean) => void;
	user?: User | null;
}

const formSchema = z.object({
	user_name: z
		.string()
		.min(1, { message: "Ім'я дуже коротке. Введіть повне ім'я" })
		.max(250, { message: "Ім'я має бути коротше 250 символів" }),
	email: z
		.string({
			required_error: "Введіть пошту",
		}).email({ message: "Введіть коректну пошту" })
		.min(5, { message: "Пошта дуже коротка. Введіть повну пошту" })
		.max(250, { message: "Пошта має бути коротше 250 символів" }),
	create_at: z
		.date()
		.min(new Date('2000-01-01'))
		.max(new Date()),

});

export default function UserDialog({ isOpen, onOpenChange, user }: UserDialogProps) {
	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			user_name: '',
			email: '',
			create_at: undefined
		},
		mode: 'onChange',
	});


	const onCreateSuccess = async (user: User) => {
		toast('Користувач був створений успішно.');
		form.reset({ user_name: "", email: "", create_at: undefined })
		onOpenChange(false);

	};

	const onUpdateSuccess = async (user: User) => {
		toast('Дані користувача були оновлені успішно.');
		form.reset({ user_name: "", email: "", create_at: undefined })
		onOpenChange(false);
	};

	const onRequestError = () => {
		toast.error("Ой! Щось пішло не так", {
			description: 'Виникла проблема з вашим запитом.',
		});
	};

	const createMutation = useMutation({
		mutationFn: createUser,
		onSuccess: onCreateSuccess,
		onError: onRequestError,
	});

	const updateMutation = useMutation({
		mutationFn: (usr: User) => {
			if (!usr) {
				throw new Error("User is not defined");
			}
			return updateUser(usr.id, usr);
		},
		onSuccess: onUpdateSuccess,
		onError: onRequestError,
	});

	useEffect(() => {
		if (user) {
			form.reset({
				user_name: user.user_name,
				email: user.email,
				create_at: user.create_at
			});
		} else {
			form.reset({ user_name: "", email: "", create_at: undefined })
		}
	}, [isOpen, user]);

	const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (values: z.infer<typeof formSchema>) => {
		const newUser: User = {
			id: 0,
			user_name: values.user_name,
			email: values.email,
			create_at: values.create_at,
		};
		if (!user) {
			createMutation.mutate(newUser);
		} else {
			newUser.id = user.id;
			updateMutation.mutate(newUser);
		}

	};
	const onOpenChangeEv = useCallback((value: boolean) => {

		if (!value) {
			form.reset({ user_name: "", email: "", create_at: undefined })
		}
		onOpenChange(value)
	}, [])
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChangeEv}>
			<DialogTrigger asChild>
				<Button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">Add</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{user ? 'Оновити данні користувача' : 'Створити нового користувача'}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form className="space-y-4">
						<FormField
							name="user_name"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ім'я користувача</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="email"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Пошта користувача</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="create_at"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Дата створення</FormLabel>
									<FormControl>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"pl-3 text-left font-normal",
															!field.value && "text-muted-foreground"
														)}
													>
														{field.value ? (
															format(field.value, "PPP",{ locale: ua })
														) : (
															<span>Оберіть дату</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) =>
														date > new Date() || date < new Date("1900-01-01")
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<DialogFooter>
					<Button
						className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
						type="button"
						disabled={!form.formState.isValid || createMutation.isPending}
						onClick={form.handleSubmit(onSubmit)}
					>
						{createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						{user ? 'Оновити' : 'Створити'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

