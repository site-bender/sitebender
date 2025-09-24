# Edge Cases and Exceptions Prompt

## Purpose

This prompt documents IMPORTANT exceptions and edge cases that must be understood when transforming the codebase.

## CRITICAL EXCEPTIONS TO CURRYING RULE

### 1. Comparator Functions for Array.sort()

**Comparator functions are NOT curried** because JavaScript's `Array.sort()` expects `(a, b) => number`:

```typescript
// CORRECT - Comparators must take two parameters
export default function sortByKey([a]: [string, unknown], [b]: [string, unknown]): number {
	return a.localeCompare(b)
}

// WRONG - Do NOT curry comparators
export default function sortByKey([a]: [string, unknown]) {
	return function compareWith([b]: [string, unknown]): number {
		return a.localeCompare(b)
	}
}
```

**Why?** JavaScript's `sort()` method will call the comparator with two arguments. A curried comparator would break the sort operation. Haskell Curry would be disappointed, but we must work with JavaScript's limitations.

### 2. Reducer Functions for Array.reduce()

**Reducer functions passed directly to reduce() are NOT curried**:

```typescript
// CORRECT - Reducers take accumulator and current value
array.reduce(function sumReducer(acc: number, curr: number) {
	return acc + curr
}, 0)

// Or reference a two-parameter function
array.reduce(add, 0)  // where add takes (a, b)
```

### 3. Callback Functions for JavaScript APIs

Functions passed to JavaScript built-in methods that expect specific signatures:

- `Array.prototype.map` callbacks: `(value, index, array) => result`
- `Array.prototype.filter` callbacks: `(value, index, array) => boolean`
- `Array.prototype.forEach` callbacks: `(value, index, array) => void`
- `Promise.then` callbacks: `(value) => result`

## ARROW SYNTAX EXCEPTIONS

### Arrow Syntax in Type Signatures is FINE

```typescript
// CORRECT - Arrow syntax in types is NOT an arrow function
export default function compose(f: Function): (g: Function) => (x: any) => any {
	// implementation...
}

type Predicate = (value: unknown) => boolean  // This is fine
interface Mapper {
	transform: (input: string) => number  // This is fine
}
```

### Arrow Syntax in Comments is FINE

```typescript
// Examples in comments can use arrow syntax
// const example = (x) => x + 1  // This comment is fine
/**
 * @example
 * const add = (a) => (b) => a + b  // JSDoc example is fine
 */
```

## TYPE CASTS AND METHOD CALLS

### Type Casts with Arrow Syntax

When casting to call methods, the arrow syntax in the cast is acceptable:

```typescript
// These type casts are unavoidable and acceptable
const result = (value as { toPlainDate: () => unknown }).toPlainDate()
const iso = (result as { toString: () => string }).toString()
```

**Note**: These aren't creating arrow functions - they're type annotations for existing methods.

## ANONYMOUS FUNCTIONS THAT NEED EXTRACTION

### Functions Inside Logic Checks

```typescript
// WRONG - Anonymous function in allPass
if (allPass([isEqual(10), () => contains(".")(trimmed)])(radix)) {
	return null
}

// CORRECT - Extract to named function
function hasDecimalPoint() {
	return contains(".")(trimmed)
}
if (allPass([isEqual(10), hasDecimalPoint])(radix)) {
	return null
}
```

## WHEN TO USE SPECIALIZED PREDICATES

### Prefer Semantic Functions Over Compositions

```typescript
// GOOD - Use specialized predicate when available
if (isEmpty(array)) { ... }
if (isNullish(value)) { ... }
if (isNotEmpty(string)) { ... }

// AVOID - Don't compose when semantic function exists
if (isEqual(0)(length(array))) { ... }  // Use isEmpty instead
if (anyPass([isNull, isUndefined])(value)) { ... }  // Use isNullish instead
if (not(isEmpty(string))) { ... }  // Use isNotEmpty instead
```

## CRITICAL: NO COMMENTS POLICY

**DO NOT ADD ANY COMMENTS** unless specifically requested by the user. This includes:

- No JSDoc comments
- No inline comments explaining code
- No TODO comments
- No explanatory comments

The codebase uses the Envoy comment system, not standard JSDoc. Any comments you add will need to be removed later.

## WHEN TO STOP AND CONSULT

### Stop Immediately When:

1. **Missing Toolsmith Function**: A function that logically should exist doesn't (e.g., `isPositiveInfinity`)
2. **Ambiguous Pattern**: Multiple valid approaches with no clear best practice
3. **Breaking Change Risk**: Transformation might alter functionality
4. **Complex Type Issues**: Type system complications beyond Value/Serializable
5. **Circular Dependencies**: Import would create a circular dependency

### Do NOT:

- Create workarounds for missing functions
- Leave JavaScript built-ins in place
- Skip files that seem complex
- Make assumptions about edge cases

## TESTING AND VERIFICATION

### After Each File Transformation:

1. **Type Check**: Run `deno check [file]` on the specific file
2. **Import Verification**: Ensure all imports resolve correctly
3. **No Runtime Errors**: Check that no code paths throw during transformation

### Do NOT:

- Run type check on the entire codebase (it may have unrelated errors)
- Skip type checking because "it looks right"
- Assume imports are correct without verification

## SUMMARY OF KEY POINTS

1. **Comparators are NOT curried** - They must take two parameters for `Array.sort()`
2. **Arrow syntax in types is FINE** - Only actual arrow functions are problematic
3. **Extract ALL anonymous functions** - Even small ones in logic compositions
4. **Use semantic predicates** - `isEmpty` over `isEqual(0)(length())`
5. **NO COMMENTS** - Don't add any comments to the code
6. **STOP if function missing** - Don't work around missing toolsmith functions
7. **Object.is → is()** - Always use the curried `is` function
8. **Type check individual files** - Not the entire codebase
