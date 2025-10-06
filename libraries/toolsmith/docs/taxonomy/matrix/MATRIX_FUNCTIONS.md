# Matrix Functions

**Location**: `src/vanilla/matrix/`
**Functions**: 10
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### determinant2x2
- **Current**: `(matrix: Array<Array<number>> | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates determinant of 2x2 matrix using formula: ad - bc; returns NaN on invalid input or incorrect dimensions
- **Target**: `(matrix: Array<Array<number>>) => Result<MatrixError, number>`

### determinant3x3
- **Current**: `(matrix: Array<Array<number>> | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates determinant of 3x3 matrix using cofactor expansion; returns NaN on invalid input or incorrect dimensions
- **Target**: `(matrix: Array<Array<number>>) => Result<MatrixError, number>`

### identityMatrix
- **Current**: `(size: number | null | undefined) => Array<Array<number>>`
- **Returns**: Array<Array<number>> (empty array on invalid input)
- **Description**: Creates identity matrix of given size with 1s on diagonal and 0s elsewhere; returns empty array on invalid input
- **Target**: `(size: number) => Result<MatrixError, Array<Array<number>>>`

### matrixAddition
- **Current**: `(matrix1: Array<Array<number>> | null | undefined) => (matrix2: Array<Array<number>> | null | undefined) => Array<Array<number>>`
- **Returns**: Array<Array<number>> (empty array or NaN-filled on invalid input)
- **Description**: Adds two matrices element-wise; requires same dimensions; returns empty array or NaN-filled array on invalid input
- **Target**: `(matrix1: Array<Array<number>>) => (matrix2: Array<Array<number>>) => Result<MatrixError, Array<Array<number>>>`

### matrixInverse2x2
- **Current**: `(matrix: Array<Array<number>> | null | undefined) => Array<Array<number>>`
- **Returns**: Array<Array<number>> (NaN-filled on invalid input or singular matrix)
- **Description**: Calculates inverse of 2x2 matrix; returns NaN-filled array for singular matrices (determinant = 0) or invalid input
- **Target**: `(matrix: Array<Array<number>>) => Result<MatrixError, Array<Array<number>>>`

### matrixInverse3x3
- **Current**: `(matrix: Array<Array<number>> | null | undefined) => Array<Array<number>>`
- **Returns**: Array<Array<number>> (NaN-filled on invalid input or singular matrix)
- **Description**: Calculates inverse of 3x3 matrix using adjugate method; returns NaN-filled array for singular matrices or invalid input
- **Target**: `(matrix: Array<Array<number>>) => Result<MatrixError, Array<Array<number>>>`

### matrixMultiply
- **Current**: `(matrix1: Array<Array<number>> | null | undefined) => (matrix2: Array<Array<number>> | null | undefined) => Array<Array<number>>`
- **Returns**: Array<Array<number>> (empty array on invalid input)
- **Description**: Multiplies two matrices using standard matrix multiplication; requires compatible dimensions (columns of matrix1 = rows of matrix2); returns empty array on invalid input
- **Target**: `(matrix1: Array<Array<number>>) => (matrix2: Array<Array<number>>) => Result<MatrixError, Array<Array<number>>>`

### matrixScalarMultiply
- **Current**: `(scalar: number | null | undefined) => (matrix: Array<Array<number>> | null | undefined) => Array<Array<number>>`
- **Returns**: Array<Array<number>> (empty array on invalid input)
- **Description**: Multiplies every element of a matrix by a scalar value; returns empty array on invalid input
- **Target**: `(scalar: number) => (matrix: Array<Array<number>>) => Result<MatrixError, Array<Array<number>>>`

### matrixTrace
- **Current**: `(matrix: Array<Array<number>> | null | undefined) => number`
- **Returns**: number (NaN on invalid input)
- **Description**: Calculates trace (sum of diagonal elements) of a square matrix; returns NaN on invalid input or non-square matrix
- **Target**: `(matrix: Array<Array<number>>) => Result<MatrixError, number>`

### matrixTranspose
- **Current**: `(matrix: Array<Array<number>> | null | undefined) => Array<Array<number>>`
- **Returns**: Array<Array<number>> (empty array on invalid input)
- **Description**: Transposes a matrix (swaps rows and columns); returns empty array on invalid input
- **Target**: `(matrix: Array<Array<number>>) => Result<MatrixError, Array<Array<number>>>`

---

## Migration Notes

Matrix functions will be converted to Result-returning functions. The monadic versions will:

1. Return `ok(value)` when operation succeeds
2. Return `error(MatrixError)` for invalid inputs, dimension mismatches, or singular matrices
3. Maintain currying for multi-parameter functions
4. Replace NaN/empty array returns with explicit errors

## Notes

Missing functions to consider: rank, eigenvalues, QR decomposition, LU decomposition, matrix power, Frobenius norm.
