# Map - Operation Functions

**Location**: `src/vanilla/map/`
**Functions**: 36
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### delete

- **Current**: `<K, V>(key: K) => (map: Map<K, V>) => Map<K, V>`
- **Returns**: New Map<K, V> without the key
- **Description**: [NEEDS DESCRIPTION] Removes a key from a map immutably; returns new map with key deleted
- **Target**: `<K, V>(key: K) => (map: Map<K, V>) => Result<MapError, Map<K, V>>`

### deleteAll

- **Current**: `<K, V>(keys: Array<K>) => (map: Map<K, V>) => Map<K, V>`
- **Returns**: New Map<K, V> without the specified keys
- **Description**: [NEEDS DESCRIPTION] Removes multiple keys from a map; uses reduce to iteratively delete keys
- **Target**: `<K, V>(keys: Array<K>) => (map: Map<K, V>) => Result<MapError, Map<K, V>>`

### difference

- **Current**: `<K, V, V2>(subtrahend: Map<K, V2>) => (minuend: Map<K, V>) => Map<K, V>`
- **Returns**: Map<K, V> containing entries from minuend whose keys are not in subtrahend
- **Description**: [NEEDS DESCRIPTION] Returns entries from minuend that are not present in subtrahend (by key)
- **Target**: `<K, V, V2>(subtrahend: Map<K, V2>) => (minuend: Map<K, V>) => Result<MapError, Map<K, V>>`

### differenceWith

- **Current**: `<K, V, K2, V2>(equalsFn: (a: K, b: K2) => boolean) => (subtrahend: Map<K2, V2>) => (minuend: Map<K, V>) => Map<K, V>`
- **Returns**: Map<K, V> containing entries from minuend not matching subtrahend keys via equalsFn
- **Description**: [NEEDS DESCRIPTION] Returns difference between maps using custom equality function for key comparison
- **Target**: `<K, V, K2, V2>(equalsFn: (a: K, b: K2) => boolean) => (subtrahend: Map<K2, V2>) => (minuend: Map<K, V>) => Result<MapError, Map<K, V>>`

### entries

- **Current**: `<K, V>(map: Map<K, V>) => Array<[K, V]>`
- **Returns**: Array of key-value pair tuples
- **Description**: [NEEDS DESCRIPTION] Converts a Map to an array of [key, value] tuples using Array.from
- **Target**: `<K, V>(map: Map<K, V>) => Result<MapError, Array<[K, V]>>`

### filter

- **Current**: `<K, V>(predicate: (value: V, key: K) => boolean) => (map: Map<K, V>) => Map<K, V>`
- **Returns**: Map<K, V> containing only entries that satisfy the predicate
- **Description**: [NEEDS DESCRIPTION] Filters map entries by applying predicate to each value and key pair
- **Target**: `<K, V>(predicate: (value: V, key: K) => boolean) => (map: Map<K, V>) => Result<MapError, Map<K, V>>`

### filterKeys

- **Current**: `<K, V>(predicate: (key: K) => boolean) => (map: Map<K, V>) => Map<K, V>`
- **Returns**: Map<K, V> containing only entries whose keys satisfy the predicate
- **Description**: [NEEDS DESCRIPTION] Filters map entries by applying predicate to each key
- **Target**: `<K, V>(predicate: (key: K) => boolean) => (map: Map<K, V>) => Result<MapError, Map<K, V>>`

### filterValues

- **Current**: `<K, V>(predicate: (value: V) => boolean) => (map: Map<K, V>) => Map<K, V>`
- **Returns**: Map<K, V> containing only entries whose values satisfy the predicate
- **Description**: [NEEDS DESCRIPTION] Filters map entries by applying predicate to each value
- **Target**: `<K, V>(predicate: (value: V) => boolean) => (map: Map<K, V>) => Result<MapError, Map<K, V>>`

### frequency

- **Current**: `<K, V>(map: Map<K, V>) => Map<V, number>`
- **Returns**: Map<V, number> where keys are unique values and values are occurrence counts
- **Description**: [NEEDS DESCRIPTION] Counts frequency of values in a map; returns map of value to count
- **Note**: Uses mutable Map.set internally (violates immutability)
- **Target**: `<K, V>(map: Map<K, V>) => Result<MapError, Map<V, number>>`

