# JSDoc to Envoy Basic Conversion Prompt

## Objective

Convert JSDoc comments to basic Envoy comment syntax. This is a mechanical transformation that moves content from JSDoc format to Envoy format without adding new information.

## CRITICAL RULES

- **REMOVE all JSDoc blocks** (`/** */`)
- **PRESERVE the information** but in Envoy format
- **SHORTEN descriptions** where possible (be concise)
- **DO NOT add new information** - only transform what exists
- **Leave internal `//` comments alone** inside functions

## Transformation Rules

### 1. Description Comment (`//++`)

**From JSDoc:**
```typescript
/**
 * Safely converts any value to its string representation
 *
 * Converts values to strings with consistent, predictable rules.
 * Handles all JavaScript types safely without throwing errors.
 */
export default function toString(value: unknown): string {
```

**To Envoy:**
```typescript
//++ Safely converts any value to string with consistent rules, handles all types without throwing
export default function toString(value: unknown): string {
```

**Rules:**
- Place `//++` immediately above the function (NO blank line)
- Condense multi-line descriptions into one concise line
- Remove redundant information
- Keep only the essential purpose

### 2. Example Comments (`//??`)

**Single-line example from JSDoc:**
```typescript
/**
 * @example
 * toString("hello") // "hello"
 */
```

**To Envoy (placed BELOW function with blank line above):**
```typescript
export default function toString(value: unknown): string {
  // implementation
}

//?? [EXAMPLE] toString("hello") // "hello"
```

**Multi-line examples from JSDoc:**
```typescript
/**
 * @example
 * const result = compose(
 *   multiply(2),
 *   add(1)
 * )(5) // 12
 * 
 * @example
 * const pipeline = compose(trim, lowercase, split(' '))
 * pipeline('  HELLO WORLD  ') // ['hello', 'world']
 */
```

**To Envoy (block comment with pipe margins):**
```typescript
export default function compose(f: Function) {
  // implementation
}

/*??
 | [EXAMPLE]
 | const result = compose(
 |   multiply(2),
 |   add(1)
 | )(5) // 12
 |
 | [EXAMPLE]
 | const pipeline = compose(trim, lowercase, split(' '))
 | pipeline('  HELLO WORLD  ') // ['hello', 'world']
 */
```

### 3. Parameter and Return Information

**DO NOT create separate comments for @param and @returns**. This information should be:
- Incorporated into the `//++` description if critical
- Obvious from the function signature and name
- Omitted if redundant

### 4. Tags to Remove Completely

Remove these JSDoc tags without replacement:
- `@pure` - Implied by functional style
- `@immutable` - Implied by functional style
- `@curried` - Obvious from signature
- `@safe` - Implied by "safe" in function name
- `@predicate` - Obvious from return type boolean
- `@param` - Usually obvious from signature
- `@returns` - Usually obvious from signature

### 5. Internal Comments

**Leave these alone:**
```typescript
function something() {
  // This comment stays as is
  const x = 5
  // Don't change internal comments
  return x
}
```

## Complete Example

**Before (with JSDoc):**
```typescript
/**
 * Creates a curried less-than comparison predicate
 *
 * Returns a function that checks if a value is less than the provided threshold.
 * Uses JavaScript's less-than operator with its standard coercion rules for
 * non-numeric values. For strict numeric comparison, ensure both values are
 * numbers. Useful for filtering, validation, and conditional logic.
 *
 * @pure
 * @curried
 * @predicate
 * @param threshold - The value to compare against
 * @returns A predicate function that returns true if input < threshold
 * @example
 * const lessThan10 = lt(10)
 * lessThan10(5)  // true
 * lessThan10(15) // false
 * 
 * @example
 * const numbers = [1, 5, 10, 15, 20]
 * numbers.filter(lt(10)) // [1, 5]
 */
export default function lt<T>(threshold: T) {
  return function ltThreshold(value: T): boolean {
    return value < threshold
  }
}
```

**After (with Envoy):**
```typescript
//++ Creates a less-than comparison predicate for filtering and validation
export default function lt<T>(threshold: T) {
  return function ltThreshold(value: T): boolean {
    return value < threshold
  }
}

/*??
 | [EXAMPLE]
 | const lessThan10 = lt(10)
 | lessThan10(5)  // true
 | lessThan10(15) // false
 |
 | [EXAMPLE]
 | const numbers = [1, 5, 10, 15, 20]
 | numbers.filter(lt(10)) // [1, 5]
 */
```

## What NOT to Do

1. **DON'T add information that wasn't in the JSDoc**
2. **DON'T create verbose descriptions** - be concise
3. **DON'T add [PRO], [CON], [GOTCHA]** comments (that's Step 2)
4. **DON'T add `//>>` reference links** (that's Step 2)
5. **DON'T add `//--` tech debt comments** (that's Step 2)
6. **DON'T change internal `//` comments** inside functions
7. **DON'T put blank lines between `//++` and the function**

## File Processing

1. Find all JSDoc blocks (`/** */`)
2. Extract description → convert to `//++` above function
3. Extract examples → convert to `//?? [EXAMPLE]` below function
4. Remove all other JSDoc tags
5. Ensure proper spacing (no blank before `//++`, one blank before `//??`)
6. Leave internal comments unchanged

## Output Format

For each file processed:
- All JSDoc removed
- `//++` description immediately above each exported function
- `//?? [EXAMPLE]` comments below functions where examples existed
- Clean, concise, following Envoy style
- Internal comments preserved as-is
