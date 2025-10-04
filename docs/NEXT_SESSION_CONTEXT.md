# Next Session Context: Arborist + Steward + RAG Phase 5

**Last Updated**: 2025-10-03T08:39:00Z
**Status**: Planning complete, ready for implementation

---

## What We Just Completed

### ✅ RAG System (Phases 1-4)
- 360 embeddings in Qdrant (6 encoding types × 19 rules × 5 categories)
- Retrieval pipeline working ([`scripts/rag/retrieval_pipeline.py`](scripts/rag/retrieval_pipeline.py))
- Query understanding, context assembly, result synthesis implemented
- Collections: constitutional_rules, functional_programming_rules, syntax_rules, formatting_rules, typescript_rules

### ✅ Arborist Planning
- Old broken code deleted (exports/, internal/)
- Fresh src/ folder created
- Complete specification written
- Formal contract created
- Implementation checklist ready

### ✅ Steward Planning
- Audited (currently just stubs)
- Integration plan with RAG created
- 28 rules documented

---

## CRITICAL: Read These Files First

### Core Philosophy (MUST READ)
1. [`docs/haskell-in-typescript.md`](docs/haskell-in-typescript.md) - FP principles
2. [`docs/testing-strategy.md`](docs/testing-strategy.md) - Testing requirements
3. [`docs/branded-types.md`](docs/branded-types.md) - Type safety patterns
4. [`docs/error-boundaries.md`](docs/error-boundaries.md) - Error handling

### RAG System (MUST UNDERSTAND)
5. [`docs/rag-strategy.md`](docs/rag-strategy.md) - How RAG enforces rules
6. [`docs/rag-implementation-plan.md`](docs/rag-implementation-plan.md) - What's done
7. [`docs/rag-phase2/REVIEW_TESTS.md`](docs/rag-phase2/REVIEW_TESTS.md) - How to query RAG

### Arborist (MUST READ BEFORE CODING)
8. [`docs/ARBORIST_SPECIFICATION.md`](docs/ARBORIST_SPECIFICATION.md) - What to build
9. [`docs/ARBORIST_EXAMPLES.md`](docs/ARBORIST_EXAMPLES.md) - Input/output examples
10. [`docs/ARBORIST_IMPLEMENTATION_CHECKLIST.md`](docs/ARBORIST_IMPLEMENTATION_CHECKLIST.md) - Step-by-step guide
11. [`libraries/arborist/contract.ts`](libraries/arborist/contract.ts) - Formal API contract
12. [`docs/ARBORIST_AUDIT.md`](docs/ARBORIST_AUDIT.md) - Why we started over

### Steward (MUST READ BEFORE CODING)
13. [`docs/STEWARD_RAG_IMPLEMENTATION_PLAN.md`](docs/STEWARD_RAG_IMPLEMENTATION_PLAN.md) - Integration plan
14. [`docs/steward-rules.md`](docs/steward-rules.md) - 28 rules to implement
15. [`libraries/steward/README.md`](libraries/steward/README.md) - Steward spec

---

## How to Use RAG (CRITICAL)

### Before Writing ANY Code

```python
# Query for relevant rules
mcp__qdrant__qdrant-find("constitutional_rules", "error handling")
mcp__qdrant__qdrant-find("syntax_rules", "arrow functions")
mcp__qdrant__qdrant-find("typescript_rules", "type annotations")

# Check what NOT to do
mcp__qdrant__qdrant-find("constitutional_rules", "try catch")
mcp__qdrant__qdrant-find("syntax_rules", "const add = (a, b) => a + b")
```

### RAG Collections Available
- `constitutional_rules` - No classes, mutations, loops, exceptions
- `functional_programming_rules` - Purity, immutability, totality
- `syntax_rules` - No arrow functions, naming conventions
- `formatting_rules` - Tabs, line length, encoding
- `typescript_rules` - Discriminated unions, branded types, readonly

### Each Rule Has 6 Encodings
1. **principle** - Why the rule exists
2. **pattern** - Correct code template
3. **query** - Developer questions
4. **antipattern** - What NOT to do
5. **example** - Complete working code
6. **counterexample** - Violation with explanation

---

## Implementation Order

### Phase 1: Arborist (6 days)

