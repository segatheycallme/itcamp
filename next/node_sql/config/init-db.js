const db = require('./db');
const initializeDatabase = async () => {
  try {
    const createItemsTableQuery = `
CREATE TABLE IF NOT EXISTS Items (
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
description TEXT
);`;
    const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS Users (
id SERIAL PRIMARY KEY,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL
);`;

    // Execute the queries
    await db.query(createItemsTableQuery);
    await db.query(createUsersTableQuery);
    console.log('Tables "Items" and "Users" have been created or already exist.');
    // Clear data
    await db.query(`TRUNCATE TABLE Items RESTART IDENTITY;`);
    await db.query(`TRUNCATE TABLE Users RESTART IDENTITY;`);
    console.log('Existing data in tables has been cleared.');
    // Insert sample data
    const seedItemsDataQuery = `
INSERT INTO Items (name, description)
VALUES
('Sample Item 1', 'This is a sample item'),
('Sample Item 2', 'This is another sample item');
`;
    const seedUsersDataQuery = `
INSERT INTO Users (email, password)
VALUES
('user1@example.com', 'password1'),
('user2@example.com', 'password2');`;

    await db.query(seedItemsDataQuery);
    await db.query(seedUsersDataQuery);
    console.log('Sample data has been added to tables.');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await db.pool.end();
    console.log('Database connection closed.');
  }
};
initializeDatabase();
