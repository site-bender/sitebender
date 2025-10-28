# Formulator: Bidirectional Formula Parser & Compiler

> **Transform mathematical formulas between human-readable notation, Artificer IR, and semantic markup**

⚠️ **Status**: Under active development. Pure FP architecture planned, awaiting Toolsmith boxed function implementation. See [docs/plan.md](./docs/plan.md) for complete architecture and [docs/boxed-required.md](./docs/boxed-required.md) for prerequisites.

Formulator is a pure functional TypeScript library that creates perfect isomorphism between formula representations. Write formulas as strings, JSX components, or structured data—Formulator seamlessly converts between all formats while preserving semantic meaning and ensuring type safety.

## Core Philosophy

**One formula, many representations, zero information loss.**

Formulator bridges the gap between how humans write formulas and how computers process them:

- **Humans write**: `"E = mc²"`
- **Artificer needs**: Structured IR for reactive calculations
- **Browsers display**: MathMl for semantic rendering
- **Databases store**: JSON/YAML/Turtle for persistence

All representations are perfectly interchangeable through Formulator.

## The Isomorphism

```
Formula String ←→ AST ←→ Artificer IR ←→ JSX Components
      ↓            ↓           ↓              ↓
   MathMl      Metadata   JSON/YAML      Semantic HTML
```

Every arrow is bidirectional. Every transformation is lossless.

**Note**: Chemical formula support is a possible future extension, but not currently planned. ChemML has limited adoption and modern chemical visualization typically uses specialized tools (JSMol, etc.) or SVG/Canvas rendering rather than semantic markup.

## Features

Parse and compile mathematical expressions with full support for:

- **Arithmetic**: `+`, `-`, `*`, `/`, `^`, `%`, `√`
- **Comparisons**: `<`, `>`, `≤`, `≥`, `=`, `≠`
- **Logical**: `∧`, `∨`, `¬`, `⊕`, `→` (and, or, not, xor, implies)
- **Functions**: `sin`, `cos`, `tan`, `log`, `ln`, `exp`, `abs`, `round`, `floor`, `ceil`
- **Statistics**: `avg`, `sum`, `min`, `max`, `median`, `σ` (standard deviation)
- **Constants**: `π`, `e`, `φ` (golden ratio), `∞`
- **Variables**: Any valid identifier with subscripts/superscripts
- **Grouping**: Parentheses, brackets, braces with proper precedence

### Output Formats

#### MathMl Display (Declarative JSX)

```tsx
import MathMlDisplay from "@sitebender/architect/scientific/MathMlDisplay/index.tsx"

<MathMlDisplay formula="(a + b)² = a² + 2ab + b²" />
// Component generates proper MathMl with <math>, <mrow>, <msup>, etc.
```

#### Artificer IR

```typescript
import parseFormula from "@sitebender/formulator/parseFormula/index.ts"

const result = parseFormula("(price * quantity) * (1 + taxRate)", {
	price: { tag: "FromElement", source: "#price" },
	quantity: { tag: "FromElement", source: "#quantity" },
	taxRate: { tag: "FromConstant", value: 0.08 },
})
// Generates Artificer operator configuration for reactive calculations
```

## Usage Examples

### Mathematical Expression with Semantic Output

```tsx
import parseFormula from "@sitebender/formulator/parseFormula/index.ts"
import MathMlDisplay from "@sitebender/architect/scientific/MathMlDisplay/index.tsx"

// Parse formula to Artificer IR for reactive calculations
const formula = "x = (-b ± √(b² - 4ac)) / (2a)"
const ir = parseFormula(formula, {
  a: { tag: "FromElement", source: "#coeffA" },
  b: { tag: "FromElement", source: "#coeffB" },
  c: { tag: "FromElement", source: "#coeffC" }
})

// Display formula with declarative JSX - component handles MathMl generation
<MathMlDisplay formula={formula} fallback={formula} />
```

### Bidirectional Conversion

