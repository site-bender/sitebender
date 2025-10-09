# Geometry Functions

**Location**: `src/vanilla/geometry/`
**Functions**: 10
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### dotProduct

- **Current**: `(vector1: Array<number> | null | undefined) => (vector2: Array<number> | null | undefined) => number`
- **Returns**: number (NaN on invalid input, 0 for empty vectors)
- **Description**: Calculates the dot product (scalar product) of two vectors by summing element-wise products; returns 0 for empty vectors; returns NaN on invalid input or dimension mismatch
- **Target**: `(vector1: Array<number>) => (vector2: Array<number>) => Result<GeometryError, number>`

### crossProduct

- **Current**: `(a: Array<number> | null | undefined) => (b: Array<number> | null | undefined) => Array<number>`
- **Returns**: Array<number> (3D vector or [NaN, NaN, NaN] on invalid input)
- **Description**: Calculates the cross product (vector product) of two 3D vectors using formula: [a₂b₃ - a₃b₂, a₃b₁ - a₁b₃, a₁b₂ - a₂b₁]; returns [NaN, NaN, NaN] on invalid input or if vectors are not 3D
- **Target**: `(a: Array<number>) => (b: Array<number>) => Result<GeometryError, Array<number>>`

### vectorProjection

- **Current**: `(vectorA: Array<number> | null | undefined) => (vectorB: Array<number> | null | undefined) => Array<number>`
- **Returns**: Array<number> (empty array for empty vectors, NaN-filled array on invalid input)
- **Description**: Projects vectorA onto vectorB using formula: proj_B(A) = ((A·B)/(B·B)) * B; returns empty array for empty vectors; returns NaN-filled array on invalid input or zero vector projection
- **Target**: `(vectorA: Array<number>) => (vectorB: Array<number>) => Result<GeometryError, Array<number>>`

### magnitude

- **Current**: `(vector: Array<number> | null | undefined) => number`
- **Returns**: number (NaN on invalid input or empty array)
- **Description**: Calculates the magnitude (length/norm) of a vector using Euclidean norm: √(Σx²); returns NaN on invalid input or empty array
- **Target**: `(vector: Array<number>) => Result<GeometryError, number>`

### normalize

- **Current**: `(vector: Array<number> | null | undefined) => Array<number>`
- **Returns**: Array<number> (empty array for empty input, NaN-filled array for zero/invalid vectors)
- **Description**: Normalizes a vector to unit length by dividing each component by magnitude; returns empty array for empty input; returns NaN-filled array for zero or invalid vectors
- **Target**: `(vector: Array<number>) => Result<GeometryError, Array<number>>`

### anglesBetweenVectors

- **Current**: `(vector1: Array<number> | null | undefined) => (vector2: Array<number> | null | undefined) => (inDegrees: boolean = true) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates the angle between two vectors using dot product and magnitudes: θ = arccos((A·B)/(|A||B|)); clamps cosine to [-1, 1] for floating-point errors; returns in degrees by default or radians if inDegrees=false; returns NaN on invalid input or zero vectors
- **Target**: `(vector1: Array<number>) => (vector2: Array<number>) => (inDegrees: boolean) => Result<GeometryError, number>`

### euclideanDistance

- **Current**: `(point1: Array<number> | null | undefined) => (point2: Array<number> | null | undefined) => number`
- **Returns**: number (NaN on invalid input, 0 for empty arrays)
- **Description**: Calculates Euclidean distance between two points using formula: √(Σ(x₂-x₁)²); returns 0 for empty arrays; returns NaN on invalid input or dimension mismatch
- **Target**: `(point1: Array<number>) => (point2: Array<number>) => Result<GeometryError, number>`

### manhattanDistance

- **Current**: `(point1: Array<number> | null | undefined) => (point2: Array<number> | null | undefined) => number`
- **Returns**: number (NaN on invalid input or empty arrays)
- **Description**: Calculates Manhattan (taxicab/L1) distance between two points using formula: Σ|x₂-x₁|; returns NaN on invalid input, empty arrays, or dimension mismatch
- **Target**: `(point1: Array<number>) => (point2: Array<number>) => Result<GeometryError, number>`

### chebyshevDistance

- **Current**: `(point1: Array<number> | null | undefined) => (point2: Array<number> | null | undefined) => number`
- **Returns**: number (NaN on invalid input, 0 for empty arrays)
- **Description**: Calculates Chebyshev (chessboard/L∞) distance between two points using formula: max(|x₂-x₁|); returns 0 for empty arrays; returns NaN on invalid input or dimension mismatch
- **Target**: `(point1: Array<number>) => (point2: Array<number>) => Result<GeometryError, number>`

### haversineDistance

- **Current**: `(point1: [number, number] | null | undefined) => (point2: [number, number] | null | undefined) => (radius: number = 6371) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates great-circle distance between two geographic points (latitude, longitude) on a sphere using Haversine formula; default radius is Earth's mean radius (6371 km); validates latitude [-90, 90] and longitude [-180, 180]; returns NaN on invalid input
- **Target**: `(point1: [number, number]) => (point2: [number, number]) => (radius: number) => Result<GeometryError, number>`

