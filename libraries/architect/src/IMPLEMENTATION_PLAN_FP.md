# Architect Library - Calculation DSL Implementation Plan (Pure FP)

> **Status**: Architectural Blueprint for PoC  
> **Created**: 2025-01-07  
> **Purpose**: Complete implementation plan for JSX-based calculation DSL using pure functional programming

## Overview

This document provides a comprehensive implementation plan for Architect's calculation DSL, which enables developers to write calculations as declarative JSX that compiles to executable async thunks. This implementation follows **strict functional programming principles**: no classes, no mutations, no loops, no exceptions, all functions curried, immutable data only.

## Architecture Summary

```
JSX DSL (Developer writes)
    ↓
Arborist (Syntax parsing)
    ↓
Semantic Validator (Structure validation)
    ↓
Domain IR (Intermediate representation)
    ↓
Typed AST (Strongly-typed calculation tree)
    ↓
Compiler (AST → Async Thunk)
    ↓
Executable Function (Returns Validation<ValidationError, T>)
    ↓
Pagewright Integration (__sbCalculate property)
```

## Folder Hierarchy

```
libraries/architect/src/
├── calculation/                            # Calculation DSL implementation
│   ├── types/                              # Type definitions (one per file)
│   │   ├── AstNode.ts                      # Base AST node type
│   │   ├── OperationNode.ts                # Operation node type
│   │   ├── DataSourceNode.ts               # Data source node type
│   │   ├── CalculationIr.ts                # Intermediate representation type
│   │   ├── ComponentSchema.ts              # Component schema type
│   │   ├── Registry.ts                     # Registry type
│   │   └── AsyncThunk.ts                   # Async thunk type
│   │
│   ├── registry/                           # Component registry (pure functions)
│   │   ├── createRegistry.ts               # Creates empty registry
│   │   ├── registerSchema.ts               # Registers schema (returns new registry)
│   │   ├── getSchema.ts                    # Gets schema from registry
│   │   ├── validateComponent.ts            # Validates component exists
│   │   └── schemas/                        # Component schemas
│   │       ├── addSchema.ts                # Add operation schema
│   │       ├── multiplySchema.ts           # Multiply operation schema
│   │       ├── augendSchema.ts             # Augend container schema
│   │       ├── addendSchema.ts             # Addend container schema
│   │       ├── multiplicandSchema.ts       # Multiplicand container schema
│   │       ├── multiplierSchema.ts         # Multiplier container schema
│   │       ├── fromLocalStorageSchema.ts   # FromLocalStorage schema
│   │       └── fromConstantSchema.ts       # FromConstant schema
│   │
│   ├── parser/                             # JSX → IR transformation
│   │   ├── parseJsxToIr.ts                 # Main parser entry point
│   │   ├── validateSemantics.ts            # Semantic validation
│   │   └── _extractJsxElements/            # Private helper
│   │       └── index.ts                    # Extracts JSX from Arborist AST
│   │
│   ├── transformer/                        # IR → Typed AST transformation
│   │   ├── transformToAst.ts               # Main transformer entry point
│   │   ├── typeCheck.ts                    # Type checking logic
│   │   └── _createAstNode/                 # Private helper
│   │       └── index.ts                    # Creates typed AST nodes
│   │
│   ├── compiler/                           # AST → Executable thunk compilation
│   │   ├── compileToThunk.ts               # Main compiler entry point
│   │   ├── identifyParallelFetches.ts      # Finds independent data sources
│   │   ├── executeParallelFetches.ts       # Executes parallel fetches
│   │   ├── foldConstants.ts                # Constant folding optimization
│   │   └── _traverseAst/                   # Private helper
│   │       └── index.ts                    # AST traversal utility
│   │
│   ├── dataSources/                        # Data source implementations
│   │   ├── createFromLocalStorageThunk.ts  # localStorage injector
│   │   ├── createFromConstantThunk.ts      # Constant value injector
│   │   ├── createFromCookieThunk.ts        # Cookie injector (future)
│   │   ├── createFromQueryStringThunk.ts   # Query string injector (future)
│   │   └── createFromArgumentThunk.ts      # Function argument injector (future)
│   │
│   └── operations/                         # Operation implementations
│       ├── createAddThunk.ts               # Addition operation
│       ├── createMultiplyThunk.ts          # Multiplication operation
│       ├── createSubtractThunk.ts          # Subtraction (future)
│       └── createDivideThunk.ts            # Division (future)
│
├── integration/                            # Integration with other libraries
│   └── pagewright/                         # Pagewright integration
│       └── attachCalculation.ts            # Attach thunk to DOM property
│
└── [existing files]                        # Existing Architect files
    └── plan.md                             # Current planning document
```