```typescript
import parseFormula from "@sitebender/formulator/parseFormula/index.ts"
import decompile from "@sitebender/formulator/decompile/index.ts"

// Start with a formula string
const original = "(a + b) * c"

// Parse to Artificer IR
const ir = parseFormula(original, variables)

// Convert back to formula string
const decompiled = decompile(ir.value)
// Result: "(a + b) * c"

// Perfect round-trip preservation
assert(parseFormula(decompiled, variables) === ir)
```

### Visual Formula Builder Integration

```tsx
import decompile from "@sitebender/formulator/decompile/index.ts"

// User builds formula visually in Artificer JSX
const visualFormula = (
	<Multiply>
		<Add>
			<From.Element source="#baseSalary" />
			<From.Element source="#bonus" />
		</Add>
		<From.Constant name="taxRate">1.1</From.Constant>
	</Multiply>
)

// Show them the mathematical notation
const formula = decompile(visualFormula)
// Result: "(baseSalary + bonus) * taxRate"
```

## Formula Syntax

### Notation Styles

Formulator supports three mathematical notation styles for maximum flexibility:

#### Infix Notation (Default)

Standard mathematical notation with operators between operands:

```typescript
parseFormula("a + b * c", variables)
// Evaluates as: a + (b * c) due to precedence
```

#### Prefix Notation (Polish Notation)

Operators appear before their operands, eliminating the need for precedence rules or parentheses:

```typescript
parseFormula("+ a * b c", variables, { notation: "prefix" })
// Equivalent to: a + (b * c)

parseFormula("* + a b c", variables, { notation: "prefix" })
// Equivalent to: (a + b) * c
```

**Benefits**:

- No operator precedence ambiguity
- No parentheses needed
- Natural for Lisp-style DSLs
- Efficient recursive evaluation

#### Postfix Notation (Reverse Polish Notation)

Operators appear after their operands, ideal for stack-based evaluation:

```typescript
parseFormula("a b c * +", variables, { notation: "postfix" })
// Equivalent to: a + (b * c)

parseFormula("a b + c *", variables, { notation: "postfix" })
// Equivalent to: (a + b) * c
```

**Benefits**:

- Trivial stack-based evaluation
- No operator precedence needed
- No parentheses required
- Common in calculators (HP, PostScript)

#### Notation Comparison

| Expression      | Infix               | Prefix          | Postfix         |
| --------------- | ------------------- | --------------- | --------------- |
| Simple addition | `a + b`             | `+ a b`         | `a b +`         |
| With precedence | `a + b * c`         | `+ a * b c`     | `a b c * +`     |
| Parenthesized   | `(a + b) * c`       | `* + a b c`     | `a b + c *`     |
| Complex         | `(a + b) * (c - d)` | `* + a b - c d` | `a b + c d - *` |
| Three operators | `a + b * c - d`     | `- + a * b c d` | `a b c * + d -` |

### Bidirectional Notation Conversion

Convert between notations seamlessly:

```typescript
import parseFormula from "@sitebender/formulator/parseFormula/index.ts"
import decompile from "@sitebender/formulator/decompile/index.ts"

// Parse prefix notation
const ir = parseFormula("* + a b c", variables, { notation: "prefix" })

// Decompile to infix (default)
const infix = decompile(ir.value)
// Result: "(a + b) * c"

// Decompile to postfix
const postfix = decompile(ir.value, { notation: "postfix" })
// Result: "a b + c *"

// Decompile to prefix
const prefix = decompile(ir.value, { notation: "prefix" })
// Result: "* + a b c"
```

### Practical Use Cases

**Infix** - Human-readable formulas:

```typescript
<Calculation formula="(price * quantity) * (1 - discount)" />
```

**Prefix** - Lisp-style DSLs and function composition:

```typescript
parseFormula("+ (* price quantity) (- 100 discount)", vars, {
	notation: "prefix",
})
```

**Postfix** - Stack-based calculators and evaluation engines:

```typescript
parseFormula("price quantity * 100 discount - *", vars, {
	notation: "postfix",
})
```

