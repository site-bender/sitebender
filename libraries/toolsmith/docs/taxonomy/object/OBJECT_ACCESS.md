# Object - Access Functions

**Location**: `src/object/`
**Functions**: 22
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### keys

- **Current**: `<T extends object>(obj: T | null | undefined) => Array<keyof T & string>`
- **Returns**: Array of string keys from the object
- **Description**: Returns an array of an object's own enumerable property names (string keys only, not symbols)
- **Target**: `<T extends object>(obj: T | null | undefined) => Result<ValidationError, Array<keyof T & string>>`

### values

- **Current**: `<T extends Record<string, Value>>(obj: T | null | undefined) => Array<T[keyof T]>`
- **Returns**: Array of values from the object
- **Description**: Returns an array of an object's own enumerable property values
- **Target**: `<T extends Record<string, Value>>(obj: T | null | undefined) => Result<ValidationError, Array<T[keyof T]>>`

### entries

- **Current**: `<T extends Record<string, Value>>(obj: T | null | undefined) => Array<[keyof T & string, T[keyof T]]>`
- **Returns**: Array of [key, value] pairs
- **Description**: Returns an array of an object's own enumerable string-keyed property [key, value] pairs
- **Target**: `<T extends Record<string, Value>>(obj: T | null | undefined) => Result<ValidationError, Array<[keyof T & string, T[keyof T]]>>`

### prop (`property` or `getProperty`?)

- **Current**: `<T extends Record<string | symbol, Value>, K extends keyof T>(key: K) => (obj: T) => T[K] | null`
- **Returns**: Curried function returning property value or null
- **Description**: Returns the value of the specified property from an object, returning null if undefined or object is null/undefined
- **Target**: `<T extends Record<string | symbol, Value>, K extends keyof T>(key: K) => (obj: T) => Result<ValidationError, T[K]>`

### propOr (`getPropertyOrElse`?)

- **Current**: `<D extends Value>(defaultValue: D) => <K extends string | symbol, V>(key: K) => <T extends Record<K, unknown>>(obj: T) => V | D`
- **Returns**: Curried function returning property value or default
- **Description**: Returns the value of the specified property, or a default value if the property doesn't exist
- **Target**: `<D extends Value>(defaultValue: D) => <K extends string | symbol, V>(key: K) => <T extends Record<K, unknown>>(obj: T) => Result<ValidationError, V | D>`

### props (`properties`?)

- **Current**: `<K extends Array<string | symbol>>(keys: K) => <T extends Record<string | symbol, Value>>(obj: T) => Array<Value | undefined>`
- **Returns**: Curried function returning array of property values
- **Description**: Returns an array of values for the specified keys from an object
- **Target**: `<K extends Array<string | symbol>>(keys: K) => <T extends Record<string | symbol, Value>>(obj: T) => Result<ValidationError, Array<Value>>`

### path

- **Current**: `(pathInput: string | Array<string | number>) => (obj: Value) => Value`
- **Returns**: Curried function returning value at path or null
- **Description**: Retrieves the value at a given path (dot-notation string or array of keys) in a nested object structure, returning null if path doesn't exist
- **Target**: `(pathInput: string | Array<string | number>) => (obj: Value) => Result<ValidationError, Value>`

### pathOr

- **Current**: `<T extends Value>(pathInput: string | Array<string | number>) => (defaultValue: T) => (obj: Value) => T | Value`
- **Returns**: Curried function returning value at path or default
- **Description**: Retrieves the value at a given path or returns a default value if the path doesn't exist
- **Target**: `<T extends Value>(pathInput: string | Array<string | number>) => (defaultValue: T) => (obj: Value) => Result<ValidationError, T | Value>`

### has

