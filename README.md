# User Dashboard

This project is a user management dashboard built with Next.js, React, and TypeScript. It allows administrators to manage users, including creating, editing, deleting, and viewing user data.

## Features

- **User Management**: Add, edit, delete, and view users.
- **Pagination**: Navigate through user data with pagination.
- **Sorting**: Sort user data by various fields.
- **Validation**: Form validation using `zod` and `react-hook-form`.
- **API Integration**: Fetch and update user data via API calls.
- **UI Components**: Built with reusable and accessible UI components.

## Technologies Used

- **Frontend**: React, Next.js, TypeScript
- **State Management**: React Query
- **Form Handling**: React Hook Form, Zod
- **UI Components**: Custom components and Tailwind CSS
- **Backend**: MySQL (via Docker)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Docker (for database setup)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/geroddokar/test-project.git
   cd test-project```

2. Install dependencies:
   ```pnpm install```
3. Set up the environment variables:
   - Copy .env.example to .env and configure the variables.
4. Start the development server:
   ```pnpm dev```
5. Open the app in your browser:
   ```http://localhost:3000```

# Database Setup

1.Start the database using Docker:
   ```docker-compose up -d```


# Folder Structure

```user-dashboard/
├── app/                # Application routes and pages
├── components/         # Reusable UI components
├── lib/                # Utility functions and libraries
├── public/             # Static assets
├── services/           # API service functions
├── types/              # TypeScript type definitions
├── .env                # Environment variables
├── package.json        # Project dependencies and scripts
└── [README.md](http://_vscodecontentref_/1)           # Project documentation
```


# Environment variables



|Змінна|Опис|Приклад значення|
|------|----|----------------|
|MYSQL_ROOT_PASSWORD|Пароль для root|qwerty|
|MYSQL_DATABASE|Ім’я бази даних|user_data|
|MYSQL_USER|Ім’я користувача MySQL|user|
|MYSQL_PASSWORD|Пароль користувача MySQL|userpassword|
|DATABASE_HOST|Хост бази даних|db|
|DATABASE_USER|Ім’я користувача бази даних|user|
|DATABASE_PASSWORD|Пароль користувача бази даних|userpassword|
|DATABASE_NAME|Ім’я бази даних|user_data|
|DATABASE_PORT|Порт бази даних|3306|
|NODE_ENV|Середовище виконання|development або production|


