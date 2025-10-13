# Validation - Collection & Predicate Functions

**Location**: `src/validation/`
**Functions**: 22
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### hasProperty

- **Current**: `<T extends string>(name: T) => (obj: unknown) => obj is Record<string, unknown> & { [K in T]: unknown }`
- **Returns**: Curried function returning type guard boolean
- **Description**: [INFERRED] Type guard that checks if an object has a specific property by name
- **Target**: `<T extends string>(name: T) => (obj: unknown) => Result<ValidationError, Record<string, unknown> & { [K in T]: unknown }>`

### hasMethod

- **Current**: `<T extends string>(name: T) => (obj: unknown) => obj is Record<string, unknown> & { [K in T]: (...args: Array<unknown>) => unknown }`
- **Returns**: Curried function returning type guard boolean
- **Description**: [INFERRED] Type guard that checks if an object has a specific method by name (property that is a function)
- **Target**: `<T extends string>(name: T) => (obj: unknown) => Result<ValidationError, Record<string, unknown> & { [K in T]: (...args: Array<unknown>) => unknown }>`

### isEmpty

- **Current**: `(value: unknown) => boolean`
- **Returns**: Boolean
- **Description**: Checks if a value is empty based on its type (null, undefined, empty string/array/object/Map/Set)
- **Target**: `(value: unknown) => Result<ValidationError, EmptyValue>`

### isNotEmpty

- **Current**: `(value: unknown) => boolean`
- **Returns**: Boolean
- **Description**: Checks if a value is not empty based on its type
- **Target**: `(value: unknown) => Result<ValidationError, NonEmptyValue>`

### allPass

- **Current**: `<T>(predicates: Array<(value: T) => boolean>) => (value: T) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Creates a predicate that returns true if all supplied predicates return true
- **Target**: `<T>(predicates: Array<(value: T) => Result<ValidationError, T>>) => (value: T) => Result<ValidationError, T>`

### anyPass

- **Current**: `<T>(predicates: Array<(value: T) => unknown>) => (value: T) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Creates a predicate that returns true if any supplied predicate returns true
- **Target**: `<T>(predicates: Array<(value: T) => Result<ValidationError, T>>) => (value: T) => Result<ValidationError, T>`

### both

- **Current**: `<T>(pred1: (value: T) => unknown) => (pred2: (value: T) => unknown) => (value: T) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Creates a predicate that returns true if both supplied predicates return true
- **Target**: `<T>(pred1: (value: T) => Result<ValidationError, T>) => (pred2: (value: T) => Result<ValidationError, T>) => (value: T) => Result<ValidationError, T>`

### either

- **Current**: `<T>(pred1: (value: T) => unknown) => (pred2: (value: T) => unknown) => (value: T) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Creates a predicate that returns true if either supplied predicate returns true
- **Target**: `<T>(pred1: (value: T) => Result<ValidationError, T>) => (pred2: (value: T) => Result<ValidationError, T>) => (value: T) => Result<ValidationError, T>`

### neither

- **Current**: `<T>(predA: (value: T) => boolean, predB: (value: T) => boolean) => (value: T) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: neither(A, B) — returns true only when both predicates are false
- **Target**: `<T>(predA: (value: T) => Result<ValidationError, T>) => (predB: (value: T) => Result<ValidationError, T>) => (value: T) => Result<ValidationError, T>`

### nonePass

- **Current**: `<T>(predicates: Array<(value: T) => boolean>) => (value: T) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Creates a predicate that returns true if none of the supplied predicates return true
- **Target**: `<T>(predicates: Array<(value: T) => Result<ValidationError, T>>) => (value: T) => Result<ValidationError, T>`

### not

- **Current**: `<T>(value: T) => boolean`
- **Returns**: Boolean
- **Description**: Logical NOT — boolean negation of a value's truthiness
- **Target**: `<T>(value: T) => Result<ValidationError, T>`

### equals

- **Current**: `<T>(a: T) => <U>(b: U) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Performs deep equality comparison between two values (alias of isEqual)
- **Target**: `<T>(a: T) => <U>(b: U) => Result<ValidationError, T>`

### isEqual

- **Current**: `<T>(a: T) => <U>(b: U) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Performs deep equality comparison between two values
- **Target**: `<T>(a: T) => <U>(b: U) => Result<ValidationError, T>`

### isUnequal

