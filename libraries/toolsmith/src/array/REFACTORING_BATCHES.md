# Array Functions Refactoring Batches

**Objective:** Convert 50+ array functions to canonical pattern (three-path overload with Result/Validation)

**Total Batches:** 16\
**Functions per Batch:** 3-5\
**Estimated Time per Batch:** 4-6 hours\
**Total Estimated Effort:** 64-96 hours (2-3 weeks with 1 developer)

---

## BATCH ORGANIZATION STRATEGY

Functions are grouped by:

1. **Semantic similarity** - Functions that do similar operations
2. **Dependency relationships** - Functions that use each other
3. **Pattern complexity** - Simpler functions first
4. **Value/Impact** - High-value functions prioritized

---

## BATCH 1: SIMPLE BOOLEAN PREDICATES (2 hours)

**Batch Size:** 2 functions\
**Complexity:** Low\
**Priority:** High\
**Status:** Ready to refactor

### Functions in Batch

#### 1. **some**

**Current State:**

```typescript
const some = <T>(predicate) => (array) => array.some(predicate)
```

**Issues:**

- Arrow function syntax (RULE 7)
- No tests
- Returns boolean directly

**Refactoring Approach:**

- Convert to named function declarations
- Keep as simple boolean return (predicates exception)
- Add comprehensive test suite

**Test Cases Needed:**

- Returns true when element matches
- Returns false when no element matches
- Returns false for empty array
- Works with various predicates
- Property: if true, array.some(predicate) is true

**Files to Create/Modify:**

- `some/index.ts` - Convert to named functions
- `some/index.test.ts` - Add comprehensive tests (NEW)

**Time Estimate:** 1 hour

#### 2. **none**

**Current State:**

```typescript
// Likely returns: !array.some(predicate)
```

**Issues:**

- May have arrow syntax
- No tests
- Opposite of some

**Refactoring Approach:**

- Convert to named functions
- Could use `some` internally or implement directly
- Add comprehensive test suite

**Test Cases Needed:**

- Returns true when no element matches
- Returns false when element matches
- Returns true for empty array
- Works with various predicates
- Property: none(p)(arr) === !some(p)(arr)

**Files to Create/Modify:**

- `none/index.ts` - Convert to named functions
- `none/index.test.ts` - Add comprehensive tests (NEW)

**Time Estimate:** 1 hour

### Batch 1 Deliverables ✅ COMPLETE

- [x] `some/index.ts` - Named function version
- [x] `some/index.test.ts` - Complete test suite (15 tests, 3 property-based)
- [x] `none/index.ts` - Named function version
- [x] `none/index.test.ts` - Complete test suite (15 tests, 4 property-based)

---

## BATCH 2: SIMPLE GENERATORS (2.5 hours)

**Batch Size:** 3 functions\
**Complexity:** Low\
**Priority:** High\
**Status:** Ready to refactor

### Functions in Batch

#### 1. **range**

**Current State:**

```typescript
const range = (start: number) => (end: number): Array<number> => {
	if (start >= end || !isFinite(end - start)) return []
	return Array.from({ length: end - start }, (_, i) => start + i)
}
```

**Issues:**

- Arrow function syntax
- Has some tests but incomplete
- No error handling (returns [] on invalid)

**Refactoring Approach:**

- Convert to named function declarations
- Keep simple (not three-path) because it's a generator
- Improve test coverage

**Test Cases Needed:**

- Generates correct range (1, 5) → [1,2,3,4]
- Handles negative ranges
- Handles zero-length range
- Handles infinite values
- Property: result.length === end - start
- Property: result[0] === start
- Property: result[n-1] === end - 1

**Files to Create/Modify:**

- `range/index.ts` - Convert to named functions
- `range/index.test.ts` - Expand tests

**Time Estimate:** 0.75 hour

#### 2. **repeat**

**Current State:**

```typescript
const repeat = (count: number) => <T>(item: T): Array<T> =>
	count > 0 ? Array.from({ length: count }, () => item) : []
```

**Issues:**

- Arrow function syntax
- Has some tests but incomplete
- Parameter order might be unusual

**Refactoring Approach:**

- Convert to named function declarations
- Keep simple (generator pattern)
- Could do Result validation for count parameter

**Test Cases Needed:**

