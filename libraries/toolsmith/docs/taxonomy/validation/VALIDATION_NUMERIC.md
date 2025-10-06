# Validation - Numeric Functions

**Location**: `src/vanilla/validation/`
**Functions**: 21
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

We should include the branded type guards in here: `isBigInteger`, `isRealNumber`, `hasTwoDecimalPlaces`, etc.

### isInteger
- **Current**: `(value: unknown) => value is number`
- **Returns**: Type guard boolean
- **Description**: Checks if a value is an integer (whole number with no fractional component)
- **Target**: `(value: unknown) => Result<ValidationError, number>`

### isFinite
- **Current**: `(value: unknown) => value is number`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is a finite number (not Infinity, -Infinity, or NaN)
- **Target**: `(value: unknown) => Result<ValidationError, number>`

### isInfinite
- **Current**: `(value: unknown) => value is number`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is infinite (positive or negative Infinity)
- **Target**: `(value: unknown) => Result<ValidationError, number>`

### isPositiveInfinity
- **Current**: `(value: unknown) => value is number`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is positive Infinity
- **Target**: `(value: unknown) => Result<ValidationError, number>`

### isNegativeInfinity
- **Current**: `(value: unknown) => value is number`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is negative Infinity
- **Target**: `(value: unknown) => Result<ValidationError, number>`

### isNaN
- **Current**: `(value: unknown) => value is number`
- **Returns**: Type guard boolean
- **Description**: [INFERRED] Type guard that checks if a value is NaN (Not-a-Number)
- **Target**: `(value: unknown) => Result<ValidationError, number>`

### isPositive
- **Current**: `(value: unknown) => boolean`
- **Returns**: Boolean (not a type guard)
- **Description**: [INFERRED] Checks if a value is a positive finite number (greater than 0)
- **Target**: `(value: unknown) => Result<ValidationError, number>`

### isNegative
- **Current**: `(value: unknown) => boolean`
- **Returns**: Boolean (not a type guard)
- **Description**: [INFERRED] Checks if a value is a negative finite number (less than 0, excluding -0)
- **Target**: `(value: unknown) => Result<ValidationError, number>`

### isZero
- **Current**: `(value: unknown) => value is number`
- **Returns**: Type guard boolean
- **Description**: [INFERRED] Type guard that checks if a value is exactly zero (0 or -0)
- **Target**: `(value: unknown) => Result<ValidationError, number>`

### isNonZero
- **Current**: `(value: unknown) => value is number`
- **Returns**: Type guard boolean
- **Description**: [INFERRED] Type guard that checks if a value is a number but not zero
- **Target**: `(value: unknown) => Result<ValidationError, number>`

### isEven
- **Current**: `(value: unknown) => boolean`
- **Returns**: Boolean (not a type guard)
- **Description**: Checks if a value is an even integer (divisible by 2 with no remainder)
- **Target**: `(value: unknown) => Result<ValidationError, number>`

### isOdd
- **Current**: `(value: unknown) => boolean`
- **Returns**: Boolean (not a type guard)
- **Description**: [INFERRED] Checks if a value is an odd integer (not divisible by 2)
- **Target**: `(value: unknown) => Result<ValidationError, number>`

### isNumeric
- **Current**: `(options?: NumericOptions) => (value: unknown) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Checks if a string value represents a numeric value with configurable options (allowNegative, allowDecimal, allowScientific)
- **Target**: `(options?: NumericOptions) => (value: unknown) => Result<ValidationError, string>`

### gt (greater than — should also have `isGreaterThan` with this an alias)
- **Current**: `<T>(threshold: T) => <U extends T>(value: U) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Creates a predicate that checks if a value is greater than a threshold
- **Target**: `<T>(threshold: T) => <U extends T>(value: U) => Result<ValidationError, U>`

### gte (greater than or equal — should also have `isGreaterThanOrEqual` with this an alias)
- **Current**: `<T>(threshold: T) => <U extends T>(value: U) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Creates a predicate that checks if a value is greater than or equal to a threshold
- **Target**: `<T>(threshold: T) => <U extends T>(value: U) => Result<ValidationError, U>`

### lt (less than — should also have `isLessThan` with this an alias)
- **Current**: `<T>(threshold: T) => (value: T) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Creates a predicate that checks if a value is less than a threshold
- **Target**: `<T>(threshold: T) => (value: T) => Result<ValidationError, T>`

### lte (less than or equal — should also have `isLessThanOrEqual` with this an alias)
- **Current**: `<T>(threshold: T) => <U extends T>(value: U) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Creates an inclusive <= comparison predicate
- **Target**: `<T>(threshold: T) => <U extends T>(value: U) => Result<ValidationError, U>`

### isEqual (do we have more than one of these?)
- **Current**: `<T>(a: T) => <U>(b: U) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Performs deep equality comparison between two values
- **Target**: `<T>(a: T) => <U>(b: U) => Result<ValidationError, T>`

