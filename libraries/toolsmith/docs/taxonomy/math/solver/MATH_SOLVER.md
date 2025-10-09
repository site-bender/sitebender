# Math - Equation Solving Functions

**Location**: `src/vanilla/math/`
**Functions**: 1
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### Polynomial Equation Solvers

#### quadratic

- **Current**: `(a: number | null | undefined) => (b: number | null | undefined) => (c: number | null | undefined) => Pair<number, number>`
- **Returns**: Pair(NaN, NaN) on invalid input, a=0, or negative discriminant
- **Description**: [INFERRED] Solves quadratic equation ax² + bx + c = 0, returning pair of real roots [x1, x2]; returns Pair(NaN, NaN) on invalid input
- **Target**: `(a: number) => (b: number) => (c: number) => Result<MathError, Pair<number, number>>`

---

## Migration Notes

Equation solving functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(Pair(x1, x2))` when equation has real solutions
2. Return `error(MathError)` when equation cannot be solved or has no real solutions
3. Maintain currying for all multi-parameter functions
4. Validate mathematical constraints (a ≠ 0, discriminant ≥ 0)
5. Replace Pair(NaN, NaN) with explicit error values
6. Distinguish between different error cases (complex roots vs invalid input)

## Special Considerations

### Arrow Function Syntax

The function uses arrow syntax and needs refactoring to named function:

- **quadratic** (arrow function)

### Quadratic Equation Details

#### quadratic

Solves the standard form quadratic equation: **ax² + bx + c = 0**

**Quadratic Formula**:

```
x = (-b ± √(b² - 4ac)) / (2a)

where discriminant Δ = b² - 4ac
```

**Cases**:

1. **Δ > 0**: Two distinct real roots
   - x₁ = (-b + √Δ) / (2a)
   - x₂ = (-b - √Δ) / (2a)

2. **Δ = 0**: One repeated real root (both roots equal)
   - x₁ = x₂ = -b / (2a)

3. **Δ < 0**: No real roots (complex conjugate pair)
   - x = (-b ± i√|Δ|) / (2a)
   - **Current implementation returns Pair(NaN, NaN)**

**Examples**:

- x² - 5x + 6 = 0 → Δ = 1 → x = 2, 3
- x² - 4x + 4 = 0 → Δ = 0 → x = 2 (repeated)
- x² + x + 1 = 0 → Δ = -3 → complex roots (returns NaN)

### Input Validation

Requires:

- All inputs are numbers (not null/undefined)
- All inputs are finite (not NaN or Infinity)
- Coefficient a ≠ 0 (otherwise not quadratic, but linear or degenerate)

### Error Conditions

Returns Pair(NaN, NaN) for:

- null/undefined input
- Non-number input
- a = 0 (degenerate case: linear equation bx + c = 0)
- Discriminant < 0 (complex roots, no real solutions)

### Return Type

Uses **Pair** type from tuple domain:

- `Pair<number, number>` = `[number, number]`
- Ordered pair of roots: [x₁, x₂]
- Convention: x₁ ≥ x₂ or x₁ uses + in formula, x₂ uses -

**Design Question**: Should roots be ordered (ascending, descending, or by formula)?
**Current**: Appears to return [larger root, smaller root] or [+ formula, - formula]
**Recommendation**: Document ordering convention clearly

---

## Implementation Dependencies

Equation solver functions have dependencies:

- Depends on **isNullish** from validation
- Depends on **Pair** type from tuple domain
- Uses **Math.sqrt** internally (could use squareRoot from MATH_ARITHMETIC.md)

---

## Error Categories

When migrating to Result type, errors should be categorized:

### ValidationError

- Type errors (not a number, null/undefined, not finite)

### MathError (new type needed)

- **Degenerate equation**: a = 0 (not a quadratic equation)
- **Complex roots**: discriminant < 0 (no real solutions)
- **Invalid coefficients**: any coefficient is NaN or Infinity

### Discriminant-based Error Messages

Provide specific error messages:

- **a = 0**: "Not a quadratic equation (coefficient a is zero). Use linear solver for bx + c = 0."
- **Δ < 0**: "No real roots (discriminant is negative). Complex roots: (-b ± i√|Δ|) / (2a)."
- Include discriminant value and complex roots in error for user convenience

---

## Related Functions

### In Other Categories

- **squareRoot** (in MATH_ARITHMETIC.md) - used to compute √Δ
- **divide** (in MATH_ARITHMETIC.md) - used to compute roots
- **negate** (in MATH_ARITHMETIC.md) - used to compute -b
- **pair** (in tuple domain) - return type constructor

### Potential New Functions

Consider adding these equation solving functions in monadic implementation:

#### Linear Solvers

- **linear** - solve ax + b = 0
- **linearSystem2x2** - solve 2×2 system of linear equations
- **linearSystem3x3** - solve 3×3 system (Cramer's rule or Gaussian elimination)

#### Polynomial Solvers

- **cubic** - solve ax³ + bx² + cx + d = 0 (Cardano's formula)
- **quartic** - solve ax⁴ + bx³ + cx² + dx + e = 0 (Ferrari's method)
- **polynomialRoots** - general polynomial root finding (numerical methods)

#### Complex Number Support

- **quadraticComplex** - return complex roots when Δ < 0
- **Complex** type - represent complex numbers a + bi

#### Numerical Methods

- **bisection** - root finding by bisection method
- **newton** - Newton-Raphson method for root finding
- **secant** - Secant method for root finding
- **fixedPoint** - Fixed-point iteration

#### Optimization

- **quadraticVertex** - find vertex (minimum/maximum) of quadratic function
- **quadraticAxisOfSymmetry** - find x-coordinate of vertex (x = -b/2a)

---

## Design Decisions Needed

### 1. Handling Complex Roots

**Current**: Returns Pair(NaN, NaN)

**Options**:

- **Error**: Return error with message about complex roots
- **Complex type**: Implement Complex number type and return complex roots
- **Extended result**: Return discriminant and indicate no real roots

**Recommendation**: Return error with discriminant value and complex root formula in message.

### 2. Handling Degenerate Case (a = 0)

**Current**: Returns Pair(NaN, NaN)

**Options**:

- **Error**: Return error suggesting linear solver
- **Auto-convert**: Detect a = 0 and solve as linear equation (return single root in Pair?)
- **Strict**: Require a ≠ 0, let caller handle case

**Recommendation**: Return error with suggestion to use linear solver.

### 3. Root Ordering

**Current**: Unclear ordering convention

**Options**:

- **Formula order**: [(-b + √Δ)/(2a), (-b - √Δ)/(2a)]
- **Ascending**: [smaller root, larger root]
- **Descending**: [larger root, smaller root]

**Recommendation**: Use formula order (+ first, - second) and document clearly.

### 4. Repeated Root Representation

**Current**: Returns Pair(x, x) when Δ = 0

**Options**:

- **Pair with duplicates**: Pair(x, x) - current approach
- **Single value**: Return single value instead of pair
- **Multiplicity**: Return Pair(root, multiplicity)

**Recommendation**: Keep Pair(x, x) for consistency, document that both roots are equal.

---

## Mathematical Properties

### Relationship Between Coefficients and Roots

**Vieta's Formulas** (useful for validation):

- **Sum of roots**: x₁ + x₂ = -b/a
- **Product of roots**: x₁ × x₂ = c/a

These can be used to verify computed roots:

```typescript
function verifyQuadraticRoots(
	a: number,
	b: number,
	c: number,
	roots: Pair<number, number>,
): boolean {
	const [x1, x2] = roots
	const sumCorrect = Math.abs((x1 + x2) - (-b / a)) < EPSILON
	const productCorrect = Math.abs((x1 * x2) - (c / a)) < EPSILON
	return sumCorrect && productCorrect
}
```

### Discriminant Properties

- **Δ > 0**: Parabola crosses x-axis twice
- **Δ = 0**: Parabola touches x-axis once (vertex on x-axis)
- **Δ < 0**: Parabola doesn't cross x-axis (entirely above or below)

### Numerical Stability

Standard formula can have **catastrophic cancellation** when b² >> 4ac:

- Subtracting nearly equal values loses precision
- Alternative formula for better numerical stability:

```typescript
// Standard formula (can be unstable)
x1 = (-b + √Δ) / (2a)
x2 = (-b - √Δ) / (2a)

