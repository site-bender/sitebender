# Temporal Creation Functions

Creation functions instantiate new Temporal objects from various sources or convert between Temporal types.

## Core Creation Functions

### now

**Current Signature:**
```typescript
function now(): Temporal.Instant
```

**TC39 Temporal API Usage:**
- `Temporal.Now.instant()`

**Description:**
Returns the current UTC instant in time.

**Target Monadic Signature:**
```typescript
function now(
	context: IOContext
): function nowInContext(): IO<Temporal.Instant>
```

---

### today

**Current Signature:**
```typescript
function today(): Temporal.PlainDate
```

**TC39 Temporal API Usage:**
- `Temporal.Now.plainDateISO()`

**Description:**
Returns today's date in the ISO calendar system.

**Target Monadic Signature:**
```typescript
function today(
	context: IOContext
): function todayInContext(): IO<Temporal.PlainDate>
```

---

### fromISO

**Current Signature:**
```typescript
function fromISO(
	isoString: string | null | undefined
): Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.ZonedDateTime
	| Temporal.PlainYearMonth
	| Temporal.Duration
	| Temporal.Instant
	| null
```

**TC39 Temporal API Usage:**
- `Temporal.Duration.from()`
- `Temporal.PlainTime.from()`
- `Temporal.PlainYearMonth.from()`
- `Temporal.PlainDate.from()`
- `Temporal.ZonedDateTime.from()`
- `Temporal.Instant.from()`
- `Temporal.PlainDateTime.from()`

**Description:**
Parses an ISO 8601 string and returns the appropriate Temporal type based on format detection (duration, time, date, datetime, zoned datetime, or instant).

**Target Monadic Signature:**
```typescript
function fromISO(
	isoString: string
): function parseFromISO(): Result<
	| Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.ZonedDateTime
	| Temporal.PlainYearMonth
	| Temporal.Duration
	| Temporal.Instant,
	ParseError
>
```

---

### parse

**Current Signature:**
```typescript
function parse(
	dateString: string | null | undefined
): Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.ZonedDateTime
	| Temporal.Instant
	| Temporal.PlainYearMonth
	| Temporal.PlainMonthDay
	| null
```

**TC39 Temporal API Usage:**
- `Temporal.Instant.from()`
- `Temporal.ZonedDateTime.from()`
- `Temporal.PlainDateTime.from()`
- `Temporal.PlainTime.from()`
- `Temporal.PlainYearMonth.from()`
- `Temporal.PlainMonthDay.from()`
- `Temporal.PlainDate.from()`

**Description:**
Flexible date/time parser that handles multiple formats including US (MM/DD/YYYY), European (DD-MM-YYYY), ISO formats, and time-only strings.

**Target Monadic Signature:**
```typescript
function parse(
	dateString: string
): function parseFlexible(): Result<
	| Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.ZonedDateTime
	| Temporal.Instant
	| Temporal.PlainYearMonth
	| Temporal.PlainMonthDay,
	ParseError
>
```

---

### parseTime

**Current Signature:**
```typescript
function parseTime(
	timeString: string | null | undefined
): Temporal.PlainTime | null
```

**TC39 Temporal API Usage:**
- `Temporal.PlainTime.from()`

**Description:**
Parses time strings supporting 12-hour AM/PM format and 24-hour format with flexible separators (: or .).

**Target Monadic Signature:**
```typescript
function parseTime(
	timeString: string
): function parseTimeString(): Result<Temporal.PlainTime, ParseError>
```

---

## Conversion Functions

### toPlainDate

**Current Signature:**
```typescript
function toPlainDate(
	timeZone?: string
): function convertToPlainDate(
	temporal: Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| Temporal.PlainYearMonth
		| string
		| null
		| undefined
): Temporal.PlainDate | null
```

**TC39 Temporal API Usage:**
- `temporal.toPlainDate()`
- `temporal.withTimeZone(timeZone)`
- `temporal.toZonedDateTimeISO(tz)`
- `Temporal.Now.timeZoneId()`
- `Temporal.PlainDate.from()`
- `Temporal.PlainDateTime.from()`
- `Temporal.Instant.from()`

