# Context for AI Assistant: Formulator Library Parser Refactor

## CRITICAL: Read These Files First (IN THIS ORDER)

1. **`/CLAUDE.md`** - The manifesto. This is THE LAW. Every rule must be followed. NO EXCEPTIONS.
2. **`libraries/toolsmith/DO_NOTATION_TUTORIAL.md`** - Understand the new do-notation system we're using
3. **`libraries/formulator/PLAN.md`** - The detailed plan with checkboxes showing progress
4. **This file** - Current context and next steps

## What is the Formulator Library?

The `@sitebender/formulator` library is a pure TypeScript formula parser that:

- Takes mathematical expressions as strings (e.g., `"(a + b) * c"`)
- Tokenizes them into tokens
- Parses tokens into an Abstract Syntax Tree (AST)
- Compiles the AST into configuration objects for `@sitebender/architect`

Three-stage pipeline:

1. **Tokenizer** - String → Tokens
2. **Parser** - Tokens → AstNode (AST)
3. **Compiler** - AstNode → Architect configuration

## Current Mission: Parser Refactor to Pure FP

We're transforming the parser from OOP-ish mutable context to pure functional programming using:

- **State monad** from `@sitebender/toolsmith`
- **Do-notation** for readable monadic code
- **Immutable data structures** throughout
- **Toolsmith Result monad** - NOT homemade Result types

### Why?

- Current parser uses mutable `createParserContext` with stateful methods
- Violates functional programming principles
- We want 100% pure, immutable, functional code

## What Has Been Done

### ✅ Phase 1 COMPLETE - Foundation Built

All token navigation and parser component functions created with State monad.

### ✅ Phase 2 COMPLETE - Parser Assembly

- ✅ Step 2.1: Created main `parseExpressionState` entry point
- ✅ Step 2.2: Created `parseConditionalExpressionState` for ternary operators
- ✅ Step 2.3: Created `runStateParser` to execute the complete parser
- ✅ Step 2.4: Tested complete pipeline with 99% parity (only difference: BinaryOp vs Comparison)

### ✅ Major Refactoring Completed

**Test Framework Migration:**

- ✅ Converted ALL state parser tests from `describe`/`it` to `Deno.test`
- ✅ Created missing test for `createInitialState` (100% coverage requirement)
- ✅ 86 tests total in state parser (all using Deno.test)

**Result Type Migration:**

- ✅ Replaced formulator library's homemade Result with toolsmith Result
- ✅ All parser functions now use `ok()` and `err()` from toolsmith
- ✅ Updated Result type to use toolsmith's Either-based Result
- ✅ Fixed ALL tests to work with toolsmith Result structure:
  - Success: `{ _tag: "Right", right: value }`
  - Error: `{ _tag: "Left", left: error }`

**Current Test Status:**

- ✅ ALL 86 tests passing with toolsmith Result structure
- ✅ All Result checks using toolsmith helper functions (isOk, isErr)
- ✅ 100% test pass rate achieved

## What's Next: Phase 3 - Integration

### ✅ Step 3.1: Fix Remaining Test Failures - COMPLETE

- ✅ Fixed all 37 failing tests
- ✅ Issue was incorrect Result checks (using `.ok`, `.value` instead of toolsmith helpers)
- ✅ Now using `isOk()`, `isErr()`, and `.right`/`.left` fields properly
- ✅ 100% test pass rate achieved

### Step 3.2: Create Feature Flag

- Add `USE_STATE_PARSER` environment variable
- Main `parse` function checks flag
- Routes to old or new implementation

### Step 3.3: Run Tests with Both Parsers

- Run full test suite with old parser
- Run full test suite with new parser
- Compare results for exact parity

## Key Rules to Remember

### From CLAUDE.md (THE LAW):

