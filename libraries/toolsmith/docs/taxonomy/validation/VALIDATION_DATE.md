# Validation - Date/Temporal Functions

**Location**: `src/validation/`
**Functions**: 28
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### isAfterDate

- **Current**: `(reference: DateInput | null | undefined) => (date: DateInput | null | undefined) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Checks if a date is after another date
- **Target**: `(reference: DateInput | null | undefined) => (date: DateInput | null | undefined) => Result<ValidationError, Temporal.PlainDate>`

### isAfterDateTime

- **Current**: `(reference: DateTimeInput | null | undefined) => (datetime: DateTimeInput | null | undefined) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Checks if a datetime is after another datetime
- **Target**: `(reference: DateTimeInput | null | undefined) => (datetime: DateTimeInput | null | undefined) => Result<ValidationError, Temporal.PlainDateTime>`

### isAfterInstant

- **Current**: `(reference: InstantInput | null | undefined) => (instant: InstantInput | null | undefined) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Checks if an instant is after another instant
- **Target**: `(reference: InstantInput | null | undefined) => (instant: InstantInput | null | undefined) => Result<ValidationError, Temporal.Instant>`

### isAfterTime

- **Current**: `(reference: TimeInput | null | undefined) => (time: TimeInput | null | undefined) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Checks if a time is after another time
- **Target**: `(reference: TimeInput | null | undefined) => (time: TimeInput | null | undefined) => Result<ValidationError, Temporal.PlainTime>`

### isBeforeDate

- **Current**: `(reference: DateInput | null | undefined) => (date: DateInput | null | undefined) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Checks if a date is before another date
- **Target**: `(reference: DateInput | null | undefined) => (date: DateInput | null | undefined) => Result<ValidationError, Temporal.PlainDate>`

### isBeforeDateTime

- **Current**: `(reference: DateTimeInput | null | undefined) => (datetime: DateTimeInput | null | undefined) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Checks if a datetime is before another datetime
- **Target**: `(reference: DateTimeInput | null | undefined) => (datetime: DateTimeInput | null | undefined) => Result<ValidationError, Temporal.PlainDateTime>`

### isBeforeInstant

- **Current**: `(reference: InstantInput | null | undefined) => (instant: InstantInput | null | undefined) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Checks if an instant is before another instant
- **Target**: `(reference: InstantInput | null | undefined) => (instant: InstantInput | null | undefined) => Result<ValidationError, Temporal.Instant>`

### isBeforeTime

- **Current**: `(reference: TimeInput | null | undefined) => (time: TimeInput | null | undefined) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Checks if a time is before another time
- **Target**: `(reference: TimeInput | null | undefined) => (time: TimeInput | null | undefined) => Result<ValidationError, Temporal.PlainTime>`

### isBetweenDates

- **Current**: `(startDate: DateInput | null | undefined) => (endDate: DateInput | null | undefined) => (date: DateInput | null | undefined) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Checks if a date is between two other dates (inclusive)
- **Target**: `(startDate: DateInput | null | undefined) => (endDate: DateInput | null | undefined) => (date: DateInput | null | undefined) => Result<ValidationError, Temporal.PlainDate>`

### isBetweenDateTimes

- **Current**: `(startDateTime: DateTimeInput | null | undefined) => (endDateTime: DateTimeInput | null | undefined) => (datetime: DateTimeInput | null | undefined) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Checks if a datetime is between two other datetimes (inclusive)
- **Target**: `(startDateTime: DateTimeInput | null | undefined) => (endDateTime: DateTimeInput | null | undefined) => (datetime: DateTimeInput | null | undefined) => Result<ValidationError, Temporal.PlainDateTime>`

### isBetweenTimes

- **Current**: `(startTime: TimeInput | null | undefined) => (endTime: TimeInput | null | undefined) => (time: TimeInput | null | undefined) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Checks if a time is between two other times (inclusive, handles overnight ranges)
- **Target**: `(startTime: TimeInput | null | undefined) => (endTime: TimeInput | null | undefined) => (time: TimeInput | null | undefined) => Result<ValidationError, Temporal.PlainTime>`

### isFutureDate

- **Current**: `(value: DateInput | null | undefined) => boolean`
- **Returns**: Boolean
- **Description**: Checks if a date is in the future relative to today (strictly after today)
- **Target**: `(value: DateInput | null | undefined) => Result<ValidationError, Temporal.PlainDate>`

### isFutureDateTime

- **Current**: `(value: DateTimeInput | null | undefined) => boolean`
- **Returns**: Boolean
- **Description**: Checks if a datetime is in the future relative to the current moment
- **Target**: `(value: DateTimeInput | null | undefined) => Result<ValidationError, Temporal.PlainDateTime>`

### isFutureInstant

- **Current**: `(value: unknown) => () => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Checks if an instant is in the future relative to the current moment
- **Target**: `(value: unknown) => Result<ValidationError, Temporal.Instant>`

### isInstant

- **Current**: `(value: unknown) => value is Temporal.Instant`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is a Temporal.Instant instance (exact moment in time)
- **Target**: `(value: unknown) => Result<ValidationError, Temporal.Instant>`

### isPastDate

- **Current**: `(value: DateInput | null | undefined) => boolean`
- **Returns**: Boolean
- **Description**: [INFERRED] Checks if a date is in the past relative to today
- **Target**: `(value: DateInput | null | undefined) => Result<ValidationError, Temporal.PlainDate>`

### isPastDateTime

- **Current**: `(value: DateTimeInput | null | undefined) => boolean`
- **Returns**: Boolean
- **Description**: [INFERRED] Checks if a datetime is in the past relative to the current moment
- **Target**: `(value: DateTimeInput | null | undefined) => Result<ValidationError, Temporal.PlainDateTime>`

