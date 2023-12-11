import { validateEnvVariables } from '../../src/helpers/validateEnvVariables'

/*
Happy and unhappy path testing!
we have learned how to test that our test pass as we expect, but what about testing that they fail?
We can use the jest "describe block to help us keep our tests separated by functionality and keep them organized.

*/
describe('happy path', () => {
  it('Should NOT throw when proper env variables are present', () => {
    const testValue = 'testValue'
    process.env.testValue = testValue
    expect(() => validateEnvVariables([testValue])).not.toThrow()
    // don't forget to delete your environment variables after the test
    delete process.env.testValue
  })
})

/*
note separation with describe block.
How do we test that we expect an error to be thrown?
*/

describe('unhappy path', () => {
  // basic example of how to test error will be thrown
  it('Should be able to test errors will be thrown', () => {
    // the function that will throw an error needs to be wrapped in another function call.
    // otherwise the error will be thrown unexpectedly.
    const throwFunction = () => {
      throw new Error()
    }
    expect(throwFunction).toThrow(Error)
  })

  // this is the actual test we would want for our application, to test the function throws the proper error
  it('Should throw error when env variables are missing', () => {
    const testValue = 'testValue'

    expect(() => {
      validateEnvVariables([testValue])
    }).toThrow(
      `Environmental variables ${testValue.toString()} are missing missing`,
    )
  })
})
