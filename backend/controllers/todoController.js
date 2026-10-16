const Todo = require("../models/Todo");

// CREATE TODO
const createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const todo = await Todo.create({
      title: title.trim(),
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL TODOS
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({
      order: [["id", "DESC"]],
    });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TODO
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    const { title, completed } = req.body;

    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
          message: "Title cannot be empty",
        });
      }

      todo.title = title.trim();
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({
          message: "Invalid completed value",
        });
      }

      todo.completed = completed;
    }

    await todo.save();

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE TODO
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    await todo.destroy();

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};