**Why First**: Steward needs Arborist to parse code.

**Follow**: [`docs/ARBORIST_IMPLEMENTATION_CHECKLIST.md`](docs/ARBORIST_IMPLEMENTATION_CHECKLIST.md)

**Day 1**: Core parsing (parseFile, buildParsedFile)
**Day 2**: Function extraction
**Day 3**: Import/export extraction
**Day 4**: Comments & types
**Day 5**: Violation detection
**Day 6**: Integration & polish

**Output**: Working `parseFile` function that returns `Result<ParsedFile, ParseError>`

---

### Phase 2: Steward MVP (Week 1)

**Why Next**: Get Steward working with basic rules.

**Follow**: [`docs/STEWARD_RAG_IMPLEMENTATION_PLAN.md`](docs/STEWARD_RAG_IMPLEMENTATION_PLAN.md) Phase A-B

**Build**:
1. File walker
2. Diagnostic system
3. Rule framework
4. 3 simple rules (export_on_same_line, import_order_grouping, one_function_per_file)

**Output**: Working `steward:check` and `steward:fix` commands

---

### Phase 3: RAG Integration (Week 2)

**Why Next**: Enhance Steward with RAG knowledge.

**Follow**: [`docs/STEWARD_RAG_IMPLEMENTATION_PLAN.md`](docs/STEWARD_RAG_IMPLEMENTATION_PLAN.md) Phase C

**Build**:
1. RAG bridge (Python subprocess wrapper)
2. Enhanced diagnostics (include RAG context)
3. 3 RAG-enhanced rules (named_functions_only, functional_programming_canon, error_handling_monadic)

**Output**: Steward error messages include principles, patterns, examples from RAG

---

## Critical Files for Next Session

### To Implement Arborist

**Start Here**:
1. Read [`docs/ARBORIST_IMPLEMENTATION_CHECKLIST.md`](docs/ARBORIST_IMPLEMENTATION_CHECKLIST.md)
2. Follow Day 1 tasks
3. Query RAG before each task
4. Write tests for everything
5. Verify 100% coverage

**Contract**: [`libraries/arborist/contract.ts`](libraries/arborist/contract.ts)
**Examples**: [`docs/ARBORIST_EXAMPLES.md`](docs/ARBORIST_EXAMPLES.md)

### To Implement Steward

**Start Here**:
1. Read [`docs/STEWARD_RAG_IMPLEMENTATION_PLAN.md`](docs/STEWARD_RAG_IMPLEMENTATION_PLAN.md)
2. Wait for Arborist to be done first
3. Follow Phase A tasks
4. Use Arborist's parseFile
5. Query RAG for each rule

**Rules**: [`docs/steward-rules.md`](docs/steward-rules.md)
**Spec**: [`libraries/steward/README.md`](libraries/steward/README.md)

---

## Dependencies Between Tasks

```
Arborist Implementation
  ↓
Steward MVP (uses Arborist)
  ↓
RAG Integration (enhances Steward)
  ↓
Complete System
```

**CANNOT skip Arborist!** Steward needs it to parse code.

---

## Testing Requirements (NON-NEGOTIABLE)

### Before ANY Commit

```bash
deno task test          # ALL tests MUST pass
deno task test:cov      # 100% coverage REQUIRED
deno task lint          # Zero errors
deno task typecheck     # Zero errors
deno task fmt           # Code formatted
```

### For EVERY Function

- Write test FIRST (TDD)
- Test happy path
- Test edge cases
- Test error cases
- Property-based tests with fast-check
- 100% coverage (no exceptions)

---

## Rule Compliance (NON-NEGOTIABLE)

### ALWAYS Query RAG Before Coding

```python
# Before implementing ANY function
mcp__qdrant__qdrant-find("constitutional_rules", "<what you're about to do>")
mcp__qdrant__qdrant-find("syntax_rules", "<what you're about to do>")
```

### NEVER Write

- ❌ Arrow functions (`=>`)
- ❌ Classes (`class`)
- ❌ Loops (`for`, `while`)
- ❌ Exceptions (`throw`, `try-catch` except at I/O boundaries)
- ❌ Mutations (`let`, `var`, `.push()`, etc.)
- ❌ Abbreviations (write full names)

### ALWAYS Write

