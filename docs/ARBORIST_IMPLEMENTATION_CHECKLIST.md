# Arborist Implementation Checklist

**Version**: 1.0.0
**Contract**: [`libraries/arborist/contract.ts`](../libraries/arborist/contract.ts)
**Rules**: All 360 embeddings in Qdrant must be followed

This checklist can be followed by ANY AI to implement Arborist correctly.

---

## Pre-Implementation Checklist

Before writing ANY code:

- [ ] Read [`docs/haskell-in-typescript.md`](haskell-in-typescript.md) completely
- [ ] Read [`docs/testing-strategy.md`](testing-strategy.md) completely
- [ ] Read [`docs/branded-types.md`](branded-types.md) completely
- [ ] Read [`docs/error-boundaries.md`](error-boundaries.md) completely
- [ ] Read [`libraries/arborist/contract.ts`](../libraries/arborist/contract.ts) completely
- [ ] Read [`docs/ARBORIST_SPECIFICATION.md`](ARBORIST_SPECIFICATION.md) completely
- [ ] Read [`docs/ARBORIST_EXAMPLES.md`](ARBORIST_EXAMPLES.md) completely
- [ ] Query RAG: `mcp__qdrant__qdrant-find("constitutional_rules", "how to write functions")`
- [ ] Query RAG: `mcp__qdrant__qdrant-find("constitutional_rules", "error handling")`
- [ ] Query RAG: `mcp__qdrant__qdrant-find("syntax_rules", "arrow functions")`

---

## Day 1: Core Parsing Infrastructure

### Task 1.1: Setup Types (1 hour)

**File**: `libraries/arborist/src/types/index.ts`

**Before coding:**
- [ ] Query RAG: `mcp__qdrant__qdrant-find("typescript_rules", "type definitions")`
- [ ] Read contract.ts types section

**Implementation:**
- [ ] Copy all types from contract.ts
- [ ] Add any internal helper types needed
- [ ] Ensure all types use Readonly
- [ ] No mutable arrays (use ReadonlyArray)

**Tests**: `libraries/arborist/src/types/index.test.ts`
- [ ] Test type exports exist
- [ ] Test types are readonly (compile-time check)

**Verification:**
- [ ] `deno task typecheck` passes
- [ ] `deno task lint` passes
- [ ] No arrow functions in code
- [ ] All types use Readonly/ReadonlyArray

---

### Task 1.2: Implement parseFile (2 hours)

**File**: `libraries/arborist/src/parseFile/index.ts`

**Before coding:**
- [ ] Query RAG: `mcp__qdrant__qdrant-find("constitutional_rules", "async error handling")`
- [ ] Query RAG: `mcp__qdrant__qdrant-find("functional_programming_rules", "pure functions")`
- [ ] Read ARBORIST_EXAMPLES.md parseFile example

**Implementation:**
- [ ] Import deno_ast parseModule
- [ ] Import Toolsmith Result (ok, error)
- [ ] Create async function parseFile
- [ ] Read file with Deno.readTextFile
- [ ] Parse with deno_ast
- [ ] Build ParsedFile (call buildParsedFile - implement next)
- [ ] Return ok(parsedFile) on success
- [ ] Return error(parseError) on failure
- [ ] NO try-catch (use .then().catch() pattern with Result)

**Tests**: `libraries/arborist/src/parseFile/index.test.ts`
- [ ] Test: Parse valid TypeScript file
- [ ] Test: Return error for non-existent file
- [ ] Test: Return error for invalid syntax
- [ ] Test: Property - always returns Result (never throws)
- [ ] Test: Property - same file gives same result (pure)

**Verification:**
- [ ] `deno task test` passes
- [ ] `deno task test:cov` shows 100% coverage
- [ ] No arrow functions
- [ ] No try-catch
- [ ] Returns Result
- [ ] Function is pure (no side effects except file read)

---

### Task 1.3: Implement buildParsedFile (2 hours)

**File**: `libraries/arborist/src/buildParsedFile/index.ts`

**Before coding:**
- [ ] Query RAG: `mcp__qdrant__qdrant-find("functional_programming_rules", "immutability")`
- [ ] Study deno_ast Module type