- **NEVER REVERT ANYTHING** - Move forward only, no backwards compatibility hacks
- **One function per file** in folders named after the function
- **No classes** - functional only
- **No mutations** - use `const` only, immutable data
- **No acronyms** - `AstNode` not `ASTNode`
- **Use Deno.test** - NOT describe/it
- **Use toolsmith functions** - NOT homemade implementations
- **100% test coverage** - No exceptions

### Toolsmith Result Structure:

```typescript
// Success
{ _tag: "Right", right: value }

// Error  
{ _tag: "Left", left: error }

// NOT the old { ok: true, value } or { ok: false, error }
```

### Current File Structure:

```
libraries/formulator/src/parser/
├── types/state/index.ts          # Types for State monad
├── state/                        # ✅ State monad functions
│   ├── createInitialState/      # ✅ + tests
│   ├── currentToken/             # ✅ + tests
│   ├── advance/                  # ✅ + tests  
│   ├── peek/                     # ✅ + tests
│   ├── expect/                   # ✅ + tests
│   ├── parsePrimaryExpressionState/   # ✅ + tests
│   ├── parseUnaryExpressionState/     # ✅ + tests
│   ├── parseBinaryExpressionState/    # ✅ + tests
│   ├── parseConditionalExpressionState/ # ✅ + tests
│   ├── parseExpressionState/    # ✅ + tests
│   └── runStateparser/           # ✅ + tests
```

## Testing Commands

```bash
# Run all state parser tests
deno test --allow-all --no-config --no-check libraries/formulator/src/parser/state/*/index.test.ts

# Run existing formulator tests
deno test --allow-all libraries/formulator/tests/

# Check test coverage
deno test --coverage --allow-all libraries/formulator/src/parser/state/
```

## ✅ Issues Fixed

1. **✅ 37 failing tests** - Fixed by using toolsmith Result helper functions
2. **✅ Error handling** - All error cases now properly handled with isErr()
3. **✅ Parenthesis parsing** - Missing closing parenthesis detection working correctly

## Remaining TODOs

- [x] ✅ Fix ALL tests to use proper FP patterns (use isOk, fold, etc. NOT checking _tag directly)
- [x] ✅ Audit ALL state parser code for rule violations
- [ ] Complete Phase 3 Step 2: Integration with feature flag
- [ ] Complete Phase 3 Step 3: Run tests with both parsers
- [ ] Complete Phase 4: Migration and cleanup
- [ ] Complete Phase 5: Documentation
- [ ] Complete Phase 6: Polish and performance

## Critical Reminders

- **NEVER REVERT** - If something breaks, fix it forward
- **NEVER USE DESCRIBE/IT** - Always use Deno.test
- **NEVER CREATE HOMEMADE VERSIONS** - Use toolsmith functions
- **NEVER USE KEBAB-CASE FOR FOLDERS** - Use camelCase
- **NEVER PUT MULTIPLE FUNCTIONS IN ONE FILE** - One function per file
- **ALWAYS USE TOOLSMITH RESULT** - With _tag, left, and right fields
- **ALWAYS TEST EVERYTHING** - 100% coverage or documented reason
- **NEVER REACH INSIDE MONADS** - DO NOT check `._tag`, `.left`, `.right` directly!
- **ALWAYS USE TOOLSMITH HELPER FUNCTIONS** - Use `isOk()`, `isErr()`, `fold()`, `map()`, `flatMap()`, etc.
- **NEVER USE OOP METHODS** - NO `.ok`, `.value`, `.error` - these don't exist!

## Success Metrics

- ✅ Phase 1: Foundation built (10 state functions with tests)
- ✅ Phase 2: Complete parser assembly (runStateParser working)
- 🎯 Phase 3: Integration with feature flag
- 🎯 Phase 4: Migration and cleanup
- 🎯 Final: 100% pure functional parser with State monad

The goal: Transform the parser to pure functional programming while maintaining 100% backward compatibility until we flip the switch.

---

**Current Status: Phase 3 Step 1 COMPLETE. All 86 tests passing. Result checks fixed using toolsmith helper functions. Ready for Phase 3 Step 2 - Feature flag integration.**
