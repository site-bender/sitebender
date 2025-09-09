# Parser Library - AI Instructions & Status

## 🚨 CRITICAL: Read These Documents FIRST

1. **[/CLAUDE.md](/CLAUDE.md)** - The Manifesto with ALL coding rules (NO EXCEPTIONS)
2. **[/TESTING.md](/TESTING.md)** - Testing requirements and standards
3. **[PARSER_SCRIBE_CONTRACT.md](./PARSER_SCRIBE_CONTRACT.md)** - Integration contract with Scribe (LOCKED IN)
4. **[libraries/toolkit/DO_NOTATION_TUTORIAL.md](/libraries/toolkit/DO_NOTATION_TUTORIAL.md)** - Monadic patterns we're adopting

## 📚 What Parser Does

The Parser library extracts structured information from TypeScript source files for use by other Sitebender libraries:

- **Scribe**: Uses Parser output to generate documentation
- **Prover**: Uses Parser output to generate tests automatically
- **Future libraries**: Any tool needing to understand TypeScript code

### Core Functionality

```typescript
// Input: TypeScript source file
const sourceFile = parseSourceFile("./src/myFunction.ts")

// Extract: All functions with signatures
const functions = extractFunctions(sourceFile)

// Output: Detailed signature information
const signature = extractSignature(functionNode, sourceFile, filePath)
// Returns: parameters, return type, generics, properties (async, pure, etc.)
```

## 🤝 Parser-Scribe Integration (WEEK 1 PRIORITY)

Per the [PARSER_SCRIBE_CONTRACT.md](./PARSER_SCRIBE_CONTRACT.md), we've committed to:

1. **Either/Result compatibility** - Add Right/Left constructors
2. **Pre-computed metadata** - Collect analysis hints during traversal
3. **Shared utilities** - Use common traversal functions from toolkit
4. **Real TypeScript nodes** - No unnecessary wrapping

### Metadata Collection (HIGH PRIORITY)

```typescript
type TraversalMetadata = {
  hasThrowStatements: boolean     // Purity detection
  hasAwaitExpressions: boolean    // Purity detection
  hasGlobalAccess: boolean        // Purity detection
  cyclomaticComplexity: number    // Complexity analysis
  hasReturnStatements: boolean    // Currying detection
}
```

## ✅ Current Status

### COMPLETED
- ✅ Fixed all Step 1 violations:
  - Extracted nested `visit` function from `visitNodes`
  - Replaced while loops with toolkit's `some` function
  - Added proper Scribe documentation comments
- ✅ Agreed to Parser-Scribe integration contract
- ✅ Documented monadic approach with do-notation

### WORKING
```
src/
├── parseSourceFile/          ✅ Parses TypeScript files
├── types/                    ✅ Type definitions
├── extractFunctions/         ✅ Extracts function nodes (FIXED)
│   ├── visitNodes/          ✅ No more nested functions
│   │   └── visit/           ✅ Extracted helper
│   ├── hasExportModifier/   ✅ Uses toolkit's some
│   │   └── isExportKeyword/ ✅ Predicate function
│   └── hasDefaultModifier/  ✅ Uses toolkit's some
│       └── isDefaultKeyword/✅ Predicate function
└── extractSignature/         ⚠️ PARTIALLY COMPLETE
    ├── hasExportModifier/    ✅ Uses toolkit properly
    ├── hasDefaultModifier/   ✅ Uses toolkit properly
    └── extractParameters/    ✅ Complete with toolkit's map
```

### NOT BUILT YET
- ❌ `extractReturnType/` - Needs implementation
- ❌ `extractGenerics/` - Needs implementation
- ❌ `detectProperties/` - Needs implementation with sub-helpers
- ❌ Either constructors - For Scribe integration
- ❌ Metadata collection - For performance optimization
- ❌ Tests - Will use Prover once complete

## 📋 The Plan (What to Do Next)

### IMMEDIATE (Week 1 - Parser-Scribe Integration)

1. **Add Either Constructors**
   ```typescript
   // In src/either/ or src/monads/
   const Right = <A>(value: A): Result<A, never>
   const Left = <E>(error: E): Result<never, E>
   ```

2. **Build Missing Functions WITH Metadata Collection**
   
   a. **extractReturnType/**
   ```typescript
   extractReturnType/
   ├── index.ts                 # Main function
   └── inferReturnType/        # For implicit returns
       └── index.ts
   ```
   
   b. **extractGenerics/**
   ```typescript
   extractGenerics/
   ├── index.ts                 # Main function
   └── transformGeneric/        # Transform each generic
       └── index.ts
   ```
   
   c. **detectProperties/**
   ```typescript
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

3. **Add Metadata Collection to extractFunctions**
   - Modify `visit` function to collect metadata during traversal
   - Return both functions AND metadata

### WEEK 2 - Shared Utilities

1. Create `toolkit/src/ast/traverseTypescriptNode`
2. Refactor Parser to use shared traversal
3. Coordinate with Scribe AI for integration

### WEEK 3 - Enhanced Metadata

1. Add MEDIUM PRIORITY metadata fields
2. Performance testing
3. Optimization based on profiling

## 🎯 Rules to Remember

### The Holy Grail
**MINIMIZE COGNITIVE LOAD AT ALL COSTS** - Code should read like English

### Non-Negotiable Rules
1. **One function per file** - Always in `index.ts`
2. **Use toolkit functions** - NEVER native JS array methods
3. **No nested functions** - Extract everything
4. **No mutations** - Only `const`, immutable data
5. **Named functions** - For clarity and stack traces
6. **Scribe comments** - `//++` above, `//??` below functions

### Import Pattern
```typescript
// 1. External first
import * as typescript from "npm:typescript@5.7.2"

// 2. Type imports
import type { Result } from "../types/index.ts"

// 3. Toolkit imports (use full path)
import map from "@sitebender/toolkit/simple/array/map/index.ts"

// 4. Local imports (alphabetized)
import detectAsync from "./detectAsync/index.ts"
```

## 🚀 How to Resume Work

1. **Read this document** and referenced docs
2. **Check current branch**: Should be on `ai/parser`
3. **Run type check**: `deno check --no-lock src/extractSignature/index.ts`
4. **Continue with THE PLAN** above
5. **One function at a time** - No batch operations
6. **Verify after each change** - Type check must pass
7. **Commit atomically** - Small, focused changes

## 🔒 Remember the Contract

The Parser-Scribe contract is LOCKED IN. We've committed to:
- Either/Result compatibility (Week 1)
- Pre-computed metadata (Week 1)
- Shared utilities (Week 2)
- Performance targets (< 100ms small files)

This is not just about building a parser - it's about demonstrating the gold standard for functional TypeScript library integration!

---

_Last updated: September 2025 after Step 1 completion and Parser-Scribe agreement_
_Next: Build missing functions with metadata collection_