## Phase 1: Type System

### Core Types

**File**: `libraries/architect/src/calculation/types/AstNode.ts`

```typescript
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

//++ Base AST node type - all calculation nodes extend this
export type AstNode = Readonly<{
  id: string                              // Unique node identifier
  type: string                            // Node type (Add, Multiply, FromLocalStorage, etc.)
  sourceLocation?: SourceLocation         // Original JSX location for error reporting
}>

//++ Source location for error reporting
export type SourceLocation = Readonly<{
  line: number
  column: number
  file: string
}>
```

**File**: `libraries/architect/src/calculation/types/AsyncThunk.ts`

```typescript
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

//++ Async thunk - lazy evaluation wrapper for calculations
//++ Returns Validation monad for error handling
export type AsyncThunk<T> = {
  (): Promise<Validation<ValidationError, T>>
}
```

**File**: `libraries/architect/src/calculation/types/OperationNode.ts`

```typescript
import type { AstNode } from "./AstNode.ts"

//++ Operation node - represents operations like Add, Multiply
//++ Has children that must be evaluated before applying operation
export type OperationNode = AstNode & Readonly<{
  operation: string                       // Operation name (add, multiply, etc.)
  children: ReadonlyArray<AstNode>        // Child nodes to evaluate
}>
```

**File**: `libraries/architect/src/calculation/types/DataSourceNode.ts`

```typescript
import type { AstNode } from "./AstNode.ts"

//++ Data source node - fetches data asynchronously
//++ Represents sources like localStorage, cookies, query strings
export type DataSourceNode = AstNode & Readonly<{
  source: string                          // Source type (localStorage, cookie, etc.)
  config: DataSourceConfig                // Source-specific configuration
}>

//++ Configuration for data sources
export type DataSourceConfig = Readonly<{
  key?: string                            // For localStorage, cookie, etc.
  path?: string                           // For path segments
  selector?: string                       // For HTML elements
  value?: unknown                         // For constants
}>
```

**File**: `libraries/architect/src/calculation/types/ComponentSchema.ts`

```typescript
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

//++ Component schema - defines structure and validation rules for JSX components
export type ComponentSchema = Readonly<{
  name: string                            // Component name (Add, Multiply, etc.)
  category: ComponentCategory             // Operation, DataSource, or Container
  children: ChildrenSpec                  // Children requirements
  attributes: AttributeSpec               // Attribute requirements
  returnType: string                      // Expected return type
  validate: (node: unknown) => Validation<ValidationError, void>
}>

//++ Component category
export type ComponentCategory = "Operation" | "DataSource" | "Container"

//++ Children specification
export type ChildrenSpec = 
  | Readonly<{ type: "none" }>                                    // No children allowed
  | Readonly<{ type: "exact"; count: number; names: ReadonlyArray<string> }>  // Exact children
  | Readonly<{ type: "any"; min?: number; max?: number }>         // Any children with constraints

//++ Attribute specification
export type AttributeSpec = Readonly<{
  required: ReadonlyArray<string>
  optional: ReadonlyArray<string>
  types: Readonly<Record<string, string>>  // attribute name → type
}>
```

**File**: `libraries/architect/src/calculation/types/Registry.ts`

```typescript
import type { ComponentSchema } from "./ComponentSchema.ts"

//++ Component registry - immutable map of component schemas
export type Registry = Readonly<{
  schemas: ReadonlyMap<string, ComponentSchema>
}>
```

## Phase 2: Registry (Pure Functions)

### Create Registry

**File**: `libraries/architect/src/calculation/registry/createRegistry.ts`

