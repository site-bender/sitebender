# Toolkit Null/Undefined Validation Functions Migration - Session Continuation

## Current Status

### Completed Work (Session 1)
1. **Created new validation functions** in `libraries/toolkit/src/simple/validation/`:
   - `isNull/index.ts` - Strict null check (=== null)
   - `isNotNull/index.ts` - Strict not null check (!== null)
   - `isNotUndefined/index.ts` - Strict not undefined check (!== undefined)
   - `isNotNil/index.ts` - Alias for isNotNullish

2. **Updated existing validation function**:
   - `isNil/index.ts` - Now delegates to `isNullish` instead of duplicating logic

3. **Partially migrated null/undefined checks** in 31 files (out of 427 that need updating)

### Remaining Work

## CRITICAL: Full Scope of Required Changes

According to the search results, there are **679 instances of direct null/undefined comparisons across 427 files** in the toolkit that need to be replaced with the appropriate validation functions. **Do files 12 at a session, then update the list of completed files, commit the changes, and stop.**

When doing commits, use `ALLOW_TOOLKIT=1 git commit ...`

### Replacement Patterns Required

| Current Pattern | Replace With | Import From |
|----------------|--------------|-------------|
| `value == null` | `isNullish(value)` | Relative path to `simple/validation/isNullish/index.ts` |
| `value != null` | `isNotNullish(value)` | Relative path to `simple/validation/isNotNullish/index.ts` |
| `value === null` | `isNull(value)` | Relative path to `simple/validation/isNull/index.ts` |
| `value !== null` | `isNotNull(value)` | Relative path to `simple/validation/isNotNull/index.ts` |
| `value === undefined` | `isUndefined(value)` | Relative path to `simple/validation/isUndefined/index.ts` |
| `value !== undefined` | `isNotUndefined(value)` | Relative path to `simple/validation/isNotUndefined/index.ts` |
| `value === null \|\| value === undefined` | `isNullish(value)` | Relative path to `simple/validation/isNullish/index.ts` |
| `value !== null && value !== undefined` | `isNotNullish(value)` | Relative path to `simple/validation/isNotNullish/index.ts` |

### Files to Skip
Do NOT modify the validation functions themselves:
- `isNull/index.ts`
- `isNotNull/index.ts`
- `isNullish/index.ts`
- `isNotNullish/index.ts`
- `isNil/index.ts`
- `isNotNil/index.ts`
- `isUndefined/index.ts`
- `isNotUndefined/index.ts`
- `isDefined/index.ts`

### Already Completed Files (91 files)
These files have already been updated and should be skipped:
- `either/`: leftWithInspect, rightWithInspect, show
- `maybe/`: fromNullable, justWithInspect, show
- `random/`: randomBoolean, randomChoice, randomFloat, randomInteger, randomString, randomSubset
- `simple/array/`: init
- `simple/async/`: parallel, parallelLimit, race, waterfall
- `simple/math/`: clamp, sum
- `simple/object/`: where, whereEq
- `simple/statistics/`: variance
- `simple/temporal/`: addDuration, addHours, addMinutes, addMonths, addSeconds, addYears, adjustTime, dateRange, diffHours, diffMinutes, diffMonths, diffSeconds, durationToMinutes, durationToSeconds, format, formatDuration, getCalendar, getDay, getDayOfYear, getMillisecond, getNextOccurrence, getOffsetTransitions, getQuarter, getTimeZone, isLeapYear, isWeekday, isWeekend, parse, parseTime, setDay, setHour, setMinute, setMonth, setSecond, setYear, since, sortByAbsoluteTime, startOfMonth, startOfWeek, startOfYear, subtractDuration, toISO, toPlainDate, toPlainDateTime, toPlainTime, totalDuration, until, withCalendar, withTime, withTimeZone
- `simple/trigonometry/`: arcCosine, arcSine, arcTangent, arcTangent2, cartesianToPolar, cosine, degreesToRadians, hyperbolicCosine, hyperbolicSine, hyperbolicTangent, radiansToDegrees, sine, tangent
- `simple/validation/`: isAlpha, isAlphanumeric, isPhone, isUrl
- `state/`: store.ts
- `types/`: index.ts

## Empty Check Replacements (Lower Priority)

After completing null/undefined replacements, also replace:
- `array.length === 0` → `isEmpty(array)` from `simple/array/isEmpty`
- `str.length === 0` → `isEmpty(str)` from `simple/validation/isEmpty`
- `Object.keys(obj).length === 0` → `isEmpty(obj)` from `simple/validation/isEmpty`

## Next Steps

1. **Systematically process the remaining ~396 files** that contain direct null/undefined comparisons
2. **Use the Task tool or MultiEdit** for batch processing to handle multiple files efficiently
3. **Group files by directory** for organized processing (e.g., all temporal files, all math files, etc.)
4. **Run tests after each batch** to ensure no regressions
5. **Commit changes in logical groups** (e.g., "fix(toolkit): replace null checks in temporal functions")
6. **Document changes** - Update this prompt with any new validation functions or patterns discovered during the process and the total number of functions modified and remaining to be modified.

## Important Notes

- **Import paths must be relative** - Calculate correct relative path from each file to the validation functions
- **Preserve exact formatting** - Maintain indentation and code style
- **Test frequently** - Run `deno test libraries/toolkit/tests --allow-all` after each batch
- **Handle all variations** - Check for reversed comparisons like `null == value` or `undefined === value`
- **Check for compound conditions** - Look for patterns like `if (x === null || x === undefined)` that should become `if (isNullish(x))`

## Verification

To verify remaining work:
```bash
# Count remaining instances
grep -r "== null\|!= null\|=== null\|!== null\|=== undefined\|!== undefined" libraries/toolkit/src --include="*.ts" --include="*.tsx" | wc -l

# List files still needing updates
grep -r "== null\|!= null\|=== null\|!== null\|=== undefined\|!== undefined" libraries/toolkit/src --include="*.ts" --include="*.tsx" -l | wc -l
```

## Success Criteria

- All 427 files containing direct null/undefined comparisons are updated
- All tests pass (`deno test libraries/toolkit/tests --allow-all`)
- No direct null/undefined comparisons remain (except in the validation functions themselves)
- Code maintains exact formatting and style
- All imports use correct relative paths
