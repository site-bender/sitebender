# Math - Modular Arithmetic Functions

**Location**: `src/vanilla/math/`
**Functions**: 1
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### Modular Exponentiation

#### modularExponentiation
- **Current**: `(base: number | null | undefined) => (exponent: number | null | undefined) => (modulus: number | null | undefined) => number`
- **Returns**: NaN on invalid input, negative exponent, or non-positive modulus
- **Description**: [INFERRED] Calculates (base^exponent) mod modulus efficiently using binary exponentiation; returns NaN on invalid input
- **Target**: `(base: number) => (exponent: number) => (modulus: number) => Result<MathError, number>`

---

## Migration Notes

Modular arithmetic functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when computation succeeds with valid input
2. Return `error(MathError)` when computation fails, with descriptive error messages
3. Maintain currying for all multi-parameter functions
4. Validate integer constraints and bounds
5. Replace NaN returns with explicit error values
6. Preserve efficient algorithms (binary exponentiation)

## Special Considerations

### Arrow Function Syntax

The function uses arrow syntax and needs refactoring to named function:
- **modularExponentiation** (arrow function)

### Algorithm Details

#### modularExponentiation
- Calculates (base^exponent) mod modulus
- Uses **binary exponentiation** algorithm (also called "exponentiation by squaring")
- Time complexity: O(log exponent)
- Space complexity: O(log exponent) due to recursion

**Algorithm**: Binary exponentiation (recursive)
```
modPow(b, e, m):
  if e = 0: return 1 mod m
  if e is even:
    half = modPow(b, e/2, m)
    return (half × half) mod m
  if e is odd:
    return (b × modPow(b, e-1, m)) mod m
```

**Example**: Calculate 3^13 mod 7
- 3^13 mod 7 = 3 × (3^12 mod 7)
- 3^12 mod 7 = (3^6 mod 7)^2
- 3^6 mod 7 = (3^3 mod 7)^2
- 3^3 mod 7 = 3 × (3^2 mod 7)
- 3^2 mod 7 = 2
- ... = 3

### Negative Base Handling

The implementation normalizes negative bases:
- Converts negative base to positive equivalent in modular arithmetic
- Formula: `base = ((base % modulus) + modulus) % modulus`
- Example: -5 mod 7 = 2, so (-5)^n mod 7 = 2^n mod 7

### Input Constraints

Requires:
- All inputs are numbers (not null/undefined)
- All inputs are finite
- All inputs are integers
- Base: any integer (negative bases normalized)
- Exponent: non-negative integer (exponent ≥ 0)
- Modulus: positive integer (modulus > 0)

### Error Conditions

Returns NaN for:
- null/undefined input
- Non-number input
- Non-integer input
- Negative exponent
- Zero or negative modulus

### Recursive Implementation

The current implementation uses:
- Recursive helper function `binaryPower`
- Already functional style internally
- No loops or mutation in the core algorithm
- May need trampolining for very large exponents to avoid stack overflow

---

## Implementation Dependencies

Modular arithmetic functions have minimal dependencies:
- Depends on **isNullish** from validation
- Depends on **Number.isInteger** for validation
- No dependencies on other math functions
- Could potentially use **modulo** from MATH_ARITHMETIC.md, but currently uses `%` directly

---

## Error Categories

When migrating to Result type, errors should be categorized:

### ValidationError
- Type errors (not a number, null/undefined, not an integer)

### MathError (new type needed)
- Domain errors:
  - Negative exponent
  - Non-positive modulus (modulus ≤ 0)

---

## Related Functions

### In Other Categories
- **modulo** (in MATH_ARITHMETIC.md) - basic modular arithmetic operation
- **power** (in MATH_ARITHMETIC.md) - exponentiation without modulus
- **gcd** (in MATH_INTEGER.md) - related number theory function
- **totient** (in MATH_INTEGER.md) - related to modular exponentiation in cryptography

### Potential New Functions

Consider adding these modular arithmetic functions in monadic implementation:

#### Modular Operations
- **modularAddition** - (a + b) mod m
- **modularSubtraction** - (a - b) mod m
- **modularMultiplication** - (a × b) mod m
- **modularInverse** - find x such that (a × x) mod m = 1 (requires gcd(a,m) = 1)
- **modularDivision** - (a / b) mod m = (a × modularInverse(b)) mod m

#### Advanced Modular Functions
- **discreteLogarithm** - find x such that b^x mod m = a (inverse of modular exponentiation)
- **chineseRemainderTheorem** - solve system of modular equations
- **jacobiSymbol** - number theory function used in primality testing
- **tonelliShanks** - modular square root algorithm

#### Cryptographic Primitives
- **modularExponentiationWithModulus** - variant that takes modulus as first parameter
- **montgomeryMultiplication** - optimized modular multiplication for cryptography

---

## Use Cases

Modular exponentiation is fundamental to:

1. **Cryptography**:
   - RSA encryption/decryption
   - Diffie-Hellman key exchange
   - ElGamal encryption
   - Digital signatures

2. **Number Theory**:
   - Fermat's Little Theorem testing
   - Miller-Rabin primality test
   - Computing large Fibonacci numbers modulo m

3. **Competitive Programming**:
   - Computing large powers modulo a prime
   - Avoiding integer overflow in calculations

---

## Testing Considerations

When migrating, ensure comprehensive tests for:

### Small Values
- Base cases: 0^0 mod m, a^0 mod m (should be 1), 0^n mod m (should be 0 for n > 0)
- Small exponents: a^1 mod m, a^2 mod m
- Small modulus: m = 2, m = 3, m = 7

### Large Values
- Large exponents: 2^1000 mod 1000000007
- Large base: 999999^999 mod 1000000007
- Verify no overflow occurs

### Negative Base
- Negative base with odd exponent: (-3)^5 mod 7
- Negative base with even exponent: (-3)^4 mod 7
- Verify normalization works correctly

### Edge Cases
- Exponent = 0 (should always return 1 mod m)
- Base = 0 (should return 0 for exponent > 0)
- Base = 1 (should always return 1)
- Base = modulus (should return 0)
- Base > modulus (should reduce before computation)

### Error Cases
- Negative exponent
- Zero modulus
- Negative modulus
- Non-integer inputs
- null/undefined inputs

### Algorithm Correctness
- Compare with naive exponentiation for small values
- Verify (a^b mod m) = ((a mod m)^b mod m)
- Verify (a^(b+c) mod m) = ((a^b mod m) × (a^c mod m)) mod m

---

## Performance Considerations

### Current Implementation
- O(log n) time complexity (efficient)
- O(log n) space complexity (recursion depth)
- No overflow protection beyond JavaScript's number precision

### Potential Optimizations
- **Iterative version**: O(1) space complexity
- **Montgomery reduction**: Faster for repeated operations with same modulus
- **BigInt support**: Handle arbitrarily large integers (would require different implementation)
- **Memoization**: Cache results for repeated (base, exponent, modulus) triples (not pure)

### Overflow Concerns
- JavaScript numbers are 64-bit floats
- Safe integer range: -(2^53 - 1) to (2^53 - 1)
- Intermediate calculations (squaring, multiplication) may overflow
- Current implementation doesn't handle overflow explicitly
- May need BigInt for cryptographic applications

**Recommendation**: Keep current algorithm, add overflow detection or BigInt variant.
