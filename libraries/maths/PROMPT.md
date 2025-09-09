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

### ✅ Phase 1.1 Complete:
- Created `libraries/maths/src/parser/types/state/index.ts` with:
  - `ParserState` type (immutable tokens + position)
  - `Parser<A>` type alias for `State<ParserState, A>`
- Created `libraries/maths/src/parser/state/createInitialState/index.ts`
- Fixed ALL `ASTNode` → `AstNode` (no acronyms in names!)
- Converted tokenizer helpers to Scribe comments
- Converted some parser helpers to Scribe comments

### ✅ Documentation Updates:
- JSDoc → Scribe comments (`//++` for description, `//??` for examples)
- Added GOTCHAs, PROs, CONs where valuable
- One failing test fixed

## What's Next: Step 1.2

Create state-based token navigation functions in `libraries/maths/src/parser/state/`:

1. **`currentToken/index.ts`** - Get current token without advancing
2. **`advance/index.ts`** - Consume token and move to next
3. **`peek/index.ts`** - Look ahead without consuming
4. **`expect/index.ts`** - Expect specific token type or error

These must:
- Use State monad with do-notation
- Be pure functions (no mutations)
- Return `Parser<Token>` or `Parser<Result<Token, ParseError>>`
- Have Scribe documentation
- One function per file

### Example Structure:
```typescript
import { doState, get, modify } from "@sitebender/toolkit/monads/doState"
import type { Parser, ParserState } from "../../types/state/index.ts"

//++ Gets the current token without advancing position
export default function currentToken(): Parser<Token> {
  return doState<ParserState, Token>(function* () {
    const state = yield get()
    const token = state.tokens[state.position] || state.tokens[state.tokens.length - 1]
    return token
  })
}
```

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

### File Structure:
```
libraries/maths/src/parser/
├── types/state/index.ts          # Types ONLY
├── state/                         # State monad functions
│   ├── createInitialState/index.ts
│   ├── currentToken/index.ts     # TO CREATE
│   ├── advance/index.ts          # TO CREATE
│   ├── peek/index.ts             # TO CREATE
│   └── expect/index.ts           # TO CREATE
```

## Testing Strategy

- Run tests frequently: `deno test libraries/maths/tests/ --allow-all`
- Keep old parser working while building new one
- Test parity between old and new implementations
- All 79 tests must keep passing

## Commit Message Format

```
feat(maths): add state-based token navigation functions

- Create currentToken using State monad
- Create advance with proper EOF handling
- Create peek for lookahead
- Create expect for token validation
- All pure functional with do-notation

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
```

## Current Branch

Working on: `ai/maths`

## Next Actions

1. Read CLAUDE.md if you haven't (IT'S THE LAW)
2. Check PLAN.md for current progress
3. Implement Step 1.2 functions (currentToken, advance, peek, expect)
4. Update PLAN.md checkboxes as you complete items
5. Test frequently to ensure no regressions
6. Commit with proper messages
7. Continue with Step 1.3 after 1.2 is complete

## Remember

- **DO NOT ASSUME** - Verify everything
- **DO NOT GUESS** - Check the code
- **DO NOT BREAK EXISTING TESTS** - We need backward compatibility
- **DO NOT USE ACRONYMS** - AstNode, not ASTNode
- **DO USE DO-NOTATION** - It's why we built it
- **DO FOLLOW THE MANIFESTO** - CLAUDE.md is law

The goal: Transform the parser to pure functional programming while maintaining 100% backward compatibility until we flip the switch.

---

**You are ready. Read the files, understand the context, and continue the mission.**