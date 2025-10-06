# Array - Partitioning Functions

**Location**: `src/vanilla/array/`
**Functions**: 25
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### partition
- **Current**: `(predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T> | null | undefined) => [Array<T>, Array<T>]`
- **Returns**: `[Array<T>, Array<T>]` (tuple of pass/fail arrays)
- **Description**: Splits array by predicate into two groups
- **Target**: `(predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T>) => Result<ArrayError, [Array<T>, Array<T>]>`

### partitionBy
- **Current**: `(predicate: (value: T) => unknown) => (array: ReadonlyArray<T> | null | undefined) => Array<Array<T>>`
- **Returns**: `Array<Array<T>>`
- **Description**: Groups consecutive elements with same predicate result
- **Target**: `(predicate: (value: T) => unknown) => (array: ReadonlyArray<T>) => Result<ArrayError, Array<Array<T>>>`

### chunk
- **Current**: `(size: number) => (array?: ReadonlyArray<T> | null) => Array<Array<T>>`
- **Returns**: `Array<Array<T>>` (empty array if invalid input)
- **Description**: Splits an array into fixed-size chunks
- **Target**: `(size: number) => (array: ReadonlyArray<T>) => Result<ArrayError, Array<Array<T>>>`

### splitEvery
- **Current**: `(chunkSize: number) => <T>(array: Array<T>) => Array<Array<T>>`
- **Returns**: `Array<Array<T>>` (empty array if invalid size or empty array)
- **Description**: Splits array into fixed-size chunks
- **Target**: `(chunkSize: number) => (array: ReadonlyArray<T>) => Result<ArrayError, Array<Array<T>>>`

### groupBy
- **Current**: `(keyFn: (element: T) => K) => (array: ReadonlyArray<T> | null | undefined) => Record<string, Array<T>>`
- **Returns**: `Record<string, Array<T>>` (empty object if nullish)
- **Description**: Groups elements by a key function
- **Target**: `(keyFn: (element: T) => K) => (array: ReadonlyArray<T>) => Result<ArrayError, Record<string, Array<T>>>`

### groupWith
- **Current**: `(predicate: (a: T, b: T) => boolean) => (array: ReadonlyArray<T> | null | undefined) => Array<Array<T>>`
- **Returns**: `Array<Array<T>>` (empty array if nullish or empty)
- **Description**: Groups consecutive elements by predicate
- **Target**: `(predicate: (a: T, b: T) => boolean) => (array: ReadonlyArray<T>) => Result<ArrayError, Array<Array<T>>>`

### span
- **Current**: `(predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T> | null | undefined) => [Array<T>, Array<T>]`
- **Returns**: `[Array<T>, Array<T>]` (tuple of matched/unmatched elements)
- **Description**: Splits at first failing predicate
- **Target**: `(predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T>) => Result<ArrayError, [Array<T>, Array<T>]>`

