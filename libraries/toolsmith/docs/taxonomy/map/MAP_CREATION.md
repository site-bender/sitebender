# Map - Creation Functions

**Location**: `src/vanilla/map/`
**Functions**: 5
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### clear

- **Current**: `<K = unknown, V = unknown>() => Map<K, V>`
- **Returns**: Empty Map<K, V>
- **Description**: [NEEDS DESCRIPTION] Creates a new empty Map instance
- **Target**: `<K, V>() => Result<MapError, Map<K, V>>`

### fromArray

- **Current**: `<K, V>(entries: Array<[K, V]>) => Map<K, V>`
- **Returns**: Map<K, V>
- **Description**: [NEEDS DESCRIPTION] Creates a Map from an array of key-value pair tuples
- **Target**: `<K, V>(entries: Array<[K, V]>) => Result<MapError, Map<K, V>>`

### fromEntries

- **Current**: `<K, V>(entries: Array<[K, V]>) => Map<K, V>`
- **Returns**: Map<K, V>
- **Description**: [NEEDS DESCRIPTION] Alias for fromArray; creates a Map from an array of key-value pair tuples
- **Note**: This is an alias that imports and re-exports fromArray
- **Target**: `<K, V>(entries: Array<[K, V]>) => Result<MapError, Map<K, V>>`

### fromObject

- **Current**: `<V>(obj: Record<string, V>) => Map<string, V>`
- **Returns**: Map<string, V>
- **Description**: [NEEDS DESCRIPTION] Creates a Map from an object's string keys and values using Object.entries
- **Target**: `<V>(obj: Record<string, V>) => Result<MapError, Map<string, V>>`

### toObject

- **Current**: `<V>(map: Map<unknown, V>) => Record<string, V>`
- **Returns**: Record<string, V>
- **Description**: [NEEDS DESCRIPTION] Converts a Map to a plain object, filtering out symbol keys and converting all keys to strings
- **Target**: `<V>(map: Map<unknown, V>) => Result<MapError, Record<string, V>>`

---

## Migration Notes

Map creation functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(map)` when creation succeeds
2. Return `error(MapError)` when creation fails, with descriptive error messages
3. Maintain type safety and generics
4. Validate input structures (arrays, objects) before creating maps

## Special Considerations

### Arrow Function Syntax

None of the creation functions use arrow syntax - all use function declarations or const with arrow expressions.

### Aliases

- **fromEntries** is a direct alias of **fromArray** (imports and re-exports)
- Consider whether both should be maintained or consolidated

### Type Conversion Functions

- **toObject** converts Map to plain object (inverse of fromObject)
- Filters out symbol keys (symbols cannot be object string keys)
- Uses spread operator and reduce for immutability

### Validation Needs

#### fromArray / fromEntries

- Should validate that input is an array
- Should validate that each element is a tuple [K, V]
- Should handle empty arrays gracefully

#### fromObject

- Should validate that input is a plain object
- Should handle objects with no enumerable properties
- Should handle objects with symbol keys (currently ignored)

#### toObject

- Should validate that input is a Map
- Currently filters symbol keys - should document this behavior
- Uses String(key) to convert non-string keys

### Implementation Details

#### clear

- Simple function that returns a new empty Map
- Uses generic type parameters with defaults
- No validation needed

#### fromArray

- Uses Map constructor directly with entries array
- No validation of input structure
- Assumes array contains valid [K, V] tuples

#### fromObject

- Uses Object.entries to extract key-value pairs
- Returns Map<string, V> (keys always strings)
- No validation of input

#### toObject

- Filters out symbol keys explicitly
- Uses reduce to build plain object
- Converts all keys to strings with String(key)
- Uses spread operator for immutability

---

## Notes

### Missing Creation Functions

Consider implementing these during migration:

- **singleton**: Create a Map with a single key-value pair
- **empty**: Explicit empty map creator (distinct from clear)
- **fromIterable**: Create Map from any iterable of [K, V] pairs
- **fromMap**: Clone an existing Map
- **fromPairs**: Alias for fromArray/fromEntries (for consistency with other libraries)

### Current Behavior Gaps

1. No validation of input types or structures
2. No error handling for malformed inputs
3. **fromArray** and **fromEntries** don't validate tuple structure
4. **fromObject** silently converts all keys to strings
5. **toObject** silently filters symbol keys without warning

### Testing Considerations

When migrating, ensure comprehensive tests for:

- Empty inputs (empty arrays, empty objects, empty maps)
- Invalid inputs (non-arrays, non-objects, non-maps)
- Malformed tuples in fromArray/fromEntries
- Objects with symbol keys (fromObject should document behavior)
- Maps with non-string keys (toObject conversion behavior)
- Type safety preservation through conversion cycles
