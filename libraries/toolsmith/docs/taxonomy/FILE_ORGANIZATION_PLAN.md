# Vanilla Functions Taxonomy - File Organization Plan

**Total Functions**: 786 (actual count from source)
**Target**: 15-25 functions per file
**Created**: 2025-10-07

---

## File Organization Strategy

Each domain gets its own folder under `docs/taxonomy/`. Large domains (>25 functions) are split into multiple files by functional category.

---

## Domain-by-Domain File Plan

### Domain 1: Activation (9 functions)

**Files**: 1

- `activation/ACTIVATION_FUNCTIONS.md` (9 functions)

### Domain 2: Array (131 functions)

**Files**: 6

- `array/ARRAY_CREATION.md` (~20 functions) - range, repeat, from, fill, of, etc.
- `array/ARRAY_ACCESS.md` (~20 functions) - head, tail, last, init, nth, at, slice, etc.
- `array/ARRAY_TRANSFORMATION.md` (~25 functions) - map, filter, reduce, flatMap, flatten, scan, etc.
- `array/ARRAY_COMBINATION.md` (~20 functions) - zip, zipWith, concat, interleave, append, prepend, etc.
- `array/ARRAY_PARTITIONING.md` (~25 functions) - partition, chunk, groupBy, splitAt, splitEvery, etc.
- `array/ARRAY_OPERATIONS.md` (~21 functions) - sort, reverse, unique, union, intersection, difference, etc.

### Domain 3: Async (10 functions)

**Files**: 1

- `async/ASYNC_FUNCTIONS.md` (10 functions)

### Domain 4: Combinator (49 functions)

**Files**: 3

- `combinator/COMBINATOR_COMPOSITION.md` (~20 functions) - compose, pipe, composeAsync, pipeAsync, etc.
- `combinator/COMBINATOR_CURRY.md` (~15 functions) - curry, curryN, partial, partialRight, arity, etc.
- `combinator/COMBINATOR_UTILITIES.md` (~14 functions) - bind, flip, tap, memoize, debounce, throttle, etc.

### Domain 5: Conversion (9 functions)

**Files**: 1

- `conversion/CONVERSION_FUNCTIONS.md` (9 functions)

### Domain 6: Finance (12 functions)

**Files**: 1

- `finance/FINANCE_FUNCTIONS.md` (12 functions)

### Domain 7: Geometry (10 functions)

**Files**: 1

- `geometry/GEOMETRY_FUNCTIONS.md` (10 functions)

### Domain 8: Hash (1 function)

**Files**: 1

- `hash/HASH_FUNCTIONS.md` (1 function)

### Domain 9: Interpolation (7 functions)

**Files**: 1

- `interpolation/INTERPOLATION_FUNCTIONS.md` (7 functions)

### Domain 10: Lens (5 functions)

**Files**: 1

- `lens/LENS_FUNCTIONS.md` (5 functions)

### Domain 11: Logic (13 functions)

**Files**: 1

- `logic/LOGIC_FUNCTIONS.md` (13 functions)

### Domain 12: Map (41 functions)

**Files**: 2

- `map/MAP_CREATION.md` (~20 functions) - fromArray, fromEntries, fromObject, etc.
- `map/MAP_OPERATIONS.md` (~21 functions) - mapKeys, mapValues, merge, filter, partition, etc.

### Domain 13: Math (57 functions)

**Files**: 9

- `math/arithmetic/MATH_ARITHMETIC.md` (15 functions) - add, subtract, multiply, divide, power, roots, exponential, logarithm, modulo, increment, decrement
- `math/rounding/MATH_ROUNDING.md` (7 functions) - round, floor, ceiling, truncate, clamp, absoluteValue, sign
- `math/aggregation/MATH_AGGREGATION.md` (9 functions) - sum, product, average, mean, median, mode, geometricMean, harmonicMean, rootMeanSquare
- `math/integer/MATH_INTEGER.md` (11 functions) - factorial, gcd, lcm, divisors, isPrime, primeFactorization, totient, digitSum, binomialCoefficient, combinations, permutations
- `math/sequence/MATH_SEQUENCE.md` (1 function) - fibonacci
- `math/comparison/MATH_COMPARISON.md` (6 functions) - max, min, maxBy, minBy, clamp, inRange
- `math/modular/MATH_MODULAR.md` (1 function) - modularExponentiation
- `math/random/MATH_RANDOM.md` (2 functions) - random, randomInteger
- `math/solver/MATH_SOLVER.md` (1 function) - quadratic

### Domain 14: Matrix (10 functions)

**Files**: 1

- `matrix/MATRIX_FUNCTIONS.md` (10 functions)

### Domain 15: Object (60 functions)

**Files**: 3