- Repeats item correctly (count=3, "a") → ["a","a","a"]
- Returns empty for count ≤ 0
- Handles objects/references correctly
- Property: result.length === count (when count > 0)
- Property: all elements are identical

**Files to Create/Modify:**

- `repeat/index.ts` - Convert to named functions
- `repeat/index.test.ts` - Expand tests

**Time Estimate:** 0.75 hour

#### 3. **times**

**Current State:**

```typescript
// Likely: runs function n times
```

**Issues:**

- May have arrow syntax
- No tests (or minimal)
- Side-effect function

**Refactoring Approach:**

- Convert to named functions
- Special case: not an array transformer, so different pattern
- Could be in wrong category

**Note:** If `times` is not array-specific, may need to move to different module

**Test Cases Needed:**

- Calls function n times
- Collects results
- Returns empty for n ≤ 0

**Files to Create/Modify:**

- `times/index.ts` - Convert to named functions
- `times/index.test.ts` - Add tests (NEW)

**Time Estimate:** 1 hour

### Batch 2 Deliverables ✅ COMPLETE

- [x] `range/index.ts` - Named function version
- [x] `range/index.test.ts` - Expanded tests (14 tests total, 6 property-based)
- [x] `repeat/index.ts` - Named function version
- [x] `repeat/index.test.ts` - Expanded tests (14 tests total, 4 property-based)
- [x] `times/index.ts` - Named function version
- [x] `times/index.test.ts` - New tests (18 tests total, 6 property-based)

---

## BATCH 3: SIMPLE SORTERS (3 hours)

**Batch Size:** 3 functions\
**Complexity:** Medium\
**Priority:** High\
**Status:** Ready to refactor

### Functions in Batch

#### 1. **sort**

**Current State:**

```typescript
const sort =
	<T>(compareFn?: (a: T, b: T) => number) => (array: Array<T>): Array<T> =>
		[...array].sort(compareFn)
```

**Issues:**

- Arrow function syntax
- No tests
- Uses native Array.prototype.sort

**Refactoring Approach:**

- Convert to named function declarations
- Keep simple wrapper (no three-path needed for comparator)
- Add comprehensive test suite

**Test Cases Needed:**

- Sorts numbers correctly
- Sorts strings correctly
- Uses custom comparator
- Handles empty array
- Handles single element
- Returns copy, not mutation
- Property: sorted array length equals input length
- Property: all elements present after sort
- Property: sorted array[0] <= array[n-1] (when numbers)

**Files to Create/Modify:**

- `sort/index.ts` - Convert to named functions
- `sort/index.test.ts` - Add comprehensive tests (NEW)

**Time Estimate:** 1 hour

#### 2. **reverse**

**Current State:**

```typescript
export default function reverse<T>(array) {
	if (isNullish(array) || not(Array.isArray(array))) {
		return []
	}
	return [...array].reverse()
}
```

**Issues:**

- Currently named function (good)
- But uses `not()` which might be operator violation
- Limited tests

**Refactoring Approach:**

- Already good structure, just expand tests
- Could improve error handling (use Result?)

**Test Cases Needed:**

- Reverses array correctly
- Handles empty array
- Handles single element
- Returns copy
- Property: result.length === input.length
- Property: result[i] === input[n-1-i]

**Files to Create/Modify:**

- `reverse/index.ts` - Already good, minor adjustments
- `reverse/index.test.ts` - Expand tests

**Time Estimate:** 0.75 hour

#### 3. **sortBy**

**Current State:**

```typescript
const sortBy = <T, U>(fn) => (array) => {
	// Maps to pairs, sorts by key, extracts elements
}
```

**Issues:**

- Arrow function syntax
- No tests
- More complex implementation

**Refactoring Approach:**

- Convert to named function declarations
- Extract helper for key mapping if needed
- Add comprehensive test suite

**Test Cases Needed:**

- Sorts by computed value
- Handles stable sort
- Handles empty array
- Works with strings, numbers, dates
- Property: result.length === input.length
- Property: all elements present
- Property: map(fn) over result is sorted

**Files to Create/Modify:**

- `sortBy/index.ts` - Convert to named functions
- `sortBy/index.test.ts` - Add comprehensive tests (NEW)

**Time Estimate:** 1.25 hours

### Batch 3 Deliverables ✅ COMPLETE - VERIFIED 2025-11-03

