# Array - Creation Functions

**Location**: `src/vanilla/array/`
**Functions**: 23
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### range

- **Current**: `(start: number) => (end: number) => Array<number>`
- **Returns**: Array<number>
- **Description**: Generates a numeric range
- **Target**: `(start: number) => (end: number) => Result<ArrayError, Array<number>>`

### rangeStep

- **Current**: `(step: number) => (start: number) => (end: number) => Array<number>`
- **Returns**: Array<number>
- **Description**: Generates a range with custom step
- **Target**: `(step: number) => (start: number) => (end: number) => Result<ArrayError, Array<number>>`

### repeat

- **Current**: `(count: number) => <T>(item: T) => Array<T>`
- **Returns**: Array<T>
- **Description**: Repeats an item n times
- **Target**: `(count: number) => <T>(item: T) => Result<ArrayError, Array<T>>`

### repeatItem

- **Current**: `<T>(item: T) => (count: number) => Array<T>`
- **Returns**: Array<T>
- **Description**: Repeats an item (item-first variant)
- **Target**: `<T>(item: T) => (count: number) => Result<ArrayError, Array<T>>`

### from

- **Current**: `(length: number) => <T>(value: T | ((v: Value, i: number) => T)) => Array<T>`
- **Returns**: Array<T>
- **Description**: Returns a new array of specified length using the value or function provided
- **Target**: `(length: number) => <T>(value: T | ((v: Value, i: number) => T)) => Result<ArrayError, Array<T>>`

### fromAsync

- **Current**: `<T>(iterable: AsyncIterable<T> | Iterable<T>) => Promise<T[]>`
- **Returns**: Promise<T[]>
- **Description**: Creates an array from an async iterable or iterable
- **Target**: `<T>(iterable: AsyncIterable<T> | Iterable<T>) => Promise<Result<ArrayError, T[]>>`

### fromIndex

- **Current**: `(length: number) => Array<number>`
- **Returns**: Array<number>
- **Description**: Returns an array of indexes of the specified length
- **Target**: `(length: number) => Result<ArrayError, Array<number>>`

### times

- **Current**: `<T>(n: number) => (fn: (index: number) => T) => Array<T>`
- **Returns**: Array<T>
- **Description**: Calls function n times, collecting results
- **Target**: `<T>(n: number) => (fn: (index: number) => T) => Result<ArrayError, Array<T>>`

### unfold

- **Current**: `<T, U>(fn: (seed: T) => readonly [U, T] | null) => (seed: T | null | undefined) => Array<U>`
- **Returns**: Array<U>
- **Description**: Generates array from seed value
- **Target**: `<T, U>(fn: (seed: T) => readonly [U, T] | null) => (seed: T | null | undefined) => Result<ArrayError, Array<U>>`

### cycle

- **Current**: `<T>(array: ReadonlyArray<T> | null | undefined) => Generator<T, void, unknown>`
- **Returns**: Generator<T, void, unknown>
- **Description**: Cycles through array elements infinitely
- **Target**: `<T>(array: ReadonlyArray<T> | null | undefined) => Result<ArrayError, Generator<T, void, unknown>>`

### cartesianProduct

- **Current**: `<T, U>(array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<U> | null | undefined) => Array<[T, U]>`
- **Returns**: Array<[T, U]>
- **Description**: Generates all possible pairs from two arrays
- **Target**: `<T, U>(array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<U> | null | undefined) => Result<ArrayError, Array<[T, U]>>`

### xprod

- **Current**: `<T, U>(array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<U> | null | undefined) => Array<[T, U]>`
- **Returns**: Array<[T, U]>
- **Description**: Alias for cartesianProduct
- **Target**: `<T, U>(array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<U> | null | undefined) => Result<ArrayError, Array<[T, U]>>`

### combinations

- **Current**: `<T>(k: number) => (array: ReadonlyArray<T> | null | undefined) => Array<Array<T>>`
- **Returns**: Array<Array<T>>
- **Description**: Generates all k-element combinations
- **Target**: `<T>(k: number) => (array: ReadonlyArray<T> | null | undefined) => Result<ArrayError, Array<Array<T>>>`

### permutations

- **Current**: `<T>(array: ReadonlyArray<T> | null | undefined) => Array<Array<T>>`
- **Returns**: Array<Array<T>>
- **Description**: Generates all permutations
- **Target**: `<T>(array: ReadonlyArray<T> | null | undefined) => Result<ArrayError, Array<Array<T>>>`

