# Math - Sequence Functions

**Location**: `src/vanilla/math/`
**Functions**: 1
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### Integer Sequences

#### fibonacci

- **Current**: `(n: number | null | undefined) => number`
- **Returns**: NaN on invalid input, negative numbers, or n > 78
- **Description**: [INFERRED] Calculates the nth Fibonacci number; limited to n ≤ 78 to avoid exceeding MAX_SAFE_INTEGER; returns NaN on invalid input
- **Target**: `(n: number) => Result<MathError, number>`

---

## Migration Notes

Sequence functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when computation succeeds with valid input
2. Return `error(MathError)` when computation fails, with descriptive error messages
3. Validate integer constraints and bounds
4. Handle overflow conditions explicitly
5. Replace NaN returns with explicit error values

## Special Considerations

### Arrow Function Syntax

The function uses arrow syntax and needs refactoring to named function:

- **fibonacci** (arrow function)

### Loop Usage

Function uses loops that need refactoring to functional equivalents:

- **fibonacci**: Uses for loop for iterative calculation (lines 36-40)

### Mutation Usage

Function uses mutable variables (let) that need refactoring:

- **fibonacci**: Uses let prev and let curr

### Fibonacci Algorithm Details

#### fibonacci

- Calculates the nth number in the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
- Base cases: F(0) = 0, F(1) = 1
- Recurrence: F(n) = F(n-1) + F(n-2)
- Implementation: Iterative approach with two variables (prev, curr)
- Limitation: n ≤ 78 due to JavaScript's MAX_SAFE_INTEGER (2^53 - 1)
- F(78) = 8,670,007,398,507,948,738 (still within safe integer range)
- F(79) = 14,028,366,653,498,915,298 (exceeds safe integer range)

### Integer Validation

Requires:

- Input is a number (not null/undefined)
- Input is finite
- Input is an integer (using `Number.isInteger`)
- Input is non-negative (n ≥ 0)
- Input is within bounds (n ≤ 78)

### Error Conditions

Returns NaN for:

- null/undefined input
- Non-number input
- Non-integer input
- Negative numbers
- n > 78 (overflow prevention)

---

## Implementation Dependencies

Sequence functions have minimal dependencies:

- Depends on **isNullish** from validation
- Depends on **Number.isInteger** for validation
- No dependencies on other math functions

---

## Error Categories

When migrating to Result type, errors should be categorized:

### ValidationError

- Type errors (not a number, null/undefined, not an integer)

### MathError (new type needed)

- Domain errors:
  - Negative input
- Overflow errors:
  - n > 78 (exceeds safe integer range)

---

## Related Functions

### In Other Categories

- **factorial** (in MATH_INTEGER.md) - similar iterative integer computation
- **totient** (in MATH_INTEGER.md) - number theory function

### Potential New Functions

Consider adding these sequence functions in monadic implementation:

- **lucas** - Lucas numbers (similar to Fibonacci: L(n) = L(n-1) + L(n-2), L(0) = 2, L(1) = 1)
- **triangular** - Triangular numbers (T(n) = n(n+1)/2)
- **square** - Perfect squares (already exists as operation in MATH_ARITHMETIC.md)
- **pentagonal** - Pentagonal numbers (P(n) = n(3n-1)/2)
- **catalan** - Catalan numbers (C(n) = (2n)! / ((n+1)! × n!))
- **pell** - Pell numbers (P(n) = 2P(n-1) + P(n-2), P(0) = 0, P(1) = 1)
- **fibonacciMod** - Fibonacci modulo m (for larger indices)

---

## Algorithm Optimization Notes

### Current Implementation

- Iterative with O(n) time complexity
- O(1) space complexity (two variables)
- Avoids recursion overhead
- Prevents stack overflow

### Alternative Approaches

#### Matrix Exponentiation

- Uses matrix multiplication: [[F(n+1), F(n)], [F(n), F(n-1)]] = [[1,1],[1,0]]^n
- O(log n) time complexity
- Could compute larger Fibonacci numbers with BigInt
- More complex implementation

#### Closed-Form (Binet's Formula)

- φ = (1 + √5) / 2 (golden ratio)
- F(n) = (φ^n - (-φ)^(-n)) / √5
- O(1) time complexity
- Suffers from floating-point precision errors for large n
- Not suitable for exact integer computation

#### Memoization

- Cache previously computed values
- O(n) time on first call, O(1) for cached values
- Requires state management (not pure)
- Not suitable for functional implementation

**Recommendation**: Keep iterative approach but refactor to functional style using recursion or reduce.

---

## Testing Considerations

When migrating, ensure comprehensive tests for:

- Base cases: F(0) = 0, F(1) = 1
- Small values: F(2) = 1, F(3) = 2, F(4) = 3, F(5) = 5
- Boundary: F(78) = 8,670,007,398,507,948,738 (maximum safe value)
- Error cases:
  - Negative input
  - Non-integer input
  - n > 78 (overflow)
  - null/undefined input
- Property tests:
  - F(n) = F(n-1) + F(n-2) for all valid n ≥ 2
  - F(n) is always a non-negative integer
  - F(n) is monotonically increasing
