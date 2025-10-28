# Artificer Library - Calculation DSL Implementation Plan (Pure FP)

> **Status**: Architectural Blueprint for PoC\
> **Created**: 2025-01-07\
> **Purpose**: Complete implementation plan for JSX-based calculation DSL using pure functional programming

## Overview

This document provides a comprehensive implementation plan for Artificer's calculation DSL, which enables developers to write calculations as declarative JSX that compiles to executable async thunks. This implementation follows **strict functional programming principles**: no classes, no mutations, no loops, no exceptions, all functions curried, immutable data only.

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
Architect Integration (__sbCalculate property)
```

## Folder Hierarchy

```
libraries/artificer/src/
├── calculation/                                      # Calculation DSL implementation
│   ├── types/
│   │   └── index.ts                                  # All type definitions in ONE file
│   ├── registry/                                     # Component registry (pure functions)
│   │   ├── createRegistry/
│   │   │   └── index.ts                              # Creates empty registry
│   │   ├── registerSchema/
│   │   │   └── index.ts                              # Registers schema (returns new registry)
│   │   ├── getSchema/
│   │   │   └── index.ts                              # Gets schema from registry
│   │   ├── validateComponent/
│   │   │   └── index.ts                              # Validates component exists
│   │   └── schemas/                                  # Component schemas
│   │       ├── addSchema/
│   │       │   └── index.ts                          # Add operation schema
│   │       ├── multiplySchema/
│   │       │   └── index.ts                          # Multiply operation schema
│   │       ├── augendSchema/
│   │       │   └── index.ts                          # Augend container schema
│   │       ├── addendSchema/
│   │       │   └── index.ts                          # Addend container schema
│   │       ├── multiplicandSchema/
│   │       │   └── index.ts                          # Multiplicand container schema
│   │       ├── multiplierSchema/
│   │       │   └── index.ts                          # Multiplier container schema
│   │       ├── fromLocalStorageSchema/
│   │       │   └── index.ts                          # FromLocalStorage schema
│   │       └── fromConstantSchema/
│   │           └── index.ts                          # FromConstant schema
│   │
│   ├── parser/                                       # JSX → IR transformation
│   │   ├── parseJsxToIr/
│   │   │   └── index.ts                              # Main parser entry point
│   │   ├── validateSemantics/
│   │   │   └── index.ts                              # Semantic validation
│   │   └── _extractJsxElements/                      # Private helper
│   │       └── index.ts                              # Extracts JSX from Arborist AST
│   │
│   ├── transformer/                                  # IR → Typed AST transformation
│   │   ├── transformToAst/
│   │   │   └── index.ts                              # Main transformer entry point
│   │   ├── typeCheck/
│   │   │   └── index.ts                              # Type checking logic
│   │   └── _createAstNode/                           # Private helper
│   │       └── index.ts                              # Creates typed AST nodes
│   │
│   ├── compiler/                                     # AST → Executable thunk compilation
│   │   ├── compileToThunk/
│   │   │   └── index.ts                              # Main compiler entry point
│   │   ├── identifyParallelFetches/
│   │   │   └── index.ts                              # Finds independent data sources
│   │   ├── executeParallelFetches/
│   │   │   └── index.ts                              # Executes parallel fetches
│   │   ├── foldConstants/
│   │   │   └── index.ts                              # Constant folding optimization
│   │   └── _traverseAst/                             # Private helper
│   │       └── index.ts                              # AST traversal utility
│   │
│   ├── dataSources/                                  # Data source implementations
│   │   ├── createFromLocalStorageThunk/
│   │   │   └── index.ts                              # localStorage injector
│   │   ├── createFromConstantThunk/
│   │   │   └── index.ts                              # Constant value injector
│   │   ├── createFromCookieThunk/
│   │   │   └── index.ts                              # Cookie injector (future)
│   │   ├── createFromQueryStringThunk/
│   │   │   └── index.ts                              # Query string injector (future)
│   │   └── createFromArgumentThunk/
│   │       └── index.ts                              # Function argument injector (future)
│   │
│   └── operations/                                   # Operation implementations
│       ├── createAddThunk/
│       │   └── index.ts                              # Addition operation
│       ├── createMultiplyThunk/
│       │   └── index.ts                              # Multiplication operation
│       ├── createSubtractThunk/
│       │   └── index.ts                              # Subtraction (future)
│       └── createDivideThunk/
│           └── index.ts                              # Division (future)
│
├── integration/                                      # Integration with other libraries
│   └── architect/                                   # Architect integration
│       └── attachCalculation/
│           └── index.ts                              # Attach thunk to DOM property
│
└── [existing files]                                  # Existing Artificer files
    └── plan.md                                       # Current planning document
