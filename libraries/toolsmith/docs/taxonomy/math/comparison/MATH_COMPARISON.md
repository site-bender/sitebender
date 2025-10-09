# Math - Comparison and Ordering Functions

**Location**: `src/vanilla/math/`
**Functions**: 6
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### Simple Comparison

#### max

- **Current**: `(a: number | null | undefined) => (b: number | null | undefined) => number`
- **Returns**: NaN on invalid input
- **Description**: Returns the larger of two numbers; returns NaN on invalid input
- **Target**: `(a: number) => (b: number) => Result<MathError, number>`

#### min

- **Current**: `(a: number | null | undefined) => (b: number | null | undefined) => number`
- **Returns**: NaN on invalid input
- **Description**: Returns the smaller of two numbers; returns NaN on invalid input
- **Target**: `(a: number) => (b: number) => Result<MathError, number>`

### Projection-based Comparison

#### maxBy

- **Current**: `<T>(fn: (value: T) => number) => (a: T) => (b: T) => T`
- **Returns**: NaN (as unknown as T) on invalid mapping
- **Description**: Returns the value with the larger mapped result; returns NaN on invalid mapping
- **Target**: `<T>(fn: (value: T) => number) => (a: T) => (b: T) => Result<MathError, T>`

#### minBy

- **Current**: `<T>(fn: (value: T) => number) => (a: T) => (b: T) => T`
- **Returns**: NaN (as unknown as T) on invalid mapping
- **Description**: Returns the value with the smaller mapped result; returns NaN on invalid mapping
- **Target**: `<T>(fn: (value: T) => number) => (a: T) => (b: T) => Result<MathError, T>`

### Constraint

#### clamp

- **Current**: `(min: number | null | undefined) => (max: number | null | undefined) => (value: number | null | undefined) => number`
- **Returns**: NaN on invalid input or min > max
- **Description**: Constrains a number between min and max; returns NaN on invalid input
- **Target**: `(min: number) => (max: number) => (value: number) => Result<MathError, number>`

### Range Checking

#### inRange

- **Current**: `(start: number | null | undefined) => (end: number | null | undefined) => (value: number | null | undefined) => boolean`
- **Returns**: false on invalid input
- **Description**: Checks if a number is within a [start, end) range; returns false on invalid input
- **Target**: `(start: number) => (end: number) => (value: number) => Result<ValidationError, number>`

---

## Migration Notes

Comparison and ordering functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when comparison succeeds with valid input
2. Return `error(MathError)` when comparison fails, with descriptive error messages
3. Maintain currying for all multi-parameter functions
4. Support generic types (maxBy, minBy) for polymorphic comparison
5. Eliminate special return values (NaN, false)
6. Validate input constraints before computation

## Special Considerations

### Arrow Function Syntax

All functions use arrow syntax and need refactoring to named functions:

- **max** (arrow function)
- **min** (arrow function)
- **maxBy** (arrow function)
- **minBy** (arrow function)
- **clamp** (arrow function)
- **inRange** (arrow function)

### Comparison Behavior

#### max and min

- Simple comparison using JavaScript's `>` and `<` operators
- Wrapper around `Math.max()` and `Math.min()`
- NaN propagation: if either input is NaN, result is NaN
- Examples:
  - `max(5)(3)` → 5
  - `min(5)(3)` → 3
  - `max(-1)(-5)` → -1

#### maxBy and minBy

- Generic comparison based on projection function
- Returns the **original value**, not the projected value
- Projection function maps T → number for comparison
- Tie-breaking: returns **second value** when projections are equal
- Examples:
  - `maxBy(x => x.length)("hello")("world")` → "hello" (5 = 5, returns second)
  - `minBy(x => x.age)(person1)(person2)` → person with smaller age

### Clamp Behavior

#### clamp

- Constrains value to [min, max] range (inclusive)
- Returns NaN if min > max (invalid range)
- Implementation: `Math.max(min, Math.min(max, value))`
- Examples:
  - `clamp(0)(10)(5)` → 5 (within range)
  - `clamp(0)(10)(15)` → 10 (clamped to max)
  - `clamp(0)(10)(-5)` → 0 (clamped to min)
  - `clamp(10)(0)(5)` → NaN (invalid range)

