# Math - Integer Functions

**Location**: `src/math/`
**Functions**: 11
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### Basic Integer Operations

#### factorial

- **Current**: `(n: number | null | undefined) => number`
- **Returns**: Infinity for n>170; NaN on invalid input or negative numbers
- **Description**: Calculates n! for non-negative integers; returns Infinity for n>170 and NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

### Divisibility and Factors

#### gcd (also `greatestCommonDivisor` with this aliased to it)

- **Current**: `(a: number | null | undefined) => (b: number | null | undefined) => number`
- **Returns**: NaN on invalid input or gcd(0,0)
- **Description**: Calculates the greatest common divisor (GCD) of two integers; returns NaN on invalid input
- **Target**: `(a: number) => (b: number) => Result<MathError, number>`

#### lcm (also `leastCommonMultiple` with this aliased to it)

- **Current**: `(a: number | null | undefined) => (b: number | null | undefined) => number`
- **Returns**: NaN on invalid input or when either value is 0
- **Description**: Calculates the least common multiple (LCM) of two integers; returns NaN on invalid input
- **Target**: `(a: number) => (b: number) => Result<MathError, number>`

#### divisors

- **Current**: `(n: number | null | undefined) => Array<number>`
- **Returns**: Empty array on invalid input or non-positive integers
- **Description**: [INFERRED] Finds all divisors of a positive integer in ascending order; returns [] on invalid input
- **Target**: `(n: number) => Result<MathError, Array<number>>`

### Prime Numbers

#### isPrime

- **Current**: `(n: number | null | undefined) => boolean`
- **Returns**: false on invalid input, non-integers, or non-prime numbers
- **Description**: [INFERRED] Checks if a number is a prime number (integer > 1 divisible only by 1 and itself); returns false on invalid input
- **Target**: `(n: number) => Result<ValidationError, number>`

#### primeFactorization

- **Current**: `(n: number | null | undefined) => Map<number, number>`
- **Returns**: Empty Map on invalid input or n <= 1
- **Description**: [INFERRED] Calculates prime factorization of a positive integer, returning Map of prime factors to their exponents; returns empty Map on invalid input
- **Target**: `(n: number) => Result<MathError, Map<number, number>>`

### Number Theory Functions

#### totient

- **Current**: `(n: number | null | undefined) => number`
- **Returns**: NaN on invalid input or n <= 0
- **Description**: [INFERRED] Calculates Euler's totient function φ(n) - count of integers ≤ n that are coprime to n; returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

#### digitSum

- **Current**: `(n: number | null | undefined) => number`
- **Returns**: NaN on invalid input or infinite values
- **Description**: [INFERRED] Calculates the sum of digits in the absolute value of an integer; returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

### Combinatorics

#### binomialCoefficient

- **Current**: `(n: number | null | undefined) => (k: number | null | undefined) => number`
- **Returns**: NaN on invalid input, negative values, or k > n
- **Description**: [INFERRED] Calculates binomial coefficient C(n,k) = n!/(k!(n-k)!); returns NaN on invalid input
- **Target**: `(n: number) => (k: number) => Result<MathError, number>`

#### combinations

- **Current**: `(n: number | null | undefined) => (r: number | null | undefined) => number`
- **Returns**: NaN on invalid input, negative values, or r > n
- **Description**: [INFERRED] Calculates number of ways to choose r items from n items (alias of binomialCoefficient); returns NaN on invalid input
- **Alias**: Alias of binomialCoefficient
- **Target**: `(n: number) => (r: number) => Result<MathError, number>`

#### permutations

- **Current**: `(n: number | null | undefined) => (r: number | null | undefined) => number`
- **Returns**: NaN on invalid input, negative values, or r > n
- **Description**: [INFERRED] Calculates number of ways to arrange r items from n items P(n,r) = n!/(n-r)!; returns NaN on invalid input
- **Target**: `(n: number) => (r: number) => Result<MathError, number>`

---

## Migration Notes

Integer functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when computation succeeds with valid integer input
2. Return `error(MathError)` when computation fails, with descriptive error messages
3. Maintain currying for multi-parameter functions
4. Eliminate NaN/empty returns in favor of explicit error types
5. Validate integer constraints before computation
6. Handle overflow conditions explicitly

## Special Considerations

### Arrow Function Syntax

Several functions use arrow syntax and need refactoring to named functions:

- **factorial** (arrow function)
- **gcd** (arrow function)
- **lcm** (arrow function)
- **binomialCoefficient** (arrow function)
- **permutations** (arrow function)
- **totient** (arrow function)
- **digitSum** (arrow function)

### Loop Usage

Functions using loops need refactoring to functional equivalents:

- **factorial**: Uses for loop (lines 33-36)
- **gcd**: Uses while loop for Euclidean algorithm (lines 34-38)
- **isPrime**: Uses for loop for divisor checking (lines 37-42)
- **divisors**: Uses for loop for finding divisors (lines 25-34)
- **totient**: Uses while loops and for loop (lines 32-46)
- **digitSum**: Uses for-of loop to iterate over digit string (lines 22-24)