**Implementation:**
- [ ] Create function buildParsedFile(ast: Module)
- [ ] Return function buildParsedFileWithAST(filePath: string): ParsedFile
- [ ] Extract functions (call extractFunctions - implement Day 2)
- [ ] Extract imports (call extractImports - implement Day 3)
- [ ] Extract exports (call extractExports - implement Day 3)
- [ ] Extract comments (call extractComments - implement Day 4)
- [ ] Extract types (call extractTypes - implement Day 4)
- [ ] Extract constants (call extractConstants - implement Day 4)
- [ ] Build violations (call buildViolationInfo - implement Day 5)
- [ ] Return immutable ParsedFile

**Tests**: `libraries/arborist/src/buildParsedFile/index.test.ts`
- [ ] Test: Builds ParsedFile from AST
- [ ] Test: All fields present
- [ ] Test: Output is immutable
- [ ] Test: Property - deterministic (same AST gives same result)

**Verification:**
- [ ] 100% test coverage
- [ ] No mutations
- [ ] All arrays are ReadonlyArray
- [ ] Function is pure

---

## Day 2: Function Extraction

### Task 2.1: Implement extractFunctions (3 hours)

**File**: `libraries/arborist/src/extractFunctions/index.ts`

**Before coding:**
- [ ] Query RAG: `mcp__qdrant__qdrant-find("constitutional_rules", "no loops")`
- [ ] Query RAG: `mcp__qdrant__qdrant-find("functional_programming_rules", "higher order functions")`
- [ ] Study deno_ast AST node types

**Implementation:**
- [ ] Create function extractFunctions(ast: Module): ReadonlyArray<ParsedFunction>
- [ ] Traverse AST using recursion (NO loops)
- [ ] Find FunctionDeclaration nodes
- [ ] Find FunctionExpression nodes
- [ ] Find ArrowFunction nodes
- [ ] Find MethodDeclaration nodes
- [ ] For each, call extractFunctionDetails
- [ ] Return immutable array

**Tests**: `libraries/arborist/src/extractFunctions/index.test.ts`
- [ ] Test: Extract named function
- [ ] Test: Extract arrow function
- [ ] Test: Extract async function
- [ ] Test: Extract generator function
- [ ] Test: Extract curried function
- [ ] Test: Extract multiple functions
- [ ] Test: Property - finds all functions
- [ ] Test: Property - output is immutable

**Verification:**
- [ ] 100% coverage
- [ ] No loops (use recursion or reduce)
- [ ] No mutations
- [ ] Returns ReadonlyArray

---

### Task 2.2: Implement extractFunctionDetails (2 hours)

**File**: `libraries/arborist/src/extractFunctionDetails/index.ts`

**Before coding:**
- [ ] Query RAG: `mcp__qdrant__qdrant-find("typescript_rules", "type annotations")`

**Implementation:**
- [ ] Extract function name
- [ ] Extract position (line, column)
- [ ] Extract span (start, end bytes)
- [ ] Extract parameters (call extractParameters)
- [ ] Extract return type
- [ ] Extract type parameters
- [ ] Detect modifiers (export, default, async, generator, arrow)
- [ ] Analyze body (call analyzeFunctionBody)
- [ ] Return ParsedFunction

**Tests**: `libraries/arborist/src/extractFunctionDetails/index.test.ts`
- [ ] Test each field extraction
- [ ] Test with/without type annotations
- [ ] Test with/without modifiers
- [ ] Property tests for edge cases

**Verification:**
- [ ] 100% coverage
- [ ] Pure function
- [ ] Immutable output

---

## Day 3: Import/Export Extraction

### Task 3.1: Implement extractImports (2 hours)

**File**: `libraries/arborist/src/extractImports/index.ts`

**Before coding:**
- [ ] Query RAG: `mcp__qdrant__qdrant-find("constitutional_rules", "imports")`
- [ ] Study import statement AST nodes

**Implementation:**
- [ ] Traverse AST for ImportDeclaration nodes
- [ ] Extract specifier (the "from" path)
- [ ] Extract import kind (default, named, namespace, type)
- [ ] Extract imported names and local aliases
- [ ] Detect type-only imports
- [ ] Return ReadonlyArray<ParsedImport>

**Tests**: `libraries/arborist/src/extractImports/index.test.ts`
- [ ] Test: Default import
- [ ] Test: Named imports
- [ ] Test: Namespace import
- [ ] Test: Type import
- [ ] Test: Mixed imports
- [ ] Test: Multiple import statements
- [ ] Property: All imports found

**Verification:**
- [ ] 100% coverage
- [ ] No loops
- [ ] Immutable output

