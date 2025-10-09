# Temporal Formatting Functions

Formatting functions extract information from Temporal objects or convert them to display formats.

## String Formatting Functions

### format

**Current Signature:**

```typescript
function format(
	locale: string = "en-US"
): function formatWithLocale(
	options: FormatOptions = {}
): function formatTemporal(
	temporal: unknown | null | undefined
): string

type FormatOptions = Intl.DateTimeFormatOptions & {
	timeZoneMode?: "local" | "utc"
}
```

**TC39 Temporal API Usage:**

- Converts Temporal objects to Date for Intl formatting
- `new Date(temporal.epochMilliseconds)` (for Instant/ZonedDateTime)
- `new Date(year, month - 1, day)` (for PlainDate)
- `Intl.DateTimeFormat(locale, options)`
- `formatter.format(dateToFormat)`

**Description:**
Formats Temporal objects using Intl.DateTimeFormat with locale and options support. Converts Temporal types to Date objects for formatting.

**Target Monadic Signature:**

```typescript
function format(
	locale: Locale
): function formatWithLocale(
	options: FormatOptions
): function formatTemporal(
	temporal: Temporal.PlainDate
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
): Result<string, FormatError>

type Locale = string
type FormatOptions = Intl.DateTimeFormatOptions & {
	readonly timeZoneMode?: "local" | "utc"
}
```

---

### formatDuration

**Current Signature:**

```typescript
function formatDuration(
	duration: Temporal.Duration | null | undefined,
): string
```

**TC39 Temporal API Usage:**

- Accesses duration components: `years`, `months`, `weeks`, `days`, `hours`, `minutes`, `seconds`, `milliseconds`, `microseconds`, `nanoseconds`

**Description:**
Formats a Duration into a human-readable string showing all non-zero components (e.g., "2 years, 3 months, 5 days, 4 hours").

**Target Monadic Signature:**

```typescript
function formatDuration(
	duration: Temporal.Duration,
): Result<string, FormatError>
```

---

### toISO

**Current Signature:**

```typescript
function toISO(
	temporal:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay
		| Temporal.Duration
		| null
		| undefined,
): string | null
```

**TC39 Temporal API Usage:**

- `temporal.toString()`

**Description:**
Converts any Temporal type to its ISO 8601 string representation using the built-in toString() method.

**Target Monadic Signature:**

```typescript
function toISO(
	temporal:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay
		| Temporal.Duration,
): Result<string, SerializationError>
```

---

### serializeZonedDateTime

**Current Signature:**

```typescript
function serializeZonedDateTime(
	zonedDateTime: Temporal.ZonedDateTime | null | undefined,
): string | null
```

**TC39 Temporal API Usage:**

- `zonedDateTime.toString()`

**Description:**
Serializes a ZonedDateTime to its ISO 8601 string representation with timezone information.

**Target Monadic Signature:**

```typescript
function serializeZonedDateTime(
	zonedDateTime: Temporal.ZonedDateTime,
): Result<string, SerializationError>
```

---

## Component Extraction Functions

### getYear

**Current Signature:**

```typescript
function getYear(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null
```

**TC39 Temporal API Usage:**

- `date.year`

**Description:**
Extracts the year component from a Temporal date object.

**Target Monadic Signature:**

```typescript
function getYear(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime,
): Result<number, ExtractionError>
```

---

### getMonth

**Current Signature:**

```typescript
function getMonth(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null
```

**TC39 Temporal API Usage:**

- `date.month`

**Description:**
Extracts the month component (1-12) from a Temporal date object.

**Target Monadic Signature:**

```typescript
function getMonth(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay
		| Temporal.ZonedDateTime,
): Result<MonthNumber, ExtractionError>

type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
```

---

### getDay

**Current Signature:**

```typescript
function getDay(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainMonthDay
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null
```

**TC39 Temporal API Usage:**

- `date.day`

**Description:**
Extracts the day of month component (1-31) from a Temporal date object.

**Target Monadic Signature:**

```typescript
function getDay(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainMonthDay
		| Temporal.ZonedDateTime,
): Result<DayNumber, ExtractionError>

type DayNumber = number // 1-31
```

---

### getHour

**Current Signature:**

```typescript
function getHour(
	time:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null
```

**TC39 Temporal API Usage:**

- `time.hour`

