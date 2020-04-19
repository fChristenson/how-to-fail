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

One of the most important question to answer before you decide to crash or recover is:
"What will the impact be if I continue now?"

If your system is left in a broken state you need to crash but if there is no impact that can't be solved easily then recovering may be the best option.

### Logs vs errors

It is common to use errors when you want the system to crash.
It is common to use logs when you want to know that something is wrong but you don't want to crash.

### Who should handle the error?

#### Local error handling

Local error handling means that you deal with the error where it occurs.
Local error handling is usually done like this:

1. Catch the error
2. Evaluate if error recovery can happen
3. Log out message that the error occur and/or re-throw the error

#### Global error handling

Global error handling means that we allow the error to "bubble up to the surface".
With global error handling we only throw errors and use a global error handler to catch the error.

This is different from local error handling where we try to handle the error where it occurs.

#### Error subtypes

We need to think about consistency when designing our error handling.
Different types of errors are often returned with different status codes and messages.
When third parties depend on our API their system may expect that we use consistent errors.

### How to communicate the error to the caller?

#### Error return value vs throw

A common strategy for dealing with errors is to throw an error or return a "error value".
Some claim that you should never return a error value and always throw.
Some claim that you should always return a error value to avoid crashing the system.

I claim that it depends.

#### Empty return value vs null

There is an idea that returning `null` is bad.
The reasons is simple, how do I know if the value is `null` or not?
In languages such as Java this is a big problem because the type system does not have a explicit type for `null | Object` such as in Typescript.
This means that every object could be `null`.

This is what empty return values where created for.
The idea is simple, if something goes wrong return a value that represents that the operation failed.
This allows the caller to either check for the error or continue if it is safe.

Empty return values are perfect for when it doesn't matter if the previous operation failed. It is fine to continue with "empty" values.

The problem with empty values is that they force the caller to do the same check as with `null` but also invite more risk.
The caller may forget that a function can return an empty value and continue processing the result when it will cause problems.
Had the value been `null` the program would have failed and that is sometimes better.