### Mutation Usage

Functions using mutable variables (let) need refactoring:

- **factorial**: Uses let result and let i
- **gcd**: Uses let x and let y
- **totient**: Uses let result and let temp
- **digitSum**: Uses let sum
- **divisors**: Mutates result array with push

### Integer Validation

All functions require integer inputs and must validate:

- Input is a number (not null/undefined)
- Input is finite
- Input is an integer (using `Number.isInteger`)
- Input meets domain constraints (non-negative for factorial, positive for divisors, etc.)

### Complex Algorithms

#### factorial

- Calculates n! for non-negative integers
- Returns Infinity for n > 170 due to JavaScript number overflow
- Uses iterative multiplication with for loop (needs functional rewrite)
- Special cases: 0! = 1, 1! = 1

#### gcd (Greatest Common Divisor)

- Implements Euclidean algorithm with while loop
- Returns NaN for gcd(0,0) (mathematically undefined)
- Returns |a| for gcd(a,0) and |b| for gcd(0,b)
- Works with negative integers (uses absolute values)

#### lcm (Least Common Multiple)

- Depends on gcd: `lcm(a,b) = |a × b| / gcd(a,b)`
- Returns NaN when either input is 0
- Works with negative integers (uses absolute values)

#### divisors

- Finds all divisors from 1 to n (inclusive)
- Returns sorted array in ascending order
- Optimized: only checks up to √n
- Returns empty array for n <= 0

#### isPrime

- Checks if n is prime (integer > 1 divisible only by 1 and itself)
- Returns false for n <= 1
- Returns false for non-integers
- Optimized: only checks divisors up to √n
- Uses for loop (needs functional rewrite)

#### primeFactorization

- Returns Map<prime, exponent>
- Uses recursive factorization with helper functions
- Already functional style internally (extractFactor, factorize)
- Returns empty Map for n <= 1

#### totient (Euler's Totient Function)

- Calculates φ(n) = count of integers ≤ n coprime to n
- Uses prime factorization approach
- Formula: φ(n) = n × ∏(1 - 1/p) for all prime factors p
- Special case: φ(1) = 1

#### digitSum

- Sums digits of absolute value of integer
- Converts to string, iterates over characters
- Uses for-of loop with let (needs functional rewrite)
- Returns NaN for infinite values

#### binomialCoefficient

- Calculates C(n,k) = n! / (k! × (n-k)!)
- Optimized to avoid large factorials: uses multiplication/division
- Returns 1 for k = 0 or k = n
- Returns 0 for k > n or k < 0

#### permutations

- Calculates P(n,r) = n! / (n-r)!
- Returns NaN for r > n or r < 0
- Can overflow for large values

---

## Implementation Dependencies

Integer functions have several dependencies:

### Internal Dependencies

- **lcm** depends on **gcd**
- **totient** depends on **primeFactorization**
- **binomialCoefficient** may depend on **factorial** (or optimized approach)
- **permutations** may depend on **factorial** (or optimized approach)

### External Dependencies

- Most depend on **isNullish** from validation
- Most depend on **Number.isInteger** for validation
- **divisors** may benefit from **isPrime** for optimization
- **digitSum** depends on string conversion

Migration order: gcd → lcm, primeFactorization → totient

---

## Error Categories

When migrating to Result type, errors should be categorized:

### ValidationError

- Type errors (not a number, null/undefined, not an integer)
- **isPrime** returns false for invalid input (should be error)

### MathError (new type needed)

- Domain errors:
  - Negative input to factorial
  - Non-positive input to divisors, isPrime, primeFactorization
  - Zero input to lcm
  - gcd(0,0) special case
  - k > n in binomialCoefficient
  - r > n in permutations
- Overflow errors:
  - factorial > 170
  - Large binomial coefficients
  - Large permutations
- Invalid value errors:
  - Infinite values to digitSum

---

## Related Functions

### In Other Categories

- **modularExponentiation** (in MATH_MODULAR.md) - uses integer operations
- **fibonacci** (in MATH_SEQUENCE.md) - integer sequence

### Potential New Functions

Consider adding these integer functions in monadic implementation:

- **isPerfect** - check if sum of divisors equals n
- **isAbundant** - check if sum of divisors > n
- **isDeficient** - check if sum of divisors < n
- **divisorSum** - sum of all divisors (sigma function)
- **divisorCount** - count of divisors (tau function)
- **nthPrime** - get nth prime number
- **primesBetween** - list primes in range
- **nextPrime** - find next prime after n
- **mobius** - Möbius function μ(n)

---

## Testing Considerations

When migrating, ensure comprehensive tests for:

- Negative integers (absolute value handling)
- Zero values (special cases)
- Non-integer values (should error)
- Large values (overflow conditions):
  - factorial > 170
  - Large binomial coefficients
- Prime numbers (edge cases: 2, 3, large primes)
- Composite numbers
- Powers of primes
- gcd(0,0) and lcm(0,n) edge cases
- Small values (0, 1, 2)
