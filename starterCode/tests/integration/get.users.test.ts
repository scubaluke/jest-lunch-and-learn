/* eslint-disable @typescript-eslint/ban-ts-comment */
import supertest from 'supertest'
import { StatusCodes } from 'http-status-codes'

import app from '../../src/app'
import { User } from '../../src/dataSource'
import { usersData } from './data/users.data'

/*
Moving on to our next example actually calling the DB
in jest testing, we do not want to actually make calls to the database. So we will be "mocking" the calls
jest has nemours ways to mock more info can be found here: https://jestjs.io/docs/mock-functions

we will be using jest's "sypOn" function for mocking our sequelize calls. 
the reason I like spyOn here, is you only need to mock the function the app is calling in this route. 
Other mock functions such as "jest.mock" will require you to mock more internal workings of the module, that we are not even using here. 

*/
const mockUsers = jest.spyOn(User, 'findAll')
const route = '/users'
describe('happy path tests - /users', () => {
  it('/users should work as expected with no query param', async () => {
    //@ts-ignore
    mockUsers.mockResolvedValue([usersData[0].dataValues])
    const response = await supertest(app).get(route)

    expect(response.status).toEqual(StatusCodes.OK)
    expect(response.type).toEqual('application/json')
    expect(response.body).toEqual(
      expect.objectContaining({
        users: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            createdAt: '2023-12-01T21:30:42.910Z',
            updatedAt: '2023-12-01T21:30:42.910Z',
          },
        ],
      }),
    )
  })

  /*
that test is basically just passing back the same data that we mocked, lets try something that modifies the data a bit. 
  */

  it('/users should work as expected when date-format query param is passed', async () => {
    //@ts-ignore
    mockUsers.mockResolvedValue(usersData)

    const response = await supertest(app).get(`${route}?date-format=YYYY-MM-DD`)

    expect(response.status).toEqual(StatusCodes.OK)
    expect(response.type).toEqual('application/json')
    expect(response.body).toEqual(
      expect.objectContaining({
        users: [
          {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            createdAt: '2023-12-01',
            updatedAt: '2023-12-01',
          },
        ],
      }),
    )
  })
})

describe('error path tests - /users', () => {
  it('/users should 500 and respond with the proper error if the DB is down', async () => {
    const message = 'unexpected error'
    const dbError = new Error(message)
    //@ts-ignore
    mockUsers.mockRejectedValue(dbError)

    const response = await supertest(app).get(`${route}`)

    expect(response.status).toEqual(StatusCodes.SERVICE_UNAVAILABLE)
    expect(response.type).toEqual('application/json')
    expect(response.body).toEqual(expect.objectContaining({ message }))
  })
})
