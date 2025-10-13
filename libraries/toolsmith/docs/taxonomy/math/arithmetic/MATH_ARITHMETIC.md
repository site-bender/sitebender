# Math - Arithmetic Functions

**Location**: `src/math/`
**Functions**: 15
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### Basic Binary Operations

#### add (consider only binary operation, use sum for arrays)

- **Current**: `(addend: number) => (augend: number) => number | null` OR `(addends: Array<number>) => number | null`
- **Returns**: number | null
- **Description**: Adds numbers: number→(number→sum) or Array<number>→sum; null on non-finite
- **Overloaded**: Yes - curried binary operation OR array reduce
- **Target**: `(addend: number) => (augend: number) => Result<MathError, number>` OR `(addends: Array<number>) => Result<MathError, number>`

#### subtract

- **Current**: `(subtrahend: number) => (minuend: number) => number | null`
- **Returns**: number | null
- **Description**: Subtracts numbers: subtrahend→(minuend→minuend−subtrahend); null on non-finite
- **Target**: `(subtrahend: number) => (minuend: number) => Result<MathError, number>`

#### multiply (consider only binary operation, use product for arrays)

- **Current**: `(multiplier: number) => (multiplicand: number) => number | null` OR `(factors: Array<number>) => number | null`
- **Returns**: number | null
- **Description**: Multiplies numbers: number→(number→product) or Array<number>→product; null on non-finite
- **Overloaded**: Yes - curried binary operation OR array reduce
- **Target**: `(multiplier: number) => (multiplicand: number) => Result<MathError, number>` OR `(factors: Array<number>) => Result<MathError, number>`

#### divide (should this be `divideBy` for clarity?)

- **Current**: `(divisor: number) => (dividend: number) => number | null`
- **Returns**: number | null
- **Description**: Divides numbers: number→(number→quotient); null on non-finite or zero divisor
- **Target**: `(divisor: number) => (dividend: number) => Result<MathError, number>`

### Power and Root Operations

#### power (maybe `raiseToPower` with alias?)

- **Current**: `(exponent: number | null | undefined) => (base: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Raises base to exponent power using Math.pow; returns NaN on invalid input
- **Target**: `(exponent: number) => (base: number) => Result<MathError, number>`

#### squareRoot

- **Current**: `(n: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Returns the non-negative square root; returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

#### cubeRoot

- **Current**: `(n: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Returns the cube root using Math.cbrt; returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

#### square

- **Current**: `(n?: number | null) => number | null`
- **Returns**: number | null
- **Description**: Squares the number
- **Target**: `(n: number) => Result<MathError, number>`

#### cube

- **Current**: `(n?: number | null) => number | null`
- **Returns**: number | null
- **Description**: Cubes the number
- **Target**: `(n: number) => Result<MathError, number>`

### Unary Arithmetic Operations

#### negate

- **Current**: `(n: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Negates a number (multiplies by -1); returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

#### increment (and `incrementBy` that takes a first parameter increment?)

- **Current**: `(n: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Adds 1 to a number
- **Target**: `(n: number) => Result<MathError, number>`

#### decrement (and `decrementBy` that takes a first parameter decrement?)

- **Current**: `(n: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Subtracts 1 from a number; returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

### Modular Arithmetic

#### modulo (must be correct and must have `remainder` as well)

- **Current**: `(divisor: number | null | undefined) => (dividend: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: True mathematical modulo; adjusts remainder sign; returns NaN on invalid input
- **Target**: `(divisor: number) => (dividend: number) => Result<MathError, number>`

### Exponential and Logarithmic Functions

#### exponential

- **Current**: `(exponent: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Returns e raised to the exponent power using Math.exp; returns NaN on invalid input
- **Target**: `(exponent: number) => Result<MathError, number>`

#### logarithm

- **Current**: `(base: number | null | undefined) => (value: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Calculates logarithm with arbitrary base using change of base formula; returns NaN on invalid input (base must be positive and not 1, value must be non-negative)
- **Target**: `(base: number) => (value: number) => Result<MathError, number>`

#### logarithmBase10

- **Current**: `(x: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: [INFERRED] Calculates base-10 logarithm using Math.log10; returns NaN on invalid input (x must be positive)
- **Target**: `(x: number) => Result<MathError, number>`

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

- **power**, **squareRoot**, **cubeRoot**, **negate**, **increment**, **decrement**, **modulo**, **exponential**, **logarithm**, **logarithmBase10** return `NaN` on invalid input
- These check with `isNullish` and type checks before performing operations
- Should return `error(MathError)` in monadic form

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

- **modulo** (arrow function)
- **decrement** (arrow function)
- **exponential** (arrow function)
- **logarithm** (arrow function)
- **logarithmBase10** (arrow function)

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

#### logarithm

- Validates base is positive and not equal to 1
- Validates value is non-negative (0 returns -Infinity from Math.log)
- Uses change of base formula: `log_b(x) = ln(x) / ln(b)`

#### logarithmBase10

- Validates input is positive (x > 0)
- Returns `NaN` for x ≤ 0

### Mathematical Constants

Several functions reference constants from `src/math/constants/`:

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

### Special Cases and Edge Cases

#### Mathematical Infinity Handling

- **modulo**: Returns dividend unchanged when divisor is infinite
- **increment**: Returns `Infinity` when input is `Infinity`

#### Zero Handling

- **divide**: Explicitly prevents division by zero
- **modulo**: Returns NaN for zero divisor
- **logarithm**: Math.log(0) returns -Infinity, but value < 0 returns NaN
- **logarithmBase10**: Returns NaN for x ≤ 0

#### Negative Number Handling

- **squareRoot**: Math.sqrt of negative returns NaN
- **logarithm**: Returns NaN for negative values
- **modulo**: Handles sign adjustment for negative dividend/divisor

---

## Implementation Dependencies

When planning migration, consider these dependency chains:

### Validation Dependencies

- Most functions depend on `isNullish` from validation
- **add**, **subtract**, **multiply**, **divide** depend on `isFinite`
- **add**, **multiply** depend on `isArray`
- **square**, **cube** depend on `isNumber`

### Array Operation Dependencies

- **add** depends on `all`, `reduce`
- **multiply** depends on `all`, `reduce`

### Helper Function Dependencies

- **add** has helper: `sumAddends`
- **multiply** has helper: `multiplyFactors`

---

## Notes

### Missing Standard Arithmetic Functions

Consider implementing these during migration:

- **remainder**: JavaScript's % operator (distinct from modulo)
- **reciprocal**: 1/n operation
- **root**: nth root operation (generalizes squareRoot and cubeRoot)

### Testing Considerations

When migrating, ensure comprehensive tests for:

- Infinity values (positive and negative)
- NaN inputs
- Zero values (including negative zero)
- Boundary conditions (logarithm domains)
- Overloaded function forms (add, multiply)
