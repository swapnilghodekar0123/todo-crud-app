# Todo CRUD Application

A full-stack Todo CRUD application built using React.js, Node.js, Express.js, Sequelize ORM, and PostgreSQL.

## Features

- Create a new todo
- View all todos
- Update a todo title
- Mark a todo as completed or incomplete
- Delete a todo
- Store todos permanently in PostgreSQL

## Tech Stack

**Frontend:** React.js, Vite, Axios, CSS  
**Backend:** Node.js, Express.js  
**Database:** PostgreSQL  
**ORM:** Sequelize

## Project Structure

```text
TodoCRUD/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── todoController.js
│   ├── models/
│   │   └── Todo.js
│   ├── routes/
│   │   └── todoRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── todoServices.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
├── .gitignore
└── README.md
```

## Prerequisites

Install the following before running the project:

- Node.js and npm
- PostgreSQL
- Git

Check Node.js and npm installation:

```bash
node -v
npm -v
```

## Database Setup

1. Start your PostgreSQL server.
2. Open pgAdmin or PostgreSQL Query Tool.
3. Create a database named `todo_crud`.

SQL command:

```sql
CREATE DATABASE todo_crud;
```

4. Check your PostgreSQL port. The current local configuration uses port `5433`. If your PostgreSQL uses another port, update the configuration accordingly.

## Backend Setup

Open a terminal in the project root and run:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder. Add your own local PostgreSQL credentials:

```env
DB_NAME=todo_crud
DB_USER=postgres
DB_PASSWORD=your_postgresql_password
DB_HOST=localhost
DB_PORT=5433
PORT=5000
```

Replace `your_postgresql_password` with your PostgreSQL password. Use the port configured on your machine.

Start the backend:

```bash
npm start
```

If your backend `package.json` does not define a start script, run:

```bash
node server.js
```

The backend should run at:

```text
http://localhost:5000
```

The server connects to PostgreSQL and synchronizes the Sequelize model when it starts, according to the project configuration.

## Frontend Setup

Open a **new terminal** from the project root:

```bash
cd frontend
npm install
npm run dev
```

Vite will show a local URL in the terminal, usually:

```text
http://localhost:5173
```

Open that URL in your browser. Keep both backend and frontend terminals running.

## API Endpoints

Base URL: `http://localhost:5000/api/todos`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/todos` | Fetch all todos |
| POST | `/api/todos` | Create a todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |

### Create a Todo

POST `http://localhost:5000/api/todos`

JSON body:

```json
{
  "title": "Learn React"
}
```

### Update a Todo

PUT `http://localhost:5000/api/todos/1`

JSON body:

```json
{
  "title": "Learn React and Node.js",
  "completed": true
}
```

Use an existing todo ID.

## Troubleshooting

- **Database connection error:** Make sure PostgreSQL is running and the database name, username, password, host, and port in `backend/.env` are correct.
- **Port already in use:** Stop the other process or configure an available port and update the frontend API URL if needed.
- **Frontend cannot connect to backend:** Make sure the backend is running on port 5000 and the frontend service uses the correct API base URL.
- **Missing dependencies:** Run `npm install` separately inside both `backend` and `frontend`.

## Security Notes

- Never commit your real `.env` file or database password.
- Create your own local `backend/.env` file using the example above.
- Do not share production credentials in this repository.

## Author

Swapnil Ghodekar