- **Current**: `<T>(a: T) => (b: unknown) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Checks if two values are not deeply equal (negation of isEqual)
- **Target**: `<T>(a: T) => (b: unknown) => Result<ValidationError, T>`

### minLength (should be `hasMinLength`, right?)

- **Current**: `(min: number) => (value: unknown) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Validates that a value with a length property has minimum length >= min
- **Target**: `(min: number) => (value: unknown) => Result<ValidationError, ArrayLike<unknown>>`

### maxLength (should be `hasMaxLength`)

- **Current**: `(max: number) => (value: unknown) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: maxLength(max)(value) — validates length <= max for strings/arrays/array-like
- **Target**: `(max: number) => (value: unknown) => Result<ValidationError, ArrayLike<unknown>>`

### matches

- **Current**: `(pattern: RegExp | string) => (value: unknown) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: matches(pattern)(value) — RegExp/string pattern predicate for strings
- **Target**: `(pattern: RegExp | string) => (value: unknown) => Result<ValidationError, string>`

### validateWith (let's make this `validateWithPredicate` to be clearer)

- **Current**: `<T>(predicate: (value: T) => boolean) => (errorMsg: string) => (value: T) => T | null`
- **Returns**: Curried function returning value or null
- **Description**: Validates a value with a predicate, returns value if valid or null if invalid
- **Target**: `<T>(predicate: (value: T) => Result<ValidationError, T>) => (errorMsg: string) => (value: T) => Result<ValidationError, T>`

### isBlank

- **Current**: `(str: string | null | undefined) => boolean`
- **Returns**: Boolean
- **Description**: Checks if a string is empty or contains only whitespace
- **Target**: `(str: string | null | undefined) => Result<ValidationError, EmptyString>`

### isNonEmptyString

- **Current**: `(value: unknown) => value is string`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is a non-empty string primitive
- **Target**: `(value: unknown) => Result<ValidationError, string>`

### isRequired (what does this mean?)

- **Current**: `(options: RequiredOptions) => (value: unknown) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Required predicate — present and non-empty (configurable by type)
- **Target**: `(options: RequiredOptions) => (value: unknown) => Result<ValidationError, NonNullable<unknown>>`

### validateRange

- **Current**: `(options: RangeOptions) => (value: unknown) => boolean | RangeResult`
- **Returns**: Curried function returning boolean or detailed result object
- **Description**: Range validator — number/string/array/date with inclusive/exclusive and detailed options
- **Target**: `(options: RangeOptions) => (value: unknown) => Result<ValidationError, number | string | Date | Array<unknown>>`

---

## Migration Notes

Collection and predicate validators will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when validation succeeds
2. Return `error(ValidationError)` when validation fails, with descriptive error messages
3. Maintain currying for all parameterized functions
4. Support composability through monadic chaining
5. Convert predicate combinators (allPass, anyPass, both, either, neither, nonePass) to work with Result-returning validators instead of boolean predicates

## Special Considerations

### Predicate Combinators

Functions like `allPass`, `anyPass`, `both`, `either`, `neither`, and `nonePass` currently accept boolean-returning predicates. In the monadic version, they should:

- Accept Result-returning validators
- Combine validation results appropriately
- Provide comprehensive error messages when multiple validations fail

### Empty/Non-Empty Checks

- **isEmpty** and **isNotEmpty** handle multiple types (strings, arrays, objects, Maps, Sets, WeakMaps, WeakSets)
- WeakMap and WeakSet are treated as non-empty if they exist (since size cannot be checked)
- Both functions use arrow syntax and need refactoring to named functions

### Length Validators

- **minLength** and **maxLength** work with any value having a numeric length property
- Return false for null/undefined instead of throwing
- Use arrow syntax and need refactoring

### String Validators

- **isBlank** specifically checks for whitespace-only strings
- **isNonEmptyString** combines type guard with emptiness check
- **matches** supports both RegExp instances and string patterns

### Complex Validators

- **isRequired** accepts options to customize validation behavior (allowWhitespace, minLength, minSize)
- **validateRange** can return either boolean or detailed RangeResult object based on `detailed` option
- **validateWith** is a higher-order function that creates validators from predicates

### Equality Functions

- **equals** is an alias of **isEqual**
- **isEqual** performs deep equality with circular reference detection using WeakMap
- **isUnequal** is the negation of isEqual

### Syntax Issues

- **neither** uses arrow syntax and currying style inconsistent with other functions
- **nonePass** uses arrow syntax and Array.some internally
- **not** is a simple arrow function
- All need refactoring to use function keyword and eliminate loops
