# Math - Random Number Generation Functions

**Location**: `src/math/`
**Functions**: 2
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### Random Number Generation

#### random

- **Current**: `(min: number | null | undefined) => (max: number | null | undefined) => number`
- **Returns**: NaN on invalid input or min >= max
- **Description**: Generates a random float in [min, max); returns NaN on invalid range
- **Target**: `(min: number) => (max: number) => Result<MathError, number>`

#### randomInteger

- **Current**: `(min: number | null | undefined) => (max: number | null | undefined) => number`
- **Returns**: NaN on invalid input, non-integers, or min >= max
- **Description**: [INFERRED] Generates a random integer in [min, max); returns NaN on invalid range
- **Target**: `(min: number) => (max: number) => Result<MathError, number>`

---

## Migration Notes

Random number generation functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when generation succeeds with valid input
2. Return `error(MathError)` when generation fails, with descriptive error messages
3. Maintain currying for all multi-parameter functions
4. Validate range constraints before generation
5. Replace NaN returns with explicit error values
6. Preserve randomness properties and distributions

## Special Considerations

### Arrow Function Syntax

Both functions use arrow syntax and need refactoring to named functions:

- **random** (arrow function)
- **randomInteger** (arrow function)

### Impurity Notice

**IMPORTANT**: These functions are **impure** by nature:

- Same input produces different outputs (non-deterministic)
- Side effect: reads from global PRNG state (Math.random())
- Cannot be memoized
- Must be clearly marked as IO/Effect functions

**Marking**: Add comment `// [IO] This function performs side effects (random number generation)`

### Random Number Generation Details

#### random

- Generates random **floating-point** number in **[min, max)** range
- Range is **half-open**: includes min, excludes max
- Uses `Math.random()` as source of randomness
- Formula: `min + Math.random() * (max - min)`
- Distribution: Uniform (all values in range equally likely)
- Examples:
  - `random(0)(1)` → 0.0 to 0.999... (not 1.0)
  - `random(5)(10)` → 5.0 to 9.999... (not 10.0)
  - `random(-5)(5)` → -5.0 to 4.999... (not 5.0)

#### randomInteger

- Generates random **integer** in **[min, max)** range
- Range is **half-open**: includes min, excludes max
- Requires integer inputs (validates with `Number.isInteger`)
- Uses `Math.floor()` to convert float to integer
- Formula: `Math.floor(min + Math.random() * (max - min))`
- Distribution: Discrete uniform (all integers in range equally likely)
- Examples:
  - `randomInteger(0)(10)` → 0, 1, 2, ..., 9 (not 10)
  - `randomInteger(1)(7)` → 1, 2, 3, 4, 5, 6 (dice roll)
  - `randomInteger(-5)(5)` → -5, -4, ..., 3, 4 (not 5)

### Range Constraints

Both functions require:

- `min < max` (strict inequality)
- `min >= max` returns NaN (error in monadic version)
- Equal bounds (min = max) is invalid (empty range)

**Design Question**: Should `min = max` be allowed, always returning that value? Or error?
**Recommendation**: Error (empty range is conceptually invalid for random selection)

### Input Validation

#### random

- Validates both min and max are numbers (not null/undefined)
- Validates both are finite (not NaN or Infinity)
- Validates min < max
- No integer constraint

#### randomInteger

- All validations from random
- **Additionally** validates both min and max are integers
- Non-integer inputs return NaN

---

## Implementation Dependencies

Random functions have minimal dependencies:

- Depend on **isNullish** from validation
- **randomInteger** depends on **Number.isInteger** for validation
- **randomInteger** uses **Math.floor** (could use floor from MATH_ROUNDING.md)
- Both depend on **Math.random()** (global side effect)

---

## Error Categories

When migrating to Result type, errors should be categorized:

### ValidationError

- Type errors (not a number, null/undefined)
- Integer validation errors (randomInteger with non-integer inputs)

### MathError (new type needed)

- Invalid range errors (min >= max)
- Empty range errors (min = max)

---

## Related Functions

### In Other Categories

- **floor** (in MATH_ROUNDING.md) - used internally by randomInteger
- **inRange** (in MATH_COMPARISON.md) - could validate random result

### Potential New Functions

Consider adding these random number generation functions in monadic implementation:

#### Distribution Functions

- **randomNormal** - normal (Gaussian) distribution with mean and stddev
- **randomExponential** - exponential distribution with lambda
- **randomPoisson** - Poisson distribution with lambda
- **randomBinomial** - binomial distribution with n and p
- **randomUniform** - alias for random (explicit distribution name)

#### Sampling Functions

