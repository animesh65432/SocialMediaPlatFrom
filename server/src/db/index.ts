import { Sequelize } from 'sequelize';

const database = new Sequelize(
  "meetup", // Database name
  "postgres", // Username
  "new_password", // Password
  {
    host: "localhost", // Database host
    dialect: "postgres", // Dialect
    logging: console.log, // Enable logging for debugging
  }
);

// Test the connection
database.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
export default database