## @sitebender/toolkit — Current State (September 2025)

### The Crisis & The Solution

**THE CRISIS:** 15.5% test coverage on the mathematical foundation of the entire ecosystem.
**THE SOLUTION:** Test generator that will achieve 100% coverage automatically.

### Accurate Implementation Status

#### ✅ What Actually Works Well

**Core Mathematics**

- `math/` — 53 functions implemented, most with JSDoc
- All arithmetic, combinatorics, number theory functional
- Quadratic solver, GCD/LCM, factorial, Fibonacci working

**Array Operations**

- `array/` — 123 functions implemented with JSDoc
- All standard operations (map, filter, reduce, etc.)
- Advanced operations (cartesian product, permutations, sliding)
- Most have good JSDoc documentation

**String Manipulation**

- `string/` — 77 functions implemented
- 12 case converters (camel, kebab, pascal, etc.)
- Text processing (slugify, sanitize, template)
- Levenshtein distance, similarity algorithms

**Validation Suite**

- `validation/` — 106 predicates implemented
- Type guards for primitives and Temporal types
- Format validators (email, URL, UUID, credit card)
- Composite validators (allPass, anyPass)

**Monadic Types (BETTER THAN REPORTED)**

- `either/` — 18 functions with EXCELLENT JSDoc
- `maybe/` — 17 functions with good JSDoc
- `result/` — 18 functions (semantic Either wrapper)
- `io/` — 19 functions with JSDoc
- `task/` — 6 functions (basic but working)
- `reader/` — 7 functions implemented
- `state/` — 9 functions implemented
- `writer/` — 1 function (needs work)

#### ⚠️ The Real Problems

**Test Coverage**

- Only 135 of 874 functions have ANY tests
- No systematic testing approach
- No property-based testing infrastructure
- No algebraic law verification

**Monadic Confusion**

- Either/Result/Maybe overlap significantly
- No Future alias for Task (easy fix)
- Missing monad transformers
- Inconsistent type locations (`/types/fp/` vs `/monads/types/fp/`)

**Missing Infrastructure**

- No test generator (YET)
- No compiler for optimizations
- No automatic documentation generation
- No performance benchmarks

### Code Quality Reality Check

**The Good:**

- ✅ One function per file religiously followed
- ✅ Curried, data-last API consistent
- ✅ Most functions have JSDoc (contrary to initial assessment)
- ✅ TypeScript types comprehensive
- ✅ Zero dependencies maintained

**The Bad:**

- ❌ 15.5% test coverage is unacceptable
- ❌ No property-based testing
- ❌ No algebraic law verification
- ❌ Missing performance tests
- ❌ No automated documentation

**The Ugly:**

- Type definitions scattered across multiple locations
- Some JSDoc lacks examples
- No consistent error handling strategy
- Bundle size unmeasured

### Dependency Injection Status

Pattern partially implemented:

```typescript
// Some functions have it:
const querySelector =
	(config = { dom: globalThis.document }) => (selector: string) =>
		config.dom.querySelector(selector)

// Many don't (but should):
const getCurrentTime = () => Date.now() // Should be injectable
```

### The Test Generator Gap

**What We Need:**

```typescript
// Input: Any toolkit function
import map from "libraries/toolkit/src/simple/array/map"

// Output: Complete test suite
- Property tests (functor laws)
- Edge cases (empty, null, single)
- Branch coverage (all paths)
- Performance benchmarks
- Documentation examples
```

**What We Have:**

- Manual tests for 15.5% of functions
- No systematic approach
- No automation

### Immediate State Summary

1. **874 functions exist and mostly work**
2. **Good JSDoc coverage** (better than initially thought)
3. **15.5% test coverage** (catastrophic)
4. **Monads implemented** but need unification
5. **No test generator** (critical missing piece)

### The Path Forward Is Clear

**Week 1-2:** Build test generator
**Week 3:** Run it on all 874 functions
**Result:** 100% coverage with zero manual test writing

The toolkit is a Ferrari engine without a test harness. The test generator IS the test harness.
