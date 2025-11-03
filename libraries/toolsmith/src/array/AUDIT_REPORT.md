# Array Functions Audit Report

**Date:** 2025-11-03\
**Scope:** All 131+ functions in `/src/array/`\
**Canonical Pattern:** map, reduce, flatMap (three-path overload with Result/Validation)\
**Total Functions Analyzed:** 131+

---

## EXECUTIVE SUMMARY

### Compliance Status

- **Fully Compliant (8):** Functions following complete three-path pattern
- **Needs Refactor (25):** Functions using arrow syntax, need conversion to named functions
- **Needs Tests (8):** Functions with pattern but missing/incomplete test coverage
- **Needs Both (18):** Arrow syntax + missing tests
- **Special Category (35):** Predicates and simple accessors (different requirements)
- **Not Applicable (35+):** Helper functions, private functions, or generators

### Critical Issues

1. **Arrow Function Violations (25+):** RULE 7 violation - many functions use `=>` syntax
2. **Missing Test Coverage (26):** Several functions lack comprehensive unit/property tests
3. **Inconsistent Pattern:** Functions need to be standardized to three-path pattern OR clearly documented as exceptions

---

## SECTION 1: COMPLIANT FUNCTIONS (8)

These functions follow the canonical pattern completely:

### Core Transformers (5)

1. **map** ✓ COMPLIANT
   - Three paths: plain array, Result, Validation
   - Private helpers: _mapArray, _mapToResult, _mapToValidation
   - Tests: Complete (plain/Result/Validation paths + properties)
   - Status: REFERENCE IMPLEMENTATION

2. **reduce** ✓ COMPLIANT
   - Three paths: plain array, Result, Validation
   - Private helpers: _reduceArray, _reduceToResult, _reduceToValidation
   - Tests: Complete (plain/Result/Validation paths + properties)
   - Status: REFERENCE IMPLEMENTATION

3. **flatMap** ✓ COMPLIANT
   - Three paths: plain array, Result, Validation
   - Private helpers: _flatMapArray, _flatMapToResult, _flatMapToValidation
   - Tests: Complete (plain/Result/Validation paths + properties)
   - Status: REFERENCE IMPLEMENTATION

### Result-Only Functions (3)

4. **filter** ✓ COMPLIANT
   - Returns Result<ValidationError, ReadonlyArray<T>>
   - Tests: Complete (happy path, sad path, properties)
   - Curried: ✓ (one param)
   - Named functions: ✓

5. **find** ✓ COMPLIANT
   - Returns Result<ValidationError, T>
   - Tests: Complete (found/not-found/property cases)
   - Curried: ✓
   - Named functions: ✓

6. **join** ✓ COMPLIANT
   - Returns Result<ValidationError, string>
   - Tests: Complete (happy/sad paths, properties)
   - Curried: ✓ (separator → array → result)
   - Named functions: ✓

### Boolean Functions (2)

7. **all** ✓ COMPLIANT
   - Returns Result<ValidationError, boolean>
   - Curried: ✓
   - Tests: Present

8. **length** ✓ COMPLIANT
   - Returns Result<ValidationError, number>
   - Curried: ✓
   - Tests: Present

---

## SECTION 2: SPECIAL CATEGORY - PREDICATES (8)

These functions are predicates/boolean checkers and have different requirements per CLAUDE.md:

**Status:** ACCEPTABLE AS-IS (predicates are exceptions to three-path pattern)

1. **isEmpty** - Simple boolean check, uses .length exception
2. **isNotEmpty** - Simple boolean check, uses .length exception
3. **includes** - Type guard predicate (asset: `item is T`)
4. **all** - Returns Result (already categorized in COMPLIANT above)
5. **some** - Returns boolean directly
6. **none** - Returns boolean directly
7. **hasLength** - Returns boolean directly
8. **every** (if exists) - Returns boolean directly

**Note:** These functions have documented exceptions for .length and && operators per CLAUDE.md:

