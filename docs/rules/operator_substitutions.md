# Operator Substitutions

## Use multiply function instead of * operator - semantic, composable, type-specific math operation

- **Rule ID**: SUBSTITUTE_MULTIPLY_001
- **Description**: Use multiply function instead of * operator - semantic, composable, type-specific math operation
- **Keywords**: multiply, operator, math, multiplication, *, functional, composable, curried, type-specific, integer, bigint, float, precision
- **Rationale**: The multiply function is semantic (reads like English), composable (curried for partial application), and type-specific (optimized for integer/bigint/float/precision). The * operator lacks these benefits, doesn't compose well in functional pipelines, and provides no type-specific optimizations.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using * operator:
const product = a * b
const scaled = value * 2.5
const area = width * height

// Problems:
// - Not composable in functional pipelines
// - No type-specific optimization
// - Doesn't read semantically
// - Can't be partially applied
// - No currying for composition
```

*Reasoning*: Operators don't compose in functional pipelines and lack semantic clarity and type-specific optimizations

**Required:**
```ts
// ✅ REQUIRED - Using multiply function:
import multiply from '@sitebender/toolsmith/vanilla/math/integer/multiply/index.ts'

const product = multiply(a)(b)
const scaled = multiply(2.5)(value)
const area = multiply(width)(height)

// Why correct:
// - Curried for composition
// - Type-specific optimization
// - Reads semantically
// - Partially applicable: const double = multiply(2)
// - Composes in pipelines: pipe(multiply(2), multiply(3))(value)
```

*Scope*: Type-specific paths:
- integer: @sitebender/toolsmith/vanilla/math/integer/multiply/index.ts
- bigint: @sitebender/toolsmith/vanilla/math/bigint/multiply/index.ts
- float: @sitebender/toolsmith/vanilla/math/float/multiply/index.ts
- precision: @sitebender/toolsmith/vanilla/math/precision/multiply/index.ts
Applies to: .ts, .tsx, .js, .jsx

---

## Use lte (lessThanOrEqual) function instead of <= operator - semantic, null-safe comparison

- **Rule ID**: SUBSTITUTE_LTE_001
- **Description**: Use lte (lessThanOrEqual) function instead of <= operator - semantic, null-safe comparison
- **Keywords**: lte, lessThanOrEqual, operator, comparison, <=, functional, validation, null-safe, curried
- **Rationale**: The lte function reads like English ('less than or equal'), is null-safe (handles undefined/null gracefully), and is curried for partial application. The <= operator can throw on null/undefined and doesn't compose well.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using <= operator:
if (age <= 65) {
	return 'Senior discount'
}

const isEligible = age <= 18
const inRange = value <= maxValue

// Problems:
// - Not null-safe - crashes on null/undefined
// - Not composable
// - Doesn't read semantically
// - Can't be partially applied
```

*Reasoning*: Comparison operators aren't null-safe and don't compose in functional pipelines

**Required:**
```ts
// ✅ REQUIRED - Using lte function:
import lte from '@sitebender/toolsmith/vanilla/validation/lte/index.ts'

if (lte(65)(age)) {
	return 'Senior discount'
}

const isEligible = lte(18)(age)
const inRange = lte(maxValue)(value)

// Why correct:
// - Null-safe: returns null for null/undefined
// - Reads semantically: 'less than or equal'
// - Curried: const lessThan18 = lte(18)
// - Composable in validation pipelines
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/validation/lte/index.ts
Alias: lessThanOrEqual
Applies to: .ts, .tsx, .js, .jsx

---

## Use add function for bigint addition instead of + operator - consistent interface for large integer operations

- **Rule ID**: SUBSTITUTE_ADD_BIGINT_001
- **Description**: Use add function for bigint addition instead of + operator - consistent interface for large integer operations
- **Keywords**: add, bigint, operator, math, +, addition, large-integers, functional, composable, type-specific
- **Rationale**: The add function provides a consistent, curried interface for bigint math operations. Bigints require special handling for operations exceeding Number.MAX_SAFE_INTEGER. The + operator works but doesn't provide composability or type-specific optimizations.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using + operator for bigints:
const result = a + b
const total = 9007199254740991n + 1n
const sum = bigIntValue + anotherBigInt

// Problems:
// - Not composable
// - No type-specific optimization
// - Doesn't signal bigint-specific operation
// - Can't be partially applied
```

*Reasoning*: Operators don't compose and don't signal type-specific bigint operations