---

## Migration Notes

Geometry functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when calculation succeeds with valid numeric input
2. Return `error(GeometryError)` when calculation fails, with descriptive error messages
3. Maintain currying for all multi-parameter functions
4. Preserve mathematical correctness and special case handling
5. Replace NaN returns with explicit error values
6. Replace empty array returns with explicit error values
7. Replace NaN-filled array returns with explicit error values

## Special Considerations

### Return Value Patterns

#### Functions Returning NaN

- **dotProduct**, **magnitude**, **anglesBetweenVectors**, **euclideanDistance**, **manhattanDistance**, **chebyshevDistance**, **haversineDistance** return `NaN` on invalid input
- These check with `isNullish` and type checks before performing operations
- Should return `error(GeometryError)` in monadic form

#### Functions Returning Empty Arrays

- **normalize** returns `[]` for empty input or invalid vectors
- **vectorProjection** returns `[]` for empty vectors or specific error conditions
- Should return `error(GeometryError)` in monadic form

#### Functions Returning NaN-Filled Arrays

- **crossProduct** returns `[NaN, NaN, NaN]` on invalid input
- **vectorProjection** returns NaN-filled array on invalid input
- **normalize** returns NaN-filled array for zero or invalid vectors
- Should return `error(GeometryError)` in monadic form

#### Special Zero Returns

- **dotProduct** returns `0` for empty vectors (valid case)
- **euclideanDistance** returns `0` for empty arrays (valid case)
- **chebyshevDistance** returns `0` for empty arrays (valid case)
- Should return `ok(0)` for these cases in monadic form

### Arrow Function Syntax

All functions use arrow syntax and need refactoring to named functions:

- **dotProduct** (arrow function)
- **crossProduct** (arrow function)
- **vectorProjection** (arrow function)
- **magnitude** (arrow function)
- **normalize** (arrow function)
- **anglesBetweenVectors** (arrow function)
- **euclideanDistance** (arrow function)
- **manhattanDistance** (arrow function)
- **chebyshevDistance** (arrow function)
- **haversineDistance** (arrow function)

### Complex Validation Logic

#### dotProduct

- Validates both vectors are arrays
- Validates same dimensions
- Returns 0 for empty vectors (valid case)
- Validates all elements are numbers during reduction
- Uses `Array.prototype.reduce` with validation in reducer

#### crossProduct

- Validates both vectors are arrays
- Validates exactly 3 dimensions (3D vectors only)
- Uses helper function `isValidVector` to check all elements
- Uses mathematical formula for 3D cross product

#### vectorProjection

- Complex error handling with dimension-aware NaN array returns
- Validates both vectors are arrays
- Validates same dimensions
- Returns empty array for empty vectors
- Validates all elements are finite numbers
- Depends on `dotProduct` for calculations
- Cannot project onto zero vector (bDotB === 0)
- Uses `Array.prototype.map` for final projection

#### haversineDistance

- Validates both points are 2-element tuples
- Validates latitude range: -90 to 90 degrees
- Validates longitude range: -180 to 180 degrees
- Validates radius > 0
- Depends on `degreesToRadians` from trigonometry
- Uses Haversine formula for great-circle distance
- Default radius is Earth's mean radius (6371 km)

#### magnitude

- Validates vector is array
- Returns NaN for empty array (unlike some other functions that return 0)
- Validates all elements are numbers during reduction
- Uses Euclidean norm: √(Σx²)

#### normalize

- Depends on `magnitude` for calculation
- Cannot normalize zero vector (mag === 0)
- Returns empty array for empty input
- Returns NaN-filled array for zero or invalid vectors
- Uses `Array.prototype.map` for normalization

#### anglesBetweenVectors

- Depends on `magnitude` and `dotProduct`
- Depends on `radiansToDegrees` from trigonometry
- Validates both vectors have same dimensions
- Cannot calculate angle for zero vectors
- Clamps cosine to [-1, 1] to handle floating-point errors
- Returns in degrees by default, radians if inDegrees=false
- Uses `Math.acos` for angle calculation

#### euclideanDistance

- Validates both points are arrays
- Validates same dimensions
- Returns 0 for empty arrays (valid case, unlike magnitude)
- Validates all elements are numbers during reduction
- Uses Euclidean distance formula: √(Σ(x₂-x₁)²)