**Description:**
Converts various Temporal types to PlainDate, optionally using a specified timezone for conversions.

**Target Monadic Signature:**
```typescript
function toPlainDate(
	timeZone: Option<string>
): function convertToPlainDate(
	temporal: Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| Temporal.PlainYearMonth
		| string
): Result<Temporal.PlainDate, ConversionError>
```

---

### toPlainTime

**Current Signature:**
```typescript
function toPlainTime(
	temporal: Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| Temporal.Duration
		| string
		| null
		| undefined
): Temporal.PlainTime | null
```

**TC39 Temporal API Usage:**
- `temporal.toPlainTime()`
- `duration.total({ unit: "nanoseconds" })`
- `Temporal.PlainTime.from()`
- `Temporal.PlainDateTime.from()`
- `Temporal.ZonedDateTime.from()`

**Description:**
Converts various Temporal types to PlainTime. For Duration, wraps at 24 hours.

**Target Monadic Signature:**
```typescript
function toPlainTime(
	temporal: Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| Temporal.Duration
		| string
): Result<Temporal.PlainTime, ConversionError>
```

---

### toPlainDateTime

**Current Signature:**
```typescript
function toPlainDateTime(
	temporal: Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.Instant
		| string
		| null
		| undefined
): Temporal.PlainDateTime | null
```

**TC39 Temporal API Usage:**
- `temporal.toPlainDateTime()`
- `date.toPlainDateTime(time)`
- `Temporal.PlainTime.from("00:00:00")`
- `instant.toZonedDateTimeISO(timeZone)`
- `Temporal.Now.timeZoneId()`
- `Temporal.PlainDateTime.from()`
- `Temporal.PlainDate.from()`
- `Temporal.ZonedDateTime.from()`
- `Temporal.Instant.from()`

**Description:**
Converts various Temporal types to PlainDateTime. Uses midnight for PlainDate, reference date (1970-01-01) for PlainTime, and system timezone for Instant.

**Target Monadic Signature:**
```typescript
function toPlainDateTime(
	temporal: Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.Instant
		| string
): Result<Temporal.PlainDateTime, ConversionError>
```

---

### toZonedDateTime

**Current Signature:**
```typescript
function toZonedDateTime(
	disambiguation: "compatible" | "earlier" | "later" | "reject" = "compatible"
): function toZonedDateTimeWithDisambiguation(
	timeZone: string
): function toZonedDateTimeWithDisambiguationAndTimeZone(
	temporal: Temporal.PlainDateTime
		| Temporal.PlainDate
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| string
		| null
		| undefined
): Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `Temporal.Now.zonedDateTimeISO(timeZone)`
- `temporal.withTimeZone(timeZone)`
- `temporal.toZonedDateTime(timeZone, { disambiguation })`
- `date.toPlainDateTime(time)`
- `Temporal.PlainTime.from("00:00:00")`
- `instant.toZonedDateTimeISO(timeZone)`
- `Temporal.PlainDateTime.from()`
- `Temporal.PlainDate.from()`
- `Temporal.ZonedDateTime.from()`
- `Temporal.Instant.from()`

**Description:**
Converts PlainDateTime to ZonedDateTime with specified timezone and disambiguation strategy for handling DST transitions.

**Target Monadic Signature:**
```typescript
function toZonedDateTime(
	disambiguation: Disambiguation
): function withDisambiguation(
	timeZone: TimeZone
): function convertToZonedDateTime(
	temporal: Temporal.PlainDateTime
		| Temporal.PlainDate
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| string
): Result<Temporal.ZonedDateTime, ConversionError>