**Required:**
```ts
// ✅ REQUIRED - Using add function for bigints:
import add from '@sitebender/toolsmith/vanilla/math/bigint/add/index.ts'

const result = add(a)(b)
const total = add(9007199254740991n)(1n)
const sum = add(bigIntValue)(anotherBigInt)

// Why correct:
// - Curried for composition
// - Type-specific bigint optimization
// - Clearly signals bigint operation
// - Partially applicable: const addOne = add(1n)
// - Use for operations exceeding Number.MAX_SAFE_INTEGER
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/math/bigint/add/index.ts
Context: Use for large integer operations that exceed Number.MAX_SAFE_INTEGER
Applies to: .ts, .tsx, .js, .jsx

---

## Use length function instead of .length property - functional, null-safe alternative to property access

- **Rule ID**: SUBSTITUTE_LENGTH_001
- **Description**: Use length function instead of .length property - functional, null-safe alternative to property access
- **Keywords**: length, property, array, validation, null-safe, functional, isEmpty, isNotEmpty
- **Rationale**: The length function is null-safe (returns null for non-arrays) and functional (no property access). Direct property access (.length) can throw on null/undefined. Better: use isNotEmpty/isEmpty for semantic clarity.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using .length property:
if (arr.length > 0) {
	processItems(arr)
}

const count = items.length
const hasItems = array.length !== 0

// Problems:
// - Not null-safe - crashes on null/undefined
// - Property access (not functional)
// - Not semantic (what does length > 0 mean?)
// - Better alternatives exist (isNotEmpty)
```

*Reasoning*: Property access isn't null-safe and isn't as semantic as dedicated validation functions

**Required:**
```ts
// ✅ REQUIRED - Using isNotEmpty/length functions:
import isNotEmpty from '@sitebender/toolsmith/vanilla/validation/isNotEmpty/index.ts'
import length from '@sitebender/toolsmith/vanilla/validation/length/index.ts'

// Preferred - semantic:
if (isNotEmpty(arr)) {
	processItems(arr)
}

// Alternative - when you need actual count:
const count = length(items) // returns null for non-arrays

// Why correct:
// - Null-safe: handles null/undefined gracefully
// - Semantic: isNotEmpty reads like English
// - Functional: no property access
// - Type-safe: checks isArray first
```

*Scope*: Import paths:
- length: @sitebender/toolsmith/vanilla/validation/length/index.ts
- isNotEmpty: @sitebender/toolsmith/vanilla/validation/isNotEmpty/index.ts
Applies to: .ts, .tsx, .js, .jsx

---

## Use reduce function instead of .reduce() method - curried, composable, functional alternative to array method

- **Rule ID**: SUBSTITUTE_REDUCE_001
- **Description**: Use reduce function instead of .reduce() method - curried, composable, functional alternative to array method
- **Keywords**: reduce, array, method, functional, composable, curried, fold, aggregate
- **Rationale**: The reduce function is curried (enables partial application), composable (works in pipelines), and follows functional programming principles. Array.reduce() method requires the array first, preventing composition. Toolsmith wraps native reduce for performance.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using .reduce() method:
const sum = numbers.reduce((acc, n) => acc + n, 0)
const product = values.reduce((acc, v) => acc * v, 1)
const concatenated = arrays.reduce((acc, arr) => acc.concat(arr), [])

// Problems:
// - Not curried (can't partially apply)
// - Not composable (array-first)
// - Requires arrow function syntax
// - Doesn't follow FP principles
```

*Reasoning*: Array methods aren't curried and don't compose in functional pipelines

**Required:**
```ts
// ✅ REQUIRED - Using reduce function:
import reduce from '@sitebender/toolsmith/vanilla/array/reduce/index.ts'
import add from '@sitebender/toolsmith/vanilla/math/integer/add/index.ts'
import multiply from '@sitebender/toolsmith/vanilla/math/integer/multiply/index.ts'

const sum = reduce(add)(0)(numbers)
const product = reduce(multiply)(1)(values)

// Partially applied:
const sumArray = reduce(add)(0)
const total = sumArray(numbers)

// Why correct:
// - Curried for composition: reduce(fn)(init)
// - Composable in pipelines
// - No arrow functions needed
// - Wraps native .reduce() for performance
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/array/reduce/index.ts
Note: Wraps native .reduce() for performance but provides functional interface
Applies to: .ts, .tsx, .js, .jsx

---

## Use or function instead of || operator - semantic, null-safe logical OR

- **Rule ID**: SUBSTITUTE_OR_001
- **Description**: Use or function instead of || operator - semantic, null-safe logical OR
- **Keywords**: or, operator, logic, ||, functional, validation, null-safe, default-value
- **Rationale**: The or function reads like English, handles null/undefined safely, and is curried for composition. The || operator has confusing truthiness behavior (0, '', false all trigger default) and doesn't compose well.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using || operator:
const value = input || defaultValue
const name = user.name || 'Anonymous'
const result = a || b || c