```typescript
import type { Registry } from "../types/Registry.ts"

//++ Creates an empty component registry
export default function createRegistry(): Registry {
  return {
    schemas: new Map()
  }
}
```

### Register Schema

**File**: `libraries/architect/src/calculation/registry/registerSchema.ts`

```typescript
import type { ComponentSchema } from "../types/ComponentSchema.ts"
import type { Registry } from "../types/Registry.ts"

//++ Registers a component schema in the registry
//++ Returns new registry with schema added (immutable)
export default function registerSchema(schema: ComponentSchema) {
  return function withRegistry(registry: Registry): Registry {
    return {
      schemas: new Map([...registry.schemas, [schema.name, schema]])
    }
  }
}
```

### Get Schema

**File**: `libraries/architect/src/calculation/registry/getSchema.ts`

```typescript
import type { ComponentSchema } from "../types/ComponentSchema.ts"
import type { Registry } from "../types/Registry.ts"

//++ Gets a component schema from the registry
//++ Returns undefined if schema not found
export default function getSchema(name: string) {
  return function fromRegistry(registry: Registry): ComponentSchema | undefined {
    return registry.schemas.get(name)
  }
}
```

### Validate Component

**File**: `libraries/architect/src/calculation/registry/validateComponent.ts`

```typescript
import type { ComponentSchema } from "../types/ComponentSchema.ts"
import type { Registry } from "../types/Registry.ts"
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import failure from "@sitebender/toolsmith/monads/validation/failure/index.ts"
import getSchema from "./getSchema.ts"
import isDefined from "@sitebender/toolsmith/validation/isDefined/index.ts"
import map from "@sitebender/toolsmith/array/map/index.ts"
import join from "@sitebender/toolsmith/array/join/index.ts"

//++ Validates that a component exists in the registry
//++ Returns Success with schema or Failure with helpful error
export default function validateComponent(name: string) {
  return function inRegistry(
    registry: Registry
  ): Validation<ValidationError, ComponentSchema> {
    const schema = getSchema(name)(registry)
    
    // Happy path first
    if (isDefined(schema)) {
      return success(schema)
    }
    
    // Sad path: component not found
    const allNames = Array.from(registry.schemas.keys())
    const namesList = join(", ")(allNames)
    
    return failure([{
      code: "UNKNOWN_COMPONENT",
      field: "component",
      messages: [`Unknown component: ${name}`],
      received: name,
      expected: `One of: ${namesList}`,
      suggestion: "Check component name spelling or register the component",
      severity: "requirement"
    }])
  }
}
```

## Phase 3: Component Schemas

### Add Operation Schema

**File**: `libraries/architect/src/calculation/registry/schemas/addSchema.ts`

```typescript
import type { ComponentSchema } from "../../types/ComponentSchema.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"

//++ Schema for Add operation component
//++ Requires exactly two children: Augend and Addend
export default function addSchema(): ComponentSchema {
  return {
    name: "Add",
    category: "Operation",
    children: {
      type: "exact",
      count: 2,
      names: ["Augend", "Addend"]
    },
    attributes: {
      required: [],
      optional: [],
      types: {}
    },
    returnType: "Integer",
    validate: function validateAddNode(node: unknown) {
      // TODO: Implement validation logic
      return success(undefined)
    }
  }
}
```

### Multiply Operation Schema

**File**: `libraries/architect/src/calculation/registry/schemas/multiplySchema.ts`

```typescript
import type { ComponentSchema } from "../../types/ComponentSchema.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"

//++ Schema for Multiply operation component
//++ Requires exactly two children: Multiplicand and Multiplier
export default function multiplySchema(): ComponentSchema {
  return {
    name: "Multiply",
    category: "Operation",
    children: {
      type: "exact",
      count: 2,
      names: ["Multiplicand", "Multiplier"]
    },
    attributes: {
      required: [],
      optional: [],
      types: {}
    },
    returnType: "Integer",
    validate: function validateMultiplyNode(node: unknown) {
      // TODO: Implement validation logic
      return success(undefined)
    }
  }
}
```

### FromLocalStorage Schema

