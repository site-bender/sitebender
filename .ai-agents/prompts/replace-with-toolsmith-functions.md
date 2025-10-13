# Replace with Toolsmith Functions Agent Prompt

## Objective

Systematically replace ad-hoc implementations, anonymous functions, JavaScript built-ins, and manual operations with existing toolsmith functions following functional programming and compositional patterns.

## Required Setup

Before using this prompt, ensure the toolsmith inventory is current:

```bash
deno task update-toolsmith-inventory
```

This generates `.ai-agents/data/toolsmith-inventory.json` with 784+ available toolsmith functions.

## Critical Rules

- **NEVER create new functions** if equivalent exists in toolsmith
- **ALWAYS import from toolsmith** when available functionality exists
- **PRESERVE currying patterns** - use toolsmith's curried signatures
- **MAINTAIN function composition** - replace operations that break FP style
- **CHECK inventory first** - reference `.ai-agents/data/toolsmith-inventory.json`
- **NO arrow functions** - all anonymous functions should reference toolsmith functions
- **ELIMINATE ALL JAVASCRIPT BUILT-INS** - replace typeof, instanceof, ===, !==, &&, ||
- **USE COMPOSITIONAL PATTERNS** - allPass([pred1, pred2]) instead of pred1 && pred2
- **PREFER POSITIVE LOGIC** - use `if (isEqual(a)(b))` not `if (a !== b)`
- **FAVOR VALIDATION FUNCTIONS** - use `isNull`, `isUndefined`, `isNumber` instead of typeof/comparisons
- **USE LOGICAL COMPOSITION** - `and`, `or`, `allPass`, `anyPass` instead of operators
- **STOP IF FUNCTION IS MISSING** - If a function that SHOULD exist doesn't (e.g., `isNegativeInfinity`), STOP and consult The Architect before proceeding. Do NOT work around it or create it yourself

## TYPE SYSTEM

**CRITICAL: Use toolsmith types instead of `unknown`:**

- Replace `unknown` with `Value` for predicates/validators that handle ANY input
- Replace `unknown` with `Serializable` for data operations
- Use optional parameters: `(value?: Value)` or `(value?: Serializable)`
- Never use `unknown` directly in function signatures

**Type Usage Guide:**

```typescript
// Predicates and type guards - use Value
function isString(value?: Value): value is string;
function isNumber(value?: Value): value is number;

// Data transformations - use Serializable
function toString(value?: Serializable): string;
function toJson(indent: number): (value?: Serializable) => string | null;

// Mixed - validate Value, return Serializable
function safeParse<T>(
  parser: (value?: Value) => T,
): (value?: Value) => T | null;
```

## Replacement Patterns

### Math Operations

```typescript
// BEFORE: Ad-hoc math operations
const addValues = (a: number, b: number): number => a + b;
const result = numbers.reduce((sum, n) => sum + n, 0);
const doubled = values.map((x) => x * 2);

// AFTER: Use toolsmith math functions
import add from "libraries/toolsmith/src/math/add/index.ts";
import multiply from "libraries/toolsmith/src/math/multiply/index.ts";

const addValues = add; // Direct reference to curried toolsmith function
const result = numbers.reduce(add)(0); // Curried usage
const doubled = values.map(multiply(2)); // Partially applied
```

### Type Checking and Validation Operations

```typescript
// BEFORE: Type checking with typeof, instanceof, comparison operators
const stringValues = items.filter((item) => typeof item === "string");
const numbers = values.filter((v) => typeof v === "number" && !isNaN(v));
const isValid = x !== null && x !== undefined && typeof x === "object";
const hasProperty = obj && obj.hasOwnProperty("key");
const isPositive = n > 0 && Number.isFinite(n);

// AFTER: Use toolsmith validation functions and composition
import isString from "libraries/toolsmith/src/validation/isString/index.ts";
import isNumber from "libraries/toolsmith/src/validation/isNumber/index.ts";
import allPass from "libraries/toolsmith/src/validation/allPass/index.ts";
import isNotNull from "libraries/toolsmith/src/validation/isNotNull/index.ts";
import isNotUndefined from "libraries/toolsmith/src/validation/isNotUndefined/index.ts";
import isObject from "libraries/toolsmith/src/validation/isObject/index.ts";
import hasProperty from "libraries/toolsmith/src/validation/hasProperty/index.ts";
import isPositive from "libraries/toolsmith/src/validation/isPositive/index.ts";
import isFinite from "libraries/toolsmith/src/validation/isFinite/index.ts";

const stringValues = items.filter(isString);
const numbers = values.filter(allPass([isNumber, isFinite]));
const isValid = allPass([isNotNull, isNotUndefined, isObject]);
const hasKeyProperty = hasProperty("key");
const isValidPositive = allPass([isPositive, isFinite]);
```

### Boolean Logic and Comparison Operations

