const queries = {
    getAllItems: 'SELECT * FROM Items',
    getItemById: 'SELECT * FROM Items WHERE id = $1',
    createItem: 'INSERT INTO Items (name, description) VALUES ($1, $2) RETURNING *',
    updateItem: 'UPDATE Items SET name = $1, description = $2 WHERE id = $3 RETURNING *',
    deleteItem: 'DELETE FROM Items WHERE id = $1 RETURNING *',
};

module.exports = queries;
