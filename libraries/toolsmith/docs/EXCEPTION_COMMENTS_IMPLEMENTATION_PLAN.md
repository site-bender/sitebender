# Toolsmith Exception Comments Implementation Plan

## Purpose

Add `//++ [EXCEPTION]` comments to all Toolsmith library internal implementations that use native JavaScript operators and methods for performance reasons. These violations of constitutional rules are permitted ONLY within the Toolsmith library itself because Toolsmith provides the functional wrappers that other libraries use.

## Rationale

**Why Toolsmith gets exceptions:**
- Toolsmith IS the functional programming library that wraps native JavaScript
- Other libraries use Toolsmith's curried functions to avoid raw operators
- Toolsmith must use native operations internally for performance
- Without these wrappers, functional programming would be impossible in this codebase

**What needs exception comments:**
1. Raw operators: `===`, `!==`, `<`, `>`, `<=`, `>=`, `!`, `&&`, `||`
2. OOP methods: `.map()`, `.filter()`, `.reduce()`, `.find()`, `.every()`, `.some()`, `.includes()`
3. Property access: `.length`, `.prototype`
4. Type checking: `typeof`, `instanceof`
5. String methods: `.split()`, `.slice()`, `.trim()`, `.match()`, `.test()`, `.replace()`
6. Array methods: `.push()`, `.splice()`, `.concat()`, `.join()`
7. Parsing: `parseInt()`, `parseFloat()`, `Number()`, `String()`

## Exception Comment Format

```typescript
//++ [EXCEPTION] <operator/method> permitted in Toolsmith for performance - provides functional wrapper for other libraries
```

**Examples:**

```typescript
// For comparisons
//++ [EXCEPTION] === and !== permitted in Toolsmith for performance - provides isEqual wrapper
if (value === null) {

// For array methods
//++ [EXCEPTION] .filter() permitted in Toolsmith for performance - provides filter wrapper
const filtered = array.filter(function predicate(item) {

// For typeof
//++ [EXCEPTION] typeof permitted in Toolsmith for performance - provides type predicate wrappers
return typeof value === "string"

// For .length
//++ [EXCEPTION] .length permitted in Toolsmith for performance - provides length wrapper
if (value.length === 0) {
```

## Implementation Checklist

### Phase 1: Predicates (Priority 1 - Most Used)

**Status: ✅ COMPLETED** (Completed: 2025-11-01)

**Summary:**
- Total predicate files processed: 67
- Files already had exception comments: 18
- Files needed new exception comments: 42
- Files modified: 42
- Files using only functional wrappers (no violations): 7

**Key files updated:**
- [x] **predicates/isBigInteger/index.ts** - Already had comment ✓
- [x] **predicates/isNumber/index.ts** - Already had comment ✓
- [x] **predicates/isObject/index.ts** - ✅ Added comment for `typeof`, `===`, `&&`
- [x] **predicates/isThreeDecimalPlaces/index.ts** - Already had comment ✓
- [x] **predicates/isFourDecimalPlaces/index.ts** - ✅ Added comments
- [x] **predicates/isEightDecimalPlaces/index.ts** - ✅ Added comments
- [x] **predicates/isIsbn10/index.ts** - ✅ Added comments for `.split()`, `.reduce()`, `.map()`, `===`, `%`
- [x] **predicates/isFunction/index.ts** - ✅ Added comment for `typeof`, `===`
- [x] **predicates/isP3Color/index.ts** - ✅ Added comments
- [x] **predicates/isOklchColor/index.ts** - ✅ Added comments
- [x] **predicates/isHexColor/index.ts** - ✅ Added comments
- [x] **predicates/isBase58/index.ts** - ✅ Added comments
- [x] **predicates/isChar/index.ts** - ✅ Added comments
- [x] **predicates/isNonEmptyString/index.ts** - ✅ Added comments
- [x] **predicates/isNonEmptyArray/index.ts** - ✅ Added comments
- [x] **predicates/isUuid/index.ts** - ✅ Added comment
- [x] **predicates/isLanguageCode/index.ts** - ✅ Added comments
- [x] **predicates/isCurrencyCode/index.ts** - ✅ Added comments
- [x] **predicates/isCountryCode/index.ts** - ✅ Added comments
- [x] **predicates/isPlainObject/index.ts** - Already had comment ✓
- [x] **predicates/hasTag/index.ts** - Already had comment ✓
- [x] **predicates/isCommentNode/index.ts** - Uses only functional wrappers (no violations)
- [x] **predicates/isTextNode/index.ts** - Uses only functional wrappers (no violations)
- [x] **predicates/isVirtualNode/index.ts** - Uses only functional wrappers (no violations)
- [x] **predicates/isPercent/index.ts** - ✅ Added comments

