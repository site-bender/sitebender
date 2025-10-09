# Math - Aggregation Functions

**Location**: `src/vanilla/math/`
**Functions**: 9
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### Basic Statistical Aggregations

#### sum

- **Current**: `(numbers: Array<number> | null | undefined) => number`
- **Returns**: 0 for empty array; NaN on invalid input
- **Description**: Sums an Array<number>; returns 0 for empty array; returns NaN on invalid input
- **Target**: `(numbers: Array<number>) => Result<MathError, number>`

#### product

- **Current**: `(numbers: Array<number> | null | undefined) => number`
- **Returns**: 1 for empty array; NaN on invalid input
- **Description**: Multiplies an Array<number>; returns 1 for empty array; returns NaN on invalid input
- **Target**: `(numbers: Array<number>) => Result<MathError, number>`

#### average

- **Current**: `(numbers: Array<number> | null | undefined) => number`
- **Returns**: NaN on invalid input or empty array
- **Description**: Calculates the arithmetic mean of an Array<number>; returns NaN on invalid input
- **Target**: `(numbers: Array<number>) => Result<MathError, number>`

#### mean

- **Current**: Alias of average
- **Returns**: NaN on invalid input or empty array
- **Description**: Alias for average (arithmetic mean)
- **Target**: `(numbers: Array<number>) => Result<MathError, number>`

### Central Tendency Measures

#### median

- **Current**: `(numbers: Array<number> | null | undefined) => number`
- **Returns**: NaN on invalid input or empty array
- **Description**: Finds the median of an Array<number>; returns NaN on invalid input
- **Target**: `(numbers: Array<number>) => Result<MathError, number>`

#### mode

- **Current**: `(numbers: Array<number> | null | undefined) => Array<number>`
- **Returns**: Empty array on invalid input
- **Description**: Finds the most frequent value(s) in an Array<number>; returns [] on invalid input
- **Target**: `(numbers: Array<number>) => Result<MathError, Array<number>>`

### Specialized Means

#### geometricMean

- **Current**: `(values: Array<number> | null | undefined) => number`
- **Returns**: NaN on invalid input, empty array, or non-positive values
- **Description**: [INFERRED] Calculates the geometric mean of positive numbers; uses logarithms to avoid overflow; returns NaN on invalid input
- **Target**: `(values: Array<number>) => Result<MathError, number>`

#### harmonicMean

- **Current**: `(values: Array<number> | null | undefined) => number`
- **Returns**: NaN on invalid input, empty array, or non-positive values
- **Description**: [INFERRED] Calculates the harmonic mean of positive numbers; returns NaN on invalid input
- **Target**: `(values: Array<number>) => Result<MathError, number>`

#### rootMeanSquare

- **Current**: `(values: Array<number> | null | undefined) => number`
- **Returns**: NaN on invalid input or empty array
- **Description**: [INFERRED] Calculates the root mean square (RMS) of an array of numbers; returns NaN on invalid input
- **Target**: `(values: Array<number>) => Result<MathError, number>`

---

## Migration Notes

Aggregation functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when computation succeeds with valid input
2. Return `error(MathError)` when computation fails, with descriptive error messages
3. Eliminate special return values (NaN, empty arrays)
4. Preserve mathematical correctness for empty arrays (identity values where appropriate)
5. Support generic error types for different failure modes

## Special Considerations

### Arrow Function Syntax

All functions use arrow syntax and need refactoring to named functions:

- **sum** (arrow function)
- **product** (arrow function)
- **average** (arrow function)
- **geometricMean** (arrow function)
- **harmonicMean** (arrow function)
- **median** (named function)
- **mode** (named function)
- **rootMeanSquare** (named function)

### Loop Usage

Functions using loops need refactoring to functional equivalents:

- **sum**: Uses `Array.prototype.reduce` and `Array.prototype.some`
- **product**: Uses `Array.prototype.reduce` and `Array.prototype.some`
- **geometricMean**: Uses for-of loop to sum logarithms (lines 20-31)
- **harmonicMean**: Uses for-of loop to sum reciprocals (lines 18-30)

### Mutation Usage

