# Steward + RAG Phase 5: Integrated Implementation Plan

## Current State Assessment

### Steward Status: STUBS ONLY
- ✅ Package structure exists
- ✅ CLI entry points (check/fix) are stubs
- ✅ 28 rules documented in [`docs/steward-rules.md`](steward-rules.md)
- ❌ NO rule implementations yet
- ❌ NO diagnostics generation yet
- ❌ NO autofix logic yet

### Arborist Status: SUBSTANTIALLY COMPLETE ✅
- ✅ [`parseFile`](../libraries/arborist/exports/parseFile/index.ts) - Parse TS/JS files with SWC
- ✅ [`extractFunctions`](../libraries/arborist/internal/extractFunctions/index.ts) - Get all functions from AST
- ✅ [`extractSignature`](../libraries/arborist/internal/extractSignature/index.ts) - Extract function signatures
- ✅ [`extractComments`](../libraries/arborist/README.md:124) - Get comments with positions
- ✅ [`extractImports`](../libraries/arborist/README.md:125) - Get import statements
- ✅ Types: `ParsedFile`, `ParsedFunction`, `Comment`, `ImportIR`
- ✅ 20-50x faster than TypeScript compiler
- ✅ Perfect for Steward's needs!

**KEY INSIGHT**: Arborist is READY. We can start Steward implementation immediately!

### RAG Status: PHASES 1-4 COMPLETE
- ✅ 360 embeddings in Qdrant (6 encoding types × 19 rules × 5 categories)
- ✅ Retrieval pipeline working
- ✅ Query understanding implemented
- ✅ Context assembly implemented
- ❌ NOT integrated with any tools yet

### The Opportunity

We can build Steward and RAG Phase 5 **in tandem** because:
1. Steward needs rule knowledge → RAG provides it
2. RAG needs a consumer → Steward is perfect
3. Both are greenfield → no legacy to work around

---

## Integrated Implementation Strategy

### Phase A: Core Steward Infrastructure (Week 1)
**Build the foundation that RAG will enhance**

