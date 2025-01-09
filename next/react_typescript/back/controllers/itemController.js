const db = require('../config/db');
const queries = require('../queries/item-queries');

const getAllItems = async (req, res) => {
    try {
        const result = await db.query(queries.getAllItems);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
};

const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(queries.getItemById, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching item', error });
    }
};

const createItem = async (req, res) => {
    try {
        const { name, description } = req.body;
        const result = await db.query(queries.createItem, [name, description]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error creating item', error });
    }
};

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const result = await db.query(queries.updateItem, [name, description, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(queries.deleteItem, [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully', item: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
};

module.exports = { getAllItems, getItemById, createItem, updateItem, deleteItem };