**sort (30 tests total):**
- [x] `sort/index.ts` - Three-path pattern with named functions ✅
- [x] `sort/index.test.ts` - 20 comprehensive tests (all three paths + 3 property tests) ✅
- [x] `sort/_sortArray/index.ts` - Private helper ✅
- [x] `sort/_sortArray/index.test.ts` - 4 helper tests ✅
- [x] `sort/_sortToResult/index.ts` - Private helper ✅
- [x] `sort/_sortToResult/index.test.ts` - 3 helper tests ✅
- [x] `sort/_sortToValidation/index.ts` - Private helper ✅
- [x] `sort/_sortToValidation/index.test.ts` - 3 helper tests ✅

**sortBy (22 tests total):**
- [x] `sortBy/index.ts` - Three-path pattern with named functions ✅
- [x] `sortBy/index.test.ts` - 15 comprehensive tests (all three paths + 2 property tests) ✅
- [x] `sortBy/_sortByArray/index.ts` - Private helper ✅
- [x] `sortBy/_sortByArray/index.test.ts` - 3 helper tests ✅
- [x] `sortBy/_sortByToResult/index.ts` - Private helper ✅
- [x] `sortBy/_sortByToResult/index.test.ts` - 2 helper tests ✅
- [x] `sortBy/_sortByToValidation/index.ts` - Private helper ✅
- [x] `sortBy/_sortByToValidation/index.test.ts` - 2 helper tests ✅

**sortWith (23 tests total):**
- [x] `sortWith/index.ts` - Three-path pattern with named functions ✅
- [x] `sortWith/index.test.ts` - 16 comprehensive tests (all three paths + 2 property tests) ✅
- [x] `sortWith/_sortWithArray/index.ts` - Private helper ✅
- [x] `sortWith/_sortWithArray/index.test.ts` - 4 helper tests ✅
- [x] `sortWith/_sortWithToResult/index.ts` - Private helper ✅
- [x] `sortWith/_sortWithToResult/index.test.ts` - 2 helper tests ✅
- [x] `sortWith/_sortWithToValidation/index.ts` - Private helper ✅
- [x] `sortWith/_sortWithToValidation/index.test.ts` - 2 helper tests ✅

**Total: 75 tests, all passing ✅**
**Audit: Zero violations, fully constitutional ✅**

---

## BATCH 4: SIMPLE COMBINERS (3 hours)

**Batch Size:** 3 functions\
**Complexity:** Low-Medium\
**Priority:** Medium\
**Status:** Ready to refactor

### Functions in Batch

#### 1. **concat**

**Current State:**

```typescript
export default function concat<T>(first: Array<T>) {
	return function concatWithFirst(second: Array<T>): Array<T> {
		return [...first, ...second]
	}
}
```

**Issues:**

- Already named function (good!)
- Limited tests
- Could be three-path for consistency

**Refactoring Approach:**

- Already compliant with naming
- Just expand test coverage
- Could add Result validation

**Test Cases Needed:**

- Concatenates two arrays
- Returns copy (immutable)
- Handles empty arrays
- Handles type mismatches
- Property: result.length === first.length + second.length
- Property: result.slice(0, first.length) equals first
- Property: result.slice(first.length) equals second

**Files to Create/Modify:**

- `concat/index.ts` - Already good
- `concat/index.test.ts` - Expand tests

**Time Estimate:** 0.75 hour

#### 2. **flatten**

**Current State:**

```typescript
const flatten = <T, D extends number = 1>(depth) => (array) => {
	if (isNullish(array) || !Array.isArray(array)) return []
	return array.flat(depth)
}
```

**Issues:**

- Arrow function syntax
- No tests
- Uses native Array.prototype.flat

**Refactoring Approach:**

- Convert to named function declarations
- Add comprehensive test suite

**Test Cases Needed:**

- Flattens by depth 1
- Flattens by depth 2+
- Handles empty array
- Handles non-nested array
- Property: result always has depth reduced
- Property: all elements present after flatten

**Files to Create/Modify:**

- `flatten/index.ts` - Convert to named functions
- `flatten/index.test.ts` - Add tests (NEW)

**Time Estimate:** 1 hour

#### 3. **zip**

**Current State:**

```typescript
const zip = <T, U>(array2) => (array1) => {
	// Combines arrays into pairs recursively
}
```