**File**: `libraries/architect/src/calculation/registry/schemas/fromLocalStorageSchema.ts`

```typescript
import type { ComponentSchema } from "../../types/ComponentSchema.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"

//++ Schema for FromLocalStorage data source component
//++ Requires 'key' attribute, no children allowed
export default function fromLocalStorageSchema(): ComponentSchema {
  return {
    name: "FromLocalStorage",
    category: "DataSource",
    children: {
      type: "none"
    },
    attributes: {
      required: ["key"],
      optional: [],
      types: {
        key: "string"
      }
    },
    returnType: "Integer",
    validate: function validateFromLocalStorageNode(node: unknown) {
      // TODO: Implement validation logic
      return success(undefined)
    }
  }
}
```

## Phase 4: Data Source Implementations

### FromLocalStorage Thunk Creator

**File**: `libraries/architect/src/calculation/dataSources/createFromLocalStorageThunk.ts`

```typescript
import type { AsyncThunk } from "../types/AsyncThunk.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import integer from "@sitebender/toolsmith/newtypes/numericTypes/integer/index.ts"
import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import failure from "@sitebender/toolsmith/monads/validation/failure/index.ts"
import isNull from "@sitebender/toolsmith/validation/isNull/index.ts"
import isNumber from "@sitebender/toolsmith/validation/isNumber/index.ts"
import parseJson from "@sitebender/toolsmith/conversion/parseJson/index.ts"

//++ Creates async thunk that fetches Integer from localStorage
//++ Returns Validation with helpful errors for missing keys or invalid data
export default function createFromLocalStorageThunk(key: string): AsyncThunk<Integer> {
  return async function fetchFromLocalStorageWithKey(): Promise<Validation<ValidationError, Integer>> {
    // [IO] This function performs side effects (localStorage access)
    
    const raw = localStorage.getItem(key)
    
    // Happy path: key exists
    if (isNull(raw)) {
      // Sad path: key not found
      return failure([{
        code: "LOCALSTORAGE_KEY_NOT_FOUND",
        field: "localStorage",
        messages: [`Key "${key}" not found in localStorage`],
        received: null,
        expected: "JSON string containing a number",
        suggestion: `Set localStorage.setItem("${key}", "42") before using this calculation`,
        severity: "requirement"
      }])
    }
    
    // Parse JSON (using parseJson helper that wraps exception at IO boundary)
    const parseResult = parseJson(raw)
    
    if (parseResult._tag === "Error") {
      return failure([{
        code: "LOCALSTORAGE_INVALID_JSON",
        field: "localStorage",
        messages: [`Value for key "${key}" is not valid JSON`],
        received: raw,
        expected: "Valid JSON string",
        suggestion: "Ensure the value is properly JSON-encoded",
        severity: "requirement"
      }])
    }
    
    const parsed = parseResult.value
    
    // Validate as number
    if (isNumber(parsed)) {
      // Happy path: valid number, validate as Integer
      return integer(parsed)
    }
    
    // Sad path: not a number
    return failure([{
      code: "LOCALSTORAGE_INVALID_TYPE",
      field: "localStorage",
      messages: [`Value for key "${key}" is not a number`],
      received: parsed,
      expected: "number",
      suggestion: "Store a number value in localStorage",
      severity: "requirement"
    }])
  }
}
```

### FromConstant Thunk Creator

**File**: `libraries/architect/src/calculation/dataSources/createFromConstantThunk.ts`

```typescript
import type { AsyncThunk } from "../types/AsyncThunk.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import integer from "@sitebender/toolsmith/newtypes/numericTypes/integer/index.ts"

//++ Creates async thunk that returns a constant Integer value
//++ Validates the constant at thunk creation time
export default function createFromConstantThunk(value: number): AsyncThunk<Integer> {
  return async function returnConstantWithValue(): Promise<Validation<ValidationError, Integer>> {
    // Validate constant value using smart constructor
    return integer(value)
  }
}
```

## Phase 5: Operation Implementations

### Add Operation Thunk Creator

**File**: `libraries/architect/src/calculation/operations/createAddThunk.ts`

