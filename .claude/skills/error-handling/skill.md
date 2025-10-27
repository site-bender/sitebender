---
name: error-handling
description: Patterns for error handling using Result<T,E> and Validation<T,E> monads. Never use try/catch/throw. Covers error type design, error constructors, and error composition. Use when handling errors or defining error types. Includes script for generating error types.
---

# Error Handling

## Core Principle

**Never use exceptions. All errors are values.**

Errors are not exceptional - they are expected outcomes that must be handled explicitly. Use Result<T,E> for operations that can fail, Validation<T,E> for collecting multiple errors, and discriminated unions for error types.

## When to Use This Skill

Use this skill when:
- Handling any operation that can fail
- Defining error types
- Creating error constructors
- Composing error-returning functions
- Validating data
- Working with external IO
- Converting exceptions to Results (at IO boundaries only)

**This skill is proactive** - Use it automatically when writing any fallible operation.

## Script Integration

**Generate error type:**
```bash
deno task new:error <ErrorTypeName>
```

This generates:
- Discriminated union error type definition
- Error constructor functions
- Type guards (isErrorType, isSpecificVariant)
- Usage examples

## Patterns

[TO BE COMPLETED]

### Pattern 1: Result<T,E> for Single Errors

### Pattern 2: Validation<T,E> for Multiple Errors

### Pattern 3: Error Type Design

### Pattern 4: Error Constructor Functions

### Pattern 5: Error Composition

## Result vs Validation

[TO BE COMPLETED]

## Error Type Structure

[TO BE COMPLETED]

## Constitutional Rule: No Exceptions

[TO BE COMPLETED]

**Never use:**
- `throw new Error(...)`
- `try { ... } catch (e) { ... }`
- `Promise.reject(...)`

**Always use:**
- `return error({ _tag: 'ErrorType', ... })`
- `return ok(value)`
- `return validation({ errors: [...] })`

## Common Violations

[TO BE COMPLETED]

## Examples

[TO BE COMPLETED]

## Cross-References

**References:**
- type-definition skill - For error type definitions (discriminated unions)
- function-implementation skill - For error-returning functions
- sitebender-predicates skill - For error type guards

**Referenced by:**
- All skills involving fallible operations
- testing skill - For testing error paths
