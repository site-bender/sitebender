# Math - Arithmetic Functions

**Location**: `src/vanilla/math/`
**Functions**: 25
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### add (consider only binary operation, use sum for arrays)
- **Current**: `(addend: number) => (augend: number) => number | null` OR `(addends: Array<number>) => number | null`
- **Returns**: number | null
- **Description**: Adds numbers: number→(number→sum) or Array<number>→sum; null on non-finite
- **Overloaded**: Yes - curried binary operation OR array reduce
- **Target**: `(addend: number) => (augend: number) => Result<MathError, number>` OR `(addends: Array<number>) => Result<MathError, number>`

### subtract
- **Current**: `(subtrahend: number) => (minuend: number) => number | null`
- **Returns**: number | null
- **Description**: Subtracts numbers: subtrahend→(minuend→minuend−subtrahend); null on non-finite
- **Target**: `(subtrahend: number) => (minuend: number) => Result<MathError, number>`

### multiply (consider only binary operation, use product for arrays)
- **Current**: `(multiplier: number) => (multiplicand: number) => number | null` OR `(factors: Array<number>) => number | null`
- **Returns**: number | null
- **Description**: Multiplies numbers: number→(number→product) or Array<number>→product; null on non-finite
- **Overloaded**: Yes - curried binary operation OR array reduce
- **Target**: `(multiplier: number) => (multiplicand: number) => Result<MathError, number>` OR `(factors: Array<number>) => Result<MathError, number>`

### divide (should this be `divideBy` for clarity?)
- **Current**: `(divisor: number) => (dividend: number) => number | null`
- **Returns**: number | null
- **Description**: Divides numbers: number→(number→quotient); null on non-finite or zero divisor
- **Target**: `(divisor: number) => (dividend: number) => Result<MathError, number>`

### power (maybe `raiseToPower` with alias?)
- **Current**: `(exponent: number | null | undefined) => (base: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Raises base to exponent power using Math.pow; returns NaN on invalid input
- **Target**: `(exponent: number) => (base: number) => Result<MathError, number>`

### squareRoot
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Returns the non-negative square root; returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

### cubeRoot
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Returns the cube root using Math.cbrt; returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

### square
- **Current**: `(n?: number | null) => number | null`
- **Returns**: number | null
- **Description**: Squares the number
- **Target**: `(n: number) => Result<MathError, number>`

### cube
- **Current**: `(n?: number | null) => number | null`
- **Returns**: number | null
- **Description**: Cubes the number
- **Target**: `(n: number) => Result<MathError, number>`

### negate
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Negates a number (multiplies by -1); returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

### absoluteValue
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Returns the absolute value of a number; returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

### increment (and `incrementBy` that takes a first parameter increment?)
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Adds 1 to a number
- **Target**: `(n: number) => Result<MathError, number>`

### decrement (and `decrementBy` that takes a first parameter decrement?)
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Subtracts 1 from a number; returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

### modulo (must be correct and must have `remainder` as well)
- **Current**: `(divisor: number | null | undefined) => (dividend: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: True mathematical modulo; adjusts remainder sign; returns NaN on invalid input
- **Target**: `(divisor: number) => (dividend: number) => Result<MathError, number>`

### factorial
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input, Infinity for n>170)
- **Description**: Calculates n! for non-negative integers; returns Infinity for n>170 and NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

### ceiling
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Returns the smallest integer greater than or equal to n using Math.ceil; returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

### floor
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Returns the largest integer less than or equal to n using Math.floor; returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

### round
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Rounds to nearest integer; away-from-zero at .5; returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

### truncate
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Removes fractional part, returning integer portion using Math.trunc; returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

