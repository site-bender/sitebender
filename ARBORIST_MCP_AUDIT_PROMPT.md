# CRITICAL: Arborist MCP Audit Required - DO NOT IMPLEMENT

**Date**: 2025-10-04T01:32:00Z
**Status**: PAUSED - Awaiting MCP access and audit
**PRIORITY**: ABSOLUTE - DO NOT PROCEED WITHOUT MCP VERIFICATION

---

## ⚠️ MANDATORY FIRST STEPS - DO NOT SKIP

### Step 1: Verify MCP Access (REQUIRED)

**YOU MUST HAVE MCP/QDRANT ACCESS BEFORE DOING ANYTHING**

1. Check your available tools list for MCP tools like:
   - `mcp__qdrant__qdrant-find`
   - `mcp__qdrant__search`
   - Any tool starting with `mcp__qdrant__`

2. If NO MCP tools visible:
   - **STOP IMMEDIATELY**
   - Tell user: "I do NOT have MCP access. Cannot proceed."
   - Do NOT read any code
   - Do NOT make any changes
   - Wait for user to fix MCP connection

3. If MCP tools ARE visible:
   - Proceed to Step 2

### Step 2: Query Qdrant for ALL Critical Rules (REQUIRED)

**Before reading ANY code, query Qdrant for:**

```
mcp__qdrant__qdrant-find("revolutionary_rules", "NO loops NO mutations")
mcp__qdrant__qdrant-find("revolutionary_rules", "NO OOP methods")
mcp__qdrant__qdrant-find("revolutionary_rules", "Toolsmith functions")
mcp__qdrant__qdrant-find("revolutionary_rules", "pure functions")
mcp__qdrant__qdrant-find("revolutionary_rules", "immutability")
mcp__qdrant__qdrant-find("code_patterns", "recursion without loops")
mcp__qdrant__qdrant-find("code_patterns", "Toolsmith reduce map filter")
mcp__qdrant__qdrant-find("forbidden_patterns", "array methods")
```

**Save all responses** - these are the CANONICAL rules, not the JSON file.

### Step 3: Audit Recent Changes (REQUIRED)

**A previous AI made changes WITHOUT MCP access. You MUST audit them:**

**Files Changed** (read ALL of these):
1. [`libraries/arborist/src/analyzeFunctionBody/index.ts`](libraries/arborist/src/analyzeFunctionBody/index.ts)
2. [`libraries/arborist/src/_helpers/collectASTNodes/index.ts`](libraries/arborist/src/_helpers/collectASTNodes/index.ts)
3. [`libraries/arborist/src/_helpers/traverseASTNode/index.ts`](libraries/arborist/src/_helpers/traverseASTNode/index.ts)
4. [`libraries/arborist/src/_helpers/ensureSwcInitialized/index.ts`](libraries/arborist/src/_helpers/ensureSwcInitialized/index.ts)
5. [`libraries/arborist/src/extractFunctionDetails/index.ts`](libraries/arborist/src/extractFunctionDetails/index.ts)
6. [`libraries/arborist/src/extractFunctionDetails/index.test.ts`](libraries/arborist/src/extractFunctionDetails/index.test.ts)

**For EACH file, verify against Qdrant rules:**
- ✓ Uses Toolsmith functions (not OOP methods)?
- ✓ No loops (for, while, forEach)?
- ✓ No mutations (let, var)?
- ✓ Pure functional approach?
- ✓ Correct Toolsmith import paths?
- ✓ Follows all revolutionary_rules?

**If ANY violations found:**
- Document them clearly
- Query Qdrant for correct pattern
- Fix immediately before proceeding

---

## Project Context

### What is Arborist?

Arborist is a TypeScript/JavaScript AST parser library that:
- Parses TypeScript files using SWC (not TypeScript compiler)
- Extracts functions, imports, exports, comments, types
- Detects rule violations (arrow functions, classes, loops, mutations)
- Provides structured metadata for code analysis

### Current Implementation Status

**Completed (Day 1)**:
- ✅ Types defined in [`types/index.ts`](libraries/arborist/src/types/index.ts)
- ✅ [`parseFile/index.ts`](libraries/arborist/src/parseFile/index.ts) - Parses files using SWC
- ✅ [`buildParsedFile/index.ts`](libraries/arborist/src/buildParsedFile/index.ts) - Builds ParsedFile structure

**Completed (Day 2 - NEEDS AUDIT)**:
- ⚠️ [`analyzeFunctionBody/index.ts`](libraries/arborist/src/analyzeFunctionBody/index.ts) - Analyzes function bodies
- ⚠️ [`extractFunctionDetails/index.ts`](libraries/arborist/src/extractFunctionDetails/index.ts) - Extracts function metadata
- ⚠️ Helper functions in `_helpers/` directory

**Pending (Day 2)**:
- ❌ `extractFunctions/index.ts` - NOT YET IMPLEMENTED
- ❌ Update `buildParsedFile` to call `extractFunctions` - NOT YET DONE

