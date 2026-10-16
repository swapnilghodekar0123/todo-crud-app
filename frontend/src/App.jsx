import { useEffect, useState } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./services/todoServices";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]); 
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      setError("");
      const response = await getTodos();
      setTodos(response.data);
    } catch (err) {
      setError("Unable to fetch tasks. Check if the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setError("");

      if (editId !== null) {
        await updateTodo(editId, { title: title.trim() });
      } else {
        await createTodo(title.trim());
      }

      setTitle("");
      setEditId(null);
      await fetchTodos();
    } catch (err) {
      setError("Unable to save task. Please try again.");
    }
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setEditId(todo.id);
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      await deleteTodo(id);
      await fetchTodos();

      if (editId === id) {
        setEditId(null);
        setTitle("");
      }
    } catch (err) {
      setError("Unable to delete task.");
    }
  };

  const handleToggle = async (todo) => {
    try {
      setError("");
      await updateTodo(todo.id, {
        completed: !todo.completed,
      });
      await fetchTodos();
    } catch (err) {
      setError("Unable to update task status.");
    }
  };

  return (
    <main className="app">
      <section className="todo-card">
        <h1>My Todo List</h1>
        <p className="subtitle">Plan your day, one task at a time.</p>

        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a task..."
          />

          <button type="submit">
            {editId !== null ? "Update" : "Add Task"}
          </button>

          {editId !== null && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setEditId(null);
                setTitle("");
              }}
            >
              Cancel
            </button>
          )}
        </form>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p>Loading tasks...</p>
        ) : todos.length === 0 ? (
          <p className="empty">No tasks yet. Add your first task!</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <label className={todo.completed ? "completed" : ""}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(todo)}
                  />
                  <span>{todo.title}</span>
                </label>

                <div className="actions">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => handleEdit(todo)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;