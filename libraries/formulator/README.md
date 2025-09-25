# Formulator: Bidirectional Formula Parser & Compiler

> **Transform mathematical and chemical formulas between human-readable notation, Architect IR, and semantic markup**

Formulator is a pure functional TypeScript library that creates perfect isomorphism between formula representations. Write formulas as strings, JSX components, or structured data—Formulator seamlessly converts between all formats while preserving semantic meaning and ensuring type safety.

## Core Philosophy

**One formula, many representations, zero information loss.**

Formulator bridges the gap between how humans write formulas and how computers process them:

- **Humans write**: `"E = mc²"` or `"H₂O + CO₂ → H₂CO₃"`
- **Architect needs**: Structured IR for reactive calculations
- **Browsers display**: MathML or ChemML for semantic rendering
- **Databases store**: JSON/YAML/Turtle for persistence

All representations are perfectly interchangeable through Formulator.

## The Isomorphism

```
Formula String ←→ AST ←→ Architect IR ←→ JSX Components
      ↓            ↓           ↓              ↓
   MathML      ChemML    JSON/YAML      Semantic HTML
```

Every arrow is bidirectional. Every transformation is lossless.

## Features

### Mathematical Formulas

Parse and compile mathematical expressions with full support for:

- **Arithmetic**: `+`, `-`, `*`, `/`, `^`, `%`, `√`
- **Comparisons**: `<`, `>`, `≤`, `≥`, `=`, `≠`
- **Logical**: `∧`, `∨`, `¬`, `⊕`, `→` (and, or, not, xor, implies)
- **Functions**: `sin`, `cos`, `tan`, `log`, `ln`, `exp`, `abs`, `round`, `floor`, `ceil`
- **Statistics**: `avg`, `sum`, `min`, `max`, `median`, `σ` (standard deviation)
- **Constants**: `π`, `e`, `φ` (golden ratio), `∞`
- **Variables**: Any valid identifier with subscripts/superscripts
- **Grouping**: Parentheses, brackets, braces with proper precedence

### Chemical Formulas

Parse and compile chemical notation with support for:

- **Molecular formulas**: `H₂O`, `C₆H₁₂O₆`, `Ca(OH)₂`
- **Structural formulas**: `CH₃CH₂OH`, `(CH₃)₃COH`
- **Ionic charges**: `Na⁺`, `SO₄²⁻`, `Fe³⁺`
- **Isotopes**: `¹⁴C`, `²³⁵U`, `³H` (tritium)
- **Chemical equations**: `2H₂ + O₂ → 2H₂O`
- **Equilibrium**: `N₂ + 3H₂ ⇌ 2NH₃`
- **Phase notation**: `H₂O(l) → H₂O(g)`
- **Catalysts**: `2H₂O₂ →[MnO₂] 2H₂O + O₂`

### Output Formats

#### MathML Generation

```typescript
import toMathML from "@sitebender/formulator/converters/toMathML/index.ts"

const mathML = toMathML("(a + b)² = a² + 2ab + b²")
// Generates proper MathML with <math>, <mrow>, <msup>, etc.
```

#### ChemML Generation

```typescript
import toChemML from "@sitebender/formulator/converters/toChemML/index.ts"

const chemML = toChemML("H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O")
// Generates semantic chemical markup
```

#### Architect IR

```typescript
import parseFormula from "@sitebender/formulator/parseFormula/index.ts"

const result = parseFormula("(price * quantity) * (1 + tax_rate)", {
	price: { tag: "FromElement", source: "#price" },
	quantity: { tag: "FromElement", source: "#quantity" },
	tax_rate: { tag: "FromConstant", value: 0.08 },
})
// Generates Architect operator configuration for reactive calculations
```

## Usage Examples

### Mathematical Expression with Semantic Output

