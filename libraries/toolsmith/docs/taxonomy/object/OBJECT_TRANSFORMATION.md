# Object - Transformation Functions

**Location**: `src/vanilla/object/`
**Functions**: 23
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### mapKeys

- **Current**: `<T extends Record<string | symbol, Value>>(fn: (key: string | symbol) => string | symbol) => (obj: T) => Record<string | symbol, Value>`
- **Returns**: Curried function returning object with transformed keys
- **Description**: Transforms all keys of an object using a mapping function (supports both string and symbol keys)
- **Target**: `<T extends Record<string | symbol, Value>>(fn: (key: string | symbol) => string | symbol) => (obj: T) => Result<ValidationError, Record<string | symbol, Value>>`

### mapValues

- **Current**: `<T extends Value, R extends Value>(fn: (value: T) => R) => <K extends string | symbol>(obj: Record<K, T> | null | undefined) => Record<K, R>`
- **Returns**: Curried function returning object with transformed values
- **Description**: Transforms all values of an object using a mapping function while preserving keys
- **Target**: `<T extends Value, R extends Value>(fn: (value: T) => R) => <K extends string | symbol>(obj: Record<K, T> | null | undefined) => Result<ValidationError, Record<K, R>>`

### pick

- **Current**: `<T extends Record<string, Value>, K extends keyof T>(keys: Array<K>) => (obj: T) => Pick<T, K>`
- **Returns**: Curried function returning object with only specified keys
- **Description**: Creates a new object with only the specified keys from the source object (only includes keys that exist)
- **Target**: `<T extends Record<string, Value>, K extends keyof T>(keys: Array<K>) => (obj: T) => Result<ValidationError, Pick<T, K>>`

### pickAll

- **Current**: `<K extends string | symbol>(keys: Array<K>) => <T extends Record<string | symbol, Value>>(obj: T) => Record<K, Value | undefined>`
- **Returns**: Curried function returning object with all specified keys (including undefined)
- **Description**: Creates a new object with all specified keys, including those that don't exist (as undefined)
- **Target**: `<K extends string | symbol>(keys: Array<K>) => <T extends Record<string | symbol, Value>>(obj: T) => Result<ValidationError, Record<K, Value | undefined>>`

### pickBy

- **Current**: `<T extends Record<string | symbol, Value>>(predicate: (value: Value, key: string | symbol) => boolean) => (obj: T) => Partial<T>`
- **Returns**: Curried function returning object with filtered properties
- **Description**: Creates a new object with only the properties where the predicate returns true
- **Target**: `<T extends Record<string | symbol, Value>>(predicate: (value: Value, key: string | symbol) => boolean) => (obj: T) => Result<ValidationError, Partial<T>>`

### omit

- **Current**: `<T extends Record<string, Value>, K extends keyof T>(keys: Array<K>) => (obj: T) => Omit<T, K>`
- **Returns**: Curried function returning object without specified keys
- **Description**: Creates a new object excluding the specified keys from the source object
- **Target**: `<T extends Record<string, Value>, K extends keyof T>(keys: Array<K>) => (obj: T) => Result<ValidationError, Omit<T, K>>`

### reject

- **Current**: `<T extends Record<string | symbol, Value>>(predicate: (value: Value, key: string | symbol) => boolean) => (obj: T) => Partial<T>`
- **Returns**: Curried function returning object with rejected properties removed
- **Description**: Creates a new object excluding properties where the predicate returns true (opposite of pickBy)
- **Target**: `<T extends Record<string | symbol, Value>>(predicate: (value: Value, key: string | symbol) => boolean) => (obj: T) => Result<ValidationError, Partial<T>>`

### assoc

- **Current**: `<K extends string | symbol, V extends Value>(key: K) => (value: V) => <T extends Record<string | symbol, Value>>(obj: T) => T & Record<K, V>`
- **Returns**: Curried function returning object with added/updated property
- **Description**: Creates a shallow copy of an object with a single property set to the given value
- **Target**: `<K extends string | symbol, V extends Value>(key: K) => (value: V) => <T extends Record<string | symbol, Value>>(obj: T) => Result<ValidationError, T & Record<K, V>>`

### dissoc (need clearer name)

- **Current**: `<K extends string | symbol>(key: K) => <T extends Record<string | symbol, Value>>(obj: T) => Omit<T, K>`
- **Returns**: Curried function returning object without specified key
- **Description**: Creates a shallow copy of an object with a single property removed
- **Target**: `<K extends string | symbol>(key: K) => <T extends Record<string | symbol, Value>>(obj: T) => Result<ValidationError, Omit<T, K>>`

### assocPath (need clearer name)

