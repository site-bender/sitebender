# Context for Next Session: Formulator Library

> **CRITICAL**: Read this document completely before taking any action. This contains essential context about what has been implemented and the strict rules that MUST be followed.

## Current Status: Phase 4 Complete ✅

**Formulator is COMPLETE and WORKING.** All 4 phases implemented:

1. ✅ **Lexer** - Character classification (56 tests passing)
2. ✅ **Tokenizer** - Token recognition (42 tests passing)
3. ✅ **Parser** - AST construction with infix notation (22 tests passing)
4. ✅ **Compiler** - Enriched AST + metadata (17 tests passing)

**Total: 137 tests passing, lint clean, type check clean**

## CRITICAL RULES (NEVER VIOLATE THESE)

### Rule 1: USE TOOLSMITH FUNCTIONS (NOT RAW OPERATORS)

**NEVER use raw operators. ALWAYS use Toolsmith functions.**

```typescript
// ❌ WRONG:
if (position < tokens.length)
if (x >= y)
const next = position + 1

// ✅ CORRECT:
import lt from "@sitebender/toolsmith/vanilla/validation/lt/index.ts"
import gte from "@sitebender/toolsmith/vanilla/validation/gte/index.ts"
import increment from "@sitebender/toolsmith/vanilla/math/increment/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"

if (lt(length(tokens))(position))
if (gte(y)(x))
const next = increment(position)
```

**Common Toolsmith functions:**
- `lt(b)(a)` - less than (a < b)
- `lte(b)(a)` - less than or equal
- `gt(b)(a)` - greater than (a > b)
- `gte(b)(a)` - greater than or equal
- `isEqual(b)(a)` - equality check
- `increment(n)` - add 1
- `decrement(n)` - subtract 1
- `length(array)` - array length

### Rule 2: POSITIVE-FIRST LOGIC (NO NEGATIVE CONDITIONALS)

**ALWAYS check positive conditions first, errors after.**

```typescript
// ❌ WRONG:
if (tokenResult._tag !== "Ok") {
  return tokenResult
}
const token = tokenResult.value

// ✅ CORRECT:
if (tokenResult._tag === "Error") {
  return tokenResult
}
const token = tokenResult.value

// ❌ WRONG:
if (!isValid(x)) return error("invalid")

// ✅ CORRECT:
if (isValid(x)) {
  // handle valid case
}
return error("invalid")
```

### Rule 3: NO ABBREVIATIONS IN FUNCTION NAMES

```typescript
// ❌ WRONG:
checkTwoCharOp
parseExpr
getPos

// ✅ CORRECT:
checkTwoCharacterOperator
parseExpression
getPosition
```

### Rule 4: ALWAYS RETURN RESULT MONAD (NEVER undefined/null/throw)

```typescript
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

// ❌ WRONG:
function parse(input: string): AstNode | undefined {
  if (!input) return undefined
  throw new Error("Invalid")
}

// ✅ CORRECT:
function parse(input: string): Result<string, AstNode> {
  if (isValid(input)) {
    return ok(astNode)
  }
  return error("Invalid input")
}
```

### Rule 5: PROPERTY NAMING CONVENTIONS

- Use `_tag` (with underscore) for discriminated union tags
- Use `character` not `char`
- Use `characterClass` not `charClass`
- NO abbreviations anywhere

```typescript
// ✅ CORRECT:
type Token = {
  _tag: "token"
  character: string
  characterClass: CharacterClass
}
```

### Rule 6: ALL FUNCTIONS ARE CURRIED (DATA-LAST)

```typescript
// ❌ WRONG:
function parseNumber(input: string, position: number): Result

// ✅ CORRECT:
function parseNumber(input: string) {
  return function parseNumberAtPosition(position: number): Result {
    // implementation
  }
}

// Usage:
const parser = parseNumber(input)
const result = parser(position)
```

### Rule 7: NAMING CONVENTIONS - NO CAPITALIZED INITIALISMS