### get

- **Current**: `<K, V>(key: K) => (map: Map<K, V>) => V | null`
- **Returns**: V if key exists, null otherwise (converts undefined to null)
- **Description**: [NEEDS DESCRIPTION] Retrieves value for a key; returns null if key doesn't exist or value is undefined
- **Target**: `<K, V>(key: K) => (map: Map<K, V>) => Result<MapError, V>`

### getOr

- **Current**: `<K, V>(defaultValue: V) => (key: K) => (map: Map<K, V>) => V`
- **Returns**: V (value if exists, defaultValue otherwise)
- **Description**: [NEEDS DESCRIPTION] Retrieves value for a key with fallback; returns defaultValue if key doesn't exist
- **Note**: Uses non-null assertion operator (!)
- **Target**: `<K, V>(defaultValue: V) => (key: K) => (map: Map<K, V>) => Result<MapError, V>`

### groupBy

- **Current**: `<K, V, G>(keyFn: (value: V, key: K) => G) => (map: Map<K, V>) => Map<G, Map<K, V>>`
- **Returns**: Map<G, Map<K, V>> where entries are grouped by the result of keyFn
- **Description**: [NEEDS DESCRIPTION] Groups map entries into nested maps based on grouping function
- **Note**: Uses mutable Map.set internally (violates immutability)
- **Target**: `<K, V, G>(keyFn: (value: V, key: K) => G) => (map: Map<K, V>) => Result<MapError, Map<G, Map<K, V>>>`

### has

- **Current**: `<K, V>(key: K) => (map: Map<K, V>) => boolean`
- **Returns**: boolean indicating if key exists in map
- **Description**: [NEEDS DESCRIPTION] Checks if a map contains a specific key
- **Target**: `<K, V>(key: K) => (map: Map<K, V>) => Result<MapError, boolean>`

### interleave

- **Current**: `<K, V>(maps: Array<Map<K, V>>) => Map<K, V>`
- **Returns**: Map<K, V> with entries interleaved from input maps
- **Description**: [NEEDS DESCRIPTION] Interleaves entries from multiple maps by taking one entry from each map in round-robin fashion
- **Note**: Uses named function syntax (not arrow)
- **Target**: `<K, V>(maps: Array<Map<K, V>>) => Result<MapError, Map<K, V>>`

### intersection

- **Current**: `<K, V, V2>(second: Map<K, V2>) => (first: Map<K, V>) => Map<K, V>`
- **Returns**: Map<K, V> containing entries from first whose keys exist in second
- **Description**: [NEEDS DESCRIPTION] Returns entries from first map that have matching keys in second map
- **Target**: `<K, V, V2>(second: Map<K, V2>) => (first: Map<K, V>) => Result<MapError, Map<K, V>>`

### intersectionWith

- **Current**: `<K, V, K2, V2>(equalsFn: (a: K, b: K2) => boolean) => (second: Map<K2, V2>) => (first: Map<K, V>) => Map<K, V>`
- **Returns**: Map<K, V> containing entries from first whose keys match second keys via equalsFn
- **Description**: [NEEDS DESCRIPTION] Returns intersection of maps using custom equality function for key comparison
- **Target**: `<K, V, K2, V2>(equalsFn: (a: K, b: K2) => boolean) => (second: Map<K2, V2>) => (first: Map<K, V>) => Result<MapError, Map<K, V>>`

### isEmpty

- **Current**: `<K, V>(map: Map<K, V>) => boolean`
- **Returns**: boolean (true if map.size === 0)
- **Description**: Checks if a Map is empty (has no key-value pairs)
- **Note**: Has //++ comment (properly documented)
- **Target**: `<K, V>(map: Map<K, V>) => Result<MapError, boolean>`

### isNotEmpty

- **Current**: `<K, V>(map: Map<K, V>) => boolean`
- **Returns**: boolean (true if map instanceof Map and map.size > 0)
- **Description**: Checks if a Map is not empty (has at least one key-value pair)
- **Note**: Has //++ comment (properly documented)
- **Target**: `<K, V>(map: Map<K, V>) => Result<MapError, boolean>`