### subsequences

- **Current**: `<T>(array: ReadonlyArray<T> | null | undefined) => Array<Array<T>>`
- **Returns**: Array<Array<T>>
- **Description**: Generates all possible subsequences
- **Target**: `<T>(array: ReadonlyArray<T> | null | undefined) => Result<ArrayError, Array<Array<T>>>`

### zip

- **Current**: `<T, U>(array2: ReadonlyArray<U> | null | undefined) => (array1: ReadonlyArray<T> | null | undefined) => Array<[T, U]>`
- **Returns**: Array<[T, U]>
- **Description**: Combines two arrays into pairs
- **Target**: `<T, U>(array2: ReadonlyArray<U> | null | undefined) => (array1: ReadonlyArray<T> | null | undefined) => Result<ArrayError, Array<[T, U]>>`

### zipWith

- **Current**: `<T, U, V>(fn: (a: T, b: U) => V) => (array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<U> | null | undefined) => Array<V>`
- **Returns**: Array<V>
- **Description**: Combines arrays using a function
- **Target**: `<T, U, V>(fn: (a: T, b: U) => V) => (array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<U> | null | undefined) => Result<ArrayError, Array<V>>`

### zipAll

- **Current**: `<T, U>(array2: ReadonlyArray<U> | null | undefined) => (array1: ReadonlyArray<T> | null | undefined) => Array<[T | undefined, U | undefined]>`
- **Returns**: Array<[T | undefined, U | undefined]>
- **Description**: Zips arrays filling missing with undefined
- **Target**: `<T, U>(array2: ReadonlyArray<U> | null | undefined) => (array1: ReadonlyArray<T> | null | undefined) => Result<ArrayError, Array<[T | undefined, U | undefined]>>`

### zipObj

- **Current**: `<T>(values: ReadonlyArray<T> | null | undefined) => (keys: ReadonlyArray<string | number> | null | undefined) => Record<string | number, T | undefined>`
- **Returns**: Record<string | number, T | undefined>
- **Description**: Creates object from keys and values arrays
- **Target**: `<T>(values: ReadonlyArray<T> | null | undefined) => (keys: ReadonlyArray<string | number> | null | undefined) => Result<ArrayError, Record<string | number, T | undefined>>`

### unzip

- **Current**: `<T, U>(pairs: ReadonlyArray<readonly [T, U]> | null | undefined) => [Array<T>, Array<U>]`
- **Returns**: [Array<T>, Array<U>]
- **Description**: Separates array of pairs into two arrays
- **Target**: `<T, U>(pairs: ReadonlyArray<readonly [T, U]> | null | undefined) => Result<ArrayError, [Array<T>, Array<U>]>`

### transpose

- **Current**: `<T>(matrix: ReadonlyArray<ReadonlyArray<T>> | null | undefined) => Array<Array<T | undefined>>`
- **Returns**: Array<Array<T | undefined>>
- **Description**: Transposes a 2D array
- **Target**: `<T>(matrix: ReadonlyArray<ReadonlyArray<T>> | null | undefined) => Result<ArrayError, Array<Array<T | undefined>>>`

### aperture

- **Current**: `<T>(width: number) => (array: ReadonlyArray<T> | null | undefined) => Array<Array<T>>`
- **Returns**: Array<Array<T>>
- **Description**: Creates sliding windows of consecutive elements
- **Target**: `<T>(width: number) => (array: ReadonlyArray<T> | null | undefined) => Result<ArrayError, Array<Array<T>>>`

### sliding

- **Current**: `<T>(size: number) => (step: number = 1) => (array: ReadonlyArray<T> | null | undefined) => Array<Array<T>>`
- **Returns**: Array<Array<T>>
- **Description**: Creates sliding windows over array
- **Target**: `<T>(size: number) => (step: number) => (array: ReadonlyArray<T> | null | undefined) => Result<ArrayError, Array<Array<T>>>`

### pairwise

- **Current**: `<T>(array: ReadonlyArray<T> | null | undefined) => Array<[T, T]>`
- **Returns**: Array<[T, T]>
- **Description**: Returns adjacent element pairs
- **Target**: `<T>(array: ReadonlyArray<T> | null | undefined) => Result<ArrayError, Array<[T, T]>>`

### interleave

- **Current**: `<T>(...arrays: Array<Array<T> | null | undefined>) => Array<T>`
- **Returns**: Array<T>
- **Description**: Alternates elements from multiple arrays
- **Target**: `<T>(...arrays: Array<Array<T> | null | undefined>) => Result<ArrayError, Array<T>>`