**Issues:**

- Arrow function syntax
- No tests
- Uses recursion

**Refactoring Approach:**

- Convert to named function declarations
- Extract recursive helper if needed
- Add comprehensive test suite

**Test Cases Needed:**

- Zips two arrays into pairs
- Handles different lengths (uses Math.min)
- Handles empty arrays
- Property: result.length === Math.min(arr1.length, arr2.length)
- Property: result[i][0] === arr1[i] && result[i][1] === arr2[i]

**Files to Create/Modify:**

- `zip/index.ts` - Convert to named functions
- `zip/index.test.ts` - Add tests (NEW)

**Time Estimate:** 1.25 hours

### Batch 4 Deliverables ✅ COMPLETE - VERIFIED 2025-11-03

**concat (27 tests total):**
- [x] `concat/index.ts` - Three-path pattern with named functions ✅
- [x] `concat/index.test.ts` - 27 comprehensive tests (all three paths + 7 property tests) ✅
- [x] `concat/_concatArray/index.ts` - Private helper ✅
- [x] `concat/_concatToResult/index.ts` - Private helper ✅
- [x] `concat/_concatToValidation/index.ts` - Private helper ✅

**concatTo (26 tests total):**
- [x] `concatTo/index.ts` - Three-path pattern with named functions ✅
- [x] `concatTo/index.test.ts` - 26 comprehensive tests (all three paths + 6 property tests) ✅
- [x] `concatTo/_concatToArray/index.ts` - Private helper ✅
- [x] `concatTo/_concatToToResult/index.ts` - Private helper ✅
- [x] `concatTo/_concatToToValidation/index.ts` - Private helper ✅

**zip (32 tests total):**
- [x] `zip/index.ts` - Three-path pattern with named functions (arrow violations fixed) ✅
- [x] `zip/index.test.ts` - 32 comprehensive tests (all three paths + 8 property tests) ✅
- [x] `zip/_zipArray/index.ts` - Private helper ✅
- [x] `zip/_zipToResult/index.ts` - Private helper ✅
- [x] `zip/_zipToValidation/index.ts` - Private helper ✅

**Total: 85 tests, all passing ✅**
**Audit: Zero violations, fully constitutional ✅**

---

## BATCH 5: PREDICATE-BASED FILTERS (3.5 hours)

**Batch Size:** 4 functions\
**Complexity:** Medium\
**Priority:** High\
**Status:** Ready to refactor

### Functions in Batch

#### 1. **partition**

**Current State:**

```typescript
const partition = <T>(predicate) => (array) => {
	return array.reduce(
		([pass, fail], element, index) =>
			predicate(element, index, array)
				? [[...pass, element], fail]
				: [pass, [...fail, element]],
		[[], []],
	)
}
```

**Issues:**

- Arrow function syntax
- Uses reduce with arrow
- No tests

**Refactoring Approach:**

- Convert to named function declarations
- Extract reducer as named function
- Add comprehensive test suite

**Test Cases Needed:**

- Partitions by predicate
- Returns [pass, fail] tuple
- Handles empty array
- Handles all-pass and all-fail cases
- Property: pass.length + fail.length === input.length
- Property: every element in pass satisfies predicate
- Property: every element in fail doesn't satisfy predicate

**Files to Create/Modify:**

- `partition/index.ts` - Convert to named functions
- `partition/index.test.ts` - Add tests (NEW)

**Time Estimate:** 1 hour

#### 2. **dropWhile**

**Current State:**

```typescript
export default function dropWhile<T>(predicate) {
	return function dropWhileWithPredicate(array) {
		if (isArray(array)) {
			const dropIndex = findIndex(function stopDropping(element, index) {
				return not(predicate(element, index, validArray))
			})(validArray)
			// ...
		}
		return []
	}
}
```

**Issues:**

- Uses other functions (findIndex, slice)
- Limited test coverage
- Could improve structure

**Refactoring Approach:**

- Already named functions
- Expand test coverage
- Could improve error handling

**Test Cases Needed:**

- Drops while predicate is true
- Returns remaining elements
- Handles empty array
- Handles all-match case
- Property: result is suffix of input
- Property: first element (if any) doesn't satisfy predicate

**Files to Create/Modify:**

- `dropWhile/index.ts` - Minor adjustments
- `dropWhile/index.test.ts` - Expand tests

