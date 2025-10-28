# Artificer Calculation DSL - Implementation Checklist

> **Status**: Ready for Implementation
> **Created**: 2025-01-08
> **Purpose**: Detailed implementation checklist for JSX-based calculation DSL proof of concept

## MISTAKES TO NEVER REPEAT

**Phase 1.1/1.2 Violations Committed:**

1. **WRONG**: Created separate files `AstNode.ts`, `AsyncThunk.ts`, etc.
   **RIGHT**: Types are NAMED EXPORTS in a SINGLE `types/index.ts` file

2. **WRONG**: Assumed one type per file like functions
   **RIGHT**: ONE FUNCTION per file in `functionName/index.ts`, but MULTIPLE TYPES as named exports in `types/index.ts`

3. **WRONG**: Failed to update checklist after completing work
   **RIGHT**: ALWAYS mark checklist items [x] complete AND update documentation to reflect current state

**Remember:**

- Functions: ONE per file in `functionName/index.ts` (default export)
- Types: MULTIPLE per file in `types/index.ts` (named exports)
- Components: ONE per file in `ComponentName/index.tsx` (default export)
- Constants: MULTIPLE per file in `constants/index.ts` (named exports)
- After ANY work: UPDATE THE CHECKLIST AND DOCUMENTATION

---

## Overview

This checklist breaks down the implementation of the Artificer calculation DSL into manageable phases. Each phase is designed to be under 100k tokens and can be completed independently.

**Token Budget Guidelines:**

- **1M** = Complex tasks requiring Artificer mode (Claude Sonnet 4.5, 1M tokens)
- **CC** = Standard tasks for Code mode (Claude Code Sonnet 4.5, 200k tokens)

---

## CRITICAL RULES - READ FIRST

All implementations MUST follow these constitutional rules. Violations will be rejected.

### File Structure Rules

- **ONE function per file** - No exceptions (except currying)
- **File always named `index.ts`** in folder matching function name (camelCase)
- **Function name MUST match folder name** exactly
- **Export default on SAME LINE** as function declaration
- **Helper functions** go in `_helperName/index.ts` subfolders at LOWEST COMMON ANCESTOR

### Function Rules

- **NEVER use arrow functions** - Always `function` keyword with explicit `return`
- **ALL functions MUST be curried** - Multiple parameters = nested functions
- **Named functions only** - Every function has a meaningful name
- **Private functions** start with underscore: `_privateFunctionName`
- **Inner curried functions** named after what they CARRY, not their parameter
  - Example: `function add(augend) { return function addToAugend(addend) { ... } }`

### Comment Rules

- **NO JSDoc** - Use `//++` comment markers instead
- **One `//++` comment** immediately above each export
- **Comment describes WHAT** the function does, not how
- **Keep comments concise** - One line preferred, two max

### Naming Rules