All 67 predicate files reviewed and documented.

### Phase 2: Newtypes (Priority 2 - Recently Completed)

**Status: ✅ COMPLETED** (Completed: 2025-11-01)

**Summary:**
- Total newtype smart constructor files processed: 72
- Files already had exception comments: 2
- Files needed new exception comments: 16
- Files modified: 16
- Many numeric types delegate to predicates and had no direct violations

**Key files updated:**

#### String Types
- [x] **newtypes/stringTypes/base58/index.ts** - ✅ Added comments for `.filter()`, `.includes()`, `.length`, `===`, `>`
- [x] **newtypes/stringTypes/char/index.ts** - ✅ Added comments for `Array.from`, `.length`, `!==`
- [x] **newtypes/stringTypes/nonEmptyString/index.ts** - ✅ Added comments for `.trim()`, `.length`, `===`
- [x] **newtypes/stringTypes/hexColor/index.ts** - ✅ Added comments for `.test()`, `.toLocaleLowerCase()`, `.length`, `===`, `!`
- [x] **newtypes/stringTypes/oklchColor/index.ts** - ✅ Added comments for `.match()`, `.endsWith()`, `.slice()`, `parseFloat()`, `<`, `>`, `||`, `.toLocaleLowerCase()`
- [x] **newtypes/stringTypes/p3Color/index.ts** - ✅ Added comments for same patterns as oklchColor
- [x] **newtypes/stringTypes/countryCode/index.ts** - ✅ Added comments
- [x] **newtypes/stringTypes/currencyCode/index.ts** - ✅ Added comments
- [x] **newtypes/stringTypes/languageCode/index.ts** - ✅ Added comments
- [x] **newtypes/stringTypes/creditCardNumber/index.ts** - ✅ Added comments
- [x] **newtypes/stringTypes/uuid/_validateUuidFormat/index.ts** - ✅ Added comments
- [x] **newtypes/stringTypes/uuid/_normalizeUuid/index.ts** - ✅ Added comments

#### Web Types
- [x] **newtypes/webTypes/emailAddress/index.ts** - ✅ Added comments for email validation
- [x] **newtypes/webTypes/url/index.ts** - ✅ Added comments for URL validation
- [x] **newtypes/webTypes/_validateDomain/index.ts** - ✅ Added comments for domain validation helper

#### Numeric Types
- [x] **newtypes/numericTypes/percent/index.ts** - ✅ Added comments for `Number.isFinite`, `Math.round`, etc.
- [x] Other numeric types use predicate delegation with no direct violations

#### Collection Types
- [x] **newtypes/types/nonEmptyArray/index.ts** - ✅ Added comments for `.length`, `===`

All 72 newtype smart constructor files reviewed and documented.

### Phase 3: Array Operations (Priority 3 - Core Utilities)

Status: NOT STARTED

- [ ] **array/filter/index.ts** - Wraps `.filter()`
- [ ] **array/map/index.ts** - Wraps `.map()`
- [ ] **array/reduce/index.ts** - Wraps `.reduce()`
- [ ] **array/find/index.ts** - Wraps `.find()`
- [ ] **array/findIndex/index.ts** - Wraps `.findIndex()`
- [ ] **array/every/index.ts** - Wraps `.every()`
- [ ] **array/some/index.ts** - Wraps `.some()`
- [ ] **array/includes/index.ts** - Wraps `.includes()`
- [ ] **array/concat/index.ts** - Review needed
- [ ] **array/join/index.ts** - Review needed
- [ ] **array/slice/index.ts** - Review needed
- [ ] **array/sort/index.ts** - Review needed
- [ ] **array/reverse/index.ts** - Review needed
- [ ] **array/flatten/index.ts** - Review needed
- [ ] **array/unique/index.ts** - Review needed
- [ ] **array/partition/index.ts** - Review needed
- [ ] **array/zip/index.ts** - Review needed
- [ ] **array/unzip/index.ts** - Review needed
- [ ] **array/head/index.ts** - Review needed
- [ ] **array/tail/index.ts** - Review needed
- [ ] **array/init/index.ts** - Review needed
- [ ] **array/last/index.ts** - Review needed