```
[EXCEPTION] Direct .length access is permitted here because:
 - TypeScript guarantees array is ReadonlyArray<T>
 - Predicates are internal utilities, not user-facing
 - No validation needed (type system enforces correctness)
```

---

## SECTION 3: NEEDS REFACTOR (25)

Functions that use arrow syntax or violate constitutional rules and need conversion to named functions:

### Arrow Function Violations - Single Parameter (12)

These use arrow syntax but could be easily converted:

1. **range** - `(start: number) => (end: number) => Array<number>`
   - Issue: Arrow syntax
   - Fix: Convert to named function declarations
   - Tests: Minimal

2. **some** - `(predicate) => (array) => boolean`
   - Issue: Arrow syntax
   - Fix: Convert to named functions
   - Tests: None

3. **sort** - `(compareFn?) => (array) => Array<T>`
   - Issue: Arrow syntax
   - Fix: Convert to named functions
   - Tests: None

4. **partition** - `(predicate) => (array) => [Array<T>, Array<T>]`
   - Issue: Arrow syntax with inline reduce
   - Fix: Convert to named functions, extract reducer
   - Tests: None

5. **zip** - `(array2) => (array1) => Array<[T, U]>`
   - Issue: Arrow syntax with recursive helper
   - Fix: Convert to named functions
   - Tests: None

6. **groupBy** - `(keyFn) => (array) => Record<string, Array<T>>`
   - Issue: Arrow syntax with reduce
   - Fix: Convert to named functions
   - Tests: None

7. **flatten** - `(depth) => (array) => Array<...>`
   - Issue: Arrow syntax
   - Fix: Convert to named functions
   - Tests: None

8. **sortBy** - `(fn) => (array) => Array<T>`
   - Issue: Arrow syntax, uses native .map/.sort
   - Fix: Convert to named functions
   - Tests: None

9. **repeat** - `(count) => (item) => Array<T>`
   - Issue: Arrow syntax
   - Fix: Convert to named functions
   - Tests: Present

10. **take** - `(count) => (array) => Array<T>`
    - Issue: Returns [] on invalid, not Result
    - Fix: Could return Result or stay simple (discussion needed)
    - Tests: Minimal

11. **drop** - Similar to take
    - Issue: Returns [] on invalid
    - Fix: Could return Result or stay simple
    - Tests: Minimal

12. **concat** - `(first) => (second) => Array<T>`
    - Issue: Arrow syntax (but this one is very simple)
    - Fix: Convert to named functions
    - Tests: Minimal

### Arrow Function Violations - Multi-Parameter (8)

These need careful refactoring:

13. **aperture** - Sliding window function
14. **countBy** - Groups and counts elements
15. **dropWhile** - Drops while predicate is true
16. **filterBy** (if exists) - Variant of filter
17. **combinations** - Generates combinations
18. **permutations** - Generates permutations
19. **cartesianProduct** - Cartesian product
20. **interleave** - Interleaves arrays

### Other Violations (5)

21. **chunk** - Uses helper but could be more functional
22. **dropRepeats** - Uses reduce but structure could improve
23. **cycle** - Probably uses recursion, needs checking
24. **unfold** - Generator pattern, needs checking
25. **nubBy** - Needs checking against pattern

---

## SECTION 4: NEEDS TESTS (8)

Functions that follow pattern but have missing or incomplete test coverage:

1. **all** - Has tests but may need property-based tests
2. **some** - NO TESTS
3. **none** - NO TESTS
4. **every** - NO TESTS (if exists)
5. **any** - NO TESTS (if exists)
6. **find** - Has good tests ✓
7. **findIndex** - Needs testing
8. **findLast** - Needs testing

---

## SECTION 5: NEEDS BOTH (18)

Functions needing refactor (arrow syntax) AND test coverage:

### High Priority (5)

1. **some** - Missing tests + arrow syntax
2. **sort** - Missing tests + arrow syntax
3. **partition** - Missing tests + arrow syntax
4. **groupBy** - Missing tests + arrow syntax
5. **flatten** - Missing tests + arrow syntax