#### A.1: AST Parsing & File Walking
- [x] ~~Implement file walker~~ - Use Deno.readDir recursively
- [x] ~~Integrate Arborist~~ - **ALREADY DONE!** Use `parseFile` from Arborist
- [ ] Create rule visitor pattern (use Arborist's `ParsedFile` output)
- [x] ~~Handle parse errors~~ - Arborist already handles this gracefully

#### A.2: Diagnostics System
- [ ] Implement `StewardIssue` type and builders
- [ ] Implement `StewardReport` aggregation
- [ ] Create JSON serializer
- [ ] Create pretty console formatter
- [ ] Add severity-based filtering

#### A.3: Rule Framework
- [ ] Define `Rule` interface (check + optional fix)
- [ ] Implement rule registry
- [ ] Create rule runner (parallel execution)
- [ ] Add rule result aggregation

**Deliverable**: Steward can parse files, run rules, and emit diagnostics (even if rules are empty)

---

### Phase B: Priority Rules WITHOUT RAG (Week 1-2)
**Implement high-value rules that don't need RAG enhancement**

#### B.1: Mechanical Rules (Easy Wins)
1. **export_on_same_line** (fix)
   - AST: Find export declarations
   - Check: export keyword on same line as declaration
   - Fix: Move export keyword inline

2. **import_order_grouping** (fix)
   - AST: Extract all imports
   - Sort: Group by realm, alphabetize within group
   - Fix: Rewrite import block

3. **code_style_formatting** (fix)
   - Delegate to `deno fmt`
   - Post-process for blank line rules

#### B.2: Detection Rules (No Fix)
4. **one_function_per_file** (check)
   - AST: Count exported functions
   - Report: Multiple exports with codemod suggestion

5. **no_barrel_files** (check)
   - AST: Find `export * from` and `export { } from`
   - Report: Barrel detected

6. **privacy_folder_convention** (check)
   - Check: Folder name matches function name
   - Check: Underscore prefix consistency
   - Report: Violations with rename suggestions

**Deliverable**: 6 working rules, Steward provides value immediately

---

### Phase C: RAG-Enhanced Rules (Week 2)
**Integrate RAG to enhance error messages and fixes**

#### C.1: RAG Integration Layer
- [ ] Create Python bridge: `rag_query.py`
  - Calls `retrieval_pipeline.py`
  - Returns formatted context
  - Caches results per session

- [ ] Create TypeScript wrapper: `queryRAG.ts`
  - Spawns Python subprocess
  - Parses JSON response
  - Provides typed interface

#### C.2: Enhanced Diagnostics
Modify diagnostic generation to include RAG context:

```typescript
type EnhancedIssue = StewardIssue & {
  ragContext?: {
    principle: string
    correctPattern: string
    example: string
    whyWrong: string
  }
}
```

#### C.3: RAG-Enhanced Rules
7. **named_functions_only** (check + RAG)
   - Detect: Arrow functions
   - RAG Query: "Can I use arrow functions?"
   - Enhanced Message: Include principle + pattern + anti-pattern
   - Suggested Fix: Show correct named function pattern

8. **functional_programming_canon** (check + RAG)
   - Detect: `class` keyword
   - RAG Query: "Can I use classes?"
   - Enhanced Message: Why classes forbidden + module pattern

9. **error_handling_monadic** (check + RAG)
   - Detect: `throw` statements, `try-catch`
   - RAG Query: "How do I handle errors?"
   - Enhanced Message: Result/Validation patterns

**Deliverable**: Steward error messages include RAG-retrieved context

---

### Phase D: Advanced RAG Features (Week 3)
**Make Steward truly intelligent**

#### D.1: Fix Suggestions from RAG
- [ ] Query RAG for fix patterns when violation detected
- [ ] Generate code fixes from RAG patterns
- [ ] Apply fixes with AST transformations
- [ ] Verify fixes don't break code

#### D.2: Learning from Violations
- [ ] Log violations to RAG feedback system
- [ ] Track which rules are violated most
- [ ] Improve RAG retrieval based on common violations
- [ ] Update embeddings with real-world examples

#### D.3: Interactive Mode
- [ ] `steward:fix --interactive`
- [ ] Show violation + RAG context
- [ ] Offer multiple fix options from RAG
- [ ] Apply user-selected fix

**Deliverable**: Steward can auto-fix violations using RAG patterns

---

## Detailed Implementation Roadmap

### Week 1: Foundation

**Day 1-2: Core Infrastructure**
```
[ ] File walker with glob patterns
[ ] AST parser integration (Arborist)
[ ] Diagnostic types and builders
[ ] JSON + pretty formatters
[ ] Rule interface and registry
```

**Day 3-4: First 3 Rules**
```
[ ] export_on_same_line (fix)
[ ] import_order_grouping (fix)
[ ] one_function_per_file (check)
```

**Day 5: Testing & Integration**
```
[ ] Unit tests for each rule
[ ] Integration test on real codebase
[ ] Performance profiling
[ ] CLI polish
```

### Week 2: RAG Integration

**Day 1-2: RAG Bridge**
```
[ ] Python bridge script
[ ] TypeScript wrapper
[ ] Caching layer
[ ] Error handling
```

**Day 3-4: Enhanced Rules**
```
[ ] named_functions_only + RAG
[ ] functional_programming_canon + RAG
[ ] error_handling_monadic + RAG
```

**Day 5: Polish**
```
[ ] Enhanced message formatting
[ ] Citation links
[ ] Example code in diagnostics
```

### Week 3: Advanced Features

**Day 1-2: Auto-Fix from RAG**
```
[ ] Pattern extraction from RAG
[ ] AST transformation generation
[ ] Fix application and verification
```

**Day 3-4: Learning System**
```
[ ] Violation logging
[ ] Feedback to RAG
[ ] Embedding updates
```

**Day 5: Interactive Mode**
```
[ ] Interactive CLI
[ ] Multiple fix options
[ ] User selection
```

---

## Priority Order (MVP First)

### MVP (Minimum Viable Product) - Week 1
**Goal**: Steward provides immediate value without RAG

1. ✅ File walker
2. ✅ AST parser
3. ✅ Diagnostic system
4. ✅ export_on_same_line (fix)
5. ✅ import_order_grouping (fix)
6. ✅ one_function_per_file (check)
7. ✅ CLI that works

**Success**: Can run `steward:check` and `steward:fix` on codebase

### V1 (RAG-Enhanced) - Week 2
**Goal**: Steward messages include RAG context

8. ✅ RAG integration layer
9. ✅ named_functions_only + RAG
10. ✅ functional_programming_canon + RAG
11. ✅ error_handling_monadic + RAG

**Success**: Error messages show principles, patterns, and examples

### V2 (Intelligent Fixes) - Week 3
**Goal**: Steward auto-fixes using RAG patterns

12. ✅ Auto-fix from RAG patterns
13. ✅ Interactive mode
14. ✅ Learning system

**Success**: Steward can fix violations automatically using RAG knowledge

---

## Technical Architecture

```
┌─────────────────────────────────────────┐
│         Steward CLI                     │
│    steward:check / steward:fix          │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         File Walker                     │
│    Recursively find .ts files           │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         AST Parser (Arborist)           │
│    Parse TypeScript → AST               │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Rule Runner                     │
│    Execute all rules in parallel        │
└─────────────────────────────────────────┘
          ↓               ↓
┌──────────────┐  ┌──────────────────────┐
│ Simple Rules │  │  RAG-Enhanced Rules  │
│ (no RAG)     │  │  (with RAG)          │
└──────────────┘  └──────────────────────┘
          ↓               ↓
          └───────┬───────┘
                  ↓
┌─────────────────────────────────────────┐
│      RAG Query (if needed)              │
│  retrieval_pipeline.py                  │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      Diagnostic Builder                 │
│  Issue + RAG context → StewardIssue     │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      Report Generator                   │
│  JSON + Pretty output                   │
└─────────────────────────────────────────┘
```

---

## Rule Implementation Template

### Without RAG (Simple)
```typescript
// Rule: export_on_same_line
function checkExportOnSameLine(ast: AST): Array<StewardIssue> {
  const issues: Array<StewardIssue> = []
  
  // Find export declarations
  const exports = findExportDeclarations(ast)
  
  for (const exp of exports) {
    if (not(isOnSameLine(exp.export, exp.declaration))) {
      issues.push({
        rule: 'export_on_same_line',
        severity: 'error',
        path: ast.fileName,
        position: exp.position,
        message: 'Export must be on same line as declaration',
        suggestedFix: {
          type: 'textEdit',
          description: 'Move export keyword inline',
          edits: [/* AST-based edit */]
        }
      })
    }
  }
  
  return issues
}
```

### With RAG (Enhanced)
```typescript
// Rule: named_functions_only
async function checkNamedFunctionsOnly(
  ast: AST
): Promise<Array<EnhancedIssue>> {
  const issues: Array<EnhancedIssue> = []
  
  // Find arrow functions
  const arrowFunctions = findArrowFunctions(ast)
  
  for (const arrow of arrowFunctions) {
    // Query RAG for context
    const ragContext = await queryRAG("Can I use arrow functions?")
    
    issues.push({
      rule: 'named_functions_only',
      severity: 'error',
      path: ast.fileName,
      position: arrow.position,
      message: 'Arrow functions are forbidden. Use named function declarations.',
      ragContext: {
        principle: ragContext.principle,
        correctPattern: ragContext.pattern,
        example: ragContext.example,
        whyWrong: ragContext.antipattern
      },
      suggestedFix: {
        type: 'textEdit',
        description: 'Convert to named function',
        edits: [/* Generated from RAG pattern */]
      }
    })
  }
  
  return issues
}
```

---

## File Structure (To Create)

```
libraries/steward/src/
  check/
    index.ts                    # ✅ EXISTS (stub)
  fix/
    index.ts                    # ✅ EXISTS (stub)
  
  core/                         # NEW
    walker/
      index.ts                  # Walk directory tree
    parser/
      index.ts                  # Parse TS with Arborist
    diagnostics/
      types/index.ts            # StewardIssue, StewardReport
      toJson/index.ts           # Serialize to JSON
      toPretty/index.ts         # Format for console
    rag/
      queryRAG/index.ts         # Query RAG system
      enhanceIssue/index.ts     # Add RAG context to issue
  
  rules/                        # NEW
    exportOnSameLine/
      index.ts                  # Rule implementation
      index.test.ts             # Tests
    importOrderGrouping/
      index.ts
      index.test.ts
    oneFunctionPerFile/
      index.ts
      index.test.ts
    namedFunctionsOnly/         # RAG-enhanced
      index.ts
      index.test.ts
    functionalProgrammingCanon/ # RAG-enhanced
      index.ts
      index.test.ts
    errorHandlingMonadic/       # RAG-enhanced
      index.ts
      index.test.ts
  
  runner/                       # NEW
    runChecks/index.ts          # Orchestrate rule execution
    applyFixes/index.ts         # Apply fixes + re-check
```

---

## Implementation Phases

### Phase A: Core Infrastructure (Days 1-2)

**A.1: File Walker**
```typescript
function walkDirectory(
  rootPath: string
): (pattern: string) => Promise<ReadonlyArray<string>>

// Usage
const tsFiles = await walkDirectory("./src")("**/*.ts")
```

**A.2: AST Parser**
```typescript
function parseTypeScript(
  filePath: string
): Promise<Result<AST, ParseError>>

// Usage
const astResult = await parseTypeScript("src/foo/index.ts")
```

**A.3: Diagnostic Types**
```typescript
type StewardIssue = Readonly<{
  rule: string
  severity: 'error' | 'warn' | 'info'
  path: string
  position?: Position
  message: string
  suggestedFix?: Fix
  ragContext?: RAGContext  // NEW
}>

type RAGContext = Readonly<{
  principle: string
  correctPattern: string
  example: string
  whyWrong: string
  citations: ReadonlyArray<string>
}>
```

---

### Phase B: First 3 Rules (Days 3-4)

**Priority 1: export_on_same_line**
- Highest value (affects all files)
- Safe autofix
- No RAG needed
- Tests: 10 cases

**Priority 2: import_order_grouping**
- High value (improves readability)
- Safe autofix
- No RAG needed
- Tests: 15 cases

**Priority 3: one_function_per_file**
- Critical for architecture
- Check only (codemod suggestion)
- No RAG needed
- Tests: 8 cases

---

### Phase C: RAG Integration (Days 5-6)

**C.1: RAG Bridge**
```typescript
// src/core/rag/queryRAG/index.ts
async function queryRAG(
  query: string
): Promise<Result<RAGResponse, RAGError>> {
  // Spawn Python subprocess
  const process = new Deno.Command("python3", {
    args: ["scripts/rag/retrieval_pipeline.py", query],
    stdout: "piped"
  })
  
  const output = await process.output()
  const result = JSON.parse(new TextDecoder().decode(output.stdout))
  
  return ok(result)
}
```

**C.2: Enhanced Issue Builder**
```typescript
async function enhanceIssueWithRAG(
  issue: StewardIssue,
  query: string
): Promise<EnhancedIssue> {
  const ragResult = await queryRAG(query)
  
  return matchResult(
    function handleSuccess(rag: RAGResponse): EnhancedIssue {
      return {
        ...issue,
        ragContext: {
          principle: rag.principle,
          correctPattern: rag.pattern,
          example: rag.example,
          whyWrong: rag.antipattern,
          citations: rag.citations
        }
      }
    },
    function handleError(): EnhancedIssue {
      return issue  // Fallback to non-enhanced
    }
  )(ragResult)
}
```

---

### Phase D: RAG-Enhanced Rules (Days 7-9)

**Priority 4: named_functions_only + RAG**
```typescript
async function checkNamedFunctionsOnly(
  ast: AST
): Promise<ReadonlyArray<EnhancedIssue>> {
  const arrowFunctions = findArrowFunctions(ast)
  
  const issues = arrowFunctions.map(
    async function createIssue(arrow) {
      const baseIssue = {
        rule: 'named_functions_only',
        severity: 'error' as const,
        path: ast.fileName,
        position: arrow.position,
        message: 'Arrow functions forbidden. Use named function declarations.'
      }
      
      return enhanceIssueWithRAG(
        baseIssue,
        "Can I use arrow functions?"
      )
    }
  )
  
  return Promise.all(issues)
}
```

**Priority 5: functional_programming_canon + RAG**
- Detect: `class` keyword
- RAG: "Can I use classes?"
- Enhanced with module patterns

**Priority 6: error_handling_monadic + RAG**
- Detect: `throw`, `try-catch`
- RAG: "How do I handle errors?"
- Enhanced with Result/Validation patterns

---

## Testing Strategy

### Rule Tests (Per Rule)
```typescript
Deno.test("export_on_same_line - detects split export", () => {
  const code = `
    function foo() {}
    export default foo
  `
  const issues = checkExportOnSameLine(parse(code))
  
  assertEquals(issues.length, 1)
  assertEquals(issues[0].rule, 'export_on_same_line')
})

Deno.test("export_on_same_line - fix works", () => {
  const code = `
    function foo() {}
    export default foo
  `
  const fixed = applyFix(code, checkExportOnSameLine)
  
  assertEquals(fixed, `export default function foo() {}`)
})
```

### RAG Integration Tests
```typescript
Deno.test("RAG enhances arrow function error", async () => {
  const code = `const add = (a, b) => a + b`
  const issues = await checkNamedFunctionsOnly(parse(code))
  
  assert(issues[0].ragContext)
  assert(includes("forbidden")(issues[0].ragContext.principle))
  assert(includes("function")(issues[0].ragContext.correctPattern))
})
```

---

## Success Criteria

### MVP Success (End of Week 1)
- ✅ Can run `steward:check` on codebase
- ✅ Can run `steward:fix` on codebase
- ✅ 3+ rules working
- ✅ JSON + pretty output
- ✅ < 3 seconds for repo-wide check

### V1 Success (End of Week 2)
- ✅ RAG integration working
- ✅ 6+ rules implemented
- ✅ Enhanced error messages with RAG context
- ✅ Principles, patterns, examples in diagnostics

### V2 Success (End of Week 3)
- ✅ Auto-fix from RAG patterns
- ✅ Interactive mode
- ✅ Learning from violations
- ✅ 10+ rules implemented

---

## Parallel Workstreams

### Stream 1: Steward Core (Can start immediately)
- File walker
- AST parser
- Diagnostic system
- Simple rules (export, imports, one-function)

### Stream 2: RAG Bridge (Depends on Stream 1 basics)
- Python bridge
- TypeScript wrapper
- Caching

### Stream 3: RAG-Enhanced Rules (Depends on Stream 1 + 2)
- named_functions_only
- functional_programming_canon
- error_handling_monadic

### Stream 4: Advanced Features (Depends on all above)
- Auto-fix from RAG
- Interactive mode
- Learning system

**Streams 1 and 2 can run in parallel after Day 2!**

---

## Next Immediate Steps

1. **Implement file walker** (2 hours)
2. **Integrate Arborist for AST** (3 hours)
3. **Create diagnostic types** (2 hours)
4. **Implement export_on_same_line** (4 hours)
5. **Test on real codebase** (2 hours)

**Total: ~13 hours to MVP foundation**

Then RAG integration adds ~8 hours for bridge + first enhanced rule.

---

## Questions to Resolve

1. **Arborist integration**: Do we have Arborist available? Or use TypeScript compiler API directly?
2. **Performance**: Should rules run in parallel or sequential?
3. **Caching**: Should we cache ASTs between check and fix?
4. **RAG caching**: How long to cache RAG responses?
5. **Fix safety**: What's our policy for auto-applying fixes vs. suggesting?

---

**This plan delivers Steward MVP in Week 1, RAG-enhanced in Week 2, and intelligent auto-fix in Week 3. Ready to start?**
