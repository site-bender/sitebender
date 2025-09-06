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

1. **Parse** - TypeScript AST parsing
2. **Extract** - Metadata extraction
3. **Detect** - Property detection
4. **Generate** - Documentation generation

Zero dependencies, 100% test coverage, pure functions only.

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
