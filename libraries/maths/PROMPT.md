# Context for AI Assistant: Maths Library Parser Refactor

## CRITICAL: Read These Files First (IN THIS ORDER)

1. **`/CLAUDE.md`** - The manifesto. This is THE LAW. Every rule must be followed. NO EXCEPTIONS.
2. **`libraries/toolkit/DO_NOTATION_TUTORIAL.md`** - Understand the new do-notation system we're using
3. **`libraries/maths/PLAN.md`** - The detailed plan with checkboxes showing progress
4. **This file** - Current context and next steps

## What is the Maths Library?

The `@sitebender/maths` library is a pure TypeScript formula parser that:
- Takes mathematical expressions as strings (e.g., `"(a + b) * c"`)
- Tokenizes them into tokens
- Parses tokens into an Abstract Syntax Tree (AST)
- Compiles the AST into configuration objects for `@sitebender/engine`

Three-stage pipeline:
1. **Tokenizer** - String → Tokens
2. **Parser** - Tokens → AstNode (AST)
3. **Compiler** - AstNode → Engine configuration

## Current Mission: Parser Refactor to Pure FP

We're transforming the parser from OOP-ish mutable context to pure functional programming using:
- **State monad** from `@sitebender/toolkit`
- **Do-notation** for readable monadic code
- **Immutable data structures** throughout

### Why?
- Current parser uses mutable `createParserContext` with stateful methods
- Violates functional programming principles
- We want 100% pure, immutable, functional code

## What Has Been Done (Check PLAN.md for Details)

### ✅ Phase 1 COMPLETE - Foundation Built:

**Step 1.1 - Types & State:**
- Created `libraries/maths/src/parser/types/state/index.ts` with:
  - `ParserState` type (immutable tokens + position)
  - `Parser<A>` type alias for `State<ParserState, A>`
- Created `libraries/maths/src/parser/state/createInitialState/index.ts`

**Step 1.2 - Token Navigation Functions:**
- ✅ `currentToken/index.ts` - Get current token without advancing
- ✅ `advance/index.ts` - Consume token and move to next
- ✅ `peek/index.ts` - Look ahead without consuming (with offset)
- ✅ `expect/index.ts` - Expect specific token type or error

**Step 1.3 - Parallel Parser Functions:**
- ✅ `parsePrimaryExpressionState/index.ts` - Numbers, variables, parentheses
- ✅ `parseUnaryExpressionState/index.ts` - Recursive unary operators (+/-)
- ✅ `parseBinaryExpressionState/index.ts` - Full precedence climbing algorithm

### ✅ Phase 2 IN PROGRESS - Parser Assembly:

**Step 2.1 - Main Expression Parser Entry Point:**
- ✅ Created `parseExpressionState/index.ts` - Main entry point
- ✅ Routes to conditional parser for top-level expressions
- ✅ 11 tests, all passing

**Step 2.2 - Conditional Expression Parser:**
- ✅ Created `parseConditionalExpressionState/index.ts` 
- ✅ Handles ternary operator (? :) with right-associativity
- ✅ 6 tests, all passing

### ✅ Current Status:
- Pure FP with State monad and do-notation
- Comprehensive unit tests (67 tests total, all passing)
- Scribe documentation with examples
- One function per file structure
- Run alongside existing parser (no breaking changes)

### ✅ Test Command for All State Functions:
```bash
deno test --allow-all --no-config --no-check \
  libraries/maths/src/parser/state/*/index.test.ts
```

## What's Next: Phase 2 - Complete Parser Assembly

According to PLAN.md, we're ready for **Phase 2: Complete Parser Assembly** (Still No Breaking):

> **IMPORTANT**: The individual parser components (primary, unary, binary) were ALREADY implemented in Phase 1.
> They exist, work, and have full test coverage. Phase 2 is about assembling them into a complete parser.

### Step 2.1: Create Main Expression Parser Entry Point
- Create `libraries/maths/src/parser/state/parseExpressionState/index.ts`
- Wire together all existing parser components
- Handle precedence levels correctly
- Pass recursive reference for parenthesized expressions

### Step 2.2: Implement Conditional Expression Parser
- Create `libraries/maths/src/parser/state/parseConditionalExpressionState/index.ts`
- Handle ternary operator (? :) with State monad
- Ensure right-associativity for nested conditionals
- Integrate with main expression parser

