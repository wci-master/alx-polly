# Testing in Alx-Polly

## Overview

This project uses Jest for testing. Tests are written in TypeScript and are located in `__tests__` directories adjacent to the files they test.

## Running Tests

To run all tests:

```bash
npm test
```

To run tests in watch mode (tests will re-run when files change):

```bash
npm run test:watch
```

## Test Structure

Tests are organized following the same structure as the source code. For example:

- `services/__tests__/poll-service.test.ts` contains tests for `services/poll-service.ts`

## Writing Tests

When writing tests for asynchronous code that uses timeouts (like the poll service), use the `advanceTimersAndAwait` helper function to properly handle Jest's fake timers:

```typescript
// Example test for an async function
it('should do something asynchronously', async () => {
  const result = await advanceTimersAndAwait(someAsyncFunction());
  expect(result).toBe(expectedValue);
});
```

## Test Coverage

To run tests with coverage reporting:

```bash
npm test -- --coverage
```

This will generate a coverage report in the `coverage` directory.