### keys

- **Current**: `<K, V>(map: Map<K, V>) => Array<K>`
- **Returns**: Array of all keys
- **Description**: [NEEDS DESCRIPTION] Extracts all keys from a map as an array using Array.from
- **Target**: `<K, V>(map: Map<K, V>) => Result<MapError, Array<K>>`

### map (mapValues)

- **Current**: `<K, V, R>(fn: (value: V, key: K) => R) => (map: Map<K, V>) => Map<K, R>`
- **Returns**: Map<K, R> with transformed values
- **Description**: [NEEDS DESCRIPTION] Transforms map values by applying function to each value-key pair
- **Target**: `<K, V, R>(fn: (value: V, key: K) => R) => (map: Map<K, V>) => Result<MapError, Map<K, R>>`

### mapEntries

- **Current**: `<K, V, NK, NV>(fn: (entry: [K, V]) => [NK, NV]) => (map: Map<K, V>) => Map<NK, NV>`
- **Returns**: Map<NK, NV> with transformed entries
- **Description**: [NEEDS DESCRIPTION] Transforms both keys and values by applying function to each [key, value] tuple
- **Target**: `<K, V, NK, NV>(fn: (entry: [K, V]) => [NK, NV]) => (map: Map<K, V>) => Result<MapError, Map<NK, NV>>`

### mapKeys

- **Current**: `<K, V, NK>(fn: (key: K, value: V) => NK) => (map: Map<K, V>) => Map<NK, V>`
- **Returns**: Map<NK, V> with transformed keys
- **Description**: [NEEDS DESCRIPTION] Transforms map keys by applying function to each key-value pair
- **Target**: `<K, V, NK>(fn: (key: K, value: V) => NK) => (map: Map<K, V>) => Result<MapError, Map<NK, V>>`

### merge

- **Current**: `<K, V>(...maps: Array<Map<K, V>>) => Map<K, V>`
- **Returns**: Map<K, V> containing all entries from input maps (later maps overwrite earlier)
- **Description**: [NEEDS DESCRIPTION] Merges multiple maps; later maps overwrite earlier ones for duplicate keys
- **Note**: Uses rest parameters (...maps)
- **Target**: `<K, V>(...maps: Array<Map<K, V>>) => Result<MapError, Map<K, V>>`

### mergeWith

- **Current**: `<K, V>(mergeFn: (existingValue: V, incomingValue: V) => V) => (...maps: Array<Map<K, V>>) => Map<K, V>`
- **Returns**: Map<K, V> with merged entries using custom merge function for conflicts
- **Description**: [NEEDS DESCRIPTION] Merges multiple maps using custom function to resolve value conflicts for duplicate keys
- **Note**: Uses rest parameters and non-null assertion
- **Target**: `<K, V>(mergeFn: (existingValue: V, incomingValue: V) => V) => (...maps: Array<Map<K, V>>) => Result<MapError, Map<K, V>>`

### partition

- **Current**: `<K, V>(predicate: (value: V, key: K) => boolean) => (map: Map<K, V>) => [Map<K, V>, Map<K, V>]`
- **Returns**: Tuple of [passing entries, failing entries]
- **Description**: [NEEDS DESCRIPTION] Splits map into two maps based on predicate; returns [pass, fail] tuple
- **Target**: `<K, V>(predicate: (value: V, key: K) => boolean) => (map: Map<K, V>) => Result<MapError, [Map<K, V>, Map<K, V>]>`

### partitionBy

- **Current**: `<K, V>(predicate: (value: V, key: K) => unknown) => (map: Map<K, V>) => Array<Map<K, V>>`
- **Returns**: Array of Maps grouped by consecutive entries with same predicate result
- **Description**: [NEEDS DESCRIPTION] Partitions map into array of consecutive groups based on predicate result
- **Note**: Uses Array.prototype.reduce with mutable accumulator pattern
- **Target**: `<K, V>(predicate: (value: V, key: K) => unknown) => (map: Map<K, V>) => Result<MapError, Array<Map<K, V>>>`

### reduce