- ✅ Named functions (`function name() {}`)
- ✅ Pure functions (no side effects)
- ✅ Immutable data (`const`, `Readonly`, `ReadonlyArray`)
- ✅ Result monad for errors
- ✅ map/filter/reduce for iteration
- ✅ Full descriptive names

---

## Quick Start Commands

### To Continue Arborist

```bash
cd libraries/arborist

# Read the checklist
cat ../../docs/ARBORIST_IMPLEMENTATION_CHECKLIST.md

# Query RAG for guidance
# (Use MCP tool in your editor)

# Start Day 1, Task 1.1
mkdir -p src/types
touch src/types/index.ts
touch src/types/index.test.ts

# Follow checklist step-by-step
```

### To Continue Steward (After Arborist)

```bash
cd libraries/steward

# Read the plan
cat ../../docs/STEWARD_RAG_IMPLEMENTATION_PLAN.md

# Start Phase A
mkdir -p src/core/walker
mkdir -p src/core/diagnostics
mkdir -p src/rules

# Follow plan step-by-step
```

---

## Success Metrics

### Arborist Complete When:
- ✅ All functions in contract.ts implemented
- ✅ 100% test coverage
- ✅ Zero rule violations
- ✅ Performance targets met
- ✅ Contract signed by Warden

### Steward MVP Complete When:
- ✅ Can run `steward:check` on codebase
- ✅ Can run `steward:fix` on codebase
- ✅ 3+ rules working
- ✅ JSON + pretty output
- ✅ < 3 seconds for repo-wide check

### RAG Integration Complete When:
- ✅ Steward queries RAG for rule context
- ✅ Error messages include principles, patterns, examples
- ✅ 6+ rules with RAG enhancement

---

## What NOT to Do (Common Mistakes)

### ❌ DON'T Start Coding Without Reading Docs
Read ALL the docs listed above first. Seriously.

### ❌ DON'T Skip RAG Queries
Query RAG before EVERY function. It has 360 rules to guide you.

### ❌ DON'T Skip Tests
Write tests FIRST. 100% coverage is mandatory.

### ❌ DON'T Violate Rules
No arrow functions. No classes. No loops. No exceptions. No mutations.

### ❌ DON'T Assume Arborist is Done
It's NOT. Old code was deleted. Start from scratch following the checklist.

### ❌ DON'T Skip Verification
Run test, lint, typecheck before EVERY commit.

---

## File Checklist for Next Session

### Must Read Before Starting
- [ ] docs/haskell-in-typescript.md
- [ ] docs/testing-strategy.md
- [ ] docs/ARBORIST_IMPLEMENTATION_CHECKLIST.md
- [ ] docs/ARBORIST_EXAMPLES.md
- [ ] libraries/arborist/contract.ts

### Must Have Open
- [ ] RAG query tool (MCP)
- [ ] ARBORIST_IMPLEMENTATION_CHECKLIST.md
- [ ] ARBORIST_EXAMPLES.md (for reference)

### Must Execute
- [ ] Query RAG before each task
- [ ] Write tests before implementation
- [ ] Verify after each function

---

## Summary for AI Resume

**Context**: We're building a functional TypeScript codebase with strict rules enforced by RAG.

**Current State**:
- RAG Phases 1-4: COMPLETE (360 embeddings in Qdrant)
- Arborist: PLANNED (old code deleted, ready to implement)
- Steward: PLANNED (stubs only, needs Arborist first)

**Next Steps**:
1. Implement Arborist following [`docs/ARBORIST_IMPLEMENTATION_CHECKLIST.md`](docs/ARBORIST_IMPLEMENTATION_CHECKLIST.md)
2. Implement Steward MVP following [`docs/STEWARD_RAG_IMPLEMENTATION_PLAN.md`](docs/STEWARD_RAG_IMPLEMENTATION_PLAN.md)
3. Integrate RAG with Steward

**Critical**: Query RAG before writing ANY code. Follow ALL rules. Write tests FIRST. 100% coverage mandatory.

**Files to Read**: See "CRITICAL: Read These Files First" section above.

**Don't forget**: Arborist is NOT done. Start from scratch. Follow the checklist. Query RAG constantly.

---

**This document contains EVERYTHING needed to resume. Read it completely before starting.**
