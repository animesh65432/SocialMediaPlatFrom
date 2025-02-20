import { Sequelize } from 'sequelize';

const database = new Sequelize(
  process.env.DIRECT_URL as string,
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  },
);


// const database = new Sequelize('meetup', 'postgres', 'new_password', {
//   dialect: 'postgres',
//   logging: false,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
// });
const testConnection = async () => {
  try {
    await database.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

testConnection();

export default database;