- `object/OBJECT_ACCESS.md` (~20 functions) - keys, values, entries, get, has, etc.
- `object/OBJECT_TRANSFORMATION.md` (~20 functions) - map, filter, merge, pick, omit, etc.
- `object/OBJECT_UTILITIES.md` (~20 functions) - clone, freeze, seal, assign, etc.

### Domain 16: Physics (8 functions)

**Files**: 1

- `physics/PHYSICS_FUNCTIONS.md` (8 functions)

### Domain 17: Set (27 functions)

**Files**: 2

- `set/SET_CREATION.md` (~15 functions) - fromArray, fromIterable, singleton, etc.
- `set/SET_OPERATIONS.md` (~12 functions) - union, intersection, difference, symmetricDifference, etc.

### Domain 18: Special (8 functions)

**Files**: 1

- `special/SPECIAL_FUNCTIONS.md` (8 functions)

### Domain 19: Statistics (13 functions)

**Files**: 1

- `statistics/STATISTICS_FUNCTIONS.md` (13 functions)

### Domain 20: String (71 functions)

**Files**: 4

- `string/STRING_CASE.md` (~15 functions) - toUpperCase, toLowerCase, capitalize, camelCase, etc.
- `string/STRING_TESTING.md` (~20 functions) - contains, startsWith, endsWith, isEmpty, isBlank, etc.
- `string/STRING_MANIPULATION.md` (~20 functions) - replace, replaceAll, trim, pad, slice, etc.
- `string/STRING_UTILITIES.md` (~16 functions) - split, join, repeat, reverse, etc.

### Domain 21: Temporal (79 functions)

**Files**: 4

- `temporal/TEMPORAL_CREATION.md` (~20 functions) - now, fromTimestamp, fromString, etc.
- `temporal/TEMPORAL_MANIPULATION.md` (~20 functions) - addHours, addDays, addMonths, etc.
- `temporal/TEMPORAL_COMPARISON.md` (~20 functions) - isAfter, isBefore, isSame, isWithin, etc.
- `temporal/TEMPORAL_FORMATTING.md` (~19 functions) - format, toISOString, toLocaleString, etc.

### Domain 22: Trigonometry (19 functions)

**Files**: 1

- `trigonometry/TRIGONOMETRY_FUNCTIONS.md` (19 functions)

### Domain 23: Tuple (13 functions)

**Files**: 1

- `tuple/TUPLE_FUNCTIONS.md` (13 functions)

### Domain 24: Validation (124 functions)

**Files**: 6

- `validation/VALIDATION_TYPE_GUARDS.md` (~20 functions) - isString, isNumber, isBoolean, etc.
- `validation/VALIDATION_NUMERIC.md` (~20 functions) - isInteger, isFinite, isPositive, etc.
- `validation/VALIDATION_STRING.md` (~25 functions) - isEmail, isUrl, isUuid, isIpv4, etc.
- `validation/VALIDATION_COLLECTION.md` (~20 functions) - isArray, isEmpty, isNonEmpty, etc.
- `validation/VALIDATION_DATE.md` (~20 functions) - isDate, isValidDate, isPast, isFuture, etc.
- `validation/VALIDATION_CUSTOM.md` (~19 functions) - isCreditCard, isIban, isISBN, etc.

---

## File Organization Summary

| Domain        | Functions | Files  | Avg Functions/File |
| ------------- | --------- | ------ | ------------------ |
| Activation    | 9         | 1      | 9                  |
| Array         | 131       | 6      | 22                 |
| Async         | 10        | 1      | 10                 |
| Combinator    | 49        | 3      | 16                 |
| Conversion    | 9         | 1      | 9                  |
| Finance       | 12        | 1      | 12                 |
| Geometry      | 10        | 1      | 10                 |
| Hash          | 1         | 1      | 1                  |
| Interpolation | 7         | 1      | 7                  |
| Lens          | 5         | 1      | 5                  |
| Logic         | 13        | 1      | 13                 |
| Map           | 41        | 2      | 21                 |
| Math          | 57        | 9      | 6                  |
| Matrix        | 10        | 1      | 10                 |
| Object        | 60        | 3      | 20                 |
| Physics       | 8         | 1      | 8                  |
| Set           | 27        | 2      | 14                 |
| Special       | 8         | 1      | 8                  |
| Statistics    | 13        | 1      | 13                 |
| String        | 71        | 4      | 18                 |
| Temporal      | 79        | 4      | 20                 |
| Trigonometry  | 19        | 1      | 19                 |
| Tuple         | 13        | 1      | 13                 |
| Validation    | 124       | 6      | 21                 |
| **TOTAL**     | **786**   | **54** | **~15**            |

---

## Directory Structure