### Phase 4: String Operations (Priority 3)

Status: NOT STARTED

- [ ] **string/split/index.ts** - Wraps `.split()`
- [ ] **string/replace/index.ts** - Wraps `.replace()`
- [ ] **string/trim/index.ts** - Wraps `.trim()`
- [ ] **string/toLowerCase/index.ts** - Review needed
- [ ] **string/toUpperCase/index.ts** - Review needed
- [ ] **string/slice/index.ts** - Review needed
- [ ] **string/substring/index.ts** - Review needed
- [ ] **string/charAt/index.ts** - Review needed
- [ ] **string/concat/index.ts** - Review needed
- [ ] **string/match/index.ts** - Review needed
- [ ] **string/test/index.ts** - Review needed
- [ ] **string/startsWith/index.ts** - Review needed
- [ ] **string/endsWith/index.ts** - Review needed
- [ ] **string/includes/index.ts** - Review needed
- [ ] **string/indexOf/index.ts** - Review needed
- [ ] **string/lastIndexOf/index.ts** - Review needed

### Phase 5: Logic Operations (Priority 3)

Status: NOT STARTED

- [ ] **logic/and/index.ts** - Wraps `&&`
- [ ] **logic/or/index.ts** - Wraps `||`
- [ ] **logic/not/index.ts** - Wraps `!`
- [ ] **logic/xor/index.ts** - Review needed
- [ ] **logic/implies/index.ts** - Review needed

### Phase 6: Math Operations (Priority 3)

Status: NOT STARTED

- [ ] **math/add/index.ts** - Wraps `+`
- [ ] **math/subtract/index.ts** - Wraps `-`
- [ ] **math/multiply/index.ts** - Wraps `*`
- [ ] **math/divide/index.ts** - Wraps `/`
- [ ] **math/modulo/index.ts** - Wraps `%`
- [ ] **math/power/index.ts** - Wraps `**`
- [ ] **math/abs/index.ts** - Review needed
- [ ] **math/floor/index.ts** - Review needed
- [ ] **math/ceil/index.ts** - Review needed
- [ ] **math/round/index.ts** - Review needed
- [ ] **math/min/index.ts** - Review needed
- [ ] **math/max/index.ts** - Review needed

### Phase 7: Comparison Operations (Priority 3)

Status: NOT STARTED

- [ ] **predicates/isEqual/index.ts** - Wraps `===`
- [ ] **predicates/isNotEqual/index.ts** - Wraps `!==`
- [ ] **predicates/isLessThan/index.ts** - Wraps `<`
- [ ] **predicates/isGreaterThan/index.ts** - Wraps `>`
- [ ] **predicates/isLessThanOrEqual/index.ts** - Wraps `<=`
- [ ] **predicates/isGreaterThanOrEqual/index.ts** - Wraps `>=`

### Phase 8: Object Operations (Priority 4)

Status: NOT STARTED

- [ ] **object/keys/index.ts** - Wraps `Object.keys()`
- [ ] **object/values/index.ts** - Wraps `Object.values()`
- [ ] **object/entries/index.ts** - Wraps `Object.entries()`
- [ ] **object/assign/index.ts** - Review needed
- [ ] **object/freeze/index.ts** - Review needed
- [ ] **object/seal/index.ts** - Review needed
- [ ] **object/hasOwnProperty/index.ts** - Review needed
- [ ] **object/getPrototypeOf/index.ts** - Review needed

### Phase 9: Utilities (Priority 4)

Status: NOT STARTED

- [ ] **utilities/array/length/index.ts** - Wraps `.length`
- [ ] **utilities/array/isEmpty/index.ts** - Review needed
- [ ] **utilities/array/headNonEmptyArray/index.ts** - Review needed
- [ ] **utilities/array/tailNonEmptyArray/index.ts** - Review needed
- [ ] **utilities/string/length/index.ts** - Review needed
- [ ] **utilities/string/isEmpty/index.ts** - Review needed
- [ ] **utilities/type/typeOf/index.ts** - Wraps `typeof`
- [ ] **utilities/type/instanceOf/index.ts** - Wraps `instanceof`