### Smart Symbol Recognition

Formulator automatically converts typed names to proper mathematical symbols. No need to know keyboard shortcuts!

#### Greek Letters

Type the name, get the symbol:

- `alpha` → α, `beta` → β, `gamma` → γ, `delta` → δ
- `epsilon` → ε, `zeta` → ζ, `eta` → η, `theta` → θ
- `iota` → ι, `kappa` → κ, `lambda` → λ, `mu` → μ
- `nu` → ν, `xi` → ξ, `omicron` → ο, `pi` → π
- `rho` → ρ, `sigma` → σ, `tau` → τ, `upsilon` → υ
- `phi` → φ, `chi` → χ, `psi` → ψ, `omega` → ω
- Uppercase: `Alpha` → Α, `Beta` → Β, `Gamma` → Γ, `Delta` → Δ, etc.

#### Mathematical Operators

Type the word, get the symbol:

- `integral` → ∫, `partial` → ∂, `nabla` → ∇
- `sum` or `Sum` → Σ, `product` or `Product` → Π
- `infinity` or `inf` → ∞, `plusminus` or `pm` → ±
- `approx` → ≈, `notequal` or `neq` → ≠
- `lte` → ≤, `gte` → ≥, `ll` → ≪, `gg` → ≫
- `subset` → ⊂, `superset` → ⊃, `union` → ∪, `intersection` → ∩
- `forall` → ∀, `exists` → ∃, `in` → ∈, `notin` → ∉
- `dot` → ·, `cross` → ×, `otimes` → ⊗, `oplus` → ⊕

#### Calculus & Advanced Math

- `lim` → lim, `d/dx` → derivative notation
- `integral(f, a, b)` → ∫ₐᵇ f dx
- `partial(f)/partial(x)` → ∂f/∂x
- `grad` → ∇, `div` → ∇·, `curl` → ∇×
- `matrix([[1,2],[3,4]])` → matrix notation
- `vec(v)` → v⃗ (vector notation)
- `hat(x)` → x̂ (unit vector)
- `dot(x)` → ẋ (time derivative)

### Mathematical Notation

Formulator accepts ASCII, typed names, and Unicode mathematical symbols:

| Operation             | ASCII    | Typed Name | Unicode     | Example                          |
| --------------------- | -------- | ---------- | ----------- | -------------------------------- |
| Multiplication        | `*`      | `times`    | `×` or `·`  | `2 * 3` or `2 times 3`           |
| Division              | `/`      | `div`      | `÷`         | `6 / 2` or `6 div 2`             |
| Exponent              | `^`      | `pow`      | superscript | `x^2` or `x pow 2`               |
| Square root           | `sqrt()` | `sqrt`     | `√`         | `sqrt(16)` or `√16`              |
| Less than or equal    | `<=`     | `lte`      | `≤`         | `x <= 5` or `x lte 5`            |
| Greater than or equal | `>=`     | `gte`      | `≥`         | `x >= 5` or `x gte 5`            |
| Not equal             | `!=`     | `neq`      | `≠`         | `x != y` or `x neq y`            |
| Pi                    | `PI`     | `pi`       | `π`         | `2 * PI` or `2 * pi`             |
| Sum                   | `sum()`  | `Sum`      | `Σ`         | `sum(x, 1, 10)` or `Sum(x,1,10)` |
| Infinity              | `INF`    | `infinity` | `∞`         | `lim(x → ∞)`                     |

## Type Inference

Formulator intelligently infers types from context:

```typescript
// All Integer inputs → Integer output
parseFormula("a + b", {
	a: { tag: "Constant", datatype: "Integer", value: 5 },
	b: { tag: "Constant", datatype: "Integer", value: 3 },
})
// Result type: Integer

// Mixed numeric types → Number (most general)
parseFormula("x * y", {
	x: { tag: "Constant", datatype: "Integer", value: 5 },
	y: { tag: "Constant", datatype: "Float", value: 3.14 },
})
// Result type: Number
```

## Variable Resolution

