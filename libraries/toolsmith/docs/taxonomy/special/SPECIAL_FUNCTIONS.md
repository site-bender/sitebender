# Special Mathematical Functions

**Location**: `src/vanilla/special/`
**Functions**: 8
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### beta

- **Current**: `(x: number | null | undefined) => (y: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates beta function: B(x,y) = Γ(x)Γ(y)/Γ(x+y); uses gamma function; returns NaN on invalid input
- **Target**: `(x: number) => (y: number) => Result<MathError, number>`

### binomialCoefficient

- **Current**: `(n: number | null | undefined) => (k: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates binomial coefficient "n choose k"; uses factorial or iterative method; returns NaN for invalid inputs or when k > n
- **Target**: `(n: number) => (k: number) => Result<MathError, number>`

### erf (should be `errorFunction` with alias)

- **Current**: `(x: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates error function using numerical approximation; returns value in [-1, 1]; returns NaN on invalid input
- **Target**: `(x: number) => Result<MathError, number>`

### erfc (should be `complementaryErrorFunction` with alias)

- **Current**: `(x: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates complementary error function: erfc(x) = 1 - erf(x); returns NaN on invalid input
- **Target**: `(x: number) => Result<MathError, number>`

### gamma

- **Current**: `(x: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input, Infinity for large values)
- **Description**: Calculates gamma function using Lanczos approximation; generalizes factorial to real numbers; returns NaN for non-positive integers
- **Target**: `(x: number) => Result<MathError, number>`

### logGamma

- **Current**: `(x: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates natural logarithm of gamma function; more numerically stable for large values; returns NaN on invalid input
- **Target**: `(x: number) => Result<MathError, number>`

### permutation

- **Current**: `(n: number | null | undefined) => (k: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates number of k-permutations of n objects: P(n,k) = n!/(n-k)!; returns NaN for invalid inputs or when k > n
- **Target**: `(n: number) => (k: number) => Result<MathError, number>`

### combination

- **Current**: Likely alias of binomialCoefficient
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates number of k-combinations of n objects; same as binomial coefficient
- **Target**: `(n: number) => (k: number) => Result<MathError, number>`

---

## Migration Notes

Special functions will be converted to Result-returning functions. The monadic versions will:

1. Return `ok(value)` when calculation succeeds
2. Return `error(MathError)` for domain errors or invalid inputs
3. Handle overflow gracefully with explicit errors instead of Infinity

## Notes

These are advanced mathematical functions with specific domains. Comprehensive validation is critical.