// Problems:
// - Confusing truthiness: 0 || 10 returns 10 (unexpected)
// - Not composable
// - Doesn't read semantically
// - Treats 0, '', false as falsy (often wrong)
```

*Reasoning*: The || operator has confusing truthiness behavior and doesn't compose in functional pipelines

**Required:**
```ts
// ✅ REQUIRED - Using or function:
import or from '@sitebender/toolsmith/vanilla/validation/or/index.ts'

const value = or(input)(defaultValue)
const name = or(user.name)('Anonymous')

// For multiple values:
const result = or(or(a)(b))(c)

// Why correct:
// - Handles null/undefined explicitly
// - Reads semantically: 'or'
// - Curried for composition
// - Predictable behavior with 0, '', false
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/validation/or/index.ts
Applies to: .ts, .tsx, .js, .jsx

---

## Use gte (greaterThanOrEqual) function instead of >= operator - semantic, null-safe comparison

- **Rule ID**: SUBSTITUTE_GTE_001
- **Description**: Use gte (greaterThanOrEqual) function instead of >= operator - semantic, null-safe comparison
- **Keywords**: gte, greaterThanOrEqual, operator, comparison, >=, functional, validation, null-safe, curried
- **Rationale**: The gte function reads like English ('greater than or equal'), is null-safe (handles undefined/null gracefully), and is curried for partial application. The >= operator can throw on null/undefined and doesn't compose well.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using >= operator:
if (age >= 18) {
	return 'Adult'
}

const isEligible = score >= 70
const meetsMinimum = value >= minValue

// Problems:
// - Not null-safe - crashes on null/undefined
// - Not composable
// - Doesn't read semantically
// - Can't be partially applied
```

*Reasoning*: Comparison operators aren't null-safe and don't compose in functional pipelines

**Required:**
```ts
// ✅ REQUIRED - Using gte function:
import gte from '@sitebender/toolsmith/vanilla/validation/gte/index.ts'

if (gte(18)(age)) {
	return 'Adult'
}

const isEligible = gte(70)(score)
const meetsMinimum = gte(minValue)(value)

// Why correct:
// - Null-safe: returns null for null/undefined
// - Reads semantically: 'greater than or equal'
// - Curried: const atLeast18 = gte(18)
// - Composable in validation pipelines
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/validation/gte/index.ts
Alias: greaterThanOrEqual
Applies to: .ts, .tsx, .js, .jsx

---

## Use includes (or contains alias) function instead of .includes() method - curried, composable, null-safe membership test

- **Rule ID**: SUBSTITUTE_INCLUDES_001
- **Description**: Use includes (or contains alias) function instead of .includes() method - curried, composable, null-safe membership test
- **Keywords**: includes, contains, array, membership, method, functional, validation, null-safe, curried
- **Rationale**: The includes function is curried (enables partial application), composable (works in pipelines), and null-safe (handles null arrays). Array.includes() method requires the array first, preventing composition. Can be aliased as 'contains' for better readability.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using .includes() method:
if (numbers.includes(5)) {
	return 'Found'
}

const hasItem = array.includes(searchValue)
const isValid = validValues.includes(input)

// Problems:
// - Not curried (can't partially apply)
// - Not composable (array-first)
// - Not null-safe
// - Doesn't follow FP principles
```

*Reasoning*: Array methods aren't curried, null-safe, or composable in functional pipelines

**Required:**
```ts
// ✅ REQUIRED - Using includes function:
import includes from '@sitebender/toolsmith/vanilla/array/includes/index.ts'

if (includes(5)(numbers)) {
	return 'Found'
}

const hasItem = includes(searchValue)(array)
const isValid = includes(input)(validValues)

// Partially applied (great for composition):
const hasValue5 = includes(5)
const found = hasValue5(numbers)

// Can alias as 'contains' for readability:
import contains from '@sitebender/toolsmith/vanilla/array/includes/index.ts'
if (contains(5)(numbers)) { /* ... */ }

// Why correct:
// - Curried for composition
// - Null-safe
// - Partially applicable
// - Reads semantically
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/array/includes/index.ts
Alias: Can be imported as 'contains' for better readability
Applies to: .ts, .tsx, .js, .jsx

---

## Use add function for precision math instead of + operator - accurate decimal arithmetic for financial calculations

- **Rule ID**: SUBSTITUTE_ADD_PRECISION_001
- **Description**: Use add function for precision math instead of + operator - accurate decimal arithmetic for financial calculations
- **Keywords**: add, precision, money, financial, decimal, operator, math, +, addition, accuracy
- **Rationale**: The add function handles decimal precision correctly for financial calculations, avoiding floating-point errors. The + operator loses precision (0.1 + 0.2 !== 0.3). Critical for money, prices, and precision-sensitive math.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using + operator for money/precision:
const total = price + tax // loses precision
const balance = 0.1 + 0.2 // returns 0.30000000000000004
const sum = amount1 + amount2 // floating point errors