```typescript
import type { AsyncThunk } from "../types/AsyncThunk.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import addInteger from "@sitebender/toolsmith/math/arithmetic/add/addInteger.ts"
import chain from "@sitebender/toolsmith/monads/validation/chain/index.ts"

//++ Creates async thunk that adds two Integers
//++ Uses chain for sequential composition (fail-fast on errors)
export default function createAddThunk(
  augendThunk: AsyncThunk<Integer>
) {
  return function addThunkWithAugend(
    addendThunk: AsyncThunk<Integer>
  ): AsyncThunk<Integer> {
    return async function executeAddition(): Promise<Validation<ValidationError, Integer>> {
      // Execute child thunks
      const augendValidation = await augendThunk()
      const addendValidation = await addendThunk()
      
      // Use chain for sequential composition (fail-fast)
      return chain(function applyAddition(augend: Integer) {
        return chain(function addToAugend(addend: Integer) {
          return addInteger(augend)(addend)
        })(addendValidation)
      })(augendValidation)
    }
  }
}
```

### Multiply Operation Thunk Creator

**File**: `libraries/architect/src/calculation/operations/createMultiplyThunk.ts`

```typescript
import type { AsyncThunk } from "../types/AsyncThunk.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import multiplyInteger from "@sitebender/toolsmith/math/arithmetic/multiply/multiplyInteger.ts"
import chain from "@sitebender/toolsmith/monads/validation/chain/index.ts"

//++ Creates async thunk that multiplies two Integers
//++ Uses chain for sequential composition (fail-fast on errors)
export default function createMultiplyThunk(
  multiplicandThunk: AsyncThunk<Integer>
) {
  return function multiplyThunkWithMultiplicand(
    multiplierThunk: AsyncThunk<Integer>
  ): AsyncThunk<Integer> {
    return async function executeMultiplication(): Promise<Validation<ValidationError, Integer>> {
      // Execute child thunks
      const multiplicandValidation = await multiplicandThunk()
      const multiplierValidation = await multiplierThunk()
      
      // Use chain for sequential composition (fail-fast)
      return chain(function applyMultiplication(multiplicand: Integer) {
        return chain(function multiplyByMultiplier(multiplier: Integer) {
          return multiplyInteger(multiplicand)(multiplier)
        })(multiplierValidation)
      })(multiplicandValidation)
    }
  }
}
```

## Phase 6: Compiler

### Identify Parallel Fetches

**File**: `libraries/architect/src/calculation/compiler/identifyParallelFetches.ts`

```typescript
import type { AstNode } from "../types/AstNode.ts"
import type { DataSourceNode } from "../types/DataSourceNode.ts"

import filter from "@sitebender/toolsmith/array/filter/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"

//++ Identifies all data source nodes in AST for parallel fetching
//++ Traverses tree to find all leaf nodes that fetch data
export default function identifyParallelFetches(ast: AstNode): ReadonlyArray<DataSourceNode> {
  // TODO: Implement tree traversal
  // Use reduce to accumulate data source nodes
  // Filter nodes where category is "DataSource"
  return []
}

//++ Helper: Checks if node is a data source
function isDataSourceNode(node: AstNode): node is DataSourceNode {
  return isEqual("DataSource")((node as DataSourceNode).source)
}
```

### Execute Parallel Fetches

**File**: `libraries/architect/src/calculation/compiler/executeParallelFetches.ts`

```typescript
import type { DataSourceNode } from "../types/DataSourceNode.ts"
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import combineValidations from "@sitebender/toolsmith/monads/validation/combineValidations/index.ts"

//++ Executes all data source fetches in parallel
//++ Uses Promise.all for concurrency, combineValidations for error accumulation
export default function executeParallelFetches(
  sources: ReadonlyArray<DataSourceNode>
) {
  return async function fetchAll(): Promise<
    Validation<ValidationError, ReadonlyMap<string, unknown>>
  > {
    // TODO: Implement parallel execution
    // 1. Create fetch promises for all sources
    // 2. Execute with Promise.all()
    // 3. Use combineValidations to accumulate errors
    // 4. Return map of node ID → fetched value
    throw new Error("Not implemented")
  }
}
```