```typescript
// BEFORE: Built-in operators and comparisons
if (x === y && z !== null) { ... }
if (a > b || c < d) { ... }
const result = value !== undefined ? value : defaultValue
const isEqual = a === b && typeof a === typeof b
if (value === Infinity) { ... }
if (value === -Infinity) { ... }
if (str === "NaN") { ... }
if (x === 0) { ... }
if (isNull(value) || isUndefined(value)) { ... }
if (radix === 10 && contains(".")(trimmed)) { ... }
if (radix < 2 || radix > 36 || !isInteger(radix)) { ... }
return someValue || "default"

// AFTER: Use toolsmith logical and comparison functions
import isEqual from "libraries/toolsmith/src/validation/isEqual/index.ts"
import isNotNull from "libraries/toolsmith/src/validation/isNotNull/index.ts"
import allPass from "libraries/toolsmith/src/validation/allPass/index.ts"
import anyPass from "libraries/toolsmith/src/validation/anyPass/index.ts"
import gt from "libraries/toolsmith/src/validation/gt/index.ts"
import lt from "libraries/toolsmith/src/validation/lt/index.ts"
import gte from "libraries/toolsmith/src/validation/gte/index.ts"
import lte from "libraries/toolsmith/src/validation/lte/index.ts"
import isUndefined from "libraries/toolsmith/src/validation/isUndefined/index.ts"
import defaultTo from "libraries/toolsmith/src/logic/defaultTo/index.ts"
import isInfinite from "libraries/toolsmith/src/validation/isInfinite/index.ts"
import isNegativeInfinity from "libraries/toolsmith/src/validation/isNegativeInfinity/index.ts"
import isZero from "libraries/toolsmith/src/validation/isZero/index.ts"
import or from "libraries/toolsmith/src/logic/or/index.ts"
import and from "libraries/toolsmith/src/logic/and/index.ts"
import not from "libraries/toolsmith/src/logic/not/index.ts"
import isNullish from "libraries/toolsmith/src/validation/isNullish/index.ts"

if (allPass([isEqual(y)(x), isNotNull])(z)) { ... }
if (anyPass([gt(a)(b), lt(c)(d)])(someValue)) { ... }
const result = defaultTo(defaultValue)(value)
const areEqual = isEqual(a)(b)
if (isInfinite(value)) { ... }
if (isNegativeInfinity(value)) { ... }
if (isEqual("NaN")(str)) { ... }
if (isZero(x)) { ... }
if (isNullish(value)) { ... }  // Better than anyPass for null/undefined
if (allPass([isEqual(10)(radix), contains(".")])(trimmed)) { ... }
if (anyPass([lt(2), gt(36), not(isInteger)])(radix)) { ... }
return or(someValue)("default")
```

### Array Operations

```typescript
// BEFORE: Array method operations
const nonEmpty = arrays.filter((arr) => arr.length > 0);
const firstItems = arrays.map((arr) => arr[0]);
const restItems = arrays.map((arr) => arr.slice(1));

// AFTER: Use toolsmith array functions
import isNotEmpty from "libraries/toolsmith/src/array/isNotEmpty/index.ts";
import head from "libraries/toolsmith/src/array/head/index.ts";
import tail from "libraries/toolsmith/src/array/tail/index.ts";

const nonEmpty = arrays.filter(isNotEmpty);
const firstItems = arrays.map(head);
const restItems = arrays.map(tail);
```

### String Operations

```typescript
// BEFORE: String method operations
const lowercase = strings.map((s) => s.toLowerCase());
const trimmed = inputs.map((input) => input.trim());

// AFTER: Use toolsmith string functions
import toLowercase from "libraries/toolsmith/src/string/toLowercase/index.ts";
import trim from "libraries/toolsmith/src/string/trim/index.ts";

const lowercase = strings.map(toLowercase);
const trimmed = inputs.map(trim);
```

## Detection Strategy

### Step 1: Scan for Common Patterns

Look for these replaceable patterns:

- `(a, b) => a + b` → `add`
- `(a, b) => a - b` → `subtract`
- `(a, b) => a * b` → `multiply`
- `typeof x === 'string'` → `isString`
- `typeof x === 'number'` → `isNumber`
- `arr.length === 0` → `isEmpty`
- `arr[0]` → `head`
- `arr.slice(1)` → `tail`

### Step 2: Check Toolsmith Inventory

For each pattern found:

1. **Search** `.ai-agents/data/toolsmith-inventory.json` for equivalent function
2. **Verify** the signature matches expected usage
3. **Note** if function is curried (affects usage pattern)
4. **Get** correct import path

### Step 3: Replace with Import + Usage

1. **Add import** using relative path from inventory
2. **Replace usage** with function reference or call
3. **Preserve currying** - use `func(arg1)(arg2)` for curried functions
4. **Remove** original ad-hoc implementation

## Inventory Reference Categories

The toolsmith inventory contains functions in these categories:

- **array**: isEmpty, head, tail, length, isNotEmpty, etc.
- **math**: add, subtract, multiply, divide, etc.
- **validation**: isString, isNumber, isArray, isObject, etc.
- **string**: toLowercase, toUppercase, trim, etc.
- **conversion**: toString, toNumber, parseJson, etc.
- **logic**: and, or, not, etc.
- **combinator**: compose, pipe, curry, etc.

