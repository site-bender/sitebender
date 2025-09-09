# Parser Refactor to Pure FP with State Monad

> Transforming the maths parser from OOP-ish context objects to pure functional programming using the State monad and do-notation.

## Phase 1: Foundation (No Breaking Changes)

### Step 1.1: Create New Types File
- [x] Create `libraries/maths/src/parser/types/state/index.ts`
- [x] Define `ParserState` type (tokens + position)
- [x] Define `Parser<A>` as `State<ParserState, A>` 
- [x] Keep existing types intact for now

### Step 1.2: Create State-Based Token Navigation
- [ ] Create `libraries/maths/src/parser/state/currentToken/index.ts`
- [ ] Create `libraries/maths/src/parser/state/advance/index.ts`
- [ ] Create `libraries/maths/src/parser/state/peek/index.ts`
- [ ] Create `libraries/maths/src/parser/state/expect/index.ts`
- [ ] These are NEW files, not replacing existing ones yet

### Step 1.3: Create Parallel Parser Functions
- [ ] Create `libraries/maths/src/parser/state/parsePrimaryExpressionState/index.ts`
- [ ] Create `libraries/maths/src/parser/state/parseUnaryExpressionState/index.ts`
- [ ] Create `libraries/maths/src/parser/state/parseBinaryExpressionState/index.ts`
- [ ] These run ALONGSIDE existing parsers for testing

## Phase 2: Implementation (Still No Breaking)

### Step 2.1: Implement Primary Expression Parser
- [ ] Use `doState` for number, variable, and parenthesized parsing
- [ ] Test against existing parser for parity
- [ ] Add tap debugging points

### Step 2.2: Implement Unary Expression Parser
- [ ] Handle unary + and - with State monad
- [ ] Recursive calls use State composition
- [ ] Verify against existing tests

### Step 2.3: Implement Binary Expression Parser
- [ ] Precedence climbing with State threading
- [ ] No more trampoline needed (State handles it)
- [ ] Test operator precedence thoroughly

### Step 2.4: Implement Conditional Expression Parser
- [ ] Ternary operator with State monad
- [ ] Ensure proper precedence handling

## Phase 3: Integration (Careful Migration)

### Step 3.1: Create State Runner
- [ ] Create `libraries/maths/src/parser/runParser/index.ts`
- [ ] Takes tokens, returns AST using `evalState`
- [ ] Handles initial state creation

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
- [ ] Create `libraries/maths/src/parser/debug/index.ts`
- [ ] Export `debugParser` using `doNotationWithTap`
- [ ] Add environment variable for parser debugging

## Phase 5: Documentation

### Step 5.1: Convert Remaining JSDoc
- [ ] Parser main functions to Scribe
- [ ] Compiler functions to Scribe
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
4. **Document everything** - Scribe comments everywhere
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