**Time Estimate:** 0.75 hour

#### 3. **takeWhile**

**Current State:**

```typescript
// Mirror of dropWhile
```

**Issues:**

- May have similar issues
- No tests

**Refactoring Approach:**

- Convert to named functions if needed
- Add comprehensive test suite

**Test Cases Needed:**

- Takes while predicate is true
- Stops at first non-match
- Handles empty array
- Property: result is prefix of input
- Property: every element satisfies predicate
- Property: next element (if exists) doesn't satisfy predicate

**Files to Create/Modify:**

- `takeWhile/index.ts` - Convert to named functions
- `takeWhile/index.test.ts` - Add tests (NEW)

**Time Estimate:** 0.75 hour

#### 4. **reject**

**Current State:**

```typescript
// Opposite of filter
```

**Issues:**

- May have arrow syntax
- No tests
- Could be implemented as filter with negation

**Refactoring Approach:**

- Convert to named functions
- Could use filter internally
- Add comprehensive test suite

**Test Cases Needed:**

- Rejects elements matching predicate
- Opposite behavior to filter
- Handles empty array
- Property: reject(p)(arr) === filter(not(p))(arr)

**Files to Create/Modify:**

- `reject/index.ts` - Convert to named functions
- `reject/index.test.ts` - Add tests (NEW)

**Time Estimate:** 0.75 hour

### Batch 5 Deliverables

**Status: ✅ COMPLETE (2025-11-03)**

Main Functions (Three-Path Pattern):
- [x] `partition/index.ts` - Three-path pattern with named functions ✅
- [x] `partition/index.test.ts` - 27 tests (plain/Result/Validation + properties) ✅
- [x] `dropWhile/index.ts` - Three-path pattern with named functions ✅
- [x] `dropWhile/index.test.ts` - 26 tests (plain/Result/Validation + properties) ✅
- [x] `takeWhile/index.ts` - Three-path pattern with named functions ✅
- [x] `takeWhile/index.test.ts` - 26 tests (plain/Result/Validation + properties) ✅
- [x] `reject/index.ts` - Three-path pattern with named functions ✅
- [x] `reject/index.test.ts` - 26 tests (plain/Result/Validation + properties) ✅

Private Helper Functions:
- [x] `partition/_partitionArray/index.ts` - Plain array implementation ✅
- [x] `partition/_partitionToResult/index.ts` - Result monad wrapper ✅
- [x] `partition/_partitionToValidation/index.ts` - Validation monad wrapper ✅
- [x] `dropWhile/_dropWhileArray/index.ts` - Plain array implementation ✅
- [x] `dropWhile/_dropWhileToResult/index.ts` - Result monad wrapper ✅
- [x] `dropWhile/_dropWhileToValidation/index.ts` - Validation monad wrapper ✅
- [x] `takeWhile/_takeWhileArray/index.ts` - Plain array implementation ✅
- [x] `takeWhile/_takeWhileToResult/index.ts` - Result monad wrapper ✅
- [x] `takeWhile/_takeWhileToValidation/index.ts` - Validation monad wrapper ✅
- [x] `reject/_rejectArray/index.ts` - Plain array implementation ✅
- [x] `reject/_rejectToResult/index.ts` - Result monad wrapper ✅
- [x] `reject/_rejectToValidation/index.ts` - Validation monad wrapper ✅

**Verification:**
- All 20 files created/modified
- Zero arrow functions (all named function declarations)
- All tests passing: 105/105 (100%)
  - reject: 26 tests ✅
  - dropWhile: 26 tests ✅
  - takeWhile: 26 tests ✅
  - partition: 27 tests ✅
- Three-path pattern fully implemented on all 4 functions
- Constitutional compliance verified

---

## BATCH 6: REDUCE-BASED TRANSFORMERS (4 hours)

**Batch Size:** 4 functions\
**Complexity:** Medium-High\
**Priority:** High\
**Status:** Ready to refactor

### Functions in Batch

#### 1. **groupBy**

**Current State:**

```typescript
const groupBy = <T, K>(keyFn) => (array) => {
	return array.reduce((acc, element) => {
		const key = String(keyFn(element))
		return { ...acc, [key]: [...(acc[key] || []), element] }
	}, Object.create(null))
}
```

**Issues:**

