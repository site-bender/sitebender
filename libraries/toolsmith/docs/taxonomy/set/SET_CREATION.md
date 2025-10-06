# Set - Creation and Transformation Functions

**Location**: `src/vanilla/set/`
**Functions**: 12
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### fromArray
- **Current**: `(array: ReadonlyArray<T> | null | undefined) => Set<T>`
- **Returns**: Set<T> (empty Set on null/undefined/non-array)
- **Description**: [REFACTOR] Creates a Set from an array, automatically deduplicating values; returns empty Set on invalid input
- **Target**: `(array: ReadonlyArray<T>) => Result<SetError, Set<T>>`

### toArray
- **Current**: `(set: Set<T> | null | undefined) => Array<T>`
- **Returns**: Array<T> (empty array on null/undefined/non-Set)
- **Description**: [REFACTOR] Converts a Set to an array using Array.from for optimal performance
- **Target**: `(set: Set<T>) => Result<SetError, Array<T>>`

### clear
- **Current**: `(_set: Set<T> | null | undefined) => Set<T>`
- **Returns**: Set<T> (always returns new empty Set)
- **Description**: [REFACTOR] Returns a new empty Set; input only used for type inference
- **Target**: `(set: Set<T>) => Result<SetError, Set<T>>`

### map
- **Current**: `(fn: (value: T) => U) => (set: Set<T> | null | undefined) => Set<U>`
- **Returns**: Set<U> (empty Set<U> on null/undefined/non-Set)
- **Description**: [REFACTOR] Maps over Set values with function, returning new Set with transformed values; functional with no loops
- **Target**: `(fn: (value: T) => U) => (set: Set<T>) => Result<SetError, Set<U>>`

### filter
- **Current**: `(predicate: (value: T) => boolean) => (set: Set<T> | null | undefined) => Set<T>`
- **Returns**: Set<T> (empty Set on null/undefined/non-Set)
- **Description**: [REFACTOR] Filters Set values by predicate, returning new Set with matching values
- **Target**: `(predicate: (value: T) => boolean) => (set: Set<T>) => Result<SetError, Set<T>>`

### reduce
- **Current**: `(fn: (accumulator: U, value: T) => U) => (initial: U) => (set: Set<T> | null | undefined) => U`
- **Returns**: U (initial value on null/undefined/non-Set)
- **Description**: [REFACTOR] Reduces Set to single value by applying function to accumulator and each element
- **Target**: `(fn: (accumulator: U, value: T) => U) => (initial: U) => (set: Set<T>) => Result<SetError, U>`

### partitionBy
- **Current**: `(predicate: (value: T) => boolean) => (set: Set<T> | null | undefined) => [Set<T>, Set<T>]`
- **Returns**: [Set<T>, Set<T>] (tuple of empty Sets on null/undefined/non-Set)
- **Description**: [REFACTOR] Partitions Set into two Sets based on predicate; first Set contains matches, second contains non-matches; single pass without mutation
- **Target**: `(predicate: (value: T) => boolean) => (set: Set<T>) => Result<SetError, [Set<T>, Set<T>]>`

### interleave
- **Current**: `(...sets: Array<Set<T>>) => Array<T>`
- **Returns**: Array<T> (empty array if no sets provided)
- **Description**: [REFACTOR] Interleaves elements from multiple Sets in round-robin fashion until all Sets are exhausted; uses iterators
- **Target**: `(...sets: Array<Set<T>>) => Result<SetError, Array<T>>`

### sliding
- **Current**: `(windowSize: number) => (set: Set<T> | null | undefined) => Array<Array<T>>`
- **Returns**: Array<Array<T>> (empty array if windowSize ≤ 0 or invalid set or insufficient elements)
- **Description**: [REFACTOR] Creates sliding windows of specified size from Set elements; no mutation; returns empty if set size < windowSize
- **Target**: `(windowSize: number) => (set: Set<T>) => Result<SetError, Array<Array<T>>>`

### frequency
- **Current**: `(set: Set<T>) => Map<T, number>`
- **Returns**: Map<T, number> (each unique element mapped to count of 1)
- **Description**: [REFACTOR] Returns frequency map for Set elements; always maps each element to 1 since Sets contain unique values
- **Target**: `(set: Set<T>) => Result<SetError, Map<T, number>>`

### size
- **Current**: `(set: Set<T> | null | undefined) => number`
- **Returns**: number (0 on null/undefined/non-Set)
- **Description**: [REFACTOR] Returns the number of elements in the Set; returns 0 for invalid input
- **Target**: `(set: Set<T>) => Result<SetError, number>`

### isEmpty
- **Current**: `(set: Set<T> | null | undefined) => boolean`
- **Returns**: boolean (true on null/undefined/non-Set or empty Set)
- **Description**: Checks if a Set is empty (has no elements)
- **Target**: `(set: Set<T>) => Result<SetError, boolean>`

### isNotEmpty
- **Current**: `(set: Set<T>) => boolean`
- **Returns**: boolean (false if not Set instance or size is 0)
- **Description**: Checks if a Set is not empty (has at least one element)
- **Target**: `(set: Set<T>) => Result<SetError, boolean>`

---

## Migration Notes

Set creation and transformation functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when operation succeeds with valid Set input
2. Return `error(SetError)` when operation fails, with descriptive error messages
3. Maintain currying for all multi-parameter functions
4. Preserve immutability (all functions return new Sets, never mutate input)
5. Replace implicit null/undefined handling with explicit error values
6. Maintain functional purity (no loops, pure transformations)

## Special Considerations

