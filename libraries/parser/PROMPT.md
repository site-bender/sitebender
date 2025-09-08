# Parser Library - Current Status and Instructions

## CRITICAL: Read These Files FIRST

1. **CLAUDE.md** - The manifesto with ALL coding rules
2. **TESTING.md** - Testing requirements and standards  
3. **This file** - Current status and what needs to be done

## The Prime Directive

**DO NOT ASSUME. DO NOT TAKE SHORTCUTS. DO NOT GUESS.**

## The Holy Grail

**MINIMIZE COGNITIVE LOAD AT ALL COSTS.**

Every rule exists to reduce mental effort. Code should read like well-written English and require zero mental parsing.

## Current Status (ACTUAL, VERIFIED)

### ✅ COMPLETED and WORKING

```
src/
├── parseSourceFile/          # ✅ Parses TypeScript files
├── types/                    # ✅ Type definitions
├── extractFunctions/         # ✅ Extracts function nodes
│   ├── index.ts
│   ├── visitNodes/          # ⚠️ Has nested function violation
│   ├── processFunctionDeclaration/
│   ├── processFunctionExpression/
│   ├── processArrowFunction/
│   ├── processMethodDeclaration/
│   ├── hasExportModifier/   # ⚠️ Uses while loop instead of toolkit
│   └── hasDefaultModifier/  # ⚠️ Uses while loop instead of toolkit
└── extractSignature/         # ✅ PARTIALLY COMPLETE
    ├── index.ts             # ✅ Main orchestrator
    ├── hasExportModifier/   # ✅ Uses toolkit's some
    │   └── isExportKeyword/ # ✅ Predicate function
    ├── hasDefaultModifier/  # ✅ Uses toolkit's some
    │   └── isDefaultKeyword/# ✅ Predicate function
    └── extractParameters/   # ✅ COMPLETE
        ├── index.ts         # ✅ Uses toolkit's map
        └── transformParameter/
            ├── index.ts
            └── extractTypeInfo/
                ├── index.ts
                └── determineTypeKind/
                    ├── index.ts
                    ├── isArrayType/
                    ├── isUnionType/
                    ├── isIntersectionType/
                    ├── isFunctionType/
                    ├── isObjectType/
                    ├── isLiteralType/
                    ├── isPrimitiveTypeName/
                    ├── isPrimitiveKeyword/
                    ├── determineReferenceTypeKind/
                    └── determineKeywordTypeKind/
```

### ❌ NOT BUILT YET

- `extractReturnType/` - Needs to be built
- `extractGenerics/` - Needs to be built  
- `detectProperties/` - Needs to be built with sub-helpers:
  - `detectAsync/`
  - `detectGenerator/`
  - `detectCurried/`
  - `detectPure/`
- `extractComments/` - For Scribe integration
- `analyzeBranches/` - For Prover integration
- **Tests** - ZERO tests exist currently
- **Integration** - No integration with other libraries

### ⚠️ KNOWN VIOLATIONS TO FIX

1. **visitNodes** has nested function `visit` - needs extraction
2. **extractFunctions/hasExportModifier** uses while loop instead of toolkit
3. **extractFunctions/hasDefaultModifier** uses while loop instead of toolkit
4. **Missing newlines** at end of many files (will be fixed by `deno fmt`)
5. **Comment placement** - Some `//++` comments not immediately above function

## Rules to Follow (NO EXCEPTIONS)

### 1. One Function Per File

```typescript
// ✅ CORRECT: someFunction/index.ts
export default function someFunction() {}

// ❌ WRONG: Multiple functions
export function func1() {}
export function func2() {} // VIOLATION!
```

### 2. Use Toolkit Functions, NOT JavaScript Methods

```typescript
// ❌ BANNED:
array.map()
array.filter()
array.some()
array.forEach()
array.reduce()
Array.from() // OK for converting NodeListOf

// ✅ CORRECT:
import map from "@sitebender/toolkit/simple/array/map/index.ts"
import filter from "@sitebender/toolkit/simple/array/filter/index.ts"
import some from "@sitebender/toolkit/simple/array/some/index.ts"
```

