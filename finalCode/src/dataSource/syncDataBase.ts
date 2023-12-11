import { User } from '.'

export async function syncDataBase() {
  await User.sync()
  const john = User.build({ firstName: 'John', lastName: 'Doe' })
  await john.save()
}
