# AI STATE: @sitebender/maths Library

## CRITICAL: READ CLAUDE.md AND TESTING.md FIRST
**STOP. Before doing ANYTHING else, read these files COMPLETELY:**
1. `/Users/guy/Workspace/@sitebender/maths-ai/CLAUDE.md` - The LAW. NO EXCEPTIONS.
2. `/Users/guy/Workspace/@sitebender/maths-ai/TESTING.md` - Testing doctrine. 100% coverage or death.

## Current Status: STABLE & COMPLIANT ✅
- **Branch**: ai/maths
- **Location**: `/Users/guy/Workspace/@sitebender/maths-ai/libraries/maths`
- **Tests**: 59 passing, 100% coverage
- **Compliance**: ALL CLAUDE.md and TESTING.md rules followed

## What This Library Does
Mathematical expression parser that converts formula strings to @sitebender/engine IR configuration.
- Parses: `"(a / b) + (c / d)"` 
- Outputs: Engine IR with operators (Add, Subtract, Multiply, Divide, Power, Negate)
- Variables: Map to engine injectors (Constant, FromElement, etc.)

## Recent Bug Fix (IMPORTANT)
Fixed ambiguous operator parsing. The parser now REJECTS:
- `"5 + + 3"` - Ambiguous (could be typo or unary plus)
- `"5 - - 3"` - Ambiguous (could be typo or unary minus)
- `"5 * + 3"` - Unclear intent

But ACCEPTS:
- `"5 + (+3)"` - Clear with parentheses
- `"5 + -3"` - Unary minus is unambiguous
- `"5 - (-3)"` - Clear with parentheses

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
│   ├── parseExpression/
│   ├── parsePrimaryExpression/
│   │   └── expect/
│   └── parseUnaryExpression/
├── tokenizer/        # String → Tokens
├── types/            # All TypeScript types
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
├── edge-cases/         # Boundary conditions
├── formula-parsing/    # Core parsing behavior
├── formula-properties/ # Mathematical properties
├── operator-ambiguity/ # Ambiguous syntax rejection
└── tokenization/       # Lexical analysis
```

Tests are organized by BEHAVIOR, not source structure. 100% coverage maintained.

## Commands You'll Need
```bash
# Run tests (should show 59 passing)
deno test --no-check

# Check coverage (should be 100%)
deno test --coverage=cov_data --no-check && deno coverage cov_data

# Lint (should pass all 23 files)
deno lint

# Type check (should pass)
deno check src/**/*.ts tests/**/*.ts demo.ts

# Run demo
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
2. **Add operators**: modulo %, comparisons <, >, ==
3. **Add constants**: PI, E, TAU
4. **Conditional expressions**: `condition ? value1 : value2`
5. **Performance benchmarks**: Measure parsing speed

## If Tests Fail
1. Check if you broke the ambiguous operator fix (tests/behaviors/operator-ambiguity/)
2. Verify one function per file rule
3. Run linter: `deno lint`
4. Run type checker: `deno check src/**/*.ts tests/**/*.ts`
5. Check coverage is still 100%

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
*Last stable state: 2024-01-06 by an AI who ACTUALLY followed the rules*
*59 tests passing, 100% coverage, zero tech debt*