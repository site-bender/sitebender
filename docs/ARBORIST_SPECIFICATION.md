# Arborist: Complete Specification and Implementation Plan

**Version**: 2.0
**Date**: 2025-10-03
**Status**: Clean slate - starting fresh

---

## Purpose

Arborist is the **single source of truth** for TypeScript/JavaScript AST parsing across the @sitebender ecosystem. It provides fast, accurate, syntax-level analysis without semantic type checking.

**Core Principle**: Parse once, use everywhere. Every tool that needs AST information uses Arborist.

---

## What Arborist MUST Do

### 1. Parse TypeScript/JavaScript Files
- Input: File path or source string
- Output: `Result<ParsedFile, ParseError>`
- Use: `deno_ast` (SWC-based, 20-50x faster than TypeScript compiler)
- Handle: .ts, .tsx, .js, .jsx, .mts, .cts files

### 2. Extract Functions
- Find all function declarations, expressions, arrow functions
- Return: Name, position, parameters, return type, modifiers
- Detect: export, default, async, generator, arrow

### 3. Extract Imports
- Find all import statements
- Return: Specifier, imported names, type imports
- Detect: Default, named, namespace imports

### 4. Extract Exports
- Find all export statements
- Return: Exported names, default exports, re-exports
- Detect: Named, default, re-export patterns