**Description:**
Extracts the hour component (0-23) from a Temporal time object.

**Target Monadic Signature:**

```typescript
function getHour(
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime,
): Result<HourNumber, ExtractionError>

type HourNumber = number // 0-23
```

---

### getMinute

**Current Signature:**

```typescript
function getMinute(
	time:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null
```

**TC39 Temporal API Usage:**

- `time.minute`

**Description:**
Extracts the minute component (0-59) from a Temporal time object.

**Target Monadic Signature:**

```typescript
function getMinute(
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime,
): Result<MinuteNumber, ExtractionError>

type MinuteNumber = number // 0-59
```

---

### getSecond

**Current Signature:**

```typescript
function getSecond(
	time:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null
```

**TC39 Temporal API Usage:**

- `time.second`

**Description:**
Extracts the second component (0-59) from a Temporal time object.

**Target Monadic Signature:**

```typescript
function getSecond(
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime,
): Result<SecondNumber, ExtractionError>

type SecondNumber = number // 0-59
```

---

### getMillisecond

**Current Signature:**

```typescript
function getMillisecond(
	time:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null
```

**TC39 Temporal API Usage:**

- `time.millisecond`

**Description:**
Extracts the millisecond component (0-999) from a Temporal time object.

**Target Monadic Signature:**

```typescript
function getMillisecond(
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime,
): Result<MillisecondNumber, ExtractionError>

type MillisecondNumber = number // 0-999
```

---

### getNanosecond

**Current Signature:**

```typescript
function getNanosecond(
	time:
		| Temporal.PlainTime
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null
```

**TC39 Temporal API Usage:**

- `time.nanosecond`

**Description:**
Extracts the nanosecond component (0-999) from a Temporal time object.

**Target Monadic Signature:**

```typescript
function getNanosecond(
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime,
): Result<NanosecondNumber, ExtractionError>

type NanosecondNumber = number // 0-999
```

---

## Calculated Property Functions

### getDayOfWeek

**Current Signature:**

```typescript
function getDayOfWeek(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null
```

**TC39 Temporal API Usage:**

- `date.dayOfWeek`

**Description:**
Gets the ISO day of week (1=Monday, 7=Sunday) for a date.

**Target Monadic Signature:**

```typescript
function getDayOfWeek(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
): Result<WeekDay, ExtractionError>

type WeekDay = 1 | 2 | 3 | 4 | 5 | 6 | 7
```

---

### getDayOfYear

**Current Signature:**

```typescript
function getDayOfYear(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null
```

**TC39 Temporal API Usage:**

- `date.dayOfYear`

**Description:**
Gets the day of year (1-366) for a date.

**Target Monadic Signature:**

```typescript
function getDayOfYear(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
): Result<DayOfYear, ExtractionError>

type DayOfYear = number // 1-366
```

---

### getWeekOfYear

**Current Signature:**

```typescript
function getWeekOfYear(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null
```

**TC39 Temporal API Usage:**

- `date.weekOfYear`

**Description:**
Gets the ISO week number (1-53) for a date.

**Target Monadic Signature:**

```typescript
function getWeekOfYear(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
): Result<WeekNumber, ExtractionError>

type WeekNumber = number // 1-53
```

---

### getWeekday

**Current Signature:**

```typescript
function getWeekday(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null
```

**TC39 Temporal API Usage:**

- `date.dayOfWeek`

**Description:**
Alias for getDayOfWeek. Gets the ISO day of week (1=Monday, 7=Sunday).

**Target Monadic Signature:**

```typescript
function getWeekday(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime,
): Result<WeekDay, ExtractionError>
```

---

### getQuarter

**Current Signature:**

```typescript
function getQuarter(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null
```

**TC39 Temporal API Usage:**

- `date.month`
- Calculation: `Math.ceil(month / 3)`

**Description:**
Calculates the quarter (1-4) for a date based on its month.

**Target Monadic Signature:**

```typescript
function getQuarter(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime,
): Result<Quarter, ExtractionError>

type Quarter = 1 | 2 | 3 | 4
```

---

### getDaysInMonth

**Current Signature:**

```typescript
function getDaysInMonth(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null
```

**TC39 Temporal API Usage:**

- `date.daysInMonth`

**Description:**
Gets the number of days (28-31) in the month of the given date.

**Target Monadic Signature:**