// Problems:
// - Loses decimal precision
// - Floating point errors (0.1 + 0.2 !== 0.3)
// - Unacceptable for financial calculations
// - Not composable
```

*Reasoning*: The + operator causes floating-point precision errors that are unacceptable for money and financial calculations

**Required:**
```ts
// ✅ REQUIRED - Using add function for precision:
import add from '@sitebender/toolsmith/vanilla/math/precision/add/index.ts'

const total = add(price)(tax) // maintains precision
const balance = add(0.1)(0.2) // correctly returns 0.3
const sum = add(amount1)(amount2) // accurate decimal math

// Why correct:
// - Handles decimal precision correctly
// - No floating-point errors
// - Safe for money and financial calculations
// - Curried for composition
// - Uses decimal.js or similar for accuracy
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/math/precision/add/index.ts
Context: Use for money, financial calculations, or precision-sensitive math
Applies to: .ts, .tsx, .js, .jsx

---

## Use add function for integer addition instead of + operator - composable, type-specific integer math

- **Rule ID**: SUBSTITUTE_ADD_INTEGER_CORRECTED_001
- **Description**: Use add function for integer addition instead of + operator - composable, type-specific integer math
- **Keywords**: add, integer, operator, math, +, addition, functional, composable, type-specific
- **Rationale**: The add function provides type-specific optimization for integer math and is composable through currying. All math functions are named 'add' - the import path determines the type (integer/bigint/float/precision).

**Prohibited:**
```ts
// ❌ PROHIBITED - Using + operator for integers:
const result = a + b
const total = count + 1
const sum = x + y + z

// Problems:
// - Not composable
// - No type-specific optimization
// - Can't be partially applied
// - Doesn't signal integer operation
```

*Reasoning*: Operators don't compose and don't provide type-specific optimizations for integer math

**Required:**
```ts
// ✅ REQUIRED - Using add function for integers:
import add from '@sitebender/toolsmith/vanilla/math/integer/add/index.ts'

const result = add(a)(b)
const total = add(count)(1)
const sum = add(add(x)(y))(z)

// Partially applied:
const increment = add(1)
const nextValue = increment(count)

// Why correct:
// - Curried for composition
// - Type-specific integer optimization
// - Partially applicable
// - Composes in pipelines
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/math/integer/add/index.ts
Context: Use for integer math operations
Note: All math functions named 'add' - path determines type
Applies to: .ts, .tsx, .js, .jsx

---

## Use filter function instead of .filter() method - curried, composable, functional alternative to array method

- **Rule ID**: SUBSTITUTE_FILTER_001
- **Description**: Use filter function instead of .filter() method - curried, composable, functional alternative to array method
- **Keywords**: filter, array, method, functional, composable, curried, predicate, selection
- **Rationale**: The filter function is curried (enables partial application), composable (works in pipelines), and follows functional programming principles. Array.filter() method requires the array first, preventing composition. Toolsmith wraps native filter for performance.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using .filter() method:
const evens = numbers.filter(x => x % 2 === 0)
const adults = users.filter(u => u.age >= 18)
const valid = items.filter(item => isValid(item))

// Problems:
// - Not curried (can't partially apply)
// - Not composable (array-first)
// - Requires arrow function syntax
// - Doesn't follow FP principles
```

*Reasoning*: Array methods aren't curried and don't compose in functional pipelines

**Required:**
```ts
// ✅ REQUIRED - Using filter function:
import filter from '@sitebender/toolsmith/vanilla/array/filter/index.ts'
import isEven from '@sitebender/toolsmith/vanilla/validation/isEven/index.ts'
import gte from '@sitebender/toolsmith/vanilla/validation/gte/index.ts'

const evens = filter(isEven)(numbers)
const adults = filter(user => gte(18)(user.age))(users)
const valid = filter(isValid)(items)

// Partially applied:
const filterEvens = filter(isEven)
const evenNumbers = filterEvens(numbers)

// Why correct:
// - Curried for composition
// - Composable in pipelines
// - Named predicate functions (no arrows)
// - Wraps native .filter() for performance
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/array/filter/index.ts
Note: Wraps native .filter() for performance but provides functional interface
Applies to: .ts, .tsx, .js, .jsx

---

## Use subtract function instead of - operator - semantic, composable, type-specific math operation

- **Rule ID**: SUBSTITUTE_SUBTRACT_001
- **Description**: Use subtract function instead of - operator - semantic, composable, type-specific math operation
- **Keywords**: subtract, operator, math, subtraction, -, functional, composable, curried, type-specific, integer, bigint, float, precision
- **Rationale**: The subtract function is semantic (reads like English), composable (curried for partial application), and type-specific (optimized for integer/bigint/float/precision). The - operator lacks these benefits and doesn't compose well in functional pipelines.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using - operator:
const difference = a - b
const remaining = total - used
const delta = current - previous

// Problems:
// - Not composable in functional pipelines
// - No type-specific optimization
// - Doesn't read semantically
// - Can't be partially applied
// - No currying for composition
```