### 3. NO Nested Functions

Every function gets its own file, even small predicates:

```typescript
// ❌ WRONG:
function outer() {
    function inner() {} // VIOLATION!
}

// ✅ CORRECT:
import inner from "./inner/index.ts"
function outer() {
    inner()
}
```

### 4. NO Mutations, NO let, NO var

```typescript
// ❌ WRONG:
let x = 1
x = 2 // MUTATION!

// ✅ CORRECT:
const x = 1
const newX = 2
```

### 5. Named Functions for Clarity

```typescript
// ❌ Cognitive load:
return some((mod: Modifier) => mod.kind === SyntaxKind.Export)

// ✅ Zero cognitive load:
import isExportKeyword from "./isExportKeyword/index.ts"
return some(isExportKeyword)(modifiers)
```

### 6. Scribe Comment Format

```typescript
//++ Main description immediately above function
export default function myFunction() {}

//?? [EXAMPLE] myFunction(input) // output
//?? [GOTCHA] Only use when there's an actual gotcha
//?? [PRO] Only when it's a real advantage
//?? [CON] Only when it's a real limitation
```

### 7. Import Order and Style

```typescript
// 1. External imports first
import * as typescript from "npm:typescript@5.7.2"

// 2. Type imports
import type { Parameter } from "../types/index.ts"

// 3. Value imports (alphabetized)
import detectProperties from "./detectProperties/index.ts"
import extractGenerics from "./extractGenerics/index.ts"
```

### 8. The Toolkit is a BLACK BOX

- Use toolkit functions as intended
- Do NOT look at their implementation
- Do NOT worry if they use JS methods internally
- They are optimized and tested

## Next Tasks (IN ORDER)

### 1. Build extractReturnType

Structure:
```
extractReturnType/
├── index.ts                 # Main function
└── inferReturnType/        # For implicit returns
    └── index.ts
```

### 2. Build extractGenerics

Structure:
```
extractGenerics/
├── index.ts                 # Main function
└── transformGeneric/        # Transform each generic
    └── index.ts
```

### 3. Build detectProperties

Structure:
```
detectProperties/
├── index.ts                 # Returns all properties
├── detectAsync/
│   └── index.ts
├── detectGenerator/
│   └── index.ts
├── detectCurried/
│   └── index.ts
└── detectPure/
    └── index.ts
```

### 4. Create Comprehensive Test

Create a test file that:
- Parses actual TypeScript code
- Extracts signatures
- Verifies all properties
- Shows it actually works

### 5. Fix Known Violations

- Extract nested `visit` function from visitNodes
- Update extractFunctions modifiers to use toolkit

## Testing Requirements

**⚠️ IN HIATUS UNTIL FURTHER NOTICE ⚠️**

The Prover library will generate 100% test coverage automatically once the Parser is complete. Manual testing is suspended until the junk is fixed.

## How to Build Each Function

1. **ANNOUNCE** what you're building:
   - Function name
   - File path
   - What it does (ONE thing)
   - Helpers needed

2. **CONFIRM** no violations:
   - No array methods ✓
   - No nested functions ✓
   - No mutations ✓
   - All const ✓
   - One function per file ✓

3. **BUILD** with minimal cognitive load:
   - Named functions for everything
   - Descriptive names that read like English
   - Small, focused, composable

4. **VERIFY** after each function:
   - Check all rules followed
   - Check Scribe comments correct
   - Get approval before proceeding

## Remember

- **NO SCRIPTS** for batch operations
- **NO SHORTCUTS** even if it seems faster
- **BUILD ONE FUNCTION AT A TIME**
- **GET APPROVAL** before moving to next
- **MINIMIZE COGNITIVE LOAD** in every decision

The previous AI failed because they took shortcuts. Don't be that AI. Build it right or don't build it at all.

## Final Checklist Before Any Code

- [ ] Read CLAUDE.md fully
- [ ] Understand the Holy Grail (minimize cognitive load)
- [ ] One function at a time
- [ ] Follow EVERY rule
- [ ] No assumptions, no shortcuts, no guessing