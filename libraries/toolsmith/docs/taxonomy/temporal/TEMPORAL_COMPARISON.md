# Temporal Comparison Functions

Comparison functions evaluate relationships between Temporal objects, returning booleans, numbers, or Duration values.

## Direct Comparison Functions

### compare

**Current Signature:**

```typescript
function compare<T extends { compare(other: T): number }>(
	first: T | null | undefined
): function compareWith(
	second: T | null | undefined
): number | null
```

**TC39 Temporal API Usage:**

- `first.compare(second)`

**Description:**
Compares two Temporal objects using their built-in compare method. Returns negative if first < second, zero if equal, positive if first > second.

**Target Monadic Signature:**

```typescript
function compare<T extends Comparable<T>>(
	first: T
): function compareWith(
	second: T
): Result<Ordering, ComparisonError>

type Comparable<T> = {
	readonly compare: (other: T) => number
}

type Ordering = -1 | 0 | 1
```

---

### equals

**Current Signature:**

```typescript
function equals<T extends { equals(other: T): boolean }>(
	first: T | null | undefined
): function checkEquality(
	second: T | null | undefined
): boolean
```

**TC39 Temporal API Usage:**

- `first.equals(second)`

**Description:**
Checks if two Temporal objects are equal using their built-in equals method.

**Target Monadic Signature:**

```typescript
function equals<T extends Equatable<T>>(
	first: T
): function checkEquality(
	second: T
): boolean

type Equatable<T> = {
	readonly equals: (other: T) => boolean
}
```

---

## Difference Functions

### diffDays

**Current Signature:**

```typescript
function diffDays(
	from: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined
): function calculateDaysTo(
	to: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined
): number | null
```

**TC39 Temporal API Usage:**

- `from.toPlainDate()` (for PlainDateTime)
- `toDate.since(fromDate, { largestUnit: "days" })`
- `duration.days`

**Description:**
Calculates the difference in days between two dates. Converts PlainDateTime to PlainDate before comparison.

**Target Monadic Signature:**

```typescript
function diffDays(
	from: Temporal.PlainDate | Temporal.PlainDateTime
): function calculateDaysTo(
	to: Temporal.PlainDate | Temporal.PlainDateTime
): Result<number, ComparisonError>
```

---

### diffHours

**Current Signature:**

```typescript
function diffHours(
	from: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): function calculateHoursTo(
	to: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): number | null
```

**TC39 Temporal API Usage:**

- `to.since(from, { largestUnit: "hours" })`
- Manual nanosecond calculation for PlainTime

**Description:**
Calculates the difference in hours (as decimal number) between two times or datetimes.

**Target Monadic Signature:**

```typescript
function diffHours(
	from: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime
): function calculateHoursTo(
	to: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<number, ComparisonError>
```

---

### diffMinutes

**Current Signature:**

```typescript
function diffMinutes(
	from: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): function calculateMinutesTo(
	to: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): number | null
```

**TC39 Temporal API Usage:**

- `to.since(from, { largestUnit: "minutes" })`
- Manual nanosecond calculation for PlainTime

**Description:**
Calculates the difference in minutes (as decimal number) between two times or datetimes.

**Target Monadic Signature:**

```typescript
function diffMinutes(
	from: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime
): function calculateMinutesTo(
	to: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<number, ComparisonError>
```

---

### diffSeconds

**Current Signature:**

```typescript
function diffSeconds(
	from: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): function calculateSecondsTo(
	to: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): number | null
```

**TC39 Temporal API Usage:**

- `to.since(from, { largestUnit: "seconds" })`
- Manual nanosecond calculation for PlainTime

**Description:**
Calculates the difference in seconds (as decimal number) between two times or datetimes.

**Target Monadic Signature:**

```typescript
function diffSeconds(
	from: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime
): function calculateSecondsTo(
	to: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<number, ComparisonError>
```

---

### diffMonths

**Current Signature:**

```typescript
function diffMonths(
	from: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | null | undefined
): function calculateMonthsTo(
	to: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | null | undefined
): number | null
```

**TC39 Temporal API Usage:**

- `to.since(from, { largestUnit: "months" })`
- `duration.months`

**Description:**
Calculates the difference in months between two dates.

**Target Monadic Signature:**

```typescript
function diffMonths(
	from: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth
): function calculateMonthsTo(
	to: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth
): Result<number, ComparisonError>
```

---

### diffYears

**Current Signature:**

```typescript
function diffYears(
	from: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | null | undefined
): function calculateYearsTo(
	to: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | null | undefined
): number | null
```

**TC39 Temporal API Usage:**

- `to.since(from, { largestUnit: "years" })`
- `duration.years`

