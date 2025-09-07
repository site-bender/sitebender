# @sitebender/scribe

Automatic documentation generator for TypeScript code. Extracts comprehensive documentation from type signatures and code analysis, requiring only single-line descriptions from developers.

## Philosophy

Replace verbose JSDoc comments with automatic extraction. The code IS the documentation - we just extract and format it.

## Features

### What We Extract Automatically

- **Full type signatures** - Parameters, returns, generics, constraints
- **Function properties** - Purity, currying, idempotence, commutativity
- **Complexity analysis** - Big-O notation from AST analysis
- **Usage examples** - From test files
- **Mathematical properties** - Proven, not claimed
- **Related functions** - Automatically detected

### What You Write

```typescript
// Adds two numbers
export default function add(x: number) {
	return function (y: number) {
		return x + y
	}
}
```

### What Gets Generated

````markdown
## add

Adds two numbers

**Properties:** Pure | Curried | Commutative | Associative

**Signature:**

```typescript
add(x: number) => (y: number) => number
```
````

**Examples:**

```typescript
add(2)(3) // 5
pipe([add(5), add(10)])(0) // 15
```

**Mathematical Properties:**

- Commutative: `add(a)(b) = add(b)(a)`
- Associative: `add(add(a)(b))(c) = add(a)(add(b)(c))`
- Identity: `add(0)(x) = x`

**Complexity:** O(1)

````
## Installation

```bash
deno add @sitebender/scribe
````

## Usage

```typescript
import { generateDocs } from "@sitebender/scribe"

// Generate documentation for a file
const result = await generateDocs("./src/add/index.ts", {
	format: "markdown", // or "html", "json"
	includeExamples: true,
	includeProperties: true,
})

if (result.ok) {
	console.log(result.value) // Generated documentation
}
```

## Architecture

Pure functional pipeline:

1. **Parse** - TypeScript AST parsing (via @sitebender/parser)
2. **Extract** - Metadata extraction (via @sitebender/parser)
3. **Detect** - Property detection (via @sitebender/parser)
4. **Generate** - Documentation generation (scribe-specific)

Zero dependencies (except @sitebender/parser), 100% test coverage, pure functions only.

## Integration with @sitebender/parser

Scribe delegates ALL TypeScript parsing to @sitebender/parser:

```typescript
// We use parser for all AST operations
import parseSourceFile from "@sitebender/parser/parseSourceFile/index.ts"
import extractSignature from "@sitebender/parser/extractSignature/index.ts"
import detectPurity from "@sitebender/parser/detectProperties/detectPurity/index.ts"
```

### What Parser Provides to Scribe

- TypeScript AST parsing
- Function signature extraction
- Property detection (purity, currying, async)
- Type information extraction
- Complexity analysis (future)

### What Scribe Handles

- Documentation formatting (Markdown, HTML, JSON)
- Example extraction from tests
- Mathematical property verification
- Documentation structure and organization

## Coordination with Other Libraries

### With Prover

- Share the same FunctionSignature type from parser
- Use consistent property detection
- Coordinate on complexity analysis needs

### With Foundry

- Use foundry to generate realistic examples
- Create documentation for generated test data
- Document property-based testing patterns

## For AI Agents Working on Scribe

**BEFORE implementing parsing features:**

1. Check if @sitebender/parser already has it
2. If not, request it be added to parser
3. Never duplicate parsing logic locally

**COMMUNICATE when you need:**

- New property detection (idempotence, determinism, etc.)
- Additional metadata extraction
- Complex type analysis
- Performance metrics

## Development

```bash
# Run tests
deno task test

# Coverage
deno task test:cov

# Type check
deno task type-check

# Lint
deno task lint
```

## Status

Phase 1 Implementation (Current):

- ✅ TypeScript AST parsing
- ✅ Signature extraction
- ✅ Basic property detection (purity, currying)
- ✅ Markdown generation

Phase 2 (Planned):

- Mathematical property detection
- Complexity analysis
- Example extraction from tests
- HTML/JSON generation

## License

MIT