```typescript
function getDaysInMonth(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime,
): Result<DaysInMonth, ExtractionError>

type DaysInMonth = 28 | 29 | 30 | 31
```

---

### getDaysInYear

**Current Signature:**

```typescript
function getDaysInYear(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime
		| null
		| undefined,
): number | null
```

**TC39 Temporal API Usage:**

- `date.daysInYear`

**Description:**
Gets the number of days (365 or 366) in the year of the given date.

**Target Monadic Signature:**

```typescript
function getDaysInYear(
	date:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime,
): Result<DaysInYear, ExtractionError>

type DaysInYear = 365 | 366
```

---

## Metadata Functions

### getCalendar

**Current Signature:**

```typescript
function getCalendar(
	temporal:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay
		| Temporal.ZonedDateTime
		| null
		| undefined,
): string | null
```

**TC39 Temporal API Usage:**

- `temporal.calendarId`

**Description:**
Gets the calendar system identifier (e.g., "iso8601", "hebrew", "islamic") for a Temporal object.

**Target Monadic Signature:**

```typescript
function getCalendar(
	temporal:
		| Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay
		| Temporal.ZonedDateTime,
): Result<CalendarId, ExtractionError>

type CalendarId = string
```

---

### getTimeZone

**Current Signature:**

```typescript
function getTimeZone(
	temporal: Temporal.ZonedDateTime | null | undefined,
): string | null
```

**TC39 Temporal API Usage:**

- `temporal.timeZoneId`

**Description:**
Gets the timezone identifier (e.g., "America/New_York", "UTC") for a ZonedDateTime.

**Target Monadic Signature:**

```typescript
function getTimeZone(
	temporal: Temporal.ZonedDateTime,
): Result<TimeZoneId, ExtractionError>

type TimeZoneId = string
```

---

### getOffsetTransitions

**Current Signature:**

```typescript
function getOffsetTransitions(
	timeZone: string
): function findTransitions(
	startYear: number
): function inYearRange(
	endYear: number
): ReadonlyArray<{ instant: Temporal.Instant; offsetBefore: string; offsetAfter: string }> | null
```

**TC39 Temporal API Usage:**

- `Temporal.PlainDateTime.from()`
- `Temporal.ZonedDateTime.from()`
- `zdt.offset`
- `zdt.toInstant()`

**Description:**
Finds all timezone offset transitions (DST changes) within a year range for a given timezone.

**Target Monadic Signature:**

```typescript
function getOffsetTransitions(
	timeZone: TimeZone
): function findTransitions(
	startYear: number
): function inYearRange(
	endYear: number
): Result<ReadonlyArray<OffsetTransition>, TimeZoneError>

type TimeZone = string
type OffsetTransition = {
	readonly instant: Temporal.Instant
	readonly offsetBefore: string
	readonly offsetAfter: string
}
```

---

### getNextOccurrence

**Current Signature:**

```typescript
function getNextOccurrence(
	targetTime: Temporal.PlainTime
): function fromReference(
	referenceDateTime: Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**

- `referenceDateTime.with({ hour, minute, second, millisecond: 0, microsecond: 0, nanosecond: 0 })`
- `referenceDateTime.add({ days: 1 })`
- `targetDateTime.compare(referenceDateTime)`

**Description:**
Finds the next occurrence of a specific time from a reference datetime. If the time is later today, returns today; otherwise returns tomorrow.

**Target Monadic Signature:**

```typescript
function getNextOccurrence(
	targetTime: Temporal.PlainTime
): function fromReference(
	referenceDateTime: Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainDateTime | Temporal.ZonedDateTime, CalculationError>
```

---

## Summary

Total Formatting Functions: 22

- **String Formatting**: format, formatDuration, toISO, serializeZonedDateTime (4)
- **Date Components**: getYear, getMonth, getDay (3)
- **Time Components**: getHour, getMinute, getSecond, getMillisecond, getNanosecond (5)
- **Calculated Properties**: getDayOfWeek, getDayOfYear, getWeekOfYear, getWeekday, getQuarter, getDaysInMonth, getDaysInYear (7)
- **Metadata**: getCalendar, getTimeZone, getOffsetTransitions, getNextOccurrence (4)

Note: The count is 22 instead of 19 because some functions were reclassified from other categories during analysis. All formatting functions are read-only operations that extract or transform data without modifying the input Temporal objects.