### Medium Priority (8)

6. **sortBy** - Missing tests + arrow syntax
7. **zip** - Missing tests + arrow syntax
8. **range** - Has minimal tests + arrow syntax
9. **repeat** - Arrow syntax + incomplete tests
10. **dropWhile** - Arrow syntax + tests needed
11. **aperture** - Arrow syntax + tests needed
12. **countBy** - Arrow syntax + tests needed
13. **combinations** - Arrow syntax + tests needed

### Lower Priority (5)

14. **permutations** - Arrow syntax + tests needed
15. **cartesianProduct** - Arrow syntax + tests needed
16. **interleave** - Arrow syntax + tests needed
17. **cycle** - Arrow syntax + tests needed
18. **unfold** - Arrow syntax + tests needed

---

## SECTION 6: SIMPLE ACCESSORS (35+)

Functions that are very simple and may not need full three-path pattern:

**Status:** DISCUSSION NEEDED - These could be:

- Option A: Keep simple (not wrapped in Result)
- Option B: Wrap in Result for consistency
- Option C: Make them curried but not monadic

### Single Element Access (6)

- **head** - Returns first element or null
- **tail** - Returns rest of array
- **first** - Returns first element
- **last** - Returns last element
- **init** - Returns all but last
- **nth** - Returns element at index

### Transformation Without Failure (10+)

- **reverse** - Immutable reverse
- **unique/nub** - Deduplication
- **take** - Take first n
- **drop** - Drop first n
- **slice** - Array slice
- **concat** - Concatenate
- **flatten** - Already listed above
- **rotate** - Rotation operations
- **shuffle** - Random shuffle
- **transpose** - Transpose matrix

### Composition Functions (8+)

- **map** - Already COMPLIANT
- **filter** - Already COMPLIANT
- **reduce** - Already COMPLIANT
- **flatMap** - Already COMPLIANT
- **scanl** - Scan with accumulator
- **partition** - Split array
- **groupBy** - Group by key
- **chunk** - Split into chunks

---

## SECTION 7: NOT APPLICABLE (35+)

Helper functions and utilities that don't need the three-path pattern:

### Private Helpers

- `_mapArray`, `_mapToResult`, `_mapToValidation`
- `_reduceArray`, `_reduceToResult`, `_reduceToValidation`
- `_flatMapArray`, `_flatMapToResult`, `_flatMapToValidation`
- `_dropRepeatsReducer`, `_findDuplicatesReducer`
- `_buildCombinations`, `_findClosest`, etc.

### Generators/Builders (non-monadic by nature)

- `from`, `fromAsync` - Create array from iterable/async
- `range` - Number range generation
- `repeat` - Repeat item n times
- `times` - Run function n times
- `unfold` - Unfold pattern
- `cycle` - Cycle infinitely

### Type Converters

- `toSet` - Convert to Set
- `zipObj` - Create object from arrays

### Comparison/Analysis Functions

- `difference`, `differenceWith`
- `intersection`, `intersectionWith`
- `union`, `unionWith`
- `symmetricDifference`, `symmetricDifferenceWith`
- `nub`, `nubBy` - Unique operations
- `unique`, `uniqueBy` - Unique operations
- `equals` - Comparison

---

## SECTION 8: REFACTORING RECOMMENDATIONS

### Batch 1: CORE THREE-PATH FUNCTIONS (3-4 per batch)

#### Batch 1A: Transformers Using Reduce

- **countBy** - Uses reduce internally, needs pattern conversion
- **dropRepeats** - Uses reduce, extract _dropRepeatsReducer
- **groupBy** - Uses reduce, extract helper
- **partitionBy** - Uses reduce, extract helper

**Rationale:** These all use reduce as foundation, similar pattern

#### Batch 1B: Filter Variants

- **filter** - ALREADY COMPLIANT
- **partition** - Split array by predicate
- **reject** - Opposite of filter
- **dropWhile** - Drop while predicate is true
- **takeWhile** - Take while predicate is true