Functions using mutable variables (let) need refactoring:

- **geometricMean**: Uses let sumOfLogs
- **harmonicMean**: Uses let sumOfReciprocals

### Empty Array Handling

#### Identity Values (Mathematically Correct)

- **sum** returns 0 for empty array (additive identity)
- **product** returns 1 for empty array (multiplicative identity)
- These are mathematically correct but should be reconsidered in monadic form

#### Error Values

- **average/mean** returns NaN for empty array (cannot divide by zero)
- **median** returns NaN for empty array (no middle value)
- **mode** returns [] for empty array (no values to count)
- **geometricMean** returns NaN for empty array
- **harmonicMean** returns NaN for empty array
- **rootMeanSquare** returns NaN for empty array

### Positive-only Functions

These functions require all values to be positive:

- **geometricMean**: Returns NaN for any value ≤ 0
- **harmonicMean**: Returns NaN for any value ≤ 0

Negative or zero values are mathematically invalid for these functions.

### Complex Algorithms

#### median

- Sorts array to find middle value(s)
- Average of two middle values for even-length arrays
- Uses spread operator to avoid mutation ✓
- Formula:
  - Odd length: middle value
  - Even length: (middle1 + middle2) / 2

#### mode

- Returns array of all values with maximum frequency
- Results are sorted in ascending order
- Handles multimodal distributions correctly (multiple values with same max frequency)
- Returns all tied values, not just first

#### geometricMean

- Uses logarithmic transformation to avoid overflow
- Formula: `exp((ln(x₁) + ln(x₂) + ... + ln(xₙ)) / n)`
- Equivalent to: `(x₁ × x₂ × ... × xₙ)^(1/n)`
- Requires all values > 0

#### harmonicMean

- Uses reciprocal transformation
- Formula: `n / (1/x₁ + 1/x₂ + ... + 1/xₙ)`
- Requires all values > 0
- Useful for averaging rates and ratios

#### rootMeanSquare

- Calculates RMS (quadratic mean)
- Formula: `sqrt((x₁² + x₂² + ... + xₙ²) / n)`
- Always non-negative
- Used in signal processing and statistics

---

## Implementation Dependencies

Aggregation functions have minimal dependencies outside the math domain:

- **sum** depends on **isEmpty** from array
- Most depend on **isNullish** from validation
- **median** depends on array sorting
- **mode** depends on frequency counting (Map operations)

These dependencies should be considered when planning migration order.

---

## Error Categories

When migrating to Result type, errors should be categorized:

### ValidationError

- Type errors (not an array, null/undefined)
- Used by: all functions for input validation

### MathError (new type needed)

- Empty collection errors (average of empty array, median of empty array)
- Invalid value errors (negative values in geometricMean, harmonicMean)
- Domain errors (zero values in harmonicMean)

### Expected Behavior vs Errors

Decision needed for:

- Empty array to sum: 0 (identity) or error?
- Empty array to product: 1 (identity) or error?
- Empty array to average: NaN or error?
- Empty array to mode: empty array or error?

**Recommendation**: Keep identity values for sum/product (mathematically sound), error for others.

---

## Related Functions

### In Other Categories

- **add** (in MATH_ARITHMETIC.md) - binary operation, sum is array version
- **multiply** (in MATH_ARITHMETIC.md) - binary operation, product is array version

### Potential New Functions

Consider adding these aggregation functions in monadic implementation:

- **variance** - measure of dispersion
- **standardDeviation** - square root of variance
- **range** - max - min
- **quantile** - generalization of median (percentiles)
- **interquartileRange** - Q3 - Q1
- **weightedAverage** - weighted arithmetic mean
- **movingAverage** - sliding window average

---

## Testing Considerations

When migrating, ensure comprehensive tests for:

- Empty arrays (identity values vs errors)
- Single-element arrays
- Arrays with duplicate values (for mode)
- Arrays with all same values (for mode)
- Negative values (for geometricMean, harmonicMean)
- Zero values (for geometricMean, harmonicMean)
- Very large values (overflow concerns)
- Very small values (underflow concerns)
- Mixed positive and negative values
- Even vs odd length arrays (for median)