### equals
- **Current**: Alias of isEqual
- **Returns**: Curried function returning boolean
- **Description**: Performs deep equality comparison between two values (alias of isEqual)
- **Target**: `<T>(a: T) => <U>(b: U) => Result<ValidationError, T>`

### isUnequal (do we need a `doesNotEqual` alias?)
- **Current**: `<T>(a: T) => (b: unknown) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Checks if two values are not deeply equal
- **Target**: `<T>(a: T) => (b: unknown) => Result<ValidationError, T>`

### validateRange (is this listed more than once?)
- **Current**: `(options: RangeOptions) => (value: unknown) => boolean | RangeResult`
- **Returns**: Curried function returning boolean or detailed RangeResult
- **Description**: Range validator for number/string/array/date with inclusive/exclusive bounds and detailed options including min, max, step, type validation
- **Target**: `(options: RangeOptions) => (value: unknown) => Result<ValidationError, number | string | Array<unknown> | Date>`

---

## Migration Notes

Numeric validators will be converted to Result-returning validators that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when validation succeeds (with proper type narrowing where applicable)
2. Return `error(ValidationError)` when validation fails, with descriptive error messages
3. Maintain currying for functions like `gt`, `gte`, `lt`, `lte`, `isEqual`, `isUnequal`, `isNumeric`, and `validateRange`
4. Preserve type safety while adding error context
5. Support generic types for comparison operators (gt, gte, lt, lte) to work with any comparable type

## Special Considerations

### Type Guards vs Boolean Returns
- **isInteger**, **isFinite**, **isInfinite**, **isPositiveInfinity**, **isNegativeInfinity**, **isNaN**, **isZero**, **isNonZero** are type guards that narrow to `number`
- **isPositive**, **isNegative**, **isEven**, **isOdd** return plain booleans but should become type guards in monadic form
- All should return `Result<ValidationError, number>` in monadic form

### Arrow Function Syntax
Several functions use arrow syntax and need refactoring to named functions:
- **isPositive** (arrow function)
- **isOdd** (arrow function)
- **isNaN** (arrow function)
- **lt** (arrow function)

### Complex Validators

#### isNumeric
- Takes optional configuration object: `{ allowNegative?: boolean, allowDecimal?: boolean, allowScientific?: boolean }`
- Validates string representations of numbers (not number primitives)
- Uses regex patterns built dynamically based on options
- Should return `Result<ValidationError, string>` since it validates strings

#### validateRange
- Highly configurable range validator supporting multiple types (number, string, array, date, time, integer)
- Options include: `{ min?, max?, exclusive?, type?, step?, detailed?, messages? }`
- Can return either boolean or detailed RangeResult based on `detailed` option
- Validates length for strings and arrays
- Supports step validation for numbers
- Should return `Result<ValidationError, T>` where T depends on the type option

### Comparison Operators
- **gt**, **gte**, **lt**, **lte** are generic and work with any comparable types (not just numbers)
- Use standard JavaScript comparison operators (`>`, `>=`, `<`, `<=`)
- Should maintain generic type parameters in monadic form

### Equality Comparisons
- **isEqual** / **equals** perform deep equality comparison (handles nested objects, arrays, circular references)
- **isUnequal** is the negation of isEqual
- Work with any types, not just numbers
- Should maintain generic type parameters in monadic form

### Special Numeric Values
- **isNegative** explicitly excludes `-0` using `Object.is` comparison
- **isNaN** uses `Number.isNaN` (not the global `isNaN` which coerces)
- **isFinite** uses `Number.isFinite` (excludes NaN, Infinity, -Infinity)

### Missing Functions
- **isSafeInteger**: Not currently implemented but would check if a value is within JavaScript's safe integer range (Number.MIN_SAFE_INTEGER to Number.MAX_SAFE_INTEGER)
- Consider implementing when migrating to monadic form

---

## Implementation Dependencies

Many numeric validators depend on other validators and logic functions:
- **isNegative**: depends on `isNumber`, `isFinite`, `lt`, `is`, `and`, `not`
- **isZero**: depends on `isNumber`, `isEqual`, `and`
- **isNonZero**: depends on `isNumber`, `isUnequal`, `and`
- **isInfinite**: depends on `isPositiveInfinity`, `isNegativeInfinity`, `or`
- **isPositiveInfinity**: depends on `isEqual`
- **isNegativeInfinity**: depends on `isEqual`
- **isUnequal**: depends on `isEqual`, `not`

These dependencies should be considered when planning migration order.