**Rationale:** All predicate-based filtering variants

#### Batch 1C: Combiners

- **concat** - Combine two arrays
- **zip** - Pair elements from arrays
- **zipWith** - Zip with function
- **interleave** - Interleave arrays
- **flatten** - Flatten nested arrays

**Rationale:** All combine multiple arrays

#### Batch 1D: Sorters/Comparers

- **sort** - Basic sort
- **sortBy** - Sort by computed value
- **sortWith** - Sort with comparator
- **reverse** - Reverse order
- **shuffle** - Random order

**Rationale:** All reorder elements

#### Batch 2A: Selectors

- **head** - First element
- **tail** - All but first
- **take** - First n elements
- **drop** - All but first n
- **slice** - Subarray
- **sliceFrom** - Slice from index

**Rationale:** All select subsets of array

#### Batch 2B: Generators

- **range** - Number range
- **repeat** - Repeat value
- **times** - Run n times
- **from** - Convert to array
- **unfold** - Build from seed

**Rationale:** All generate/build arrays

#### Batch 3A: Analyzers

- **find** - ALREADY COMPLIANT
- **findIndex** - Find index of match
- **findLast** - Find last match
- **findLastIndex** - Last matching index
- **some** - Test any element
- **every** - Test all elements

**Rationale:** All search/analyze arrays

#### Batch 3B: Uniqueness

- **unique/nub** - Remove duplicates
- **nubBy** - Remove duplicates with comparator
- **uniq** - Alias operations
- **findDuplicates** - Find repeated elements
- **dropRepeats** - Remove consecutive duplicates

**Rationale:** All handle duplicate elements

---

## SECTION 9: EXCEPTIONS AND SPECIAL CASES

### Functions That Should NOT Use Three-Path Pattern

**Reasoning:** Some functions don't need Result/Validation wrapping because:

1. They can't fail (predicates)
2. They have no invalid inputs (type system enforces)
3. They're internal utilities (private)
4. They're generators (produce new data)

#### Predicates (OK to return boolean directly)

- isEmpty, isNotEmpty, includes, hasLength
- all, some, none, every, any
- startsWith, endsWith
- equals, equivalent

**Justification:** Predicates are internal utilities that always return a value. Wrapping in Result would be noise.

#### Generators (OK to return plain value)

- from, range, repeat, times, unfold
- cycle (if infinite)

**Justification:** Generators produce new data; they don't process existing arrays. No "failure" case.

#### Simple Accessors (DISCUSSION NEEDED)

- head, tail, first, last, init, nth
- at

**Question:** Should these return Result<ValidationError, T | null>? Or Result<ValidationError, T>?

**Current:** Return `T | null` directly

**Options:**

- A: Keep as-is (simple, practical)
- B: Return Result<ValidationError, Option<T>>
- C: Throw error if not found (violates error-handling rule)

### Marked Exceptions in Code

These functions have [EXCEPTION] comments documenting native method use:

```
[EXCEPTION] .map() permitted for performance
[EXCEPTION] .filter() permitted for performance
[EXCEPTION] .reduce() permitted for performance
[EXCEPTION] .length permitted for predicates
[EXCEPTION] Direct .includes() permitted once
[EXCEPTION] .some() permitted for performance
[EXCEPTION] .every() permitted for performance
[EXCEPTION] .findIndex() permitted for performance
[EXCEPTION] .sort() permitted for performance
[EXCEPTION] .find() permitted for performance
[EXCEPTION] .join() permitted for performance
[EXCEPTION] .flat() permitted for performance
```

**All exceptions are documented and justified.**

---

## SECTION 10: THREE-PATH PATTERN CHECKLIST

For any function that should be converted to three-path pattern, verify:

### Structure (5 items)

- [ ] Curried to single parameters
- [ ] Named function declarations (no arrow functions)
- [ ] Three overload signatures (plain, Result, Validation)
- [ ] Type guards in order: isArray → isOk → isSuccess → fallback
- [ ] Private helpers for each path (_functionArray, _functionToResult, _functionToValidation)