#### manhattanDistance

- Validates both points are arrays
- Validates same dimensions
- Returns NaN for empty arrays (unlike euclideanDistance which returns 0)
- Validates all elements are numbers during reduction
- Uses Manhattan distance formula: Σ|x₂-x₁|

#### chebyshevDistance

- Validates both points are arrays
- Validates same dimensions
- Returns 0 for empty arrays (valid case)
- Validates all elements are numbers during reduction
- Uses Chebyshev distance formula: max(|x₂-x₁|)

---

## Implementation Dependencies

When planning migration, consider these dependency chains:

### Validation Dependencies

- All functions depend on `isNullish` from validation
- All functions perform type checks with `typeof` and `Array.isArray`
- **vectorProjection** uses `isFinite` for element validation
- **crossProduct** uses helper function `isValidVector` for validation

### Geometry Function Dependencies

- **vectorProjection** depends on `dotProduct`
- **normalize** depends on `magnitude`
- **anglesBetweenVectors** depends on `magnitude` and `dotProduct`

### Trigonometry Dependencies

- **haversineDistance** depends on `degreesToRadians`
- **anglesBetweenVectors** depends on `radiansToDegrees`

### Array Operation Dependencies

- **dotProduct** uses `Array.prototype.reduce`
- **crossProduct** uses array indexing and `Array.prototype.every`
- **vectorProjection** uses `Array.prototype.map` and `Array.prototype.every`
- **magnitude** uses `Array.prototype.reduce`
- **normalize** uses `Array.prototype.map`
- **euclideanDistance** uses `Array.prototype.reduce`
- **manhattanDistance** uses `Array.prototype.reduce`
- **chebyshevDistance** uses `Array.prototype.reduce`
- Should migrate to functional alternatives from toolsmith

### Mathematical Dependencies

- All functions use `Math` methods: `Math.sqrt`, `Math.abs`, `Math.max`, `Math.min`, `Math.acos`, `Math.sin`, `Math.cos`, `Math.atan2`
- Should consider using toolsmith equivalents where available

### Refactoring Requirements

- All functions use arrow syntax and need refactoring to named functions
- All functions using `Array.prototype` methods need migration to toolsmith functional alternatives

---

## Notes

### Missing Standard Geometry Functions

Consider implementing these during migration:

- **scalarMultiply**: Multiply vector by scalar
- **vectorAdd**: Add two vectors element-wise
- **vectorSubtract**: Subtract two vectors element-wise
- **scalarProjection**: Scalar projection (not vector projection)
- **vectorRejection**: Component of vector perpendicular to another
- **tripleProduct**: Scalar and vector triple products
- **distance3D**: Specialized 3D distance (optimization)
- **minkowskiDistance**: Generalized distance metric with p parameter
- **cosineSimilarity**: Normalized dot product for similarity

### Distance Metrics

The codebase implements three standard distance metrics:

- **Euclidean (L2)**: Standard straight-line distance
- **Manhattan (L1)**: Sum of absolute differences
- **Chebyshev (L∞)**: Maximum absolute difference

These are the three most common, but consider adding:

- **Minkowski**: Generalizes L1, L2, L∞ with parameter p
- **Canberra**: Weighted version of Manhattan distance
- **Cosine Distance**: 1 - cosine similarity

### Geographic Distance

- **haversineDistance** assumes spherical Earth with configurable radius
- Does not account for Earth's ellipsoidal shape
- For high precision, consider adding:
  - **vincentyDistance**: More accurate ellipsoidal distance
  - **geodesicDistance**: Geodesic distance on ellipsoid

### Empty Array Handling Inconsistency

Different functions handle empty arrays differently:

- **dotProduct**: Returns 0 (mathematically correct for empty dot product)
- **euclideanDistance**: Returns 0 (distance between empty points is 0)
- **chebyshevDistance**: Returns 0 (max of empty set is 0)
- **magnitude**: Returns NaN (magnitude of empty vector is undefined)
- **manhattanDistance**: Returns NaN (sum of empty set is undefined)
- **normalize**: Returns [] (can't normalize empty vector)

This inconsistency should be addressed in monadic implementation with clear error semantics.

### Floating-Point Considerations

- **anglesBetweenVectors** clamps cosine to [-1, 1] to handle floating-point errors in `Math.acos`
- This is good defensive programming
- Consider similar clamping in other functions where appropriate

### Testing Considerations

When migrating, ensure comprehensive tests for:

- Empty arrays/vectors
- Zero vectors
- Dimension mismatches
- Non-numeric elements
- Very large/small values
- Orthogonal vectors (dot product = 0)
- Parallel vectors (cross product = 0)
- Unit vectors
- Geographic edge cases (poles, antimeridian)
- Floating-point precision edge cases
