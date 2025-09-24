# @sitebender/formulator

Pure TypeScript formula parser for mathematical expressions. Compiles formula strings to @sitebender/architect configuration objects.

## Installation

```bash
deno add @sitebender/formulator
```

## Demo

```bash
# Run the demo to see various parsing examples
deno run demo/index.ts
```

## The Problem

Deep nested calculations in JSX are unreadable and hard to maintain:

```tsx
// This is hard to understand - what's the formula?
<Divide>
	<Subtract>
		<Multiply>
			<From.Constant>5</From.Constant>
			<From.Constant>10</From.Constant>
		</Multiply>
		<From.Constant>2</From.Constant>
	</Subtract>
	<From.Constant>3</From.Constant>
</Divide>
```

## The Solution

Use mathematical formula syntax that compiles to the same configuration:

```tsx
// Much clearer - you can see the formula!
<Calculation formula="((w * x) - y) / z">
	<Variable name="w">
		<From.Constant>5</From.Constant>
	</Variable>
	<Variable name="x">
		<From.Constant>10</From.Constant>
	</Variable>
	<Variable name="y">
		<From.Constant>2</From.Constant>
	</Variable>
	<Variable name="z">
		<From.Constant>3</From.Constant>
	</Variable>
</Calculation>
```

Both compile to **exactly the same** architect configuration. The formula is readable, and variables can be injected at compile time, runtime, or lazily when the function runs.

## Data Sources

Variables can pull data from anywhere using the `From.*` components:

- `From.Constant` - Static values
- `From.Element` - DOM elements
- `From.UrlSegment` - URL path segments
- `From.QueryString` - URL query parameters
- `From.Api` - API endpoints
- `From.LocalStorage` - Browser local storage
- `From.SessionStorage` - Browser session storage
- `From.Lookup` - Lookup tables
- `From.LookupTable` - Multi-dimensional lookups

These are used in `<Validation>`, `<Display>` (conditional rendering), and calculations throughout your application.

## Usage

```typescript
import { parseFormula } from "@sitebender/formulator"

// Define variables with injector configurations
const variables = {
	a: { tag: "Constant", type: "injector", datatype: "Integer", value: 99 },
	b: {
		tag: "FromElement",
		type: "injector",
		datatype: "Integer",
		source: "#divisor",
	},
	c: { tag: "Constant", type: "injector", datatype: "Integer", value: 44 },
	d: { tag: "Constant", type: "injector", datatype: "Integer", value: 2 },
}

// Parse formula into architect configuration
const result = parseFormula("(a / b) + (c / d)", variables)

if (result.ok) {
	console.log(result.value) // Architect configuration object
} else {
	console.error(result.error) // Parse error details
}
```

## Features

### Phase 1 (Current)

- ✅ Basic arithmetic: `+`, `-`, `*`, `/`, `^`
- ✅ Parentheses for grouping
- ✅ Variables (lowercase identifiers)
- ✅ Unary operators: `+`, `-`
- ✅ Type inference from variables
- ✅ All injector types supported (Constant, FromElement, etc.)

### Phase 2 (Planned)

- Comparison operators: `<`, `<=`, `>`, `>=`, `==`, `!=`
- Logical operators: `&&`, `||`
- Boolean algebra for validations and conditional display

### Phase 3 (Future)

- Mathematical functions: `sin`, `cos`, `sqrt`, `max`, `min`
- Constants: `PI`, `E`

## Operator Precedence

From highest to lowest:

1. Parentheses `()`
2. Exponentiation `^` (right-associative)
3. Unary `+`, `-`
4. Multiplication/Division `*`, `/` (left-associative)
5. Addition/Subtraction `+`, `-` (left-associative)

## Type System

- Default numeric type: `"Number"`
- Type inference: When all variables share the same numeric type, that type is used
- Mixed types: Default to `"Number"`
- Supported types: `Number`, `Integer`, `Float`, `Precision`

## Error Handling

The parser uses a Result type for error handling:

```typescript
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }
```

Common errors:

- Undefined variables
- Syntax errors
- Mismatched parentheses
- Invalid characters

## Development

```bash
# Run tests
deno task test

# Run with coverage
deno task test:cov

# Type check
deno task type-check

# Lint
deno task lint

# Format
deno task fmt
```

## Architecture

Pure functional TypeScript with:

- Tokenizer for lexical analysis
- Pratt parser with precedence climbing
- Compiler using @sitebender/architect constructors
- Zero external dependencies
- Comprehensive test coverage

## Reverse Compilation (Decompilation)

The formulator library creates an isomorphism between three equivalent representations:

- Mathematical formula strings
- Architect configuration objects
- JSX component trees

This means you can convert in any direction:

```
Formula ←→ Architect Config ←→ JSX Components
   ↑______________|_______________↑
            All Equivalent
```

### From Architect Config to Formula

You can reverse-architecter a mathematical formula from an architect configuration:

```typescript
import { decompile } from "@sitebender/formulator"

// Given an architect configuration
const config = {
	tag: "Add",
	type: "operator",
	datatype: "Integer",
	addends: [
		{ tag: "Constant", type: "injector", datatype: "Integer", value: 6 },
		{ tag: "Constant", type: "injector", datatype: "Integer", value: 9 },
	],
}

// Convert back to formula
const formula = decompile(config)
// Could return: "6 + 9" (if eager evaluation and constants)
// Or: "x + y" (if lazy evaluation or other injector types)
```

### Eager vs Lazy Evaluation

The architect supports both eager and lazy evaluation for injectors:

- **Eager + Constants**: Can inline values like `"6 + 9"` since constants are truly constant (specified directly in the element)
- **Lazy evaluation**: Must use variables like `"x + y"` since values aren't resolved until runtime
- **Other injectors**: Always use variables since they load from external sources (DOM, URL, storage, etc.)

### Variable Naming Strategies

When decompiling, variables are assigned names based on their source:

#### 1. Named Constants

```tsx
// JSX with explicit name
<From.Constant name="price" type="Number">
	99.99
</From.Constant>
// Decompiles to: "price"
```

#### 2. DOM Elements

```typescript
{ tag: "FromElement", source: "#quantity-input" }
// Decompiles to: "quantity_input" (sanitized from ID)
```

#### 3. URL Parameters

```typescript
{ tag: "FromURL", param: "age" }
// Decompiles to: "age"
```

#### 4. Storage Keys

```typescript
{ tag: "FromLocalStorage", key: "user_score" }
// Decompiles to: "user_score"

{ tag: "FromSessionStorage", key: "temp_value" }
// Decompiles to: "temp_value"
```

#### 5. Anonymous Constants

```typescript
{ tag: "Constant", value: 42 }
// Decompiles to: "x", "y", "z", ... (sequential assignment)
```

### Collision Handling

When multiple injectors would produce the same variable name, the system handles collisions:

#### Strategy 1: Numeric Suffixes

```typescript
// Two elements with similar IDs
{ tag: "FromElement", source: "#price" }      // → "price"
{ tag: "FromElement", source: "#price-tax" }  // → "price_tax"
{ tag: "FromURL", param: "price" }            // → "price_2"
```

#### Strategy 2: Source Prefixing

```typescript
// Prefix by source type when collision detected
{ tag: "FromElement", source: "#value" }      // → "el_value"
{ tag: "FromURL", param: "value" }            // → "url_value"
{ tag: "FromLocalStorage", key: "value" }     // → "ls_value"
```

#### Strategy 3: Hash Suffixing

```typescript
// For complex collisions, append a short hash
{ tag: "FromElement", source: "#input" }      // → "input"
{ tag: "FromElement", source: "#input" }      // → "input_a3f"
```

### Practical Examples

#### Example 1: Visual to Formula

```tsx
// User builds visually:
<Multiply type="Number">
	<Add type="Number">
		<From.Element source="#base-salary" />
		<From.Element source="#bonus" />
	</Add>
	<From.Constant name="tax_multiplier">1.1</From.Constant>
</Multiply>

// System shows formula:
"(base_salary + bonus) * tax_multiplier"
```

#### Example 2: Formula to Visual

```typescript
// User types formula:
const formula = "price * quantity * (1 + tax_rate)"

// With variable mappings:
const variables = {
  price: { tag: "FromElement", source: "#price-input" },
  quantity: { tag: "FromElement", source: "#qty-input" },
  tax_rate: { tag: "FromElement", source: "#tax-select" }
}

// Generates equivalent JSX:
<Multiply>
  <From.Element source="#price-input" />
  <From.Element source="#qty-input" />
  <Add>
    <From.Constant>1</From.Constant>
    <From.Element source="#tax-select" />
  </Add>
</Multiply>
```

#### Example 3: Round-Trip Preservation

```typescript
// Original formula
const original = "(a + b) * c"

// Parse to config
const config = parseFormula(original, variables)

// Decompile back to formula
const rebuilt = decompile(config.value)

// Parse again - should be equivalent
const reparsed = parseFormula(rebuilt, variables)

// Assert: config === reparsed (structurally)
```

### Use Cases

1. **Formula Extraction**: Show users the math behind their visual compositions
2. **Import/Export**: Move formulas between systems (spreadsheets, databases)
3. **Optimization Detection**: Identify and simplify equivalent formulas
4. **User Preference**: Let users toggle between visual and textual editing
5. **Documentation**: Auto-generate formula documentation from components
6. **Validation**: Prove all representations are equivalent

### Future Enhancements

- **Simplification Architect**: Detect and simplify patterns like `x * 1 → x`
- **Variable Inference**: Automatically detect optimal variable names
- **Formula Formatting**: Pretty-print with configurable parentheses
- **Symbolic Computation**: Algebraic manipulation of formulas

## Recommendations for Improvement

Based on a thorough analysis of the library:

1. **Fix Unary Plus Bug** - The expression `"5 + + 3"` incorrectly parses successfully. The unary plus is being treated as identity and ignored when it should be a syntax error.

2. **Add Property-Based Testing** - Despite TESTING.md mandating property-based testing for mathematical operations, the tests are mostly unit tests. AND HOMIE DON'T DO UNIT TESTS (how'd those get in there?). USE THE `logician` LIBRARY TEST GENERATOR to add fast-check property tests for:
   - Operator precedence properties
   - Type inference properties
   - Tokenization invariants

3. **Improve Test Organization** - Tests are in `/behaviors/` but not truly organized by behavior. Reorganize into:
   - `/behaviors/precedence/`
   - `/behaviors/type-inference/`
   - `/behaviors/error-handling/`

4. **Add Integration Testing** - Create tests showing the library integrating with @sitebender/architect in real scenarios

5. **Implement Decompilation Feature** - The README promises bidirectional conversion but only compilation is implemented. Add the `decompile` function to convert architect configs back to formulas.

6. **Add Performance Benchmarks** - Create benchmarks for parsing complex formulas to ensure performance doesn't degrade

7. **Enhance Error Messages** - Add more detailed position tracking and context in error messages for better debugging
