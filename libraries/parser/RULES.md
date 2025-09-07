# Parser Development Rules

## The Sacred Structure

### Functions: One Per File
```
✅ CORRECT:
parseSourceFile/index.ts
export default function parseSourceFile(...) { ... }

❌ WRONG:
parsers.ts
export function parseSourceFile() { }
export function parseFunction() { }  // NO!
```

### NO BARREL FILES
```
❌ WRONG:
// index.ts
export { default as parseSourceFile } from "./parseSourceFile/index.ts"
export { default as extractSignature } from "./extractSignature/index.ts"

✅ CORRECT:
// Import directly from where it lives
import parseSourceFile from "@sitebender/parser/parseSourceFile/index.ts"
```

### Types: Grouped by Scope
```
✅ CORRECT:
// types/index.ts - Named exports for shared types
export type FunctionSignature = { ... }
export type TypeInfo = { ... }

// parseSourceFile/types/index.ts - Local types
export type ParseOptions = { ... }
```

### Constants: Same as Types
```
✅ CORRECT:
// constants/index.ts - Named exports for shared constants
export const MAX_PARSE_DEPTH = 100
export const DEFAULT_TARGET = "ES2022"

// If only used in one function, keep it there:
// parseSourceFile/index.ts
const SCRIPT_KIND = ts.ScriptKind.TS
```

## Naming Rules

### NO ABBREVIATIONS
```
❌ WRONG:
sig, param, gen, fn, impl, spec, config, deps, ctx, auth, prop, decl

✅ CORRECT:
signature, parameter, generate, function, implementation, 
specification, configuration, dependencies, context, 
authentication, property, declaration
```

### EXCEPTIONS (Well-Known Terms)
```
✅ ALLOWED:
AST, IR, API, JSON, XML, HTTP, URL, URI, TS (TypeScript)
```

### Function Names: Descriptive Verbs
```
✅ CORRECT:
parseSourceFile
extractSignature
detectPurity
analyzeBranches

❌ WRONG:
parse  // Parse what?
extract // Extract what?
detect // Detect what?
analyze // Analyze what?
```

### Folder Names: camelCase
```
✅ CORRECT:
parseSourceFile/
extractSignature/
detectPurity/

❌ WRONG:
parse-source-file/
ParseSourceFile/
parse_source_file/
```

## Pure Functional Rules

### Named Functions for ALL Function Exports
```
✅ CORRECT (curried with named functions all the way):
export default function parseSourceFile(options: ParseOptions) {
    return function (source: string) {
        // ...
    }
}

❌ WRONG:
export default (options: ParseOptions) => (source: string) => {
    // No arrow functions for ANY default exports
}

✅ ARROW FUNCTIONS ONLY FOR:
// 1. One-line conditionals
const result = isValid ? () => ok(value) : () => err(error)

// 2. Lambdas passed to toolkit functions
import map from "@sitebender/toolkit/simple/array/map/index.ts"
import filter from "@sitebender/toolkit/simple/array/filter/index.ts"

const signatures = map((node: ASTNode) => extractSignature(node))(nodes)
const publicFunctions = filter((sig: FunctionSignature) => sig.isExported)(signatures)
```

### No Mutations
```
❌ WRONG:
let nodes = []
for (const child of ast.children) {
    nodes.push(processNode(child))
}

❌ ALSO WRONG (using JS methods directly):
const nodes = ast.children.map(processNode)  // JS method - not FP!

✅ CORRECT (using toolkit wrappers):
import map from "@sitebender/toolkit/simple/array/map/index.ts"

const nodes = map(processNode)(ast.children)
```

**IMPORTANT:** Always use @sitebender/toolkit functions instead of JavaScript's built-in methods. The toolkit provides FP-style curried wrappers that maintain purity and get optimized.

### No Classes
```
❌ WRONG:
class Parser {
    parse(): AST { }
}

✅ CORRECT:
type Parser = {
    readonly parse: (source: string) => Result<AST, ParseError>
}
```

### Result Monad for Errors
```
❌ WRONG:
function parseSourceFile(source: string): AST | null {
    if (invalid) return null
    // or
    if (invalid) throw new Error()
}

✅ CORRECT:
function parseSourceFile(source: string): Result<AST, ParseError> {
    if (invalid) return err({ type: "InvalidSyntax", line })
    return ok(ast)
}
```

## Import Rules

### Direct Imports Only
```
✅ CORRECT:
import parseSourceFile from "@sitebender/parser/parseSourceFile/index.ts"
import { FunctionSignature, TypeInfo } from "@sitebender/parser/types/index.ts"

❌ WRONG:
import { parseSourceFile, extractSignature } from "@sitebender/parser"
```

### Relative Imports Within Library
```
✅ CORRECT (within parser):
import type { FunctionSignature } from "../../types/index.ts"
import validateNode from "../validateNode/index.ts"

❌ WRONG (within parser):
import type { FunctionSignature } from "@sitebender/parser/types/index.ts"
```

## File Structure