```
libraries/toolsmith/docs/taxonomy/
├── FILE_ORGANIZATION_PLAN.md (this file)
├── activation/
│   └── ACTIVATION_FUNCTIONS.md
├── array/
│   ├── ARRAY_CREATION.md
│   ├── ARRAY_ACCESS.md
│   ├── ARRAY_TRANSFORMATION.md
│   ├── ARRAY_COMBINATION.md
│   ├── ARRAY_PARTITIONING.md
│   └── ARRAY_OPERATIONS.md
├── async/
│   └── ASYNC_FUNCTIONS.md
├── combinator/
│   ├── COMBINATOR_COMPOSITION.md
│   ├── COMBINATOR_CURRY.md
│   └── COMBINATOR_UTILITIES.md
├── conversion/
│   └── CONVERSION_FUNCTIONS.md
├── finance/
│   └── FINANCE_FUNCTIONS.md
├── geometry/
│   └── GEOMETRY_FUNCTIONS.md
├── hash/
│   └── HASH_FUNCTIONS.md
├── interpolation/
│   └── INTERPOLATION_FUNCTIONS.md
├── lens/
│   └── LENS_FUNCTIONS.md
├── logic/
│   └── LOGIC_FUNCTIONS.md
├── map/
│   ├── MAP_CREATION.md
│   └── MAP_OPERATIONS.md
├── math/
│   ├── arithmetic/
│   │   └── MATH_ARITHMETIC.md
│   ├── rounding/
│   │   └── MATH_ROUNDING.md
│   ├── aggregation/
│   │   └── MATH_AGGREGATION.md
│   ├── integer/
│   │   └── MATH_INTEGER.md
│   ├── sequence/
│   │   └── MATH_SEQUENCE.md
│   ├── comparison/
│   │   └── MATH_COMPARISON.md
│   ├── modular/
│   │   └── MATH_MODULAR.md
│   ├── random/
│   │   └── MATH_RANDOM.md
│   └── solver/
│       └── MATH_SOLVER.md
├── matrix/
│   └── MATRIX_FUNCTIONS.md
├── object/
│   ├── OBJECT_ACCESS.md
│   ├── OBJECT_TRANSFORMATION.md
│   └── OBJECT_UTILITIES.md
├── physics/
│   └── PHYSICS_FUNCTIONS.md
├── set/
│   ├── SET_CREATION.md
│   └── SET_OPERATIONS.md
├── special/
│   └── SPECIAL_FUNCTIONS.md
├── statistics/
│   └── STATISTICS_FUNCTIONS.md
├── string/
│   ├── STRING_CASE.md
│   ├── STRING_TESTING.md
│   ├── STRING_MANIPULATION.md
│   └── STRING_UTILITIES.md
├── temporal/
│   ├── TEMPORAL_CREATION.md
│   ├── TEMPORAL_MANIPULATION.md
│   ├── TEMPORAL_COMPARISON.md
│   └── TEMPORAL_FORMATTING.md
├── trigonometry/
│   └── TRIGONOMETRY_FUNCTIONS.md
├── tuple/
│   └── TUPLE_FUNCTIONS.md
└── validation/
    ├── VALIDATION_TYPE_GUARDS.md
    ├── VALIDATION_NUMERIC.md
    ├── VALIDATION_STRING.md
    ├── VALIDATION_COLLECTION.md
    ├── VALIDATION_DATE.md
    └── VALIDATION_CUSTOM.md
```

---

## Document Format Template

Each file follows this structure:

```markdown
# [Domain] - [Category] Functions

**Location**: `src/[domain]/`
**Functions**: [count]
**Status**: [Cataloged/In Progress]

---

## Function List

### functionName

- **Current**: `(param: Type) => ReturnType`
- **Returns**: Description of return behavior (null/NaN/throw/value)
- **Description**: [From //++ Envoy comment or [INFERRED]]
- **Target**: `(param: BrandedType) => Result<ValidationError, BrandedType>`

[Repeat for each function...]

---

## Migration Notes

[Domain-specific migration considerations...]
```

---

## Next Steps

1. ✅ Create this file organization plan
2. Create directory structure (`docs/taxonomy/[domain]/`)
3. For each domain, systematically:
   - List all function folders
   - Read each function's `index.ts`
   - Extract signature and `//++ Envoy` comment
   - Infer description if missing (mark `[INFERRED]`)
   - Document in appropriate category file
4. Update main `VANILLA_FUNCTIONS_TAXONOMY.md` to reference these files

---

**Priority Order** (based on dependency):

1. Validation (foundation for all branded types)
2. Math (needed by many domains)
3. String (widely used)
4. Array (widely used)
5. Logic (foundational)
6. Combinator (foundational)
7. Remaining domains alphabetically
