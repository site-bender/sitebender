# Array - Combination Functions

**Location**: `src/vanilla/array/`
**Functions**: 23
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### zip
- **Current**: `<T, U>(array2: ReadonlyArray<U> | null | undefined) => (array1: ReadonlyArray<T> | null | undefined) => Array<[T, U]>`
- **Returns**: Array of tuples (empty if either input is null/undefined/empty)
- **Description**: Combines two arrays into pairs
- **Target**: `<T, U>(array2: ReadonlyArray<U>) => (array1: ReadonlyArray<T>) => Result<ArrayError, Array<[T, U]>>`

### zipWith
- **Current**: `<T, U, V>(fn: (a: T, b: U) => V) => (array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<U> | null | undefined) => Array<V>`
- **Returns**: Array of combined results (empty if either input is null/undefined/empty)
- **Description**: Combines arrays using a function
- **Target**: `<T, U, V>(fn: (a: T) => (b: U) => V) => (array1: ReadonlyArray<T>) => (array2: ReadonlyArray<U>) => Result<ArrayError, Array<V>>`

### zipAll
- **Current**: `<T, U>(array2: ReadonlyArray<U> | null | undefined) => (array1: ReadonlyArray<T> | null | undefined) => Array<[T | undefined, U | undefined]>`
- **Returns**: Array of tuples with undefined padding
- **Description**: Zips arrays filling missing with undefined
- **Target**: `<T, U>(array2: ReadonlyArray<U>) => (array1: ReadonlyArray<T>) => Result<ArrayError, Array<[T | undefined, U | undefined]>>`

### zipObj
- **Current**: `<T>(values: ReadonlyArray<T> | null | undefined) => (keys: ReadonlyArray<string | number> | null | undefined) => Record<string | number, T | undefined>`
- **Returns**: Object from keys and values (empty object if keys is null/undefined)
- **Description**: Creates object from keys and values arrays
- **Target**: `<T>(values: ReadonlyArray<T>) => (keys: ReadonlyArray<string | number>) => Result<ArrayError, Record<string | number, T | undefined>>`

### unzip
- **Current**: `<T, U>(pairs: ReadonlyArray<readonly [T, U]> | null | undefined) => [Array<T>, Array<U>]`
- **Returns**: Tuple of two arrays (empty arrays if input is null/undefined)
- **Description**: Separates array of pairs into two arrays
- **Target**: `<T, U>(pairs: ReadonlyArray<readonly [T, U]>) => Result<ArrayError, [Array<T>, Array<U>]>`

### concat
- **Current**: `<T>(first: Array<T>) => (second: Array<T>) => Array<T>`
- **Returns**: Concatenated array
- **Description**: Concatenates two arrays
- **Target**: `<T>(first: ReadonlyArray<T>) => (second: ReadonlyArray<T>) => Result<ArrayError, Array<T>>`

### concatTo
- **Current**: `<T>(toAppend: Array<T>) => (baseArray: Array<T>) => Array<T>`
- **Returns**: Concatenated array
- **Description**: Appends a fixed array to any array
- **Target**: `<T>(toAppend: ReadonlyArray<T>) => (baseArray: ReadonlyArray<T>) => Result<ArrayError, Array<T>>`

### interleave
- **Current**: `<T>(...arrays: Array<Array<T> | null | undefined>) => Array<T>`
- **Returns**: Interleaved array (empty if no valid arrays)
- **Description**: Alternates elements from multiple arrays
- **Target**: `<T>(...arrays: Array<ReadonlyArray<T>>) => Result<ArrayError, Array<T>>`

### intersperse
- **Current**: `<T, U>(separator: U) => (array: ReadonlyArray<T> | null | undefined) => Array<T | U>`
- **Returns**: Array with separators (empty if input is null/undefined)
- **Description**: Inserts a separator between elements
- **Target**: `<T, U>(separator: U) => (array: ReadonlyArray<T>) => Result<ArrayError, Array<T | U>>`

### cartesianProduct
- **Current**: `<T, U>(array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<U> | null | undefined) => Array<[T, U]>`
- **Returns**: Array of all pairs (empty if either input is null/undefined/empty)
- **Description**: Generates all possible pairs from two arrays
- **Target**: `<T, U>(array1: ReadonlyArray<T>) => (array2: ReadonlyArray<U>) => Result<ArrayError, Array<[T, U]>>`

### xprod
- **Current**: `<T, U>(array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<U> | null | undefined) => Array<[T, U]>`
- **Returns**: Array of all pairs (empty if either input is null/undefined/empty)
- **Description**: Alias for cartesianProduct
- **Target**: `<T, U>(array1: ReadonlyArray<T>) => (array2: ReadonlyArray<U>) => Result<ArrayError, Array<[T, U]>>`

### transpose
- **Current**: `<T>(matrix: ReadonlyArray<ReadonlyArray<T>> | null | undefined) => Array<Array<T | undefined>>`
- **Returns**: Transposed matrix (empty if input is null/undefined)
- **Description**: Transposes a 2D array
- **Target**: `<T>(matrix: ReadonlyArray<ReadonlyArray<T>>) => Result<ArrayError, Array<Array<T | undefined>>>`