---

### Task 3.2: Implement extractExports (2 hours)

**File**: `libraries/arborist/src/extractExports/index.ts`

**Before coding:**
- [ ] Query RAG: `mcp__qdrant__qdrant-find("constitutional_rules", "exports")`

**Implementation:**
- [ ] Find ExportDeclaration nodes
- [ ] Find ExportAssignment nodes (export default)
- [ ] Detect export kind (default, named, re-export)
- [ ] Extract exported names
- [ ] Detect type-only exports
- [ ] Return ReadonlyArray<ParsedExport>

**Tests**: `libraries/arborist/src/extractExports/index.test.ts`
- [ ] Test: Default export
- [ ] Test: Named exports
- [ ] Test: Re-exports
- [ ] Test: Type exports
- [ ] Property: All exports found

**Verification:**
- [ ] 100% coverage
- [ ] Pure function
- [ ] Immutable output

---

## Day 4: Comments & Types

### Task 4.1: Implement extractComments (2 hours)

**File**: `libraries/arborist/src/extractComments/index.ts`

**Before coding:**
- [ ] Query RAG: `mcp__qdrant__qdrant-find("syntax_rules", "comments")`
- [ ] Study deno_ast comment handling

**Implementation:**
- [ ] Get comments from deno_ast parse result
- [ ] Extract text, position, span
- [ ] Detect comment kind (line vs block)
- [ ] Call detectEnvoyMarker for each
- [ ] Call associateWithNode to link to functions
- [ ] Return ReadonlyArray<ParsedComment>

**Tests**: `libraries/arborist/src/extractComments/index.test.ts`
- [ ] Test: Line comments
- [ ] Test: Block comments
- [ ] Test: Comments with Envoy markers
- [ ] Test: Comment association with functions
- [ ] Property: All comments found

**Verification:**
- [ ] 100% coverage
- [ ] No mutations
- [ ] Pure function

---

### Task 4.2: Implement detectEnvoyMarker (1 hour)

**File**: `libraries/arborist/src/detectEnvoyMarker/index.ts`

**Before coding:**
- [ ] Read Envoy documentation
- [ ] Query RAG for comment patterns

**Implementation:**
- [ ] Check for //++ pattern → description
- [ ] Check for //-- pattern → tech debt
- [ ] Check for //!! pattern → critical
- [ ] Check for //?? pattern → help
- [ ] Check for //>> pattern → link
- [ ] Return Maybe<EnvoyMarker>

**Tests**: `libraries/arborist/src/detectEnvoyMarker/index.test.ts`
- [ ] Test each marker type
- [ ] Test non-Envoy comments return nothing
- [ ] Property: Deterministic

**Verification:**
- [ ] 100% coverage
- [ ] Returns Maybe
- [ ] Pure function

---

### Task 4.3: Implement extractTypes (1 hour)

**File**: `libraries/arborist/src/extractTypes/index.ts`

**Implementation:**
- [ ] Find TypeAliasDeclaration nodes
- [ ] Find InterfaceDeclaration nodes (if allowed)
- [ ] Extract name, position, definition
- [ ] Detect if exported
- [ ] Return ReadonlyArray<ParsedType>

**Tests**: `libraries/arborist/src/extractTypes/index.test.ts`
- [ ] Test type alias extraction
- [ ] Test exported vs non-exported
- [ ] Property: All types found

---

### Task 4.4: Implement extractConstants (1 hour)

**File**: `libraries/arborist/src/extractConstants/index.ts`

**Implementation:**
- [ ] Find VariableDeclaration with const
- [ ] Extract name, type, value (if literal)
- [ ] Detect if exported
- [ ] Return ReadonlyArray<ParsedConstant>

**Tests**: `libraries/arborist/src/extractConstants/index.test.ts`
- [ ] Test const extraction
- [ ] Test with/without type annotation
- [ ] Test with/without value
- [ ] Property: All constants found

---

## Day 5: Violation Detection

### Task 5.1: Implement detectArrowFunctions (1 hour)

**File**: `libraries/arborist/src/detectArrowFunctions/index.ts`

**Before coding:**
- [ ] Query RAG: `mcp__qdrant__qdrant-find("syntax_rules", "arrow functions")`

**Implementation:**
- [ ] Traverse AST recursively
- [ ] Find ArrowFunction nodes
- [ ] Extract position for each
- [ ] Return ReadonlyArray<Position>

