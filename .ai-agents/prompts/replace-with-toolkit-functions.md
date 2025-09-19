# Replace with Toolkit Functions Agent Prompt

## Objective
Systematically replace ad-hoc implementations, anonymous functions, JavaScript built-ins, and manual operations with existing toolkit functions following functional programming and compositional patterns.

## Required Setup
Before using this prompt, ensure the toolkit inventory is current:
```bash
deno task update-toolkit-inventory
```
This generates `.ai-agents/data/toolkit-inventory.json` with 784+ available toolkit functions.

## Critical Rules
- **NEVER create new functions** if equivalent exists in toolkit
- **ALWAYS import from toolkit** when available functionality exists
- **PRESERVE currying patterns** - use toolkit's curried signatures
- **MAINTAIN function composition** - replace operations that break FP style
- **CHECK inventory first** - reference `.ai-agents/data/toolkit-inventory.json`
- **NO arrow functions** - all anonymous functions should reference toolkit functions
- **ELIMINATE ALL JAVASCRIPT BUILT-INS** - replace typeof, instanceof, ===, !==, &&, ||
- **USE COMPOSITIONAL PATTERNS** - allPass([pred1, pred2]) instead of pred1 && pred2
- **PREFER POSITIVE LOGIC** - use `if (isEqual(a)(b))` not `if (a !== b)`
- **FAVOR VALIDATION FUNCTIONS** - use `isNull`, `isUndefined`, `isNumber` instead of typeof/comparisons
- **USE LOGICAL COMPOSITION** - `and`, `or`, `allPass`, `anyPass` instead of operators

## Replacement Patterns

### Math Operations
```typescript
// BEFORE: Ad-hoc math operations
const addValues = (a: number, b: number): number => a + b
const result = numbers.reduce((sum, n) => sum + n, 0)
const doubled = values.map(x => x * 2)

// AFTER: Use toolkit math functions
import add from "libraries/toolkit/src/vanilla/math/add/index.ts"
import multiply from "libraries/toolkit/src/vanilla/math/multiply/index.ts"

const addValues = add  // Direct reference to curried toolkit function
const result = numbers.reduce(add)(0)  // Curried usage
const doubled = values.map(multiply(2))  // Partially applied
```

### Type Checking and Validation Operations  
```typescript
// BEFORE: Type checking with typeof, instanceof, comparison operators
const stringValues = items.filter(item => typeof item === 'string')
const numbers = values.filter(v => typeof v === 'number' && !isNaN(v))
const isValid = x !== null && x !== undefined && typeof x === 'object'
const hasProperty = obj && obj.hasOwnProperty('key')
const isPositive = n > 0 && Number.isFinite(n)

// AFTER: Use toolkit validation functions and composition
import isString from "libraries/toolkit/src/vanilla/validation/isString/index.ts"
import isNumber from "libraries/toolkit/src/vanilla/validation/isNumber/index.ts"
import allPass from "libraries/toolkit/src/vanilla/validation/allPass/index.ts"
import isNotNull from "libraries/toolkit/src/vanilla/validation/isNotNull/index.ts"
import isNotUndefined from "libraries/toolkit/src/vanilla/validation/isNotUndefined/index.ts"
import isObject from "libraries/toolkit/src/vanilla/validation/isObject/index.ts"
import hasProperty from "libraries/toolkit/src/vanilla/validation/hasProperty/index.ts"
import isPositive from "libraries/toolkit/src/vanilla/validation/isPositive/index.ts"
import isFinite from "libraries/toolkit/src/vanilla/validation/isFinite/index.ts"

const stringValues = items.filter(isString)
const numbers = values.filter(allPass([isNumber, isFinite]))
const isValid = allPass([isNotNull, isNotUndefined, isObject])
const hasKeyProperty = hasProperty('key')
const isValidPositive = allPass([isPositive, isFinite])
```