### isPastInstant

- **Current**: `(value: unknown) => boolean`
- **Returns**: Boolean
- **Description**: [INFERRED] Checks if an instant is in the past relative to the current moment
- **Target**: `(value: unknown) => Result<ValidationError, Temporal.Instant>`

### isPlainDate

- **Current**: `(value: unknown) => value is Temporal.PlainDate`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is a Temporal.PlainDate instance
- **Target**: `(value: unknown) => Result<ValidationError, Temporal.PlainDate>`

### isPlainDateTime

- **Current**: `(value: unknown) => value is Temporal.PlainDateTime`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is a Temporal.PlainDateTime instance
- **Target**: `(value: unknown) => Result<ValidationError, Temporal.PlainDateTime>`

### isPlainTime

- **Current**: `(value: unknown) => value is Temporal.PlainTime`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is a Temporal.PlainTime instance
- **Target**: `(value: unknown) => Result<ValidationError, Temporal.PlainTime>`

### isSameOrAfterDate

- **Current**: `(reference: DateInput | null | undefined) => (date: DateInput | null | undefined) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Checks if a date is the same as or after another date
- **Target**: `(reference: DateInput | null | undefined) => (date: DateInput | null | undefined) => Result<ValidationError, Temporal.PlainDate>`

### isSameOrAfterDateTime

- **Current**: `(reference: DateTimeInput | null | undefined) => (datetime: DateTimeInput | null | undefined) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Checks if a datetime is the same as or after another datetime
- **Target**: `(reference: DateTimeInput | null | undefined) => (datetime: DateTimeInput | null | undefined) => Result<ValidationError, Temporal.PlainDateTime>`

### isSameOrAfterTime

- **Current**: `(reference: TimeInput | null | undefined) => (time: TimeInput | null | undefined) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Checks if a time is the same as or after another time
- **Target**: `(reference: TimeInput | null | undefined) => (time: TimeInput | null | undefined) => Result<ValidationError, Temporal.PlainTime>`

### isSameOrBeforeDate

- **Current**: `(reference: DateInput | null | undefined) => (date: DateInput | null | undefined) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Checks if a date is the same as or before another date
- **Target**: `(reference: DateInput | null | undefined) => (date: DateInput | null | undefined) => Result<ValidationError, Temporal.PlainDate>`

### isSameOrBeforeDateTime

- **Current**: `(reference: DateTimeInput | null | undefined) => (datetime: DateTimeInput | null | undefined) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Checks if a datetime is the same as or before another datetime
- **Target**: `(reference: DateTimeInput | null | undefined) => (datetime: DateTimeInput | null | undefined) => Result<ValidationError, Temporal.PlainDateTime>`

### isSameOrBeforeTime

- **Current**: `(reference: TimeInput | null | undefined) => (time: TimeInput | null | undefined) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Checks if a time is the same as or before another time
- **Target**: `(reference: TimeInput | null | undefined) => (time: TimeInput | null | undefined) => Result<ValidationError, Temporal.PlainTime>`

### isValidDate

- **Current**: `(value: DateInput | null | undefined) => boolean`
- **Returns**: Boolean
- **Description**: Valid date check — true when value converts to a real calendar date
- **Target**: `(value: DateInput | null | undefined) => Result<ValidationError, Temporal.PlainDate>`

### isZonedDateTime

- **Current**: `(value: unknown) => value is Temporal.ZonedDateTime`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is a Temporal.ZonedDateTime instance (datetime with timezone)
- **Target**: `(value: unknown) => Result<ValidationError, Temporal.ZonedDateTime>`

---

## Migration Notes

Date/temporal validation functions will be converted to Result-returning validators that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when validation succeeds (with proper temporal type narrowing)
2. Return `error(ValidationError)` when validation fails, with descriptive error messages
3. Maintain currying for comparison functions
4. Preserve temporal type safety while adding error context
5. Handle Temporal API exceptions gracefully within the Result monad

## Special Considerations

### Type Guards

- **isPlainDate**, **isPlainDateTime**, **isPlainTime**, **isInstant**, **isZonedDateTime** are type guards and should return Result with proper type narrowing

### Arrow Functions Requiring Refactoring

- **isPastDate**, **isPastInstant**, **isSameOrAfterDate**, **isSameOrAfterTime**, **isSameOrBeforeDate**, **isSameOrBeforeTime**, **isSameOrAfterDateTime**, **isSameOrBeforeDateTime** use arrow function syntax and need conversion to named functions

### Temporal API Integration

- All functions use the TC39 Temporal API (not legacy Date objects)
- Functions handle Temporal.PlainDate, Temporal.PlainDateTime, Temporal.PlainTime, Temporal.Instant, and Temporal.ZonedDateTime
- Comparison functions use Temporal's built-in compare methods
- Error handling wraps Temporal API exceptions

### Range Validation Behavior

- **isBetweenDates** and **isBetweenDateTimes** validate that start <= end before checking if value is in range
- **isBetweenTimes** handles overnight ranges (e.g., 22:00 to 02:00) using OR logic instead of AND

### Current Moment Comparisons

- **isFutureDate**, **isFutureDateTime**, **isFutureInstant** compare against the current moment using Temporal.Now
- **isPastDate**, **isPastDateTime**, **isPastInstant** compare against the current moment using Temporal.Now
- These functions have IO effects and should be marked as such in monadic versions

### Missing Documentation

Functions marked [INFERRED] have `//--` refactor comments instead of `//++` descriptions and need documentation updates

### Inconsistent Currying

- **isFutureInstant** takes a value but returns a curried function that takes no arguments (unusual pattern)
- Should be simplified to a single function call in monadic version
