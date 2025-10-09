# Object - Utility Functions

**Location**: `src/vanilla/object/`
**Functions**: 15
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### clone

- **Current**: `<T extends Value>(obj: T) => T`
- **Returns**: Deep clone of the object
- **Description**: Creates a deep clone of an object, handling circular references, Date, RegExp, Map, Set, arrays, and nested objects
- **Target**: `<T extends Value>(obj: T) => Result<ValidationError, T>`

### fromEntries

- **Current**: `<K extends string | number | symbol, V extends Value>(entries: Iterable<readonly [K, V]> | null | undefined) => Record<K, V>`
- **Returns**: Object constructed from entries
- **Description**: Creates an object from an iterable of [key, value] pairs (inverse of entries/toPairs)
- **Target**: `<K extends string | number | symbol, V extends Value>(entries: Iterable<readonly [K, V]> | null | undefined) => Result<ValidationError, Record<K, V>>`

### toPairs

- **Current**: `<T extends Record<string | symbol, Value>>(obj: T) => Array<[string | symbol, Value]>`
- **Returns**: Array of [key, value] pairs
- **Description**: Returns array of own enumerable [key, value] pairs (includes both string and symbol keys)
- **Target**: `<T extends Record<string | symbol, Value>>(obj: T) => Result<ValidationError, Array<[string | symbol, Value]>>`

### toPairsIn

- **Current**: `<T extends Record<string | symbol, Value>>(obj: T) => Array<[string | symbol, Value]>`
- **Returns**: Array of [key, value] pairs including inherited
- **Description**: Returns array of enumerable [key, value] pairs including inherited properties (not just own)
- **Target**: `<T extends Record<string | symbol, Value>>(obj: T) => Result<ValidationError, Array<[string | symbol, Value]>>`

### invert

- **Current**: `<T extends Record<string | symbol, Value>>(obj: T) => Record<string, string | symbol>`
- **Returns**: Object with keys and values swapped
- **Description**: Swaps keys and values (values become string keys, original keys become values)
- **Target**: `<T extends Record<string | symbol, Value>>(obj: T) => Result<ValidationError, Record<string, string | symbol>>`

### invertBy

- **Current**: `<R extends Value>(fn: (keys: Array<string | symbol>) => R) => <T extends Record<string | symbol, Value>>(obj: T) => Record<string, R>`
- **Returns**: Curried function returning inverted object with grouped keys
- **Description**: Groups keys by their values and applies a function to each group
- **Target**: `<R extends Value>(fn: (keys: Array<string | symbol>) => R) => <T extends Record<string | symbol, Value>>(obj: T) => Result<ValidationError, Record<string, R>>`

### zipObject

- **Current**: `<K extends string | symbol, V extends Value>(keys: Array<K>) => (values: Array<V>) => Record<K, V>`
- **Returns**: Curried function returning object from separate keys and values arrays
- **Description**: Creates an object from two arrays (keys and values), zipping them together (uses minimum length)
- **Target**: `<K extends string | symbol, V extends Value>(keys: Array<K>) => (values: Array<V>) => Result<ValidationError, Record<K, V>>`

### objOf (`objectOf`)

- **Current**: `<K extends string | symbol, V extends Value>(key: K) => (value: V) => Record<K, V>`
- **Returns**: Curried function returning single-property object
- **Description**: Creates an object with a single key-value pair
- **Target**: `<K extends string | symbol, V extends Value>(key: K) => (value: V) => Result<ValidationError, Record<K, V>>`

### isEmpty

- **Current**: `<T extends object>(obj: T) => boolean`
- **Returns**: Boolean indicating if object is empty
- **Description**: Checks if an object is empty (has no own enumerable properties)
- **Target**: `<T extends object>(obj: T) => Result<ValidationError, boolean>`

### isNotEmpty

- **Current**: `<T extends object>(obj: T) => boolean`
- **Returns**: Boolean indicating if object is not empty
- **Description**: Checks if an object is not empty (has at least one own enumerable property)
- **Target**: `<T extends object>(obj: T) => Result<ValidationError, boolean>`

### toMap

- **Current**: `<T extends Record<string, unknown>>(obj: T) => Map<string, T[keyof T]>`
- **Returns**: Map constructed from object entries
- **Description**: Converts an object to a Map using its entries
- **Target**: `<T extends Record<string, unknown>>(obj: T) => Result<ValidationError, Map<string, T[keyof T]>>`

