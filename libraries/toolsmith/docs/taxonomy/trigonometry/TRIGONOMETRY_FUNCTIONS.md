# Trigonometry Functions

**Location**: `src/vanilla/trigonometry/`
**Functions**: 19
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### sine

- **Current**: `(angle: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates sine of angle in radians using Math.sin; returns NaN on invalid input
- **Target**: `(angle: number) => Result<MathError, number>`

### cosine

- **Current**: `(angle: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates cosine of angle in radians using Math.cos; returns NaN on invalid input
- **Target**: `(angle: number) => Result<MathError, number>`

### tangent

- **Current**: `(angle: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input, Infinity at odd multiples of π/2)
- **Description**: Calculates tangent of angle in radians using Math.tan; returns NaN on invalid input
- **Target**: `(angle: number) => Result<MathError, number>`

### arcSine

- **Current**: `(value: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input or value outside [-1, 1])
- **Description**: Calculates arcsine (inverse sine) in radians using Math.asin; domain is [-1, 1]; returns NaN on invalid input
- **Target**: `(value: number) => Result<MathError, number>`

### arcCosine

- **Current**: `(value: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input or value outside [-1, 1])
- **Description**: Calculates arccosine (inverse cosine) in radians using Math.acos; domain is [-1, 1]; returns NaN on invalid input
- **Target**: `(value: number) => Result<MathError, number>`

### arcTangent

- **Current**: `(value: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates arctangent (inverse tangent) in radians using Math.atan; range is (-π/2, π/2); returns NaN on invalid input
- **Target**: `(value: number) => Result<MathError, number>`

### arcTangent2 (atan2)

- **Current**: `(y: number | null | undefined) => (x: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates two-argument arctangent using Math.atan2; returns angle in radians from x-axis to point (x,y); range is (-π, π]; handles quadrants correctly; returns NaN on invalid input
- **Alias**: `atan2` re-exports this function
- **Target**: `(y: number) => (x: number) => Result<MathError, number>`

### hyperbolicSine (sinh)

- **Current**: `(x: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates hyperbolic sine using Math.sinh; returns NaN on invalid input
- **Alias**: `sinh` re-exports this function
- **Target**: `(x: number) => Result<MathError, number>`

### hyperbolicCosine (cosh)

- **Current**: `(x: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates hyperbolic cosine using Math.cosh; returns NaN on invalid input
- **Alias**: `cosh` re-exports this function
- **Target**: `(x: number) => Result<MathError, number>`

### hyperbolicTangent (tanh)

- **Current**: `(x: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates hyperbolic tangent using Math.tanh; returns NaN on invalid input
- **Alias**: `tanh` re-exports this function
- **Target**: `(x: number) => Result<MathError, number>`

### degreesToRadians

- **Current**: `(degrees: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Converts degrees to radians using formula: radians = degrees * π / 180; returns NaN on invalid input
- **Target**: `(degrees: number) => Result<MathError, number>`

### radiansToDegrees

- **Current**: `(radians: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Converts radians to degrees using formula: degrees = radians * 180 / π; returns NaN on invalid input
- **Target**: `(radians: number) => Result<MathError, number>`

### hypotenuse

- **Current**: `(a: number | null | undefined) => (b: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates hypotenuse of right triangle using Math.hypot or Pythagorean theorem: √(a² + b²); returns NaN on invalid input
- **Target**: `(a: number) => (b: number) => Result<MathError, number>`

### cartesianToPolar

- **Current**: `(x: number | null | undefined) => (y: number | null | undefined) => [number, number]`
- **Returns**: [number, number] (tuple of radius and angle, [NaN, NaN] on invalid input)
- **Description**: Converts Cartesian coordinates to polar coordinates; returns [r, θ] where r = √(x² + y²) and θ = atan2(y, x); returns [NaN, NaN] on invalid input
- **Target**: `(x: number) => (y: number) => Result<MathError, [number, number]>`

### polarToCartesian

- **Current**: `(r: number | null | undefined) => (theta: number | null | undefined) => [number, number]`
- **Returns**: [number, number] (tuple of x and y, [NaN, NaN] on invalid input)
- **Description**: Converts polar coordinates to Cartesian coordinates; returns [x, y] where x = r * cos(θ) and y = r * sin(θ); returns [NaN, NaN] on invalid input
- **Target**: `(r: number) => (theta: number) => Result<MathError, [number, number]>`

---

## Migration Notes

Trigonometry functions will be converted to Result-returning functions. The monadic versions will:

1. Return `ok(value)` when calculation succeeds
2. Return `error(MathError)` for domain errors (e.g., arcsin/arccos outside [-1, 1]) or invalid inputs
3. Maintain aliases (atan2, sinh, cosh, tanh)

## Notes

All standard trigonometric functions are covered. Consider adding: secant, cosecant, cotangent, and their inverses.
