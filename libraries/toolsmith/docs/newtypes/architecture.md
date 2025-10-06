# Architectural & Formatting Rules

⚠️ **CRITICAL**: These rules are **NON-NEGOTIABLE** and must be followed exactly. Violations will cause implementation failure.

## Architectural Rules

### 1. One Function Per File
- Each file exports exactly ONE function (except curried inner functions)
- File is ALWAYS `index.ts`
- Folder name matches function name (camelCase)
- Helper functions go in nested folders at LOWEST COMMON ANCESTOR

### 2. Export Default on Declaration Line
```typescript
// ✅ CORRECT
export default function integer(n: number): Result<Integer, ValidationError> {

// ❌ WRONG
function integer(n: number): Result<Integer, ValidationError> {
	// ...
}
export default integer
```

### 3. No Barrel Files
- NO `index.ts` that re-exports other modules
- Use aliases for shorter import paths, not re-exports
- Exception: Function aliases for better naming only
- Types and constants CAN have multiple exports in one file (they're not functions)

### 4. Always Use Alias Paths with `.ts` Extension
```typescript
// ✅ CORRECT
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

// ❌ WRONG - relative paths
import ok from "../../monads/result/ok/index.ts"

// ❌ WRONG - missing extension
import ok from "@sitebender/toolsmith/monads/result/ok/index"

// ❌ WRONG - barrel import
import { ok } from "@sitebender/toolsmith/monads/result"
```

**Note**: Deno requires the `.ts` extension in all imports.

### 5. Private Functions Use Underscore Prefix
```typescript
// Private helper functions live in subfolders with underscore prefix
newtypes/integer/_isInteger/index.ts

// Function exported as default
export default function _isInteger(n: number): n is Integer {
```

### 6. All Functions Must Be Curried
```typescript
// ✅ CORRECT
export default function addCurrency(augend: Currency) {
	return function addCurrencyWithAugend(addend: Currency): Currency {
		return unsafeCurrency(augend + addend)
	}
}

// ❌ WRONG - not curried
export default function addCurrency(augend: Currency, addend: Currency): Currency {
	return unsafeCurrency(augend + addend)
}
```

**Naming**: Inner functions named after what they CARRY (the enclosed value), not their parameter.

### 7. No Arrow Functions (Except Type Signatures)
```typescript
// ✅ CORRECT
export default function process(n: number): number {
	return n * 2
}

// ❌ WRONG
export default const process = (n: number): number => n * 2

// ✅ ACCEPTABLE - type signature only
type Transform = (value: number) => number
```

### 8. No Exceptions - Use Result/Validation Monads
```typescript
// ✅ CORRECT
export default function integer(n: number): Result<Integer, ValidationError> {
	if (_isInteger(n)) {
		return ok(n)
	}

	return error({
		_tag: "ValidationError",
		field: "integer",
		message: "Must be a safe integer",
	})
}

// ❌ WRONG
export default function integer(n: number): Integer {
	if (!Number.isInteger(n)) {
		throw new Error("Must be an integer")
	}
	return n as Integer
}
```

## Formatting Rules

### 1. Double Quotes Always
```typescript
// ✅ CORRECT
const message = "Hello world"
type Brand = "Integer"

// ❌ WRONG
const message = 'Hello world'
type Brand = 'Integer'
```

### 2. Import Order (with blank lines between groups)
1. Type imports (external libraries)
2. Type imports (internal @sitebender)
3. Named imports (external libraries)
4. Const imports (external libraries)
5. Default imports (external libraries)
6. Named imports (internal @sitebender)
7. Const imports (internal @sitebender)
8. Default imports (internal @sitebender)

```typescript
// ✅ CORRECT
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import _isInteger from "@sitebender/toolsmith/newtypes/integer/_isInteger/index.ts"

export default function integer(n: number): Result<Integer, ValidationError> {
```

### 3. Whitespace Rules
- **Blank line above and below multi-line statements**
- **Blank line before return statements**
- **Blank line between different statement types**
- **NO blank lines at start/end of blocks**
- **Never more than one blank line in a row**
- **Spaces around ALL operators**: `a + b` not `a+b`

```typescript
// ✅ CORRECT
export default function integer(n: number): Result<Integer, ValidationError> {
	if (_isInteger(n)) {
		return ok(n)
	}

	return error({
		_tag: "ValidationError",
		field: "integer",
		message: "Must be a safe integer",
	})
}

// ❌ WRONG - no blank line before return, no spaces around +
export default function add(a: number, b: number): number {
	const sum = a+b
	return sum
}
```

### 4. Indentation
- Use **TABS** for indentation in `.ts` files
- Use 2 spaces for `.md`, `.yaml`, `.py` files

### 5. Trailing Commas
- **ALWAYS** in multi-line structures
- **NEVER** in single-line structures

```typescript
// ✅ CORRECT - multi-line
const obj = {
	field: "integer",
	message: "Must be a safe integer",
}

// ✅ CORRECT - single-line
const obj = { field: "integer", message: "error" }

// ❌ WRONG - missing trailing comma in multi-line
const obj = {
	field: "integer",
	message: "Must be a safe integer"
}
```

### 6. Final Newline
All files must end with a single newline character.

## Constants Rules

Constants go in `constants/index.ts` files at the lowest common ancestor, exported as named exports in SCREAMING_SNAKE_CASE:

```typescript
// newtypes/constants/index.ts
export const CURRENCY_SCALE = 2
export const DECIMAL0_SCALE = 0
export const DECIMAL1_SCALE = 1
export const DECIMAL3_SCALE = 3
export const DECIMAL4_SCALE = 4
export const DECIMAL8_SCALE = 8
export const PERCENTAGE_SCALE = 4
```

## Types Rules

Types go in `types/index.ts` files, exported as named exports in PascalCase, imported with `type` keyword:

```typescript
// types/branded/index.ts
export type Brand<K, T> = K & { readonly __brand: T }
export type Integer = number & { readonly __brand: "Integer" }
export type Float = number & { readonly __brand: "Float" }
// ... etc
```

```typescript
// Importing
import type { Integer, Float } from "@sitebender/toolsmith/types/branded/index.ts"
```

## Summary

Following these rules ensures:
- ✅ Consistent code structure across the entire codebase
- ✅ Easy navigation and discoverability
- ✅ Automatic cleanup when deleting features
- ✅ Clear dependencies and no hidden coupling
- ✅ Tree-shakeable bundles
- ✅ Zero barrel file overhead
- ✅ Deno compatibility

**Next**: [Type System](./type-system.md)