### frequency

- **Current**: `<T>(obj: Record<string, T>) => Map<T, number>`
- **Returns**: Map of value frequencies
- **Description**: Counts the frequency of each value in an object, returning a Map of value to count
- **Target**: `<T>(obj: Record<string, T>) => Result<ValidationError, Map<T, number>>`

### accumulate

- **Current**: `<T extends Record<string, unknown>>(accumulators: {[K in keyof T]: (accumulated: T[K], value: T[K], index: number) => T[K]}) => (sources: ReadonlyArray<Partial<T>>) => T`
- **Returns**: Curried function returning accumulated object
- **Description**: Accumulates values from multiple sources using custom accumulator functions for each property
- **Target**: `<T extends Record<string, unknown>>(accumulators: {[K in keyof T]: (accumulated: T[K], value: T[K], index: number) => T[K]}) => (sources: ReadonlyArray<Partial<T>>) => Result<ValidationError, T>`

### partitionBy

- **Current**: `<K extends string, V>(predicate: (entry: [K, V]) => boolean) => (obj: Record<K, V>) => [Record<K, V>, Record<K, V>]`
- **Returns**: Curried function returning tuple of two objects (matching and non-matching)
- **Description**: Partitions an object into two objects based on a predicate applied to [key, value] entries
- **Target**: `<K extends string, V>(predicate: (entry: [K, V]) => boolean) => (obj: Record<K, V>) => Result<ValidationError, [Record<K, V>, Record<K, V>]>`

### project

- **Current**: `<T extends Record<string | symbol, Value>, K extends keyof T>(keys: Array<K>) => (array: Array<T>) => Array<Pick<T, K>>`
- **Returns**: Curried function returning array of projected objects
- **Description**: Projects specific properties from an array of objects (applies pick to each element)
- **Target**: `<T extends Record<string | symbol, Value>, K extends keyof T>(keys: Array<K>) => (array: Array<T>) => Result<ValidationError, Array<Pick<T, K>>>`

### transform

- **Current**: `<S extends Record<string, (obj: Record<string, unknown>) => Value>>(spec: S) => <T extends Record<string | symbol, Value>>(obj: T) => {[K in keyof S]: ReturnType<S[K]>}`
- **Returns**: Curried function returning transformed object
- **Description**: Transforms an object according to a specification of transformation functions
- **Target**: `<S extends Record<string, (obj: Record<string, unknown>) => Value>>(spec: S) => <T extends Record<string | symbol, Value>>(obj: T) => Result<ValidationError, {[K in keyof S]: ReturnType<S[K]>}>`

### xform (`transformAll`?)

- **Current**: `<T extends Record<string | symbol, unknown>>(transformer: (obj: Record<string | symbol, unknown>) => Record<string | symbol, unknown>) => (obj: T) => unknown`
- **Returns**: Curried function returning recursively transformed object
- **Description**: Recursively applies a transformation function to an object and all nested objects
- **Target**: `<T extends Record<string | symbol, unknown>>(transformer: (obj: Record<string | symbol, unknown>) => Record<string | symbol, unknown>) => (obj: T) => Result<ValidationError, unknown>`

### whereEq (`whereEqual`)

- **Current**: `<S extends Record<string, Value>>(spec: S) => <T extends Record<string | symbol, Value>>(obj: T) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Tests whether an object has equal values (strict equality) for all properties specified in a spec object
- **Target**: `<S extends Record<string, Value>>(spec: S) => <T extends Record<string | symbol, Value>>(obj: T) => Result<ValidationError, boolean>`

### without

- **Current**: Alias of `omit`
- **Returns**: Same as omit
- **Description**: Creates a new object excluding the specified keys (alias for omit)
- **Target**: Same as omit

### lensProp (`lensProperty`)

- **Current**: `<T extends Record<string | symbol, Value>, K extends keyof T>(prop: K) => Lens<T, T[K]>`
- **Returns**: Lens focused on a property
- **Description**: Creates a lens focused on a specific property of an object
- **Target**: `<T extends Record<string | symbol, Value>, K extends keyof T>(prop: K) => Result<ValidationError, Lens<T, T[K]>>`

### lensIndex

- **Current**: `<T>(index: number) => Lens<Array<T>, T>`
- **Returns**: Lens focused on an array index
- **Description**: Creates a lens focused on a specific index in an array (supports negative indices)
- **Target**: `<T>(index: number) => Result<ValidationError, Lens<Array<T>, T>>`

---

## Migration Notes

Utility functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(result)` when operation succeeds
2. Return `error(ValidationError)` when operation fails (e.g., invalid input, type errors)
3. Maintain currying for all multi-parameter functions
4. Preserve type safety while adding error context
5. Handle edge cases gracefully with descriptive errors

