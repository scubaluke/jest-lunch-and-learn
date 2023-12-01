/*
your first test:
how jest works
you call an "it" function with two arguments
  - the first argument is a description of what you are testing
  - the second argument is an anonymous function with your test case inside. 

the description should read to include the "it"
  - "it should respond 200 with the proper user data when calling /users"



*/

import { add } from '../../src/helpers/add'

it('Should have one passing test', () => {
  expect(1).toEqual(1)
})

it('Should have one passing test', () => {
  const numbers = [1, 2, 3]
  const result = add(numbers)

  expect(result).toEqual(6)
})