- **Current**: `<V extends Value>(path: Array<string | number>) => (value: V) => <T extends Record<string | symbol, Value>>(obj: T) => Value`
- **Returns**: Curried function returning object with value set at nested path
- **Description**: Creates a deep copy with a value set at a nested path, creating intermediate objects as needed
- **Target**: `<V extends Value>(path: Array<string | number>) => (value: V) => <T extends Record<string | symbol, Value>>(obj: T) => Result<ValidationError, Value>`

### dissocPath (need clearer name)

- **Current**: `(path: Array<string | number>) => <T extends Record<string | symbol, Value>>(obj: T) => Value`
- **Returns**: Curried function returning object with nested property removed
- **Description**: Creates a deep copy with a property removed at a nested path
- **Target**: `(path: Array<string | number>) => <T extends Record<string | symbol, Value>>(obj: T) => Result<ValidationError, Value>`

### modify

- **Current**: `<K extends string | symbol, V extends Value, R extends Value>(prop: K) => (fn: (value: V) => R) => <T extends Record<string | symbol, Value>>(obj: T) => T & Record<K, R>`
- **Returns**: Curried function returning object with modified property
- **Description**: Applies a transformation function to a single property, creating a new object
- **Target**: `<K extends string | symbol, V extends Value, R extends Value>(prop: K) => (fn: (value: V) => R) => <T extends Record<string | symbol, Value>>(obj: T) => Result<ValidationError, T & Record<K, R>>`

### modifyPath

- **Current**: `<V extends Value, R extends Value>(pathArray: Array<string | number | symbol>) => (fn: (value: V) => R) => <T extends Record<string | symbol, Value>>(obj: T) => Value`
- **Returns**: Curried function returning object with modified nested value
- **Description**: Applies a transformation function to a value at a nested path
- **Target**: `<V extends Value, R extends Value>(pathArray: Array<string | number | symbol>) => (fn: (value: V) => R) => <T extends Record<string | symbol, Value>>(obj: T) => Result<ValidationError, Value>`

### set

- **Current**: `(pathInput: string | Array<string | number>) => <V extends Value>(value: V) => <T extends Record<string, Value>>(obj: T | null | undefined) => T`
- **Returns**: Curried function returning object with value set at path
- **Description**: Sets a value at a path in an object (supports dot notation and arrays), creating intermediate structures as needed
- **Target**: `(pathInput: string | Array<string | number>) => <V extends Value>(value: V) => <T extends Record<string, Value>>(obj: T | null | undefined) => Result<ValidationError, T>`

### over

- **Current**: `<S, A>(lens: Lens<S, A>) => (fn: (value: A) => A) => (obj: S) => S`
- **Returns**: Curried function returning object with lens-focused value transformed
- **Description**: Applies a transformation function to the value focused by a lens
- **Target**: `<S, A>(lens: Lens<S, A>) => (fn: (value: A) => A) => (obj: S) => Result<ValidationError, S>`

### evolve

- **Current**: `<T extends Record<string | symbol, Value>>(transformations: Record<string | symbol, TransformationSpec>) => (obj: T | null | undefined) => T`
- **Returns**: Curried function returning object with evolved properties
- **Description**: Applies transformation functions to multiple properties according to a transformation spec (supports nested transformations)
- **Target**: `<T extends Record<string | symbol, Value>>(transformations: Record<string | symbol, TransformationSpec>) => (obj: T | null | undefined) => Result<ValidationError, T>`

### merge

- **Current**: `<T extends Record<string | symbol, Value>>(...sources: Array<Record<string | symbol, Value> | null | undefined>) => (target: T | null | undefined) => T & Record<string | symbol, Value>`
- **Returns**: Curried function returning merged object
- **Description**: Shallow merge of multiple objects (later objects override earlier ones)
- **Target**: `<T extends Record<string | symbol, Value>>(...sources: Array<Record<string | symbol, Value> | null | undefined>) => (target: T | null | undefined) => Result<ValidationError, T & Record<string | symbol, Value>>`

### mergeDeep

- **Current**: `<T extends Record<string | symbol, Value>>(...sources: Array<Record<string | symbol, Value> | null | undefined>) => (target: T | null | undefined) => T & Record<string | symbol, Value>`
- **Returns**: Curried function returning deep merged object
- **Description**: Deep merge of multiple objects (recursively merges nested plain objects, arrays are replaced)
- **Target**: `<T extends Record<string | symbol, Value>>(...sources: Array<Record<string | symbol, Value> | null | undefined>) => (target: T | null | undefined) => Result<ValidationError, T & Record<string | symbol, Value>>`

### smartMerge

- **Current**: `(strategy: MergeStrategy = {}) => (...sources: Array<Record<string, unknown>>) => Record<string, unknown>`
- **Returns**: Curried function returning strategically merged object
- **Description**: Configurable merge with strategies for arrays (concat/replace/union), depth limits, and custom resolvers
- **Target**: `(strategy: MergeStrategy = {}) => (...sources: Array<Record<string, unknown>>) => Result<ValidationError, Record<string, unknown>>`