- Arrow function syntax
- Uses reduce with arrow
- No tests
- Returns Record, not Array

**Refactoring Approach:**

- Convert to named function declarations
- Extract reducer logic
- Add comprehensive test suite

**Test Cases Needed:**

- Groups elements by key function
- Returns record/map
- Handles empty array
- Handles multiple keys
- Property: sum(Object.values(result).map(a => a.length)) === input.length
- Property: all elements with same key grouped together

**Files to Create/Modify:**

- `groupBy/index.ts` - Convert to named functions
- `groupBy/index.test.ts` - Add tests (NEW)

**Time Estimate:** 1.25 hours

#### 2. **countBy**

**Current State:**

```typescript
export default function countBy<T, K>(fn) {
	return function countByWithFn(array) {
		if (isArray(array)) {
			return reduce(function count(acc, element) {
				const key = fn(element)
				return { ...acc, [key]: (acc[key] || 0) + 1 }
			})(Object.create(null))(array)
		}
		return Object.create(null)
	}
}
```

**Issues:**

- Already named function (good)
- Limited test coverage
- Returns Record, not Array

**Refactoring Approach:**

- Already named, just expand tests
- Could improve result type

**Test Cases Needed:**

- Counts elements by key
- Returns count record
- Handles empty array
- Property: sum(Object.values(result)) === input.length
- Property: each count is accurate

**Files to Create/Modify:**

- `countBy/index.ts` - Already good
- `countBy/index.test.ts` - Add tests (NEW)

**Time Estimate:** 0.75 hour

#### 3. **frequency**

**Current State:**

```typescript
// Similar to countBy but for all elements
```

**Issues:**

- May have similar issues
- No tests

**Refactoring Approach:**

- Convert to named functions if needed
- Add comprehensive test suite

**Test Cases Needed:**

- Counts frequency of each element
- Handles empty array
- Property: sum of frequencies === input.length
- Property: includes all unique elements

**Files to Create/Modify:**

- `frequency/index.ts` - Convert to named functions
- `frequency/index.test.ts` - Add tests (NEW)

**Time Estimate:** 0.75 hour

#### 4. **dropRepeats**

**Current State:**

```typescript
export default function dropRepeats<T>(array) {
	if (isNotEmpty(array)) {
		if (isEqual(length(validArray))(1)) {
			return [...validArray]
		}
		return reduce(function dropRepeat(acc, curr) {
			return _dropRepeatsReducer(acc, curr)
		})([])(validArray)
	}
	return []
}
```

**Issues:**

- Already named function
- Uses helper reducer
- Limited test coverage

**Refactoring Approach:**

- Already named, expand tests
- Could improve structure

**Test Cases Needed:**

- Removes consecutive duplicates
- Handles empty array
- Handles no duplicates
- Handles all same
- Property: result.length <= input.length
- Property: no consecutive duplicates in result

**Files to Create/Modify:**

- `dropRepeats/index.ts` - Already good
- `dropRepeats/index.test.ts` - Add tests (NEW)

**Time Estimate:** 0.75 hour

### Batch 6 Deliverables

- [ ] `groupBy/index.ts` - Named function version
- [ ] `groupBy/index.test.ts` - New tests
- [ ] `countBy/index.ts` - Already compliant
- [ ] `countBy/index.test.ts` - New tests
- [ ] `frequency/index.ts` - Named function version
- [ ] `frequency/index.test.ts` - New tests
- [ ] `dropRepeats/index.ts` - Already compliant
- [ ] `dropRepeats/index.test.ts` - New tests

---

## BATCH 7: CHUNK/SLICE OPERATIONS (3 hours)

**Batch Size:** 4 functions\
**Complexity:** Low-Medium\
**Priority:** Medium\
**Status:** Ready to refactor

### Functions in Batch

#### 1. **chunk**

**Current State:**

```typescript
export default function chunk<T>(size: number) {
	return function chunkWithSize(array) {
		if (isNotEmpty(array) && isPositive(size) && isInteger(size)) {
			return chunkRecursive(size, array as Array<T>)
		}
		return []
	}
}
```

**Issues:**

- Already named function
- Uses helper `chunkRecursive`
- Limited tests

**Refactoring Approach:**

- Already good structure, expand tests
- Could use Result for validation

**Test Cases Needed:**