**Pending (Day 3+)**:
- ❌ Import/export extraction
- ❌ Comment extraction
- ❌ Violation detection
- ❌ Full integration

### Test Status

**Current**: 49/51 tests passing
- 12/12 analyzeFunctionBody ✅
- 5/5 buildParsedFile ✅
- 13/14 extractFunctionDetails ✅ (1 WASM resource warning)
- 5/6 parseFile ✅ (1 WASM resource warning)
- 14/14 types ✅

**Note**: The 2 "failures" are Deno resource leak warnings from WASM, not real test failures.

---

## Critical Rules (from Qdrant - VERIFY THESE)

### Priority 10 Rules (ABSOLUTE - NO EXCEPTIONS)

1. **FP_NO_LOOPS_001**: NO loops (for, while, forEach)
   - Use: Toolsmith map/filter/reduce OR recursion
   - Exception: Nearly impossible (requires profiling + Architect approval)

2. **FP_NO_MUTATIONS_001**: NO mutations (let, var, array.push, etc.)
   - Use: const with spread operators, Toolsmith functions
   - Exception: Nearly impossible (requires profiling + Architect approval)

3. **FP_NO_CLASSES_001**: NO classes, interfaces, OOP
   - Use: Pure functions, type aliases
   - Exception: NONE

4. **FUNC_DECLARATION_001**: NO arrow functions (except in tests)
   - Use: Named function declarations
   - Exception: Test files only

5. **FUNC_ONE_PER_FILE_001**: ONE function per file
   - Structure: functionName/index.ts
   - Exception: NONE

6. **IMPORT_NO_BARREL_001**: NO barrel files (index.ts re-exports)
   - Use: Direct imports from function files
   - Exception: NONE

7. **TEST_COVERAGE_100_001**: 100% test coverage required
   - Use: Deno.test with full coverage
   - Exception: Requires Architect approval + comment

### Priority 9 Rules (CRITICAL)

8. **FP_NO_OOP_METHODS_001**: NO .map(), .filter(), .forEach(), .reduce()
   - Use: Toolsmith boxed functions instead
   - Import: `@sitebender/toolsmith/vanilla/array/map` etc.

9. **IMPORT_DEFAULT_ONLY_001**: Import as default from function file
   - Format: `import functionName from "@sitebender/toolsmith/vanilla/array/map"`
   - NOT: `import { map } from "..."`

10. **FUNC_NAMING_001**: camelCase public, _underscore private

### Toolsmith Functions Available

**Array operations**:
- `@sitebender/toolsmith/vanilla/array/map`
- `@sitebender/toolsmith/vanilla/array/reduce`
- `@sitebender/toolsmith/vanilla/array/filter`
- `@sitebender/toolsmith/vanilla/array/find`
- `@sitebender/toolsmith/vanilla/array/flatMap`
- Many more...

**Object operations**:
- `@sitebender/toolsmith/vanilla/object/values`
- `@sitebender/toolsmith/vanilla/object/keys`

**NO forEach** - Use `reduce` for side effects or pure recursion

---

## What Previous AI Did (AUDIT REQUIRED)

### Changes Made

1. **Replaced OOP methods with Toolsmith**:
   - `.reduce()` → `reduce` from Toolsmith
   - `.map()` → `map` from Toolsmith
   - `.forEach()` → `reduce` for side effects (no forEach in Toolsmith)
   - `Object.values()` → `values` from Toolsmith
   - `.find()` → `find` from Toolsmith

2. **Eliminated mutations**:
   - `let initialized = false` → `const initializationPromise`
   - Used promise caching instead of mutable state

3. **Fixed extractFunctionDetails**:
   - Corrected SWC AST structure understanding
   - Fixed parameter type extraction
   - Fixed optional parameter detection
   - Fixed return type extraction
   - Fixed type parameter extraction
   - Added export wrapper handling

### Potential Issues to Verify

**CRITICAL QUESTIONS FOR QDRANT**:

1. Is using `reduce` for side effects (with void accumulator) acceptable?
   - Query: `mcp__qdrant__qdrant-find("code_patterns", "side effects without forEach")`

2. Is the promise caching approach in `ensureSwcInitialized` acceptable?
   - Query: `mcp__qdrant__qdrant-find("code_patterns", "initialization without mutation")`

3. Are the Toolsmith import paths correct?
   - Query: `mcp__qdrant__qdrant-find("code_patterns", "Toolsmith import examples")`

4. Is the currying correct in the refactored code?
   - Query: `mcp__qdrant__qdrant-find("code_patterns", "curried Toolsmith functions")`

---

## Your Mission (AFTER MCP ACCESS CONFIRMED)

### Phase 1: Audit (MANDATORY)

1. **Query Qdrant** for all rules mentioned above
2. **Read all 6 changed files** listed in "What Previous AI Did"
3. **Compare each file** against Qdrant rules
4. **Document violations** if any found
5. **Fix violations** before proceeding

### Phase 2: Acknowledge Understanding (DO NOT IMPLEMENT)

