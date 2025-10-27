---
name: testing
description: Patterns for testing pure functions using Deno's test framework. Covers unit tests, property-based testing, test organization, and assertion patterns. Use when writing tests. Includes script for generating test boilerplate.
---

# Testing

## Core Principle

**Test behavior, not implementation. Pure functions are trivial to test.**

Pure functions have no side effects and always return the same output for the same input. This makes testing straightforward: supply inputs, assert outputs. Use property-based testing to verify invariants across many inputs.

## When to Use This Skill

Use this skill when:
- Writing unit tests for functions
- Writing property-based tests
- Testing type guards and predicates
- Testing error handling (Result/Validation)
- Organizing test files
- Writing test assertions
- Testing curried functions

**This skill is proactive** - Write tests alongside every function.

## Script Integration

**Generate test file:**
```bash
deno task new:test <functionName>
```

This generates:
- `functionName/index.test.ts` with test structure
- Unit test sections
- Property-based test templates
- Edge case sections
- Proper imports

## Patterns

[TO BE COMPLETED]

### Pattern 1: Testing Unary Functions

### Pattern 2: Testing Curried Functions

### Pattern 3: Testing Higher-Order Functions

### Pattern 4: Property-Based Testing

### Pattern 5: Testing Error Paths

## Test Organization

[TO BE COMPLETED]

### File Structure

Each function has its own test file:
```
myFunction/
  index.ts
  index.test.ts
```

### Test Sections

[TO BE COMPLETED]

## Assertion Patterns

[TO BE COMPLETED]

## Property-Based Testing

[TO BE COMPLETED]

## Testing Curried Functions

[TO BE COMPLETED]

## Common Violations

[TO BE COMPLETED]

## Examples

[TO BE COMPLETED]

## Cross-References

**References:**
- function-implementation skill - For functions being tested
- error-handling skill - For testing Result/Validation
- sitebender-predicates skill - For testing predicates

**Referenced by:**
- All skills - Testing is fundamental