### intersperse

- **Current**: `<T, U>(separator: U) => (array: ReadonlyArray<T> | null | undefined) => Array<T | U>`
- **Returns**: Array<T | U>
- **Description**: Inserts a separator between elements
- **Target**: `<T, U>(separator: U) => (array: ReadonlyArray<T> | null | undefined) => Result<ArrayError, Array<T | U>>`

### scan

- **Current**: `<T, U>(fn: (acc: U, item: T, index?: number) => U) => (initial: U) => (array: ReadonlyArray<T> | null | undefined) => Array<U>`
- **Returns**: Array<U>
- **Description**: Returns all intermediate accumulator values
- **Target**: `<T, U>(fn: (acc: U, item: T, index?: number) => U) => (initial: U) => (array: ReadonlyArray<T> | null | undefined) => Result<ArrayError, Array<U>>`

---

## Migration Notes

Array creation functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(array)` when creation succeeds with valid input
2. Return `error(ArrayError)` when creation fails, with descriptive error messages
3. Maintain currying for all multi-parameter functions
4. Preserve functional patterns and immutability
5. Replace empty array returns on error with explicit error values
6. Handle null/undefined inputs consistently

## Special Considerations

### Return Value Patterns

#### Empty Array Returns

Most functions return `[]` (empty array) on invalid input:

- **range**: Returns `[]` if start >= end or non-finite range
- **rangeStep**: Returns `[]` if step is 0, direction mismatch, or non-finite length
- **repeat**, **repeatItem**: Return `[]` if count <= 0
- **from**: Returns array based on length (empty if length <= 0)
- **times**: Returns `[]` if n <= 0, nullish, or non-finite
- **unfold**: Returns `[]` if seed is nullish
- **cartesianProduct**: Returns `[]` if either array is null/undefined/empty
- **combinations**: Returns `[]` if k is invalid or exceeds array length
- **zip**, **zipWith**: Return `[]` if either array is null/undefined/empty
- **aperture**, **sliding**: Return `[]` if width/size invalid or array too small
- **pairwise**: Returns `[]` if array length < 2

These should return `error(ArrayError)` in monadic form for invalid parameters, but may return `ok([])` for valid edge cases (e.g., empty input arrays).

#### Special Success Cases

- **permutations**: Returns `[[]]` for null/undefined/empty array (valid base case)
- **subsequences**: Returns `[[]]` for null/undefined/empty array (valid base case)
- **zipAll**: Returns empty array if both inputs are null/undefined (can handle mismatched lengths)
- **unzip**: Returns `[[], []]` for null/undefined/empty input (valid base case)
- **scan**: Returns `[initial]` for null/undefined/empty array (includes initial value)
- **combinations**: Returns `[[]]` when k = 0 (valid mathematical case)

### Generator Functions

#### cycle

- Returns a Generator that yields elements infinitely
- Only valid generator function in creation category
- Yields nothing if array is null/undefined/empty
- Should return `error(ArrayError)` for invalid input, `ok(generator)` for valid input

### Async Functions

#### fromAsync

- Returns a Promise<T[]>
- Uses native Array.fromAsync
- Should return `Promise<Result<ArrayError, T[]>>`
- Needs to handle async iteration errors

### Complex Validation Logic

#### range

- Checks `start >= end` (returns `[]`)
- Checks `isFinite(end - start)` (returns `[]`)
- Uses `Array.from` with length calculation

#### rangeStep

- Validates step !== 0 (prevents infinite loops)
- Validates step direction matches start/end relationship
- Calculates length with `Math.ceil`
- Checks `isFinite(length)`

#### times

- Validates n with `isNullish`, `n <= 0`, `Number.isFinite`
- Truncates to integer with `Math.floor`
- Uses `Array.from` with index-based function

#### unfold

- Takes a function returning `[value, nextSeed] | null`
- Recursively builds array until null returned
- Validates seed with `isNullish`

#### combinations

- Validates k is integer using `isInteger`
- Validates k >= 0 and k <= array.length
- Special case: k = 0 returns `[[]]`
- Special case: k = array.length returns `[[...array]]`
- Uses recursive helper `_buildCombinations`

#### permutations

- Uses recursive approach
- Base cases: empty/null returns `[[]]`, single element returns `[[element]]`
- Uses `reduce` to build permutations

#### sliding

- Validates size > 0, step > 0
- Validates both are integers with `Number.isInteger`
- Validates array.length >= size
- Uses recursion to build windows

#### zipWith

- Takes a combining function as first parameter
- Validates both arrays are non-null/non-empty
- Uses `Math.min` to determine iteration length

#### zipAll

- Normalizes null/undefined to `[]` with `?? []`
- Uses `Math.max` to determine iteration length
- Fills missing values with `undefined`

#### transpose

- Finds maximum row length using `reduce`
- Creates transposed matrix with `Array.from`
- Handles ragged arrays (different row lengths)
- Fills missing values with `undefined`

#### scan

- Returns array of all intermediate accumulator values
- Always includes initial value in result
- Uses recursion to build result array
- Returns `[initial]` for empty array

### Function Dependencies

#### range

- No external dependencies
- Uses native `Array.from` and `isFinite`

#### rangeStep

- No external dependencies
- Uses native `Math.ceil`, `Math.abs`, `isFinite`

#### repeat, repeatItem

- No external dependencies
- Uses native `Array.from`

#### from

- Depends on: `isFunction`
- Uses native `Array.from`

#### fromAsync

- No external dependencies
- Uses native `Array.fromAsync`

#### fromIndex

- Depends on: `from` (internal)
- Composed function: `from(length)((_, i) => i)`

#### times

- Depends on: `isNullish`, `not`, `Number.isFinite`
- Uses native `Array.from`, `Math.floor`

#### unfold

- Depends on: `isNull`, `isNullish`
- Uses recursion

#### cycle

- Depends on: `isArray`, `isNotEmpty`, `_cycleRecursive` (internal helper)
- Generator function

#### cartesianProduct

- Depends on: `isNullish`
- Uses native `Array.isArray`, `flatMap`, `map`

#### xprod

- Alias for `cartesianProduct`
- No additional dependencies

#### combinations

- Depends on: `isArray`, `isInteger`, `gte`, `lte`, `isEqual`, `length`, `_buildCombinations` (helper)
- Uses recursion via helper

#### permutations

- Depends on: `isNullish`
- Uses native `reduce`, `slice`, `map`

#### subsequences

- Depends on: `isNullish`
- Uses native `reduce`

#### zip

- Depends on: `isNullish`
- Uses native `Array.isArray`, `Math.min`
- Uses recursion

#### zipWith

- Depends on: `isNullish`
- Uses native `Array.isArray`, `Math.min`
- Uses recursion

#### zipAll

- No external dependencies (normalizes with `??`)
- Uses native `Math.max`
- Uses recursion

#### zipObj

- Depends on: `isNullish`
- Uses native `Array.isArray`
- Uses recursion to build object

#### unzip

- Depends on: `isNullish`, `not`
- Uses native `Array.isArray`
- Uses recursion

#### transpose

- Depends on: `isNullish`
- Uses native `reduce`, `Array.from`, `Array.isArray`, `Math.max`

#### aperture

- Depends on: `isNullish`
- Uses native `Array.from`, `Array.isArray`, `slice`

#### sliding

- Depends on: `isNullish`
- Uses native `Number.isInteger`, `slice`
- Uses recursion

#### pairwise

- Depends on: `isNullish`
- Uses native `Array.from`

#### interleave

- Depends on: `isNullish`, `not`
- Uses variadic parameters `...arrays`
- Uses native `filter`, `map`, `flat`, `Math.max`

#### intersperse

- Depends on: `isNullish`
- Uses native `flatMap`

#### scan

- Depends on: `isNullish`
- Uses native `Array.isArray`
- Uses recursion

### Special Cases and Edge Cases

#### Range Functions

- **range**: Returns `[]` for start >= end (no elements in range)
- **rangeStep**: Returns `[]` for zero step (prevents infinite loop)
- **rangeStep**: Returns `[]` for step direction mismatch (e.g., step > 0 but start >= end)

#### Repeat Functions

- **repeat**, **repeatItem**: Return `[]` for count <= 0 (no repetitions)

#### Generator Creation

- **from**: Accepts either value or function `(v, i) => T`
- **times**: Calls function n times with index parameter
- **unfold**: Generates until function returns null

#### Combinatorial Functions

- **combinations**: Returns `[[]]` for k = 0 (empty combination is valid)
- **combinations**: Returns `[[...array]]` for k = array.length (only one combination)
- **permutations**: Returns `[[]]` for empty array (empty permutation)
- **subsequences**: Returns `[[]]` for empty array (empty subsequence is valid)

#### Zip Functions

- **zip**: Stops at length of shorter array (uses `Math.min`)
- **zipAll**: Continues to length of longer array (uses `Math.max`), fills with `undefined`
- **zipWith**: Applies function while combining (same length behavior as zip)
- **zipObj**: Creates object with keys/values; fills missing values with `undefined`

#### Matrix Operations

- **transpose**: Handles ragged arrays (different row lengths)
- **transpose**: Returns `[]` for empty matrix
- **transpose**: Fills missing values with `undefined`

#### Window Functions

- **aperture**: Returns `[]` if width > array.length
- **sliding**: Allows custom step size (can skip elements)
- **pairwise**: Special case of aperture with width = 2, step = 1

#### Sequence Functions

- **scan**: Always includes initial value in result
- **scan**: Returns `[initial]` for empty array
- **cycle**: Infinite generator (yields forever for non-empty array)

#### Interleaving Functions

- **interleave**: Accepts variadic array arguments
- **interleave**: Filters out null/undefined arrays
- **interleave**: Alternates elements from all valid arrays
- **intersperse**: Inserts separator between (not before/after) elements

### Arrow Function Syntax

All functions currently use named function syntax or are already properly curried. No arrow function refactoring needed for this category.

### Type Safety Considerations

#### Generic Type Parameters

Most functions are generic over one or more types:

- Single type: `repeat<T>`, `times<T>`, `aperture<T>`, etc.
- Dual types: `zip<T, U>`, `zipWith<T, U, V>`, `cartesianProduct<T, U>`
- Complex types: `unfold<T, U>` (seed type and element type)

#### Readonly Array Inputs

Most functions accept `ReadonlyArray<T>` inputs, ensuring immutability

#### Null/Undefined Handling

Most functions accept `| null | undefined` and handle gracefully with empty array returns

---

## Implementation Dependencies

When planning migration, consider these dependency chains:

### Validation Dependencies

- Most functions depend on `isNullish` from validation
- **combinations** depends on `isArray`, `isInteger`, `gte`, `lte`, `isEqual`
- **from** depends on `isFunction`
- **times** depends on `not` from logic

### Array Operation Dependencies

- **combinations** depends on `length` (internal array function)
- Several functions use native array methods that should be replaced with functional equivalents

### Helper Function Dependencies

- **cycle** has helper: `_cycleRecursive`
- **combinations** has helper: `_buildCombinations`
- **fromIndex** composes `from`
- **xprod** is alias for `cartesianProduct`

### Refactoring Requirements

- Most functions already use functional patterns (recursion, Array.from)
- **interleave** uses variadic parameters (spread operator) which is acceptable
- No imperative loops found in creation functions (good functional design)

---

## Notes

### Related Array Functions Not Included Here

These are creation-adjacent but categorized elsewhere:

- **concat**, **concatTo**: Array combination (categorized as transformation)
- **flatten**, **unflatten**: Array restructuring (categorized as transformation)
- **chunk**, **splitEvery**: Array division (categorized as transformation)
- **partition**, **partitionBy**: Array splitting (categorized as filtering)

### Potential Missing Creation Functions

Consider implementing during migration:

- **fill**: Create array and fill with value (similar to repeat but with Array.fill semantics)
- **generate**: Alias or variation of from/times with different parameter order
- **sequence**: Create sequence with start, end, step in single function
- **matrix**: Create 2D array with dimensions and fill value/function

### Mathematical Background

#### Combinatorial Functions

- **combinations**: C(n, k) = n! / (k! × (n-k)!)
- **permutations**: P(n) = n!
- **subsequences**: 2^n possible subsequences for array of length n
- **cartesianProduct**: |A × B| = |A| × |B|

#### Window Functions

- **aperture(n)**: Creates (array.length - n + 1) windows
- **sliding(size)(step)**: Creates ⌈(array.length - size) / step⌉ + 1 windows
- **pairwise**: Equivalent to aperture(2)

### Testing Considerations

When migrating, ensure comprehensive tests for:

- Negative counts/lengths (should error)
- Zero counts/lengths (edge case)
- Infinite values in ranges
- Very large n values (performance/overflow)
- Null/undefined inputs
- Empty arrays as inputs
- Generator exhaustion (cycle)
- Async iteration errors (fromAsync)
- Combining function errors (zipWith)
- Ragged arrays (transpose)
