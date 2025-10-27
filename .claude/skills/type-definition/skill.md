---
name: type-definition
description: Patterns for defining types using branded types, discriminated unions, and type-level programming. Covers smart constructors, type predicates, and newtype patterns. Use when creating any new type. Includes scripts for generating branded types and discriminated unions.
---

# Type Definition

## Core Principle

**Make invalid states unrepresentable.**

Types are design tools that encode business rules and constraints at the type level. Use branded types for domain primitives, discriminated unions for state machines, and type-level programming to enforce correctness.

## When to Use This Skill

Use this skill when:
- Creating branded types (newtypes)
- Defining discriminated unions
- Writing smart constructors
- Creating type predicates
- Implementing type-level constraints
- Modeling domain primitives
- Encoding state machines

**This skill is proactive** - Use it automatically when defining any type.

## Script Integration

**Generate branded type:**
```bash
deno task new:branded <TypeName> <baseType>
```

**Generate discriminated union:**
```bash
deno task new:union <UnionName> <variant1> <variant2> ...
```

**Generate full newtype (uses /implement-newtype):**
```bash
/implement-newtype <TypeName>
```

## Patterns

[TO BE COMPLETED]

### Pattern 1: Branded Types (Newtypes)

### Pattern 2: Smart Constructors

### Pattern 3: Discriminated Unions

### Pattern 4: Type Guards for Unions

### Pattern 5: Type-Level Programming

## Branded Type Structure

[TO BE COMPLETED]

## Smart Constructor Pattern

[TO BE COMPLETED]

## Discriminated Union Pattern

[TO BE COMPLETED]

## Common Violations

[TO BE COMPLETED]

## Examples

[TO BE COMPLETED]

## Cross-References

**References:**
- naming skill - For type naming conventions (PascalCase)
- abbreviations skill - For initialisms in type names
- sitebender-predicates skill - For type guard implementation
- error-handling skill - For Result types in smart constructors

**Referenced by:**
- function-implementation skill - For type annotations
- error-handling skill - For error type definitions