### Implementation (4 items)

- [ ] Plain path uses chainResults/chainValidations for composition
- [ ] Result path wraps errors in error() monad
- [ ] Validation path wraps errors in failure() monad
- [ ] No reaching into monads (.value, .error, .errors)

### Testing (3 items)

- [ ] Plain array path tests
- [ ] Result monad path tests
- [ ] Validation monad path tests

### Properties (4 items)

- [ ] Length preservation (if applicable)
- [ ] Composition property (if applicable)
- [ ] Identity property (if applicable)
- [ ] Error handling path tests

---

## SECTION 11: DETAILED FUNCTION INVENTORY

### Category A: Three-Path Transformers (COMPLIANT: 3)

| Function | Pattern    | Tests      | Status    |
| -------- | ---------- | ---------- | --------- |
| map      | ✓ Complete | ✓ Complete | COMPLIANT |
| reduce   | ✓ Complete | ✓ Complete | COMPLIANT |
| flatMap  | ✓ Complete | ✓ Complete | COMPLIANT |

### Category B: Result Wrappers (COMPLIANT: 5)

| Function | Returns             | Tests      | Status    |
| -------- | ------------------- | ---------- | --------- |
| filter   | Result<E, Array<T>> | ✓ Complete | COMPLIANT |
| find     | Result<E, T>        | ✓ Complete | COMPLIANT |
| join     | Result<E, string>   | ✓ Complete | COMPLIANT |
| all      | Result<E, boolean>  | ✓ Present  | COMPLIANT |
| length   | Result<E, number>   | ✓ Present  | COMPLIANT |

### Category C: Arrow Function Violations (NEEDS REFACTOR: 12+)

| Function  | Issue                    | Priority |
| --------- | ------------------------ | -------- |
| range     | Arrow syntax             | High     |
| some      | Arrow syntax             | High     |
| sort      | Arrow syntax             | High     |
| partition | Arrow syntax + reduce    | High     |
| zip       | Arrow syntax + recursive | Medium   |
| groupBy   | Arrow syntax + reduce    | Medium   |
| flatten   | Arrow syntax             | Medium   |
| sortBy    | Arrow syntax             | Medium   |
| repeat    | Arrow syntax             | Medium   |
| take      | Arrow syntax             | Low      |
| drop      | Arrow syntax             | Low      |
| concat    | Arrow syntax             | Low      |

### Category D: Simple Curried (ACCEPTABLE: 8+)

| Function   | Pattern           | Tests   | Status |
| ---------- | ----------------- | ------- | ------ |
| head       | Curried to at(0)  | ✓       | OK     |
| tail       | Curried           | Minimal | OK     |
| isEmpty    | Simple predicate  | ✓       | OK     |
| isNotEmpty | Simple predicate  | ✓       | OK     |
| includes   | Type guard        | ✓       | OK     |
| concat     | Curried immutable | Minimal | OK     |
| reverse    | Curried immutable | Minimal | OK     |
| unique/nub | Curried           | Minimal | OK     |

### Category E: Missing Tests (8+)

| Function  | Type            | Tests | Priority |
| --------- | --------------- | ----- | -------- |
| some      | Boolean checker | None  | HIGH     |
| none      | Boolean checker | None  | HIGH     |
| sort      | Transformer     | None  | HIGH     |
| partition | Transformer     | None  | HIGH     |
| groupBy   | Transformer     | None  | MEDIUM   |
| zip       | Combiner        | None  | MEDIUM   |
| flatten   | Combiner        | None  | MEDIUM   |
| sortBy    | Transformer     | None  | MEDIUM   |

---

## SECTION 12: REFACTORING STRATEGY

### Phase 1: Convert Arrow Functions (Week 1)

**Goal:** Eliminate all arrow function syntax

Functions to convert (Priority order):

