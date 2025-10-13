# Array - Transformation Functions

**Location**: `src/array/`
**Functions**: 30
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### map

- **Current**: `<T, U>(fn: (element: T, index: number, array: ReadonlyArray<T>) => U) => (array: ReadonlyArray<T> | null | undefined) => Array<U>`
- **Returns**: New array with transformed elements
- **Description**: Transforms each element using a function
- **Target**: `<T, U>(fn: (element: T, index: number, array: ReadonlyArray<T>) => Result<E, U>) => (array: ReadonlyArray<T>) => Result<E, Array<U>>`

### filter

- **Current**: `<T>(predicate: (item: T) => boolean) => (array: Array<T>) => Array<T>`
- **Returns**: New array with elements satisfying predicate
- **Description**: Filters elements that satisfy a predicate
- **Target**: `<T>(predicate: (item: T) => boolean) => (array: ReadonlyArray<T>) => Result<E, Array<T>>`

### reduce

- **Current**: `<T, U>(fn: (acc: U, item: T, index: number) => U) => (initial: U) => (array: ReadonlyArray<T> | null | undefined) => U`
- **Returns**: Single accumulated value
- **Description**: Reduces array to a single value
- **Target**: `<T, U>(fn: (acc: U, item: T, index: number) => Result<E, U>) => (initial: U) => (array: ReadonlyArray<T>) => Result<E, U>`

### reduceRight

- **Current**: `<T, U>(fn: (accumulator: U, element: T, index: number, array: ReadonlyArray<T>) => U) => (initial: U) => (array: ReadonlyArray<T> | null | undefined) => U`
- **Returns**: Single accumulated value from right to left
- **Description**: Reduces array from right to left
- **Target**: `<T, U>(fn: (accumulator: U, element: T, index: number, array: ReadonlyArray<T>) => Result<E, U>) => (initial: U) => (array: ReadonlyArray<T>) => Result<E, U>`

### reduceWhile

- **Current**: `<T, U>(predicate: (accumulator: U, element: T, index: number, array: ReadonlyArray<T>) => boolean) => (reducer: (accumulator: U, element: T, index: number, array: ReadonlyArray<T>) => U) => (initial: U) => (array: ReadonlyArray<T> | null | undefined) => U`
- **Returns**: Accumulated value until predicate fails
- **Description**: Reduces while predicate is true
- **Target**: `<T, U>(predicate: (accumulator: U, element: T, index: number, array: ReadonlyArray<T>) => boolean) => (reducer: (accumulator: U, element: T, index: number, array: ReadonlyArray<T>) => Result<E, U>) => (initial: U) => (array: ReadonlyArray<T>) => Result<E, U>`

### flatMap

- **Current**: `<T, U>(fn: (item: T, index: number, array: Array<T>) => U | ReadonlyArray<U>) => (array: Array<T>) => Array<U>`
- **Returns**: Flattened array after mapping
- **Description**: Maps and flattens in a single pass
- **Target**: `<T, U>(fn: (item: T, index: number, array: ReadonlyArray<T>) => Result<E, U | ReadonlyArray<U>>) => (array: ReadonlyArray<T>) => Result<E, Array<U>>`

### flatten

- **Current**: `<T, D extends number = 1>(depth: D = 1) => (array: ReadonlyArray<T> | null | undefined) => Array<T extends ReadonlyArray<infer U> ? U : T>`
- **Returns**: Flattened array to specified depth
- **Description**: Flattens nested arrays to specified depth
- **Target**: `<T, D extends number = 1>(depth: D = 1) => (array: ReadonlyArray<T>) => Result<E, Array<T extends ReadonlyArray<infer U> ? U : T>>`

### scan

- **Current**: `<T, U>(fn: (acc: U, item: T, index?: number) => U) => (initial: U) => (array: ReadonlyArray<T> | null | undefined) => Array<U>`
- **Returns**: Array of all intermediate accumulator values
- **Description**: Returns all intermediate accumulator values
- **Target**: `<T, U>(fn: (acc: U, item: T, index?: number) => Result<E, U>) => (initial: U) => (array: ReadonlyArray<T>) => Result<E, Array<U>>`

