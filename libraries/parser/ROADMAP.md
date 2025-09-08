# Parser Implementation Roadmap

## Current Reality Check

The parser library is ~20% complete. It has basic functionality but:

- Zero integration with other libraries
- Minimal test coverage
- Missing critical features needed by prover/scribe
- Multiple violations of @sitebender coding standards

## Why This Library Matters

Without parser:

- Prover and Scribe duplicate 95% of TypeScript parsing code
- Each library interprets types differently
- Bug fixes must be done in multiple places
- No single source of truth for code understanding

## The Right Approach

### Step 1: Fix What Exists (1-2 days)

Fix coding standard violations in existing code:

1. **Replace JavaScript methods with toolkit functions**
   - `Array.from()` → `from` from toolkit
   - `.includes()` → `includes` from toolkit
   - `.some()` → `some` from toolkit
   - Direct `Map` mutations → functional approach

2. **Extract nested functions to separate files**
   - `detectCurrying/visit/` helper
   - `detectPurity/visit/` helper
   - Follow one-function-per-file rule

3. **Fix purity detection**
   - Currently only catches trivial cases
   - Need proper scope analysis
   - Track parameter mutations
   - Detect closure captures

### Step 2: Build Missing Core (3-4 days)

Implement the critical missing pieces:

1. **`analyzeBranches/`** - CRITICAL for prover
   ```
   analyzeBranches/
   ├── index.ts           # Main branch analyzer
   ├── extractIf/         # If/else branches
   ├── extractTernary/    # Conditional expressions
   ├── extractSwitch/     # Switch cases
   ├── extractLogical/    # && || ??
   └── extractTry/        # Try/catch/finally
   ```

2. **`extractTypes/`** - CRITICAL for prover
   ```
   extractTypes/
   ├── index.ts           # Deep type extraction
   ├── extractPrimitive/  # string, number, boolean
   ├── extractArray/      # Array<T> and T[]
   ├── extractObject/     # Object types
   ├── extractUnion/      # A | B
   ├── extractIntersection/ # A & B
   └── extractLiteral/    # "foo", 42, true
   ```

3. **`extractImports/`** - Needed for dependency tracking
   ```
   extractImports/
   ├── index.ts           # Import extraction
   ├── extractTypeImports/# import type { ... }
   ├── extractValueImports/# import { ... }
   └── resolveRelative/   # Resolve relative paths
   ```

### Step 3: Write Real Tests (2-3 days)

Test EVERYTHING with property-based testing:

1. **Parser tests**
   - Valid TypeScript files parse successfully
   - Invalid files return proper errors
   - All TypeScript features supported

2. **Function extraction tests**
   - Finds all functions (named, default, arrow)
   - Handles nested functions
   - Marks export status correctly

3. **Signature extraction tests**
   - All parameter types extracted
   - Generic constraints preserved
   - Return types accurate

4. **Branch analysis tests**
   - All branch types detected
   - Nested branches handled
   - Coverage calculation correct

5. **Type extraction tests**
   - Complex types decomposed correctly
   - Unions/intersections preserved
   - Literal types extracted

### Step 4: Integration (2-3 days)

Actually connect parser to other libraries:

1. **Prover integration**
   - Replace prover's `parseSignature/` with parser
   - Use parser's branch analysis
   - Use parser's type extraction

2. **Scribe integration**
   - Replace scribe's `parseWithCompiler/` with parser
   - Use parser's comment extraction
   - Use parser's signature formatting

3. **Migration testing**
   - Run prover's tests using parser
   - Run scribe's tests using parser
   - Ensure no regressions

### Step 5: Documentation Update (1 day)

1. Update all docs to reflect actual state
2. Remove aspirational claims
3. Add migration guides for prover/scribe
4. Document all functions with examples

## Success Metrics

Parser is "done" when:

1. **100% test coverage** (with explicit ignores for unreachable)
2. **Zero code duplication** between prover/scribe/parser
3. **All functions documented** with examples
4. **Zero toolkit violations** - proper FP everywhere
5. **Both prover and scribe** using parser successfully

## What NOT to Do

1. **Don't over-engineer** - Build what's needed NOW
2. **Don't add features** nobody asked for
3. **Don't optimize** before it works
4. **Don't write documentation** for unbuilt features
5. **Don't claim success** until integration works

## Time Estimate

- Fix existing code: 1-2 days
- Build missing core: 3-4 days
- Write tests: 2-3 days
- Integration: 2-3 days
- Documentation: 1 day

**Total: 9-13 days of focused work**

## The Hard Truth

This library was oversold and underdelivered. The previous implementation:

- Created documentation for non-existent features
- Didn't integrate with anything
- Has almost no tests
- Violates multiple coding standards

We need to:

1. Be honest about current state
2. Fix what exists before adding more
3. Test everything thoroughly
4. Actually integrate with other libraries
5. Update docs to reflect reality

Only then can parser fulfill its promise of being the "single source of truth" for TypeScript parsing in the @sitebender ecosystem.