### Compile to Thunk

**File**: `libraries/architect/src/calculation/compiler/compileToThunk.ts`

```typescript
import type { AstNode } from "../types/AstNode.ts"
import type { AsyncThunk } from "../types/AsyncThunk.ts"
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import identifyParallelFetches from "./identifyParallelFetches.ts"
import executeParallelFetches from "./executeParallelFetches.ts"

//++ Compiles AST to executable async thunk
//++ Strategy: Identify parallel fetches, execute concurrently, apply operations bottom-up
export default function compileToThunk<T>(ast: AstNode): AsyncThunk<T> {
  return async function executeCalculation(): Promise<Validation<ValidationError, T>> {
    // 1. Identify all data source nodes for parallel fetching
    const dataSources = identifyParallelFetches(ast)
    
    // 2. Execute all fetches in parallel
    const fetchResults = await executeParallelFetches(dataSources)()
    
    // 3. TODO: Apply operations bottom-up using fetched values
    // 4. TODO: Return final result
    
    throw new Error("Not implemented")
  }
}
```

## Phase 7: Integration with Pagewright

### Attach Calculation

**File**: `libraries/architect/src/integration/pagewright/attachCalculation.ts`

```typescript
import type { AsyncThunk } from "../../calculation/types/AsyncThunk.ts"

//++ Attaches compiled calculation thunk to DOM element as __sbCalculate property
//++ [IO] This function performs side effects (DOM manipulation)
export default function attachCalculation<T>(thunk: AsyncThunk<T>) {
  return function toElement(element: HTMLElement): void {
    // Attach thunk to element's __sbCalculate property
    // TypeScript doesn't know about custom properties, so we use any
    (element as any).__sbCalculate = thunk
  }
}
```

## Implementation Notes

### Toolsmith Functions Needed

The following Toolsmith functions are referenced but may need implementation:

1. **Array Operations**
   - `filter` - Filter array by predicate
   - `map` - Transform array elements
   - `reduce` - Reduce array to single value
   - `find` - Find first matching element

2. **Validation**
   - `isDefined` - Check if value is not null/undefined
   - `isNull` - Check if value is null
   - `isNumber` - Check if value is number
   - `isEqual` - Deep equality check
   - `isNotEmpty` - Check if array/string is not empty

3. **String**
   - `join` - Join array elements with separator

4. **JSON Parsing**
   - `parseJson` - Parse JSON string returning Result<Error, unknown> for exception handling at IO boundary

### Plain English Code Examples

Instead of:
```typescript
if (array.length > 0)  // ❌ Not plain English
if (x === y)           // ❌ Operator
```

Use:
```typescript
if (isNotEmpty(array))  // ✅ Plain English
if (isEqual(x)(y))      // ✅ Named function
```

### Happy Path First

Always structure functions with success case first, error cases last:

```typescript
export default function doSomething(value: string) {
  // Happy path: value is valid
  if (isValid(value)) {
    return success(processValue(value))
  }
  
  // Sad path: value is invalid
  return failure([createError(value)])
}
```

## Success Criteria

### Functional Requirements
- ✅ Parse JSX DSL to executable thunks
- ✅ Support Add and Multiply operations
- ✅ Support FromLocalStorage and FromConstant data sources
- ✅ Parallel fetching of independent data sources
- ✅ Error accumulation with rich ValidationError context
- ✅ Type safety with branded Integer type
- ✅ Integration with Pagewright via __sbCalculate property

### Non-Functional Requirements
- ✅ Parse-time validation of component structure
- ✅ Helpful error messages following "help, don't scold" philosophy
- ✅ Zero mutations (pure functional)
- ✅ Lazy evaluation (thunks)
- ✅ Extensible for future operations and data sources
- ✅ All functions curried
- ✅ No classes, no loops, no exceptions
- ✅ Plain English code

## Next Steps

1. Implement remaining helper functions
2. Complete AST traversal logic
3. Implement parser (JSX → IR)
4. Implement transformer (IR → AST)
5. Complete compiler implementation
6. Add comprehensive tests
7. Document all public APIs

This plan follows strict FP principles and is ready for implementation in Code mode.
