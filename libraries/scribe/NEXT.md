# @sitebender/scribe - Development Status & Next Steps

## Current Status (Phase 1 Complete)

### What's Working

1. **Core Architecture** ✅
   - Pure functional design (NO CLASSES, NO OOP)
   - One function per file structure
   - Result type error handling throughout
   - Zero external dependencies

2. **Parser Module** ✅
   - Basic TypeScript source parsing (`src/parser/parseFile/index.ts`)
   - Function extraction from AST (`src/parser/parseFunction/index.ts`)
   - Works with function declarations and arrow functions
   - **LIMITATION**: Currently using regex-based parsing, not true AST

3. **Property Detection** ✅
   - **Purity Detection** (`src/detectors/detectPurity/index.ts`)
     - Detects side effects, mutations, I/O operations
     - Checks for console, localStorage, Math.random, Date.now, etc.
     - **BUG**: Arrow function assignment incorrectly detected as impure (test failing)
   - **Currying Detection** (`src/detectors/detectCurrying/index.ts`)
     - Identifies curried functions
     - Counts curry levels
     - **BUG**: Multi-level currying count off by 1 (test failing)
   - **Complexity Analysis** (`src/detectors/detectComplexity/index.ts`)
     - Detects O(1), O(n), O(n²), O(n log n)
     - Identifies loops, recursion, array methods
     - **BUG**: Binary search not properly detected as O(log n) (test failing)

4. **Documentation Generation** ✅
   - Markdown generation working (`src/generators/generateMarkdown/index.ts`)
   - Property badge formatting (`src/generators/formatProperties/index.ts`)
   - Signature extraction (`src/extractors/extractSignature/index.ts`)
   - **BUG**: Signatures showing as `void` instead of actual types

5. **Test Coverage** ⚠️
   - 42 tests total
   - 38 passing, 4 failing
   - Failures in:
     - `detectPurity - handles arrow functions correctly`
     - `detectCurrying - identifies multi-level currying`
     - `detectComplexity - identifies O(log n) for binary search`
     - `parseFunction - extracts function signature`

### Known Issues to Fix Before Phase 2

1. **Parser Issues**
   - Not extracting actual parameter types (showing `void`)
   - Regex-based parsing is fragile
   - Missing support for method signatures, interfaces, types

2. **Detection Bugs**
   - Arrow function purity detection (`const add = (x) => (y) => x + y` should be pure)
   - Curry level counting (off by 1 for multi-level)
   - Binary search complexity detection not working

3. **Missing Test Coverage**
   - No integration tests in `tests/behaviors/integration/`
   - Need property-based tests using fast-check
   - Missing edge case coverage

## Phase 2 Implementation Plan

### Prerequisites (Fix These First!)

1. **Fix Failing Tests**
   ```typescript
   // In src/detectors/detectPurity/index.ts
   // Fix: Arrow function assignment detection
   // The pattern /[^=<>!]\s*=\s*[^=>]/ is catching arrow functions
   // Need better regex or different approach
   ```

2. **Fix Signature Extraction**
   ```typescript
   // In src/parser/parseFunction/index.ts
   // The extractReturnType function needs fixing
   // Currently not properly extracting return types from source
   ```

3. **Fix Complexity Detection**
   ```typescript
   // In src/detectors/detectComplexity/index.ts
   // The detectBinarySearch function needs improvement
   // Add better pattern matching for binary search
   ```

### Phase 2 Features to Implement

#### 1. Real TypeScript AST Parsing
Replace regex-based parsing with actual TypeScript compiler API:

```typescript
// New file: src/parser/parseWithCompiler/index.ts
import * as ts from "typescript"

export default function parseWithCompiler(source: string): Result<ts.SourceFile, ParseError> {
  // Use ts.createSourceFile for real AST
  // Extract actual type information
  // Handle all TypeScript constructs
}
```

#### 2. Mathematical Property Detection
Implement remaining property detectors:

```typescript
// src/detectors/detectMathProperties/isIdempotent/index.ts
// Detect f(f(x)) = f(x)

// src/detectors/detectMathProperties/isCommutative/index.ts  
// Detect f(a, b) = f(b, a)

// src/detectors/detectMathProperties/isAssociative/index.ts
// Detect f(f(a, b), c) = f(a, f(b, c))

// src/detectors/detectMathProperties/isDistributive/index.ts
// Detect f(a, g(b, c)) = g(f(a, b), f(a, c))
```

#### 3. Example Extraction from Tests
Create analyzer to find examples in test files:

```typescript
// src/analyzers/findExamples/index.ts
export default function findExamples(functionName: string, testPath: string): Result<Array<Example>, ParseError> {
  // Search for test files containing functionName
  // Extract assertion patterns
  // Format as examples with inputs/outputs
}
```

#### 4. Related Function Discovery
Implement function relationship detection:

```typescript
// src/analyzers/findRelatedFunctions/index.ts
export default function findRelatedFunctions(functionName: string, sourcePath: string): Array<string> {
  // Find functions in same module
  // Find functions with similar names
  // Find functions with similar signatures
  // Find functions often used together
}
```

#### 5. HTML Generation
Add HTML output format:

```typescript
// src/generators/generateHTML/index.ts
export default function generateHTML(metadata: FunctionMetadata): string {
  // Generate semantic HTML
  // Include syntax highlighting
  // Add interactive examples
  // Include property badges
}
```

