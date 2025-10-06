# Math - Operation Functions

**Location**: `src/vanilla/math/`
**Functions**: 29
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### Comparison and Ordering

#### max
- **Current**: `(a: number | null | undefined) => (b: number | null | undefined) => number`
- **Returns**: NaN on invalid input
- **Description**: Returns the larger of two numbers; returns NaN on invalid input
- **Target**: `(a: number | null | undefined) => (b: number | null | undefined) => Result<MathError, number>`

#### min
- **Current**: `(a: number | null | undefined) => (b: number | null | undefined) => number`
- **Returns**: NaN on invalid input
- **Description**: Returns the smaller of two numbers; returns NaN on invalid input
- **Target**: `(a: number | null | undefined) => (b: number | null | undefined) => Result<MathError, number>`

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

#### clamp
- **Current**: `(min: number | null | undefined) => (max: number | null | undefined) => (value: number | null | undefined) => number`
- **Returns**: NaN on invalid input
- **Description**: Constrains a number between min and max; returns NaN on invalid input
- **Target**: `(min: number | null | undefined) => (max: number | null | undefined) => (value: number | null | undefined) => Result<MathError, number>`

### Sign and Absolute Value

#### sign
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: NaN on invalid input; otherwise -1, 0, or 1
- **Description**: [INFERRED] Returns the sign of a number (-1 for negative, 0 for zero, 1 for positive); returns NaN on invalid input
- **Target**: `(n: number | null | undefined) => Result<MathError, number>`

#### absoluteValue
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: NaN on invalid input
- **Description**: Returns the absolute value of a number; returns NaN on invalid input
- **Target**: `(n: number | null | undefined) => Result<MathError, number>`

#### negate
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: NaN on invalid input
- **Description**: [INFERRED] Returns the negation of a number; returns NaN on invalid input
- **Target**: `(n: number | null | undefined) => Result<MathError, number>`

### Array Operations

#### sum
- **Current**: `(numbers: Array<number> | null | undefined) => number`
- **Returns**: 0 for empty array; NaN on invalid input
- **Description**: Sums an Array<number>; returns 0 for empty array; returns NaN on invalid input
- **Target**: `(numbers: Array<number> | null | undefined) => Result<MathError, number>`

#### product
- **Current**: `(numbers: Array<number> | null | undefined) => number`
- **Returns**: 1 for empty array; NaN on invalid input
- **Description**: Multiplies an Array<number>; returns 1 for empty array; returns NaN on invalid input
- **Target**: `(numbers: Array<number> | null | undefined) => Result<MathError, number>`

#### average
- **Current**: `(numbers: Array<number> | null | undefined) => number`
- **Returns**: NaN on invalid input or empty array
- **Description**: Calculates the arithmetic mean of an Array<number>; returns NaN on invalid input
- **Target**: `(numbers: Array<number> | null | undefined) => Result<MathError, number>`

#### mean
- **Current**: Alias of average
- **Returns**: NaN on invalid input or empty array
- **Description**: Alias for average (arithmetic mean)
- **Target**: `(numbers: Array<number> | null | undefined) => Result<MathError, number>`

#### median
- **Current**: `(numbers: Array<number> | null | undefined) => number`
- **Returns**: NaN on invalid input or empty array
- **Description**: Finds the median of an Array<number>; returns NaN on invalid input
- **Target**: `(numbers: Array<number> | null | undefined) => Result<MathError, number>`

#### mode
- **Current**: `(numbers: Array<number> | null | undefined) => Array<number>`
- **Returns**: Empty array on invalid input
- **Description**: Finds the most frequent value(s) in an Array<number>; returns [] on invalid input
- **Target**: `(numbers: Array<number> | null | undefined) => Result<MathError, Array<number>>`

#### geometricMean
- **Current**: `(values: Array<number> | null | undefined) => number`
- **Returns**: NaN on invalid input, empty array, or non-positive values
- **Description**: [INFERRED] Calculates the geometric mean of positive numbers; uses logarithms to avoid overflow; returns NaN on invalid input
- **Target**: `(values: Array<number> | null | undefined) => Result<MathError, number>`

#### harmonicMean
- **Current**: `(values: Array<number> | null | undefined) => number`
- **Returns**: NaN on invalid input, empty array, or non-positive values
- **Description**: [INFERRED] Calculates the harmonic mean of positive numbers; returns NaN on invalid input
- **Target**: `(values: Array<number> | null | undefined) => Result<MathError, number>`