- **Functions**: camelCase (`processData`, `validateEmail`)
- **Components**: PascalCase (`UserCard`, `DataTable`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_RETRIES`, `API_TIMEOUT`)
- **Types**: PascalCase (`AsyncThunk`, `ValidationError`)
- **NO abbreviations** except approved: min, max, id, src, dest, temp, doc, docs, spec, specs, info, config, auth, demo, sync, async, ms, sec, hr, kb, mb, gb, tb
- **Initialisms**: Sentence case (`innerHtml` not `innerHTML`, `AstNode` not `ASTNode`)

### Functional Programming Rules

- **NO classes** - Pure functions only
- **NO mutations** - All data immutable, use `Readonly<>` and `ReadonlyArray<>`
- **NO loops** - Use `map`, `filter`, `reduce`, `unfold` from Toolsmith
- **NO exceptions** - Return `Result` or `Validation` monads
- **Return types**: `Result<Error, T>` for fail-fast, `Validation<ValidationError, T>` for error accumulation

### Code Style Rules

- **NO semicolons** - ASI works perfectly
- **Tabs for indentation** in `.ts`/`.tsx` files
- **80 character line limit** for code
- **Spaces around ALL operators** - `x + y` not `x+y`
- **Trailing commas** in multi-line structures
- **NO blank lines** at start/end of blocks

---

## Example Code Structure

```typescript
import type { AsyncThunk } from "../types/AsyncThunk.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

import integer from "@sitebender/toolsmith/newtypes/numericTypes/integer/index.ts"

//++ Creates async thunk that returns a constant Integer value
export default function createFromConstantThunk(
	value: number,
): AsyncThunk<Integer> {
	return async function returnConstantWithValue(): Promise<
		Validation<ValidationError, Integer>
	> {
		return integer(value)
	}
}
```

**Note the structure:**

1. Type imports first (with `type` keyword)
2. Value imports second
3. Blank line between import groups
4. Single `//++` comment above export
5. Export default on same line as function
6. Curried structure with named inner function
7. Explicit return statements
8. No semicolons

---

## Milestone 1: Type System Foundation

**Estimated Tokens**: ~30k\
**Dependencies**: None\
**Goal**: Establish all TypeScript type definitions

### Phase 1.1: Core AST Types (CC)

- [x] Create `libraries/artificer/src/calculation/types/index.ts` with core AST types
  - Define `AstNode` base type with `id`, `type`, `sourceLocation`
  - Define `SourceLocation` type for error reporting
  - Add `//++` comment: "Base AST node type - all calculation nodes extend this"
  - Export types

- [x] Add `AsyncThunk` type to `types/index.ts`
  - Define `AsyncThunk<T>` type returning `Promise<Validation<ValidationError, T>>`
  - Add `//++` comment: "Async thunk - lazy evaluation wrapper for calculations"
  - Export type

- [x] Add `OperationNode` type to `types/index.ts`
  - Define `OperationNode` extending `AstNode`
  - Add `operation` string field and `children` readonly array field
  - Add `//++` comment: "Operation node - represents operations like Add, Multiply"
  - Export type

- [x] Add `DataSourceNode` type to `types/index.ts`
  - Define `DataSourceNode` extending `AstNode`
  - Add `source` string field and `config` object
  - Define `DataSourceConfig` type with optional fields
  - Add `//++` comments for each type
  - Export types

### Phase 1.2: Schema and Registry Types (CC)

- [x] Add `ComponentSchema` types to `types/index.ts`
  - Define `ComponentSchema` type with validation function
  - Define `ComponentCategory` union type
  - Define `ChildrenSpec` discriminated union
  - Define `AttributeSpec` type
  - Add `//++` comments for each type
  - Export all types

- [x] Add `Registry` type to `types/index.ts`
  - Define `Registry` type with immutable Map
  - Add `//++` comment explaining registry purpose
  - Export type

- [x] Add `CalculationIr` type to `types/index.ts`
  - Define intermediate representation type with root IrNode
  - Define `IrNode` type with name, attributes, children, sourceLocation
  - Add `//++` comments explaining IR purpose
  - Export types

---

## Milestone 2: Component Registry System

**Estimated Tokens**: ~40k\
**Dependencies**: Milestone 1\
**Goal**: Implement pure functional registry for component schemas

### Phase 2.1: Registry Core Functions (CC)

- [x] Create `libraries/artificer/src/calculation/registry/createRegistry.ts`
  - Implement function returning empty Registry
  - Add `//++` comment: "Creates an empty component registry"
  - Export function

- [ ] Create `libraries/artificer/src/calculation/registry/registerSchema.ts`
  - Implement curried function: `schema → registry → newRegistry`
  - Use immutable Map operations
  - Add `//++` comment: "Registers a component schema in the registry"
  - Export function

- [ ] Create `libraries/artificer/src/calculation/registry/getSchema.ts`
  - Implement curried function: `name → registry → schema | undefined`
  - Add `//++` comment: "Gets a component schema from the registry"
  - Export function

- [ ] Create `libraries/artificer/src/calculation/registry/validateComponent.ts`
  - Implement curried function: `name → registry → Validation<ValidationError, ComponentSchema>`
  - Use Toolsmith's `success` and `failure` functions
  - Generate helpful error with available component names
  - Add `//++` comment: "Validates that a component exists in the registry"
  - Export function

### Phase 2.2: Component Schemas (CC)

- [ ] Create `libraries/artificer/src/calculation/registry/schemas/addSchema.ts`
  - Define Add operation schema
  - Specify exact children: Augend, Addend
  - Set returnType to "Integer"
  - Implement basic validate function (can be TODO initially)
  - Add `//++` comment: "Schema for Add operation component"
  - Export function

- [ ] Create `libraries/artificer/src/calculation/registry/schemas/multiplySchema.ts`
  - Define Multiply operation schema
  - Specify exact children: Multiplicand, Multiplier
  - Set returnType to "Integer"
  - Implement basic validate function (can be TODO initially)
  - Add `//++` comment: "Schema for Multiply operation component"
  - Export function

- [ ] Create `libraries/artificer/src/calculation/registry/schemas/augendSchema.ts`
  - Define Augend container schema
  - Specify single child requirement
  - Add `//++` comment: "Schema for Augend container component"
  - Export function

- [ ] Create `libraries/artificer/src/calculation/registry/schemas/addendSchema.ts`
  - Define Addend container schema
  - Specify single child requirement
  - Add `//++` comment: "Schema for Addend container component"
  - Export function

- [ ] Create `libraries/artificer/src/calculation/registry/schemas/multiplicandSchema.ts`
  - Define Multiplicand container schema
  - Specify single child requirement
  - Add `//++` comment: "Schema for Multiplicand container component"
  - Export function

- [ ] Create `libraries/artificer/src/calculation/registry/schemas/multiplierSchema.ts`
  - Define Multiplier container schema
  - Specify single child requirement
  - Add `//++` comment: "Schema for Multiplier container component"
  - Export function

- [ ] Create `libraries/artificer/src/calculation/registry/schemas/fromLocalStorageSchema.ts`
  - Define FromLocalStorage data source schema
  - Require 'key' attribute
  - No children allowed
  - Set returnType to "Integer"
  - Add `//++` comment: "Schema for FromLocalStorage data source component"
  - Export function

- [ ] Create `libraries/artificer/src/calculation/registry/schemas/fromConstantSchema.ts`
  - Define FromConstant data source schema
  - Require 'value' attribute
  - No children allowed
  - Set returnType to "Integer"
  - Add `//++` comment: "Schema for FromConstant data source component"
  - Export function

---

## Milestone 3: Data Source Implementations

**Estimated Tokens**: ~35k\
**Dependencies**: Milestone 1\
**Goal**: Implement async thunk creators for data sources

### Phase 3.1: LocalStorage Data Source (CC)

- [ ] Create `libraries/artificer/src/calculation/dataSources/createFromLocalStorageThunk.ts`
  - Implement function: `key → AsyncThunk<Integer>`
  - Use Toolsmith's `parseJson` for JSON parsing
  - Use Toolsmith's `integer` smart constructor for validation
  - Return helpful errors for missing keys
  - Return helpful errors for invalid JSON
  - Return helpful errors for non-number values
  - Add `[IO]` comment marking side effects
  - Add `//++` comment: "Creates async thunk that fetches Integer from localStorage"
  - Export function

### Phase 3.2: Constant Data Source (CC)

- [ ] Create `libraries/artificer/src/calculation/dataSources/createFromConstantThunk.ts`
  - Implement function: `value → AsyncThunk<Integer>`
  - Use Toolsmith's `integer` smart constructor
  - Validate at thunk creation time
  - Add `//++` comment: "Creates async thunk that returns a constant Integer value"
  - Export function

---

## Milestone 4: Operation Implementations

**Estimated Tokens**: ~35k\
**Dependencies**: Milestone 1, Milestone 3\
**Goal**: Implement async thunk creators for arithmetic operations

### Phase 4.1: Addition Operation (CC)

- [ ] Create `libraries/artificer/src/calculation/operations/createAddThunk.ts`
  - Implement curried function: `augendThunk → addendThunk → AsyncThunk<Integer>`
  - Execute both child thunks
  - Use Toolsmith's `chain` for sequential composition
  - Use Toolsmith's `addInteger` for the operation
  - Handle validation errors properly
  - Add `//++` comment: "Creates async thunk that adds two Integers"
  - Export function

### Phase 4.2: Multiplication Operation (CC)

- [ ] Create `libraries/artificer/src/calculation/operations/createMultiplyThunk.ts`
  - Implement curried function: `multiplicandThunk → multiplierThunk → AsyncThunk<Integer>`
  - Execute both child thunks
  - Use Toolsmith's `chain` for sequential composition
  - Use Toolsmith's `multiplyInteger` for the operation
  - Handle validation errors properly
  - Add `//++` comment: "Creates async thunk that multiplies two Integers"
  - Export function

---

## Milestone 5: Parser (JSX → IR)

**Estimated Tokens**: ~80k\
**Dependencies**: Milestone 1, Milestone 2\
**Goal**: Parse JSX DSL to intermediate representation

### Phase 5.1: JSX Extraction Helper (1M)

**Complexity**: High - requires understanding Arborist AST structure

- [ ] Create `libraries/artificer/src/calculation/parser/_extractJsxElements/index.ts`
  - Analyze Arborist's AST output format for JSX
  - Implement function to extract JSX elements from Arborist AST
  - Handle nested JSX structures
  - Preserve source location information
  - Return structured data suitable for IR conversion
  - Add `//++` comment describing extraction purpose
  - Export function

### Phase 5.2: Semantic Validation (1M)

**Complexity**: High - requires registry integration and validation logic

- [ ] Create `libraries/artificer/src/calculation/parser/validateSemantics.ts`
  - Implement function: `jsxElements → registry → Validation<ValidationError, void>`
  - Validate component names exist in registry
  - Validate required attributes are present
  - Validate children match schema requirements
  - Accumulate all validation errors
  - Generate helpful error messages with source locations
  - Add `//++` comment describing validation purpose
  - Export function

### Phase 5.3: Main Parser (1M)

**Complexity**: High - orchestrates multiple steps

- [ ] Create `libraries/artificer/src/calculation/parser/parseJsxToIr.ts`
  - Implement function: `jsxString → registry → Validation<ValidationError, CalculationIr>`
  - Use Arborist to parse JSX string
  - Extract JSX elements using helper
  - Validate semantics
  - Convert to IR structure
  - Handle all error cases
  - Add `//++` comment describing parser purpose
  - Export function

---

## Milestone 6: Transformer (IR → Typed AST)

**Estimated Tokens**: ~75k\
**Dependencies**: Milestone 5\
**Goal**: Transform IR to strongly-typed AST

### Phase 6.1: AST Node Creator Helper (CC)

- [ ] Create `libraries/artificer/src/calculation/transformer/_createAstNode/index.ts`
  - Implement function to create typed AST nodes
  - Generate unique node IDs
  - Preserve source location information
  - Handle different node types (Operation, DataSource)
  - Add `//++` comment describing node creation
  - Export function

### Phase 6.2: Type Checking (1M)

**Complexity**: High - requires type inference and validation

- [ ] Create `libraries/artificer/src/calculation/transformer/typeCheck.ts`
  - Implement function: `irNode → registry → Validation<ValidationError, string>`
  - Infer return types from operations
  - Validate type compatibility between parent and children
  - Check that data sources return expected types
  - Generate helpful type mismatch errors
  - Add `//++` comment describing type checking
  - Export function

### Phase 6.3: Main Transformer (1M)

**Complexity**: High - recursive tree transformation

- [ ] Create `libraries/artificer/src/calculation/transformer/transformToAst.ts`
  - Implement function: `ir → registry → Validation<ValidationError, AstNode>`
  - Recursively transform IR nodes to AST nodes
  - Perform type checking during transformation
  - Build typed AST tree bottom-up
  - Accumulate validation errors
  - Add `//++` comment describing transformation
  - Export function

---

## Milestone 7: Compiler (AST → Executable Thunk)

**Estimated Tokens**: ~90k\
**Dependencies**: Milestone 4, Milestone 6\
**Goal**: Compile AST to executable async thunk with optimizations

### Phase 7.1: AST Traversal Helper (CC)

- [ ] Create `libraries/artificer/src/calculation/compiler/_traverseAst/index.ts`
  - Implement generic AST traversal function
  - Support pre-order and post-order traversal
  - Collect nodes matching predicate
  - Add `//++` comment describing traversal
  - Export function

### Phase 7.2: Parallel Fetch Identification (CC)

- [ ] Create `libraries/artificer/src/calculation/compiler/identifyParallelFetches.ts`
  - Implement function: `ast → ReadonlyArray<DataSourceNode>`
  - Use traversal helper to find all DataSourceNode instances
  - Return array of data source nodes
  - Add `//++` comment describing identification
  - Export function

### Phase 7.3: Parallel Fetch Execution (1M)

**Complexity**: High - requires Promise.all coordination and error handling

- [ ] Create `libraries/artificer/src/calculation/compiler/executeParallelFetches.ts`
  - Implement function: `sources → AsyncThunk<ReadonlyMap<string, unknown>>`
  - Create thunks for each data source
  - Execute all thunks with Promise.all
  - Use Toolsmith's `combineValidations` for error accumulation
  - Return map of node ID to fetched value
  - Handle partial failures gracefully
  - Add `//++` comment describing parallel execution
  - Export function

### Phase 7.4: Constant Folding Optimization (CC)

- [ ] Create `libraries/artificer/src/calculation/compiler/foldConstants.ts`
  - Implement function: `ast → ast` (pure transformation)
  - Identify operations with all constant children
  - Evaluate at compile time
  - Replace operation nodes with constant nodes
  - Add `//++` comment describing optimization
  - Export function

### Phase 7.5: Main Compiler (1M)

**Complexity**: Very High - orchestrates compilation strategy

- [ ] Create `libraries/artificer/src/calculation/compiler/compileToThunk.ts`
  - Implement function: `ast → AsyncThunk<T>`
  - Identify parallel fetches
  - Execute fetches concurrently
  - Build thunk tree bottom-up using fetched values
  - Apply operations using operation thunk creators
  - Return final executable thunk
  - Handle all error cases
  - Add `//++` comment describing compilation
  - Export function

---

## Milestone 8: Architect Integration

**Estimated Tokens**: ~15k\
**Dependencies**: Milestone 7\
**Goal**: Integrate compiled thunks with Architect

### Phase 8.1: DOM Attachment (CC)

- [ ] Create `libraries/artificer/src/integration/architect/attachCalculation.ts`
  - Implement function: `thunk → element → void`
  - Attach thunk to element's `__sbCalculate` property
  - Add `[IO]` comment marking side effects
  - Add `//++` comment explaining Architect integration
  - Export function

---

## Milestone 9: End-to-End Integration & Testing

**Estimated Tokens**: ~60k\
**Dependencies**: All previous milestones\
**Goal**: Create working demo and comprehensive tests

### Phase 9.1: Registry Initialization (CC)

- [ ] Create `libraries/artificer/src/calculation/registry/initializeDefaultRegistry.ts`
  - Create function that builds registry with all schemas
  - Register Add, Multiply operations
  - Register Augend, Addend, Multiplicand, Multiplier containers
  - Register FromLocalStorage, FromConstant data sources
  - Add `//++` comment describing initialization
  - Export function

### Phase 9.2: Main API Entry Point (CC)

- [ ] Create `libraries/artificer/src/calculation/index.ts`
  - Export main compilation pipeline function
  - Compose: parse → transform → compile
  - Provide convenient API for common use cases
  - Export all necessary types
  - Add `//++` comments for exports

### Phase 9.3: Demo Application (1M)

**Complexity**: High - requires full integration

- [ ] Create demo HTML file with JSX calculation
  - Use the example from plan.md: `a + (b * c)`
  - Set up localStorage with test values
  - Compile calculation to thunk
  - Attach to DOM element
  - Execute and display result
  - Handle and display errors

### Phase 9.4: Unit Tests (CC)

- [ ] Write tests for registry functions
- [ ] Write tests for data source thunks
- [ ] Write tests for operation thunks
- [ ] Write tests for parser
- [ ] Write tests for transformer
- [ ] Write tests for compiler

### Phase 9.5: Integration Tests (1M)

**Complexity**: High - tests full pipeline

- [ ] Test complete compilation pipeline
- [ ] Test error handling at each stage
- [ ] Test parallel fetch optimization
- [ ] Test type checking
- [ ] Test validation error accumulation

---

## Milestone 10: Documentation & Polish

**Estimated Tokens**: ~30k\
**Dependencies**: Milestone 9\
**Goal**: Complete documentation and examples

### Phase 10.1: API Documentation (CC)

- [ ] Document all public APIs with `//++` comments
- [ ] Create usage examples for each component
- [ ] Document error codes and messages
- [ ] Create troubleshooting guide

### Phase 10.2: Architecture Documentation (CC)

- [ ] Update README with architecture overview
- [ ] Create diagrams showing data flow
- [ ] Document extension points for new operations
- [ ] Document extension points for new data sources

### Phase 10.3: Examples (CC)

- [ ] Create example: Simple addition
- [ ] Create example: Nested operations
- [ ] Create example: Multiple data sources
- [ ] Create example: Error handling

---

## Summary

### Token Budget by Milestone

| Milestone         | Estimated Tokens | Complexity |
| ----------------- | ---------------- | ---------- |
| 1. Type System    | ~30k             | CC         |
| 2. Registry       | ~40k             | CC         |
| 3. Data Sources   | ~35k             | CC         |
| 4. Operations     | ~35k             | CC         |
| 5. Parser         | ~80k             | 1M         |
| 6. Transformer    | ~75k             | 1M         |
| 7. Compiler       | ~90k             | 1M         |
| 8. Integration    | ~15k             | CC         |
| 9. Testing        | ~60k             | 1M         |
| 10. Documentation | ~30k             | CC         |
| **Total**         | **~490k**        | Mixed      |

### Task Distribution

- **1M Tasks (Artificer Mode)**: 8 phases requiring complex logic, orchestration, or deep integration
- **CC Tasks (Code Mode)**: 35+ phases for straightforward implementation following clear specifications

### Critical Path

1. Complete Milestones 1-4 (foundation) - Can be done in parallel by Code mode
2. Complete Milestone 5 (parser) - Requires Artificer mode
3. Complete Milestone 6 (transformer) - Requires Artificer mode
4. Complete Milestone 7 (compiler) - Requires Artificer mode
5. Complete Milestones 8-10 (integration, testing, docs) - Mix of modes

### Notes

- Each phase is designed to be independently testable
- Phases within milestones can often be done in parallel
- All 1M tasks are marked and should be done by Artificer mode
- CC tasks follow clear specifications and can be done by Code mode
- The implementation follows strict FP principles throughout
- All functions are curried and use Toolsmith utilities
- Error handling uses Validation monad for accumulation
- No mutations, no classes, no loops, no exceptions
- Use `//++` comments, NOT JSDoc