```typescript
// ❌ WRONG:
ASTNode
JSONData
XMLParser

// ✅ CORRECT:
AstNode  // converts to ast-node in kebab-case
JsonData // converts to json-data
XmlParser // converts to xml-parser
```

**Rationale**: Capitalized initialisms don't convert well to kebab-case file names.

## Key Architecture Decisions

### 1. Infix Parser Only (For Now)

Current implementation supports **infix notation only**: `a + b`, `(2 + 3) * 4`

**Future Phase 5** (planned but not implemented):
- Prefix (Polish): `+ a b`, `* + 2 3 4`
- Postfix (RPN): `a b +`, `2 3 + 4 *`
- Auto-detection based on first/last token

### 2. No Operator Flattening

**CRITICAL**: Do NOT flatten associative operators!

```typescript
// Input: "2 + 3 + 4"
// ✅ CORRECT AST (binary tree):
{
  _tag: "binaryOperator",
  operator: "add",
  left: {
    _tag: "binaryOperator",
    operator: "add",
    left: { _tag: "numberLiteral", value: 2 },
    right: { _tag: "numberLiteral", value: 3 }
  },
  right: { _tag: "numberLiteral", value: 4 }
}

// ❌ WRONG (flattened):
{
  _tag: "nAryOperator",
  operator: "add",
  operands: [2, 3, 4]  // NO! This breaks reversibility
}
```

**Reason**: Must preserve exact tree structure for:
- Reversibility (AST → Formula → AST round-trip)
- MathML generation
- Architect handles optimization later

### 3. Constants as Variables (No Substitution)

Mathematical constants (π, e, τ, φ) are preserved as variables in the AST.

```typescript
// Input: "sin(π / 2)"
// ✅ AST keeps π as variable:
{
  _tag: "functionCall",
  name: "sin",
  arguments: [
    {
      _tag: "binaryOperator",
      operator: "divide",
      left: { _tag: "variable", name: "π" },  // NOT 3.14159...
      right: { _tag: "numberLiteral", value: 2 }
    }
  ]
}
```

**Metadata tracks it separately:**
```typescript
{
  variables: Map { },  // π is NOT a variable
  constants: Map {
    "π" => { name: "π", value: Math.PI, datatype: "Number" }
  }
}
```

**Reason**: Architect handles substitution and constant folding (separation of concerns).

### 4. Semantic Operator Names

Parser tokens use symbols, compiler maps to semantic names:

| Token      | Compiler Operator Name |
|-----------|----------------------|
| `plus`    | `add`               |
| `minus`   | `subtract`          |
| `multiply`| `multiply`          |
| `divide`  | `divide`            |
| `power`   | `power`             |

### 5. Uniform Binary Operator Structure

All binary operators use `left` and `right` fields:

```typescript
type EnrichedBinaryOperatorNode = {
  _tag: "binaryOperator"
  operator: BinaryOperation  // "add" | "subtract" | "multiply" | "divide" | "power"
  left: EnrichedAstNode      // UNIFORM field name
  right: EnrichedAstNode     // UNIFORM field name
  position: number
  datatype: Datatype
}
```

**Semantic accessors** (augend/addend, minuend/subtrahend, etc.) will be implemented **in Architect**, not Formulator. See "Semantic Accessors for Architect" section in `docs/plan.md`.

## File Structure

