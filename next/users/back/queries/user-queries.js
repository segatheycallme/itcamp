const queries = {
  getAllUsers: 'SELECT * FROM Users',
  getUserById: 'SELECT * FROM Users WHERE id = $1',
  createUser: 'INSERT INTO Users (email, password) VALUES ($1, $2) RETURNING *',
  updateUser: 'UPDATE Users SET email = $1, password = $2 WHERE id = $3 RETURNING *',
  deleteUser: 'DELETE FROM Users WHERE id = $1 RETURNING *',
};

module.exports = queries;
