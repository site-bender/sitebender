# 🚀 SCRIBE AI - START HERE!

## 📚 MANDATORY READING (IN ORDER)

1. **CLAUDE.md** (root directory) - READ EVERY RULE. NO EXCEPTIONS.
2. **COMMENT_TUTORIAL.md** (this directory) - Our comment syntax with `//++` and `//??`
3. **PARSER_SCRIBE_CONTRACT.md** (this directory) - BINDING integration contract with Parser
4. **libraries/toolkit/DO_NOTATION_TUTORIAL.md** - Do-notation patterns we're adopting

## 🎯 WHAT IS SCRIBE?

**Purpose**: Automatic documentation generator that extracts comprehensive docs from TypeScript code.

**What It Does**:

- Parses TypeScript functions using Parser library output
- Detects function properties (purity, complexity, currying, math laws)
- Extracts comments and descriptions
- Generates beautiful Markdown documentation
- Will eventually generate interactive HTML docs

**For Whom**:

- Developers who want automatic, accurate documentation
- The sitebender ecosystem (documenting toolkit, engine, components)
- Teams who value functional programming and want to document FP properties

**Core Philosophy**: The code IS the documentation. We just extract and format it beautifully.

## ⚖️ PARSER-SCRIBE CONTRACT (MANDATORY COMPLIANCE)

**YOU SIGNED A BINDING CONTRACT!** See `PARSER_SCRIBE_CONTRACT.md`

Key obligations:

1. **Use typescript.Node directly** - No custom wrappers
2. **Consume Either/Result from Parser** - Monadic flow
3. **Use Parser's metadata FIRST** - Only deep-analyze when needed
4. **Use shared traversal utilities** - From toolkit/src/ast/
5. **Meet performance targets** - <100ms for small files

Contract Hash: `c2fbb76eee61455083539e9bcc22c38da65e019c`

**NO CHEATING! The Architect is watching.**

## ✅ WHAT'S ALREADY DONE

### Completed:

1. **AST Detectors Implemented** (without TypeScript imports):
   - `isAssociativeFromAST` - Detects associative operations
   - `isCommutativeFromAST` - Detects commutative operations
   - `isDistributiveFromAST` - Detects distributive operations
   - `isIdempotentFromAST` - Detects idempotent operations
   - `detectPurityFromAST` - Detects pure functions (basic version)
   - `detectCurryingFromAST` - Detects curried functions
   - `detectComplexityFromAST` - Calculates cyclomatic complexity

2. **Fixed generateDocsWithCompiler**:
   - Removed broken imports to deleted detectors
   - Added placeholder values for now
   - Ready for do-notation refactor

3. **Established Integration Contract**:
   - Formal agreement with Parser AI
   - Defined API boundaries
   - Set performance requirements

### Current Problems:

1. **Mutations everywhere** - For loops, mutable counters, etc.
2. **No monadic flow** - Nested callbacks and imperative code
3. **Redundant traversals** - We traverse what Parser already traversed
4. **No do-notation yet** - Waiting for toolkit support (NOW AVAILABLE!)

## 🗺️ THE PLAN

### Phase 1: Do-Notation Integration (THIS WEEK)

1. Import do-notation from toolkit
2. Convert AST traversals to use State monad
3. Convert property detectors to monadic flow
4. Eliminate ALL mutations

### Phase 2: Parser Integration (NEXT WEEK)

1. Update to consume Either from Parser
2. Use Parser's pre-computed metadata
3. Implement fast-path optimizations
4. Use shared traversal utilities

### Phase 3: Enhanced Detection (WEEK 3)

1. Improve purity detection with metadata
2. Add mathematical law detection
3. Implement property-based test generation hints
4. Add example extraction from tests

### Phase 4: Output Generation (WEEK 4)

1. Enhance Markdown generation
2. Add HTML output with interactive features
3. Generate JSON for tooling integration
4. Add search and indexing

## 🎬 WHAT TO DO NEXT

### IMMEDIATE TASK: Convert to Do-Notation

1. **Start with `extractDescription`** - It has a for loop with mutation!
   ```typescript
   // Current: Mutable for loop
   // Convert to: State monad with do-notation
   import { doState } from "@sitebender/toolkit/monads/doState"
   ```

2. **Then fix `calculateCyclomaticComplexity`**:
   - Remove `{ value: 0 }` mutation pattern
   - Use State monad for accumulation
   - Make traversal pure

3. **Update all math property detectors**:
   - Convert to use State for traversal
   - Remove all mutations
   - Use toolkit functions consistently

4. **Finally, update `generateDocsWithCompiler`**:
   - Use doEither for error handling
   - Chain all operations monadically
   - Remove all nested callbacks

### Commands to Run:

```bash
# Test your changes
deno check libraries/scribe/src/generateDocsWithCompiler/index.ts

# Lint your code
deno lint libraries/scribe/src/

# Format your code  
deno fmt libraries/scribe/

# Commit when ready
git add -A && git commit -m "refactor: convert to do-notation"
```

## 🚨 CRITICAL RULES REMINDER

1. **ONE function per file** - Check EVERY file you create
2. **NO TypeScript imports in detectors** - Use the AstNode type we defined
3. **NO native array methods** - Use toolkit functions
4. **NO let/var** - Only const
5. **NO mutations** - Pure functions only
6. **NO classes** - Functions and types only
7. **Follow the folder structure** - helpers in subdirectories
8. **Use proper naming** - AstNode not ASTNode

## 📊 SUCCESS METRICS

You're successful when:

- ✅ Zero mutations in the codebase
- ✅ All operations use do-notation
- ✅ Parser integration working with Either
- ✅ Using Parser's metadata for optimization
- ✅ Performance targets met (<100ms for small files)
- ✅ All tests passing
- ✅ The Architect approves

## 💭 MENTAL MODEL

Think of Scribe as a **pure functional pipeline**:

```
TypeScript Code 
  → Parser (returns Either with metadata)
  → Property Detection (State monad with do-notation)
  → Documentation Generation (pure transformation)
  → Output (Markdown/HTML/JSON)
```

Every step is:

- **Pure** - No side effects
- **Composable** - Small functions compose into large ones
- **Testable** - Deterministic input → output
- **Readable** - Do-notation makes it clear

## 🎯 YOUR MISSION

Transform Scribe from "that documentation generator with mutations" into **"the gold standard of functional TypeScript"** that showcases:

- Pure functional programming
- Monadic composition with do-notation
- Zero mutations
- Beautiful, maintainable code

**START NOW: Open `extractDescription` and eliminate that for loop!**

---

_Remember: You're not just writing code. You're creating the reference implementation that shows the world how functional TypeScript should be done._

_The Architect is watching. Make it perfect._
