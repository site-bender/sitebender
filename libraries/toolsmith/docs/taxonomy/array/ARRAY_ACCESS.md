# Array - Access Functions

**Location**: `src/vanilla/array/`
**Functions**: 22
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### head

- **Current**: `(array: Array<T>) => T | null`
- **Returns**: T | null
- **Description**: Returns the first element (alias for first)
- **Target**: `(array: Array<T>) => Option<T>`

### first

- **Current**: `(array: Array<T>) => T | null`
- **Returns**: T | null
- **Description**: Gets the first element (alias for head)
- **Target**: `(array: Array<T>) => Option<T>`

### tail

- **Current**: `(array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array<T> (empty array on invalid input)
- **Description**: Returns all elements except the first
- **Target**: `(array: Array<T>) => Result<ArrayError, Array<T>>`

### last

- **Current**: `(array: ReadonlyArray<T> | null | undefined) => T | null`
- **Returns**: T | null
- **Description**: Returns the last element
- **Target**: `(array: Array<T>) => Option<T>`

### init

- **Current**: `(array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array<T> (empty array on invalid input)
- **Description**: Returns all but the last element
- **Target**: `(array: Array<T>) => Result<ArrayError, Array<T>>`

### nth

- **Current**: `(index: number) => (array: Array<T> | null | undefined) => T | null`
- **Returns**: T | null
- **Description**: Gets element at index with negative support
- **Target**: `(index: number) => (array: Array<T>) => Option<T>`

### at

- **Current**: `(index: number) => (arr: Array<T>) => T | null`
- **Returns**: T | null
- **Description**: Gets an element at the specified index
- **Target**: `(index: number) => (array: Array<T>) => Option<T>`

### take

- **Current**: `(count: number) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array<T> (empty array on invalid input or count ≤ 0)
- **Description**: Takes first n elements
- **Target**: `(count: number) => (array: Array<T>) => Result<ArrayError, Array<T>>`

### takeLast

- **Current**: `(count: number) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array<T> (empty array on invalid input, count ≤ 0, or NaN count)
- **Description**: Takes last n elements
- **Target**: `(count: number) => (array: Array<T>) => Result<ArrayError, Array<T>>`

### takeWhile

- **Current**: `(predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array<T> (empty array on invalid input)
- **Description**: Takes from start while predicate is true
- **Target**: `(predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: Array<T>) => Result<ArrayError, Array<T>>`

### takeLastWhile

- **Current**: `(predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array<T> (empty array on invalid input)
- **Description**: Takes from end while predicate is true
- **Target**: `(predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: Array<T>) => Result<ArrayError, Array<T>>`

### drop

- **Current**: `(n: number) => (array: Array<T>) => Array<T>`
- **Returns**: Array<T> (returns array unchanged if n ≤ 0)
- **Description**: Drops the first n elements
- **Target**: `(n: number) => (array: Array<T>) => Result<ArrayError, Array<T>>`

### dropLast

- **Current**: `(n: number) => (array: Array<T>) => Array<T>`
- **Returns**: Array<T> (returns array unchanged if n ≤ 0)
- **Description**: Drops the last n elements
- **Target**: `(n: number) => (array: Array<T>) => Result<ArrayError, Array<T>>`

### dropWhile

- **Current**: `(predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array<T> (empty array on invalid input or if all elements match predicate)
- **Description**: Drops leading elements while predicate is true
- **Target**: `(predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: Array<T>) => Result<ArrayError, Array<T>>`

### slice

- **Current**: `(start: number) => (end?: number) => (array: Array<T>) => Array<T>`
- **Returns**: Array<T>
- **Description**: Extracts a portion of an array
- **Target**: `(start: number) => (end: Option<number>) => (array: Array<T>) => Result<ArrayError, Array<T>>`

### sliceFrom

- **Current**: `(startIndex: number) => (length: number) => (array: Array<T>) => Array<T>`
- **Returns**: Array<T> (empty array if length ≤ 0)
- **Description**: Slices from index with specified length
- **Target**: `(startIndex: number) => (length: number) => (array: Array<T>) => Result<ArrayError, Array<T>>`

### aperture

- **Current**: `(width: number) => (array: ReadonlyArray<T> | null | undefined) => Array<Array<T>>`
- **Returns**: Array<Array<T>> (empty array on invalid input, width ≤ 0, or width > array.length)
- **Description**: Creates sliding windows of consecutive elements
- **Target**: `(width: number) => (array: Array<T>) => Result<ArrayError, Array<Array<T>>>`

### chunk

- **Current**: `(size: number) => (array?: ReadonlyArray<T> | null) => Array<Array<T>>`
- **Returns**: Array<Array<T>> (empty array if array is empty, size not positive, or size not integer)
- **Description**: Splits an array into fixed-size chunks
- **Target**: `(size: number) => (array: Array<T>) => Result<ArrayError, Array<Array<T>>>`

### splitEvery

- **Current**: `(chunkSize: number) => (array: Array<T>) => Array<Array<T>>`
- **Returns**: Array<Array<T>> (empty array if array is empty or chunkSize ≤ 0)
- **Description**: Splits array into fixed-size chunks
- **Target**: `(chunkSize: number) => (array: Array<T>) => Result<ArrayError, Array<Array<T>>>`

### sliding

- **Current**: `(size: number) => (step?: number) => (array: ReadonlyArray<T> | null | undefined) => Array<Array<T>>`
- **Returns**: Array<Array<T>> (empty array on invalid input, size/step ≤ 0, non-integer size/step, or array.length < size)
- **Description**: Creates sliding windows over array
- **Target**: `(size: number) => (step: number) => (array: Array<T>) => Result<ArrayError, Array<Array<T>>>`

### slidingWithStep

- **Current**: `(size: number, step: number) => (array: Array<T> | null | undefined) => Array<Array<T>>`
- **Returns**: Array<Array<T>> (empty array on invalid input, size/step ≤ 0, non-finite size, or array.length < size)
- **Description**: Creates windows with custom size and step
- **Not Curried**: Yes - takes two parameters in first call
- **Target**: `(size: number) => (step: number) => (array: Array<T>) => Result<ArrayError, Array<Array<T>>>`

### pairwise

- **Current**: `(array: ReadonlyArray<T> | null | undefined) => Array<[T, T]>`
- **Returns**: Array<[T, T]> (empty array on invalid input or array.length < 2)
- **Description**: Returns adjacent element pairs
- **Target**: `(array: Array<T>) => Result<ArrayError, Array<[T, T]>>`

### span

- **Current**: `(predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T> | null | undefined) => [Array<T>, Array<T>]`
- **Returns**: [Array<T>, Array<T>] (tuple of empty arrays on invalid input)
- **Description**: Splits at first failing predicate
- **Target**: `(predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: Array<T>) => Result<ArrayError, [Array<T>, Array<T>]>`

---

## Migration Notes

Array access functions will be converted to Result-returning or Option-returning functions that provide explicit handling of edge cases. The monadic versions will:

1. Use `Option<T>` for single-element access (head, first, last, nth, at) to represent presence/absence
2. Use `Result<ArrayError, Array<T>>` for multi-element access (tail, init, take, drop, slice, etc.)
3. Return `ok(array)` for successful operations
4. Return `error(ArrayError)` for invalid inputs (null, undefined, non-array)
5. Maintain currying for all multi-parameter functions
6. Preserve negative index support where applicable (nth, sliceFrom)

## Special Considerations

### Return Value Patterns

#### Functions Returning null (Single Element)

- **head**, **first**, **last**, **nth**, **at** return `null` when element doesn't exist or input is invalid
- Should migrate to `Option<T>`: `some(value)` when element exists, `none()` when absent or invalid

#### Functions Returning Empty Array

- **tail**, **init**, **take**, **takeLast**, **takeWhile**, **takeLastWhile**, **drop**, **dropLast**, **dropWhile** return `[]` on invalid input or edge cases
- Should migrate to `Result<ArrayError, Array<T>>`: `error(ArrayError)` for invalid input, `ok([])` for valid empty results

#### Functions Returning Empty Nested Array

- **aperture**, **chunk**, **splitEvery**, **sliding**, **slidingWithStep** return `[]` on invalid input
- Should migrate to `Result<ArrayError, Array<Array<T>>>`

#### Functions Returning Tuples

- **span** returns `[[], []]` on invalid input or empty array
- Should migrate to `Result<ArrayError, [Array<T>, Array<T>]>`

#### Functions Returning Tuple Array

- **pairwise** returns `[]` on invalid input or array length < 2
- Should migrate to `Result<ArrayError, Array<[T, T]>>`

### Aliases and Related Functions

#### head and first

- **head** and **first** are aliases (first calls head internally)
- Both should migrate to identical `Option<T>` signatures
- Consider consolidating to single implementation during migration

### Index Handling

#### Negative Index Support

- **nth** explicitly supports negative indices via `Array.prototype.at`
- **at** supports negative indices via `Array.prototype.at`
- **sliceFrom** normalizes negative indices manually: `Math.max(0, array.length + startIndex)`
- Monadic versions should preserve this behavior

#### Index Validation

- **take** and **takeLast** return `[]` for count ≤ 0
- **drop** and **dropLast** return array unchanged for n ≤ 0
- **aperture** returns `[]` for width ≤ 0 or width > array.length
- **chunk** validates size is positive integer
- **sliding** and **slidingWithStep** validate size/step are positive integers

### Window and Chunk Operations

#### aperture vs sliding vs slidingWithStep

- **aperture**: Fixed window size, step of 1 (consecutive overlapping windows)
- **sliding**: Configurable window size and optional step (defaults to 1)
- **slidingWithStep**: Takes size and step as separate non-curried parameters (needs currying fix)
- All three use similar logic but different parameter handling

#### chunk vs splitEvery

- **chunk**: Uses recursive helper `chunkRecursive`, validates positive integer size
- **splitEvery**: Uses direct recursion, simpler implementation
- Both create fixed-size chunks, but with different validation approaches
- Should consolidate to single implementation during migration

### Predicate-Based Operations

#### Functions with Predicates

- **takeWhile**: Takes from start while predicate true
- **takeLastWhile**: Takes from end while predicate true (uses recursion)
- **dropWhile**: Drops from start while predicate true
- **span**: Splits at first predicate failure, returns tuple `[matched, remaining]`

All predicate functions receive `(element, index, array)` for full context.

### Arrow Function Syntax

Functions using arrow syntax need refactoring to named functions:

- **last** (arrow function)
- **slice** (arrow function)
- **sliceFrom** (arrow function)
- **takeWhile** (arrow function)
- **takeLastWhile** (arrow function with recursive helper)
- **sliding** (arrow function with recursive helper)
- **slidingWithStep** (arrow function with recursive helper)
- **splitEvery** (arrow function, fully recursive)
- **pairwise** (arrow function)
- **span** (arrow function)

### Special Implementation Notes

#### takeLastWhile

- Uses internal recursive helper `findBreakpoint` to scan from end
- Scans backwards until predicate fails or reaches start
- Should preserve this logic in monadic version

#### sliceFrom

- Manually normalizes negative indices before calling `slice`
- Returns `[]` for length ≤ 0
- Different from `slice` which uses native start/end parameters

#### sliding and slidingWithStep

- Both use recursive helpers (`slideRecursive`, `buildWindows`)
- **sliding** has default parameter `step: number = 1` (should be curried)
- **slidingWithStep** has special handling for infinite step (returns only first window)
- **slidingWithStep** marked with `//!! This is not curried.` comment

#### pairwise

- Special case of aperture with width 2 and step 1
- Returns typed tuples `[T, T]` instead of generic arrays
- Could be implemented as `aperture(2)` with type refinement

#### span

- Returns tuple splitting array at first predicate failure
- Handles three cases: all match (second empty), none match (first empty), some match (split)
- Useful for partition-like operations but with single scan

### Validation Dependencies

Functions depend on these validation utilities:

- **isNullish**: Most functions check for null/undefined input
- **isArray**: dropWhile validates input is array
- **isInteger**: chunk, sliding, slidingWithStep validate integer parameters
- **isPositive**: chunk validates positive size
- **isNotEmpty**: chunk checks array not empty
- **lte**: drop, dropLast check if n ≤ 0

### Array Operation Dependencies

Functions depend on these array operations:

- **slice**: Used by drop, dropLast, dropWhile, and many window functions
- **at**: Used by head (which first calls), nth, last
- **dropLast**: Used by init
- **findIndex**: Used by dropWhile, takeWhile, span
- **length**: Used by dropLast
- **from**: Used by fromIndex

### Helper Functions and Related

#### chunk

- Depends on `chunkRecursive` helper in nested folder
- Should inline or refactor during migration

#### fromIndex

- Not strictly an access function, but creates index arrays
- Included for completeness as it relates to array indexing
- Uses `from` with mapping function `(_, i) => i`

### Complex Validation Logic

#### aperture

- Validates width > 0 and width ≤ array.length
- Uses `Array.from` with callback to create windows
- Window creation: `array.slice(i, i + width)` for each position

#### sliding

- Validates size and step are positive integers using `Number.isInteger`
- Validates array.length ≥ size
- Recursive implementation builds windows until end reached

#### slidingWithStep

- Validates size and step with `Number.isFinite`
- Special case: infinite step returns only first window if array large enough
- Not fully curried (takes two params in first call) - needs refactoring

#### span

- Uses `findIndex` to locate split point
- Returns `[[...array], []]` if all match (copies array)
- Returns `[[], [...array]]` if none match (copies array)
- Returns sliced tuple `[array.slice(0, splitIndex), array.slice(splitIndex)]` otherwise

### Edge Cases and Special Handling

#### Empty Array Handling

- **tail**, **init**: Return `[]` for empty or invalid input
- **take**, **takeLast**, **takeWhile**, **takeLastWhile**: Return `[]` for empty input
- **pairwise**: Requires length ≥ 2, returns `[]` otherwise
- **span**: Returns `[[], []]` for empty input

#### Zero and Negative Parameters

- **take**, **takeLast**: Return `[]` for count ≤ 0
- **drop**, **dropLast**: Return array unchanged for n ≤ 0
- **aperture**, **chunk**, **splitEvery**: Return `[]` for size ≤ 0
- **sliding**, **slidingWithStep**: Return `[]` for size/step ≤ 0

#### NaN Handling

- **takeLast**: Explicitly checks `Number.isNaN(count)`, returns `[]`
- **sliding**, **slidingWithStep**: Use `Number.isInteger` which returns false for NaN

#### Undefined Returns

- **at**, **nth**, **last**, **head**, **first**: All use `Array.prototype.at` or array access
- All convert `undefined` to `null` before returning
- Pattern: `return element === undefined ? null : element`

---

## Implementation Dependencies

When planning migration, consider these dependency chains:

### Core Access Dependencies

- **head** → at
- **first** → head → at
- **init** → dropLast → slice, max, length, lte
- **drop** → slice, lte
- **dropLast** → slice, max, length, lte

### Validation Dependencies

- Most functions depend on `isNullish`
- **dropWhile** depends on `isArray`, `isEqual`
- **chunk** depends on `isInteger`, `isPositive`, `isNotEmpty`
- **sliding**, **slidingWithStep** depend on integer/finite validation

### Logic Dependencies

- **tail**, **takeWhile**, **takeLastWhile**, **dropWhile**, **span** depend on `not`

### Array Operation Dependencies

- Many functions use native `Array.prototype.slice`
- **dropWhile** uses `findIndex`
- **aperture**, **pairwise** use `Array.from`
- Window functions use recursive patterns

### Helper Dependencies

- **chunk** has nested helper `chunkRecursive`
- **takeLastWhile** has inline recursive helper `findBreakpoint`
- **sliding** has inline recursive helper `slideRecursive`
- **slidingWithStep** has inline recursive helper `buildWindows`
- **splitEvery** is fully recursive (no external helper)

---

## Notes

### Overlapping Functionality

Several functions have overlapping or similar behavior:

1. **chunk** vs **splitEvery**: Both split arrays into fixed-size chunks
   - Consider consolidating during migration

2. **aperture** vs **sliding**: Both create sliding windows
   - **aperture** is fixed step=1, **sliding** allows configurable step
   - Consider if aperture should be alias for `sliding(width)(1)`

3. **sliding** vs **slidingWithStep**: Nearly identical
   - **slidingWithStep** not properly curried (takes both params at once)
   - Should consolidate to single properly-curried `sliding` during migration

4. **head** vs **first**: Exact aliases
   - Consider keeping only one, or making one an explicit alias

### Missing Standard Access Functions

Consider implementing these during migration:

- **middle**: Get middle element(s)
- **randomElement**: Get random element
- **sample**: Alias for randomElement (already exists but not covered here)
- **elementAt**: Non-nullable version of at/nth

### Testing Considerations

When migrating, ensure comprehensive tests for:

- Empty arrays
- Single-element arrays
- Negative indices (nth, at, sliceFrom)
- Out-of-bounds access
- Invalid parameters (NaN, Infinity, non-integers)
- Null/undefined input
- Predicate edge cases (always true, always false, throws)
- Window operations at array boundaries
- Large arrays (performance)
- Zero and negative counts/sizes