- **Current**: `<K, V, R>(reducer: (accumulator: R, value: V, key: K, map: Map<K, V>) => R) => (initial: R) => (map: Map<K, V>) => R`
- **Returns**: R (accumulated result)
- **Description**: [NEEDS DESCRIPTION] Reduces map to a single value by applying reducer function to each entry
- **Target**: `<K, V, R>(reducer: (accumulator: R, value: V, key: K, map: Map<K, V>) => R) => (initial: R) => (map: Map<K, V>) => Result<MapError, R>`

### set

- **Current**: `<K, V>(key: K) => (value: V) => (map: Map<K, V>) => Map<K, V>`
- **Returns**: New Map<K, V> with key set to value
- **Description**: [NEEDS DESCRIPTION] Immutably sets a key-value pair in a map; returns new map
- **Target**: `<K, V>(key: K) => (value: V) => (map: Map<K, V>) => Result<MapError, Map<K, V>>`

### setAll

- **Current**: `<K, V>(entries: Iterable<[K, V]>) => (map: Map<K, V>) => Map<K, V>`
- **Returns**: New Map<K, V> with all entries added
- **Description**: [NEEDS DESCRIPTION] Immutably adds multiple key-value pairs from an iterable; returns new map
- **Target**: `<K, V>(entries: Iterable<[K, V]>) => (map: Map<K, V>) => Result<MapError, Map<K, V>>`

### size

- **Current**: `<K, V>(map: Map<K, V>) => number`
- **Returns**: number (count of entries in map)
- **Description**: [NEEDS DESCRIPTION] Returns the number of key-value pairs in a map
- **Target**: `<K, V>(map: Map<K, V>) => Result<MapError, number>`

### sliding

- **Current**: `<K, V>(size: number) => (step: number = 1) => (map: Map<K, V>) => Array<Map<K, V>>`
- **Returns**: Array of Maps representing sliding windows over entries
- **Description**: [NEEDS DESCRIPTION] Creates sliding windows of specified size over map entries with given step
- **Note**: Uses default parameter (step = 1)
- **Target**: `<K, V>(size: number) => (step: number) => (map: Map<K, V>) => Result<MapError, Array<Map<K, V>>>`

### symmetricDifference

- **Current**: `<K, V>(map1: Map<K, V>) => (map2: Map<K, V>) => Map<K, V>`
- **Returns**: Map<K, V> containing entries unique to either map (not in both)
- **Description**: [NEEDS DESCRIPTION] Returns entries that exist in exactly one of the two maps (XOR operation)
- **Target**: `<K, V>(map1: Map<K, V>) => (map2: Map<K, V>) => Result<MapError, Map<K, V>>`

### union

- **Current**: `<K, V>(...maps: Array<Map<K, V>>) => Map<K, V>`
- **Returns**: Map<K, V> containing all entries from all maps
- **Description**: [NEEDS DESCRIPTION] Alias for merge; combines all maps with later maps overwriting earlier
- **Note**: Direct alias that imports and re-exports merge
- **Target**: `<K, V>(...maps: Array<Map<K, V>>) => Result<MapError, Map<K, V>>`

### update

- **Current**: `<K, V>(key: K) => (updater: (value: V | undefined) => V) => (map: Map<K, V>) => Map<K, V>`
- **Returns**: New Map<K, V> with key updated via updater function
- **Description**: [NEEDS DESCRIPTION] Updates a map entry by applying updater function to existing value (or undefined)
- **Note**: Uses mutable Map.set internally (violates immutability in result construction)
- **Target**: `<K, V>(key: K) => (updater: (value: V | undefined) => V) => (map: Map<K, V>) => Result<MapError, Map<K, V>>`

### values

- **Current**: `<K, V>(map: Map<K, V>) => Array<V>`
- **Returns**: Array of all values
- **Description**: [NEEDS DESCRIPTION] Extracts all values from a map as an array using Array.from
- **Target**: `<K, V>(map: Map<K, V>) => Result<MapError, Array<V>>`

### withDefault

- **Current**: `<K, V>(defaultValue: V) => (map: Map<K, V>) => Map<K, V>`
- **Returns**: Map<K, V> with modified get method that returns defaultValue for missing keys
- **Description**: [NEEDS DESCRIPTION] Wraps a map to provide default value for missing keys; overrides get method
- **Note**: Uses method override (wrappedMap.get = ...) which mutates the map prototype behavior
- **Target**: `<K, V>(defaultValue: V) => (map: Map<K, V>) => Result<MapError, Map<K, V>>`