### Step 2.3: Create Parser Runner
- Create `libraries/maths/src/parser/state/runStateParser/index.ts`
- Takes tokens array, returns AST using `evalState`
- Handles initial state creation
- Returns proper Result type with errors

### Step 2.4: Test Complete Parser Pipeline
- Test full expressions with all operators
- Verify precedence and associativity
- Test against existing parser for exact parity
- Ensure 100% compatibility with existing test suite

## Key Rules to Remember

### From CLAUDE.md (THE LAW):
- **One function per file** in folders named after the function
- **No classes** - functional only
- **No mutations** - use `const` only, immutable data
- **No acronyms** - `AstNode` not `ASTNode`, `htmlParser` not `HTMLParser`
- **Scribe comments** - `//++` for description, `//??` for examples
- **Test everything** - 100% coverage or documented why not
- **Small commits** - atomic changes with conventional commits

### Naming Conventions:
- Types: PascalCase (`ParserState`, `AstNode`)
- Functions: camelCase (`parseExpression`, `currentToken`)
- NO ACRONYMS: `Api` not `API`, `Url` not `URL`, `Json` not `JSON`

### Current File Structure:
```
libraries/maths/src/parser/
├── types/state/index.ts          # Types for State monad
├── state/                        # ✅ State monad functions (COMPLETE)
│   ├── createInitialState/index.ts
│   ├── currentToken/            # ✅ + tests
│   ├── advance/                 # ✅ + tests  
│   ├── peek/                    # ✅ + tests
│   ├── expect/                  # ✅ + tests
│   ├── parsePrimaryExpressionState/   # ✅ + tests
│   ├── parseUnaryExpressionState/     # ✅ + tests
│   └── parseBinaryExpressionState/    # ✅ + tests
```

## Testing Strategy

- Run existing tests: `deno test libraries/maths/tests/ --allow-all` (79 tests must pass)
- Run new state tests: `deno test --allow-all --no-config --no-check libraries/maths/src/parser/state/*/index.test.ts`
- Keep old parser working while building new one
- Test parity between old and new implementations

## Current Branch

Working on: `ai/maths` (recently pushed)

## Next Actions for Phase 2

1. **Read CLAUDE.md** if you haven't (IT'S THE LAW)
2. **Check PLAN.md** for current progress (Phase 1 complete, Phase 2 ready)
3. **Start Step 2.1** - Create main `parseExpressionState` entry point
4. **Continue Step 2.2** - Implement `parseConditionalExpressionState`
5. **Then Step 2.3** - Create `runStateParser` to execute the parser
6. **Test parity** against existing parser with full expressions
7. **Update PLAN.md** checkboxes as you complete items
8. **Commit frequently** with proper conventional messages

## Available Functions (Already Built)

You have these pure functional State-based building blocks ready:

### Token Navigation:
- `currentToken()` - Get token at position
- `advance()` - Consume and advance
- `peek(offset?)` - Look ahead
- `expect(tokenType)` - Validate and consume

### Expression Parsers:
- `parsePrimaryExpressionState(parseExpr?)` - Base expressions
- `parseUnaryExpressionState(parseExpr?)` - Unary operators
- `parseBinaryExpressionState(parseExpr?)` - Binary with precedence

All use: `doState<ParserState, Result<AstNode, ParseError>>(function* () { ... })`

## Remember

- **DO NOT ASSUME** - Verify everything
- **DO NOT GUESS** - Check the code
- **DO NOT BREAK EXISTING TESTS** - We need backward compatibility
- **DO NOT USE ACRONYMS** - AstNode, not ASTNode
- **DO USE DO-NOTATION** - It's why we built it
- **DO FOLLOW THE MANIFESTO** - CLAUDE.md is law

## Success Metrics

- ✅ Phase 1: Foundation built (7 state functions, 50 tests, all passing)
- 🎯 Phase 2: Complete parser assembly (wire components into full parser)
- 🎯 Phase 3: Integration and feature flag setup
- 🎯 Phase 4: Migration and cleanup
- 🎯 Final: 100% pure functional parser with State monad

The goal: Transform the parser to pure functional programming while maintaining 100% backward compatibility until we flip the switch.

---

**Phase 1 COMPLETE. Ready for Phase 2 - assembling the complete parser from the working components!**