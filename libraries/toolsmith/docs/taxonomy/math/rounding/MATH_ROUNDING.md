# Math - Rounding and Precision Functions

**Location**: `src/math/`
**Functions**: 8
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### Basic Rounding Operations

#### round

- **Current**: `(n: number | null | undefined) => number`
- **Returns**: NaN on invalid input
- **Description**: Rounds to nearest integer; away-from-zero at .5; returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

#### floor

- **Current**: `(n: number | null | undefined) => number`
- **Returns**: NaN on invalid input
- **Description**: [INFERRED] Rounds down to nearest integer (towards negative infinity); returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

#### ceiling

- **Current**: `(n: number | null | undefined) => number`
- **Returns**: NaN on invalid input
- **Description**: [INFERRED] Rounds up to nearest integer (towards positive infinity); returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

#### truncate

- **Current**: `(n: number | null | undefined) => number`
- **Returns**: NaN on invalid input
- **Description**: [INFERRED] Removes fractional part (rounds towards zero); returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

### Value Constraint

#### clamp

- **Current**: `(min: number | null | undefined) => (max: number | null | undefined) => (value: number | null | undefined) => number`
- **Returns**: NaN on invalid input or min > max
- **Description**: Constrains a number between min and max; returns NaN on invalid input
- **Target**: `(min: number) => (max: number) => (value: number) => Result<MathError, number>`

### Sign and Magnitude

#### absoluteValue

- **Current**: `(n: number | null | undefined) => number`
- **Returns**: NaN on invalid input
- **Description**: Returns the absolute value of a number; returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

#### sign (maybe `getSign`?)

- **Current**: `(n: number | null | undefined) => number`
- **Returns**: NaN on invalid input; otherwise -1, 0, or 1
- **Description**: [INFERRED] Returns the sign of a number (-1 for negative, 0 for zero, 1 for positive); returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

---

## Migration Notes

Rounding and precision functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when computation succeeds with valid input
2. Return `error(MathError)` when computation fails, with descriptive error messages
3. Maintain currying for multi-parameter functions (clamp)
4. Preserve type safety while adding error context
5. Eliminate NaN return values in favor of explicit error types

## Special Considerations

### Arrow Function Syntax

All functions use arrow syntax and need refactoring to named functions:

- **round** (arrow function)
- **floor** (arrow function)
- **ceiling** (arrow function)
- **truncate** (named function with arrow syntax)
- **clamp** (arrow function)
- **absoluteValue** (arrow function)
- **sign** (arrow function)

### Rounding Behavior Details

#### round

- Uses JavaScript's `Math.round()` which rounds `.5` away from zero
- Examples: `2.5 → 3`, `-2.5 → -3`, `2.4 → 2`, `-2.6 → -3`

#### floor

- Always rounds towards negative infinity
- Examples: `2.9 → 2`, `-2.1 → -3`, `2.0 → 2`

#### ceiling

- Always rounds towards positive infinity
- Examples: `2.1 → 3`, `-2.9 → -2`, `2.0 → 2`

#### truncate

- Always rounds towards zero (removes fractional part)
- Examples: `2.9 → 2`, `-2.9 → -2`, `2.1 → 2`, `-2.1 → -2`

### Clamp Behavior

#### clamp

- Constrains value to [min, max] range (inclusive)
- Returns NaN if min > max (invalid range)
- Implementation: `if (value < min) return min; if (value > max) return max; return value`
- Examples: `clamp(0)(10)(5) → 5`, `clamp(0)(10)(15) → 10`, `clamp(0)(10)(-5) → 0`

### Sign and Magnitude

#### absoluteValue

- Extracts magnitude (distance from zero)
- Wrapper around `Math.abs()`
- Examples: `absoluteValue(5) → 5`, `absoluteValue(-5) → 5`, `absoluteValue(0) → 0`

#### sign

- Extracts sign information
- Returns -1, 0, or 1
- Wrapper around `Math.sign()`
- Examples: `sign(5) → 1`, `sign(-5) → -1`, `sign(0) → 0`, `sign(-0) → -0`
- Note: JavaScript distinguishes between +0 and -0

### NaN Return Values

All functions return NaN on error, which will be replaced with Result error values:

- Type errors (null, undefined, non-number inputs)
- Invalid operations (clamp with min > max)

---

## Error Categories

When migrating to Result type, errors should be categorized:

### ValidationError

- Type errors (not a number, null/undefined)
- Used by: all functions for input validation

### MathError (new type needed)

- Invalid range errors (clamp with min > max)
- Domain errors (if any special restrictions apply)

---

## Implementation Dependencies

Rounding functions have minimal dependencies outside the math domain:

- All depend on **isNullish** from validation
- No interdependencies between rounding functions
- Can be migrated independently

---

## Related Functions

### In Other Categories

- **negate** (in MATH_ARITHMETIC.md) - returns `-n`, related to sign operations
- **inRange** (in MATH_COMPARISON.md) - checks if value in [start, end), related to clamp

### Potential New Functions

Consider adding these rounding functions in monadic implementation:

- **roundToDecimal** - round to N decimal places
- **roundToPrecision** - round to N significant figures
- **roundToNearest** - round to nearest multiple of N
- **roundTowardsZero** - alias for truncate (clearer name)
- **roundAwayFromZero** - opposite of truncate

---

## Note on Modulo

The `modulo` function was previously included in rounding documentation but has been moved to **MATH_ARITHMETIC.md** as it is fundamentally an arithmetic operation rather than a rounding/precision operation. A separate **remainder** function (JavaScript's `%` operator) should also be added to arithmetic functions, as it is distinct from mathematical modulo.

Note from original file: "modulo (we need a proper `remainder`, too, and modulo should really be modulo, not remainder)"