### Phase 10: Conversion Operations (Priority 5)

Status: NOT STARTED

- [ ] **conversion/toString/index.ts** - Wraps `String()`
- [ ] **conversion/toNumber/index.ts** - Wraps `Number()`
- [ ] **conversion/toBoolean/index.ts** - Wraps `Boolean()`
- [ ] **conversion/parseInt/index.ts** - Wraps `parseInt()`
- [ ] **conversion/parseFloat/index.ts** - Wraps `parseFloat()`
- [ ] **conversion/toArray/index.ts** - Review needed
- [ ] **conversion/fromArray/index.ts** - Review needed

### Phase 11: Monads (Priority 5)

Status: NOT STARTED

- [ ] **monads/result/ok/index.ts** - Review needed
- [ ] **monads/result/error/index.ts** - Review needed
- [ ] **monads/result/map/index.ts** - Review needed
- [ ] **monads/result/flatMap/index.ts** - Review needed
- [ ] **monads/validation/ok/index.ts** - Review needed
- [ ] **monads/validation/error/index.ts** - Review needed
- [ ] **monads/validation/map/index.ts** - Review needed
- [ ] **monads/validation/flatMap/index.ts** - Review needed

### Phase 12: Map/Set Operations (Priority 5)

Status: NOT STARTED

- [ ] Review all Map operations
- [ ] Review all Set operations

### Phase 13: Crypto/Random/Events (Priority 6)

Status: NOT STARTED

- [ ] Review crypto operations
- [ ] Review random operations
- [ ] Review event operations

### Phase 14: Testing Utilities (Priority 6)

Status: NOT STARTED

- [ ] Review testing utilities

### Phase 15: Combinators (Priority 6)

Status: NOT STARTED

- [ ] Review all combinator functions

## Statistics

- **Total files**: ~531 TypeScript implementation files
- **Estimated files needing comments**: ~400 (75%)
- **Files with comments already**: ~20 (5%)
- **Files remaining**: ~380 (70%)

## Implementation Strategy

1. **Phase-by-phase approach**: Complete one phase at a time
2. **Verification**: Run tests after each phase to ensure nothing breaks
3. **Documentation**: Update this checklist as each file is completed
4. **Review**: Spot-check comments for accuracy and consistency

## Comment Standards

### DO:
- Be specific about which operator/method
- Mention it's permitted in Toolsmith only
- Reference "performance" or "provides wrapper"
- Place comment immediately before usage

### DON'T:
- Add comments to non-Toolsmith libraries
- Add generic "exception" without explanation
- Skip documenting obvious violations
- Place comments far from actual usage

## Examples of Good Comments

```typescript
//++ [EXCEPTION] typeof and === permitted in Toolsmith for performance - provides isNumber predicate wrapper
export default function isNumber(value: unknown): value is number {
	return typeof value === "number" && not(Number.isNaN(value))
}
```

```typescript
//++ [EXCEPTION] .filter() permitted in Toolsmith for performance - provides curried filter wrapper
export default function filter<T>(predicate: (value: T) => boolean) {
	return function filterWithPredicate(array: ReadonlyArray<T>): ReadonlyArray<T> {
		return array.filter(predicate)
	}
}
```

```typescript
//++ [EXCEPTION] .length and === permitted in Toolsmith for performance - provides isEmpty wrapper
export default function isEmpty(value: string | ReadonlyArray<unknown>): boolean {
	return value.length === 0
}
```

## Completion Criteria

- [ ] All phases completed
- [ ] All tests passing (`deno task test`)
- [ ] All linting passing (`deno task lint`)
- [ ] Spot-check review of 20% of files
- [ ] Documentation updated
- [ ] `/verify-constitutional` passes with documented exceptions

## Notes

- This plan assumes 531 TypeScript files based on current count
- Some files may not need comments (pure type definitions, re-exports)
- Actual number of files needing comments will be refined during implementation
- Exception comments do NOT change functionality, only improve documentation
- These comments help future developers understand why "violations" are present