*Reasoning*: Operators don't compose in functional pipelines and lack semantic clarity and type-specific optimizations

**Required:**
```ts
// ✅ REQUIRED - Using subtract function:
import subtract from '@sitebender/toolsmith/vanilla/math/integer/subtract/index.ts'

const difference = subtract(b)(a)
const remaining = subtract(used)(total)
const delta = subtract(previous)(current)

// Note: subtract is curried as subtract(subtrahend)(minuend)
// This reads: "subtract b from a"

// Partially applied:
const subtract10 = subtract(10)
const result = subtract10(50) // 50 - 10 = 40

// Why correct:
// - Curried for composition
// - Type-specific optimization
// - Reads semantically: "subtract b from a"
// - Partially applicable
```

*Scope*: Type-specific paths:
- integer: @sitebender/toolsmith/vanilla/math/integer/subtract/index.ts
- bigint: @sitebender/toolsmith/vanilla/math/bigint/subtract/index.ts
- float: @sitebender/toolsmith/vanilla/math/float/subtract/index.ts
- precision: @sitebender/toolsmith/vanilla/math/precision/subtract/index.ts
Applies to: .ts, .tsx, .js, .jsx

---

## Use and function instead of && operator - semantic, null-safe logical AND

- **Rule ID**: SUBSTITUTE_AND_001
- **Description**: Use and function instead of && operator - semantic, null-safe logical AND
- **Keywords**: and, operator, logic, &&, functional, validation, null-safe, conjunction
- **Rationale**: The and function reads like English, handles null/undefined safely, and is curried for composition. The && operator has short-circuit behavior that can be confusing and doesn't compose well in functional pipelines.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using && operator:
if (isValid && isComplete) {
	process()
}

const canProceed = hasPermission && isAuthenticated
const result = a && b && c

// Problems:
// - Not composable
// - Doesn't read semantically
// - Short-circuit behavior can be confusing
// - Not null-safe
```

*Reasoning*: The && operator doesn't compose in functional pipelines and has confusing short-circuit semantics

**Required:**
```ts
// ✅ REQUIRED - Using and function:
import and from '@sitebender/toolsmith/vanilla/validation/and/index.ts'

if (and(isValid)(isComplete)) {
	process()
}

const canProceed = and(hasPermission)(isAuthenticated)

// For multiple values:
const result = and(and(a)(b))(c)

// Why correct:
// - Reads semantically: 'and'
// - Handles null/undefined safely
// - Curried for composition
// - Explicit conjunction logic
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/validation/and/index.ts
Applies to: .ts, .tsx, .js, .jsx

---

## Use not function instead of ! operator - explicit, semantic negation that's visually clear

- **Rule ID**: SUBSTITUTE_NOT_001
- **Description**: Use not function instead of ! operator - explicit, semantic negation that's visually clear
- **Keywords**: not, negation, operator, !, functional, validation, logic, semantic
- **Rationale**: The ! operator is easy to miss visually (especially in complex conditions) and doesn't read semantically. The not() function is explicit, reads like English, and is much more visible in code.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using ! operator:
if (!isValid) {
	return error('Invalid')
}

const isInvalid = !isComplete
const shouldSkip = !hasPermission

// Problems:
// - Easy to miss visually (! is tiny)
// - Doesn't read semantically
// - Gets lost in complex conditions
// - Not composable
```

*Reasoning*: The ! operator is visually subtle and easy to miss in code, especially in complex conditions

**Required:**
```ts
// ✅ REQUIRED - Using not function:
import not from '@sitebender/toolsmith/vanilla/validation/not/index.ts'

if (not(isValid)) {
	return error('Invalid')
}

const isInvalid = not(isComplete)
const shouldSkip = not(hasPermission)

// Why correct:
// - Explicit and visually clear
// - Reads like English: 'not valid'
// - Easy to spot in code reviews
// - Composable in functional pipelines
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/validation/not/index.ts
Applies to: .ts, .tsx, .js, .jsx

---

## Use lt (lessThan) function instead of < operator - semantic, null-safe comparison