#### rootMeanSquare
- **Current**: `(values: Array<number> | null | undefined) => number`
- **Returns**: NaN on invalid input or empty array
- **Description**: [INFERRED] Calculates the root mean square (RMS) of an array of numbers; returns NaN on invalid input
- **Target**: `(values: Array<number> | null | undefined) => Result<MathError, number>`

### Range and Validation

#### inRange
- **Current**: `(start: number | null | undefined) => (end: number | null | undefined) => (value: number | null | undefined) => boolean`
- **Returns**: false on invalid input
- **Description**: Checks if a number is within a [start, end) range; returns false on invalid input
- **Target**: `(start: number | null | undefined) => (end: number | null | undefined) => (value: number | null | undefined) => Result<ValidationError, number>`

### Integer Operations

#### factorial
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: Infinity for n>170; NaN on invalid input or negative numbers
- **Description**: Calculates n! for non-negative integers; returns Infinity for n>170 and NaN on invalid input
- **Target**: `(n: number | null | undefined) => Result<MathError, number>`

#### gcd (also `greatestCommonDivisor` with this aliased to it)
- **Current**: `(a: number | null | undefined) => (b: number | null | undefined) => number`
- **Returns**: NaN on invalid input or gcd(0,0)
- **Description**: Calculates the greatest common divisor (GCD) of two integers; returns NaN on invalid input
- **Target**: `(a: number | null | undefined) => (b: number | null | undefined) => Result<MathError, number>`

#### lcm (also `leastCommonMultiple` with this aliased to it)
- **Current**: `(a: number | null | undefined) => (b: number | null | undefined) => number`
- **Returns**: NaN on invalid input or when either value is 0
- **Description**: Calculates the least common multiple (LCM) of two integers; returns NaN on invalid input
- **Target**: `(a: number | null | undefined) => (b: number | null | undefined) => Result<MathError, number>`

#### divisors
- **Current**: `(n: number | null | undefined) => Array<number>`
- **Returns**: Empty array on invalid input or non-positive integers
- **Description**: [INFERRED] Finds all divisors of a positive integer in ascending order; returns [] on invalid input
- **Target**: `(n: number | null | undefined) => Result<MathError, Array<number>>`

#### isPrime
- **Current**: `(n: number | null | undefined) => boolean`
- **Returns**: false on invalid input, non-integers, or non-prime numbers
- **Description**: [INFERRED] Checks if a number is a prime number (integer > 1 divisible only by 1 and itself); returns false on invalid input
- **Target**: `(n: number | null | undefined) => Result<ValidationError, number>`

#### primeFactorization
- **Current**: `(n: number | null | undefined) => Map<number, number>`
- **Returns**: Empty Map on invalid input or n <= 1
- **Description**: [INFERRED] Calculates prime factorization of a positive integer, returning Map of prime factors to their exponents; returns empty Map on invalid input
- **Target**: `(n: number | null | undefined) => Result<MathError, Map<number, number>>`

#### totient
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: NaN on invalid input or n <= 0
- **Description**: [INFERRED] Calculates Euler's totient function φ(n) - count of integers ≤ n that are coprime to n; returns NaN on invalid input
- **Target**: `(n: number | null | undefined) => Result<MathError, number>`

#### digitSum
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: NaN on invalid input or infinite values
- **Description**: [INFERRED] Calculates the sum of digits in the absolute value of an integer; returns NaN on invalid input
- **Target**: `(n: number | null | undefined) => Result<MathError, number>`

### Combinatorics

#### binomialCoefficient
- **Current**: `(n: number | null | undefined) => (k: number | null | undefined) => number`
- **Returns**: NaN on invalid input, negative values, or k > n
- **Description**: [INFERRED] Calculates binomial coefficient C(n,k) = n!/(k!(n-k)!); returns NaN on invalid input
- **Target**: `(n: number | null | undefined) => (k: number | null | undefined) => Result<MathError, number>`

#### combinations
- **Current**: `(n: number | null | undefined) => (r: number | null | undefined) => number`
- **Returns**: NaN on invalid input, negative values, or r > n
- **Description**: [INFERRED] Calculates number of ways to choose r items from n items (alias of binomialCoefficient); returns NaN on invalid input
- **Target**: `(n: number | null | undefined) => (r: number | null | undefined) => Result<MathError, number>`

