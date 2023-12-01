import { DataTypes, Sequelize } from 'sequelize'
import SQLite from 'sqlite3'

import { syncDataBase } from './syncDataBase'

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
  dialectOptions: {
    mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
  },
  define: {
    freezeTableName: true,
  },
})

const User = sequelize.define(
  'User',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {},
)

syncDataBase()

export { User }
