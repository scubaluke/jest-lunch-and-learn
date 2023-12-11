/* eslint-disable @typescript-eslint/ban-ts-comment */
import supertest from 'supertest'
import { StatusCodes } from 'http-status-codes'

import app from '../../src/app'
import { User } from '../../src/dataSource'
import { usersData } from './data/users.data'

/*
Moving on to our next example where a call is actually made to the DB
With jest testing, we do not want to actually make calls to the database. So we will be "mocking" the calls.
Jest has nemours ways to mock, more info can be found here: https://jestjs.io/docs/mock-functions

We will be using jest's "sypOn" function for mocking our sequelize call to the DB. 
The reason I like spyOn here, is you only need to mock the function the app is calling in this route. 
Other mock functions such as "jest.mock" will require you to mock more internal workings of the module, that we are not using here. 
*/

const mockUsers = jest.spyOn(User, 'findAll')
const route = '/users'

describe('happy path tests', () => {
  it('/users should work as expected with no query param', async () => {
    const mockUserData = [usersData[0].dataValues]
    // ts ignore should be avoided. However, use in tests is ok as sometimes we are mocking "incorrect" data to throw errors.
    // Or in this case there is no need to mock parts of sequelize that are not used by this api.
    //@ts-ignore
    mockUsers.mockResolvedValue(mockUserData)
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

    expect(mockUsers).toHaveBeenCalledWith()
  })

  /*
The previous test is basically just passing back the same data that we mocked, lets make a call that modifies the data a bit. 
By passing in a query param of "date-format" we can test the integration of the format date function. 
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

    expect(mockUsers).toHaveBeenCalledWith()
  })

  /*
What would happen if there were no users in our DB?
Currently when the app starts up, there is one user seeded into the DB.
We want to test that our application responds as expected, even if that user were deleted.
Maybe in the future there is a "delete user" api, will our app still run. 

By writing tests for these cases we can utilize Test Driven Development, or TDD.
TDD is a software development strategy where you write the tests first, then you write the code.
In this case we have a user in our DB, and we do not want to delete the user for manual testing during development.
TDD helps us break down problems and logic into smaller parts.
TDD also ensures changes are adequately tested.
And by the time you are done developing all your tests will already be written! 

Here is an example of a TDD test we could write (as we are developing the api) to test the api responds correctly if no users exist. 
*/
  it('/users should work as expected when no data is in the DB', async () => {
    //@ts-ignore
    mockUsers.mockResolvedValue([])

    const response = await supertest(app).get(route)

    expect(response.status).toEqual(StatusCodes.OK)
    expect(response.type).toEqual('application/json')
    expect(response.body).toEqual(
      expect.objectContaining({
        users: [],
      }),
    )

    expect(mockUsers).toHaveBeenCalledWith()
  })
})

/*
There are cases where the data base could be down or return errors. 
We definite want to test how our application would respond to any database issues. 

This is another good example of TDD tests. If this test were written before the api was written and created we are sure our code handles these special cases.
*/

describe('error path tests - /users', () => {
  it('/users should 500 and respond with the proper error if the DB is down', async () => {
    const message = 'Database could not connect'
    const dbError = new Error(message)
    //@ts-ignore
    mockUsers.mockRejectedValue(dbError)

    const response = await supertest(app).get(`${route}`)

    expect(response.status).toEqual(StatusCodes.SERVICE_UNAVAILABLE)
    expect(response.type).toEqual('application/json')
    expect(response.body).toEqual(expect.objectContaining({ message }))
  })
})

/*
We have now tested our app, lets run the entire jest test suite and see how our code coverage looks! 

questions for discussion: 
  what do you agree or disagree with?
  What jest mocking methods do you prefer, and which ones work best on your team?
  How do you test a test?
*/