```typescript
import parseFormula from "@sitebender/formulator/parseFormula/index.ts"
import toMathML from "@sitebender/formulator/converters/toMathML/index.ts"
import MathMLDisplay from "@sitebender/pagewright/scientific/MathMLDisplay/index.tsx"

// Parse formula to Architect IR
const formula = "x = (-b ± √(b² - 4ac)) / (2a)"
const ir = parseFormula(formula, {
  a: { tag: "FromElement", source: "#coeff-a" },
  b: { tag: "FromElement", source: "#coeff-b" },
  c: { tag: "FromElement", source: "#coeff-c" }
})

// Generate MathML for display
const mathML = toMathML(formula)

// Use in JSX with Pagewright wrapper
<MathMLDisplay formula={mathML} fallback={formula} />
```

### Chemical Equation with Interactive Elements

```typescript
import parseChemical from "@sitebender/formulator/chemical/parseChemical/index.ts"
import toChemML from "@sitebender/formulator/converters/toChemML/index.ts"
import ChemMLDisplay from "@sitebender/pagewright/scientific/ChemMLDisplay/index.tsx"

// Parse balanced equation
const equation = "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O"
const ir = parseChemical(equation)

// Generate semantic chemical markup
const chemML = toChemML(equation)

// Render with tooltips for each compound
<ChemMLDisplay
  formula={chemML}
  tooltips={{
    "C₆H₁₂O₆": "Glucose",
    "O₂": "Oxygen",
    "CO₂": "Carbon Dioxide",
    "H₂O": "Water"
  }}
/>
```

### Molecular Structure Visualization

```typescript
import toMolecularStructure from "@sitebender/formulator/converters/toMolecularStructure/index.ts"
import MoleculeViewer from "@sitebender/pagewright/scientific/MoleculeViewer/index.tsx"

// Parse molecular formula
const molecule = parseChemical("CH₃CH₂OH")  // Ethanol

// Generate 2D structural representation
const structure2D = toMolecularStructure(molecule, { mode: "2D" })
// Produces bond-line structure with proper angles

// Generate 3D ball-and-stick model data
const structure3D = toMolecularStructure(molecule, { mode: "3D" })
// Produces coordinates for 3D visualization

// Render interactive molecule viewer
<MoleculeViewer
  structure={structure2D}
  mode="2D"
  showAtoms
  showBonds
  showAngles
  interactive
/>

// Or show Lewis dot structure
<MoleculeViewer
  structure={molecule}
  mode="lewis"
  showLonePairs
  showFormalCharges
/>
```

The molecular structure features include:

- **2D Structural Formulas**: Bond-line notation with proper bond angles
- **3D Ball-and-Stick Models**: Interactive 3D rotation and zoom
- **Lewis Dot Structures**: Show valence electrons and lone pairs
- **Space-Filling Models**: Van der Waals radius representation
- **Orbital Diagrams**: Electron configuration and hybridization
- **Resonance Structures**: Multiple valid structures for compounds
- **Newman Projections**: Conformational analysis
- **Fischer Projections**: Stereochemistry for sugars and amino acids

### Bidirectional Conversion

```typescript
import parseFormula from "@sitebender/formulator/parseFormula/index.ts"
import decompile from "@sitebender/formulator/decompile/index.ts"

// Start with a formula string
const original = "(a + b) * c"

// Parse to Architect IR
const ir = parseFormula(original, variables)

// Convert back to formula string
const decompiled = decompile(ir.value)
// Result: "(a + b) * c"

// Perfect round-trip preservation
assert(parseFormula(decompiled, variables) === ir)
```

### Visual Formula Builder Integration

```typescript
import decompile from "@sitebender/formulator/decompile/index.ts"

// User builds formula visually in Architect JSX
const visualFormula = (
	<Multiply>
		<Add>
			<From.Element source="#base-salary" />
			<From.Element source="#bonus" />
		</Add>
		<From.Constant name="tax_rate">1.1</From.Constant>
	</Multiply>
)

// Show them the mathematical notation
const formula = decompile(visualFormula)
// Result: "(base_salary + bonus) * tax_rate"
```