#### permutations
- **Current**: `(n: number | null | undefined) => (r: number | null | undefined) => number`
- **Returns**: NaN on invalid input, negative values, or r > n
- **Description**: [INFERRED] Calculates number of ways to arrange r items from n items P(n,r) = n!/(n-r)!; returns NaN on invalid input
- **Target**: `(n: number | null | undefined) => (r: number | null | undefined) => Result<MathError, number>`

### Sequences

#### fibonacci
- **Current**: `(n: number | null | undefined) => number`
- **Returns**: NaN on invalid input, negative numbers, or n > 78
- **Description**: [INFERRED] Calculates the nth Fibonacci number; limited to n ≤ 78 to avoid exceeding MAX_SAFE_INTEGER; returns NaN on invalid input
- **Target**: `(n: number | null | undefined) => Result<MathError, number>`

### Modular Arithmetic

#### modularExponentiation
- **Current**: `(base: number | null | undefined) => (exponent: number | null | undefined) => (modulus: number | null | undefined) => number`
- **Returns**: NaN on invalid input, negative exponent, or non-positive modulus
- **Description**: [INFERRED] Calculates (base^exponent) mod modulus efficiently using binary exponentiation; returns NaN on invalid input
- **Target**: `(base: number | null | undefined) => (exponent: number | null | undefined) => (modulus: number | null | undefined) => Result<MathError, number>`

### Random Numbers

#### random
- **Current**: `(min: number | null | undefined) => (max: number | null | undefined) => number`
- **Returns**: NaN on invalid input or min >= max
- **Description**: Generates a random float in [min, max); returns NaN on invalid range
- **Target**: `(min: number | null | undefined) => (max: number | null | undefined) => Result<MathError, number>`

#### randomInteger
- **Current**: `(min: number | null | undefined) => (max: number | null | undefined) => number`
- **Returns**: NaN on invalid input, non-integers, or min >= max
- **Description**: [INFERRED] Generates a random integer in [min, max); returns NaN on invalid range
- **Target**: `(min: number | null | undefined) => (max: number | null | undefined) => Result<MathError, number>`

### Equation Solving

#### quadratic
- **Current**: `(a: number | null | undefined) => (b: number | null | undefined) => (c: number | null | undefined) => Pair<number, number>`
- **Returns**: Pair(NaN, NaN) on invalid input, a=0, or negative discriminant
- **Description**: [INFERRED] Solves quadratic equation ax² + bx + c = 0, returning pair of real roots [x1, x2]; returns Pair(NaN, NaN) on invalid input (will return Result)
- **Target**: `(a: number | null | undefined) => (b: number | null | undefined) => (c: number | null | undefined) => Result<MathError, Pair<number, number>>`

---

## Migration Notes

Math operation functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when computation succeeds with valid input
2. Return `error(MathError)` when computation fails, with descriptive error messages
3. Maintain currying for multi-parameter functions
4. Preserve type safety while adding error context
5. Eliminate special return values (NaN, empty arrays, Infinity where inappropriate)
6. Support generic types for comparison operators (maxBy, minBy)

## Special Considerations

### Arrow Function Syntax
Several functions use arrow syntax and need refactoring to named functions:
- **max** (arrow function)
- **min** (arrow function)
- **clamp** (arrow function)
- **sign** (arrow function)
- **absoluteValue** (arrow function)
- **factorial** (arrow function)
- **gcd** (arrow function)
- **lcm** (arrow function)
- **sum** (arrow function)
- **product** (arrow function)
- **average** (arrow function)
- **geometricMean** (arrow function)
- **harmonicMean** (arrow function)
- **inRange** (arrow function)
- **maxBy** (arrow function)
- **binomialCoefficient** (arrow function)
- **permutations** (arrow function)
- **fibonacci** (arrow function)
- **totient** (arrow function)
- **digitSum** (arrow function)
- **modularExponentiation** (arrow function)
- **quadratic** (arrow function)
- **random** (arrow function)

### Loop Usage
Functions using loops need refactoring to functional equivalents:
- **factorial**: Uses for loop (lines 33-36)
- **gcd**: Uses while loop for Euclidean algorithm (lines 34-38)
- **isPrime**: Uses for loop for divisor checking (lines 37-42)
- **divisors**: Uses for loop for finding divisors (lines 25-34)
- **fibonacci**: Uses for loop for iterative calculation (lines 36-40)
- **totient**: Uses while loops and for loop (lines 32-46)
- **digitSum**: Uses for-of loop to iterate over digit string (lines 22-24)
- **geometricMean**: Uses for-of loop to sum logarithms (lines 20-31)
- **harmonicMean**: Uses for-of loop to sum reciprocals (lines 18-30)