### Boolean Logic and Comparison Operations
```typescript
// BEFORE: Built-in operators and comparisons
if (x === y && z !== null) { ... }
if (a > b || c < d) { ... }
const result = value !== undefined ? value : defaultValue
const isEqual = a === b && typeof a === typeof b

// AFTER: Use toolkit logical and comparison functions
import isEqual from "libraries/toolkit/src/vanilla/validation/isEqual/index.ts"
import isNotNull from "libraries/toolkit/src/vanilla/validation/isNotNull/index.ts"
import allPass from "libraries/toolkit/src/vanilla/validation/allPass/index.ts"
import anyPass from "libraries/toolkit/src/vanilla/validation/anyPass/index.ts"
import gt from "libraries/toolkit/src/vanilla/validation/gt/index.ts"
import lt from "libraries/toolkit/src/vanilla/validation/lt/index.ts"
import isUndefined from "libraries/toolkit/src/vanilla/validation/isUndefined/index.ts"
import defaultTo from "libraries/toolkit/src/vanilla/logic/defaultTo/index.ts"

if (allPass([isEqual(x), isNotNull])(z)) { ... }
if (anyPass([gt(b), lt(d)])(someValue)) { ... }
const result = defaultTo(defaultValue)(value)
const areEqual = isEqual(a)(b)
```

### Array Operations
```typescript
// BEFORE: Array method operations
const nonEmpty = arrays.filter(arr => arr.length > 0)
const firstItems = arrays.map(arr => arr[0])
const restItems = arrays.map(arr => arr.slice(1))

// AFTER: Use toolkit array functions  
import isNotEmpty from "libraries/toolkit/src/vanilla/array/isNotEmpty/index.ts"
import head from "libraries/toolkit/src/vanilla/array/head/index.ts"
import tail from "libraries/toolkit/src/vanilla/array/tail/index.ts"

const nonEmpty = arrays.filter(isNotEmpty)
const firstItems = arrays.map(head)
const restItems = arrays.map(tail)
```

### String Operations
```typescript
// BEFORE: String method operations
const lowercase = strings.map(s => s.toLowerCase())
const trimmed = inputs.map(input => input.trim())

// AFTER: Use toolkit string functions
import toLowercase from "libraries/toolkit/src/vanilla/string/toLowercase/index.ts"
import trim from "libraries/toolkit/src/vanilla/string/trim/index.ts"

const lowercase = strings.map(toLowercase)
const trimmed = inputs.map(trim)
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

### Step 2: Check Toolkit Inventory
For each pattern found:
1. **Search** `.ai-agents/data/toolkit-inventory.json` for equivalent function
2. **Verify** the signature matches expected usage
3. **Note** if function is curried (affects usage pattern)
4. **Get** correct import path

### Step 3: Replace with Import + Usage
1. **Add import** using relative path from inventory
2. **Replace usage** with function reference or call
3. **Preserve currying** - use `func(arg1)(arg2)` for curried functions
4. **Remove** original ad-hoc implementation

## Inventory Reference Categories

The toolkit inventory contains functions in these categories:
- **array**: isEmpty, head, tail, length, isNotEmpty, etc.
- **math**: add, subtract, multiply, divide, etc.
- **validation**: isString, isNumber, isArray, isObject, etc.
- **string**: toLowercase, toUppercase, trim, etc.
- **conversion**: toString, toNumber, parseJson, etc.
- **logic**: and, or, not, etc.
- **combinator**: compose, pipe, curry, etc.

## Success Criteria
- All ad-hoc math operations use toolkit functions
- All type checking uses toolkit validation functions  
- All array/string operations use toolkit utilities
- No anonymous functions remain (all reference toolkit functions)
- Proper currying usage maintained throughout
- Import statements added for all toolkit functions used
- Original functionality preserved exactly

## Example Workflow
1. Run `deno task update-toolkit-inventory`
2. Scan target files for replacement patterns
3. Check inventory JSON for available functions
4. Replace patterns with toolkit imports + usage
5. Verify type checking passes
6. Ensure no functionality changes

## Notes
- The toolkit inventory file is LARGE (800+ functions across 8 categories)
- Always check inventory before creating new functions
- Curried functions use `func(arg1)(arg2)` syntax
- Non-curried functions use `func(arg1, arg2)` syntax
- Import paths are relative and provided in inventory