// Stable alternative (Citardauq formula)
if (b ≥ 0) {
  x1 = (-b - √Δ) / (2a)
  x2 = (2c) / (-b - √Δ)
} else {
  x1 = (-b + √Δ) / (2a)
  x2 = (2c) / (-b + √Δ)
}
```

**Recommendation**: Implement numerically stable version in monadic implementation.

---

## Testing Considerations

When migrating, ensure comprehensive tests for:

### Standard Cases

- Two distinct real roots: x² - 5x + 6 = 0 → x = 2, 3
- One repeated root: x² - 4x + 4 = 0 → x = 2
- Complex roots: x² + x + 1 = 0 → Δ = -3 (should error)

### Special Coefficients

- a = 1 (monic): x² + bx + c = 0
- b = 0: ax² + c = 0 → x = ±√(-c/a)
- c = 0: ax² + bx = 0 → x = 0, -b/a
- b = c = 0: ax² = 0 → x = 0 (repeated)

### Edge Cases

- Very large coefficients (overflow concerns)
- Very small coefficients (underflow concerns)
- Mixed magnitude coefficients (numerical stability)

### Error Cases

- a = 0 (degenerate case)
- Negative discriminant (complex roots)
- Invalid inputs (null, undefined, NaN, Infinity)

### Numerical Accuracy

- Verify roots satisfy ax² + bx + c ≈ 0 (within EPSILON)
- Verify Vieta's formulas: x₁ + x₂ ≈ -b/a, x₁ × x₂ ≈ c/a
- Test numerically unstable cases (b² >> 4ac)

### Example Test

```typescript
// Test: x² - 5x + 6 = 0 → x = 2, 3
const result = quadratic(1)(-5)(6)
assert(result._tag === "ok")
const [x1, x2] = result.value
assert(Math.abs(1 * x1 * x1 - 5 * x1 + 6) < 1e-10, "x1 is a root")
assert(Math.abs(1 * x2 * x2 - 5 * x2 + 6) < 1e-10, "x2 is a root")
assert(Math.abs((x1 + x2) - 5) < 1e-10, "Vieta: sum")
assert(Math.abs((x1 * x2) - 6) < 1e-10, "Vieta: product")
```