#### 6. JSON Generation
Improve JSON output:

```typescript
// src/generators/generateJSON/index.ts
export default function generateJSON(metadata: FunctionMetadata): string {
  // Structured JSON for tooling
  // Include all metadata
  // Follow JSON Schema standard
}
```

#### 7. Null Handling Detection
Analyze how functions handle null/undefined:

```typescript
// src/detectors/detectNullHandling/index.ts
export default function detectNullHandling(source: string): NullStrategy {
  // Check for null checks
  // Detect optional chaining
  // Find default parameters
  // Identify throw on null
}
```

### Testing Requirements for Phase 2

1. **Fix Current Test Failures**
   - Update test expectations if behavior is correct
   - Fix implementation if behavior is wrong

2. **Add Property-Based Tests**
   ```typescript
   // tests/behaviors/properties/index.test.ts
   import * as fc from "npm:fast-check"
   
   // Test that detection is consistent
   // Test that generation is deterministic
   // Test round-trip: parse → generate → parse
   ```

3. **Add Integration Tests**
   ```typescript
   // tests/behaviors/integration/index.test.ts
   // Test full pipeline: file → docs
   // Test with real toolkit functions
   // Test with complex TypeScript files
   ```

4. **Achieve 100% Coverage**
   - Add tests for all branches
   - Use `deno-coverage-ignore` with REASON for unreachable code
   - No coverage gaps allowed per TESTING.md

### File Structure for Phase 2 Additions

```
libraries/scribe/
├── src/
│   ├── parser/
│   │   └── parseWithCompiler/        # NEW: Real AST parsing
│   │       └── index.ts
│   ├── detectors/
│   │   ├── detectMathProperties/     # NEW: Mathematical properties
│   │   │   ├── index.ts
│   │   │   ├── isIdempotent/
│   │   │   ├── isCommutative/
│   │   │   ├── isAssociative/
│   │   │   └── isDistributive/
│   │   └── detectNullHandling/       # NEW: Null safety
│   │       └── index.ts
│   ├── generators/
│   │   ├── generateHTML/             # NEW: HTML output
│   │   │   └── index.ts
│   │   └── generateJSON/             # NEW: JSON output
│   │       └── index.ts
│   └── analyzers/
│       ├── findExamples/             # IMPLEMENT: Was stubbed
│       │   └── index.ts
│       └── findRelatedFunctions/     # IMPLEMENT: Was stubbed
│           └── index.ts
└── tests/
    └── behaviors/
        ├── properties/                # NEW: Property-based tests
        │   └── index.test.ts
        └── integration/               # IMPLEMENT: Was created but empty
            └── index.test.ts
```

### Implementation Order for Phase 2

1. **Week 1: Fix Current Issues**
   - Fix all 4 failing tests
   - Fix signature extraction bug
   - Add missing test coverage

2. **Week 2: Upgrade Parser**
   - Implement TypeScript compiler API parsing
   - Update all dependent functions
   - Ensure backward compatibility

3. **Week 3: Mathematical Properties**
   - Implement idempotent detection
   - Implement commutative detection
   - Implement associative detection
   - Add property-based tests

4. **Week 4: Analyzers & Generators**
   - Implement example extraction
   - Implement related function discovery
   - Add HTML generation
   - Improve JSON generation

### Success Criteria for Phase 2

1. **All Tests Pass** - 100% test pass rate
2. **100% Coverage** - No uncovered lines without explicit ignores
3. **Real AST Parsing** - Using TypeScript compiler API
4. **All Properties Detected** - Including mathematical properties
5. **Three Output Formats** - Markdown, HTML, JSON all working
6. **Example Extraction** - Finding examples from test files
7. **Production Ready** - Can document entire toolkit library

### Commands to Run

```bash
# From project root
cd libraries/scribe

# Run tests
deno task test

# Check coverage
deno task test:cov

# Run demo
deno run --allow-read --allow-write demo.ts

# Lint
deno task lint

# Type check
deno task type-check
```

### Important Notes

1. **NEVER USE CLASSES** - This is functional programming only
2. **ONE FUNCTION PER FILE** - No exceptions
3. **RESULT TYPES EVERYWHERE** - Error handling via Result<T, E>
4. **NO EXTERNAL DEPENDENCIES** - Only Deno built-ins and TypeScript compiler
5. **TEST EVERYTHING** - 100% coverage or explicit ignore with reason

### Phase 3 Preview (Future)

After Phase 2 is complete, Phase 3 will add:
- Live documentation with hot reload
- Documentation coverage metrics
- Automatic changelog generation
- Multi-language documentation (Python, Go, Rust)
- AI-enhanced descriptions
- Visual function signatures
- Interactive playgrounds

---

## Start Phase 2 Checklist

When you read this to start Phase 2:

- [ ] Read this entire document thoroughly
- [ ] Check current test status with `deno task test`
- [ ] Review the 4 failing tests and understand why they fail
- [ ] Start with "Prerequisites" section - fix failing tests first
- [ ] Follow the "Implementation Order for Phase 2"
- [ ] Maintain functional programming principles throughout
- [ ] Ensure 100% test coverage at each step
- [ ] Update this document as you progress

Remember: The goal is automatic documentation that's better than hand-written docs. Every function should document itself with only a single-line description from the developer.