---

## Migration Notes

Map operation functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(result)` when operation succeeds
2. Return `error(MapError)` when operation fails, with descriptive error messages
3. Maintain currying for all multi-parameter functions
4. Preserve immutability and type safety
5. Replace null returns with explicit error values
6. Validate inputs before performing operations

## Special Considerations

### Arrow Function Syntax

All operation functions use arrow syntax except:

- **interleave** (uses named function declaration)
- **isEmpty** (uses named function declaration)
- **isNotEmpty** (uses named function declaration)
- **withDefault** (uses named function declaration)

### Mutability Violations

Several functions use mutable operations internally and need refactoring:

- **frequency** (uses Map.set in reduce)
- **groupBy** (uses Map.set in reduce)
- **update** (uses Map.set on result)
- **withDefault** (overrides map.get method)

### Aliases

- **union** is a direct alias of **merge** (imports and re-exports)
- Consider whether both should be maintained or consolidated

### Non-Null Assertions

Functions using non-null assertion operator (!):

- **getOr** (assumes map.get(key)! when has(key) is true)
- **mergeWith** (assumes acc.get(key)! when has(key) is true)

### Default Parameters

Functions using default parameters:

- **sliding** (step: number = 1)
- Should be refactored to full currying

### Rest Parameters

Functions using rest parameters:

- **merge** (...maps: Array<Map<K, V>>)
- **mergeWith** (...maps: Array<Map<K, V>>)
- **union** (...maps: Array<Map<K, V>>)

### Complex Generic Signatures

Functions with complex type parameters:

- **difference** and **differenceWith** (allow different value types K, V, V2, K2)
- **intersection** and **intersectionWith** (allow different value types)
- **mapEntries** (transforms both keys and values: NK, NV)

### Return Value Patterns

#### Functions Returning Maps

Most functions return new Map instances:

- **delete**, **deleteAll**, **difference**, **differenceWith**, **filter**, **filterKeys**, **filterValues**, **intersection**, **intersectionWith**, **map**, **mapEntries**, **mapKeys**, **merge**, **mergeWith**, **set**, **setAll**, **symmetricDifference**, **union**, **update**, **withDefault**

#### Functions Returning Arrays

- **entries** → Array<[K, V]>
- **keys** → Array<K>
- **values** → Array<V>
- **partitionBy** → Array<Map<K, V>>
- **sliding** → Array<Map<K, V>>

#### Functions Returning Tuples

- **partition** → [Map<K, V>, Map<K, V>]

#### Functions Returning Primitives

- **has** → boolean
- **isEmpty** → boolean
- **isNotEmpty** → boolean
- **size** → number

#### Functions Returning Transformed Types

- **frequency** → Map<V, number> (values become keys)
- **groupBy** → Map<G, Map<K, V>> (nested maps)
- **reduce** → R (generic accumulator)

#### Functions Returning Nullable

- **get** → V | null (converts undefined to null)

### Validation Needs

#### Input Validation

- All functions should validate that map parameter is actually a Map
- Functions with predicates should validate predicate is a function
- Functions with arrays should validate array structure
- **sliding** should validate size > 0 and step > 0

#### Key/Value Validation

- Functions that accept keys should validate key type compatibility
- Functions that accept values should validate value type compatibility
- Custom equality functions should be validated

### Implementation Patterns

#### Immutability Patterns

Most functions correctly use immutable patterns:

- `new Map([...map, ...entries])` (spread and construct)
- `new Map(array.filter(...))` (construct from filtered array)
- `new Map(array.map(...))` (construct from mapped array)

#### Reduce Patterns

Functions using Array.prototype.reduce:

- **deleteAll** (iterative deletion)
- **frequency** (count accumulation with mutation)
- **groupBy** (group accumulation with mutation)
- **merge** (map merging)
- **mergeWith** (map merging with conflict resolution)
- **partitionBy** (consecutive grouping with mutation)

#### Filter Patterns

Functions using Array.prototype.filter:

- **difference** (key exclusion)
- **differenceWith** (custom equality exclusion)
- **filter** (value-key predicate)
- **filterKeys** (key predicate)
- **filterValues** (value predicate)
- **intersection** (key inclusion)
- **intersectionWith** (custom equality inclusion)
- **toObject** (symbol key exclusion)

### Set Theory Operations

#### Set-like Operations on Maps

- **difference** (A - B: entries in A not in B)
- **intersection** (A ∩ B: entries in both A and B)
- **symmetricDifference** (A △ B: entries in A or B but not both)
- **union** (A ∪ B: all entries from A and B)

#### Custom Equality Variants

- **differenceWith** (difference with custom key equality)
- **intersectionWith** (intersection with custom key equality)

### Windowing and Grouping

#### Windowing Functions

- **sliding** (creates overlapping windows over entries)
  - Parameters: size (window size), step (advance amount)
  - Returns array of maps representing windows
  - Filters to ensure all windows are full size

#### Grouping Functions

- **groupBy** (groups by computed key from entries)
  - Returns nested Map<G, Map<K, V>>
  - Uses mutable accumulation pattern
- **partitionBy** (groups consecutive entries with same predicate result)
  - Returns array of maps
  - Handles consecutive grouping with immutable slice operations

### Transformation Functions

#### Value Transformations

- **map** (transforms values, preserves keys)
- **filter** (selects entries by value-key predicate)
- **filterValues** (selects entries by value predicate)
- **frequency** (transforms values to frequency counts)

#### Key Transformations

- **mapKeys** (transforms keys, preserves values)
- **filterKeys** (selects entries by key predicate)

#### Entry Transformations

- **mapEntries** (transforms entire [K, V] tuples)

### Predicate Functions

Functions accepting predicates:

- **filter** `(value: V, key: K) => boolean`
- **filterKeys** `(key: K) => boolean`
- **filterValues** `(value: V) => boolean`
- **partition** `(value: V, key: K) => boolean`
- **partitionBy** `(value: V, key: K) => unknown`

### Reducer Functions

- **reduce** accepts standard reducer signature:
  - `(accumulator: R, value: V, key: K, map: Map<K, V>) => R`
  - Curried as: `reducer => initial => map => result`

### Merge Functions

#### Simple Merge

- **merge** (later maps overwrite earlier)
- **union** (alias for merge)

#### Custom Merge

- **mergeWith** (custom conflict resolution)
  - `mergeFn: (existingValue: V, incomingValue: V) => V`
  - Allows custom logic for duplicate keys

---

## Notes

### Missing Standard Map Operations

Consider implementing these during migration:

- **find**: Find first entry matching predicate
- **findKey**: Find first key matching predicate
- **every**: Check if all entries satisfy predicate
- **some**: Check if any entry satisfies predicate
- **count**: Count entries matching predicate
- **keyOf**: Find key for a given value
- **invert**: Swap keys and values (Map<K, V> → Map<V, K>)
- **compact**: Remove entries with null/undefined values
- **pick**: Create map with only specified keys
- **omit**: Create map without specified keys
- **defaults**: Merge with default values (don't overwrite)

### Special Method Overrides

- **withDefault** overrides the get method of a Map instance
  - This creates a non-standard Map behavior
  - May cause issues with Map type expectations
  - Consider alternative implementation (maybe a wrapper object?)

### Performance Considerations

Functions with potentially expensive operations:

- **differenceWith** (O(n*m) with nested some)
- **intersectionWith** (O(n*m) with nested some)
- **frequency** (O(n) but creates new map with value keys)
- **groupBy** (O(n) but creates nested map structure)
- **partitionBy** (O(n²) with immutable slice operations)

### Testing Considerations

When migrating, ensure comprehensive tests for:

- Empty maps
- Single-entry maps
- Maps with duplicate handling (merge, mergeWith)
- Custom equality functions (differenceWith, intersectionWith)
- Sliding windows with various size/step combinations
- Partition and group operations with edge cases
- Reducer functions with various accumulator types
- Type safety through transformations (mapKeys, mapEntries)
- Method override behavior (withDefault)
- Mutable operation violations (frequency, groupBy, update)
