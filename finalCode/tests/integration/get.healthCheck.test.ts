import supertest from 'supertest'
import { StatusCodes } from 'http-status-codes'

import app from '../../src/app'

/*
Moving on to integration tests. 
remember - unit test test one "unit" of code. Think one function.
integration tests are going to test that these functions work together.

We want to test that our app runs as expected and responds as we expect. 

For this integration test, we will need to use the NPM package "supertest"
the way it works is you call super test, passing in your app. (note your server logic needs to be separated out from your app for this to work properly.)
Then you call the method (get - in the case) passing in the route. 
NOTE: this action is asynchronous, so we must mark the jest callback function as async and be sure to await the response. 
we will assign the response to a variable - to properly test what we are expecting the response to be. 
*/

describe('happy path tests - health check', () => {
  it('health check should work as expected', async () => {
    const response = await supertest(app).get('/')

    expect(response.status).toEqual(StatusCodes.OK)
    expect(response.type).toEqual('application/json')
    expect(response.body).toEqual(
      expect.objectContaining({
        message: 'hi, this is Express + TypeScript',
      }),
    )
  })
})

/*
!NOTE: 
If your api has authorization, or your sequelize instance is logging, you may will need to mock those. 
*/
