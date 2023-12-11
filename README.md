# Jest Lunch and Learn

## What we will go over

- why testing
- types of testing - manual vs automatic
- why unit testing
- unit vs integration vs E2E tests
- what is jest
- why jest
- test patterns
- what not to test
- your first test - jest syntax
- setting up your local for testing
- basic unit test (test one function)
- testing for errors
- testing an api
- testing using mocking.
- TDD

other points if there is time:
hooks - beforeEach, afterAll etc.
snapshots, custom matches (and other “advanced” features)
ci/cd pipelines

### How to use this repo

You will find two folders in the root. Starter code and finished code.
Open up starter code and you will find a working express api with a tests folder.
Inside the tests folder there are unit and integration tests.
The files are empty so you can follow along or work through them on your own.
The tests will start simply, to show the syntax of jest and basics of jest testing.
The tests will progressively become more in-depth.

Move through the test files starting with:

- unit/

  - add.test.ts
  - validateEnvVariables.test.ts

- integration/
  - get.healthCheck.test.ts
  - get.add.test.ts
  - get.users.test.ts