When decompiling from IR to formula strings, Formulator uses intelligent variable naming:

### Explicit Names

```tsx
<From.Constant name="taxRate">0.08</From.Constant>
// Decompiles to: "taxRate"
```

### DOM Elements

```tsx
{ tag: "FromElement", source: "#userAge" }
// Decompiles to: "userAge" (sanitized from ID)
```

### URL Parameters

```typescript
{ tag: "FromQueryString", param: "discount" }
// Decompiles to: "discount"
```

### Anonymous Values

```typescript
{ tag: "Constant", value: 42 }
// Decompiles to: "x", "y", "z", ... (sequential)
```

### Collision Resolution

```tsx
// Multiple sources with same name get suffixes
#price (element) → "price"
?price (URL param) → "price2"
localStorage.price → "price3"
```

## Integration with Artificer

Formulator is designed as the formula layer for @sitebender/artificer:

```tsx
import Calculation from "@sitebender/artificer/components/Calculation/index.tsx"
import Validation from "@sitebender/artificer/components/Validation/index.tsx"

// Use formula strings instead of nested components
<Calculation formula="(base + bonus) * (1 - taxRate)">
  <Variable name="base" from="#baseSalary" />
  <Variable name="bonus" from="#bonusAmount" />
  <Variable name="taxRate" from="#taxRate" />
</Calculation>

// Validation with formula syntax
<Validation formula="age >= 18 && age < 65">
  <Variable name="age" from="#userAge" />
</Validation>
```

## MathMl Components

Formulator works seamlessly with Architect's scientific display components using fully declarative JSX:

```tsx
import MathMlDisplay from "@sitebender/architect/scientific/MathMlDisplay/index.tsx"

// Mathematical formulas with proper semantic markup
<MathMlDisplay formula="E = mc²" />
```

These components provide:

- Proper semantic markup for accessibility
- Fallback rendering for browsers without MathMl support
- Optional interactive features (hover tooltips, etc.)
- Print-optimized styling
- Copy-to-clipboard with proper formatting
- Internal formula parsing and markup generation (no imperative functions needed)

## Performance

- **Zero dependencies**: Pure TypeScript, no external libraries
- **Tree-shakeable**: Import only what you need
- **Compile-time optimization**: Formulas parsed at build time when possible
- **Lazy evaluation**: Variables resolved only when needed
- **Memoization**: Parsed formulas cached for reuse
- **Streaming**: Large formulas processed incrementally

## Error Handling

Formulator provides detailed error messages with position tracking:

```typescript
const result = parseFormula("(a + b")
// Error: Missing closing parenthesis at position 6

const result = parseFormula("x + y", { x: {...} })
// Error: Undefined variable 'y' at position 4
```

## Testing

Formulator uses property-based testing to ensure correctness:

```typescript
// Property: Parsing and decompiling are inverse operations
property("round-trip preservation", arbitrary.formula(), (formula) => {
	const ir = parseFormula(formula, vars)
	const decompiled = decompile(ir)
	const reparsed = parseFormula(decompiled, vars)
	return deepEqual(ir, reparsed)
})

// Property: Operator precedence is preserved
property("precedence preservation", arbitrary.expression(), (expr) => {
	const withParens = addAllParentheses(expr)
	const withoutParens = removeUnnecessaryParentheses(expr)
	return evaluate(withParens) === evaluate(withoutParens)
})
```

## Contributing

Formulator follows strict functional programming principles:

1. **Pure functions only** - No mutations, no side effects
2. **One function per file** - Located in folder with function name
3. **Envoy documentation** - Every exported function must have //++ comment
4. **100% test coverage** - No exceptions
5. **Property-based tests** - For all mathematical operations
6. **Type safety** - Full TypeScript with no `any`

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for details.

## License

[MIT](../../LICENSE)

## See Also

- [Artificer](../artificer/README.md) - Reactive rendering with calculations
- [Architect](../architect/README.md) - Semantic HTML components
- [Toolsmith](../toolsmith/README.md) - Functional programming utilities