### Mutation Usage
Functions using mutable variables (let) need refactoring:
- **factorial**: Uses let result and let i
- **gcd**: Uses let x and let y
- **fibonacci**: Uses let prev and let curr
- **totient**: Uses let result and let temp
- **digitSum**: Uses let sum
- **geometricMean**: Uses let sumOfLogs
- **harmonicMean**: Uses let sumOfReciprocals
- **divisors**: Mutates result array with push

### NaN Return Values
Most functions return NaN on error, which will be replaced with Result error values:
- Validation errors (type checking, null/undefined inputs)
- Domain errors (negative factorial, empty array average, etc.)
- Range errors (invalid min/max bounds, k > n in binomialCoefficient)
- Overflow errors (factorial > 170, fibonacci > 78)

### Empty Array Returns
Functions returning empty arrays on error:
- **divisors**: Returns [] on invalid input
- **mode**: Returns [] on invalid input
- **primeFactorization**: Returns empty Map on invalid input

### Special Return Behaviors

#### sum and product
- **sum** returns 0 for empty array (additive identity)
- **product** returns 1 for empty array (multiplicative identity)
- These are mathematically correct but should be reconsidered in monadic form

#### Infinity Returns
- **factorial** returns Infinity for n > 170 due to overflow
- Should return error in monadic form with overflow information

#### Auto-swapping
- **inRange** automatically swaps start and end if start > end
- Should this be an error or maintained in monadic form?

#### Tie-breaking
- **maxBy** and **minBy** return second value when mapped values are equal
- Document this behavior in monadic form

### Positive-only Functions
These functions require all values to be positive:
- **geometricMean**: Returns NaN for any value ≤ 0
- **harmonicMean**: Returns NaN for any value ≤ 0

### Integer-only Functions
These functions require integer inputs:
- **factorial**, **gcd**, **lcm**, **divisors**, **isPrime**, **primeFactorization**
- **totient**, **binomialCoefficient**, **combinations**, **permutations**
- **fibonacci**, **modularExponentiation**, **randomInteger**

### Complex Algorithms

#### primeFactorization
- Returns Map<prime, exponent>
- Uses recursive factorization with helper functions
- Already functional style internally (extractFactor, factorize)

#### modularExponentiation
- Implements binary exponentiation algorithm
- Already uses recursive functional approach (binaryPower helper)
- Handles negative bases correctly by normalizing

#### quadratic
- Returns Pair<number, number> for roots
- Returns Pair(NaN, NaN) for no real roots (negative discriminant)
- Should return Result with error for complex roots

#### median
- Sorts array to find middle value(s)
- Average of two middle values for even-length arrays
- Uses spread operator to avoid mutation ✓

#### mode
- Returns array of all values with maximum frequency
- Results are sorted in ascending order
- Handles multimodal distributions correctly

### Dependencies
Several functions depend on other math operations:
- **lcm**: depends on gcd
- **mean**: is an alias of average
- **combinations**: essentially same as binomialCoefficient
- **quadratic**: depends on pair from tuple

---

## Implementation Dependencies

Math operation functions have minimal dependencies outside the math domain:
- Most depend on **isNullish** from validation
- **quadratic** depends on **pair** from tuple
- **sum** depends on **isEmpty** from array
- **lcm** depends on **gcd** from math

These dependencies should be considered when planning migration order.

---

## Error Categories

When migrating to Result type, errors should be categorized:

### ValidationError
- Type errors (not a number, not an array, null/undefined)
- **isPrime** returns false for invalid input (should be error)
- **inRange** returns false for invalid input (should be error)

### MathError (new type needed)
- Domain errors (factorial of negative, sqrt of negative)
- Range errors (k > n in binomial coefficient)
- Empty collection errors (average of empty array)
- Overflow errors (factorial > 170, fibonacci > 78)
- Invalid equation errors (quadratic with a=0, negative discriminant)
- Invalid range errors (min >= max in random functions)
- Special value errors (gcd(0,0), lcm with 0)

### Expected Behavior vs Errors
Decision needed for:
- Empty array to sum: 0 (identity) or error?
- Empty array to product: 1 (identity) or error?
- Auto-swap in inRange: maintain or error?
- Mode of empty array: empty array or error?