- **randomChoice** - select random element from array
- **randomSample** - select n random elements from array (without replacement)
- **randomSampleWithReplacement** - select n random elements (with replacement)
- **shuffle** - randomly permute array (Fisher-Yates algorithm)
- **randomWeighted** - random selection with weighted probabilities

#### Range Variants

- **randomInclusive** - [min, max] range (includes both endpoints)
- **randomExclusive** - (min, max) range (excludes both endpoints)
- **randomIntegerInclusive** - [min, max] range for integers

#### Seeded Random

- **createSeededRandom** - deterministic PRNG with seed (for testing)
- **randomWithSeed** - generate random number from seeded generator

#### Cryptographic

- **randomSecure** - cryptographically secure random (uses crypto.getRandomValues)
- **randomUuid** - generate random UUID v4

---

## Testing Considerations

### Standard Tests

When migrating, ensure comprehensive tests for:

### Range Validation

- Valid ranges: min < max
- Invalid ranges: min >= max
- Edge cases: min = max (empty range)
- Negative ranges: random(-10)(-5)
- Zero-crossing ranges: random(-5)(5)

### Integer Validation (randomInteger)

- Integer inputs: randomInteger(0)(10)
- Non-integer inputs: randomInteger(0.5)(10.5) (should error)
- Float min with int max: randomInteger(0.1)(10) (should error)

### Invalid Inputs

- null/undefined
- NaN
- Infinity/-Infinity

### Distribution Tests

**Statistical tests** (run many iterations, check properties):

#### Uniformity

- Generate 10,000 samples
- Verify distribution is roughly uniform (chi-squared test)
- All bins should have similar counts

#### Range Compliance

- Verify all values satisfy `min <= value < max`
- Verify no values equal max (exclusive upper bound)
- Verify some values equal min (inclusive lower bound)

#### Integer Compliance (randomInteger)

- Verify all values are integers
- Verify entire range [min, max) is covered given enough samples

### Example Test Structure

```typescript
// Uniformity test
const samples = Array.from({ length: 10000 }, () => random(0)(10))
const inRange = samples.every((x) => x >= 0 && x < 10)
assert(inRange, "All samples in [0, 10)")

// Coverage test (randomInteger)
const intSamples = Array.from({ length: 10000 }, () => randomInteger(0)(5))
const seen = new Set(intSamples)
assert(seen.has(0), "Should see 0")
assert(seen.has(4), "Should see 4")
assert(!seen.has(5), "Should never see 5 (exclusive)")
```

---

## Functional Programming Considerations

### Purity and Side Effects

Random functions violate **referential transparency**:

- Same arguments can produce different results
- Cannot be memoized
- Cannot be reasoned about algebraically

### Integration with Effect Systems

In monadic implementation, consider:

- **Effect type**: `Effect<Random, MathError, number>`
- **Reader monad**: Pass RNG as context
- **State monad**: Thread RNG state through computations
- **IO monad**: Mark as impure IO operation

### Testability

For testing code that uses random functions:

- **Dependency injection**: Pass RNG as parameter
- **Seeded RNG**: Use deterministic PRNG with known seed
- **Property-based testing**: Test properties that hold for any random value
- **Mocking**: Replace Math.random with controlled function

### Alternative Designs

#### Pure Random (Explicit State Threading)

```typescript
type RandomState = { seed: number }
type RandomResult<T> = [T, RandomState]

function random(min: number) {
	return function randomMax(max: number) {
		return function randomWithState(state: RandomState): RandomResult<number> {
			const [value, nextState] = nextRandom(state)
			return [min + value * (max - min), nextState]
		}
	}
}
```

#### Effect-based Random

```typescript
type RandomEffect<T> = Effect<RandomService, MathError, T>

function random(min: number) {
	return function randomMax(max: number): RandomEffect<number> {
		return effect.flatMap(
			effect.service<RandomService>(),
			(rng) => rng.random(min, max),
		)
	}
}
```

**Recommendation**: Mark as IO effects, provide seeded variant for testing.

---

## Security Considerations

### Math.random() Limitations

`Math.random()` is **NOT cryptographically secure**:

- Predictable (can guess future values from past values)
- Not suitable for:
  - Cryptographic keys
  - Authentication tokens
  - Security-sensitive random IDs
  - Gambling/lottery systems

### Secure Alternative

For security-sensitive applications, use `crypto.getRandomValues()`:

```typescript
function randomSecure(min: number) {
	return function randomSecureMax(max: number): number {
		const range = max - min
		const bytes = new Uint32Array(1)
		crypto.getRandomValues(bytes)
		return min + (bytes[0] / (0xFFFFFFFF + 1)) * range
	}
}
```

**Recommendation**: Add `randomSecure` and `randomIntegerSecure` variants for cryptographic use.
