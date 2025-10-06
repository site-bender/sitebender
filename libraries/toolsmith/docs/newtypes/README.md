# Newtypes (Branded Types) Implementation Guide

## Overview

This guide provides a complete implementation plan for branded numeric types (newtypes) in Toolsmith. The goal is to compensate for JavaScript's poor numeric type system by creating type-safe, zero-overhead branded primitives for Integer, BigInteger, Float, and fixed-precision decimal types.

## The Problem

JavaScript conflates all numeric types into one `number` type (plus `bigint`). This allows semantically incorrect operations:
- Mixing integers and floats
- Using floats in contexts requiring exact decimal precision (currency, finance)
- Accidentally using one ID type where another is expected
- Floating point imprecision: `0.1 + 0.2 !== 0.3`

## The Solution: Branded Types

Branded types create distinct types from primitives at compile-time with **zero runtime cost**:

```typescript
type Integer = number & { readonly __brand: "Integer" }
type Float = number & { readonly __brand: "Float" }

function processInteger(n: Integer): void { }

const int: Integer = 42 as Integer  // OK
const flt: Float = 3.14 as Float    // OK

processInteger(flt)  // TYPE ERROR ✅
```

The `__brand` property is a phantom type—it doesn't exist at runtime, only compile-time.

## Branded Types vs Monads

**Branded types are NOT monads:**

| Branded Types | Monads (Result, Validation) |
|---------------|----------------------------|
| Type-level only (compile-time) | Runtime data structures |
| Zero runtime overhead | Memory allocation, indirection |
| Just type assertions | Wrap values in containers |
| No computational context | Provide error handling |
| Can't be mapped/flatMapped | Support map, flatMap, chain |

**They compose beautifully:**
```typescript
Result<Integer, ValidationError>  // Monad wrapping a branded type
```
This combines compile-time type safety (Integer vs Float) with runtime error handling.

## Documentation Structure

1. **[Architecture & Rules](./architecture.md)** - Constitutional and formatting rules (CRITICAL - read first!)
2. **[Type System](./type-system.md)** - All branded type definitions and constants
3. **[Implementation Patterns](./patterns.md)** - Code templates for all file types
4. **[File Structure](./file-structure.md)** - Complete directory structure and file list
5. **[Implementation Order](./implementation-order.md)** - Phase-by-phase implementation guide
6. **[Usage Examples](./usage-examples.md)** - How to use branded types in practice

## Quick Start

1. **Read [Architecture & Rules](./architecture.md)** - Understand the non-negotiable rules
2. **Review [Type System](./type-system.md)** - See what types we're implementing
3. **Use [Implementation Patterns](./patterns.md)** as templates - Copy/paste and adapt
4. **Follow [Implementation Order](./implementation-order.md)** - Implement in correct sequence
5. **Reference [Usage Examples](./usage-examples.md)** - See how it all works together

## Implementation Summary

- **10 branded types**: Integer, BigInteger, Float, Currency, Decimal0-8, Percentage
- **72 total files**: 1 types file + 1 constants file + 70 function files
- **Fixed-scale decimals**: Use integer-backed storage (Haskell approach) for exact arithmetic
- **Zero runtime cost**: All brands are compile-time only
- **Full currying**: All functions curried for composition
- **No exceptions**: All validation returns Result/Validation monads

## Key Benefits

✅ **Type safety** - Can't mix Integer with Float, Currency with Decimal4
✅ **Exact decimal arithmetic** - No `0.1 + 0.2 = 0.30000000000000004`
✅ **Zero overhead** - Brands are type-level only
✅ **Validation at boundaries** - Smart constructors return Result
✅ **Proven pattern** - Based on Haskell, Rust, Java approaches
✅ **Currency scale support** - 0-8 decimal places for all world currencies

## Start Implementation

Begin with [Architecture & Rules](./architecture.md) to understand the critical requirements, then proceed through the documentation in order.
