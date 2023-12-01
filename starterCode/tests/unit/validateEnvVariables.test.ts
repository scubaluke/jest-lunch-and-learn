import { validateEnvVariables } from '../../src/helpers/validateEnvVariables'

/*
Happy and unhappy path testing!
we have learned how to test that our test pass as we expect, but what about testing that they fail?

*/
it('Should NOT throw when proper env variables are present', () => {
  const testValue = 'testValue'
  process.env.testValue = testValue
  expect(() => validateEnvVariables([testValue])).not.toThrow()
  // don't forget to delete your environment variables after the test
  delete process.env.testValue
})

/*
We can use the jest "describe block to help us keep our tests separated by functionality and keep them organized."
*/

describe('unhappy path', () => {
  it('Should be able to test errors will be thrown', () => {
    // the function that will throw an error needs to be wrapped in another function call.
    // otherwise the error will be thrown unexpectedly.
    const throwFunction = () => {
      throw new Error()
    }
    expect(throwFunction).toThrow(Error)
  })

  it('Should throw error when env variables are missing', () => {
    const testValue = 'testValue'

    expect(() => {
      validateEnvVariables([testValue])
    }).toThrow(
      `Environmental variables ${testValue.toString()} are missing missing`,
    )
  })
})