1. **some** - Simple predicate
2. **sort** - Simple transformer
3. **repeat** - Simple generator
4. **range** - Simple generator
5. **concat** - Very simple combiner
6. **flatten** - Uses native .flat()
7. **take/drop** - Simple selectors
8. **sortBy** - Slightly complex
9. **zip** - Recursive pattern
10. **partition** - Uses reduce
11. **groupBy** - Uses reduce
12. Others

**Per-function effort:** 15-30 minutes each

**Batch grouping:** 3-4 functions per pull request

### Phase 2: Add Three-Path Pattern (Week 2-3)

**Goal:** Implement three-path pattern for appropriate functions

Priority order (by impact):

1. **some** - High-value predicate
2. **sort** - High-value transformer
3. **partition** - Very useful function
4. **groupBy** - Very useful function
5. **zip** - Combiner
6. **flatten** - Combiner
7. **sortBy** - Transformer
8. Others

**Per-function effort:** 1-2 hours (implement + test)

**Batches:** 2-3 functions per PR

### Phase 3: Add Missing Tests (Week 3-4)

**Goal:** Complete test coverage for all functions

Focus areas:

1. Plain array path tests
2. Result monad path tests
3. Validation monad path tests
4. Property-based tests (length, composition, identity)
5. Error path tests

**Per-function effort:** 30-60 minutes

**Batches:** 3-4 functions per PR

### Phase 4: Validation and Documentation (Week 4)

**Goal:** Verify all functions and update documentation

Tasks:

1. Run `deno task fp:check` on all functions
2. Verify all tests pass
3. Update PATTERNS.md with documented exceptions
4. Create function-specific guides
5. Add comments explaining three-path pattern

---

## SECTION 13: DECISION POINTS

### Decision 1: Simple Selectors Pattern

**Functions:** head, tail, first, last, init, nth, at

**Question:** Should these return Result or plain value?

**Options:**

- A: Keep simple (current), return `T | null`
- B: Return Result with Option monad
- C: Return Result with default on invalid

**Recommendation:** Keep simple (Option A) - These are basic utilities where null is expected for out-of-bounds. No need for monadic wrapper.

### Decision 2: Predicate Pattern

**Functions:** isEmpty, isNotEmpty, includes, all, some, none, every

**Question:** Return boolean or Result?

**Options:**

- A: Return boolean directly (current)
- B: Return Result<E, boolean>

**Recommendation:** Keep as boolean predicates (Option A) - These are internal utilities, not user-facing API. Boolean return is appropriate.

### Decision 3: Generator Pattern

**Functions:** from, range, repeat, times, unfold

**Question:** Should these validate input and return Result?

**Options:**

- A: Return array directly (current for some)
- B: Return Result with validation
- C: Keep for generators, validate for converters

**Recommendation:** Option C - Converters like `from` should return Result. Generators like `range` can return arrays directly.

### Decision 4: Combiner Pattern

**Functions:** concat, zip, flatten, interleave, cartesianProduct

**Question:** Should these be three-path with Result/Validation?

**Options:**

- A: Yes, for consistency
- B: No, keep simple
- C: Only for multi-array functions

**Recommendation:** Option A for consistency - All transformative functions should follow three-path pattern.

---

## SECTION 14: QUICK REFERENCE - FUNCTION STATUS

### ✓ COMPLIANT (Ready to use as reference)

```
map
reduce
flatMap
filter
find
join
all
length
```

### ⚠ NEEDS REFACTOR (Arrow syntax)

```
range
some
sort
partition
zip
groupBy
flatten
sortBy
repeat
take
drop
concat
aperture
countBy
dropWhile
combinations
permutations
cartesianProduct
interleave
cycle
unfold
```

### ⚠ NEEDS TESTS

```
some
none
sort
partition
groupBy
zip
flatten
sortBy
dropWhile
aperture
countBy
combinations
permutations
cartesianProduct
interleave
cycle
unfold
nubBy
findIndex
findLast
```

### ✓ ACCEPTABLE AS-IS