**Tests**: `libraries/arborist/src/detectArrowFunctions/index.test.ts`
- [ ] Test: Detects arrow functions
- [ ] Test: Returns empty for clean code
- [ ] Test: Finds nested arrows
- [ ] Property: Finds all arrows

**Verification:**
- [ ] 100% coverage
- [ ] No loops (use recursion)
- [ ] Pure function

---

### Task 5.2: Implement detectClasses (1 hour)

**File**: `libraries/arborist/src/detectClasses/index.ts`

**Before coding:**
- [ ] Query RAG: `mcp__qdrant__qdrant-find("constitutional_rules", "classes")`

**Implementation:**
- [ ] Traverse AST recursively
- [ ] Find ClassDeclaration nodes
- [ ] Extract position for each
- [ ] Return ReadonlyArray<Position>

**Tests**: `libraries/arborist/src/detectClasses/index.test.ts`
- [ ] Test: Detects classes
- [ ] Test: Returns empty for clean code
- [ ] Property: Finds all classes

---

### Task 5.3: Implement detectExceptions (1 hour)

**File**: `libraries/arborist/src/detectExceptions/index.ts`

**Before coding:**
- [ ] Query RAG: `mcp__qdrant__qdrant-find("constitutional_rules", "exceptions")`

**Implementation:**
- [ ] Traverse AST recursively
- [ ] Find ThrowStatement nodes
- [ ] Find TryStatement nodes
- [ ] Extract positions
- [ ] Return Readonly<{ throws: ReadonlyArray<Position>, tryCatch: ReadonlyArray<Position> }>

**Tests**: `libraries/arborist/src/detectExceptions/index.test.ts`
- [ ] Test: Detects throw statements
- [ ] Test: Detects try-catch blocks
- [ ] Test: Returns empty for clean code
- [ ] Property: Finds all exceptions

---

### Task 5.4: Implement detectLoops (1 hour)

**File**: `libraries/arborist/src/detectLoops/index.ts`

**Before coding:**
- [ ] Query RAG: `mcp__qdrant__qdrant-find("constitutional_rules", "loops")`

**Implementation:**
- [ ] Traverse AST recursively
- [ ] Find ForStatement, ForInStatement, ForOfStatement
- [ ] Find WhileStatement, DoStatement
- [ ] Extract positions
- [ ] Return ReadonlyArray<Position>

**Tests**: `libraries/arborist/src/detectLoops/index.test.ts`
- [ ] Test: Detects for loops
- [ ] Test: Detects while loops
- [ ] Test: Detects for-of loops
- [ ] Property: Finds all loops

---

### Task 5.5: Implement detectMutations (1 hour)

**File**: `libraries/arborist/src/detectMutations/index.ts`

**Before coding:**
- [ ] Query RAG: `mcp__qdrant__qdrant-find("constitutional_rules", "mutations")`

**Implementation:**
- [ ] Find VariableDeclaration with let/var
- [ ] Find assignment expressions (=, +=, etc.)
- [ ] Find mutating method calls (.push, .pop, .splice, etc.)
- [ ] Extract positions
- [ ] Return ReadonlyArray<Position>

**Tests**: `libraries/arborist/src/detectMutations/index.test.ts`
- [ ] Test: Detects let/var
- [ ] Test: Detects assignments
- [ ] Test: Detects mutating methods
- [ ] Property: Finds all mutations

---

### Task 5.6: Implement buildViolationInfo (30 min)

**File**: `libraries/arborist/src/buildViolationInfo/index.ts`

**Implementation:**
- [ ] Call all detect functions
- [ ] Combine results into ViolationInfo
- [ ] Return immutable ViolationInfo

**Tests**: `libraries/arborist/src/buildViolationInfo/index.test.ts`
- [ ] Test: Combines all violation types
- [ ] Test: Returns empty for clean code
- [ ] Test: Returns all violations for bad code

---

## Day 6: Integration & Polish

### Task 6.1: Implement parseString (30 min)

**File**: `libraries/arborist/src/parseString/index.ts`

**Implementation:**
- [ ] Parse source string with deno_ast
- [ ] Call buildParsedFile
- [ ] Return Result<ParsedFile, ParseError>

**Tests**: `libraries/arborist/src/parseString/index.test.ts`
- [ ] Test: Parse valid source
- [ ] Test: Return error for invalid syntax
- [ ] Property: Deterministic