- **Rule ID**: SUBSTITUTE_LT_001
- **Description**: Use lt (lessThan) function instead of < operator - semantic, null-safe comparison
- **Keywords**: lt, lessThan, operator, comparison, <, functional, validation, null-safe, curried
- **Rationale**: The lt function reads like English ('less than'), is null-safe (handles undefined/null gracefully), and is curried for partial application. The < operator can throw on null/undefined and doesn't compose well.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using < operator:
if (age < 18) {
	return 'Minor'
}

const isTooYoung = age < 21
const belowThreshold = value < maxValue

// Problems:
// - Not null-safe - crashes on null/undefined
// - Not composable
// - Doesn't read semantically
// - Can't be partially applied
```

*Reasoning*: Comparison operators aren't null-safe and don't compose in functional pipelines

**Required:**
```ts
// ✅ REQUIRED - Using lt function:
import lt from '@sitebender/toolsmith/vanilla/validation/lt/index.ts'

if (lt(18)(age)) {
	return 'Minor'
}

const isTooYoung = lt(21)(age)
const belowThreshold = lt(maxValue)(value)

// Why correct:
// - Null-safe: returns null for null/undefined
// - Reads semantically: 'less than'
// - Curried: const lessThan18 = lt(18)
// - Composable in validation pipelines
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/validation/lt/index.ts
Alias: lessThan
Applies to: .ts, .tsx, .js, .jsx

---

## Use gt (greaterThan) function instead of > operator - semantic, null-safe comparison

- **Rule ID**: SUBSTITUTE_GT_001
- **Description**: Use gt (greaterThan) function instead of > operator - semantic, null-safe comparison
- **Keywords**: gt, greaterThan, operator, comparison, >, functional, validation, null-safe, curried
- **Rationale**: The gt function reads like English ('greater than'), is null-safe (handles undefined/null gracefully), and is curried for partial application. The > operator can throw on null/undefined and doesn't compose well.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using > operator:
if (score > 100) {
	return 'Bonus points'
}

const isPassing = grade > 60
const exceedsLimit = value > maxValue

// Problems:
// - Not null-safe - crashes on null/undefined
// - Not composable
// - Doesn't read semantically
// - Can't be partially applied
```

*Reasoning*: Comparison operators aren't null-safe and don't compose in functional pipelines

**Required:**
```ts
// ✅ REQUIRED - Using gt function:
import gt from '@sitebender/toolsmith/vanilla/validation/gt/index.ts'

if (gt(100)(score)) {
	return 'Bonus points'
}

const isPassing = gt(60)(grade)
const exceedsLimit = gt(maxValue)(value)

// Why correct:
// - Null-safe: returns null for null/undefined
// - Reads semantically: 'greater than'
// - Curried: const greaterThan100 = gt(100)
// - Composable in validation pipelines
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/validation/gt/index.ts
Alias: greaterThan
Applies to: .ts, .tsx, .js, .jsx

---

## Use isUnequal function instead of !== operator - semantic, null-safe inequality check

- **Rule ID**: SUBSTITUTE_NOT_STRICT_EQUAL_001
- **Description**: Use isUnequal function instead of !== operator - semantic, null-safe inequality check
- **Keywords**: isUnequal, inequality, operator, !==, comparison, functional, validation, null-safe
- **Rationale**: The isUnequal function is semantic (reads like English), null-safe (handles undefined/null gracefully), and is curried for composition. The !== operator is symbolic, not null-safe, and doesn't compose well.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using !== operator:
if (a !== b) {
	return 'Different'
}

const isDifferent = value !== expected
const hasChanged = current !== previous

// Problems:
// - Not null-safe
// - Doesn't read semantically
// - Not composable
// - Can't be partially applied
```

*Reasoning*: Comparison operators aren't null-safe, semantic, or composable in functional pipelines

**Required:**
```ts
// ✅ REQUIRED - Using isUnequal function:
import isUnequal from '@sitebender/toolsmith/vanilla/validation/isUnequal/index.ts'

if (isUnequal(a)(b)) {
	return 'Different'
}

const isDifferent = isUnequal(value)(expected)
const hasChanged = isUnequal(current)(previous)

// Why correct:
// - Null-safe: handles null/undefined gracefully
// - Reads semantically: 'is unequal'
// - Curried for composition
// - Partially applicable: const notEqualTo5 = isUnequal(5)
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/validation/isUnequal/index.ts
Applies to: .ts, .tsx, .js, .jsx

---

## Use add function from correct path for integer addition - deprecated addInteger path replaced by integer/add

