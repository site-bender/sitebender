# Array - Operations Functions

**Location**: `src/vanilla/array/`
**Functions**: 21
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### sort
- **Current**: `<T>(compareFn?: (a: T, b: T) => number) => (array: Array<T>) => Array<T>`
- **Returns**: New sorted array (original unchanged)
- **Description**: Sorts array with optional comparator
- **Target**: `<T>(compareFn?: (a: T, b: T) => number) => (array: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### sortBy
- **Current**: `<T, U>(fn: (value: T) => U) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Empty array if nullish/empty, otherwise new sorted array
- **Description**: Sorts by mapping function result
- **Target**: `<T, U>(fn: (value: T) => U) => (array: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### sortWith
- **Current**: `<T>(comparators: ReadonlyArray<(a: T, b: T) => number>) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Empty array if nullish/empty, otherwise sorted array using multiple comparators
- **Description**: Sorts using multiple comparators
- **Target**: `<T>(comparators: ReadonlyArray<(a: T, b: T) => number>) => (array: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### reverse
- **Current**: `<T>(array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Empty array if nullish, otherwise reversed array
- **Description**: Reverses array order
- **Target**: `<T>(array: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### unique
- **Current**: `<T>(array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Empty array if nullish, otherwise array with duplicates removed
- **Description**: Removes duplicate elements (alias for nub)
- **Target**: `<T>(array: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### nub
- **Current**: `<T>(array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Empty array if nullish, otherwise array with duplicates removed using Set
- **Description**: Removes duplicates (alias for unique)
- **Target**: `<T>(array: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### nubBy
- **Current**: `<T>(equalityFn: (a: T, b: T) => boolean) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Empty array if nullish, otherwise array with duplicates removed by custom equality
- **Description**: Removes duplicates by custom equality
- **Target**: `<T>(equalityFn: (a: T, b: T) => boolean) => (array: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### union
- **Current**: `<T>(array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Empty array if both nullish, otherwise unique elements from both arrays
- **Description**: Returns unique elements from both arrays
- **Target**: `<T>(array1: ReadonlyArray<T>) => (array2: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### unionWith
- **Current**: `<T>(comparator: (a: T, b: T) => boolean) => (array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Empty array if both nullish, otherwise union with custom comparator
- **Description**: Union with custom comparator
- **Target**: `<T>(comparator: (a: T, b: T) => boolean) => (array1: ReadonlyArray<T>) => (array2: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### intersection
- **Current**: `<T>(array2: ReadonlyArray<T> | null | undefined) => (array1: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Empty array if either nullish/empty, otherwise elements that exist in both arrays
- **Description**: Returns elements that exist in both arrays
- **Target**: `<T>(array2: ReadonlyArray<T>) => (array1: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### intersectionWith
- **Current**: `<T, U>(comparator: (a: T, b: U) => boolean) => (array2: ReadonlyArray<U> | null | undefined) => (array1: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Empty array if either nullish/empty, otherwise intersection using custom comparator
- **Description**: Finds intersection using custom comparator
- **Target**: `<T, U>(comparator: (a: T, b: U) => boolean) => (array2: ReadonlyArray<U>) => (array1: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### symmetricDifference
- **Current**: `<T>(array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Empty array if both nullish, otherwise elements in either array but not both
- **Description**: Returns elements in either array but not both
- **Target**: `<T>(array1: ReadonlyArray<T>) => (array2: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### symmetricDifferenceWith
- **Current**: `<T>(comparator: (a: T, b: T) => boolean) => (array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Empty array if both nullish, otherwise symmetric difference with custom comparator
- **Description**: Symmetric difference with custom comparator
- **Target**: `<T>(comparator: (a: T, b: T) => boolean) => (array1: ReadonlyArray<T>) => (array2: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### findIndex
- **Current**: `<T>(predicate: (item: T, index: number, array: Array<T>) => boolean) => (array: Array<T>) => number`
- **Returns**: Index of first matching element, or -1 if not found
- **Description**: Finds the index of the first matching element
- **Target**: `<T>(predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T>) => Result<ValidationError, Option<PositiveInteger>>`

### findLastIndex
- **Current**: `<T>(predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T>) => number | null`
- **Returns**: Index of last matching element, or null if not found
- **Description**: Finds the index of the last matching element
- **Target**: `<T>(predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T>) => Result<ValidationError, Option<PositiveInteger>>`

### lastIndexOfMatch
- **Current**: `(pattern: RegExp | string) => (array: ReadonlyArray<string> | null | undefined) => number | null`
- **Returns**: Null if nullish/empty/not found, otherwise last index matching pattern
- **Description**: Finds the last index matching a pattern
- **Target**: `(pattern: RegExp | string) => (array: ReadonlyArray<string>) => Result<ValidationError, Option<PositiveInteger>>`

### includes
- **Current**: `<T>(item: T) => (array: Array<T>) => boolean`
- **Returns**: Boolean indicating if array contains the value
- **Description**: Checks if array contains a value
- **Target**: `<T>(item: T) => (array: ReadonlyArray<T>) => Result<ValidationError, boolean>`

### all
- **Current**: `<T>(predicate: (item: T, index: number, array: Array<T>) => boolean) => (array: Array<T>) => boolean`
- **Returns**: Boolean indicating if all elements satisfy predicate
- **Description**: Tests whether all elements satisfy a predicate
- **Target**: `<T>(predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T>) => Result<ValidationError, boolean>`

### some
- **Current**: `<T>(predicate: (value: T, index: number, array: Array<T>) => boolean) => (array: Array<T>) => boolean`
- **Returns**: Boolean indicating if any element satisfies predicate
- **Description**: Tests if any element satisfies predicate
- **Target**: `<T>(predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T>) => Result<ValidationError, boolean>`

### none
- **Current**: `<T>(predicate: (item: T, index: number, array: Array<T>) => boolean) => (array: Array<T> | null | undefined) => boolean`
- **Returns**: True if nullish or no elements satisfy predicate
- **Description**: Tests if no elements satisfy a predicate
- **Target**: `<T>(predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T>) => Result<ValidationError, boolean>`

### move
- **Current**: `<T>(from: number) => (to: number) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Empty array if nullish, original array if indices invalid or same, otherwise array with element moved
- **Description**: Moves an element to a new position
- **Target**: `<T>(from: PositiveInteger) => (to: PositiveInteger) => (array: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### rotateLeft
- **Current**: `<T>(n: number) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Empty array if nullish/empty, otherwise array rotated left by n positions
- **Description**: Rotates elements left by n positions
- **Target**: `<T>(n: Integer) => (array: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### rotateRight
- **Current**: `<T>(n: number) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Empty array if nullish/empty, otherwise array rotated right by n positions
- **Description**: Rotates elements right by n positions
- **Target**: `<T>(n: Integer) => (array: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### shuffle
- **Current**: `<T>(array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Empty array if nullish/empty, otherwise randomly shuffled array using Fisher-Yates
- **Description**: Randomly shuffles array elements
- **Target**: `<T>(array: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### sampleSize
- **Current**: `<T>(n: number) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Empty array if nullish/empty/n<=0, otherwise n random elements without replacement
- **Description**: Returns n random elements without replacement
- **Target**: `<T>(n: PositiveInteger) => (array: ReadonlyArray<T>) => Result<ValidationError, ReadonlyArray<T>>`

### transpose
- **Current**: `<T>(matrix: ReadonlyArray<ReadonlyArray<T>> | null | undefined) => Array<Array<T | undefined>>`
- **Returns**: Empty array if nullish/empty, otherwise transposed 2D array
- **Description**: Transposes a 2D array
- **Target**: `<T>(matrix: ReadonlyArray<ReadonlyArray<T>>) => Result<ValidationError, ReadonlyArray<ReadonlyArray<T | undefined>>>`

### startsWith
- **Current**: `<T>(prefix: ReadonlyArray<T> | null | undefined) => (array: ReadonlyArray<T> | null | undefined) => boolean`
- **Returns**: False if either nullish, true if prefix empty, otherwise boolean indicating if array starts with prefix
- **Description**: Checks if array starts with prefix
- **Target**: `<T>(prefix: ReadonlyArray<T>) => (array: ReadonlyArray<T>) => Result<ValidationError, boolean>`

### maximumBy
- **Current**: `<T>(comparator: (a: T, b: T) => number) => (array: ReadonlyArray<T> | null | undefined) => T | null`
- **Returns**: Null if nullish/empty, otherwise maximum element by comparator
- **Description**: Finds the maximum element by comparator
- **Target**: `<T>(comparator: (a: T, b: T) => number) => (array: ReadonlyArray<T>) => Result<ValidationError, Option<T>>`

### indexBy
- **Current**: `<T, K extends string | number | symbol>(keyFn: (element: T, index: number, array: ReadonlyArray<T>) => K) => (array: ReadonlyArray<T> | null | undefined) => Record<K, T>`
- **Returns**: Empty object if nullish, otherwise record indexed by key function
- **Description**: Indexes elements by a key function
- **Target**: `<T, K extends string | number | symbol>(keyFn: (element: T, index: number, array: ReadonlyArray<T>) => K) => (array: ReadonlyArray<T>) => Result<ValidationError, Record<K, T>>`

### toSet
- **Current**: `<T>(array: Array<T> | null | undefined) => Set<T>`
- **Returns**: Empty Set if nullish, otherwise Set from array
- **Description**: Converts array to Set
- **Target**: `<T>(array: ReadonlyArray<T>) => Result<ValidationError, Set<T>>`

---

## Migration Notes

Array operations will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(array)` when operation succeeds
2. Return `error(ValidationError)` when validation fails (e.g., invalid input)
3. Replace null/undefined/empty array returns with proper Result error states
4. Use branded types for indices (PositiveInteger) and counts
5. Use Option monad for operations that may not find elements (findIndex, findLastIndex, maximumBy)
6. Maintain currying for all multi-parameter functions
7. Preserve immutability and pure function behavior

## Special Considerations

### Sorting Operations
- **sort**, **sortBy**, **sortWith**: All create new arrays (no mutation). Need error handling for invalid comparators.
- Comparator functions should return -1, 0, or 1 for proper sorting

### Set Operations
- **union**, **unionWith**: Combine unique elements from two arrays
- **intersection**, **intersectionWith**: Find common elements
- **symmetricDifference**, **symmetricDifferenceWith**: Find elements in either but not both
- All use Set for O(n) performance with standard equality or custom comparators

### Uniqueness
- **unique**/**nub**: Remove duplicates using SameValueZero equality (Set)
- **nubBy**: Remove duplicates using custom equality function

### Search Operations
- **findIndex**: Returns -1 if not found (should return Option in monadic version)
- **findLastIndex**: Already returns null (good candidate for Option)
- **lastIndexOfMatch**: Pattern-based search, returns null if not found
- **includes**: Simple boolean membership test
- **all**, **some**, **none**: Predicate-based boolean tests

### Rotation and Movement
- **move**: Moves element from one index to another (uses removeAt + insertAt)
- **rotateLeft**, **rotateRight**: Circular rotation with normalization for out-of-bounds values
- Both handle negative rotations and rotations larger than array length

### Randomization
- **shuffle**: Fisher-Yates algorithm (functional implementation)
- **sampleSize**: Returns n random elements without replacement
- Both use Math.random() internally (potential IO consideration)

### Transformation
- **transpose**: Matrix operation (2D array flip)
- **indexBy**: Creates lookup Record from array
- **toSet**: Simple conversion to Set

### Pattern Matching
- **startsWith**: Checks if array begins with prefix (uses Object.is for equality)

### Aggregation
- **maximumBy**: Finds max element using custom comparator (recursive implementation)

### Constitutional Violations to Fix
- **sort**, **sortBy**, **sortWith**, **includes**, **some**, **none**, **nubBy**: Use arrow functions
- **unionWith**, **symmetricDifferenceWith**: Use arrow functions and loops
- **transpose**: Uses arrow function in Array.from
- All violations need conversion to named function declarations

### Performance Optimizations
- Set-based operations (union, intersection, nub) use O(n) time complexity
- Recursive implementations avoid loops while maintaining functional purity
- Fisher-Yates shuffle is optimal O(n) algorithm