```

## Phase 1: Type System

### All Types in One File

**File**: `libraries/artificer/src/calculation/types/index.ts`

```typescript
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

//++ Base AST node type - all calculation nodes extend this
export type AstNode = Readonly<{
	id: string
	type: string
	sourceLocation?: SourceLocation
}>

//++ Source location for error reporting
export type SourceLocation = Readonly<{
	line: number
	column: number
	file: string
}>

//++ Async thunk - lazy evaluation wrapper for calculations
export type AsyncThunk<T> = {
	(): Promise<Validation<ValidationError, T>>
}

//++ Operation node - represents operations like Add, Multiply
export type OperationNode =
	& AstNode
	& Readonly<{
		operation: string
		children: ReadonlyArray<AstNode>
	}>

//++ Data source node - fetches data asynchronously
export type DataSourceNode =
	& AstNode
	& Readonly<{
		source: string
		config: DataSourceConfig
	}>

//++ Configuration for data sources
export type DataSourceConfig = Readonly<{
	key?: string
	path?: string
	selector?: string
	value?: unknown
}>

//++ Component schema - defines structure and validation rules
export type ComponentSchema = Readonly<{
	name: string
	category: ComponentCategory
	children: ChildrenSpec
	attributes: AttributeSpec
	returnType: string
	validate: (node: unknown) => Validation<ValidationError, void>
}>

//++ Component category
export type ComponentCategory = "Operation" | "DataSource" | "Container"

//++ Children specification
export type ChildrenSpec =
	| Readonly<{ type: "none" }>
	| Readonly<{ type: "exact"; count: number; names: ReadonlyArray<string> }>
	| Readonly<{ type: "any"; min?: number; max?: number }>

//++ Attribute specification
export type AttributeSpec = Readonly<{
	required: ReadonlyArray<string>
	optional: ReadonlyArray<string>
	types: Readonly<Record<string, string>>
}>

//++ Component registry - immutable map of component schemas
export type Registry = Readonly<{
	schemas: ReadonlyMap<string, ComponentSchema>
}>
```

## Phase 2: Registry (Pure Functions)

### Create Registry

**File**: `libraries/artificer/src/calculation/registry/createRegistry/index.ts`

```typescript
import type { Registry } from "../types/index.ts"

//++ Creates an empty component registry
export default function createRegistry(): Registry {
	return {
		schemas: new Map(),
	}
}
```

### Register Schema

**File**: `libraries/artificer/src/calculation/registry/registerSchema/index.ts`

```typescript
import type { ComponentSchema } from "../types/index.ts"
import type { Registry } from "../types/index.ts"

//++ Registers a component schema in the registry
export default function registerSchema(schema: ComponentSchema) {
	return function withRegistry(registry: Registry): Registry {
		return {
			schemas: new Map([...registry.schemas, [schema.name, schema]]),
		}
	}
}
```

### Get Schema

**File**: `libraries/artificer/src/calculation/registry/getSchema/index.ts`

```typescript
import type { ComponentSchema } from "../types/index.ts"
import type { Registry } from "../types/index.ts"

//++ Gets a component schema from the registry
export default function getSchema(name: string) {
	return function fromRegistry(
		registry: Registry,
	): ComponentSchema | undefined {
		return registry.schemas.get(name)
	}
}
```

### Validate Component

**File**: `libraries/artificer/src/calculation/registry/validateComponent/index.ts`

```typescript
import type { ComponentSchema } from "../types/index.ts"
import type { Registry } from "../types/index.ts"
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"
import failure from "@sitebender/toolsmith/monads/validation/failure/index.ts"
import getSchema from "../getSchema/index.ts"
import isDefined from "@sitebender/toolsmith/validation/isDefined/index.ts"
import join from "@sitebender/toolsmith/array/join/index.ts"

