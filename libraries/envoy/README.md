# @sitebender/envoy

We are Envoy. And we take what is given.

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

| JSDoc (Old Way)              | Envoy ++ (New Way)              |
| ---------------------------- | ------------------------------- |
| 50+ lines per function       | 3-5 lines per function          |
| Repeats type information     | Extracts from TypeScript        |
| Claims properties            | Proves properties via Prover    |
| Examples might not work      | Examples are validated          |
| Gets out of sync             | Can't lie - extracted from code |
| 40,000+ lines of boilerplate | 3,000 lines max                 |

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

Envoy uses a **five-tier comment taxonomy** (by severity/priority):

**1. Regular Comments (`//`):**

- Standard comments that don't fit other categories
- Not extracted for documentation
- Used for implementation notes

**2. Documentation Comments (`//++`):**

- `//++` above the function: One-line intent description
- `//++` below the function: Working examples (deprecated - use `//??` instead)
- `/*++ ... */` for multi-line if needed (but keep it minimal!)

**3. Help Comments (`//??`):**

- `//??` below functions: Help information (examples, setup, gotchas, etc.)
- Format: `//?? [CATEGORY] content` or just `//?? content` for examples
- Categories (case-insensitive, singular):
  - `[EXAMPLE]` - One usage example (default)
  - `[SETUP]` - One configuration step
  - `[ADVANCED]` - One complex pattern
  - `[GOTCHA]` - One common mistake
  - `[MIGRATION]` - One migration step
- `/*?? ... */` for multi-line help blocks
- Each category marker starts a new item

**4. Tech Debt Comments (`//--`):**

- `//--` inside functions: Justified violations, hacks, workarounds
- Format: `//-- [CATEGORY] reason` or just `//-- reason`
- Categories (case-insensitive):
  - `[WORKAROUND]` - Temporary fix
  - `[LIMITATION]` - Known limitation
  - `[OPTIMIZATION]` - Performance trade-off
  - `[REFACTOR]` - Needs restructuring
  - `[COMPATIBILITY]` - Backward compatibility
- Documents WHY something is suboptimal
- Creates an auditable trail of technical compromises

**5. Critical Issue Comments (`//!!`):** 🆕

- `//!!` inside functions: Critical issues that block production
- Format: `//!! [CATEGORY] Description - Action required`
- Categories: SECURITY, PERFORMANCE, CORRECTNESS, INCOMPLETE, BREAKING
- These MUST be fixed before release

**Example:**

```typescript
//++ Composes functions from right to left
// deno-lint-ignore no-explicit-any
export default function compose<T>(fns: ReadonlyArray<(value: any) => any>) {
	// deno-lint-ignore no-explicit-any
	return function (x: T): any {
		//!! [CORRECTNESS] Type safety lost - needs proper generic constraints
		//-- [LIMITATION] TypeScript can't type heterogeneous function chains, any is authorized
		return fns.reduceRight((acc, fn) => fn(acc), x)
	}
}

//?? compose([double, increment])(5) // 11
//?? [ADVANCED] compose([toString, double])(5) // "10"
//?? [GOTCHA] Functions compose right-to-left, not left-to-right
//?? [MIGRATION] Replace pipe() calls with compose() but reverse the array
```

**Validation & Reporting:**

- Scribe/Prover validates that `//??` examples actually work
- `//--` comments can be extracted for weekly tech debt reports
- `//!!` comments generate critical alerts and block releases
- If an example doesn't work, you get an error with suggestions

**Report Dashboard:**

- 🔴 Critical issues (`//!!`) - Blocks releases
- 🟡 Tech debt (`//--`) - Plan to address
- 🟢 Documented (`//++`) - Good

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

## The Real Power: Codebase Intelligence Graph

Envoy is not just documentation - it's a complete codebase intelligence system. Using the filesystem structure as semantic information, Envoy builds an entire graph of your codebase.

### Semantic File Organization

With one function per file in its own folder as `index.ts`:

- **Folder hierarchy = Code hierarchy** (minimizes cognitive load)
- **Delete folder = Delete function** (perfect modularity)
- **Move folder = Dependencies move with it** (true encapsulation)
- **NO BARREL FILES** = Perfect tree-shaking
- **Semantic folders** (e.g., `monads/`, `define/`) provide type information

### What Envoy Reads

Beyond just TypeScript files, Envoy extracts data from:

- **Git history** - Who wrote what, when, and why
- **deno.jsonc** - Configuration with Envoy comments
- **.editorconfig** - Code style preferences
- **Package files** - Dependencies and versions
- **Test results** - Coverage and pass/fail rates

### The Codebase Dashboard

Envoy generates a complete dashboard showing:

- **File metrics** - Which files are too long?
- **Tech debt tracking** - Where is it? Who created it? How long has it been there?
- **Critical bugs** - Flashing red alerts for `//!!` comments
- **Dependency graph** - What depends on what
- **Temporal analysis** - How the codebase evolved over time
- **Complexity hotspots** - Where refactoring is needed

### HATEOAS Principles

Everything is linked and machine-navigable:

- An AI can traverse the entire codebase graph
- Generate PDF reports automatically
- Email summaries to stakeholders
- Navigate from function to tests to documentation
- Follow the trail of tech debt to its source

### Data Storage Options

The graph can be stored in:

- **Triple store** - For RDF/semantic web integration
- **Temporal database** - For time-travel debugging
- **Vector database** - For AI-powered code search
- **JSON files** - For simple persistence

## Architecture

Pure functional pipeline:

1. **Parse** - TypeScript AST parsing (via @sitebender/parser)
2. **Extract** - Metadata extraction (via @sitebender/parser)
3. **Detect** - Property detection (via @sitebender/parser)
4. **Analyze** - Build codebase graph and relationships
5. **Generate** - Documentation and dashboard generation

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