### renameKeys

- **Current**: `<T extends Record<string | symbol, Value>>(keyMap: Record<string | symbol, string | symbol>) => (obj: T) => Record<string | symbol, Value>`
- **Returns**: Curried function returning object with renamed keys
- **Description**: Renames keys in an object according to a key mapping (unmapped keys pass through unchanged)
- **Target**: `<T extends Record<string | symbol, Value>>(keyMap: Record<string | symbol, string | symbol>) => (obj: T) => Result<ValidationError, Record<string | symbol, Value>>`

### transform

- **Current**: [NEED TO READ]
- **Returns**: Transformed object
- **Description**: General-purpose transformation function for objects
- **Target**: `<T, R>(fn: (obj: T) => R) => (obj: T) => Result<ValidationError, R>`

### xform (`transformWithTransducer`?)

- **Current**: [NEED TO READ]
- **Returns**: Transformed object using transducers
- **Description**: Applies transducer-based transformations to objects
- **Target**: `<T, R>(xf: Transducer<T, R>) => (obj: T) => Result<ValidationError, R>`

### project

- **Current**: [NEED TO READ]
- **Returns**: Array of projected objects
- **Description**: Projects specific properties from an array of objects
- **Target**: `<K extends string>(keys: Array<K>) => <T extends Record<string, Value>>(objs: Array<T>) => Result<ValidationError, Array<Pick<T, K>>>`

---

## Migration Notes

Transformation functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(transformedObj)` when transformation succeeds
2. Return `error(ValidationError)` when transformation fails (e.g., type errors, invalid paths)
3. Maintain currying for all multi-parameter functions
4. Preserve type safety while adding error context
5. Support immutable updates (no mutations)

## Special Considerations

### Shallow vs Deep Operations

- **assoc**, **dissoc**, **modify**: Shallow operations (single level)
- **assocPath**, **dissocPath**, **modifyPath**, **set**: Deep operations (nested paths)
- **merge**: Shallow merge (one level deep)
- **mergeDeep**: Recursive merge (handles nested objects)
- **smartMerge**: Configurable depth and merge strategies

### Key Selection

- **pick**: Only includes existing keys
- **pickAll**: Includes all requested keys (undefined for missing)
- **pickBy**: Filters by predicate on values/keys
- **omit**: Excludes specific keys
- **reject**: Excludes by predicate (opposite of pickBy)

### Path Handling

- **path** functions accept string paths ("a.b.c") or arrays (["a", "b", "c"])
- **assocPath** creates intermediate objects as needed
- **dissocPath** removes deeply nested properties
- **set** creates arrays or objects based on numeric keys
- **modifyPath** transforms values at nested paths

### Transformation Patterns

- **mapKeys**: Transforms keys, preserves values
- **mapValues**: Transforms values, preserves keys
- **evolve**: Applies spec of transformations to matching properties
- **modify/modifyPath**: Applies single transformation function
- **over**: Applies transformation via lens

### Merge Strategies

- **merge**: Right-biased shallow merge (later objects win)
- **mergeDeep**: Recursive merge of plain objects (arrays replaced)
- **smartMerge**: Configurable:
  - Arrays: concat (default), replace, union
  - Depth: limit recursion depth
  - Resolver: custom conflict resolution

### Lens Operations

- **over**: Applies function through lens
- **set** (lens-based): Sets value through lens
- **view** (in access): Gets value through lens
- Lenses enable compositional updates

### Type Safety

- **assoc** adds type to result: `T & Record<K, V>`
- **dissoc** removes type from result: `Omit<T, K>`
- **pick** narrows to selected keys: `Pick<T, K>`
- **omit** excludes specified keys: `Omit<T, K>`
- Generic constraints maintain type relationships

### Functional Programming Patterns

- All functions are curried for partial application
- All functions create new objects (no mutations)
- Object spread (`{...obj}`) used for immutable updates
- `reduce` used instead of loops for transformations

### Error Handling

- Most functions gracefully handle null/undefined by returning empty objects
- **propSatisfies** catches predicate exceptions and returns false
- **where** catches predicate exceptions and returns false
- In monadic form, these should return descriptive errors

---

## Implementation Dependencies

Many transformation functions depend on other object and validation utilities:

- **assocPath**, **modifyPath**: depend on `path`, `assoc`
- **dissocPath**: depends on `dissoc`
- **set**: depends on `isNullish`
- **merge**, **mergeDeep**: depend on `isNotNullish`, `isPlainObject`
- **smartMerge**: depends on `isNullish`, `isNotNull`
- **renameKeys**: depends on `isNotUndefined`
- **evolve**: depends on `isNullish`, `isNotNullish`, `isNotUndefined`
- **reject**: uses `Object.fromEntries` and `Object.entries`

These dependencies should be considered when planning migration order.