## Success Criteria

- All ad-hoc math operations use toolsmith functions
- All type checking uses toolsmith validation functions
- All array/string operations use toolsmith utilities
- No anonymous functions remain (all reference toolsmith functions)
- Proper currying usage maintained throughout
- Import statements added for all toolsmith functions used
- Original functionality preserved exactly

## Example Workflow

1. Run `deno task update-toolsmith-inventory`
2. Scan target files for replacement patterns
3. Check inventory JSON for available functions
4. Replace patterns with toolsmith imports + usage
5. Verify type checking passes
6. Ensure no functionality changes

## Common Pitfalls - MUST FIX ALL OF THESE

### Equality/Inequality Operators

```typescript
// WRONG - Still using JavaScript built-ins
if (value === Infinity) { ... }
if (value === -Infinity) { ... }
if (trimmed === "NaN") { ... }
if (radix === 10) { ... }
if (length(arr) === 0) { ... }
if (value !== null) { ... }

// CORRECT - Use toolsmith functions
if (isInfinite(value)) { ... }
if (isNegativeInfinity(value)) { ... }
if (isEqual("NaN")(trimmed)) { ... }
if (isEqual(10)(radix)) { ... }
if (isEmpty(arr)) { ... }  // Better than isEqual(0)(length(arr))
if (isNotNull(value)) { ... }
```

### Logical Operators (&&, ||, !)

```typescript
// WRONG - Still using JavaScript operators
if (isNull(value) || isUndefined(value)) { ... }
if (radix === 10 && contains(".")(trimmed)) { ... }
if (x < 2 || x > 36 || !isInteger(x)) { ... }
return result || "default"
if (result && isValid(result)) { ... }
if (!isEmpty(array)) { ... }

// CORRECT - Use compositional patterns
if (isNullish(value)) { ... }  // Built-in combo for null/undefined
if (anyPass([isNull, isUndefined])(value)) { ... }  // Alternative
if (allPass([isEqual(10)(radix), contains(".")])(trimmed)) { ... }
if (anyPass([lt(2), gt(36), not(isInteger)])(x)) { ... }
return or(result)("default")
if (and(result)(isValid(result))) { ... }
if (isNotEmpty(array)) { ... }  // Use positive predicates when available
```

### Comparison Operators (<, >, <=, >=)

```typescript
// WRONG - Still using JavaScript operators
if (radix < 2 || radix > 36) { ... }
if (age >= 18 && age <= 65) { ... }
if (score > 100) { ... }

// CORRECT - Use toolsmith comparison functions
if (or(lt(2)(radix))(gt(36)(radix))) { ... }
if (allPass([gte(18), lte(65)])(age)) { ... }
if (gt(100)(score)) { ... }
```

### Special Values

```typescript
// WRONG - Direct comparisons
if (value === Infinity) { ... }
if (value === -Infinity) { ... }
if (isNaN(value)) { ... }  // JavaScript's global isNaN

// CORRECT - Use toolsmith predicates
if (isInfinite(value)) { ... }
if (isNegativeInfinity(value)) { ... }
if (isNaN(value)) { ... }  // If this is toolsmith's isNaN, OK
```

### Empty/Length Checks

```typescript
// WRONG - Manual length checks
if (arr.length === 0) { ... }
if (str.length > 0) { ... }
if (length(entryList) === 0) { ... }

// CORRECT - Use semantic functions
if (isEmpty(arr)) { ... }
if (isNotEmpty(str)) { ... }
if (isEmpty(entryList)) { ... }
```

### IMPORTANT: Missing Functions

If you encounter a pattern that SHOULD have a toolsmith function but doesn't exist in the inventory:

- **DO NOT** create the function yourself
- **DO NOT** work around it with other functions
- **DO NOT** leave the JavaScript built-in in place
- **STOP IMMEDIATELY** and report to The Architect

Example: If `isNegativeInfinity` doesn't exist when you need to replace `value === -Infinity`, STOP and ask The Architect to create it first.

### Object.is Replacement

**CRITICAL**: Replace ALL uses of `Object.is` with the curried `is` function:

```typescript
// WRONG - Using Object.is directly
if (Object.is(value, -0)) { ... }
return array.findIndex((x) => Object.is(x, item))

// CORRECT - Use curried is function
import is from "libraries/toolsmith/src/validation/is/index.ts"

if (is(-0)(value)) { ... }
return array.findIndex(is(item))
```

## Notes

- The toolsmith inventory file is LARGE (800+ functions across 8 categories)
- Always check inventory before creating new functions
- Curried functions use `func(arg1)(arg2)` syntax
- Non-curried functions use `func(arg1, arg2)` syntax
- Import paths are relative and provided in inventory
- **MUST replace ALL JavaScript built-ins** - no exceptions
- When in doubt, check if a positive predicate exists (isNotEmpty vs !isEmpty)
- **If a needed function doesn't exist, STOP and consult The Architect**