### 5. Extract Comments
- Find all comments with positions
- Return: Text, type (line/block), position, associated node
- Detect: Envoy markers (//++, //--, //!!, //??, //>>)

### 6. Extract Types
- Find type aliases, interfaces
- Return: Name, definition, position
- Detect: Exported types

### 7. Extract Constants
- Find const declarations
- Return: Name, type, value (if literal), position
- Detect: Exported constants

### 8. Detect Violations (for Steward)
- Arrow functions
- Classes
- Throw statements
- Try-catch blocks
- Loops (for, while, do-while)
- Mutations (let, var, mutating methods)

---

## What Arborist MUST NOT Do

❌ **Semantic type analysis** - That's TypeScript compiler's job
❌ **Type inference** - Not needed for linting
❌ **Symbol resolution** - Not needed for syntax checks
❌ **Cross-file analysis** - Each file parsed independently
❌ **Comment interpretation** - That's Envoy's job
❌ **Test generation** - That's Auditor's job
❌ **Code transformation** - That's Steward's job

**Arborist parses. Others interpret.**

---

## Contracts with Other Libraries

### Contract with Envoy

**Envoy needs from Arborist:**
```typescript
type EnvoyNeeds = {
  functions: ReadonlyArray<ParsedFunction>  // For API docs
  comments: ReadonlyArray<ParsedComment>    // For documentation
  exports: ReadonlyArray<ParsedExport>      // For public API
}
```

**Arborist provides:**
- Function signatures with parameter types
- Comments with Envoy markers detected
- Export information (public vs private)

**Arborist does NOT provide:**
- Comment interpretation (Envoy does this)
- Documentation generation (Envoy does this)

### Contract with Auditor

**Auditor needs from Arborist:**
```typescript
type AuditorNeeds = {
  functions: ReadonlyArray<ParsedFunction>  // For test generation
  branches: ReadonlyArray<BranchInfo>       // For coverage
  parameters: ReadonlyArray<ParameterInfo>  // For test data
}
```

**Arborist provides:**
- Function signatures for test generation
- Branch points for coverage mapping
- Parameter types for test data generation

**Arborist does NOT provide:**
- Test generation (Auditor does this)
- Property-based test strategies (Auditor does this)

### Contract with Steward

**Steward needs from Arborist:**
```typescript
type StewardNeeds = {
  functions: ReadonlyArray<ParsedFunction>  // For rule checking
  imports: ReadonlyArray<ParsedImport>      // For import rules
  exports: ReadonlyArray<ParsedExport>      // For export rules
  comments: ReadonlyArray<ParsedComment>    // For Envoy rules
  violations: ViolationInfo                 // Pre-detected issues
}
```

**Arborist provides:**
- All syntax elements with positions
- Pre-detected violations (arrow functions, classes, etc.)
- Enough info for Steward to apply fixes

**Arborist does NOT provide:**
- Fix application (Steward does this)
- Rule logic (Steward does this)

---

## Core Types (Formal API)

### ParsedFile

```typescript
type ParsedFile = Readonly<{
  filePath: string
  functions: ReadonlyArray<ParsedFunction>
  types: ReadonlyArray<ParsedType>
  constants: ReadonlyArray<ParsedConstant>
  imports: ReadonlyArray<ParsedImport>
  exports: ReadonlyArray<ParsedExport>
  comments: ReadonlyArray<ParsedComment>
  violations: ViolationInfo
}>
```

### ParsedFunction

```typescript
type ParsedFunction = Readonly<{
  name: string
  position: Position
  span: Span
  parameters: ReadonlyArray<Parameter>
  returnType: string
  typeParameters: ReadonlyArray<TypeParameter>
  modifiers: FunctionModifiers
  body: FunctionBody
}>

type FunctionModifiers = Readonly<{
  isExported: boolean
  isDefault: boolean
  isAsync: boolean
  isGenerator: boolean
  isArrow: boolean
}>

type FunctionBody = Readonly<{
  hasReturn: boolean
  hasThrow: boolean
  hasAwait: boolean
  hasTryCatch: boolean
  hasLoops: boolean
  cyclomaticComplexity: number
}>
```

### ParsedImport

```typescript
type ParsedImport = Readonly<{
  specifier: string
  position: Position
  span: Span
  kind: 'default' | 'named' | 'namespace' | 'type'
  imports: ReadonlyArray<ImportBinding>
}>

type ImportBinding = Readonly<{
  imported: string
  local: string
  isType: boolean
}>
```

### ParsedExport

```typescript
type ParsedExport = Readonly<{
  name: string
  position: Position
  span: Span
  kind: 'default' | 'named' | 'reexport'
  isType: boolean
  source?: string  // For re-exports
}>
```

### ParsedComment

```typescript
type ParsedComment = Readonly<{
  text: string
  position: Position
  span: Span
  kind: 'line' | 'block'
  envoyMarker?: EnvoyMarker
  associatedNode?: string  // Function/type name
}>

type EnvoyMarker = 
  | { marker: '++', description: string }
  | { marker: '--', techDebt: string }
  | { marker: '!!', critical: string }
  | { marker: '??', help: string }
  | { marker: '>>', link: string }
```

### ViolationInfo

```typescript
type ViolationInfo = Readonly<{
  hasArrowFunctions: boolean
  arrowFunctions: ReadonlyArray<Position>
  hasClasses: boolean
  classes: ReadonlyArray<Position>
  hasThrowStatements: boolean
  throwStatements: ReadonlyArray<Position>
  hasTryCatch: boolean
  tryCatchBlocks: ReadonlyArray<Position>
  hasLoops: boolean
  loops: ReadonlyArray<Position>
  hasMutations: boolean
  mutations: ReadonlyArray<Position>
}>
```

### Common Types

```typescript
type Position = Readonly<{
  line: number      // 1-based
  column: number    // 1-based
}>

type Span = Readonly<{
  start: number     // Absolute byte offset
  end: number       // Absolute byte offset
}>

type Parameter = Readonly<{
  name: string
  type: string
  optional: boolean
  defaultValue?: string
}>

type TypeParameter = Readonly<{
  name: string
  constraint?: string
  default?: string
}>
```

---

## Public API

### Core Functions

```typescript
//++ Parse a TypeScript file and return structured data
function parseFile(
  filePath: string
): Promise<Result<ParsedFile, ParseError>>

//++ Parse TypeScript source string
function parseString(
  source: string,
  fileName: string
): Result<ParsedFile, ParseError>

//++ Parse multiple files in parallel
function parseProject(
  rootPath: string,
  pattern: string
): Promise<Result<ReadonlyArray<ParsedFile>, ParseError>>
```

### Utility Functions

```typescript
//++ Check if function is arrow function
function isArrowFunction(
  func: ParsedFunction
): boolean

//++ Check if function is exported
function isExported(
  func: ParsedFunction
): boolean

//++ Get function at position
function getFunctionAtPosition(
  file: ParsedFile,
  position: Position
): Maybe<ParsedFunction>

//++ Get comment for function
function getCommentForFunction(
  file: ParsedFile,
  functionName: string
): Maybe<ParsedComment>
```

---

## Implementation Requirements

### MUST Follow All Rules

1. ✅ **No arrow functions** - All functions use `function` keyword
2. ✅ **No classes** - Pure functions only
3. ✅ **No mutations** - All data immutable, use const
4. ✅ **No exceptions** - Return Result<T, ParseError>
5. ✅ **No loops** - Use map/filter/reduce
6. ✅ **Pure functions** - No side effects except file I/O at boundaries
7. ✅ **One function per file** - Each function in its own folder
8. ✅ **Named functions** - Including callbacks
9. ✅ **Readonly types** - ReadonlyArray, Readonly everywhere
10. ✅ **100% test coverage** - Every function tested

### MUST Use

- **deno_ast** for parsing (NOT TypeScript compiler)
- **Toolsmith Result** for error handling (NOT custom Either)
- **Toolsmith functions** for array operations
- **Deno.test** for testing (NOT other frameworks)
- **fast-check** for property-based tests

### MUST NOT Use

- ❌ TypeScript compiler (too slow)
- ❌ try-catch (use Result)
- ❌ Custom Result/Either types (use Toolsmith's)
- ❌ Mutable data structures
- ❌ External dependencies (except deno_ast)

---

## Performance Targets

- **Small files** (< 100 lines): < 5ms
- **Medium files** (100-500 lines): < 20ms
- **Large files** (500-2000 lines): < 50ms
- **Huge files** (2000+ lines): < 200ms

**Target**: 20-50x faster than TypeScript compiler (achievable with deno_ast/SWC)

---

## Implementation Plan

### Phase 1: Core Parsing (Day 1)

**1.1: Setup deno_ast**
```typescript
// src/parse/index.ts
import { parseModule } from "https://deno.land/x/deno_ast@0.34.4/mod.ts"

function parseFile(filePath: string): Promise<Result<ParsedFile, ParseError>>
```

**1.2: Basic ParsedFile builder**
```typescript
// src/buildParsedFile/index.ts
function buildParsedFile(
  ast: Module,
  filePath: string
): ParsedFile
```

**1.3: Tests**
- Parse valid TypeScript
- Parse with syntax errors
- Parse different file types

### Phase 2: Function Extraction (Day 2)

**2.1: Extract functions from AST**
```typescript
// src/extractFunctions/index.ts
function extractFunctions(
  ast: Module
): ReadonlyArray<ParsedFunction>
```

**2.2: Extract function details**
```typescript
// src/extractFunctionDetails/index.ts
function extractFunctionDetails(
  node: FunctionNode
): ParsedFunction
```

**2.3: Tests**
- Extract named functions
- Extract arrow functions
- Extract async/generator
- Extract with type parameters

### Phase 3: Import/Export Extraction (Day 3)

**3.1: Extract imports**
```typescript
// src/extractImports/index.ts
function extractImports(
  ast: Module
): ReadonlyArray<ParsedImport>
```

**3.2: Extract exports**
```typescript
// src/extractExports/index.ts
function extractExports(
  ast: Module
): ReadonlyArray<ParsedExport>
```

**3.3: Tests**
- Default imports/exports
- Named imports/exports
- Type imports
- Re-exports

### Phase 4: Comment Extraction (Day 4)

**4.1: Extract comments**
```typescript
// src/extractComments/index.ts
function extractComments(
  ast: Module,
  source: string
): ReadonlyArray<ParsedComment>
```

**4.2: Detect Envoy markers**
```typescript
// src/detectEnvoyMarker/index.ts
function detectEnvoyMarker(
  comment: string
): Maybe<EnvoyMarker>
```

**4.3: Associate comments with nodes**
```typescript
// src/associateComments/index.ts
function associateComments(
  comments: ReadonlyArray<ParsedComment>,
  functions: ReadonlyArray<ParsedFunction>
): ReadonlyArray<ParsedComment>
```

**4.4: Tests**
- Line comments
- Block comments
- Envoy markers
- Comment association

### Phase 5: Violation Detection (Day 5)

**5.1: Detect arrow functions**
```typescript
// src/detectArrowFunctions/index.ts
function detectArrowFunctions(
  ast: Module
): ReadonlyArray<Position>
```

**5.2: Detect classes**
```typescript
// src/detectClasses/index.ts
function detectClasses(
  ast: Module
): ReadonlyArray<Position>
```

**5.3: Detect throw/try-catch**
```typescript
// src/detectExceptions/index.ts
function detectExceptions(
  ast: Module
): ReadonlyArray<Position>
```

**5.4: Detect loops**
```typescript
// src/detectLoops/index.ts
function detectLoops(
  ast: Module
): ReadonlyArray<Position>
```

**5.5: Build ViolationInfo**
```typescript
// src/buildViolationInfo/index.ts
function buildViolationInfo(
  ast: Module
): ViolationInfo
```

**5.6: Tests**
- Each violation type
- Multiple violations
- No violations (clean code)

---

## Warden Contract

### Contract File Structure

```typescript
// libraries/arborist/contract.ts
export type ArboristContract = Readonly<{
  version: "1.0.0"
  
  // What Arborist provides
  provides: Readonly<{
    parseFile: FunctionSignature
    parseString: FunctionSignature
    parseProject: FunctionSignature
  }>
  
  // What Arborist guarantees
  guarantees: Readonly<{
    purity: "All functions pure except file I/O"
    performance: "< 50ms for files < 500 lines"
    errorHandling: "Returns Result, never throws"
    immutability: "All outputs immutable"
  }>
  
  // What consumers must provide
  requires: Readonly<{
    validFilePath: "File must exist and be readable"
    validTypeScript: "Source must be parseable TypeScript/JavaScript"
  }>
}>
```

### Cryptographic Signature

```bash
# Generate contract hash
deno run -A scripts/generateContractHash.ts libraries/arborist/contract.ts

# Sign with Warden
warden sign libraries/arborist/contract.ts

# Verify before use
warden verify libraries/arborist/contract.ts
```

---

## Detailed Implementation Guide

### Step-by-Step for Each Function

#### Example: parseFile

**File**: `src/parseFile/index.ts`

```typescript
import { parseModule } from "https://deno.land/x/deno_ast@0.34.4/mod.ts"

import ok from "@sitebender/toolsmith/boxed/result/ok/index.ts"
import error from "@sitebender/toolsmith/boxed/result/error/index.ts"

import type { ParsedFile, ParseError } from "../types/index.ts"

import buildParsedFile from "../buildParsedFile/index.ts"

//++ Parse a TypeScript file and return structured data
export default async function parseFile(
  filePath: string
): Promise<Result<ParsedFile, ParseError>> {
  try {
    // Read file (only I/O operation)
    const source = await Deno.readTextFile(filePath)
    
    // Parse with deno_ast
    const parseResult = parseModule({
      specifier: filePath,
      source,
      mediaType: "TypeScript"
    })
    
    // Build ParsedFile from AST
    const parsedFile = buildParsedFile(parseResult.module)(filePath)
    
    return ok(parsedFile)
    
  } catch (err) {
    // Only for file I/O errors
    return error({
      _tag: 'ParseError',
      message: err instanceof Error ? err.message : 'Unknown error',
      file: filePath,
      line: 0,
      column: 0
    })
  }
}
```

**Test**: `src/parseFile/index.test.ts`

```typescript
import { assert, assertEquals } from "jsr:@std/assert"
import * as fc from "npm:fast-check"

import isOk from "@sitebender/toolsmith/boxed/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/boxed/result/isError/index.ts"

import parseFile from "./index.ts"

Deno.test("parseFile - parses valid TypeScript", async () => {
  const result = await parseFile("test-fixtures/valid.ts")
  
  assert(isOk(result))
})

Deno.test("parseFile - returns error for non-existent file", async () => {
  const result = await parseFile("does-not-exist.ts")
  
  assert(isError(result))
})

Deno.test("parseFile - property: always returns Result", () => {
  fc.assert(
    fc.asyncProperty(
      fc.string(),
      async (path) => {
        const result = await parseFile(path)
        
        // Must be either Ok or Error, never throws
        assert(isOk(result) || isError(result))
      }
    )
  )
})
```

---

## File Structure

```
libraries/arborist/
  deno.jsonc
  mod.ts
  README.md
  contract.ts                    # Warden contract
  contract.hash                  # Cryptographic signature
  
  src/
    parseFile/
      index.ts
      index.test.ts
    parseString/
      index.ts
      index.test.ts
    parseProject/
      index.ts
      index.test.ts
    
    buildParsedFile/
      index.ts
      index.test.ts
    
    extractFunctions/
      index.ts
      index.test.ts
    extractImports/
      index.ts
      index.test.ts
    extractExports/
      index.ts
      index.test.ts
    extractComments/
      index.ts
      index.test.ts
    extractTypes/
      index.ts
      index.test.ts
    extractConstants/
      index.ts
      index.test.ts
    
    detectArrowFunctions/
      index.ts
      index.test.ts
    detectClasses/
      index.ts
      index.test.ts
    detectExceptions/
      index.ts
      index.test.ts
    detectLoops/
      index.ts
      index.test.ts
    detectMutations/
      index.ts
      index.test.ts
    
    buildViolationInfo/
      index.ts
      index.test.ts
    
    types/
      index.ts
    
    _helpers/                     # Private helpers
      traverseAST/
        index.ts
        index.test.ts
      getNodePosition/
        index.ts
        index.test.ts
```

---

## Testing Requirements

### Coverage: 100%

Every function MUST have:
1. **Unit tests** - Test the function in isolation
2. **Property tests** - Use fast-check for edge cases
3. **Integration tests** - Test with real TypeScript files

### Test Fixtures

```
test-fixtures/
  valid.ts                      # Clean, rule-compliant code
  with-arrow-functions.ts       # Has arrow functions
  with-classes.ts               # Has classes
  with-exceptions.ts            # Has throw/try-catch
  with-loops.ts                 # Has for/while loops
  with-mutations.ts             # Has let/var
  complex.ts                    # Real-world complex file
```

---

## Implementation Timeline

### Day 1: Core Parsing
- [ ] Setup deno_ast integration
- [ ] Implement parseFile
- [ ] Implement parseString
- [ ] Implement buildParsedFile
- [ ] Tests for parsing

### Day 2: Function Extraction
- [ ] Implement extractFunctions
- [ ] Implement extractFunctionDetails
- [ ] Extract parameters
- [ ] Extract return types
- [ ] Tests for functions

### Day 3: Imports/Exports
- [ ] Implement extractImports
- [ ] Implement extractExports
- [ ] Handle re-exports
- [ ] Tests for imports/exports

### Day 4: Comments & Types
- [ ] Implement extractComments
- [ ] Implement detectEnvoyMarker
- [ ] Implement extractTypes
- [ ] Implement extractConstants
- [ ] Tests for comments/types

### Day 5: Violation Detection
- [ ] Implement detectArrowFunctions
- [ ] Implement detectClasses
- [ ] Implement detectExceptions
- [ ] Implement detectLoops
- [ ] Implement buildViolationInfo
- [ ] Tests for violations

### Day 6: Integration & Polish
- [ ] Implement parseProject
- [ ] Integration tests
- [ ] Performance testing
- [ ] Documentation
- [ ] Contract signing

---

## Success Criteria

✅ **Arborist is complete when:**

1. All public API functions implemented
2. All return Result (never throw)
3. 100% test coverage
4. All tests pass
5. No rule violations in Arborist code itself
6. Performance targets met
7. Contract signed by Warden
8. Used successfully by Steward

---

**This is the REAL specification. No aspirational claims. Just what needs to be built.**