### compact

- **Current**: `<T>(array: Array<T | null | undefined>) => Array<T>`
- **Returns**: Array with undefined/null removed
- **Description**: Removes undefined values from an array
- **Target**: `<T>(array: ReadonlyArray<T | null | undefined>) => Result<E, Array<T>>`

### reject

- **Current**: `<T>(predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array excluding elements matching predicate
- **Description**: Removes elements that satisfy predicate
- **Target**: `<T>(predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T>) => Result<E, Array<T>>`

### pluck

- **Current**: `<T, K extends keyof T>(key: K) => (array: ReadonlyArray<T> | null | undefined) => Array<T[K] | null>`
- **Returns**: Array of property values
- **Description**: Extracts property values from objects
- **Target**: `<T, K extends keyof T>(key: K) => (array: ReadonlyArray<T>) => Result<E, Array<T[K]>>`

### transpose

- **Current**: `<T>(matrix: ReadonlyArray<ReadonlyArray<T>> | null | undefined) => Array<Array<T | undefined>>`
- **Returns**: Transposed 2D array
- **Description**: Transposes a 2D array
- **Target**: `<T>(matrix: ReadonlyArray<ReadonlyArray<T>>) => Result<E, Array<Array<T>>>`

### partition

- **Current**: `<T>(predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T> | null | undefined) => [Array<T>, Array<T>]`
- **Returns**: Tuple of passing and failing elements
- **Description**: Splits array by predicate into two groups
- **Target**: `<T>(predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean) => (array: ReadonlyArray<T>) => Result<E, [Array<T>, Array<T>]>`

### partitionBy

- **Current**: `<T>(predicate: (value: T) => unknown) => (array: ReadonlyArray<T> | null | undefined) => Array<Array<T>>`
- **Returns**: Array of consecutive groups
- **Description**: Groups consecutive elements with same predicate result
- **Target**: `<T>(predicate: (value: T) => unknown) => (array: ReadonlyArray<T>) => Result<E, Array<Array<T>>>`

### mapAccum (should be `mapWithAccumulator` with alias)

- **Current**: `<T, U, V>(fn: (accumulator: U, element: T) => [U, V]) => (initial: U) => (array: ReadonlyArray<T> | null | undefined) => [U, Array<V>]`
- **Returns**: Tuple of final accumulator and mapped array
- **Description**: Maps with an accumulator from left to right
- **Target**: `<T, U, V>(fn: (accumulator: U, element: T) => Result<E, [U, V]>) => (initial: U) => (array: ReadonlyArray<T>) => Result<E, [U, Array<V>]>`

### mapAccumRight (should be `mapWithAccumulatorFromRight` with alias)

- **Current**: `<T, U, V>(fn: (accumulator: U, element: T) => [U, V]) => (initial: U) => (array: ReadonlyArray<T> | null | undefined) => [U, Array<V>]`
- **Returns**: Tuple of final accumulator and mapped array from right
- **Description**: Maps with an accumulator from right to left
- **Target**: `<T, U, V>(fn: (accumulator: U, element: T) => Result<E, [U, V]>) => (initial: U) => (array: ReadonlyArray<T>) => Result<E, [U, Array<V>]>`

### zip

- **Current**: `<T, U>(array2: ReadonlyArray<U> | null | undefined) => (array1: ReadonlyArray<T> | null | undefined) => Array<[T, U]>`
- **Returns**: Array of tuples pairing elements
- **Description**: Combines two arrays into pairs
- **Target**: `<T, U>(array2: ReadonlyArray<U>) => (array1: ReadonlyArray<T>) => Result<E, Array<[T, U]>>`

### zipWith

- **Current**: `<T, U, V>(fn: (a: T, b: U) => V) => (array1: ReadonlyArray<T> | null | undefined) => (array2: ReadonlyArray<U> | null | undefined) => Array<V>`
- **Returns**: Array combining elements with function
- **Description**: Combines arrays using a function
- **Target**: `<T, U, V>(fn: (a: T, b: U) => Result<E, V>) => (array1: ReadonlyArray<T>) => (array2: ReadonlyArray<U>) => Result<E, Array<V>>`

### zipAll

- **Current**: `<T, U>(array2: ReadonlyArray<U> | null | undefined) => (array1: ReadonlyArray<T> | null | undefined) => Array<[T | undefined, U | undefined]>`
- **Returns**: Array of tuples with undefined padding
- **Description**: Zips arrays filling missing with undefined
- **Target**: `<T, U>(array2: ReadonlyArray<U>) => (array1: ReadonlyArray<T>) => Result<E, Array<[T | undefined, U | undefined]>>`

### unzip

- **Current**: `<T, U>(pairs: ReadonlyArray<readonly [T, U]> | null | undefined) => [Array<T>, Array<U>]`
- **Returns**: Tuple of two arrays from pairs
- **Description**: Separates array of pairs into two arrays
- **Target**: `<T, U>(pairs: ReadonlyArray<readonly [T, U]>) => Result<E, [Array<T>, Array<U>]>`

### groupBy

- **Current**: `<T, K extends string | number>(keyFn: (element: T) => K) => (array: ReadonlyArray<T> | null | undefined) => Record<string, Array<T>>`
- **Returns**: Object with grouped arrays
- **Description**: Groups elements by a key function
- **Target**: `<T, K extends string | number>(keyFn: (element: T) => K) => (array: ReadonlyArray<T>) => Result<E, Record<string, Array<T>>>`

### groupWith

- **Current**: `<T>(predicate: (a: T, b: T) => boolean) => (array: ReadonlyArray<T> | null | undefined) => Array<Array<T>>`
- **Returns**: Array of consecutive groups
- **Description**: Groups consecutive elements by predicate
- **Target**: `<T>(predicate: (a: T, b: T) => boolean) => (array: ReadonlyArray<T>) => Result<E, Array<Array<T>>>`

### chunk

- **Current**: `<T>(size: number) => (array?: ReadonlyArray<T> | null) => Array<Array<T>>`
- **Returns**: Array of fixed-size chunks
- **Description**: Splits an array into fixed-size chunks
- **Target**: `<T>(size: number) => (array: ReadonlyArray<T>) => Result<E, Array<Array<T>>>`

### reverse

- **Current**: `<T>(array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Reversed array
- **Description**: Reverses array order
- **Target**: `<T>(array: ReadonlyArray<T>) => Result<E, Array<T>>`

### sort

- **Current**: `<T>(compareFn?: (a: T, b: T) => number) => (array: Array<T>) => Array<T>`
- **Returns**: Sorted array
- **Description**: Sorts array with optional comparator
- **Target**: `<T>(compareFn?: (a: T, b: T) => number) => (array: ReadonlyArray<T>) => Result<E, Array<T>>`

### sortBy

- **Current**: `<T, U>(fn: (value: T) => U) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array sorted by mapped values
- **Description**: Sorts by mapping function result
- **Target**: `<T, U>(fn: (value: T) => U) => (array: ReadonlyArray<T>) => Result<E, Array<T>>`

### sortWith

- **Current**: `<T>(comparators: ReadonlyArray<(a: T, b: T) => number>) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array sorted with multiple comparators
- **Description**: Sorts using multiple comparators
- **Target**: `<T>(comparators: ReadonlyArray<(a: T, b: T) => number>) => (array: ReadonlyArray<T>) => Result<E, Array<T>>`

### unique (alias of nub)

- **Current**: `<T>(array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array with duplicates removed
- **Description**: Removes duplicate elements
- **Target**: `<T>(array: ReadonlyArray<T>) => Result<E, Array<T>>`

### nub

- **Current**: `<T>(array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array with duplicates removed
- **Description**: Removes duplicates (alias for unique)
- **Target**: `<T>(array: ReadonlyArray<T>) => Result<E, Array<T>>`

### nubBy

- **Current**: `<T>(equalityFn: (a: T, b: T) => boolean) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array with duplicates removed by custom equality
- **Description**: Removes duplicates by custom equality
- **Target**: `<T>(equalityFn: (a: T, b: T) => boolean) => (array: ReadonlyArray<T>) => Result<E, Array<T>>`

### intersperse

- **Current**: `<T, U>(separator: U) => (array: ReadonlyArray<T> | null | undefined) => Array<T | U>`
- **Returns**: Array with separator between elements
- **Description**: Inserts a separator between elements
- **Target**: `<T, U>(separator: U) => (array: ReadonlyArray<T>) => Result<E, Array<T | U>>`

### interleave

- **Current**: `<T>(...arrays: Array<Array<T> | null | undefined>) => Array<T>`
- **Returns**: Array with alternating elements
- **Description**: Alternates elements from multiple arrays
- **Target**: `<T>(...arrays: Array<ReadonlyArray<T>>) => Result<E, Array<T>>`

### unflatten

- **Current**: `(depths: Array<number>) => <T>(array: Array<T>) => Array<T | Array<unknown>>`
- **Returns**: Reconstructed nested structure
- **Description**: Reconstructs nested arrays from flat structure
- **Target**: `(depths: ReadonlyArray<number>) => <T>(array: ReadonlyArray<T>) => Result<E, Array<T | Array<unknown>>>`

### unfold

- **Current**: `<T, U>(fn: (seed: T) => readonly [U, T] | null) => (seed: T | null | undefined) => Array<U>`
- **Returns**: Array generated from seed
- **Description**: Generates array from seed value
- **Target**: `<T, U>(fn: (seed: T) => Result<E, readonly [U, T] | null>) => (seed: T) => Result<E, Array<U>>`

### dropRepeats

- **Current**: `<T>(array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array with consecutive duplicates removed
- **Description**: Removes consecutive duplicate elements from an array
- **Target**: `<T>(array: ReadonlyArray<T>) => Result<E, Array<T>>`

### dropRepeatsWith

- **Current**: `<T>(comparator: (a: T, b: T) => boolean) => (array: ReadonlyArray<T> | null | undefined) => Array<T>`
- **Returns**: Array with consecutive duplicates removed by custom equality
- **Description**: Removes consecutive duplicates with custom equality
- **Target**: `<T>(comparator: (a: T, b: T) => boolean) => (array: ReadonlyArray<T>) => Result<E, Array<T>>`

### countBy

- **Current**: `<T, K extends string | number | symbol>(fn: (element: T) => K) => (array: ReadonlyArray<T> | null | undefined) => Record<K, number>`
- **Returns**: Object mapping keys to counts
- **Description**: Counts elements by grouping criteria
- **Target**: `<T, K extends string | number | symbol>(fn: (element: T) => K) => (array: ReadonlyArray<T>) => Result<E, Record<K, number>>`

### indexBy

- **Current**: `<T, K extends string | number | symbol>(keyFn: (element: T, index: number, array: ReadonlyArray<T>) => K) => (array: ReadonlyArray<T> | null | undefined) => Record<K, T>`
- **Returns**: Object mapping keys to elements
- **Description**: Indexes elements by a key function
- **Target**: `<T, K extends string | number | symbol>(keyFn: (element: T, index: number, array: ReadonlyArray<T>) => K) => (array: ReadonlyArray<T>) => Result<E, Record<K, T>>`

---

## Migration Notes

Array transformation functions will be converted to Result-returning operations that handle errors gracefully. The monadic versions will:

1. Return `ok(transformedArray)` when transformation succeeds
2. Return `error(TransformationError)` when transformation fails (e.g., mapper function throws, invalid input)
3. Maintain currying for all functions
4. Remove null/undefined handling at function boundaries (assume valid input or fail fast)
5. Support error propagation through transformation chains
6. Preserve immutability and pure function semantics

## Special Considerations

### Arrow Function Syntax

Several functions use arrow syntax and need refactoring to named functions:

- **map** (arrow function)
- **reduceRight** (arrow function)
- **flatMap** (arrow function)
- **flatten** (arrow function)
- **scan** (arrow function)
- **reject** (arrow function)
- **pluck** (arrow function)
- **transpose** (arrow function)
- **partition** (arrow function)
- **mapAccum** (arrow function)
- **mapAccumRight** (arrow function)
- **zip** (arrow function)
- **zipWith** (arrow function)
- **zipAll** (arrow function)
- **unzip** (arrow function)
- **groupBy** (arrow function)
- **groupWith** (arrow function)
- **sort** (arrow function)
- **sortBy** (arrow function)
- **sortWith** (arrow function)
- **nub** (arrow function)
- **nubBy** (arrow function)
- **intersperse** (arrow function)
- **interleave** (arrow function)
- **reduceWhile** (arrow function)
- **unflatten** (arrow function)

### Mutation Concerns

Some functions use internal mutations that need review:

- **groupWith**: Uses `push` mutation in reducer (lines 20, 22)
- **sortWith**: Uses for-of loop which is acceptable but could be refactored
- **unflatten**: Uses `let` and `while` internally

### Map/FlatMap/Filter Transformations

- **map**: Core transformation primitive, should support Result-based mappers
- **filter**: Boolean predicate, straightforward migration
- **flatMap**: Needs to handle nested Result structures
- **compact**: Special case of filter removing null/undefined

### Reduce Operations

- **reduce**: Foundation for many operations, needs error handling
- **reduceRight**: Right-to-left variant
- **reduceWhile**: Conditional reduction with early termination
- **scan**: Produces intermediate values, useful for debugging transformations

### Accumulator-Based Maps

- **mapAccum**: Stateful mapping with accumulator threading
- **mapAccumRight**: Right-to-left stateful mapping
- Both maintain state across transformations

### Grouping and Partitioning

- **partition**: Binary split by predicate
- **partitionBy**: Groups consecutive elements by predicate result
- **groupBy**: Groups all elements by key function
- **groupWith**: Groups consecutive elements by binary predicate
- **countBy**: Aggregates counts by key
- **indexBy**: Creates lookup object by key

### Deduplication

- **nub/unique**: Remove duplicates using SameValueZero equality
- **nubBy**: Custom equality function
- **dropRepeats**: Remove consecutive duplicates only
- **dropRepeatsWith**: Custom equality for consecutive removal

### Zip Operations

- **zip**: Pairs elements at same index
- **zipWith**: Pairs and transforms with function
- **zipAll**: Pads shorter array with undefined
- **unzip**: Reverse of zip, separates pairs

### Sorting

- **sort**: Native comparator-based sort
- **sortBy**: Sort by mapped value (Schwartzian transform)
- **sortWith**: Multiple comparators with priority

### Structure Manipulation

- **flatten**: Reduce nesting depth
- **unflatten**: Reconstruct nesting from flat structure with depth markers
- **transpose**: Matrix transposition
- **chunk**: Split into fixed-size groups
- **reverse**: Reverse order

### Element Insertion

- **intersperse**: Insert separator between all elements
- **interleave**: Alternate elements from multiple arrays

### Generative Operations

- **unfold**: Generate array from seed and function (anamorphism)
- Dual of fold/reduce (catamorphism)

### Null/Undefined Handling

Most functions currently accept `null | undefined` arrays and return empty arrays. In monadic form:

- Input validation should use Result type
- Empty array might be `ok([])` or `error(EmptyArrayError)` depending on context
- **compact** specifically filters out null/undefined, should return `ok(cleanedArray)`

### Performance Considerations

Several functions use recursive implementations:

- **scan**: Recursive accumulation
- **mapAccumRight**: Recursive processing
- **zip/zipWith**: Recursive pair building
- **nubBy**: Recursive deduplication
- **unfold**: Recursive generation

These may need stack depth limits or iterative rewrites for large arrays.

---

## Implementation Dependencies

Array transformation functions have dependencies on:

- **Validation**: `isNullish`, `isNotNullish`, `isArray`, `isInteger`, `isPositive`, `isEqual`
- **Logic**: `not`
- **Other Array Functions**: Many transformations compose simpler operations

Dependencies should be considered when planning migration order. Core transformations (map, filter, reduce) should migrate first.

---

## Related Functions

See also:

- `ARRAY_ACCESS.md` - Element access functions (nth, first, last, head, tail)
- `ARRAY_MANIPULATION.md` - Structural changes (concat, insert, remove, update)
- `ARRAY_QUERY.md` - Search and test functions (find, includes, some, all)
- `ARRAY_GENERATION.md` - Array creation functions (range, repeat, from)
