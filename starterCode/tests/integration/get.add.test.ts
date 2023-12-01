import supertest from 'supertest'
import { StatusCodes } from 'http-status-codes'

import app from '../../src/app'

/*
Moving on to our next example where we pass in a query param and expect different results
*/
const route = '/add'
describe('happy path tests - /add', () => {
  it('/add should work as expected', async () => {
    const numbers = [4, 5, 6]
    const response = await supertest(app).get(
      `${route}?numbers=${numbers.toString()}`,
    )

    const sum = numbers.reduce((previous, current) => previous + current, 0)
    expect(response.status).toEqual(StatusCodes.OK)
    expect(response.type).toEqual('application/json')
    expect(response.body).toEqual(
      expect.objectContaining({
        sum,
      }),
    )
  })
})

describe('error path tests - /add', () => {
  it('/add should 400 if numbers array contains a string', async () => {
    const numbers = ['string', 5, 6]
    const response = await supertest(app).get(
      `${route}?numbers=${numbers.toString()}`,
    )

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.type).toEqual('application/json')
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'please fixe validation errors',
        errors: expect.arrayContaining([
          expect.objectContaining({
            location: 'query',
            msg: 'Invalid value',
            path: 'numbers',
            type: 'field',
            value: 'string,5,6',
          }),
        ]),
      }),
    )
  })

  it('/add should 400 if numbers array contains a string', async () => {
    const numbers = ['string', 5, 6]
    const response = await supertest(app).get(
      `${route}?numbers=${numbers.toString()}`,
    )

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST)
    expect(response.type).toEqual('application/json')
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'please fixe validation errors',
        errors: expect.arrayContaining([
          expect.objectContaining({
            location: 'query',
            msg: 'Invalid value',
            path: 'numbers',
            type: 'field',
            value: 'string,5,6',
          }),
        ]),
      }),
    )
  })

  it('/add should 405 if called with the wrong method', async () => {
    const numbers = [4, 5, 6]
    const response = await supertest(app).post(
      `${route}?numbers=${numbers.toString()}`,
    )

    expect(response.status).toEqual(StatusCodes.METHOD_NOT_ALLOWED)
    expect(response.type).toEqual('application/json')
    // MDN documentation says 405 error should include the allowed method/s in the headers.
    expect(response.headers.allow).toEqual('GET')

    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'Method not allowed',
        method: 'POST',
      }),
    )
  })
})