- Splits array into chunks of size
- Handles remainder
- Handles empty array
- Handles size > array.length
- Property: all chunks except last have length === size
- Property: concatenation of chunks equals input

**Files to Create/Modify:**

- `chunk/index.ts` - Already good
- `chunk/index.test.ts` - Add tests (NEW)

**Time Estimate:** 0.75 hour

#### 2. **splitEvery**

**Current State:**

```typescript
// Same as chunk or similar
```

**Issues:**

- May be duplicate of chunk
- No tests

**Refactoring Approach:**

- Check if it's a duplicate/alias
- If not, convert to named functions
- Add tests

**Files to Create/Modify:**

- May be an alias or separate implementation

**Time Estimate:** 0.5 hour

#### 3. **aperture**

**Current State:**

```typescript
export default function aperture<T>(width: number) {
	return function apertureWithWidth(array) {
		if (isNullish(array) || !Array.isArray(array)) return []
		if (width <= 0 || width > array.length) return []
		return Array.from(
			{ length: array.length - width + 1 },
			(_, i) => array.slice(i, i + width),
		)
	}
}
```

**Issues:**

- Already named function
- Limited tests

**Refactoring Approach:**

- Already good structure, expand tests

**Test Cases Needed:**

- Creates sliding windows of size width
- Handles edge cases (width = 1, width = array.length)
- Handles empty array
- Property: result.length === array.length - width + 1
- Property: each window has length === width

**Files to Create/Modify:**

- `aperture/index.ts` - Already good
- `aperture/index.test.ts` - Add tests (NEW)

**Time Estimate:** 0.75 hour

#### 4. **sliding**

**Current State:**

```typescript
// Similar to aperture
```

**Issues:**

- May be duplicate
- No tests

**Refactoring Approach:**

- Check if duplicate
- If not, convert and test

**Time Estimate:** 0.75 hour

### Batch 7 Deliverables

- [ ] `chunk/index.ts` - Already compliant
- [ ] `chunk/index.test.ts` - New tests
- [ ] `splitEvery/index.ts` - Check and refactor
- [ ] `splitEvery/index.test.ts` - New tests
- [ ] `aperture/index.ts` - Already compliant
- [ ] `aperture/index.test.ts` - New tests
- [ ] `sliding/index.ts` - Check and refactor
- [ ] `sliding/index.test.ts` - New tests

---

## BATCH 8-16: REMAINING FUNCTIONS