### exponential
- **Current**: `(exponent: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Returns e raised to the exponent power using Math.exp; returns NaN on invalid input
- **Target**: `(exponent: number) => Result<MathError, number>`

### logarithm
- **Current**: `(base: number | null | undefined) => (value: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Calculates logarithm with arbitrary base using change of base formula; returns NaN on invalid input (base must be positive and not 1, value must be non-negative)
- **Target**: `(base: number) => (value: number) => Result<MathError, number>`

### logarithmBase10
- **Current**: `(x: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Calculates base-10 logarithm using Math.log10; returns NaN on invalid input (x must be positive)
- **Target**: `(x: number) => Result<MathError, number>`

### clamp
- **Current**: `(min: number | null | undefined) => (max: number | null | undefined) => (value: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Constrains a number between min and max; returns NaN on invalid input
- **Target**: `(min: number) => (max: number) => (value: number) => Result<MathError, number>`

### sign (maybe `getSign`?)
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Returns the sign of a number (-1, 0, or 1) using Math.sign; returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

### sum
- **Current**: `(numbers: Array<number> | null | undefined) => number`
- **Returns**: number (0 for empty array, NaN on invalid input)
- **Description**: Sums an Array<number>; returns 0 for empty array; returns NaN on invalid input
- **Target**: `(numbers: Array<number>) => Result<MathError, number>`

### product
- **Current**: `(numbers: Array<number> | null | undefined) => number`
- **Returns**: number (1 for empty array, NaN on invalid input)
- **Description**: Multiplies an Array<number>; returns 1 for empty array; returns NaN on invalid input
- **Target**: `(numbers: Array<number>) => Result<MathError, number>`

---

## Migration Notes

Arithmetic functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when calculation succeeds with valid numeric input
2. Return `error(MathError)` when calculation fails, with descriptive error messages
3. Maintain currying for all multi-parameter functions
4. Preserve mathematical correctness and special case handling
5. Replace NaN returns with explicit error values
6. Replace null returns with explicit error values

## Special Considerations

### Return Value Patterns

#### Functions Returning null
- **add**, **subtract**, **multiply**, **divide**, **square**, **cube** return `null` on invalid input or non-finite values
- These check with `isFinite` before performing operations
- Should return `error(MathError)` in monadic form

#### Functions Returning NaN
- **power**, **squareRoot**, **cubeRoot**, **negate**, **absoluteValue**, **increment**, **decrement**, **modulo**, **factorial**, **ceiling**, **floor**, **round**, **truncate**, **exponential**, **logarithm**, **logarithmBase10**, **clamp**, **sign** return `NaN` on invalid input
- These check with `isNullish` and type checks before performing operations
- Should return `error(MathError)` in monadic form

#### Array Aggregate Functions
- **sum** returns `0` for empty array (additive identity)
- **product** returns `1` for empty array (multiplicative identity)
- Both return `NaN` for invalid input or arrays containing non-numeric values
- Should return `error(MathError)` for invalid input but `ok(identity)` for empty arrays

### Overloaded Functions

#### add
- **Binary curry**: `add(5)(3)` returns `8`
- **Array reduce**: `add([1, 2, 3, 4])` returns `10`
- Detected via `isArray` check on first parameter
- Both forms validate all inputs with `isFinite`
- Should maintain both forms in monadic version

#### multiply
- **Binary curry**: `multiply(5)(3)` returns `15`
- **Array reduce**: `multiply([2, 3, 4])` returns `24`
- Detected via `isArray` check on first parameter
- Both forms validate all inputs with `isFinite`
- Should maintain both forms in monadic version

### Arrow Function Syntax

Several functions use arrow syntax and need refactoring to named functions:
- **absoluteValue** (arrow function)
- **modulo** (arrow function)
- **decrement** (arrow function)
- **ceiling** (arrow function)
- **floor** (arrow function)
- **round** (arrow function)
- **exponential** (arrow function)
- **logarithm** (arrow function)
- **logarithmBase10** (arrow function)
- **clamp** (arrow function)
- **sign** (arrow function)
- **sum** (arrow function)
- **product** (arrow function)

### Complex Validation Logic

#### divide
- Validates both divisor and dividend with `isFinite`
- Explicitly checks for zero divisor: `divisor !== 0`
- Returns `null` if any validation fails

#### modulo
- Implements true mathematical modulo (not JavaScript's remainder operator `%`)
- Extensive validation: checks for nullish, non-number, NaN, division by zero, non-finite inputs
- Handles special case: infinite divisor returns dividend unchanged
- Adjusts sign to ensure result matches sign of divisor

#### factorial
- Validates input is integer using `Number.isInteger`
- Validates input is non-negative
- Returns `Infinity` for `n > 170` (overflow threshold)
- Uses iterative implementation with `let` and `for` loop (will need refactoring to functional approach)

#### logarithm
- Validates base is positive and not equal to 1
- Validates value is non-negative (0 returns -Infinity from Math.log)
- Uses change of base formula: `log_b(x) = ln(x) / ln(b)`

#### logarithmBase10
- Validates input is positive (x > 0)
- Returns `NaN` for x ≤ 0

#### clamp
- Validates all three parameters (min, max, value)
- Validates that min ≤ max, returns NaN if not
- Returns min if value < min
- Returns max if value > max
- Returns value if within range

### Mathematical Constants

Several functions reference constants from `src/vanilla/math/constants/`:
- **add** uses `ADDITIVE_IDENTITY` (0)
- **multiply** uses `MULTIPLICATIVE_IDENTITY` (1)

### Function Dependencies

#### add
- Depends on: `isArray`, `isFinite`, `all`, `reduce`, `sumAddends` (helper)
- Curried binary form or array reduce based on input type

#### multiply
- Depends on: `isArray`, `isFinite`, `all`, `reduce`, `multiplyFactors` (helper)
- Curried binary form or array reduce based on input type

#### subtract
- Depends on: `isFinite`
- Simple curried binary operation

#### divide
- Depends on: `isFinite`
- Simple curried binary operation with zero-divisor check

#### sum
- Depends on: `isEmpty`, `isNullish`
- Uses native `Array.prototype.reduce` and `Array.prototype.some`

#### product
- Depends on: `isNullish`
- Uses native `Array.prototype.reduce` and `Array.prototype.some`

### Special Cases and Edge Cases

#### Mathematical Infinity Handling
- **modulo**: Returns dividend unchanged when divisor is infinite
- **factorial**: Returns `Infinity` for n > 170 (JavaScript number overflow)
- **increment**: Returns `Infinity` when input is `Infinity`

#### Zero Handling
- **divide**: Explicitly prevents division by zero
- **modulo**: Returns NaN for zero divisor
- **logarithm**: Math.log(0) returns -Infinity, but value < 0 returns NaN
- **logarithmBase10**: Returns NaN for x ≤ 0

#### Negative Number Handling
- **squareRoot**: Math.sqrt of negative returns NaN
- **factorial**: Returns NaN for negative integers
- **logarithm**: Returns NaN for negative values
- **modulo**: Handles sign adjustment for negative dividend/divisor

#### Empty Array Handling
- **sum**: Returns 0 (additive identity)
- **product**: Returns 1 (multiplicative identity)

---

## Implementation Dependencies

When planning migration, consider these dependency chains:

### Validation Dependencies
- Most functions depend on `isNullish` from validation
- **add**, **subtract**, **multiply**, **divide** depend on `isFinite`
- **add**, **multiply** depend on `isArray`
- **square**, **cube** depend on `isNumber`
- **sum** depends on `isEmpty`

### Array Operation Dependencies
- **add** depends on `all`, `reduce`
- **multiply** depends on `all`, `reduce`
- **sum**, **product** use native array methods but should migrate to functional alternatives

### Helper Function Dependencies
- **add** has helper: `sumAddends`
- **multiply** has helper: `multiplyFactors`

### Refactoring Requirements
- Functions with `let` and `for` loops need functional rewrites:
  - **factorial** (uses `let` and `for` loop)
  - **sum** (uses `Array.prototype.reduce` and `Array.prototype.some`)
  - **product** (uses `Array.prototype.reduce` and `Array.prototype.some`)

---

## Notes

### Missing Standard Arithmetic Functions
Consider implementing these during migration:
- **remainder**: JavaScript's % operator (distinct from modulo)
- **reciprocal**: 1/n operation
- **root**: nth root operation (generalizes squareRoot and cubeRoot)
- **average/mean**: Already exists in separate file (not covered here)
- **gcd**: Already exists in separate file (not covered here)
- **lcm**: Already exists in separate file (not covered here)

### Constants Usage
The codebase defines mathematical constants in `src/vanilla/math/constants/`:
- `ADDITIVE_IDENTITY` = 0
- `MULTIPLICATIVE_IDENTITY` = 1

These should be used consistently in monadic implementations.

### Testing Considerations
When migrating, ensure comprehensive tests for:
- Infinity values (positive and negative)
- NaN inputs
- Zero values (including negative zero)
- Boundary conditions (factorial overflow, logarithm domains)
- Empty arrays (sum, product)
- Overloaded function forms (add, multiply)
