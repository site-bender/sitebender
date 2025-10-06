# Interpolation Functions

**Location**: `src/vanilla/interpolation/`
**Functions**: 7
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### linearInterpolation (lerp)
- **Current**: `(start: number | null | undefined) => (end: number | null | undefined) => (t: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Linear interpolation between start and end using formula: start + t * (end - start); t typically in [0, 1] but not enforced; returns NaN on invalid input
- **Alias**: `lerp` re-exports this function
- **Target**: `(start: number) => (end: number) => (t: number) => Result<InterpolationError, number>`

### inverseLinearInterpolation
- **Current**: `(start: number | null | undefined) => (end: number | null | undefined) => (value: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input or zero range)
- **Description**: Inverse of linear interpolation; finds t parameter for given value using formula: (value - start) / (end - start); returns NaN on invalid input, non-finite values, or when start equals end
- **Target**: `(start: number) => (end: number) => (value: number) => Result<InterpolationError, number>`

### cubicInterpolation
- **Current**: `(y0: number | null | undefined) => (y1: number | null | undefined) => (y2: number | null | undefined) => (y3: number | null | undefined) => (t: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Catmull-Rom spline cubic interpolation through four control points; interpolates smoothly between middle two points (y1 and y2); uses cubic polynomial coefficients; returns NaN on invalid input
- **Target**: `(y0: number) => (y1: number) => (y2: number) => (y3: number) => (t: number) => Result<InterpolationError, number>`

### bezierInterpolation
- **Current**: `(controlPoints: Array<Array<number>> | null | undefined) => (t: number | null | undefined) => Pair<number, number>`
- **Returns**: Pair<number, number> (tuple of two numbers, [NaN, NaN] on invalid input)
- **Description**: Bézier curve interpolation using De Casteljau's algorithm; accepts any number of 2D control points (minimum 2); clamps t to [0, 1]; returns 2D point on curve; returns [NaN, NaN] on invalid input
- **Target**: `(controlPoints: Array<Array<number>>) => (t: number) => Result<InterpolationError, Pair<number, number>>`

### bilinearInterpolation
- **Current**: `(q00: number | null | undefined) => (q10: number | null | undefined) => (q01: number | null | undefined) => (q11: number | null | undefined) => (x: number | null | undefined) => (y: number | null | undefined) => number`
- **Returns**: number (NaN on invalid input or coordinates out of [0, 1])
- **Description**: 2D bilinear interpolation between four corner values; x and y must be in [0, 1]; uses formula: (1-x)(1-y)q00 + x(1-y)q10 + (1-x)y*q01 + xy*q11; returns NaN on invalid input or out-of-bounds coordinates
- **Target**: `(q00: number) => (q10: number) => (q01: number) => (q11: number) => (x: number) => (y: number) => Result<InterpolationError, number>`

### smoothstep
- **Current**: `(edge0: number | null | undefined) => (edge1: number | null | undefined) => (x: number | null | undefined) => number`
- **Returns**: number (0, 1, or smoothly interpolated value in between; NaN on invalid input)
- **Description**: Smooth Hermite interpolation between 0 and 1; uses cubic formula: 3t² - 2t³; clamps to 0 for x ≤ edge0, 1 for x ≥ edge1, smooth transition between; returns NaN on invalid input or if edge0 ≥ edge1
- **Target**: `(edge0: number) => (edge1: number) => (x: number) => Result<InterpolationError, number>`

---

## Migration Notes

Interpolation functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when interpolation succeeds with valid numeric input
2. Return `error(InterpolationError)` when interpolation fails, with descriptive error messages
3. Maintain currying for all multi-parameter functions
4. Preserve mathematical correctness and special case handling
5. Replace NaN returns with explicit error values
6. Replace [NaN, NaN] returns with explicit error values

## Special Considerations

### Return Value Patterns

#### Functions Returning NaN
- **linearInterpolation**, **inverseLinearInterpolation**, **cubicInterpolation**, **bilinearInterpolation**, **smoothstep** return `NaN` on invalid input
- These check with `isNullish` and type checks before performing operations
- Should return `error(InterpolationError)` in monadic form

#### Functions Returning NaN Tuples
- **bezierInterpolation** returns `[NaN, NaN]` on invalid input
- Should return `error(InterpolationError)` in monadic form

### Alias Functions

#### linearInterpolation / lerp
- **lerp** is a re-export of **linearInterpolation**
- Should maintain both exports in monadic version
- "lerp" is industry-standard abbreviation for linear interpolation

### Arrow Function Syntax

All functions use arrow syntax and need refactoring to named functions:
- **linearInterpolation** (arrow function)
- **inverseLinearInterpolation** (arrow function)
- **cubicInterpolation** (arrow function)
- **bezierInterpolation** (arrow function)
- **bilinearInterpolation** (arrow function)
- **smoothstep** (arrow function)

### Complex Validation Logic

#### linearInterpolation
- Validates start, end, t are numbers
- Does NOT clamp or validate t to [0, 1] range
- Allows extrapolation outside [0, 1]
- Simple formula: start + t * (end - start)

#### inverseLinearInterpolation
- Validates start, end, value are numbers
- Additionally validates all are finite using `isFinite`
- Cannot invert when start equals end (zero range)
- Returns t parameter for given value
- Used to "unmap" a value from a range

#### cubicInterpolation
- Validates all four control points (y0, y1, y2, y3) and t are numbers
- Uses Catmull-Rom spline interpolation
- Provides smooth interpolation through middle two points
- Uses cubic polynomial with precomputed coefficients:
  - a0 = -0.5y0 + 1.5y1 - 1.5y2 + 0.5y3
  - a1 = y0 - 2.5y1 + 2y2 - 0.5y3
  - a2 = -0.5y0 + 0.5y2
  - a3 = y1
- Result: a0*t³ + a1*t² + a2*t + a3

#### bezierInterpolation
- Validates controlPoints is an array with at least 2 points
- Validates each control point is a 2D numeric array using `Array.prototype.every`
- Clamps t to [0, 1] (prevents extrapolation)
- Uses De Casteljau's algorithm (recursive implementation)
- Supports arbitrary-degree Bézier curves
- Returns Pair<number, number> type from types/tuple

#### bilinearInterpolation
- Validates all four corner values (q00, q10, q01, q11) are numbers
- Validates coordinates (x, y) are numbers
- Validates coordinates are in [0, 1] range
- Performs interpolation in two steps:
  1. Interpolate in x-direction along bottom and top edges
  2. Interpolate in y-direction between results
- Common in image processing and texture sampling

#### smoothstep
- Validates edge0, edge1, x are numbers
- Validates edge0 < edge1 (strict inequality)
- Clamps output to [0, 1]:
  - Returns 0 for x ≤ edge0
  - Returns 1 for x ≥ edge1
  - Smooth transition using 3t² - 2t³ for values between
- Produces smoother transition than linear interpolation
- Commonly used in computer graphics

---

## Implementation Dependencies

When planning migration, consider these dependency chains:

### Validation Dependencies
- All functions depend on `isNullish` from validation
- All functions perform type checks with `typeof`
- **inverseLinearInterpolation** uses `isFinite` for validation
- **bezierInterpolation** uses `Array.isArray` and `Array.prototype.every`

### Type Dependencies
- **bezierInterpolation** imports `Pair` type from `types/tuple`
- Should maintain this type dependency in monadic version

### Mathematical Dependencies
- **cubicInterpolation** uses polynomial evaluation
- **smoothstep** uses polynomial formula
- **bilinearInterpolation** uses weighted average
- All use basic arithmetic operations

### Array Operation Dependencies
- **bezierInterpolation** uses:
  - `Array.prototype.every` for validation
  - `Array.prototype.slice` for array manipulation
  - `Array.prototype.map` for point interpolation
  - Recursion for De Casteljau's algorithm
- Should migrate array operations to functional alternatives from toolsmith

### Refactoring Requirements
- All functions use arrow syntax and need refactoring to named functions
- **bezierInterpolation** uses recursion (good functional pattern, keep it)
- **bezierInterpolation** uses `Array.prototype` methods, migrate to toolsmith

---

## Notes

### Missing Standard Interpolation Functions
Consider implementing these during migration:
- **cosineInterpolation**: Smoother than linear, uses cosine easing
- **exponentialInterpolation**: For exponential curves
- **logarithmicInterpolation**: For logarithmic curves
- **hermiteInterpolation**: Cubic hermite spline
- **splineInterpolation**: General spline curves
- **smootherstep**: Even smoother than smoothstep (5th degree polynomial)
- **trilinearInterpolation**: 3D extension of bilinear
- **slerp**: Spherical linear interpolation for rotations
- **catmullRomSpline**: Generalized Catmull-Rom curves

### Interpolation Types

#### One-Dimensional
- **linearInterpolation**: Basic linear blend
- **cubicInterpolation**: Smooth curve through points
- **smoothstep**: Smooth transition with zero derivatives at edges

#### Multi-Dimensional
- **bezierInterpolation**: Parametric curves in 2D (could extend to 3D)
- **bilinearInterpolation**: 2D rectangular interpolation

#### Inverse Operations
- **inverseLinearInterpolation**: Maps value back to parameter
- Consider adding inverse operations for other interpolation types

### Parameter Conventions

#### t Parameter
- **linearInterpolation**: No bounds checking, allows extrapolation
- **cubicInterpolation**: No bounds checking, typical range [0, 1]
- **bezierInterpolation**: Clamped to [0, 1], prevents extrapolation

This inconsistency should be considered in monadic implementation. Options:
1. Add explicit bounds checking with error returns
2. Add separate clamped vs unclamped versions
3. Document expected ranges clearly

#### Coordinate Systems
- **bilinearInterpolation**: Uses normalized [0, 1] coordinates
- **smoothstep**: Uses arbitrary edge0/edge1 range
- Different conventions serve different use cases

### Algorithm Choices

#### De Casteljau's Algorithm
- **bezierInterpolation** uses recursive De Casteljau
- Numerically stable
- Works for arbitrary-degree curves
- Slightly slower than direct polynomial evaluation
- Good choice for implementation

#### Catmull-Rom Spline
- **cubicInterpolation** uses Catmull-Rom formula
- Provides C¹ continuity (smooth first derivative)
- Curve passes through control points
- Tension can be adjusted (currently fixed at 0.5)
- Consider adding tension parameter in future

### Clamping Behavior
- **bezierInterpolation** clamps t to [0, 1] using `Math.max(0, Math.min(1, t))`
- **smoothstep** uses early returns for clamping
- **linearInterpolation** does not clamp (allows extrapolation)
- **bilinearInterpolation** validates bounds and returns NaN if outside

Different strategies for different use cases. Consider standardizing in monadic version.

### Testing Considerations
When migrating, ensure comprehensive tests for:
- t = 0 (should return start/first control point)
- t = 1 (should return end/last control point)
- t = 0.5 (midpoint)
- t outside [0, 1] (extrapolation or clamping)
- Edge cases: start equals end, zero ranges
- Control point validations
- Numeric precision near boundaries
- Very small and very large values
- Bezier curves with 2, 3, 4+ control points
- Bilinear interpolation at corners and center
- Smoothstep at edges and midpoint