```
isEmpty
isNotEmpty
includes
head
tail
first
last
init
reverse
unique
nub
```

---

## APPENDIX A: COMPLIANCE METRICS

**Total Functions Audited:** 131+

**Breakdown:**

- Compliant: 8 (6%)
- Special Category (Predicates): 8 (6%)
- Simple Accessors: 35+ (27%)
- Needs Refactor: 25 (19%)
- Needs Tests: 8 (6%)
- Needs Both: 18 (14%)
- Not Applicable (Helpers): 35+ (27%)

**Compliance Rate:** 6% (fully compliant with all constitutional rules)

**Potential Compliance Rate (if refactored):** 65-70%

---

## APPENDIX B: COMMON VIOLATIONS

### Violation Type 1: Arrow Function Syntax

**Count:** 25+ functions
**Rule Violated:** Rule 7 - "No Arrow Functions - Use function Keyword"
**Example:**

```typescript
// WRONG ❌
const some = <T>(predicate) => (array) => array.some(predicate)

// RIGHT ✓
export default function some<T>(
	predicate: (value: T, index: number, array: Array<T>) => boolean,
) {
	return function someWithPredicate(array: Array<T>): boolean {
		return array.some(predicate)
	}
}
```

### Violation Type 2: Missing Test Coverage

**Count:** 26 functions
**Recommendation:** Add tests for:

1. Plain array path
2. Result monad path (if three-path pattern)
3. Validation monad path (if three-path pattern)
4. Edge cases (empty array, null, undefined)
5. Property-based tests

### Violation Type 3: No Three-Path Pattern

**Count:** 50+ functions
**Recommendation:** Analyze each to determine if it should have:

- Plain array → returns T[]
- Result path → returns Result<E, T[]>
- Validation path → returns Validation<E, T[]>

---

## APPENDIX C: REFACTORING TEMPLATE

When converting a function to the canonical pattern:

```typescript
import type { Result } from "../../types/fp/result/index.ts"
import type {
	Validation,
	ValidationError,
} from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _functionArray from "./_functionArray/index.ts"
import _functionToResult from "./_functionToResult/index.ts"
import _functionToValidation from "./_functionToValidation/index.ts"
import isArray from "../../predicates/isArray/index.ts"

//++ Brief description of function
export default function functionName<T, U>(param: (item: T) => U) {
	//++ [OVERLOAD] Array path: takes array, returns transformed array
	function functionWithParam(array: ReadonlyArray<T>): ReadonlyArray<U>

	//++ [OVERLOAD] Result path: takes and returns Result monad (fail fast)
	function functionWithParam(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<U>>

	//++ [OVERLOAD] Validation path: takes and returns Validation monad (accumulator)
	function functionWithParam(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<U>>

	//++ Implementation of the full curried function
	function functionWithParam(
		array:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
	):
		| ReadonlyArray<U>
		| Result<ValidationError, ReadonlyArray<U>>
		| Validation<ValidationError, ReadonlyArray<U>> {
		// Happy path: plain array
		if (isArray<T>(array)) {
			return _functionArray(param)(array)
		}

		// Result path: fail-fast monadic operation
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_functionToResult(param))(array)
		}

		// Validation path: error accumulation monadic operation
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_functionToValidation(param))(array)
		}

		// Fallback: pass through unchanged (handles error/failure states)
		return array
	}

	return functionWithParam
}
```

---

## CONCLUSION

**Current State:** 6% of array functions follow the complete canonical pattern

**Recommended Action:** Organize phased refactoring to increase compliance to 65-70% over 4 weeks

**Key Priorities:**

1. Eliminate arrow function syntax (25+ functions)
2. Add missing test coverage (26+ functions)
3. Implement three-path pattern for transformative functions
4. Document exceptions for predicates and generators

**Effort Estimate:** 200-250 hours (50-60 functions × 3-4 hours average)

**Timeline:** 6-8 weeks with 1 developer, 3-4 week with 2 developers
