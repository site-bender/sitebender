# Temporal Manipulation Functions

Manipulation functions modify or transform existing Temporal objects, returning new instances (immutable operations).

## Arithmetic Functions

### addDays

**Current Signature:**
```typescript
function addDays(
	days: number
): function addDaysToDate(
	date: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined
): Temporal.PlainDate | Temporal.PlainDateTime | null
```

**TC39 Temporal API Usage:**
- `date.add({ days })`

**Description:**
Adds a specified number of days to a PlainDate or PlainDateTime.

**Target Monadic Signature:**
```typescript
function addDays(
	days: number
): function addDaysToDate(
	date: Temporal.PlainDate | Temporal.PlainDateTime
): Result<Temporal.PlainDate | Temporal.PlainDateTime, ArithmeticError>
```

---

### addHours

**Current Signature:**
```typescript
function addHours(
	hours: number
): function addHoursToTime(
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `time.add({ hours })`

**Description:**
Adds a specified number of hours to a PlainTime, PlainDateTime, or ZonedDateTime.

**Target Monadic Signature:**
```typescript
function addHours(
	hours: number
): function addHoursToTime(
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime, ArithmeticError>
```

---

### addMinutes

**Current Signature:**
```typescript
function addMinutes(
	minutes: number
): function addMinutesToTime(
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `time.add({ minutes })`

**Description:**
Adds a specified number of minutes to a PlainTime, PlainDateTime, or ZonedDateTime.

**Target Monadic Signature:**
```typescript
function addMinutes(
	minutes: number
): function addMinutesToTime(
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime, ArithmeticError>
```

---

### addSeconds

**Current Signature:**
```typescript
function addSeconds(
	seconds: number
): function addSecondsToTime(
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `time.add({ seconds })`

**Description:**
Adds a specified number of seconds to a PlainTime, PlainDateTime, or ZonedDateTime.

**Target Monadic Signature:**
```typescript
function addSeconds(
	seconds: number
): function addSecondsToTime(
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime, ArithmeticError>
```

---

### addMonths

**Current Signature:**
```typescript
function addMonths(
	months: number
): function addMonthsToDate(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | null | undefined
): Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | null
```

**TC39 Temporal API Usage:**
- `date.add({ months })`

**Description:**
Adds a specified number of months to a PlainDate, PlainDateTime, or PlainYearMonth.

**Target Monadic Signature:**
```typescript
function addMonths(
	months: number
): function addMonthsToDate(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth
): Result<Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth, ArithmeticError>
```

---

### addYears

**Current Signature:**
```typescript
function addYears(
	years: number
): function addYearsToDate(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | null | undefined
): Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth | null
```

**TC39 Temporal API Usage:**
- `date.add({ years })`

**Description:**
Adds a specified number of years to a PlainDate, PlainDateTime, or PlainYearMonth.

**Target Monadic Signature:**
```typescript
function addYears(
	years: number
): function addYearsToDate(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth
): Result<Temporal.PlainDate | Temporal.PlainDateTime | Temporal.PlainYearMonth, ArithmeticError>
```

---

### addDuration

**Current Signature:**
```typescript
function addDuration(
	duration: Temporal.Duration | null | undefined
): function addDurationToTemporal(
	temporal: Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| null
		| undefined
): Temporal.PlainDate
	| Temporal.PlainDateTime
	| Temporal.PlainTime
	| Temporal.PlainYearMonth
	| Temporal.ZonedDateTime
	| Temporal.Instant
	| null
```

**TC39 Temporal API Usage:**
- `temporal.add(duration)`

**Description:**
Adds a Duration to various Temporal types.

**Target Monadic Signature:**
```typescript
function addDuration(
	duration: Temporal.Duration
): function addDurationToTemporal(
	temporal: Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.PlainYearMonth
		| Temporal.ZonedDateTime
		| Temporal.Instant
): Result<
	| Temporal.PlainDate
	| Temporal.PlainDateTime
	| Temporal.PlainTime
	| Temporal.PlainYearMonth
	| Temporal.ZonedDateTime
	| Temporal.Instant,
	ArithmeticError
>
```

---

### subtractDuration

**Current Signature:**
```typescript
function subtractDuration(
	duration: Temporal.Duration | null | undefined
): function subtractDurationFromTemporal(
	temporal: Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
		| null
		| undefined
): Temporal.PlainDate
	| Temporal.PlainDateTime
	| Temporal.PlainTime
	| Temporal.ZonedDateTime
	| Temporal.Instant
	| null
```

**TC39 Temporal API Usage:**
- `temporal.subtract(duration)`
- `refDate.toPlainDateTime(temporal)` (for PlainTime)
- `result.toPlainTime()` (for PlainTime)

**Description:**
Subtracts a Duration from various Temporal types. For PlainTime, uses a reference date for calculation.

**Target Monadic Signature:**
```typescript
function subtractDuration(
	duration: Temporal.Duration
): function subtractDurationFromTemporal(
	temporal: Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainTime
		| Temporal.ZonedDateTime
		| Temporal.Instant
): Result<
	| Temporal.PlainDate
	| Temporal.PlainDateTime
	| Temporal.PlainTime
	| Temporal.ZonedDateTime
	| Temporal.Instant,
	ArithmeticError
>
```

---

## Setter Functions

### setDay

**Current Signature:**
```typescript
function setDay(
	day: number
): function setDayOnDate(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `date.with({ day }, { overflow: "constrain" })`

**Description:**
Sets the day component of a date, using constrain overflow mode to handle invalid days gracefully.

**Target Monadic Signature:**
```typescript
function setDay(
	day: PositiveInteger
): function setDayOnDate(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime, ValidationError>
```

---

### setMonth

**Current Signature:**
```typescript
function setMonth(
	month: number
): function setMonthOnDate(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `date.with({ month }, { overflow: "constrain" })`

**Description:**
Sets the month component (1-12) of a date, using constrain overflow mode to handle day overflow.

**Target Monadic Signature:**
```typescript
function setMonth(
	month: MonthNumber
): function setMonthOnDate(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime, ValidationError>

type MonthNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
```

---

### setYear

**Current Signature:**
```typescript
function setYear(
	year: number
): function setYearOnDate(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `date.with({ year }, { overflow: "constrain" })`

**Description:**
Sets the year component of a date (range: -271821 to 275760), using constrain overflow mode to handle Feb 29 in non-leap years.

**Target Monadic Signature:**
```typescript
function setYear(
	year: TemporalYear
): function setYearOnDate(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime, ValidationError>

type TemporalYear = number // -271821 to 275760
```

---

### setHour

**Current Signature:**
```typescript
function setHour(
	hour: number
): function setHourOnTime(
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `time.with({ hour })`

**Description:**
Sets the hour component (0-23) of a time.

**Target Monadic Signature:**
```typescript
function setHour(
	hour: HourNumber
): function setHourOnTime(
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime, ValidationError>

type HourNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23
```

---

### setMinute

**Current Signature:**
```typescript
function setMinute(
	minute: number
): function setMinuteOnTime(
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `time.with({ minute })`

**Description:**
Sets the minute component (0-59) of a time.

**Target Monadic Signature:**
```typescript
function setMinute(
	minute: MinuteNumber
): function setMinuteOnTime(
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime, ValidationError>

type MinuteNumber = number // 0-59
```

---

### setSecond

**Current Signature:**
```typescript
function setSecond(
	second: number
): function setSecondOnTime(
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `time.with({ second })`

**Description:**
Sets the second component (0-59) of a time.

**Target Monadic Signature:**
```typescript
function setSecond(
	second: SecondNumber
): function setSecondOnTime(
	time: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime, ValidationError>

type SecondNumber = number // 0-59
```

---

## Adjustment Functions

### adjustTime

**Current Signature:**
```typescript
function adjustTime(
	timeAdjustment: {
		hour?: number
		minute?: number
		second?: number
		millisecond?: number
		microsecond?: number
		nanosecond?: number
	} | null | undefined
): function adjustTimeOnDateTime(
	datetime: Temporal.PlainDateTime | null | undefined
): Temporal.PlainDateTime | null
```

**TC39 Temporal API Usage:**
- `datetime.with(withArgs)`

**Description:**
Adjusts multiple time components of a PlainDateTime simultaneously, only modifying specified fields.

**Target Monadic Signature:**
```typescript
function adjustTime(
	timeAdjustment: TimeAdjustment
): function adjustTimeOnDateTime(
	datetime: Temporal.PlainDateTime
): Result<Temporal.PlainDateTime, ValidationError>

type TimeAdjustment = {
	readonly hour?: number
	readonly minute?: number
	readonly second?: number
	readonly millisecond?: number
	readonly microsecond?: number
	readonly nanosecond?: number
}
```

---

### clampDate

**Current Signature:**
```typescript
function clampDate<T extends { compare(other: T): number }>(
	min: T | null | undefined
): function withMin(
	max: T | null | undefined
): function withMax(
	date: T | null | undefined
): T | null
```

**TC39 Temporal API Usage:**
- `date.compare(min)`
- `date.compare(max)`

**Description:**
Clamps a date value between minimum and maximum bounds.

**Target Monadic Signature:**
```typescript
function clampDate<T extends Comparable<T>>(
	min: T
): function withMin(
	max: T
): function withMax(
	date: T
): Result<T, ValidationError>

type Comparable<T> = {
	readonly compare: (other: T) => number
}
```

---

### round

**Current Signature:**
```typescript
function round(
	unit: "hour" | "minute" | "second" | "millisecond" | "microsecond" | "nanosecond" | "day"
): function roundTime(
	datetime: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `datetime.round({ smallestUnit: u, roundingMode: "halfExpand" })`

**Description:**
Rounds a time or datetime to the specified unit using half-expand rounding mode. PlainTime does not support 'day' unit.

**Target Monadic Signature:**
```typescript
function round(
	unit: RoundingUnit
): function roundTime(
	datetime: Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainTime | Temporal.PlainDateTime | Temporal.ZonedDateTime, ValidationError>

type RoundingUnit = "hour" | "minute" | "second" | "millisecond" | "microsecond" | "nanosecond" | "day"
```

---

## Range Boundary Functions

### startOfDay

**Current Signature:**
```typescript
function startOfDay(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `date.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))`
- `date.with({ hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 })`

**Description:**
Returns the start of day (midnight 00:00:00.000000000) for a given date.

**Target Monadic Signature:**
```typescript
function startOfDay(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainDateTime | Temporal.ZonedDateTime, ConversionError>
```

---

### endOfDay

**Current Signature:**
```typescript
function endOfDay(
	date: Temporal.PlainDate | Temporal.PlainDateTime | null | undefined
): Temporal.PlainDateTime | null
```

**TC39 Temporal API Usage:**
- `date.toPlainDate()`
- `Temporal.PlainTime.from({ hour: 23, minute: 59, second: 59, millisecond: 999, microsecond: 999, nanosecond: 999 })`
- `plainDate.toPlainDateTime(endTime)`

**Description:**
Returns the end of day (23:59:59.999999999) for a given date.

**Target Monadic Signature:**
```typescript
function endOfDay(
	date: Temporal.PlainDate | Temporal.PlainDateTime
): Result<Temporal.PlainDateTime, ConversionError>
```

---

### startOfWeek

**Current Signature:**
```typescript
function startOfWeek(
	weekStartDay: number = 1
): function getStartOfWeekForDate(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `date.dayOfWeek`
- `date.subtract({ days: daysToSubtract })`
- `startDate.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))`
- `result.with({ hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 })`

**Description:**
Returns the start of the week (midnight) for a given date, with configurable week start day (1=Monday, 7=Sunday).

**Target Monadic Signature:**
```typescript
function startOfWeek(
	weekStartDay: WeekDay
): function getStartOfWeekForDate(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainDateTime | Temporal.ZonedDateTime, ValidationError>

type WeekDay = 1 | 2 | 3 | 4 | 5 | 6 | 7
```

---

### endOfWeek

**Current Signature:**
```typescript
function endOfWeek(
	weekStartDay: number = 1
): function getEndOfWeekForDate(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `date.dayOfWeek`
- `date.add({ days: daysToAdd })`
- `endDate.toPlainDateTime(endTime)`
- `result.with({ hour: 23, minute: 59, second: 59, millisecond: 999, microsecond: 999, nanosecond: 999 })`

**Description:**
Returns the end of the week (23:59:59.999999999) for a given date, with configurable week start day.

**Target Monadic Signature:**
```typescript
function endOfWeek(
	weekStartDay: WeekDay
): function getEndOfWeekForDate(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainDateTime | Temporal.ZonedDateTime, ValidationError>
```

---

### startOfMonth

**Current Signature:**
```typescript
function startOfMonth(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `date.with({ day: 1 })`
- `firstOfMonth.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))`
- `date.with({ day: 1, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 })`

**Description:**
Returns the start of the month (first day at midnight) for a given date.

**Target Monadic Signature:**
```typescript
function startOfMonth(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainDateTime | Temporal.ZonedDateTime, ConversionError>
```

---

### endOfMonth

**Current Signature:**
```typescript
function endOfMonth(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `date.daysInMonth`
- `date.with({ day: lastDay })`
- `lastDayOfMonth.toPlainDateTime(endTime)`
- `date.with({ day: lastDay, hour: 23, minute: 59, second: 59, millisecond: 999, microsecond: 999, nanosecond: 999 })`

**Description:**
Returns the end of the month (last day at 23:59:59.999999999) for a given date.

**Target Monadic Signature:**
```typescript
function endOfMonth(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainDateTime | Temporal.ZonedDateTime, ConversionError>
```

---

### startOfYear

**Current Signature:**
```typescript
function startOfYear(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `date.with({ month: 1, day: 1 })`
- `firstOfYear.toPlainDateTime(Temporal.PlainTime.from("00:00:00"))`
- `date.with({ month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 })`

**Description:**
Returns the start of the year (January 1 at midnight) for a given date.

**Target Monadic Signature:**
```typescript
function startOfYear(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainDateTime | Temporal.ZonedDateTime, ConversionError>
```

---

### endOfYear

**Current Signature:**
```typescript
function endOfYear(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime | null | undefined
): Temporal.PlainDateTime | Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `date.with({ month: 12, day: 31 })`
- `lastOfYear.toPlainDateTime(endTime)`
- `date.with({ month: 12, day: 31, hour: 23, minute: 59, second: 59, millisecond: 999, microsecond: 999, nanosecond: 999 })`

**Description:**
Returns the end of the year (December 31 at 23:59:59.999999999) for a given date.

**Target Monadic Signature:**
```typescript
function endOfYear(
	date: Temporal.PlainDate | Temporal.PlainDateTime | Temporal.ZonedDateTime
): Result<Temporal.PlainDateTime | Temporal.ZonedDateTime, ConversionError>
```

---

## Timezone and Calendar Functions

### withTimeZone

**Current Signature:**
```typescript
function withTimeZone(
	timeZone: string
): function convertToTimeZone(
	temporal: Temporal.ZonedDateTime | Temporal.PlainDateTime | Temporal.Instant | null | undefined
): Temporal.ZonedDateTime | null
```

**TC39 Temporal API Usage:**
- `Temporal.Now.zonedDateTimeISO(timeZone)` (for validation)
- `temporal.withTimeZone(timeZone)`
- `temporal.toZonedDateTime(timeZone)`
- `temporal.toZonedDateTimeISO(timeZone)`

**Description:**
Converts a temporal value to a ZonedDateTime in the specified timezone.

**Target Monadic Signature:**
```typescript
function withTimeZone(
	timeZone: TimeZone
): function convertToTimeZone(
	temporal: Temporal.ZonedDateTime | Temporal.PlainDateTime | Temporal.Instant
): Result<Temporal.ZonedDateTime, TimeZoneError>

type TimeZone = string
```

---

### withCalendar

**Current Signature:**
```typescript
function withCalendar(
	calendar: string
): function changeCalendarForTemporal(
	temporal: Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay
		| null
		| undefined
): Temporal.PlainDate
	| Temporal.PlainDateTime
	| Temporal.PlainYearMonth
	| Temporal.PlainMonthDay
	| null
```

**TC39 Temporal API Usage:**
- `Temporal.PlainDate.from({ year: 2000, month: 1, day: 1, calendar })` (for validation)
- `temporal.withCalendar(calendar)`

**Description:**
Changes the calendar system of a temporal value (e.g., from 'iso8601' to 'hebrew', 'islamic', etc.).

**Target Monadic Signature:**
```typescript
function withCalendar(
	calendar: CalendarSystem
): function changeCalendarForTemporal(
	temporal: Temporal.PlainDate
		| Temporal.PlainDateTime
		| Temporal.PlainYearMonth
		| Temporal.PlainMonthDay
): Result<
	| Temporal.PlainDate
	| Temporal.PlainDateTime
	| Temporal.PlainYearMonth
	| Temporal.PlainMonthDay,
	CalendarError
>

type CalendarSystem = string
```

---

### withTime

**Current Signature:**
```typescript
function withTime(
	time: Temporal.PlainTime | string | null | undefined
): function withTimeOnDate(
	date: Temporal.PlainDate | null | undefined
): Temporal.PlainDateTime | null
```

**TC39 Temporal API Usage:**
- `date.toPlainDateTime(time)`
- `Temporal.PlainTime.from("00:00:00")` (default)
- `Temporal.PlainTime.from(time)`

**Description:**
Combines a PlainDate with a PlainTime to create a PlainDateTime. Defaults to midnight if time is null.

**Target Monadic Signature:**
```typescript
function withTime(
	time: Option<Temporal.PlainTime | string>
): function withTimeOnDate(
	date: Temporal.PlainDate
): Result<Temporal.PlainDateTime, ConversionError>
```

---

## Summary

Total Manipulation Functions: 31

- **Arithmetic**: addDays, addHours, addMinutes, addSeconds, addMonths, addYears, addDuration, subtractDuration (8)
- **Setters**: setDay, setMonth, setYear, setHour, setMinute, setSecond (6)
- **Adjustments**: adjustTime, clampDate, round (3)
- **Range Boundaries**: startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear (8)
- **Timezone/Calendar**: withTimeZone, withCalendar, withTime (3)
- **Accessors** (moved to formatting): getCalendar, getOffsetTransitions, getNextOccurrence (3)

All manipulation functions follow the immutability principle, returning new Temporal instances rather than modifying existing ones.