- **Current**: `(pathInput: string | Array<string | number>) => (obj: Value) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Checks if a path exists in an object (checks own properties only, not prototype chain)
- **Target**: `(pathInput: string | Array<string | number>) => (obj: Value) => Result<ValidationError, boolean>`

### hasOwn

- **Current**: `<K extends PropertyKey>(key: K) => <T extends Record<PropertyKey, unknown>>(obj: T) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Returns true if object has own property with given key (uses Object.hasOwn)
- **Target**: `<K extends PropertyKey>(key: K) => <T extends Record<PropertyKey, unknown>>(obj: T) => Result<ValidationError, boolean>`

### hasPath

- **Current**: `(path: Array<string | number | symbol>) => <T extends Record<string | symbol, Value>>(obj: T) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Checks if a nested path exists in an object by traversing the path array
- **Target**: `(path: Array<string | number | symbol>) => <T extends Record<string | symbol, Value>>(obj: T) => Result<ValidationError, boolean>`

### lookup

- **Current**: `<K extends PropertyKey>(key: K) => <T extends Record<PropertyKey, unknown>>(obj: T) => unknown | null`
- **Returns**: Curried function returning value or null
- **Description**: Returns the value at the given key in an object, or null if not found (checks hasOwn before accessing)
- **Target**: `<K extends PropertyKey>(key: K) => <T extends Record<PropertyKey, unknown>>(obj: T) => Result<ValidationError, unknown>`

### propEq (`propertyEquals`)

- **Current**: `<K extends string | symbol, V>(key: K) => (value: V) => <T extends Record<K, unknown>>(obj: T) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Checks if the specified property of an object equals the given value (using strict equality)
- **Target**: `<K extends string | symbol, V>(key: K) => (value: V) => <T extends Record<K, unknown>>(obj: T) => Result<ValidationError, boolean>`

### propSatisfies (`propertySatisfies`)

- **Current**: `<V>(predicate: (value: V) => boolean) => <K extends string | symbol>(key: K) => <T extends Record<K, unknown>>(obj: T) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Checks if the specified property of an object satisfies a given predicate function
- **Target**: `<V>(predicate: (value: V) => boolean) => <K extends string | symbol>(key: K) => <T extends Record<K, unknown>>(obj: T) => Result<ValidationError, boolean>`

### eqProps (need clearer name)

- **Current**: `<K extends string | symbol>(prop: K) => <T extends Record<string | symbol, Value>>(obj1: T) => <U extends Record<string | symbol, Value>>(obj2: U) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Checks if the specified property has equal values in two objects (uses deep equality comparison)
- **Target**: `<K extends string | symbol>(prop: K) => <T extends Record<string | symbol, Value>>(obj1: T) => <U extends Record<string | symbol, Value>>(obj2: U) => Result<ValidationError, boolean>`

### view

- **Current**: `<S, A>(lens: Lens<S, A>) => (obj: S) => A`
- **Returns**: Curried function returning value at lens focus
- **Description**: Gets a value from an object using a lens (functional getter)
- **Target**: `<S, A>(lens: Lens<S, A>) => (obj: S) => Result<ValidationError, A>`

### lens

- **Current**: `<S, A>(getter: (s: S) => A) => (setter: (a: A) => (s: S) => S) => Lens<S, A>`
- **Returns**: Curried function returning Lens object
- **Description**: Creates a lens from a getter and setter function for functional property access and updates
- **Target**: `<S, A>(getter: (s: S) => A) => (setter: (a: A) => (s: S) => S) => Result<ValidationError, Lens<S, A>>`

### lensProp (`lensOnProperty`?)

- **Current**: [NEED TO READ]
- **Returns**: Lens focused on a property
- **Description**: Creates a lens focused on a specific property of an object
- **Target**: `<K extends string>(key: K) => <T extends Record<string, Value>>(obj: T) => Result<ValidationError, Lens<T, T[K]>>`

### lensPath

- **Current**: [NEED TO READ]
- **Returns**: Lens focused on a path
- **Description**: Creates a lens focused on a nested path in an object
- **Target**: `(path: Array<string | number>) => <T>(obj: T) => Result<ValidationError, Lens<T, Value>>`

### lensIndex

