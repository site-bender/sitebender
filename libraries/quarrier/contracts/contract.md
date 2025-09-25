# Quarrier Library Contract v1.0.0

> Last Updated: 2025-01-11

## Purpose

Property-based testing tools, arbitrary data generation, and test utilities. Provides QuickCheck-style testing and fake data generation.

## Public API

### Exported Functions

#### `arbitrary`

**Signature:** `(type: ParsedType) => Arbitrary<unknown>`

Generate arbitrary values for a given type from Arborist output

#### `generateForType`

**Signature:** `(typeInfo: ContractOutput<ParsedType>) => Generator<unknown>`

Create a generator for values matching a specific type

#### `generateTriples`

**Signature:** `(subject: string, predicate: string, objectType: ParsedType) => Triple[]`

Generate RDF-style triples for semantic testing

#### `property`

**Signature:** `(description: string, arbitrary: Arbitrary<T>, predicate: (value: T) => boolean) => PropertyTest`

Define a property-based test

#### `fake`

**Signature:** `(schema: Schema) => FakeData`

Generate fake data matching a schema

### Exported Types

#### `Arbitrary`

Generator for arbitrary values of a type

**Fields:**

- `generate: () => T`
- `shrink: (value: T) => T[]`
- `filter: (predicate: (value: T) => boolean) => Arbitrary<T>`
- `map: <U>(fn: (value: T) => U) => Arbitrary<U>`
- `chain: <U>(fn: (value: T) => Arbitrary<U>) => Arbitrary<U>`

#### `Generator`

Configurable value generator

**Fields:**

- `next: () => T`
- `take: (n: number) => T[]`
- `seed: (value: number) => Generator<T>`
- `config: GeneratorConfig`

#### `Triple`

RDF-style triple for semantic testing

**Fields:**

- `subject: string`
- `predicate: string`
- `object: unknown`
- `metadata?: TripleMetadata`

#### `PropertyTest`

Property-based test specification

**Fields:**

- `description: string`
- `arbitrary: Arbitrary<unknown>`
- `predicate: (value: unknown) => boolean`
- `numTests: number`
- `seed?: number`

> **Note:** Property tests verify mathematical laws and invariants

## Responsibilities

### Quarrier Owns

- Arbitrary value generation
- Property-based testing primitives
- Fake data generation
- Shrinking strategies
- Generator combinators
- Triple generation for RDF/semantic testing

### Quarrier Provides

- Test data to Auditor
- Arbitrary values to Arborist for testing
- Property test definitions
- Shrinking for minimal failing cases

### Quarrier Must Never

- ❌ Parsing TypeScript/JSX directly
- ❌ Generating actual test files
- ❌ Running tests
- ❌ Coverage analysis
- ❌ Documentation generation
- ❌ Making network requests

## Implementation Rules

### Allowed Operations

- ✅ Import from @sitebender/arborist/exports/types
- ✅ Pure functional generators
- ✅ Mathematical operations
- ✅ Random number generation (seedable)

### Forbidden Operations

- ❌ Import TypeScript compiler
- ❌ Import ts-morph
- ❌ Side effects in generators
- ❌ Non-deterministic behavior without seed
- ❌ File system access
- ❌ Network access

## Output Requirements

Every output from Quarrier must:

- All generators must be pure functions
- All generators must be seedable for reproducibility
- Shrinking must preserve the failing property
- Generated values must match type constraints

## Validation Layers

### Compile-Time Validation

- TypeScript types ensure generator compatibility
- Pure function signatures enforced

### Runtime Validation

- Type constraint validation
- Seed reproducibility checks

### Test-Time Validation

- Generator determinism with seeds
- Shrinking effectiveness
- Type constraint compliance

## Authorized Consumers

### Allowed to consume Quarrier output:

- ✅ arborist
- ✅ auditor

### Forbidden from consuming Quarrier output:

- ❌ envoy
- ❌ toolsmith
- ❌ pagewright
- ❌ architect
- ❌ formulator
- ❌ agent

---

**This document is auto-generated from contract.json. DO NOT EDIT DIRECTLY.**