//++ Validates that a component exists in the registry
export default function validateComponent(name: string) {
	return function inRegistry(
		registry: Registry,
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
			severity: "requirement",
		}])
	}
}
```

## Phase 3: Component Schemas

### Add Operation Schema

**File**: `libraries/artificer/src/calculation/registry/schemas/addSchema/index.ts`

```typescript
import type { ComponentSchema } from "../../types/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"

//++ Schema for Add operation component
export default function addSchema(): ComponentSchema {
	return {
		name: "Add",
		category: "Operation",
		children: {
			type: "exact",
			count: 2,
			names: ["Augend", "Addend"],
		},
		attributes: {
			required: [],
			optional: [],
			types: {},
		},
		returnType: "Integer",
		validate: function validateAddNode(node: unknown) {
			return success(undefined)
		},
	}
}
```

### Multiply Operation Schema

**File**: `libraries/artificer/src/calculation/registry/schemas/multiplySchema/index.ts`

```typescript
import type { ComponentSchema } from "../../types/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"

//++ Schema for Multiply operation component
export default function multiplySchema(): ComponentSchema {
	return {
		name: "Multiply",
		category: "Operation",
		children: {
			type: "exact",
			count: 2,
			names: ["Multiplicand", "Multiplier"],
		},
		attributes: {
			required: [],
			optional: [],
			types: {},
		},
		returnType: "Integer",
		validate: function validateMultiplyNode(node: unknown) {
			return success(undefined)
		},
	}
}
```

### FromLocalStorage Schema

**File**: `libraries/artificer/src/calculation/registry/schemas/fromLocalStorageSchema/index.ts`

```typescript
import type { ComponentSchema } from "../../types/index.ts"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"

//++ Schema for FromLocalStorage data source component
export default function fromLocalStorageSchema(): ComponentSchema {
	return {
		name: "FromLocalStorage",
		category: "DataSource",
		children: {
			type: "none",
		},
		attributes: {
			required: ["key"],
			optional: [],
			types: {
				key: "string",
			},
		},
		returnType: "Integer",
		validate: function validateFromLocalStorageNode(node: unknown) {
			return success(undefined)
		},
	}
}
```

## Phase 4: Data Source Implementations

### FromLocalStorage Thunk Creator

**File**: `libraries/artificer/src/calculation/dataSources/createFromLocalStorageThunk/index.ts`

```typescript
import type { AsyncThunk } from "../types/index.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import integer from "@sitebender/toolsmith/newtypes/numericTypes/integer/index.ts"
import failure from "@sitebender/toolsmith/monads/validation/failure/index.ts"
import isNull from "@sitebender/toolsmith/validation/isNull/index.ts"
import isNumber from "@sitebender/toolsmith/validation/isNumber/index.ts"
import parseJson from "@sitebender/toolsmith/conversion/parseJson/index.ts"

//++ Creates async thunk that fetches Integer from localStorage
export default function createFromLocalStorageThunk(
	key: string,
): AsyncThunk<Integer> {
	return async function fetchFromLocalStorageWithKey(): Promise<
		Validation<ValidationError, Integer>
	> {
		// [IO] This function performs side effects (localStorage access)

		const raw = localStorage.getItem(key)

		// Happy path first: key exists and is not null
		if (isNull(raw) === false) {
			// Parse JSON
			const parseResult = parseJson(raw)

			if (parseResult._tag === "Ok") {
				const parsed = parseResult.value

				// Validate as number
				if (isNumber(parsed)) {
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
					severity: "requirement",
				}])
			}

			// Sad path: invalid JSON
			return failure([{
				code: "LOCALSTORAGE_INVALID_JSON",
				field: "localStorage",
				messages: [`Value for key "${key}" is not valid JSON`],
				received: raw,
				expected: "Valid JSON string",
				suggestion: "Ensure the value is properly JSON-encoded",
				severity: "requirement",
			}])
		}

		// Sad path: key not found
		return failure([{
			code: "LOCALSTORAGE_KEY_NOT_FOUND",
			field: "localStorage",
			messages: [`Key "${key}" not found in localStorage`],
			received: null,
			expected: "JSON string containing a number",
			suggestion:
				`Set localStorage.setItem("${key}", "42") before using this calculation`,
			severity: "requirement",
		}])
	}
}
```

### FromConstant Thunk Creator

**File**: `libraries/artificer/src/calculation/dataSources/createFromConstantThunk/index.ts`

```typescript
import type { AsyncThunk } from "../types/index.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

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