**Description:**
Calculates the difference in years between two dates.

**Target Monadic Signature:**

```typescript
function diffYears(
	from: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth
): function calculateYearsTo(
	to: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth
): Result<number, ComparisonError>
```

---

## Duration Calculation Functions

### since

**Current Signature:**

```typescript
function since(
	reference: Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| null
		| undefined
): function calculateDurationSince(
	current: Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| null
		| undefined
): Temporal.Duration | null
```

**TC39 Temporal API Usage:**

- `reference.until(current)`
- `Temporal.Duration.from({ seconds: 0 })` (for negative durations)
- Special PlainTime handling for day wrapping

**Description:**
Calculates the duration from reference to current. Returns zero duration if reference is in the future. For PlainTime, handles day wrapping.

**Target Monadic Signature:**

```typescript
function since(
	reference: Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
): function calculateDurationSince(
	current: Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
): Result<Temporal.Duration, ComparisonError>
```

---

### until

**Current Signature:**

```typescript
function until(
	target: Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| null
		| undefined
): function calculateDurationUntil(
	current: Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| null
		| undefined
): Temporal.Duration | null
```

**TC39 Temporal API Usage:**

- `current.until(target)`
- Special PlainTime handling for day wrapping

**Description:**
Calculates the duration from current to target. For PlainTime, handles day wrapping when target is earlier than current.

**Target Monadic Signature:**

```typescript
function until(
	target: Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
): function calculateDurationUntil(
	current: Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
): Result<Temporal.Duration, ComparisonError>
```

---

## Predicate Functions

### isLeapYear

**Current Signature:**

```typescript
function isLeapYear(
	yearOrDate:
		| number
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime
		| null
		| undefined,
): boolean
```

**TC39 Temporal API Usage:**

- `yearOrDate.daysInYear === 366` (for Temporal objects)
- Leap year calculation algorithm for number input

**Description:**
Checks if a year is a leap year. Accepts either a year number or a Temporal date object.

**Target Monadic Signature:**

```typescript
function isLeapYear(
	yearOrDate:
		| number
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime,
): boolean
```

---

### isWeekday

**Current Signature:**

```typescript
function isWeekday(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): boolean
```

**TC39 Temporal API Usage:**

- `date.dayOfWeek`

**Description:**
Checks if a date falls on a weekday (Monday-Friday, dayOfWeek 1-5).

**Target Monadic Signature:**

```typescript
function isWeekday(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
): boolean
```

---

### isWeekend

**Current Signature:**

```typescript
function isWeekend(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): boolean
```

**TC39 Temporal API Usage:**

- `date.dayOfWeek`

**Description:**
Checks if a date falls on a weekend (Saturday-Sunday, dayOfWeek 6-7).

**Target Monadic Signature:**

```typescript
function isWeekend(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
): boolean
```

---

## Sorting Functions

### sortByAbsoluteTime

**Current Signature:**

```typescript
function sortByAbsoluteTime(
	timeZone: string = "UTC"
): function compareByAbsoluteTime(
	a: Temporal.Instant | Temporal.ZonedDateTime | Temporal.PlainDateTime | null | undefined,
	b: Temporal.Instant | Temporal.ZonedDateTime | Temporal.PlainDateTime | null | undefined
): number
```

**TC39 Temporal API Usage:**

- `a.toInstant()` (for ZonedDateTime)
- `a.toZonedDateTime(timeZone).toInstant()` (for PlainDateTime)
- `Temporal.Instant.compare(instantA, instantB)`

**Description:**
Comparator function for sorting temporal values by absolute time (converted to Instant). Null values sort to end.

**Target Monadic Signature:**

```typescript
function sortByAbsoluteTime(
	timeZone: TimeZone
): function compareByAbsoluteTime(
	a: Option<Temporal.Instant | Temporal.ZonedDateTime | Temporal.PlainDateTime>,
	b: Option<Temporal.Instant | Temporal.ZonedDateTime | Temporal.PlainDateTime>
): Ordering

type TimeZone = string
type Ordering = -1 | 0 | 1
```

---

## Summary

Total Comparison Functions: 14

- **Direct Comparison**: compare, equals (2)
- **Difference (numeric)**: diffDays, diffHours, diffMinutes, diffSeconds, diffMonths, diffYears (6)
- **Duration Calculation**: since, until (2)
- **Predicates**: isLeapYear, isWeekday, isWeekend (3)
- **Sorting**: sortByAbsoluteTime (1)

All comparison functions are pure and side-effect free, returning values that describe relationships between Temporal objects without modifying them.

Note: Several getter functions like `getMillisecond` were originally categorized here but belong in the formatting category as they extract/format information rather than compare values.