### Range Checking Behavior

#### inRange

- Checks if value is in [start, end) range (start inclusive, end exclusive)
- Auto-swapping: **automatically swaps start and end if start > end**
- Returns false on invalid input
- Examples:
  - `inRange(0)(10)(5)` → true
  - `inRange(0)(10)(10)` → false (end is exclusive)
  - `inRange(0)(10)(0)` → true (start is inclusive)
  - `inRange(10)(0)(5)` → true (auto-swapped to [0, 10))

**Design Question**: Should auto-swapping be maintained or should start > end be an error?

### NaN and Boolean Returns

#### NaN Return Values

Functions returning NaN on error:

- **max**, **min**: Return NaN for invalid input
- **maxBy**, **minBy**: Return NaN (as unknown as T) for invalid projection
- **clamp**: Returns NaN for invalid input or invalid range

#### Boolean Return Values

- **inRange**: Returns false for invalid input (should be Result<ValidationError, boolean> or Result<ValidationError, number>?)

**Design Question**: Should inRange return Result<ValidationError, boolean> or Result<ValidationError, number> (passing through the value)?

### Generic Type Support

#### maxBy and minBy

- Support generic type parameter `<T>`
- Projection function: `(value: T) => number`
- Return type: `T` (not number)
- Allows comparison of complex objects by a numeric property

---

## Implementation Dependencies

Comparison functions have minimal dependencies:

- All depend on **isNullish** from validation
- **clamp** is also documented in MATH_ROUNDING.md (conceptually overlaps)
- No interdependencies between comparison functions

---

## Error Categories

When migrating to Result type, errors should be categorized:

### ValidationError

- Type errors (not a number, null/undefined)
- **inRange** returns false for invalid input (should be error)

### MathError (new type needed)

- Invalid range errors (clamp with min > max)
- Invalid projection errors (maxBy/minBy with projection returning NaN)

---

## Related Functions

### In Other Categories

- **absoluteValue** (in MATH_ROUNDING.md) - magnitude without sign, related to comparison
- **sign** (in MATH_ROUNDING.md) - extracts comparison to zero

### Potential New Functions

Consider adding these comparison functions in monadic implementation:

- **maxOf** - maximum of array (alias or generalization of max)
- **minOf** - minimum of array (alias or generalization of min)
- **isBetween** - alias for inRange with clearer name
- **compare** - three-way comparison (-1, 0, 1)
- **compareBy** - projection-based three-way comparison
- **clampToRange** - clamp using a Range type instead of min/max
- **isWithinTolerance** - fuzzy equality with epsilon

---

## Design Decisions Needed

### 1. Auto-swapping in inRange

**Current**: Automatically swaps start and end if start > end
**Options**:

- Keep auto-swapping (more forgiving, less surprising)
- Error on start > end (more strict, explicit intent)

**Recommendation**: Error on start > end for clarity

### 2. Tie-breaking in maxBy/minBy

**Current**: Returns second value when projections are equal
**Options**:

- Keep current behavior (document well)
- Return first value (more common convention)
- Error or return both (less practical)

**Recommendation**: Return first value (align with common convention)

### 3. inRange return type

**Current**: Returns boolean
**Options**:

- `Result<ValidationError, boolean>` - validates and returns boolean
- `Result<ValidationError, number>` - validates and passes through value (useful for chaining)

**Recommendation**: `Result<ValidationError, number>` for composability

### 4. clamp location

**Current**: Documented in both MATH_COMPARISON.md and MATH_ROUNDING.md
**Rationale**:

- Comparison: constrains value based on comparison to bounds
- Rounding: adjusts value to be within bounds (precision concept)

**Recommendation**: Keep in MATH_ROUNDING.md, reference from MATH_COMPARISON.md

---

## Testing Considerations

When migrating, ensure comprehensive tests for:

- Equal values (max(5)(5), min(5)(5))
- Negative values
- Infinity values (positive and negative)
- Zero and negative zero
- NaN propagation
- Edge cases:
  - clamp with min = max
  - inRange with start = end (empty range)
  - maxBy/minBy with equal projections
  - Auto-swapping in inRange (if kept)
- Generic types for maxBy/minBy:
  - Objects with numeric properties
  - Strings by length
  - Arrays by length