### union
- **Current**: `<T>(array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array of unique elements from both arrays
- **Description**: Returns unique elements from both arrays
- **Target**: `<T>(array1: ReadonlyArray<T>) => (array2: ReadonlyArray<T>) => Result<ArrayError, Array<T>>`

### unionWith
- **Current**: `<T>(comparator: (a: T, b: T) => boolean) => (array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array of unique elements using custom comparator
- **Description**: Union with custom comparator
- **Target**: `<T>(comparator: (a: T) => (b: T) => boolean) => (array1: ReadonlyArray<T>) => (array2: ReadonlyArray<T>) => Result<ArrayError, Array<T>>`

### intersection
- **Current**: `<T>(array2: ReadonlyArray<T> | null | undefined) => (array1: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array of common elements (empty if either input is null/undefined/empty)
- **Description**: Returns elements that exist in both arrays
- **Target**: `<T>(array2: ReadonlyArray<T>) => (array1: ReadonlyArray<T>) => Result<ArrayError, Array<T>>`

### intersectionWith
- **Current**: `<T, U>(comparator: (a: T, b: U) => boolean) => (array2: ReadonlyArray<U> | null | undefined) => (array1: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array of common elements using custom comparator (empty if either input is null/undefined/empty)
- **Description**: Finds intersection using custom comparator
- **Target**: `<T, U>(comparator: (a: T) => (b: U) => boolean) => (array2: ReadonlyArray<U>) => (array1: ReadonlyArray<T>) => Result<ArrayError, Array<T>>`

### symmetricDifference
- **Current**: `<T>(array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array of elements in either array but not both
- **Description**: Returns elements in either array but not both
- **Target**: `<T>(array1: ReadonlyArray<T>) => (array2: ReadonlyArray<T>) => Result<ArrayError, Array<T>>`

### symmetricDifferenceWith
- **Current**: `<T>(comparator: (a: T, b: T) => boolean) => (array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array of elements in either array but not both using custom comparator
- **Description**: Symmetric difference with custom comparator
- **Target**: `<T>(comparator: (a: T) => (b: T) => boolean) => (array1: ReadonlyArray<T>) => (array2: ReadonlyArray<T>) => Result<ArrayError, Array<T>>`

### insertAt
- **Current**: `(index: number) => <T>(item: T) => (array: Array<T>) => Array<T>`
- **Returns**: New array with item inserted (unchanged if index invalid)
- **Description**: Inserts an item at a specific index
- **Target**: `(index: number) => <T>(item: T) => (array: ReadonlyArray<T>) => Result<ArrayError, Array<T>>`

### aperture
- **Current**: `<T>(width: number) => (array: ReadonlyArray<T> | null | undefined) => Array<Array<T>>`
- **Returns**: Array of sliding windows (empty if input is null/undefined or width invalid)
- **Description**: Creates sliding windows of consecutive elements
- **Target**: `<T>(width: number) => (array: ReadonlyArray<T>) => Result<ArrayError, Array<Array<T>>>`

### pairwise
- **Current**: `<T>(array: ReadonlyArray<T> | null | undefined) => Array<[T, T]>`
- **Returns**: Array of adjacent pairs (empty if input is null/undefined or length < 2)
- **Description**: Returns adjacent element pairs
- **Target**: `<T>(array: ReadonlyArray<T>) => Result<ArrayError, Array<[T, T]>>`

### combinations
- **Current**: `<T>(k: number) => (array: ReadonlyArray<T> | null | undefined) => Array<Array<T>>`
- **Returns**: Array of all k-element combinations (empty or [[]] depending on k)
- **Description**: Generates all k-element combinations
- **Target**: `<T>(k: number) => (array: ReadonlyArray<T>) => Result<ArrayError, Array<Array<T>>>`

### permutations
- **Current**: `<T>(array: ReadonlyArray<T> | null | undefined) => Array<Array<T>>`
- **Returns**: Array of all permutations ([[]] if input is null/undefined/empty)
- **Description**: Generates all permutations
- **Target**: `<T>(array: ReadonlyArray<T>) => Result<ArrayError, Array<Array<T>>>`

---

## Notes

### Flattening Operations
These combination functions work with nested arrays:

- **flatten**: Flattens nested arrays to specified depth
- **flatMap**: Maps and flattens in a single pass
- **unflatten**: Reconstructs nested arrays from flat structure

These may belong in a separate ARRAY_FLATTENING.md category.

### Generator Functions
- **cycle**: Cycles through array elements infinitely (returns Generator<T>)
  - Not included in monadic migration as generators have different semantics

### Set Operations
Functions like `union`, `intersection`, and `symmetricDifference` are combination operations with set semantics. They could also be categorized under set operations.

### Comparison Functions
Many combination functions have `With` variants that accept custom comparators:
- `unionWith`
- `intersectionWith`
- `symmetricDifferenceWith`

These comparators should be curried in the monadic versions: `(a: T) => (b: U) => boolean`