- **Rule ID**: SUBSTITUTE_ADD_INTEGER_001
- **Description**: Use add function from correct path for integer addition - deprecated addInteger path replaced by integer/add
- **Keywords**: add, addInteger, deprecated, integer, operator, math, +, path, migration
- **Rationale**: This rule documents the old addInteger path which is now deprecated. Use the correct path @sitebender/toolsmith/vanilla/math/integer/add/index.ts instead. All math functions are now organized by type (integer/bigint/float/precision) with the same function name.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using old addInteger path:
import addInteger from '@sitebender/toolsmith/vanilla/math/addInteger/index.ts'

const result = addInteger(a)(b)

// Also prohibited - using + operator:
const sum = a + b

// Problems:
// - Old path structure (deprecated)
// - Should use integer/add instead
// - Operator doesn't compose
```

*Reasoning*: Old addInteger path is deprecated - use type-organized path structure instead

**Required:**
```ts
// ✅ REQUIRED - Using correct integer/add path:
import add from '@sitebender/toolsmith/vanilla/math/integer/add/index.ts'

const result = add(a)(b)

// Why correct:
// - Correct path structure: /math/integer/add/
// - Consistent with bigint/float/precision
// - All math functions named 'add' - path determines type
// - Curried and composable
```

*Scope*: Correct import path: @sitebender/toolsmith/vanilla/math/integer/add/index.ts
Deprecated path: @sitebender/toolsmith/vanilla/math/addInteger/index.ts
Context: Use for integer math operations
Applies to: .ts, .tsx, .js, .jsx

---

## Use map function instead of .map() method - curried, composable, functional alternative to array method

- **Rule ID**: SUBSTITUTE_MAP_001
- **Description**: Use map function instead of .map() method - curried, composable, functional alternative to array method
- **Keywords**: map, array, method, functional, composable, curried, transformation, functor
- **Rationale**: The map function is curried (enables partial application), composable (works in pipelines), and follows functional programming principles. Array.map() method requires the array first, preventing composition. Toolsmith wraps native map for performance.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using .map() method:
const doubled = numbers.map(x => x * 2)
const names = users.map(u => u.name)
const transformed = items.map(item => transform(item))

// Problems:
// - Not curried (can't partially apply)
// - Not composable (array-first)
// - Requires arrow function syntax
// - Doesn't follow FP principles
```

*Reasoning*: Array methods aren't curried and don't compose in functional pipelines

**Required:**
```ts
// ✅ REQUIRED - Using map function:
import map from '@sitebender/toolsmith/vanilla/array/map/index.ts'
import multiply from '@sitebender/toolsmith/vanilla/math/integer/multiply/index.ts'

const double = multiply(2)
const doubled = map(double)(numbers)

const getName = (user: User) => user.name
const names = map(getName)(users)

const transformed = map(transform)(items)

// Partially applied:
const mapDouble = map(double)
const result = mapDouble(numbers)

// Why correct:
// - Curried for composition
// - Composable in pipelines
// - Named transformation functions
// - Wraps native .map() for performance
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/array/map/index.ts
Note: Wraps native .map() for performance but provides functional interface
Applies to: .ts, .tsx, .js, .jsx

---

## Use isEqual function instead of === operator - semantic, null-safe equality check

- **Rule ID**: SUBSTITUTE_STRICT_EQUAL_001
- **Description**: Use isEqual function instead of === operator - semantic, null-safe equality check
- **Keywords**: isEqual, equality, operator, ===, comparison, functional, validation, null-safe
- **Rationale**: The isEqual function is semantic (reads like English), null-safe (handles undefined/null gracefully), and is curried for composition. The === operator is symbolic, not null-safe, and doesn't compose well.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using === operator:
if (a === b) {
	return 'Same'
}

const isSame = value === expected
const matches = current === previous

// Problems:
// - Not null-safe
// - Doesn't read semantically
// - Not composable
// - Can't be partially applied
```

*Reasoning*: Comparison operators aren't null-safe, semantic, or composable in functional pipelines

**Required:**
```ts
// ✅ REQUIRED - Using isEqual function:
import isEqual from '@sitebender/toolsmith/vanilla/validation/isEqual/index.ts'

if (isEqual(a)(b)) {
	return 'Same'
}

const isSame = isEqual(value)(expected)
const matches = isEqual(current)(previous)

// Why correct:
// - Null-safe: handles null/undefined gracefully
// - Reads semantically: 'is equal'
// - Curried for composition
// - Partially applicable: const equalTo5 = isEqual(5)
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/validation/isEqual/index.ts
Applies to: .ts, .tsx, .js, .jsx

---

## Use append function or spread operator instead of .push() method - maintain immutability by returning new array

- **Rule ID**: SUBSTITUTE_PUSH_001
- **Description**: Use append function or spread operator instead of .push() method - maintain immutability by returning new array
- **Keywords**: append, push, array, mutation, immutability, spread, functional, add-item
- **Rationale**: The append function returns a new array maintaining immutability, while .push() mutates the original array. Mutation violates functional programming principles. Alternative: spread operator [...arr, item]. Note: .push() only allowed in Toolsmith internals on new arrays.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using .push() method:
arr.push(newItem)
return arr

const result = items.push(value)
numbers.push(1, 2, 3)

// Problems:
// - Mutates original array
// - Violates immutability
// - Side effects
// - Not functional
```

