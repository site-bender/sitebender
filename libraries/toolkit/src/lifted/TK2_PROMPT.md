# Prompt for Lifted Functions AI (TK2)

## CRITICAL BOUNDARIES - READ FIRST

**⚠️ YOU WORK ONLY IN THE `libraries/toolkit/src/lifted/` FOLDER**
- DO NOT modify ANY files outside this folder
- Other AIs work on other parts of toolkit
- The Architect will be "mightily wroth" if you break this boundary
- You can READ anything, but TOUCH only files in `lifted/`

## Your Mission

You are implementing **lifted** versions of the simple toolkit functions that work with **do-notation** and **monadic composition**. These enable Haskell-style functional programming with proper error handling in TypeScript.

## Essential Reading (in order)

1. **CLAUDE.md** (root) - The sacred manifesto with all rules
2. **DO_NOTATION_TUTORIAL.md** (libraries/toolkit/) - How do-notation works
3. **LIFTED.md** (this folder) - Your implementation roadmap
4. **src/monads/validation/index.ts** - The Validation monad TK2 built for you
5. **src/monads/validation/index.test.ts** - Usage examples

## The Two Monads You'll Use

### Result<T, E> - SHORT-CIRCUIT
```typescript
// Fails fast on first error
Result.Ok(data)
  .chain(validateAge)     // If fails, STOPS here
  .chain(validateEmail)   // Never runs if age failed
// Returns: Err("age too young") - first error only
```

### Validation<T> - ACCUMULATING  
```typescript
// Collects ALL errors before failing
Validation.of(data)
  .validate(validateAge)     // Records error, continues with original data
  .validate(validateEmail)   // Records error, continues with original data  
  .validate(validatePassword) // Records error, continues
// Returns: Invalid(["age too young", "email invalid", "password weak"])
```

**Key Insight:** Validation passes the ORIGINAL value to each validator, enabling error accumulation.

## Your Implementation Pattern

Create **two versions** of each lifted function:

### 1. liftResult - For sequential operations that should fail fast
```typescript
// libraries/toolkit/src/lifted/array/mapResult/index.ts
import map from "../../../simple/array/map/index.ts"
import { Result } from "../../../monads/result/index.ts"

const mapResult = <T, U, E>(
  fn: (value: T) => Result<U, E>
) => 
(
  array: ReadonlyArray<T>
): Result<ReadonlyArray<U>, E> => {
  // Implementation that short-circuits on first error
}
```

### 2. liftValidation - For parallel validations that should accumulate errors
```typescript
// libraries/toolkit/src/lifted/array/mapValidation/index.ts
import map from "../../../simple/array/map/index.ts"
import Validation from "../../../monads/validation/index.ts"

const mapValidation = <T, U>(
  fn: (value: T) => Validation<U>
) => 
(
  array: ReadonlyArray<T>
): Validation<ReadonlyArray<U>> => {
  // Implementation that accumulates ALL errors
}
```

## Implementation Order (Phase 1)

1. **mapResult** and **mapValidation** - Most fundamental
2. **filterResult** and **filterValidation** - Second most common
3. **reduceResult** and **reduceValidation** - Can implement others with this

## TDD Strategy - Tests First!

Write tests BEFORE implementing:
```typescript
// index.test.ts pattern
import { assertEquals } from "https://deno.land/std/assert/mod.ts"
import { describe, it } from "https://deno.land/std/testing/bdd.ts"
import mapValidation from "./index.ts"
import Validation from "../../../../monads/validation/index.ts"

describe("mapValidation", () => {
  it("accumulates errors from all validations", () => {
    const validate = (x: number) => 
      x > 2 ? Validation.Valid(x) : Validation.Invalid([{field: "item", messages: [`${x} too small`]}])
    
    const result = mapValidation(validate)([1, 2, 3, 4])
    // Should return Invalid with TWO errors, not just first one
  })
})
```

## File Structure Requirements

```
lifted/
├── LIFTED.md              # Your roadmap (already exists)
├── TK2_PROMPT.md          # This file
├── array/
│   ├── mapResult/
│   │   ├── index.ts       # Implementation
│   │   └── index.test.ts  # TDD tests
│   ├── mapValidation/
│   │   ├── index.ts
│   │   └── index.test.ts
│   ├── filterResult/
│   └── filterValidation/
├── doResult/              # Do-notation for Result (if needed)
└── doValidation/          # Do-notation for Validation (if needed)
```

## Sacred Rules (From CLAUDE.md)

1. **NO classes** - Only functions
2. **NO mutations** - All data immutable  
3. **NO JavaScript array methods** - Use toolkit simple functions
4. **One function per file** - Function name = folder name
5. **Pure functions only** - No side effects
6. **TDD** - Write tests first
7. **100% coverage** - No exceptions

## Success Criteria

You know you've succeeded when:

1. **Do-notation works flawlessly:**
```typescript
const result = doValidation(function* () {
  const nums = yield Validation.Valid([1, 2, 3, 4, 5])
  const doubled = yield mapValidation(x => validate(x * 2))(nums)
  const filtered = yield filterValidation(x => x > 5)(doubled)
  return filtered
})
```

2. **Error accumulation works:**
```typescript
// Gets ALL errors, not just first
const result = mapValidation(validateAge)([17, 16, 25, 15])
// Returns Invalid(["17 too young", "16 too young", "15 too young"])
```

3. **Types flow correctly** - No `any` types needed
4. **All tests pass** - 100% coverage maintained

## Available Imports

From TK2's implementation:
```typescript
// Validation monad
import Validation from "../../../monads/validation/index.ts"
import { ValidationError } from "../../../types/ValidationError/index.ts" 
import { NonEmptyArray } from "../../../types/NonEmptyArray/index.ts"
import createValidator from "../../../monads/validation/createValidator/index.ts"
import validateAll from "../../../monads/validation/validateAll/index.ts"
import combineValidations from "../../../monads/validation/combineValidations/index.ts"

// Simple functions (always use these, never native JS methods!)
import map from "../../../simple/array/map/index.ts"
import filter from "../../../simple/array/filter/index.ts" 
import reduce from "../../../simple/array/reduce/index.ts"
```

## Testing Commands

```bash
# Test everything
cd libraries/toolkit && deno task test

# Test specific lifted function  
cd libraries/toolkit && deno test --unstable-temporal --no-check src/lifted/array/mapValidation/index.test.ts

# Test validation monad (to understand it)
cd libraries/toolkit && deno test --unstable-temporal --no-check src/monads/validation/index.test.ts
```

## The Bottom Line

You're building the **Haskell of TypeScript**. Think:
- **Mathematically** - Pure functions, no side effects
- **Monadically** - Composition through do-notation  
- **Safely** - Accumulate errors, don't lose information
- **Correctly** - Get it right the first time, tests prove it

Remember: The Architect is watching. Every function must be perfect.

---

*"Do it right the first time. There is no undo in production."* - The Architect