- **Current**: [NEED TO READ]
- **Returns**: Lens focused on an array index
- **Description**: Creates a lens focused on a specific index in an array
- **Target**: `(index: number) => <T>(arr: Array<T>) => Result<ValidationError, Lens<Array<T>, T>>`

### where

- **Current**: `<S extends Record<string, (value: unknown) => boolean>>(spec: S) => <T extends Record<string | symbol, Value>>(obj: T) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Tests whether an object satisfies a specification where each property is a predicate function
- **Target**: `<S extends Record<string, (value: unknown) => boolean>>(spec: S) => <T extends Record<string | symbol, Value>>(obj: T) => Result<ValidationError, boolean>`

### whereEq (`whereEqual`?)

- **Current**: [NEED TO READ]
- **Returns**: Curried function returning boolean
- **Description**: Tests whether an object has equal values for all properties specified in a test object
- **Target**: `<S extends Record<string, Value>>(spec: S) => <T extends Record<string | symbol, Value>>(obj: T) => Result<ValidationError, boolean>`

---

## Migration Notes

Access functions will be converted to Result-returning validators that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when access succeeds (retrieving the requested data)
2. Return `error(ValidationError)` when access fails (e.g., path doesn't exist, type mismatch)
3. Maintain currying for all multi-parameter functions
4. Preserve type safety while adding error context
5. Support both string and symbol keys where applicable

## Special Considerations

### Null/Undefined Handling

- Most access functions gracefully handle null/undefined objects by returning null, empty arrays, or false
- In monadic form, these should return appropriate error results with descriptive messages
- **prop** and **path** return null for missing values (should return error in monadic form)
- **propOr** and **pathOr** return defaults (should return ok(default) in monadic form)

### Path Navigation

- **path** accepts both dot-notation strings ("a.b.c") and arrays (["a", "b", "c"])
- **has** and **hasPath** check existence without retrieving values
- **path** handles Maps, Sets, Arrays, and plain objects
- All path functions return null for invalid/missing paths (should be errors in monadic form)

### Type Safety

- **prop** narrows return type to `T[K]` using generic constraints
- **props** returns array that may contain undefined for missing keys
- **propOr** requires explicit type parameters for value type
- Lens functions maintain type safety through the Lens<S, A> type

### Lens Functions

- **lens** creates a lens from getter/setter pair
- **lensProp**, **lensPath**, **lensIndex** are specialized lens constructors
- **view** uses a lens to get a value (equivalent to lens.get)
- Lenses enable functional updates via composition

### Predicate Functions

- **propEq** uses strict equality (===)
- **eqProps** uses deep equality comparison (handles nested objects, arrays, Maps, Sets, Dates, RegExp)
- **propSatisfies** runs a predicate on property value (returns false on exceptions)
- **where** runs multiple predicates from a spec object (all must pass)
- **whereEq** checks equality for multiple properties

### String and Symbol Keys

- Most functions support both string and symbol keys
- **keys** returns only string keys (not symbols)
- **entries** returns only string-keyed pairs
- **toPairs** (in utilities) returns both string and symbol pairs
- Functions using Object.keys/entries only see string keys

### Special Handling

- **lookup** checks hasOwn before accessing (safer than direct property access)
- **hasOwn** uses modern Object.hasOwn (not hasOwnProperty)
- **props** maps over keys array (allows batch property access)
- **path** uses reduce for traversal (pure functional approach)

---

## Implementation Dependencies

Many access functions depend on validation utilities:

- **keys**, **values**, **entries**: depend on `isNullish`
- **prop**, **propOr**, **propEq**, **propSatisfies**: depend on `isNullish`
- **path**, **pathOr**, **has**: depend on `isNullish`
- **hasPath**: depends on `isNotNullish`, `isNullish`
- **lookup**: depends on `isNotNullish`, `hasOwn`
- **eqProps**: depends on `isNullish` and deep equality logic
- **where**: depends on `isEmpty`

These dependencies should be considered when planning migration order.