---

### Task 6.2: Implement parseProject (1 hour)

**File**: `libraries/arborist/src/parseProject/index.ts`

**Before coding:**
- [ ] Query RAG: `mcp__qdrant__qdrant-find("functional_programming_rules", "async composition")`

**Implementation:**
- [ ] Walk directory recursively (use Deno.readDir)
- [ ] Filter files by pattern
- [ ] Parse each file with parseFile
- [ ] Collect results
- [ ] Return Result<ReadonlyArray<ParsedFile>, ParseError>

**Tests**: `libraries/arborist/src/parseProject/index.test.ts`
- [ ] Test: Parse multiple files
- [ ] Test: Filter by pattern
- [ ] Test: Handle parse errors
- [ ] Property: Finds all matching files

---

### Task 6.3: Implement Utility Functions (1 hour)

**Files**:
- `libraries/arborist/src/isArrowFunction/index.ts`
- `libraries/arborist/src/isExported/index.ts`
- `libraries/arborist/src/getFunctionAtPosition/index.ts`
- `libraries/arborist/src/getCommentForFunction/index.ts`

**Each with tests achieving 100% coverage**

---

### Task 6.4: Integration Tests (2 hours)

**File**: `libraries/arborist/src/integration.test.ts`

**Tests:**
- [ ] Parse real Toolsmith file
- [ ] Verify all data extracted correctly
- [ ] Parse file with violations
- [ ] Verify all violations detected
- [ ] Performance test (< 50ms for typical file)

---

### Task 6.5: Update mod.ts (15 min)

**File**: `libraries/arborist/mod.ts`

```typescript
// @sitebender/arborist v1.0.0
// AST parsing for TypeScript/JavaScript

// Use deep links. No barrel files.
// See contract.ts for formal API specification.
```

---

## Verification Checklist (Before Completion)

### Code Quality
- [ ] ALL functions use `function` keyword (zero arrow functions)
- [ ] ALL functions are pure (except file I/O at boundaries)
- [ ] ALL data is immutable (const, Readonly, ReadonlyArray)
- [ ] NO classes anywhere
- [ ] NO loops (use recursion, map, filter, reduce)
- [ ] NO try-catch (use Result monad)
- [ ] NO throw statements
- [ ] ALL functions return Result or direct values
- [ ] ONE function per file
- [ ] ALL files have index.ts and index.test.ts

### Testing
- [ ] `deno task test` - ALL tests pass
- [ ] `deno task test:cov` - 100% coverage
- [ ] `deno task lint` - Zero lint errors
- [ ] `deno task typecheck` - Zero type errors
- [ ] `deno task fmt` - Code formatted

### Documentation
- [ ] ALL exported functions have //++ comments
- [ ] contract.ts is complete
- [ ] README.md updated with real API (not aspirational)
- [ ] Examples in ARBORIST_EXAMPLES.md work

### Performance
- [ ] Small files (< 100 lines): < 5ms
- [ ] Medium files (100-500 lines): < 20ms
- [ ] Large files (500-2000 lines): < 50ms
- [ ] Benchmark tests pass

### Contract
- [ ] contract.ts matches implementation
- [ ] All types exported
- [ ] All guarantees met
- [ ] Ready for Warden signing

---

## RAG Integration Points

Before implementing each function, ALWAYS:

1. **Query RAG for relevant rules**
   ```python
   mcp__qdrant__qdrant-find("constitutional_rules", "<topic>")
   mcp__qdrant__qdrant-find("syntax_rules", "<topic>")
   ```

2. **Check for anti-patterns**
   ```python
   mcp__qdrant__qdrant-find("constitutional_rules", "<what you might write>")
   ```

3. **Get correct patterns**
   ```python
   mcp__qdrant__qdrant-find("typescript_rules", "<pattern needed>")
   ```

4. **Verify before committing**
   - Run all tests
   - Check coverage
   - Lint and typecheck
   - Query RAG to verify no violations

---

## Success Criteria

Arborist is COMPLETE when:

✅ All functions implemented
✅ All tests pass with 100% coverage
✅ Zero rule violations in Arborist code
✅ Performance targets met
✅ Contract signed by Warden
✅ Used successfully by Steward
✅ Documentation accurate (not aspirational)

---

**This checklist is complete, detailed, and can be followed by any AI to implement Arborist correctly while following all 360 rules in Qdrant.**