```
libraries/formulator/
├── src/
│   ├── lexer/                    # Phase 1: Character classification
│   │   ├── index.ts             # Generator: yields LexerToken
│   │   ├── classifyCharacter/   # O(1) character code map lookup
│   │   ├── checkTwoCharacterOperator/
│   │   └── types/
│   ├── tokenizer/                # Phase 2: Token recognition
│   │   ├── index.ts             # Generator: yields Result<Token>
│   │   ├── parseNumber/
│   │   ├── parseIdentifier/
│   │   ├── parseOperator/
│   │   ├── parsePunctuation/
│   │   └── types/
│   ├── parser/                   # Phase 3: AST construction
│   │   ├── index.ts             # Main entry: parser(formula)
│   │   ├── parseExpression/     # Pratt parser with precedence
│   │   ├── parsePrimary/
│   │   ├── parseUnaryOperator/
│   │   ├── parseFunctionCall/
│   │   └── types/
│   └── compiler/                 # Phase 4: Enriched AST
│       ├── index.ts             # Main entry: compiler(formula)
│       ├── enrichAst/           # Add datatype annotations
│       ├── collectMetadata/     # Extract variables/constants/functions
│       ├── constants/           # Operator mappings, math constants
│       └── types/
├── demo/                         # Demo test cases
├── test-lexer.ts                # Demo: lexer output
├── test-tokenizer.ts            # Demo: tokenizer output
├── test-parser.ts               # Demo: parser output
├── test-compiler.ts             # Demo: compiler output
├── test-all-phases.ts           # Demo: all phases with tables
└── docs/
    ├── plan.md                  # Complete architecture plan
    └── context-for-next-session.md  # THIS FILE
```

## Important Implementation Details

### Generators for Lazy Evaluation