## Phase 5: Operation Implementations

### Add Operation Thunk Creator

**File**: `libraries/artificer/src/calculation/operations/createAddThunk/index.ts`

```typescript
import type { AsyncThunk } from "../types/index.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import addInteger from "@sitebender/toolsmith/math/arithmetic/add/addInteger.ts"
import chain from "@sitebender/toolsmith/monads/validation/chain/index.ts"

//++ Creates async thunk that adds two Integers
export default function createAddThunk(
	augendThunk: AsyncThunk<Integer>,
) {
	return function withAugend(
		addendThunk: AsyncThunk<Integer>,
	): AsyncThunk<Integer> {
		return async function executeAddition(): Promise<
			Validation<ValidationError, Integer>
		> {
			const augendValidation = await augendThunk()
			const addendValidation = await addendThunk()

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

**File**: `libraries/artificer/src/calculation/operations/createMultiplyThunk/index.ts`

```typescript
import type { AsyncThunk } from "../types/index.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import multiplyInteger from "@sitebender/toolsmith/math/arithmetic/multiply/multiplyInteger.ts"
import chain from "@sitebender/toolsmith/monads/validation/chain/index.ts"

//++ Creates async thunk that multiplies two Integers
export default function createMultiplyThunk(
	multiplicandThunk: AsyncThunk<Integer>,
) {
	return function withMultiplicand(
		multiplierThunk: AsyncThunk<Integer>,
	): AsyncThunk<Integer> {
		return async function executeMultiplication(): Promise<
			Validation<ValidationError, Integer>
		> {
			const multiplicandValidation = await multiplicandThunk()
			const multiplierValidation = await multiplierThunk()

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

**File**: `libraries/artificer/src/calculation/compiler/identifyParallelFetches/index.ts`

```typescript
import type { AstNode } from "../types/index.ts"
import type { DataSourceNode } from "../types/index.ts"

import filter from "@sitebender/toolsmith/array/filter/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"

//++ Identifies all data source nodes in AST for parallel fetching
export default function identifyParallelFetches(
	ast: AstNode,
): ReadonlyArray<DataSourceNode> {
	// TODO: Implement tree traversal using reduce
	return []
}
```

### Execute Parallel Fetches

**File**: `libraries/artificer/src/calculation/compiler/executeParallelFetches/index.ts`

```typescript
import type { DataSourceNode } from "../types/index.ts"
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import combineValidations from "@sitebender/toolsmith/monads/validation/combineValidations/index.ts"

//++ Executes all data source fetches in parallel
export default function executeParallelFetches(
	sources: ReadonlyArray<DataSourceNode>,
) {
	return async function fetchAll(): Promise<
		Validation<ValidationError, ReadonlyMap<string, unknown>>
	> {
		// TODO: Implement parallel execution
		throw new Error("Not implemented")
	}
}
```

### Compile to Thunk

**File**: `libraries/artificer/src/calculation/compiler/compileToThunk/index.ts`

```typescript
import type { AstNode } from "../types/index.ts"
import type { AsyncThunk } from "../types/index.ts"
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import identifyParallelFetches from "../identifyParallelFetches/index.ts"
import executeParallelFetches from "../executeParallelFetches/index.ts"

//++ Compiles AST to executable async thunk
export default function compileToThunk<T>(ast: AstNode): AsyncThunk<T> {
	return async function executeCalculation(): Promise<
		Validation<ValidationError, T>
	> {
		const dataSources = identifyParallelFetches(ast)
		const fetchResults = await executeParallelFetches(dataSources)()

		// TODO: Apply operations bottom-up using fetched values
		throw new Error("Not implemented")
	}
}
```

## Phase 7: Integration with Architect

### Attach Calculation

**File**: `libraries/artificer/src/integration/architect/attachCalculation/index.ts`

```typescript
import type { AsyncThunk } from "../../../calculation/types/index.ts"

//++ Attaches compiled calculation thunk to DOM element as __sbCalculate property
//++ [IO] This function performs side effects (DOM manipulation)
export default function attachCalculation<T>(thunk: AsyncThunk<T>) {
	return function toElement(element: HTMLElement): void {
		;(element as any).__sbCalculate = thunk
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
- ✅ Integration with Architect via __sbCalculate property

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