## Formula Syntax

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
- `leq` → ≤, `geq` → ≥, `ll` → ≪, `gg` → ≫
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
| Less than or equal    | `<=`     | `leq`      | `≤`         | `x <= 5` or `x leq 5`            |
| Greater than or equal | `>=`     | `geq`      | `≥`         | `x >= 5` or `x geq 5`            |
| Not equal             | `!=`     | `neq`      | `≠`         | `x != y` or `x neq y`            |
| Pi                    | `PI`     | `pi`       | `π`         | `2 * PI` or `2 * pi`             |
| Sum                   | `sum()`  | `Sum`      | `Σ`         | `sum(x, 1, 10)` or `Sum(x,1,10)` |
| Infinity              | `INF`    | `infinity` | `∞`         | `lim(x → ∞)`                     |

### Chemical Notation

Chemical formulas use standard notation with subscripts and superscripts:

- **Subscripts**: Numbers after elements (`H2O` → H₂O)
- **Superscripts**: Charges (`Na+` → Na⁺, `SO4^2-` → SO₄²⁻)
- **Parentheses**: Group multipliers (`Ca(OH)2` → Ca(OH)₂)
- **Arrows**: Reactions (`->` → →, `<->` → ⇌)
- **Phase indicators**: States of matter (`(s)`, `(l)`, `(g)`, `(aq)`)
- **Catalysts**: Above arrow notation (`->[cat]` → →[cat])

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

// Chemical formulas → Molecule type
parseChemical("H2O")
// Result type: Molecule with composition {H: 2, O: 1}
```

## Variable Resolution

When decompiling from IR to formula strings, Formulator uses intelligent variable naming:

### Explicit Names

```typescript
<From.Constant name="tax_rate">0.08</From.Constant>
// Decompiles to: "tax_rate"
```

### DOM Elements

```typescript
{ tag: "FromElement", source: "#user-age" }
// Decompiles to: "user_age" (sanitized from ID)
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

```typescript
// Multiple sources with same name get suffixes
#price (element) → "price"
?price (URL param) → "price_2"
localStorage.price → "price_3"
```

## Integration with Architect

Formulator is designed as the formula layer for @sitebender/architect:

```tsx
import Calculation from "@sitebender/architect/components/Calculation/index.tsx"
import Validation from "@sitebender/architect/components/Validation/index.tsx"

// Use formula strings instead of nested components
<Calculation formula="(base + bonus) * (1 - tax_rate)">
  <Variable name="base" from="#base-salary" />
  <Variable name="bonus" from="#bonus-amount" />
  <Variable name="tax_rate" from="#tax-rate" />
</Calculation>

// Validation with formula syntax
<Validation formula="age >= 18 && age < 65">
  <Variable name="age" from="#user-age" />
</Validation>
```

## MathML & ChemML Components

Formulator works seamlessly with Pagewright's scientific display components:

```tsx
import MathMLDisplay from "@sitebender/pagewright/scientific/MathMLDisplay/index.tsx"
import ChemMLDisplay from "@sitebender/pagewright/scientific/ChemMLDisplay/index.tsx"
import toMathML from "@sitebender/formulator/converters/toMathML/index.ts"
import toChemML from "@sitebender/formulator/converters/toChemML/index.ts"

// Mathematical formulas with proper semantic markup
<MathMLDisplay>
  {toMathML("E = mc²")}
</MathMLDisplay>

// Chemical formulas with interactive features
<ChemMLDisplay interactive>
  {toChemML("2H₂ + O₂ → 2H₂O")}
</ChemMLDisplay>
```

These components provide:

- Proper semantic markup for accessibility
- Fallback rendering for browsers without MathML/ChemML support
- Optional interactive features (hover for element info, etc.)
- Print-optimized styling
- Copy-to-clipboard with proper formatting

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

const result = parseChemical("H2O3X")
// Error: Unknown element 'X' at position 5
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

- [Architect](../architect/README.md) - Reactive rendering with calculations
- [Pagewright](../pagewright/README.md) - Semantic HTML components
- [Toolsmith](../toolsmith/README.md) - Functional programming utilities
