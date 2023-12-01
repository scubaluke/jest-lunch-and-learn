/*
your first test:
how jest works
you call an "it" function with two arguments
  - the first argument is a description of what you are testing
  - the second argument is an anonymous function with your test case inside. 

the description should read to include the "it"
  - "it should respond 200 with the proper user data when calling /users"

The first and most simple test we can write is something like we expect 1 to equal 1
*/

import { add } from '../../src/helpers/add'

it('Should have one passing test', () => {
  expect(1).toEqual(1)
})

/*
we can now start testing our functions (unit tests)
by importing them into our test file, calling them and testing the results are what we expected.
*/

it('Should have one passing test', () => {
  const numbers = [1, 2, 3]
  const result = add(numbers)

  expect(result).toEqual(6)
})

/*
A more robust way to test is by passing in the numbers array, calculating the value, and passing that value to the expect.
This way if another engineer changes a value in the numbers array (maybe the numbers array is imported from another file)
your tests will still pass, and changing a value that shouldn't break your test will not. 
NOTE: do not use the actual function you are testing (add) to calculate this value
*/

it('Should pass even if numbers array changes', () => {
  const numbers = [1, 9, 6]
  const result = add(numbers)
  const shouldEqual = numbers.reduce(
    (previous, current) => previous + current,
    0,
  )
  expect(result).toEqual(shouldEqual)
})