### Every Function Gets a Folder
```
parseSourceFile/
├── index.ts                    # The function
├── createCompilerHost/         # Helper function
│   └── index.ts
├── validateOptions/            # Another helper
│   └── index.ts
├── types/
│   └── index.ts               # Local types
└── constants/
    └── index.ts               # Local constants
```

### Types Hierarchy
```
Place types at the lowest common ancestor:
- Used in one function? → function/types/index.ts
- Used in one module? → module/types/index.ts  
- Used everywhere? → src/types/index.ts
```

## Documentation

### The Three-Tier Comment System

We use a categorized comment system that enables both documentation generation (via Scribe) and codebase analytics.

**Note:** Regular comments (`//` and `/* */`) are still allowed for implementation details and will be ignored by Scribe and analytics scripts.

#### 1. Descriptive Comments (`//++` or `/*++`)
Place **above** the function/component. Short description of what it does.
```typescript
//++ Parses a TypeScript source file into an AST
export default function parseSourceFile(source: string) { }
```

#### 2. Tech Debt Comments (`//--` or `/*--`)
Place **inside** the function where rules are broken. Must explain WHY.
```typescript
export default function processData(data: unknown) {
	//-- Using any type here because third-party API returns inconsistent types
	const result = data as any
	
	//-- Using for loop for performance - processing 1M+ items
	for (let i = 0; i < items.length; i++) {
		// Performance critical path
	}
}
```

**IMPORTANT:** Tech debt is only allowed with explicit approval and must have a reason!

#### 3. Example Comments (`//??` or `/*??`)
Place **below** the function (after blank line). Show usage examples.
```typescript
//++ Adds two numbers together
export default function add(a: number) {
	return function (b: number) {
		return a + b
	}
}

//?? add(5)(3) // Returns: 8
//?? pipe([add(10), add(5)])(0) // Returns: 15
```

#### Complete Example with All Comment Types

```typescript
//++ Parses and validates configuration files
export default function parseConfig(filePath: string) {
	// Regular comment: Check if file exists first
	if (!fileExists(filePath)) {
		return err({ type: "FileNotFound", filePath })
	}
	
	//-- Using synchronous file read for config files - they're small and loaded once at startup
	const content = readFileSync(filePath)
	
	// Parse the JSON content
	const parsed = parseJson(content)
	
	return parsed
}

//?? parseConfig("./config.json") // Returns: Result<Config, ParseError>
//?? parseConfig("./settings.json") // Returns config or error
```

### Why This System?

1. **Scribe Integration** - Automatically extracts documentation
2. **Dashboard Analytics** - Can report on:
   - Number of tech debt instances
   - Examples per function (min/max/mean/median)
   - Functions with tech debt
3. **Clear Categories** - Easy to grep/search for specific comment types
4. **Enforcement** - Makes tech debt visible and trackable

### NO Traditional JSDoc
```
❌ WRONG:
/**
 * @param foo The foo parameter
 * @returns The result
 */
```

Scribe extracts parameter info from type signatures!

## Parser-Specific Rules

### Shared Types Are Sacred
```
✅ CORRECT:
// FunctionSignature is used by prover, scribe, and foundry
// Changes must be coordinated with all libraries
export type FunctionSignature = {
    // ...
}

❌ WRONG:
// Changing shared types without communication
export type FunctionSignature = {
    newField: string  // Added without telling anyone!
}
```

### TypeScript Compiler Usage
```
✅ CORRECT:
// Only parser uses TypeScript compiler directly
import * as ts from "npm:typescript@5.7.2"

❌ WRONG (in prover/scribe/foundry):
// Other libraries should NEVER use TypeScript compiler
import * as ts from "npm:typescript"  // Use parser instead!
```

### Coordinate All Changes
```
BEFORE adding/changing:
1. Check if prover needs it
2. Check if scribe needs it
3. Check if foundry needs it
4. Communicate the change

EXAMPLE:
"Adding 'complexity' field to FunctionSignature for scribe's Big-O notation"
```

## Testing

### Test Parsing Accuracy
```
✅ CORRECT:
test("extracts all function parameters", ...)
test("detects optional parameters", ...)
test("handles generic constraints", ...)

❌ WRONG:
test("calls TypeScript API correctly", ...)  // Implementation detail
```

### Test All Libraries Can Use It
```
✅ CORRECT:
test("signature works for prover test generation", ...)
test("signature works for scribe documentation", ...)
test("type info works for foundry generators", ...)
```

## Remember

1. **NO BARREL FILES** - Direct imports only
2. **NO ABBREVIATIONS** - Clarity over brevity
3. **NO CLASSES** - Pure functions only
4. **NO MUTATIONS** - Immutable data
5. **NO NULL/UNDEFINED** - Result monad
6. **NO ARROW FUNCTIONS** - Except for lambdas and one-liners
7. **NO FOR LOOPS** - Functional operations
8. **NO JSDoc** - Single-line comments only
9. **COORDINATE CHANGES** - Parser serves multiple libraries

When in doubt, ask yourself:
- Is this pure?
- Is this immutable?
- Will this break prover/scribe/foundry?
- Have I communicated this change?

If any answer is "no", refactor.