## Special Considerations

### Conversion Functions

- **fromEntries**: Converts [key, value] pairs to object (inverse of entries/toPairs)
- **toPairs**: Converts object to [key, value] pairs (own properties only)
- **toPairsIn**: Includes inherited properties (traverses prototype chain)
- **toMap**: Converts object to Map data structure
- **zipObject**: Combines separate keys and values arrays into object

### Inversion Functions

- **invert**: Simple key-value swap (values must be unique to avoid conflicts)
- **invertBy**: Groups multiple keys by their values, applies function to key groups
- Both convert all values to string keys (since object keys must be strings/symbols)

### Frequency and Accumulation

- **frequency**: Counts occurrences of each value in object
- **accumulate**: Custom reduction across multiple source objects
- Both return Map rather than plain object for flexibility

### Cloning and Copying

- **clone**: Deep clone with circular reference handling
- Handles special types: Date, RegExp, Map, Set
- Preserves prototypes and property descriptors (including getters/setters)
- Uses WeakMap for cycle detection

### Testing and Validation

- **isEmpty**: Checks if object has no own enumerable properties
- **isNotEmpty**: Inverse of isEmpty
- **whereEq**: Tests equality of multiple properties (strict equality)
- **partitionBy**: Splits object into two based on predicate

### Transformation Utilities

- **transform**: Applies spec of transformations to create new object structure
- **xform**: Recursively applies transformer to nested objects
- **project**: Batch pick operation on array of objects
- **objOf**: Creates single-property object (useful for function composition)

### Lens Constructors

- **lensProp**: Focuses on object property
- **lensIndex**: Focuses on array index (handles negative indices)
- **lensPath**: (in access) Focuses on nested path
- All return Lens<S, A> type for composition

### Type Safety

- **zipObject** enforces minimum length to avoid partial results
- **fromEntries** handles invalid entries gracefully (skips them)
- **clone** preserves type through generic constraint
- **invert** changes key type to string (values become keys)
- **transform** maps return types via ReturnType utility

### Edge Cases

- **toPairsIn** recursively traverses prototype chain (can be expensive)
- **invert** has key conflicts if values aren't unique (last wins)
- **invertBy** handles conflicts by grouping keys
- **zipObject** truncates to minimum length of keys/values
- **lensIndex** extends array if index out of bounds

### Functional Patterns

- Most functions are curried for partial application
- **accumulate** uses custom reducer for each property
- **partitionBy** returns tuple for destructuring
- **transform** and **xform** enable spec-based transformations
- Lenses enable compositional property access/updates

---

## Implementation Dependencies

Many utility functions depend on other object and validation utilities:

- **clone**: depends on `isNullish`
- **fromEntries**: depends on `isNullish`, `isSymbol`
- **isEmpty**, **isNotEmpty**: depend on `isNullish`, `isPlainObject`, `keys`, `length`
- **lensProp**, **lensIndex**, **lensPath**: depend on `lens`
- **project**: depends on `pick`
- **without**: is an alias of `omit`
- **whereEq**: depends on `isEmpty`
- **xform**: depends on `isNull`, `isUndefined`
- **toPairsIn**: recursively traverses prototypes

These dependencies should be considered when planning migration order.

## Notes on Special Functions

### accumulate

- Takes a specification object mapping keys to accumulator functions
- Each accumulator receives: (accumulated, newValue, index)
- Processes array of partial objects sequentially
- Useful for custom aggregation logic per property

### transform vs xform

- **transform**: Applies spec of functions to create new object shape (non-recursive)
- **xform**: Recursively applies single transformer to nested structure
- Both enable spec-driven transformations but with different patterns

### partitionBy

- Returns tuple `[matching, nonMatching]`
- Predicate receives `[key, value]` entry (not just value)
- Useful for separating valid/invalid properties

### project

- Array operation (not single object)
- Equivalent to `map(pick(keys))` but optimized
- Useful for extracting consistent shape from heterogeneous objects
