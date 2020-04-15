# How to fail

## What we will cover

- The different ways to handle an error
- Why there is no one way that fits all
- How to reason about error handling

## What this is not

- A example of all ways to deal with errors
- A guide for how to do error handling

## Notes

### Crash vs recover

### Logs vs errors

### Local error handling

Local error handling means that you deal with the error where it occurs.
Local error handling is usually done like this:

1. Catch the error
2. Evaluate if error recovery can happen
3. Log out message that the error occur and/or re-throw the error

### Global error handling

Global error handling means that we allow the error to "bubble up to the surface".
With global error handling we only throw errors and use a global error handler to catch the error.

This is different from local error handling where we try to handle the error where it occurs.

### Error subtypes

We need to think about consistency when designing our error handling.
Different types of errors are often returned with different status codes and messages.
When third parties depend on our API their system may expect that we use consistent errors.

### Error return value vs throw

### Empty return value vs null

### Either monad
