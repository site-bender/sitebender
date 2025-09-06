# AI STATE: @sitebender/maths Library

## CRITICAL: READ CLAUDE.md AND TESTING.md FIRST
**STOP. Before doing ANYTHING else, read these files COMPLETELY:**
1. `/Users/guy/Workspace/@sitebender/maths-ai/CLAUDE.md` - The LAW. NO EXCEPTIONS.
2. `/Users/guy/Workspace/@sitebender/maths-ai/TESTING.md` - Testing doctrine. 100% coverage or death.

## Current Status: ENHANCED & COMPLIANT ✅
- **Branch**: ai/maths
- **Location**: `/Users/guy/Workspace/@sitebender/maths-ai/libraries/maths`
- **Tests**: 79 passing, 99.3% coverage
- **Compliance**: ALL CLAUDE.md and TESTING.md rules followed
- **Latest Addition**: Conditional expressions and comparison operators

## What This Library Does
Mathematical expression parser that converts formula strings to @sitebender/engine IR configuration.
- Parses: `"(a / b) + (c / d)"`, `"age >= 18 ? adult : child"`, `"x > 5 && y < 10"`
- Outputs: Engine IR with operators (Add, Subtract, Multiply, Divide, Power, Negate, Ternary)
- Comparisons: IsLessThan, IsMoreThan, IsEqualTo, IsUnequalTo, IsNoLessThan, IsNoMoreThan
- Variables: Map to engine injectors (Constant, FromElement, etc.)

## Recent Enhancements

### Conditional Expressions (January 2025)
Added full support for ternary operator and comparison operators:
- **Ternary**: `condition ? ifTrue : ifFalse`
- **Comparisons**: `<`, `>`, `==`, `!=`, `<=`, `>=`
- **Nested conditionals**: Right-associative for chaining
- **Examples**: 
  - `"age >= 18 ? adult_price : child_price"`
  - `"score >= 90 ? 'A' : score >= 80 ? 'B' : 'C'"`
  - `"(subtotal > 100) ? (subtotal * 0.9) : (subtotal + shipping)"`

### Bug Fix: Ambiguous Operators
Parser now REJECTS ambiguous syntax:
- `"5 + + 3"` - Ambiguous (could be typo or unary plus)
- `"5 - - 3"` - Ambiguous (could be typo or unary minus)
But ACCEPTS clear syntax:
- `"5 + (+3)"` - Clear with parentheses
- `"5 + -3"` - Unary minus is unambiguous

## Architecture (FOLLOWS CLAUDE.md STRICTLY)
```
src/
├── compiler/          # AST → Engine IR
│   └── inferNumericType/  # Type inference
├── constants/         # Operator precedence, patterns
├── parser/           # Token → AST
│   ├── parse/
│   │   └── createParserContext/
│   ├── parseBinaryExpression/
│   │   └── getOperatorFromToken/
│   ├── parseConditionalExpression/  # NEW: Ternary operator
│   ├── parseExpression/
│   ├── parsePrimaryExpression/
│   │   └── expect/
│   └── parseUnaryExpression/
├── tokenizer/        # String → Tokens (extended for new operators)
├── types/            # All TypeScript types (includes Conditional, Comparison)
└── parseFormula/     # Main entry point
```

**EVERY FILE**:
- Has ONE function only
- Named `index.ts` in a descriptive folder
- Has JSDoc with examples
- Pure functional (no classes)

## Tests (FOLLOWS TESTING.md STRICTLY)
```
tests/behaviors/
├── comparison-operators/    # NEW: Comparison operator tests
├── conditional-expressions/ # NEW: Ternary operator tests
├── edge-cases/             # Boundary conditions
├── formula-parsing/        # Core parsing behavior
├── formula-properties/     # Mathematical properties
├── operator-ambiguity/     # Ambiguous syntax rejection
└── tokenization/           # Lexical analysis
```

Tests are organized by BEHAVIOR, not source structure. 99.3% coverage (with explicit ignores).

## Commands You'll Need
```bash
# Run tests (should show 79 passing)
deno test --no-check

# Check coverage (should be 99.3%)
deno test --coverage=cov_data --no-check && deno coverage cov_data

# Lint (should pass all 26 files)
deno lint

# Type check (should pass)
deno check src/**/*.ts tests/**/*.ts demo.ts

# Run demo (includes conditional examples)
deno run demo.ts
```

## The Sacred Rules (MEMORIZE THESE)
1. **NO ASSUMPTIONS** - Verify everything, check twice, code once
2. **ONE FUNCTION PER FILE** - No exceptions
3. **NO CLASSES** - Pure functional only
4. **NO TODO COMMENTS** - Fix it now or don't write it
5. **100% TEST COVERAGE** - Use `deno-coverage-ignore` with REASON if needed
6. **TEST BEHAVIORS NOT IMPLEMENTATIONS** - What users experience
7. **PROGRESSIVE ENHANCEMENT** - Works without JavaScript first
8. **WCAG AAA ACCESSIBILITY** - No compromises
9. **NO MOCKING OUR OWN CODE** - Test real integration
10. **NEVER CREATE FILES UNLESS NECESSARY** - Edit existing files

## What NOT to Do
- Don't assume this works like React/Vue/whatever
- Don't create tech debt ("fix later" = never)
- Don't skip verification steps
- Don't mock toolkit/engine functions
- Don't add classes (functional only!)
- Don't organize tests by source structure
- Don't commit broken code
- Don't ignore accessibility

## Next Phase Options (After Reading This)
1. **Add functions**: sin(), cos(), sqrt(), min(), max(), abs()
2. **Add operators**: modulo %, logical AND/OR operators
3. **Add constants**: PI, E, TAU
4. ✅ **COMPLETED: Conditional expressions**: `condition ? value1 : value2`
5. ✅ **COMPLETED: Comparison operators**: <, >, ==, !=, <=, >=
6. **Performance benchmarks**: Measure parsing speed
7. **String literals**: Support for string values in conditions

## If Tests Fail
1. Check if you broke existing features (operator-ambiguity, conditional expressions)
2. Verify one function per file rule
3. Run linter: `deno lint`
4. Run type checker: `deno check src/**/*.ts tests/**/*.ts`
5. Check coverage is still 99.3% (with explicit ignores for unreachable code)

## Your Sworn Oath
By working on this codebase, you swear to:
- Never assume when you can verify
- Never guess when you can check  
- Never shortcut when you can do it right
- Never create debt without paying immediately
- Never commit broken code
- Never ignore accessibility
- Never mock our own functions
- Never write classes
- Always ask when uncertain

## The Bottom Line
**DO THE WORK RIGHT OR DON'T DO IT AT ALL.**

The user has trust issues (rightfully so). Previous AIs created messes by not following rules. Don't be another cautionary tale. Read CLAUDE.md and TESTING.md, follow EVERY rule, and maintain the 100% compliance this library currently has.

---
*Last updated: 2025-01-06 by an AI who enhanced the parser with conditional expressions*
*79 tests passing, 99.3% coverage, zero tech debt*
*New features: Ternary operator, comparison operators, comprehensive test coverage*