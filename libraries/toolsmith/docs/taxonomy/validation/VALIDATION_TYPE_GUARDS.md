# Validation - Type Guard Functions

**Location**: `src/vanilla/validation/`
**Functions**: 24
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### isString
- **Current**: `(value: unknown) => value is string`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is a string primitive (not String object)
- **Target**: `(value: unknown) => Result<ValidationError, string>`

### isNumber
- **Current**: `(value: unknown) => value is number`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is a JavaScript number primitive (excludes NaN)
- **Target**: `(value: unknown) => Result<ValidationError, number>`

### isBoolean
- **Current**: `(value: unknown) => value is boolean`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is a boolean primitive (true or false)
- **Target**: `(value: unknown) => Result<ValidationError, boolean>`

### isArray
- **Current**: `(value: unknown) => value is Array<unknown>`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is an Array using Array.isArray
- **Target**: `(value: unknown) => Result<ValidationError, Array<unknown>>`

### isObject
- **Current**: `(value: unknown) => value is object`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is a non-null object (includes arrays, functions, dates, etc.)
- **Target**: `(value: unknown) => Result<ValidationError, object>`

### isFunction
- **Current**: `(value: unknown) => value is AnyFunction`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is callable as a function
- **Target**: `(value: unknown) => Result<ValidationError, AnyFunction>`

### isNull
- **Current**: `(value: unknown) => value is null`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is strictly null (not undefined or falsy)
- **Target**: `(value: unknown) => Result<ValidationError, null>`

### isUndefined
- **Current**: `(value: unknown) => value is undefined`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is strictly undefined (not null or falsy)
- **Target**: `(value: unknown) => Result<ValidationError, undefined>`

### isNullish
- **Current**: `<T>(value: T | null | undefined) => value is null | undefined`
- **Returns**: Type guard boolean
- **Description**: [INFERRED] Type guard that checks if a value is null or undefined
- **Target**: `(value: unknown) => Result<ValidationError, null | undefined>`

### isBigInt
- **Current**: `(value: unknown) => value is bigint`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is a bigint primitive
- **Target**: `(value: unknown) => Result<ValidationError, bigint>`

### isSymbol
- **Current**: `(value: unknown) => value is symbol`
- **Returns**: Type guard boolean
- **Description**: [INFERRED] Type guard that checks if a value is a symbol primitive
- **Target**: `(value: unknown) => Result<ValidationError, symbol>`

### isDate
- **Current**: `(value: unknown) => value is Date`
- **Returns**: Type guard boolean
- **Description**: Type guard for legacy JavaScript Date objects - for Temporal types use isPlainDate, isPlainDateTime, or isZonedDateTime
- **Target**: `(value: unknown) => Result<ValidationError, Date>`

### isRegExp
- **Current**: `(value: unknown) => value is RegExp`
- **Returns**: Type guard boolean
- **Description**: [INFERRED] Type guard that checks if a value is a RegExp instance
- **Target**: `(value: unknown) => Result<ValidationError, RegExp>`

### isError
- **Current**: `(value: unknown) => value is Error`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is an Error object (including subclasses)
- **Target**: `(value: unknown) => Result<ValidationError, Error>`

### isPromise
- **Current**: `(value: unknown) => value is Promise<unknown>`
- **Returns**: Type guard boolean
- **Description**: [INFERRED] Type guard that checks if a value is a Promise (native or thenable)
- **Target**: `(value: unknown) => Result<ValidationError, Promise<unknown>>`

### isArrayLike
- **Current**: `(value: unknown) => value is ArrayLike<unknown>`
- **Returns**: Type guard boolean
- **Description**: Checks if a value is array-like (has length property and numeric indices)
- **Target**: `(value: unknown) => Result<ValidationError, ArrayLike<unknown>>`

### instanceOf
- **Current**: `<T>(constructor: new (...args: Array<unknown>) => T) => (value: unknown) => value is T`
- **Returns**: Curried function returning type guard boolean
- **Description**: Creates a predicate that checks if a value is an instance of a constructor
- **Target**: `<T>(constructor: new (...args: Array<unknown>) => T) => (value: unknown) => Result<ValidationError, T>`

### is
- **Current**: `<T>(a: T) => <U>(b: U) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Performs SameValue comparison using Object.is
- **Target**: `<T>(a: T) => <U>(b: U) => Result<ValidationError, T>`

### identical (should be `isIdentical`)
- **Current**: `<T>(a: T) => (b: T) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Performs strict equality comparison using the === operator
- **Target**: `<T>(a: T) => (b: T) => Result<ValidationError, T>`

### isMap
- **Current**: `(value: unknown) => value is Map<unknown, unknown>`
- **Returns**: Type guard boolean
- **Description**: [INFERRED] Type guard that checks if a value is a Map instance
- **Target**: `(value: unknown) => Result<ValidationError, Map<unknown, unknown>>`

### isSet
- **Current**: `(value: unknown) => value is Set<unknown>`
- **Returns**: Type guard boolean
- **Description**: [INFERRED] Type guard that checks if a value is a Set instance
- **Target**: `(value: unknown) => Result<ValidationError, Set<unknown>>`

### isWeakMap
- **Current**: `(value: unknown) => value is WeakMap<object, unknown>`
- **Returns**: Type guard boolean
- **Description**: [INFERRED] Type guard that checks if a value is a WeakMap instance
- **Target**: `(value: unknown) => Result<ValidationError, WeakMap<object, unknown>>`

### isWeakSet
- **Current**: `(value: unknown) => value is WeakSet<object>`
- **Returns**: Type guard boolean
- **Description**: [INFERRED] Type guard that checks if a value is a WeakSet instance
- **Target**: `(value: unknown) => Result<ValidationError, WeakSet<object>>`

### isPlainObject
- **Current**: `(value: unknown) => boolean`
- **Returns**: Boolean (not a type guard)
- **Description**: [INFERRED] Checks if a value is a plain object (prototype is Object.prototype or null)
- **Target**: `(value: unknown) => Result<ValidationError, Record<string, unknown>>`

### isPrimitive
- **Current**: `(value: unknown) => boolean`
- **Returns**: Boolean (not a type guard)
- **Description**: [INFERRED] Checks if a value is a primitive type (not object or function, including null)
- **Target**: `(value: unknown) => Result<ValidationError, Primitive>`

---

## Migration Notes

Type guards will be converted to Result-returning validators that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when validation succeeds (with proper type narrowing)
2. Return `error(ValidationError)` when validation fails, with descriptive error messages
3. Maintain currying for functions like `instanceOf`, `is`, and `identical`
4. Preserve type safety while adding error context

## Special Considerations

- **isPlainObject** and **isPrimitive** currently return `boolean` instead of type guards, but should return proper type guards in monadic form
- **isNullish** uses arrow function syntax - will need refactoring to named functions
- **isSymbol**, **isRegExp**, **isMap**, **isSet**, **isWeakMap**, **isWeakSet** use arrow syntax and need refactoring
- **isPromise** includes duck-typing for thenable objects beyond native Promises
- **isNumber** explicitly excludes NaN values
- **isDate** is for legacy Date objects - Temporal type guards exist separately
