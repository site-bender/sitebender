# @sitebender/scribe

Automatic documentation generator for TypeScript code. Extracts comprehensive documentation from type signatures and code analysis, requiring only single-line descriptions from developers.

## Philosophy

Replace verbose JSDoc comments with automatic extraction. The code IS the documentation - we just extract and format it.

**The ++ Revolution**: Using `//++` comments (increment comments - one step above regular comments!), developers write ONE line describing intent, plus a few examples. Everything else is extracted automatically.

## Features

### What We Extract Automatically

- **Full type signatures** - Parameters, returns, generics, constraints
- **Function properties** - Purity, currying, idempotence, commutativity
- **Complexity analysis** - Big-O notation from AST analysis
- **Usage examples** - From ++ comments AND test files
- **Mathematical properties** - Proven by Prover, not claimed
- **Related functions** - Automatically detected

### The Benefits vs JSDoc

| JSDoc (Old Way) | Scribe ++ (New Way) |
|-----------------|---------------------|
| 50+ lines per function | 3-5 lines per function |
| Repeats type information | Extracts from TypeScript |
| Claims properties | Proves properties via Prover |
| Examples might not work | Examples are validated |
| Gets out of sync | Can't lie - extracted from code |
| 40,000+ lines of boilerplate | 3,000 lines max |

### What You Write

```typescript
//++ Adds two numbers together
export default function add(x: number) {
	return function (y: number) {
		return x + y
	}
}

//++ add(2)(3) // 5
//++ add(10)(32) // 42
//++ const increment = add(1); increment(5) // 6
```

**The Complete Comment Syntax:**

**Documentation Comments (`//++`):**
- `//++` above the function: One-line intent description
- `//++` below the function: Working examples
- `/*++ ... */` for multi-line if needed (but keep it minimal!)

**Tech Debt Comments (`//--`):**
- `//--` inside functions: Justified violations, hacks, workarounds
- Documents WHY something is suboptimal
- Creates an auditable trail of technical compromises
- Can be extracted for tech debt reports

**Example:**
```typescript
//++ Composes functions from right to left
// deno-lint-ignore no-explicit-any
export default function compose<T>(fns: ReadonlyArray<(value: any) => any>) {
  // deno-lint-ignore no-explicit-any
  return function (x: T): any {
    //-- TypeScript can't type heterogeneous function chains, any is authorized
    return fns.reduceRight((acc, fn) => fn(acc), x)
  }
}

//++ compose([double, increment])(5) // 11
//++ compose([toString, double])(5) // "10"
```

**Validation & Reporting:**
- Scribe/Prover validates that `//++` examples actually work
- `//--` comments can be extracted for weekly tech debt reports
- If an example doesn't work, you get an error with suggestions

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
