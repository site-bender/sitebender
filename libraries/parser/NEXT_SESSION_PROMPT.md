# Parser Library - Next Session Instructions

## CRITICAL: READ THIS FIRST

The previous AI assistant created fantasy documentation for features that didn't exist, used JavaScript methods instead of toolkit functions, and violated multiple @sitebender coding standards. We deleted EVERYTHING that was contaminated and started over.

## Current State (AS OF NOW)

### What Actually Exists and Works
```
src/
├── parseSourceFile/          # ✅ CLEAN - Parses TypeScript files
├── types/                    # ✅ CLEAN - Type definitions
└── extractFunctions/         # ✅ CLEAN - Just rebuilt correctly
    ├── index.ts
    ├── visitNodes/
    ├── processFunctionDeclaration/
    ├── processFunctionExpression/
    ├── processArrowFunction/
    ├── processMethodDeclaration/
    ├── hasExportModifier/
    └── hasDefaultModifier/
```

### What Doesn't Exist Yet
- ❌ `extractSignature` - Deleted, needs rebuild
- ❌ `extractComments` - Deleted, needs rebuild
- ❌ `analyzeBranches` - Never existed
- ❌ `extractTypes` - Never existed
- ❌ `extractImports` - Never existed
- ❌ Any tests - We deleted the one worthless test file
- ❌ Integration with any other library

## Where We're Going

Building a REAL parser library that:
1. Actually works
2. Follows ALL @sitebender rules
3. Has 100% test coverage
4. Actually integrates with prover and scribe

## What To Do Next

### IMMEDIATE TASK: Build `extractSignature`

This is the next critical function. It must:
1. Extract function parameters with types
2. Extract return types
3. Extract generics
4. Detect properties (async, generator, curried, pure)

### RULES YOU MUST FOLLOW (NO EXCEPTIONS)

#### 1. One Function Per File
```typescript
// ✅ CORRECT: src/someFunction/index.ts
export default function someFunction() { }

// ❌ WRONG: Multiple functions in one file
export function func1() { }
export function func2() { }  // NO!
```

#### 2. NO JavaScript Array Methods
```typescript
// ❌ WRONG - These are BANNED:
array.map()
array.filter()
array.some()
array.includes()
array.forEach()
array.reduce()
Array.from()

// ✅ CORRECT - Use while loops or toolkit functions:
import map from "@sitebender/toolkit/simple/array/map/index.ts"
import filter from "@sitebender/toolkit/simple/array/filter/index.ts"

// Or use while loops:
let index = 0
while (index < array.length) {
    // process array[index]
    index = index + 1
}
```

#### 3. NO Nested Function Declarations
```typescript
// ❌ WRONG:
function outer() {
    function inner() { }  // NO! Should be separate file
}

// ✅ CORRECT:
import inner from "./inner/index.ts"
function outer() {
    inner()
}
```

#### 4. NO Mutations
```typescript
// ❌ WRONG:
let x = 1
x = 2  // NO!
array.push(item)  // NO!

// ✅ CORRECT:
const x = 1
const newArray = [...array, item]  // Create new array
```

#### 5. Use TypeScript AST, Not Regex
```typescript
// ❌ WRONG:
const match = code.match(/function\s+(\w+)/)

// ✅ CORRECT:
if (typescript.isFunctionDeclaration(node)) {
    const name = node.name?.getText()
}
```

## Painful Lessons Learned

1. **DO NOT DOCUMENT FEATURES THAT DON'T EXIST**
   - Only document what's actually built and tested
   - Mark aspirational features clearly as "FUTURE" or "TODO"

2. **DO NOT CLAIM INTEGRATION THAT DOESN'T EXIST**
   - Parser currently integrates with NOTHING
   - Don't pretend otherwise

3. **TEST YOUR CODE BEFORE CLAIMING IT WORKS**
   - Write a simple test file
   - Run it
   - Verify output

4. **CHECK FOR VIOLATIONS BEFORE COMMITTING**
   ```bash
   # Check for banned methods
   grep -r "\.map\|\.filter\|\.some\|\.includes\|\.push" src/
   
   # Check for nested functions
   grep -r "function.*{.*function" src/
   ```

5. **BUILD IN THIS ORDER**
   - Core functionality first
   - Tests second
   - Integration third
   - Documentation last

## Specific Instructions for `extractSignature`

Build it with this structure:
```
extractSignature/
├── index.ts                 # Main function
├── extractParameters/
│   └── index.ts
├── extractReturnType/
│   └── index.ts
├── extractGenerics/
│   └── index.ts
└── detectProperties/
    ├── index.ts
    ├── detectAsync/
    ├── detectGenerator/
    ├── detectCurried/
    └── detectPure/
```

Each function must:
- Be in its own file
- Use NO JavaScript array methods
- Have `//++` comment description
- Have `/??` usage examples
- Return appropriate types

## Example of Correct Code

```typescript
//++ Extracts parameter information from a function node
import * as typescript from "npm:typescript@5.7.2"

export default function extractParameters(
    node: typescript.FunctionDeclaration,
): ReadonlyArray<Parameter> {
    const parameters: Array<Parameter> = []
    
    if (!node.parameters) return parameters
    
    let index = 0
    const length = node.parameters.length
    
    while (index < length) {
        const param = node.parameters[index]
        // Process param...
        index = index + 1
    }
    
    return parameters
}

//?? extractParameters(functionNode) // Returns array of parameters
```

## Final Warnings

1. **NO HALLUCINATIONS** - If it doesn't exist, don't pretend it does
2. **NO SHORTCUTS** - Follow every rule, every time
3. **NO DOCUMENTATION LIES** - Document only what's real
4. **NO UNTESTED CODE** - Test everything before claiming success

## Progress Tracking

Use TodoWrite to track your progress:
1. Build extractSignature
2. Build analyzeBranches
3. Write comprehensive tests
4. Integrate with prover
5. Integrate with scribe
6. Update documentation to reflect reality

Remember: The previous AI failed because it took shortcuts and lied about what existed. Don't be that AI. Build it right or don't build it at all.