### takeWhile
- **Current**: `(predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: `Array<T>` (empty array if nullish)
- **Description**: Takes from start while predicate is true
- **Target**: `(predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T>) => Result<ArrayError, Array<T>>`

### takeLastWhile
- **Current**: `(predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: `Array<T>` (empty array if nullish or empty)
- **Description**: Takes from end while predicate is true
- **Target**: `(predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T>) => Result<ArrayError, Array<T>>`

### dropWhile
- **Current**: `(predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: `Array<T>` (empty array if all elements match or nullish)
- **Description**: Drops leading elements while predicate is true
- **Target**: `(predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T>) => Result<ArrayError, Array<T>>`

### aperture
- **Current**: `(width: number) => (array: ReadonlyArray<T> | null | undefined) => Array<Array<T>>`
- **Returns**: `Array<Array<T>>` (empty array if invalid width or nullish)
- **Description**: Creates sliding windows of consecutive elements
- **Target**: `(width: number) => (array: ReadonlyArray<T>) => Result<ArrayError, Array<Array<T>>>`

### sliding
- **Current**: `(size: number) => (step?: number) => (array: ReadonlyArray<T> | null | undefined) => Array<Array<T>>`
- **Returns**: `Array<Array<T>>` (empty array if invalid parameters or nullish)
- **Description**: Creates sliding windows over array
- **Target**: `(size: number) => (step: number) => (array: ReadonlyArray<T>) => Result<ArrayError, Array<Array<T>>>`

### slidingWithStep
- **Current**: `(size: number, step: number) => (array: Array<T> | null | undefined) => Array<Array<T>>`
- **Returns**: `Array<Array<T>>` (empty array if invalid parameters or nullish)
- **Description**: Creates windows with custom size and step
- **Note**: Not curried - needs refactoring
- **Target**: `(size: number) => (step: number) => (array: ReadonlyArray<T>) => Result<ArrayError, Array<Array<T>>>`

### pairwise
- **Current**: `(array: ReadonlyArray<T> | null | undefined) => Array<[T, T]>`
- **Returns**: `Array<[T, T]>` (empty array if nullish or length < 2)
- **Description**: Returns adjacent element pairs
- **Target**: `(array: ReadonlyArray<T>) => Result<ArrayError, Array<[T, T]>>`

### countBy
- **Current**: `(fn: (element: T) => K) => (array: ReadonlyArray<T> | null | undefined) => Record<K, number>`
- **Returns**: `Record<K, number>` (empty object if not array)
- **Description**: Counts elements by grouping criteria
- **Target**: `(fn: (element: T) => K) => (array: ReadonlyArray<T>) => Result<ArrayError, Record<K, number>>`

### indexBy
- **Current**: `(keyFn: (element: T, index: number, array: ReadonlyArray<T>) => K) => (array: ReadonlyArray<T> | null | undefined) => Record<K, T>`
- **Returns**: `Record<K, T>` (empty object if nullish)
- **Description**: Indexes elements by a key function
- **Target**: `(keyFn: (element: T, index: number, array: ReadonlyArray<T>) => K) => (array: ReadonlyArray<T>) => Result<ArrayError, Record<K, T>>`

### dropRepeats
- **Current**: `(array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: `Array<T>` (empty array if not array)
- **Description**: Removes consecutive duplicate elements from an array
- **Target**: `(array: ReadonlyArray<T>) => Result<ArrayError, Array<T>>`

### dropRepeatsWith
- **Current**: `(comparator: (a: T, b: T) => boolean) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: `Array<T>` (empty array if not array)
- **Description**: Removes consecutive duplicates with custom equality
- **Target**: `(comparator: (a: T, b: T) => boolean) => (array: ReadonlyArray<T>) => Result<ArrayError, Array<T>>`

### nub
- **Current**: `(array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: `Array<T>` (empty array if nullish or not array)
- **Description**: Removes duplicates (alias for unique)
- **Target**: `(array: ReadonlyArray<T>) => Result<ArrayError, Array<T>>`

### nubBy
- **Current**: `(equalityFn: (a: T, b: T) => boolean) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: `Array<T>` (empty array if nullish)
- **Description**: Removes duplicates by custom equality
- **Target**: `(equalityFn: (a: T, b: T) => boolean) => (array: ReadonlyArray<T>) => Result<ArrayError, Array<T>>`

### subsequences
- **Current**: `(array: ReadonlyArray<T> | null | undefined) => Array<Array<T>>`
- **Returns**: `Array<Array<T>>` (array containing empty array if nullish)
- **Description**: Generates all possible subsequences
- **Target**: `(array: ReadonlyArray<T>) => Result<ArrayError, Array<Array<T>>>`

### frequency
- **Current**: `(array: Array<T>) => Map<T, number>`
- **Returns**: `Map<T, number>`
- **Description**: Counts occurrences of each element
- **Target**: `(array: ReadonlyArray<T>) => Result<ArrayError, Map<T, number>>`

### findDuplicates
- **Current**: `(array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: `Array<T>` (empty array if not array)
- **Description**: Finds elements that appear more than once
- **Target**: `(array: ReadonlyArray<T>) => Result<ArrayError, Array<T>>`

### zip
- **Current**: `(array2: ReadonlyArray<U> | null | undefined) => (array1: ReadonlyArray<T> | null | undefined) => Array<[T, U]>`
- **Returns**: `Array<[T, U]>` (empty array if either array nullish or empty)
- **Description**: Combines two arrays into pairs
- **Target**: `(array2: ReadonlyArray<U>) => (array1: ReadonlyArray<T>) => Result<ArrayError, Array<[T, U]>>`

### unzip
- **Current**: `(pairs: ReadonlyArray<readonly [T, U]> | null | undefined) => [Array<T>, Array<U>]`
- **Returns**: `[Array<T>, Array<U>]` (empty tuple if nullish or empty)
- **Description**: Separates array of pairs into two arrays
- **Target**: `(pairs: ReadonlyArray<readonly [T, U]>) => Result<ArrayError, [Array<T>, Array<U>]>`

### transpose
- **Current**: `(matrix: ReadonlyArray<ReadonlyArray<T>> | null | undefined) => Array<Array<T | undefined>>`
- **Returns**: `Array<Array<T | undefined>>` (empty array if nullish or empty)
- **Description**: Transposes a 2D array
- **Target**: `(matrix: ReadonlyArray<ReadonlyArray<T>>) => Result<ArrayError, Array<Array<T | undefined>>>`

---

## Migration Notes

Array partitioning functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when partitioning succeeds with valid array input
2. Return `error(ArrayError)` when operation fails, with descriptive error messages
3. Maintain currying for all multi-parameter functions
4. Preserve functional purity and immutability
5. Replace empty array returns with explicit error values where appropriate
6. Replace null/undefined handling with explicit error values

## Special Considerations

### Return Value Patterns

#### Functions Returning Empty Arrays
Most partitioning functions return empty arrays on invalid input:
- **partition**, **partitionBy**, **chunk**, **splitEvery**, **groupWith**, **span**, **takeWhile**, **takeLastWhile**, **dropWhile**, **aperture**, **sliding**, **slidingWithStep**, **pairwise**, **dropRepeats**, **dropRepeatsWith**, **nub**, **nubBy**, **findDuplicates**, **zip**
- Should return `error(ArrayError)` for null/undefined input in monadic form
- Should return `ok([])` for valid but empty arrays where appropriate

#### Functions Returning Empty Objects
- **groupBy**, **countBy**, **indexBy** return empty objects (`{}` or `Object.create(null)`) on invalid input
- Should return `error(ArrayError)` for null/undefined input in monadic form
- Should return `ok({})` for valid but empty arrays

#### Functions Returning Special Structures
- **partition**, **span**, **unzip** return tuples `[Array<T>, Array<T>]`
- **subsequences** returns `[[]]` (array containing empty array) for nullish input
- **transpose** returns `Array<Array<T | undefined>>` with undefined for missing elements

### Grouping and Classification Functions

#### partition
- Splits array into two groups: those that pass predicate and those that fail
- Returns tuple `[pass, fail]`
- Returns `[[], []]` for null/undefined input
- Uses reduce with tuple accumulator

#### partitionBy
- Groups consecutive elements with same predicate result
- Different from **groupBy** - only consecutive elements with same key are grouped
- Uses reduce with key tracking
- Returns empty array for null/undefined or empty input

#### groupBy
- Groups all elements by key function (not just consecutive)
- Returns Record<string, Array<T>>
- Key is converted to string
- Uses Object.create(null) for prototype-less object

#### groupWith
- Groups consecutive elements by binary predicate
- Similar to **partitionBy** but uses comparator between adjacent elements
- Mutates lastGroup array (violation of immutability - needs fixing)
- Returns empty array for null/undefined or empty input

#### countBy
- Counts occurrences of elements grouped by function
- Returns Record<K, number> with counts
- Uses Object.create(null)
- Skips nullish keys

#### indexBy
- Creates lookup object by key function
- Later occurrences overwrite earlier ones (last wins)
- Returns Record<K, T>
- Skips nullish keys

### Chunking Functions

#### chunk
- Validates size is positive integer
- Uses recursive helper **chunkRecursive**
- Returns empty array for invalid size or empty input
- Depends on: `isNotEmpty`, `isPositive`, `isInteger`

#### splitEvery
- Similar to **chunk** but different implementation
- Uses recursion with slice
- Returns empty array if size <= 0 or array.length === 0
- More concise than **chunk**

### Sliding Window Functions

#### aperture
- Creates sliding windows of fixed width with step=1
- Returns empty array if width <= 0 or width > array.length
- Uses Array.from with functional approach
- Window slides by 1 position each time

#### sliding
- Configurable window size and step
- Default step is 1
- Validates size and step are positive integers
- Uses recursive helper
- Returns empty array if array.length < size

#### slidingWithStep
- Not curried (takes both parameters at once)
- Should be refactored to curry: `(size) => (step) => (array)`
- Handles infinite step specially
- Uses recursion

### Deduplication Functions

#### dropRepeats
- Removes only consecutive duplicates
- Uses SameValueZero equality (default JavaScript equality)
- Depends on helper **_dropRepeatsReducer**
- Special case: length 1 returns copy of array

#### dropRepeatsWith
- Removes consecutive duplicates with custom comparator
- Curried version of **dropRepeats**
- Uses same helper **_dropRepeatsReducer** with comparator parameter
- Special case: length 1 returns copy of array

#### nub
- Removes all duplicates (not just consecutive)
- Uses Set for O(n) complexity
- Alias for unique functionality
- Uses SameValueZero equality

#### nubBy
- Removes all duplicates with custom equality function
- O(n²) complexity (checks each element against accumulated results)
- Uses recursion to build result
- More expensive than **nub** but allows custom equality

### Pairing and Zipping Functions

#### pairwise
- Creates pairs of adjacent elements
- Returns empty array if length < 2
- Uses Array.from with functional approach
- Results in array of length n-1 for input of length n

#### zip
- Combines two arrays into pairs
- Length of result is min(array1.length, array2.length)
- Returns empty array if either input is nullish or empty
- Uses recursion to build pairs

#### unzip
- Opposite of **zip**: separates pairs into two arrays
- Skips invalid pairs (not arrays or length < 2)
- Returns `[[], []]` for nullish or empty input
- Uses recursion with accumulators

#### transpose
- Transposes matrix (2D array)
- Handles ragged arrays (different row lengths)
- Uses undefined for missing elements
- Returns `Array<Array<T | undefined>>`
- Uses Array.from with functional approach

### Special Generation Functions

#### subsequences
- Generates all 2^n subsequences of array
- Includes empty subsequence
- Uses recursion with reduce
- For each element, creates two versions: with and without element
- Exponential time complexity O(2^n)

#### frequency
- Counts occurrences using Map
- Returns Map<T, number>
- Uses native reduce (should migrate to functional reduce)
- Uses nullish coalescing `??`

#### findDuplicates
- Finds elements appearing more than once
- Returns deduplicated list of duplicates
- Sorted by first occurrence index
- Uses Map for tracking seen elements
- Complex reducer **_findDuplicatesReducer**
- Uses Set for processedDuplicates

### Take/Drop Pattern

#### takeWhile
- Takes elements from start while predicate is true
- Stops at first element where predicate is false
- Returns all elements if predicate never fails
- Returns empty array if predicate fails immediately

#### takeLastWhile
- Takes elements from end while predicate is true
- Scans backwards to find breakpoint
- Uses recursion to find breakpoint
- Returns elements after breakpoint

#### dropWhile
- Drops elements from start while predicate is true
- Keeps remaining elements after predicate fails
- Opposite of **takeWhile**
- Depends on: `not`, `isArray`, `isEqual`, `findIndex`, `slice`

#### span
- Combines **takeWhile** and **dropWhile** into single operation
- Returns tuple: `[takeWhile(pred), dropWhile(pred)]`
- More efficient than calling both separately
- Returns `[[], []]` for nullish or empty input

### Interspersing Functions

#### init
- Returns all but last element (documented here but more of an access function)
- Uses **dropLast(1)**
- Returns empty array for nullish input
- [INFERRED] Description from implementation

#### interleave
- Alternates elements from multiple arrays
- Filters out null/undefined arrays
- Uses variadic parameters (`...arrays`)
- Continues until longest array is exhausted
- Uses Array.from and filter/map
- [INFERRED] Description from implementation

#### intersperse
- Inserts separator between elements
- Returns copy for single element
- Uses flatMap
- Separator inserted between every adjacent pair
- [INFERRED] Description from implementation

---

## Implementation Dependencies

When planning migration, consider these dependency chains:

### Validation Dependencies
- Most functions depend on `isNullish` from validation
- **chunk** depends on `isNotEmpty`, `isPositive`, `isInteger`
- **dropWhile** depends on `isArray`, `isEqual`
- **countBy** depends on `isArray`, `isNotNullish`
- **groupWith** uses native `Array.isArray`

### Array Operation Dependencies
- **dropWhile** depends on `findIndex`, `slice`
- **takeWhile**, **takeLastWhile**, **span** depend on `not`
- **countBy** depends on `reduce`
- **findDuplicates** depends on `reduce`, `sort`, `map`
- **init** depends on `dropLast`
- **interleave** depends on `not`

### Helper Function Dependencies
- **chunk** has helper: **chunkRecursive**
- **dropRepeats**, **dropRepeatsWith** share helper: **_dropRepeatsReducer**
- **findDuplicates** has helper: **_findDuplicatesReducer**
- **sliding** uses recursive helper `slideRecursive`
- **slidingWithStep** uses recursive helper `buildWindows`

### Refactoring Requirements

#### Functions with Mutation Issues
- **groupWith**: Mutates lastGroup array with `push` (lines 21, 23)
- Should use spread operator instead: `[...lastGroup, curr]` and `acc.slice(0, -1).concat([[...lastGroup, curr]])`

#### Functions with Native Array Methods
- **frequency**: Uses native `Array.prototype.reduce`
- Should migrate to functional `reduce`

#### Functions Not Curried
- **slidingWithStep**: Takes two parameters at once `(size, step)`
- Should be refactored to: `(size) => (step) => (array)`

#### Functions Using let/Loops
None of the partitioning functions use `for` or `while` loops, but several use recursion which is preferred.

---

## Notes

### Missing Standard Partitioning Functions
Consider implementing these during migration:
- **breakWhen**: Split at first element matching predicate (different from **span**)
- **splitAt**: Split at specific index
- **splitWhen**: Split at all elements matching predicate (multiple splits)
- **partitionMap**: Partition with transformation (like **partition** + **map**)
- **tails**: All suffixes of array
- **inits**: All prefixes of array

### Relationship to Other Categories
- **init** is more of an array access function (could be in ARRAY_ACCESS category)
- **interleave**, **intersperse** are more manipulation/combination functions
- **frequency**, **countBy** have overlap with statistics functions
- **zip**, **unzip**, **transpose** have overlap with matrix/transformation functions

### Performance Considerations
- **subsequences**: O(2^n) time and space - exponential growth
- **nubBy**: O(n²) complexity due to nested some/filter
- **nub**: O(n) using Set
- **findDuplicates**: O(n log n) due to sorting step

### Testing Considerations
When migrating, ensure comprehensive tests for:
- Empty arrays
- Single element arrays
- Null/undefined inputs
- Invalid parameters (negative sizes, zero steps, etc.)
- Ragged arrays (for **transpose**)
- Custom equality/comparator functions
- Edge cases (all elements match predicate, none match, etc.)
- Mutation safety (verify no arrays are mutated)
