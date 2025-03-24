export type User = {
    id: number
    create_at?: Date
    user_name: string
    email: string
}

export type State = {
    errors?: {
      userId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
  };


  export type UserTableData = {
    users: User[];
    total: number;
  }