Lexer and tokenizer use **generators** (TypeScript's lazy lists):

```typescript
export function* lexer(input: string): Generator<LexerToken> {
  let position = 0

  /*++ [EXCEPTION]
   | While loop inside generator is permitted for performance.
   | Generators ARE the Haskell lazy list equivalent.
   | This remains pure: same input always yields same sequence.
   */
  while (position < input.length) {
    // ...
    yield token
    position = increment(position)
  }
}
```

**IMPORTANT**: While loops are ONLY allowed inside generators with the `[EXCEPTION]` Envoy comment explaining the rationale.

### Parser Uses Pratt Parsing

The infix parser uses **operator precedence climbing** (Pratt parser):

```typescript
// Precedence levels:
const PRECEDENCE = {
  plus: 1,
  minus: 1,
  multiply: 2,
  divide: 2,
  power: 3,  // right-associative
}
```

### Unary Operator Handling

**Prefix unary**: `-x` (negation)
**Postfix unary**: `x!` (factorial)

**Important spacing rule**:
- `-3` → tokenizes as single number token `{type: "number", value: "-3"}`
- `- 3` → tokenizes as operator + number: `{type: "minus"}`, `{type: "number", value: "3"}`

This eliminates ambiguity for Polish/RPN notation detection.

## Testing Approach

All tests use Deno's built-in test framework:

```typescript
import { assertEquals } from "@std/assert"

Deno.test("parser - parses simple addition", () => {
  const result = parser("2 + 3")

  assertEquals(result._tag, "Ok")
  if (result._tag === "Ok") {
    assertEquals(result.value._tag, "binaryOperator")
  }
})
```

**Run tests:**
```bash
deno test --unstable-temporal --no-check src/
```

**Note**: The `--no-check` flag is needed because Toolsmith has Temporal type errors (not Formulator's issue).

## Demo Scripts

**Test all phases:**
```bash
./test-all-phases.ts "your formula here"
```

**Individual phases:**
```bash
./test-lexer.ts "2 + 3"
./test-tokenizer.ts "2 + 3"
./test-parser.ts "2 + 3"
./test-compiler.ts "2 + 3"
```

**Default formulas** (if no argument provided):
- `test-all-phases.ts`: `"sin(π / 2) + cos(x)"`
- `test-compiler.ts`: `"(a - b) / (c + d + e) * f"`
- Others: `"2 + 3"`

## What's Next (Phase 5 - NOT IMPLEMENTED)

**Planned but not yet implemented**: Polish/RPN notation support

See `docs/plan.md` section "Phase 5: Polish/RPN Notation Support" for complete implementation plan including:
- Auto-detection algorithm
- Prefix parser (recursive descent)
- Postfix parser (stack-based)
- Integration with existing parser

**DO NOT implement Phase 5 unless explicitly asked.**

## Common Pitfalls to Avoid

### ❌ Don't use raw operators
```typescript
if (x < y)  // NO! Use lt(y)(x)
```

### ❌ Don't use negative conditionals first
```typescript
if (result._tag !== "Ok")  // NO! Check "Error" first
```

### ❌ Don't abbreviate
```typescript
parseExpr  // NO! Use parseExpression
```

### ❌ Don't return undefined/null
```typescript
return undefined  // NO! Use error("message")
```

### ❌ Don't throw exceptions
```typescript
throw new Error()  // NO! Use error("message")
```

### ❌ Don't use capitalized initialisms
```typescript
ASTNode  // NO! Use AstNode
```

### ❌ Don't flatten operators
```typescript
// NO! Keep binary tree structure
{ operator: "add", operands: [a, b, c] }
```

### ❌ Don't substitute constants
```typescript
// NO! Keep π as variable
{ _tag: "numberLiteral", value: 3.14159 }
```

### ❌ Don't freeze tuples
```typescript
// NO! Only freeze objects
return ok(Object.freeze([left, right]))

// YES! Freeze AST nodes, not tuples
const node = Object.freeze({ _tag: "...", ... })
return ok([node, position])
```

## Verification Checklist

Before making any changes, verify:

- [ ] All 137 tests passing: `deno test --unstable-temporal --no-check src/`
- [ ] Lint clean: `deno lint src/`
- [ ] Type check clean: `deno task type-check`
- [ ] Demo scripts work: `./test-all-phases.ts "2 + 3"`

## Key Files to Read Before Making Changes

1. **`docs/plan.md`** - Complete architecture and design decisions
2. **`src/parser/types/index.ts`** - AST type definitions (note: `AstNode` not `ASTNode`)
3. **`src/compiler/types/index.ts`** - Enriched AST type definitions
4. **`src/compiler/constants/index.ts`** - Operator mappings and math constants

## Getting Help

If you need to understand how something works:

1. Read the relevant `index.ts` file (all have Envoy comments with `//++`)
2. Check the test file (same directory, `index.test.ts`)
3. Refer to `docs/plan.md` for architecture decisions
4. Run the demo scripts to see actual output

## Summary: What Works Right Now

**Formulator is COMPLETE for infix notation.**

You can:
- ✅ Lex any mathematical formula (character classification)
- ✅ Tokenize to semantic tokens (numbers, identifiers, operators)
- ✅ Parse infix formulas with correct precedence
- ✅ Handle grouped expressions with parentheses
- ✅ Parse function calls: `sin(x)`, `max(a, b, c)`
- ✅ Handle unary operators: `-x`, `x!`
- ✅ Compile to enriched AST with datatypes
- ✅ Collect metadata (variables, constants, functions)
- ✅ Recognize mathematical constants (π, e, τ, φ)

**Example end-to-end:**

```typescript
import compiler from "./src/compiler/index.ts"

const result = compiler("sin(π / 2) + cos(x)")

// Returns:
{
  _tag: "compiledFormula",
  ast: { /* enriched AST with datatypes */ },
  metadata: {
    variables: Map { "x" => { name: "x", datatype: "Number", positions: [19] } },
    constants: Map { "π" => { name: "π", value: 3.14159..., datatype: "Number" } },
    functions: Map {
      "sin" => { name: "sin", arity: 1, returnDatatype: "Number" },
      "cos" => { name: "cos", arity: 1, returnDatatype: "Number" }
    },
    outputDatatype: "Number"
  },
  sourceFormula: "sin(π / 2) + cos(x)"
}
```

## Final Reminders

1. **DO NOT break the 137 passing tests**
2. **ALWAYS use Toolsmith functions** (never raw operators)
3. **ALWAYS use positive-first logic** (check success before error)
4. **ALWAYS return Result monad** (never undefined/null/throw)
5. **NO abbreviations** anywhere in the codebase
6. **Follow curried, data-last pattern** for all functions
7. **Use `_tag` with underscore** for discriminated unions
8. **Use `AstNode` not `ASTNode`** (no capitalized initialisms)

**When in doubt, read the existing code.** It follows all these rules correctly.

---

**Good luck! The codebase is clean, well-tested, and follows strict functional principles. Keep it that way! 🚀**