type Disambiguation = "compatible" | "earlier" | "later" | "reject"
type TimeZone = string
```

---

## Duration Functions

### duration

**Current Signature:**
```typescript
function duration(
	units: {
		years?: number
		months?: number
		weeks?: number
		days?: number
		hours?: number
		minutes?: number
		seconds?: number
		milliseconds?: number
		microseconds?: number
		nanoseconds?: number
	} | null | undefined
): Temporal.Duration | null
```

**TC39 Temporal API Usage:**
- `Temporal.Duration.from(units)`

**Description:**
Creates a Duration from a units object.

**Target Monadic Signature:**
```typescript
function duration(
	units: DurationUnits
): Result<Temporal.Duration, ValidationError>

type DurationUnits = {
	years?: number
	months?: number
	weeks?: number
	days?: number
	hours?: number
	minutes?: number
	seconds?: number
	milliseconds?: number
	microseconds?: number
	nanoseconds?: number
}
```

---

### durationToMinutes

**Current Signature:**
```typescript
function durationToMinutes(
	duration: Temporal.Duration | null | undefined
): number | null
```

**TC39 Temporal API Usage:**
- `duration.total({ unit: "seconds" })`

**Description:**
Converts a Duration to total minutes as a number.

**Target Monadic Signature:**
```typescript
function durationToMinutes(
	duration: Temporal.Duration
): Result<number, ConversionError>
```

---

### durationToSeconds

**Current Signature:**
```typescript
function durationToSeconds(
	duration: Temporal.Duration | null | undefined
): number | null
```

**TC39 Temporal API Usage:**
- `duration.total({ unit: "seconds" })`

**Description:**
Converts a Duration to total seconds as a number.

**Target Monadic Signature:**
```typescript
function durationToSeconds(
	duration: Temporal.Duration
): Result<number, ConversionError>
```

---

### totalDuration

**Current Signature:**
```typescript
function totalDuration(
	unit: Temporal.DateTimeUnit | string
): function getTotalDurationForUnit(
	duration: Temporal.Duration | null | undefined
): number | null
```

**TC39 Temporal API Usage:**
- `duration.total({ unit: unit as Temporal.DateTimeUnit })`

**Description:**
Converts a Duration to a total value in the specified unit (years, months, weeks, days, hours, minutes, seconds, milliseconds, microseconds, or nanoseconds).

**Target Monadic Signature:**
```typescript
function totalDuration(
	unit: DateTimeUnit
): function calculateTotal(
	duration: Temporal.Duration
): Result<number, ValidationError>

type DateTimeUnit =
	| "years"
	| "months"
	| "weeks"
	| "days"
	| "hours"
	| "minutes"
	| "seconds"
	| "milliseconds"
	| "microseconds"
	| "nanoseconds"
```

---

## Range Functions

### dateRange

**Current Signature:**
```typescript
function dateRange(
	start: Temporal.PlainDate | null | undefined
): function withStart(
	end: Temporal.PlainDate | null | undefined
): function withEnd(
	step: Temporal.Duration | null | undefined = Temporal.Duration.from({ days: 1 })
): Array<Temporal.PlainDate> | null
```

**TC39 Temporal API Usage:**
- `Temporal.Duration.from({ days: 1 })`
- `Temporal.PlainDate.compare(start, end)`
- `current.add(duration)`

**Description:**
Generates an array of PlainDate values from start to end (inclusive) with the specified step duration.

**Target Monadic Signature:**
```typescript
function dateRange(
	start: Temporal.PlainDate
): function withStart(
	end: Temporal.PlainDate
): function withEnd(
	step: Option<Temporal.Duration>
): Result<ReadonlyArray<Temporal.PlainDate>, RangeError>
```

---

## Summary

Total Creation Functions: 15

- **Core Creation**: now, today, fromISO, parse, parseTime (5)
- **Conversions**: toPlainDate, toPlainTime, toPlainDateTime, toZonedDateTime (4)
- **Duration**: duration, durationToMinutes, durationToSeconds, totalDuration (4)
- **Ranges**: dateRange (1)
- **ISO Serialization**: toISO (1) - moved to formatting category

All creation functions follow the pattern of constructing new Temporal objects from raw inputs (strings, numbers, other Temporal types) or generating sequences of Temporal values. They form the foundation for all Temporal operations in the library.