*Reasoning*: Array.push() mutates the original array, violating immutability and functional programming principles

**Required:**
```ts
// ✅ REQUIRED - Using append function or spread:
import append from '@sitebender/toolsmith/vanilla/array/append/index.ts'

// Option 1: append function (curried, composable)
const newArr = append(newItem)(arr)

// Option 2: spread operator (direct)
const newArr = [...arr, newItem]

// Multiple items:
const newArr = [...arr, item1, item2, item3]

// Why correct:
// - Returns new array (immutable)
// - Original array unchanged
// - No side effects
// - Functional approach

// Note: .push() only allowed in Toolsmith internals
// on newly created arrays that will be returned
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/array/append/index.ts
Alternative: spread operator [...arr, item]
Note: .push() only allowed in Toolsmith internals on new arrays
Applies to: .ts, .tsx, .js, .jsx

---

## Use isNotEmpty function instead of arr.length > 0 - semantic, type-safe array emptiness check

- **Rule ID**: SUBSTITUTE_IS_NOT_EMPTY_001
- **Description**: Use isNotEmpty function instead of arr.length > 0 - semantic, type-safe array emptiness check
- **Keywords**: isNotEmpty, length, array, validation, empty, semantic, type-safe, null-safe
- **Rationale**: The isNotEmpty function is semantic (reads like English), checks isArray first (type-safe), and returns null for non-arrays. The pattern arr.length > 0 requires manual type checking and can crash on non-arrays. isNotEmpty handles all edge cases automatically.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using arr.length > 0:
if (arr.length > 0) {
	processItems(arr)
}

const hasItems = array.length > 0
const notEmpty = items.length !== 0

// Also bad - manual type checking:
if (isArray(arr) && arr.length > 0) {
	process(arr)
}

// Problems:
// - Not semantic (what does length > 0 mean?)
// - No type checking (crashes on non-arrays)
// - Verbose when type checking added
// - Property access (not functional)
```

*Reasoning*: Using .length > 0 requires manual type checking and isn't as semantic as isNotEmpty

**Required:**
```ts
// ✅ REQUIRED - Using isNotEmpty function:
import isNotEmpty from '@sitebender/toolsmith/vanilla/validation/isNotEmpty/index.ts'

if (isNotEmpty(arr)) {
	processItems(arr)
}

const hasItems = isNotEmpty(array)
const notEmpty = isNotEmpty(items)

// Why correct:
// - Semantic: reads like English
// - Type-safe: checks isArray first
// - Null-safe: returns null for non-arrays
// - No manual type checking needed
// - Handles all edge cases automatically
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/validation/isNotEmpty/index.ts
Note: Automatically handles type checking - no need for isArray(arr) && arr.length > 0
Applies to: .ts, .tsx, .js, .jsx

---

## Use add function for float addition instead of + operator - consistent interface for floating-point math

- **Rule ID**: SUBSTITUTE_ADD_FLOAT_001
- **Description**: Use add function for float addition instead of + operator - consistent interface for floating-point math
- **Keywords**: add, float, operator, math, +, addition, floating-point, functional, composable, type-specific
- **Rationale**: The add function provides a consistent, curried interface for floating-point math operations. While the + operator works for floats, the function approach is composable and follows the type-specific pattern. All math functions are named 'add' - the import path determines the type.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using + operator for floats:
const result = a + b
const total = 1.5 + 2.3
const sum = floatValue + anotherFloat

// Problems:
// - Not composable
// - No type-specific optimization
// - Doesn't signal float-specific operation
// - Can't be partially applied
```

*Reasoning*: Operators don't compose and don't provide type-specific optimizations for float math

**Required:**
```ts
// ✅ REQUIRED - Using add function for floats:
import add from '@sitebender/toolsmith/vanilla/math/float/add/index.ts'

const result = add(a)(b)
const total = add(1.5)(2.3)
const sum = add(floatValue)(anotherFloat)

// Why correct:
// - Curried for composition
// - Type-specific float optimization
// - Clearly signals float operation
// - Partially applicable: const addHalf = add(0.5)
// - Consistent interface across all math types
```

*Scope*: Import path: @sitebender/toolsmith/vanilla/math/float/add/index.ts
Context: Use for regular floating point numbers
Note: Same function name 'add' - path determines float type
Applies to: .ts, .tsx, .js, .jsx

---
