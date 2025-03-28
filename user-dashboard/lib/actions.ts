import { User, State } from "@/types/user.type";
import { userCreate } from "@/services/db.service";
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    user_name: z
      .string()
      .min(1, { message: "Ім'я дуже коротке. Введіть повне ім'я" })
      .max(250, { message: "Ім'я має бути коротше 250 символів" }),
    email: z
      .string({
        required_error: "Введіть пошту" ,
      }).email({ message: "Введіть коректну пошту" })
      .min(5, { message: "Пошта дуже коротка. Введіть повну пошту" })
      .max(250, { message: "Пошта має бути коротше 250 символів" }),
    
  });

export async function createUser(prevState: State, formData: FormData) {
    const validatedFields = FormSchema.safeParse({
      user_name: formData.get('user_name'),
      email: formData.get('email'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
      };
    }
  
    const { user_name, email} = validatedFields.data
    const user: User = {
        id: 0,
        create_at: new Date(),
        user_name: user_name,
        email: email,
    }

    await userCreate(user)

    revalidatePath('/users');
    redirect('/users');
  }