### Return Value Patterns

#### Functions Creating New Sets
- **fromArray**: Creates Set from array, returns empty Set on invalid input
- **clear**: Always returns new empty Set regardless of input
- **map**: Transforms Set<T> to Set<U>, returns empty Set<U> on invalid input
- **filter**: Returns subset matching predicate, returns empty Set on invalid input
- **partitionBy**: Returns tuple of two Sets based on predicate

#### Conversion Functions
- **toArray**: Converts Set to Array, preserves insertion order
- **interleave**: Converts multiple Sets to single interleaved Array
- **sliding**: Converts Set to Array of windowed subarrays
- **frequency**: Converts Set to Map<T, number> (always 1 for each element)

#### Query Functions
- **size**: Returns numeric count of elements
- **isEmpty**: Returns boolean for empty check
- **isNotEmpty**: Returns boolean for non-empty check

### Null/Undefined Input Handling

Most functions handle null/undefined/non-Set inputs by returning empty/default values:
- **fromArray**: Returns empty Set
- **toArray**: Returns empty Array
- **clear**: Returns empty Set
- **map**: Returns empty Set<U>
- **filter**: Returns empty Set
- **reduce**: Returns initial value
- **partitionBy**: Returns tuple of two empty Sets
- **size**: Returns 0
- **isEmpty**: Returns true
- **isNotEmpty**: Requires valid Set instance (stricter validation)

### Arrow Function Syntax

Several functions use arrow syntax and need refactoring to named functions:
- **clear** (uses named arrow)
- **map** (uses named arrow)
- **filter** (uses named arrow)
- **reduce** (uses named arrow)
- **partitionBy** (uses named arrow)
- **interleave** (uses named arrow)
- **sliding** (uses named arrow)
- **frequency** (uses named arrow)
- **size** (uses named arrow)

### Functional Purity

All functions maintain immutability:
- **fromArray**: Uses `new Set(array)` constructor
- **map**: Uses `Array.from(set, fn)` for zero-copy transformation
- **filter**: Uses `Array.from(set).filter(predicate)` and wraps in new Set
- **reduce**: Uses `Array.from(set).reduce(fn, initial)`
- **partitionBy**: Uses `reduce` with spread operators to build new Sets
- **clear**: Always creates new empty Set
- **toArray**: Uses `Array.from(set)` for conversion
- **interleave**: Builds new array via iterators, no mutation
- **sliding**: Uses `Array.from` and `slice` for windowing
- **frequency**: Uses `Array.from` and `map` for transformation

### Complex Validation Logic

#### sliding
- Validates windowSize > 0
- Validates set is Set instance
- Returns empty array if array length < windowSize
- Uses `Array.from({ length })` for functional generation

#### partitionBy
- Uses `reduce` over array-converted set
- Builds two new Sets in each iteration using spread operators
- No mutation of input or intermediate values

#### interleave
- Handles variadic arguments (`...sets`)
- Creates iterators for each Set
- Uses `while` loop (needs refactoring to functional approach)
- Returns early if no sets provided

#### frequency
- Simple transformation: each unique element maps to 1
- Uses `Array.from(set).map()` for functional transformation

### Loop Usage

Several functions use loops that need refactoring:
- **interleave**: Uses `while` and `for...of` loops (should use recursive or reduce-based approach)

Note: Many functions internally use `Array.from` followed by native array methods (filter, reduce, map) which is acceptable for performance, but the outer structure should be functional.

---

## Implementation Dependencies

When planning migration, consider these dependency chains:

### Validation Dependencies
- Most functions depend on `isNullish` from validation
- **fromArray** depends on `isArray` check
- **isEmpty** depends on `not` from logic
- All functions validate Set instances with `instanceof Set` check

### Array Operation Dependencies
- **map** uses `Array.from(set, fn)` (zero-allocation transformation)
- **filter** uses `Array.from(set).filter()`
- **reduce** uses `Array.from(set).reduce()`
- **partitionBy** uses `Array.from(set).reduce()`
- **toArray** uses `Array.from(set)`
- **interleave** uses Set iterators
- **sliding** uses `Array.from` with slice
- **frequency** uses `Array.from(set).map()`

### Refactoring Requirements
- Functions with loops need functional rewrites:
  - **interleave** (uses `while` and `for...of` loops)

---

## Notes

### Set Immutability Pattern

All functions follow immutability pattern:
1. Validate input Set
2. Convert to Array for functional operations (when needed)
3. Perform transformation
4. Wrap result in new Set (for Set-returning functions)

This ensures original Sets are never mutated.

### Performance Considerations

Several functions optimize for performance:
- **map**: Uses `Array.from(set, fn)` which applies function during iteration (single pass)
- **filter**: Converts to array, filters, wraps in new Set
- **toArray**: Uses `Array.from` for optimal conversion

### Missing Standard Set Creation Functions

Consider implementing these during migration:
- **singleton**: Creates Set with single element
- **of**: Creates Set from variadic arguments
- **empty**: Returns empty Set (exists as `clear` but could have clearer name)
- **range**: Creates Set from numeric range
- **fromIterable**: Creates Set from any iterable (more general than `fromArray`)

### Testing Considerations

When migrating, ensure comprehensive tests for:
- Null/undefined inputs
- Non-Set inputs
- Empty Sets
- Single-element Sets
- Large Sets (performance)
- Functions with predicates/transformers
- Edge cases (sliding with windowSize > set size, interleave with empty sets)
- Type preservation (map with type transformation)
- Insertion order preservation (Sets maintain insertion order in JavaScript)
