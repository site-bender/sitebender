---
description: MANDATORY self-verification against ALL constitutional rules BEFORE presenting code
---

# MANDATORY CONSTITUTIONAL RULE VERIFICATION

**RUN THIS BEFORE PRESENTING ANY CODE TO THE USER.**

---

## CRITICAL UNDERSTANDING

You have a pattern of violating constitutional rules. This checklist forces you to check your own code BEFORE showing it to the user. If you present code with violations, you waste the architect's time and demonstrate that you cannot follow basic instructions.

---

## THE 8 CONSTITUTIONAL RULES (NON-NEGOTIABLE)

### Rule 1: No Classes - Use Pure Functions Only
### Rule 2: No Mutations - Immutable Data Always
### Rule 3: No Loops - Use map/filter/reduce from Toolsmith
### Rule 4: No Exceptions - Use Result<T,E> or Validation<T,E>
### Rule 5: One Function Per File - Single Responsibility
### Rule 6: Pure Functions - Except Explicit IO Boundaries
### Rule 7: No Arrow Functions - Use function Keyword
### Rule 8: All Functions Must Be Curried

---

## VERIFICATION PROCESS

For EACH file you created or modified, check for these violations:

### ❌ VIOLATION CHECK 1: Classes

Search your code for:
- `class ` keyword
- `this.` references
- `constructor(`
- `new ` keyword (except for specific Date/Error cases with approval)

**Report:** "Checked for classes: [NONE FOUND / VIOLATIONS FOUND]"

If violations found: **STOP. DO NOT PRESENT CODE. FIX VIOLATIONS FIRST.**

---

### ❌ VIOLATION CHECK 2: Mutations

Search your code for:
- `let ` declarations (unless in generator with `[OPTIMIZATION]` comment)
- `.push(`
- `.pop(`
- `.shift(`
- `.unshift(`
- `.splice(`
- `array[index] =`
- `object.property =`
- `++` or `--` operators

**Report:** "Checked for mutations: [NONE FOUND / VIOLATIONS FOUND]"

If violations found: **STOP. DO NOT PRESENT CODE. FIX VIOLATIONS FIRST.**

---

### ❌ VIOLATION CHECK 3: Loops

Search your code for:
- `for (`
- `for...of`
- `for...in`
- `while (`
- `do {`

**Report:** "Checked for loops: [NONE FOUND / VIOLATIONS FOUND]"

If violations found: **STOP. DO NOT PRESENT CODE. FIX VIOLATIONS FIRST.**

---

### ❌ VIOLATION CHECK 4: OOP Array/String Methods

Search your code for:
- `.map(`
- `.filter(`
- `.reduce(`
- `.find(`
- `.findIndex(`
- `.some(`
- `.every(`
- `.replace(`
- `.split(`
- `.join(`
- `.slice(`
- `.concat(`

**These should be:** Toolsmith curried functions imported from `@sitebender/toolsmith`

**Report:** "Checked for OOP methods: [NONE FOUND / VIOLATIONS FOUND]"

If violations found: **STOP. DO NOT PRESENT CODE. FIX VIOLATIONS FIRST.**

---

### ❌ VIOLATION CHECK 5: Exceptions

Search your code for:
- `throw `
- `try {`
- `catch (`

**Exception:** `try/catch` is ONLY allowed when wrapping external libraries that throw, and MUST convert to Result/Validation.

**Report:** "Checked for exceptions: [NONE FOUND / VIOLATIONS FOUND / FOUND BUT WRAPPING EXTERNAL]"

If violations found (and not wrapping external): **STOP. DO NOT PRESENT CODE. FIX VIOLATIONS FIRST.**

---

### ❌ VIOLATION CHECK 6: Arrow Functions

Search your code for:
- ` => `
- `=>`

**Exception:** Arrow functions are ONLY allowed in type signatures, never in implementation.

**Report:** "Checked for arrow functions: [NONE FOUND / VIOLATIONS FOUND / FOUND ONLY IN TYPES]"

If violations found in implementation: **STOP. DO NOT PRESENT CODE. FIX VIOLATIONS FIRST.**

---

### ❌ VIOLATION CHECK 7: Raw Operators

Search your code for:
- `===` or `!==` (should be `isEqual`, `isUnequal`)
- `!condition` (should be `not(condition)`)
- `&&` (should be `and`)
- `||` (should be `or`)
- `arr.length` (should be `length(arr)`)
- `typeof` (should be appropriate predicate)

**Report:** "Checked for raw operators: [NONE FOUND / VIOLATIONS FOUND]"

If violations found: **STOP. DO NOT PRESENT CODE. FIX VIOLATIONS FIRST.**

---

### ❌ VIOLATION CHECK 8: Multiple Functions Per File

Check each file:
- Should export exactly ONE function (the default export)
- Curried inner functions are part of that one function
- Helper functions should be in private subfolders with underscore prefix

**Report:** "Checked file structure: [CORRECT / VIOLATIONS FOUND]"

If violations found: **STOP. DO NOT PRESENT CODE. FIX VIOLATIONS FIRST.**

---

### ❌ VIOLATION CHECK 9: Non-Curried Functions

Check that every function (except predicates and single-parameter functions) is curried:

```typescript
// ❌ WRONG
function add(a: number, b: number): number

// ✅ RIGHT
function add(augend: number) {
  return function addToAugend(addend: number): number
}
```

**Report:** "Checked currying: [ALL FUNCTIONS CURRIED / VIOLATIONS FOUND]"

If violations found: **STOP. DO NOT PRESENT CODE. FIX VIOLATIONS FIRST.**

---

### ❌ VIOLATION CHECK 10: File Naming

Check that:
- All implementation files are named `index.ts` (or `index.tsx`, `index.test.ts`, `index.css`)
- Folder names use appropriate casing (camelCase for functions, PascalCase for types/components)
- No barrel files (`index.ts` that just re-exports)

**Report:** "Checked file naming: [CORRECT / VIOLATIONS FOUND]"

If violations found: **STOP. DO NOT PRESENT CODE. FIX VIOLATIONS FIRST.**

---

## FINAL REPORT TEMPLATE

After checking ALL violations, report:

```
## Constitutional Rule Verification Complete

✓ No classes found
✓ No mutations found
✓ No loops found
✓ No OOP array/string methods found
✓ No exceptions found (or: exceptions only for wrapping external libraries)
✓ No arrow functions in implementation
✓ No raw operators found
✓ One function per file structure correct
✓ All functions properly curried
✓ File naming correct

Code is ready to present.
```

**OR** if violations found:

```
## Constitutional Rule Violations Found - CANNOT PRESENT CODE

❌ [Description of violation]
❌ [Description of violation]

I will fix these violations before presenting code to you.

[Present fixed code after fixing]
```

---

## IF VIOLATIONS ARE FOUND

1. **DO NOT present the violating code to the user**
2. Fix all violations
3. Run this verification again
4. Only present code after verification passes

---

## WHY THIS EXISTS

You have repeatedly presented code with constitutional violations. This forces you to check BEFORE showing the user, not after they point out your mistakes.

**USE IT.**