After audit, you MUST:
1. Summarize what you found in the audit
2. List any violations that need fixing
3. Confirm you understand the rules
4. **STOP and WAIT** for user approval before implementing anything

### Phase 3: Implementation (ONLY AFTER APPROVAL)

If audit passes and user approves:
1. Implement `extractFunctions`
2. Update `buildParsedFile`
3. Run tests
4. Verify compliance

---

## Verification Checklist

Before ANY implementation:

- [ ] MCP tools visible in tool list?
- [ ] Queried Qdrant for all critical rules?
- [ ] Read all 6 changed files?
- [ ] Compared against Qdrant rules?
- [ ] Documented any violations found?
- [ ] Fixed all violations?
- [ ] User approved proceeding?

**If ANY checkbox is unchecked: STOP**

---

## Key Files to Read

**Documentation** (read FIRST):
1. [`ARBORIST_DAY2_HANDOFF.md`](ARBORIST_DAY2_HANDOFF.md) - Session context
2. [`docs/ARBORIST_IMPLEMENTATION_CHECKLIST.md`](docs/ARBORIST_IMPLEMENTATION_CHECKLIST.md) - Implementation guide
3. [`docs/ARBORIST_SPECIFICATION.md`](docs/ARBORIST_SPECIFICATION.md) - Full spec
4. [`libraries/arborist/contract.ts`](libraries/arborist/contract.ts) - API contract

**Rules** (verify against Qdrant):
1. [`mcp_restore_commands.json`](mcp_restore_commands.json) - May be outdated, verify with Qdrant
2. [`rules/index.md`](rules/index.md) - May be outdated, verify with Qdrant

**Code to Audit**:
1. [`libraries/arborist/src/analyzeFunctionBody/index.ts`](libraries/arborist/src/analyzeFunctionBody/index.ts)
2. [`libraries/arborist/src/_helpers/collectASTNodes/index.ts`](libraries/arborist/src/_helpers/collectASTNodes/index.ts)
3. [`libraries/arborist/src/_helpers/traverseASTNode/index.ts`](libraries/arborist/src/_helpers/traverseASTNode/index.ts)
4. [`libraries/arborist/src/_helpers/ensureSwcInitialized/index.ts`](libraries/arborist/src/_helpers/ensureSwcInitialized/index.ts)
5. [`libraries/arborist/src/extractFunctionDetails/index.ts`](libraries/arborist/src/extractFunctionDetails/index.ts)
6. [`libraries/arborist/src/extractFunctionDetails/index.test.ts`](libraries/arborist/src/extractFunctionDetails/index.test.ts)

---

## Expected Response Format

After completing audit, respond with:

```markdown
# MCP Audit Complete

## MCP Access Status
- [x] MCP tools visible: [list tools found]
- [x] Queried Qdrant for all critical rules

## Qdrant Rules Retrieved
[Paste actual Qdrant responses here]

## Audit Results

### File: analyzeFunctionBody/index.ts
- Status: [COMPLIANT / VIOLATIONS FOUND]
- Issues: [list any violations]
- Qdrant rule reference: [rule IDs]

[Repeat for all 6 files]

## Summary
- Total violations found: [number]
- Files compliant: [number]
- Action required: [NONE / FIX VIOLATIONS / REVERT ALL CHANGES]

## Recommendation
[Your recommendation based on audit]

**AWAITING USER APPROVAL TO PROCEED**
```

---

## ABSOLUTE RULES FOR YOU

1. **DO NOT PROCEED** without MCP access
2. **DO NOT TRUST** local JSON files - Qdrant is canonical
3. **DO NOT IMPLEMENT** anything until audit complete
4. **DO NOT ASSUME** rules - query Qdrant for everything
5. **STOP AND ASK** if uncertain about anything

---

## Why This Matters

**The Problem**: A previous AI made changes using `mcp_restore_commands.json` as the source of truth, but:
- That file may be outdated
- Qdrant server is the CANONICAL source
- Changes may violate actual current rules
- Could have introduced violations unknowingly

**The Solution**: 
- Verify MCP access first
- Query Qdrant for current rules
- Audit all changes against canonical rules
- Fix any violations found
- Only then proceed with new work

**The Stakes**:
- Incorrect code = wasted time
- Rule violations = technical debt
- Unverified changes = potential disaster
- User's money and trust on the line

---

## Success Criteria

You have succeeded when:
1. ✅ MCP access confirmed
2. ✅ All Qdrant rules queried and documented
3. ✅ All 6 files audited against canonical rules
4. ✅ All violations (if any) documented
5. ✅ User has approved next steps
6. ✅ You have NOT implemented anything new yet

**Then and ONLY then** can you proceed with implementation.

---

**READ THIS ENTIRE DOCUMENT BEFORE STARTING**
**VERIFY MCP ACCESS BEFORE READING CODE**
**QUERY QDRANT BEFORE MAKING JUDGMENTS**
**STOP AND ACKNOWLEDGE UNDERSTANDING - DO NOT IMPLEMENT**
