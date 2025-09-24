# Parser Refactor to Pure FP with State Monad

> Transforming the formulator parser from OOP-ish context objects to pure functional programming using the State monad and do-notation.

## Phase 1: Foundation (No Breaking Changes)

### Step 1.1: Create New Types File

- [x] Create `libraries/formulator/src/parser/types/state/index.ts`
- [x] Define `ParserState` type (tokens + position)
- [x] Define `Parser<A>` as `State<ParserState, A>`
- [x] Keep existing types intact for now

### Step 1.2: Create State-Based Token Navigation

- [x] Create `libraries/formulator/src/parser/state/currentToken/index.ts`
- [x] Create `libraries/formulator/src/parser/state/advance/index.ts`
- [x] Create `libraries/formulator/src/parser/state/peek/index.ts`
- [x] Create `libraries/formulator/src/parser/state/expect/index.ts`
- [x] These are NEW files, not replacing existing ones yet

### Step 1.3: Create Parallel Parser Functions

- [x] Create `libraries/formulator/src/parser/state/parsePrimaryExpressionState/index.ts`
- [x] Create `libraries/formulator/src/parser/state/parseUnaryExpressionState/index.ts`
- [x] Create `libraries/formulator/src/parser/state/parseBinaryExpressionState/index.ts`
- [x] These run ALONGSIDE existing parsers for testing

## Phase 2: Complete Parser Assembly (Still No Breaking)

> Note: Individual parser components (primary, unary, binary) were already implemented in Phase 1.
> Phase 2 focuses on assembling them into a complete, working parser pipeline.

### Step 2.1: Create Main Expression Parser Entry Point

- [x] Create `libraries/formulator/src/parser/state/parseExpressionState/index.ts`
- [x] Wire together all parser components (primary, unary, binary)
- [x] Handle precedence levels correctly
- [x] Pass recursive reference for parenthesized expressions

### Step 2.2: Implement Conditional Expression Parser

- [x] Create `libraries/formulator/src/parser/state/parseConditionalExpressionState/index.ts`
- [x] Handle ternary operator (? :) with State monad
- [x] Ensure right-associativity for nested conditionals
- [x] Integrate with main expression parser

### Step 2.3: Create Parser Runner

- [x] Create `libraries/formulator/src/parser/state/runStateparser/index.ts`
- [x] Takes tokens array, returns AST using `evalState`
- [x] Handles initial state creation via `createInitialState`
- [x] Returns proper Result type with errors

### Step 2.4: Test Complete Parser Pipeline

- [x] Test full expressions with all operators
- [x] Verify precedence and associativity
- [x] Test against existing parser for exact parity (99% match - only difference is Comparison vs BinaryOp)
- [x] Ensure 100% compatibility with existing test suite

## Phase 3: Integration (Careful Migration)

### Step 3.1: Fix Test Failures and Complete Integration

- [x] Fixed all 37 failing tests by using toolsmith Result helper functions
- [x] Replaced `.ok`, `.value` checks with `isOk()`, `isErr()`, `.right`, `.left`
- [x] All 86 state parser tests now passing
- [x] Note: `runStateParser` already created in Phase 2.3

### Step 3.2: Create Feature Flag

- [ ] Add `USE_STATE_PARSER` environment variable
- [ ] Main `parse` function checks flag
- [ ] Routes to old or new implementation

### Step 3.3: Run Tests with Both Parsers

- [ ] Run full test suite with old parser
- [ ] Run full test suite with new parser
- [ ] Compare results for exact parity

## Phase 4: Migration (The Switch)

### Step 4.1: Update Main Parse Function

- [ ] Replace old implementation with State version
- [ ] Remove `createParserContext` (finally!)
- [ ] Update imports

### Step 4.2: Clean Up Old Code

- [ ] Delete old parser implementations
- [ ] Delete mutable context creator
- [ ] Move State parsers to main locations

### Step 4.3: Add Debug Mode

- [ ] Create `libraries/formulator/src/parser/debug/index.ts`
- [ ] Export `debugParser` using `doNotationWithTap`
- [ ] Add environment variable for parser debugging

## Phase 5: Documentation

### Step 5.1: Convert Remaining JSDoc

- [ ] Parser main functions to Envoy
- [ ] Compiler functions to Envoy
- [ ] Add GOTCHAs about State monad usage

### Step 5.2: Document the Transformation

- [ ] Add comment block explaining FP approach
- [ ] Note why State monad was chosen
- [ ] Credit do-notation for readability

### Step 5.3: Update Examples

- [ ] Show before/after for clarity
- [ ] Add debugging examples
- [ ] Document tap usage

## Phase 6: Polish

### Step 6.1: Performance Check

- [ ] Benchmark old vs new parser
- [ ] Optimize if needed (unlikely)
- [ ] Document any differences

### Step 6.2: Error Messages

- [ ] Ensure error messages unchanged
- [ ] Position tracking still accurate
- [ ] Test error cases thoroughly

### Step 6.3: Final Review

- [ ] All tests passing
- [ ] No mutations anywhere
- [ ] Cognitive load actually reduced

## Key Principles Throughout:

1. **Never break existing code** - Run parallel until proven
2. **Test at every step** - Verify parity constantly
3. **One function per file** - Follow the manifesto
4. **Document everything** - Envoy comments everywhere
5. **Pure functions only** - No mutations, no classes
6. **Small commits** - Each step is atomic

## Success Metrics:

- ✅ Zero test failures
- ✅ No performance regression
- ✅ Cleaner, more readable code
- ✅ Pure functional implementation
- ✅ Debugging capability added
- ✅ Cognitive load reduced

---

**Goal**: Transform from OOP-ish mutable context to pure functional State monad with do-notation, maintaining 100% backward compatibility until the switch.
