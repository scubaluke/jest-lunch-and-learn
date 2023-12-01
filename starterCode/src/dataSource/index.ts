import { DataTypes, Sequelize } from 'sequelize'
import SQLite from 'sqlite3'

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: ':memory:',
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

async function sync() {
  await User.sync()
  const john = User.build({ firstName: 'john' })
  await john.save()
}
sync()

export { User }
