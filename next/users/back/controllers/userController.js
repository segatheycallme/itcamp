const db = require('../config/db');
const queries = require('../queries/user-queries');

const getAllUsers = async (req, res) => {
  try {
    const result = await db.query(queries.getAllUsers);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.getUserById, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await db.query(queries.createUser, [email, password]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const result = await db.query(queries.updateUser, [email, password, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(queries.deleteUser, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully', user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