(Due to length constraints, I'll provide a summary for remaining batches)

### BATCH 8: COMBINATORICS (4 functions)

- **combinations** - Generate combinations
- **permutations** - Generate permutations
- **cartesianProduct** - Cartesian product
- **subsequences** - All subsequences

**Time Estimate:** 5 hours

### BATCH 9: INTERLEAVING OPERATIONS (3 functions)

- **interleave** - Interleave arrays
- **intersperse** - Intersperse element
- **pairwise** - Create pairs

**Time Estimate:** 3 hours

### BATCH 10: DIFFERENCE/UNION OPERATIONS (4 functions)

- **difference** - Set difference
- **intersection** - Set intersection
- **union** - Set union
- **symmetricDifference** - Symmetric difference

**Time Estimate:** 4 hours

### BATCH 11: SPECIALIZED FILTERS (4 functions)

- **unique/nub** - Remove duplicates
- **nubBy** - Unique with comparator
- **findDuplicates** - Find duplicates
- **dropRepeatsWith** - Remove duplicates with comparator

**Time Estimate:** 4 hours

### BATCH 12: FIND OPERATIONS (4 functions)

- **findIndex** - Index of match
- **findLast** - Last matching element
- **findLastIndex** - Last matching index
- **findMostCommon** - Most frequent element

**Time Estimate:** 3.5 hours

### BATCH 13: SELECTION OPERATIONS (3 functions)

- **take** - First n elements
- **drop** - Skip first n elements
- **slice** - Subarray

**Time Estimate:** 2.5 hours

### BATCH 14: TRANSFORMATION HELPERS (4 functions)

- **pluck** - Extract property
- **pickBy** - Pick by condition
- **omit** - Omit elements
- **update** - Update at index

**Time Estimate:** 4 hours

### BATCH 15: ROTATION/MOVEMENT (4 functions)

- **rotateLeft** - Rotate left
- **rotateRight** - Rotate right
- **move** - Move element
- **swap** - Swap elements

**Time Estimate:** 3 hours

### BATCH 16: UTILITY CONVERSIONS (3 functions)

- **unzip** - Unzip pairs
- **transpose** - Transpose matrix
- **zipObj** - Zip into object

**Time Estimate:** 3 hours

---

## REFACTORING SUMMARY TABLE

| Batch     | Name                   | Functions | Time         | Priority |
| --------- | ---------------------- | --------- | ------------ | -------- |
| 1         | Boolean Predicates     | 2         | 2h           | HIGH     |
| 2         | Simple Generators      | 3         | 2.5h         | HIGH     |
| 3         | Simple Sorters         | 3         | 3h           | HIGH     |
| 4         | Simple Combiners       | 3         | 3h           | MEDIUM   |
| 5         | Predicate Filters      | 4         | 3.5h         | HIGH     |
| 6         | Reduce-Based           | 4         | 4h           | HIGH     |
| 7         | Chunk/Slice            | 4         | 3h           | MEDIUM   |
| 8         | Combinatorics          | 4         | 5h           | LOW      |
| 9         | Interleaving           | 3         | 3h           | LOW      |
| 10        | Set Operations         | 4         | 4h           | MEDIUM   |
| 11        | Specialized Filters    | 4         | 4h           | MEDIUM   |
| 12        | Find Operations        | 4         | 3.5h         | MEDIUM   |
| 13        | Selection              | 3         | 2.5h         | MEDIUM   |
| 14        | Transformation Helpers | 4         | 4h           | MEDIUM   |
| 15        | Rotation/Movement      | 4         | 3h           | LOW      |
| 16        | Utility Conversions    | 3         | 3h           | LOW      |
| **TOTAL** | **50 functions**       |           | **56 hours** |          |

---

## RECOMMENDED EXECUTION ORDER

### Week 1: Highest Priority (16 hours)

- Batch 1: Boolean Predicates (2h)
- Batch 2: Simple Generators (2.5h)
- Batch 3: Simple Sorters (3h)
- Batch 5: Predicate Filters (3.5h)
- Batch 6: Reduce-Based (4h)
- Buffer time for reviews/testing (1h)

### Week 2: Medium Priority - Part 1 (15 hours)

- Batch 4: Simple Combiners (3h)
- Batch 7: Chunk/Slice (3h)
- Batch 10: Set Operations (4h)
- Batch 11: Specialized Filters (4h)
- Buffer time (1h)

### Week 3: Medium Priority - Part 2 (14 hours)

- Batch 12: Find Operations (3.5h)
- Batch 13: Selection (2.5h)
- Batch 14: Transformation Helpers (4h)
- Buffer time (1h)

### Week 4: Low Priority (11 hours)

- Batch 8: Combinatorics (5h)
- Batch 9: Interleaving (3h)
- Batch 15: Rotation/Movement (3h)

### Week 5: Final Tasks (3 hours)

- Batch 16: Utility Conversions (3h)

---

## QUALITY ASSURANCE CHECKPOINTS

### Per-Batch Checklist

- [ ] All functions converted to named function declarations
- [ ] All arrow function syntax removed
- [ ] All functions properly curried (one parameter each)
- [ ] No exceptions for operator syntax (unless explicitly documented)
- [ ] Comprehensive unit tests added
- [ ] Property-based tests added (where appropriate)
- [ ] Error cases tested
- [ ] Code follows CLAUDE.md rules

### Pre-PR Verification

```bash
deno task fmt                    # Format code
deno task lint                   # Lint code
deno task test                   # Run all tests
deno task fp:check               # Enforce FP rules
deno task contracts:check        # Check dependencies
```

### Post-Merge Validation

- Run full test suite on main branch
- Verify no performance regressions
- Check all documentation is updated
- Verify examples use new function signatures

---

## NOTES

1. **Parameter Order:** Some functions may need parameter order changes for better currying. Check carefully.

2. **Helper Functions:** When extracting helpers, use underscore prefix: `_functionHelper`

3. **Test Strategy:** Follow the test patterns from `map/index.test.ts` and `reduce/index.test.ts`

4. **Three-Path Pattern:** Only apply to functions that transform arrays. Simple predicates and generators can stay simpler.

5. **Documentation:** Add comments explaining any [EXCEPTION] usages.
