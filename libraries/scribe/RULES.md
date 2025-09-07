# Scribe Development Rules

## The Sacred Structure

### Functions: One Per File
```
✅ CORRECT:
generateDocumentation/index.ts
export default function generateDocumentation(...) { ... }

❌ WRONG:
generators.ts
export function generateDocumentation() { }
export function formatMarkdown() { }  // NO!
```

### NO BARREL FILES
```
❌ WRONG:
// index.ts
export { default as generateDocumentation } from "./generateDocumentation/index.ts"
export { default as formatMarkdown } from "./formatMarkdown/index.ts"

✅ CORRECT:
// Import directly from where it lives
import generateDocumentation from "@sitebender/scribe/generateDocumentation/index.ts"
```

### Types: Grouped by Scope
```
✅ CORRECT:
// types/index.ts - Named exports for shared types
export type Documentation = { ... }
export type FormatOptions = { ... }

// generateDocumentation/types/index.ts - Local types
export type GenerationConfig = { ... }
```

### Constants: Same as Types
```
✅ CORRECT:
// constants/index.ts - Named exports for shared constants
export const DEFAULT_FORMAT = "markdown"
export const MAX_EXAMPLE_LENGTH = 1000

// If only used in one function, keep it there:
// formatMarkdown/index.ts
const HEADING_LEVEL = 2
```

## Naming Rules

### NO ABBREVIATIONS
```
❌ WRONG:
doc, gen, fmt, param, config, desc, prop, fn, sig, ex

✅ CORRECT:
documentation, generate, format, parameter, configuration,
description, property, function, signature, example
```

### EXCEPTIONS (Well-Known Terms)
```
✅ ALLOWED:
API, JSON, HTML, MD (Markdown), URL, URI, AST
```

### Function Names: Descriptive Verbs
```
✅ CORRECT:
generateDocumentation
formatMarkdown
extractExamples
detectProperties

❌ WRONG:
generate  // Generate what?
format // Format what?
extract // Extract what?
detect // Detect what?
```

### Folder Names: camelCase
```
✅ CORRECT:
generateDocumentation/
formatMarkdown/
extractExamples/

❌ WRONG:
generate-documentation/
GenerateDocumentation/
generate_documentation/
```

## Pure Functional Rules

### Named Functions for ALL Function Exports
```
✅ CORRECT (curried with named functions all the way):
export default function generateDocumentation(options: FormatOptions) {
    return function (signature: FunctionSignature) {
        // ...
    }
}

❌ WRONG:
export default (options: FormatOptions) => (signature: FunctionSignature) => {
    // No arrow functions for ANY default exports
}

✅ ARROW FUNCTIONS ONLY FOR:
// 1. One-line conditionals
const result = hasExamples ? () => ok(formatted) : () => err(error)

// 2. Lambdas passed to toolkit functions
import map from "@sitebender/toolkit/simple/array/map/index.ts"
import filter from "@sitebender/toolkit/simple/array/filter/index.ts"

const examples = map((test: TestCase) => formatExample(test))(tests)
const publicDocs = filter((doc: Documentation) => doc.isPublic)(docs)
```

### No Mutations
```
❌ WRONG:
let sections = []
for (const property of properties) {
    sections.push(formatProperty(property))
}

❌ ALSO WRONG (using JS methods directly):
const sections = properties.map(formatProperty)  // JS method - not FP!

✅ CORRECT (using toolkit wrappers):
import map from "@sitebender/toolkit/simple/array/map/index.ts"

const sections = map(formatProperty)(properties)
```

**IMPORTANT:** Always use @sitebender/toolkit functions instead of JavaScript's built-in methods. The toolkit provides FP-style curried wrappers that maintain purity and get optimized.

### No Classes
```
❌ WRONG:
class DocumentGenerator {
    generate(): Documentation { }
}

✅ CORRECT:
type DocumentGenerator = {
    readonly generate: (signature: FunctionSignature) => Result<Documentation, GenerationError>
}
```

### Result Monad for Errors
```
❌ WRONG:
function generateDocumentation(signature: FunctionSignature): Documentation | null {
    if (invalid) return null
    // or
    if (invalid) throw new Error()
}

✅ CORRECT:
function generateDocumentation(signature: FunctionSignature): Result<Documentation, GenerationError> {
    if (invalid) return err({ type: "InvalidSignature", reason })
    return ok(documentation)
}
```

## Import Rules

### Direct Imports Only
```
✅ CORRECT:
import generateDocumentation from "@sitebender/scribe/generateDocumentation/index.ts"
import { Documentation, FormatOptions } from "@sitebender/scribe/types/index.ts"

❌ WRONG:
import { generateDocumentation, formatMarkdown } from "@sitebender/scribe"
```

### Relative Imports Within Library
```
✅ CORRECT (within scribe):
import type { Documentation } from "../../types/index.ts"
import formatSection from "../formatSection/index.ts"

❌ WRONG (within scribe):
import type { Documentation } from "@sitebender/scribe/types/index.ts"
```

## File Structure

### Every Function Gets a Folder
```
generateDocumentation/
├── index.ts                    # The function
├── extractProperties/          # Helper function
│   └── index.ts
├── formatSections/             # Another helper
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

We use a categorized comment system that Scribe processes for documentation generation.

**Note:** Regular comments (`//` and `/* */`) are still allowed for implementation details and will be ignored by Scribe and analytics scripts.

#### 1. Descriptive Comments (`//++` or `/*++`)
Place **above** the function/component. Short description of what it does.
```typescript
//++ Generates documentation for a TypeScript function
export default function generateDocumentation(signature: FunctionSignature) { }
```

#### 2. Tech Debt Comments (`//--` or `/*--`)
Place **inside** the function where rules are broken. Must explain WHY.
```typescript
export default function parseComplexType(type: unknown) {
	//-- Using any cast - TypeScript compiler API returns untyped nodes
	const node = type as any
	
	//-- Recursive descent can stack overflow on deeply nested generics
	if (depth > 100) return "..."
}
```

**IMPORTANT:** Tech debt is only allowed with explicit approval and must have a reason!

#### 3. Example Comments (`//??` or `/*??`)
Place **below** the function (after blank line). Show usage examples.
```typescript
//++ Extracts function signature from AST node
export default function extractSignature(node: AstNode) {
	// Implementation
}

//?? extractSignature(functionNode) // Returns: { name: "add", parameters: [...] }
//?? extractSignature(arrowNode) // Returns: { name: "anonymous", ... }
```

### Why This System?

**WE ARE SCRIBE!** We process these comments to:
1. Extract descriptions from `//++` comments
2. Document tech debt from `//--` comments  
3. Include examples from `//??` comments
4. Generate analytics dashboards showing:
   - Tech debt hotspots
   - Documentation coverage
   - Example completeness

### NO Traditional JSDoc
```
❌ WRONG:
/**
 * @param signature The function signature
 * @returns Documentation string
 */
```

We extract parameter info from type signatures!

## Scribe-Specific Rules

### Use Parser for ALL TypeScript Analysis
```
✅ CORRECT:
import parseSourceFile from "@sitebender/parser/parseSourceFile/index.ts"
import extractSignature from "@sitebender/parser/extractSignature/index.ts"

❌ WRONG:
// Never parse TypeScript directly in scribe
import * as ts from "npm:typescript"  // NO! Use parser!
```

### Use Foundry for Examples
```
✅ CORRECT:
import generatePerson from "@sitebender/foundry/fake/generatePerson/index.ts"
import generateInteger from "@sitebender/foundry/arbitrary/generateInteger/index.ts"

// Generate realistic examples for documentation
const example = generatePerson(seed)

❌ WRONG:
// Don't hardcode examples
const example = { name: "John Doe", age: 30 }  // Use foundry!
```

### Documentation Formats
```
✅ CORRECT:
// Support multiple output formats
export type FormatType = "markdown" | "html" | "json"

// Each format gets its own formatter function
formatMarkdown/index.ts
formatHTML/index.ts
formatJSON/index.ts
```

### Extract From Tests
```
✅ CORRECT:
// Find and parse test files for examples
import findTestFiles from "./findTestFiles/index.ts"
import extractTestCases from "./extractTestCases/index.ts"

❌ WRONG:
// Don't ignore the wealth of examples in tests
// Tests are documentation!
```

## Testing

### Test Documentation Quality
```
✅ CORRECT:
test("includes all function parameters", ...)
test("detects and documents purity", ...)
test("formats examples correctly", ...)

❌ WRONG:
test("calls formatter with right args", ...)  // Implementation detail
```

### Test Integration
```
✅ CORRECT:
test("uses parser for signature extraction", ...)
test("uses foundry for example generation", ...)
```

## Remember

1. **NO BARREL FILES** - Direct imports only
2. **NO ABBREVIATIONS** - Clarity over brevity
3. **NO CLASSES** - Pure functions only
4. **NO MUTATIONS** - Immutable data
5. **NO NULL/UNDEFINED** - Result monad
6. **NO ARROW FUNCTIONS** - Except for lambdas and one-liners
7. **NO FOR LOOPS** - Functional operations
8. **NO JSDoc** - We ARE the documentation generator!
9. **USE PARSER** - Never parse TypeScript directly
10. **USE FOUNDRY** - For realistic examples

When in doubt, ask yourself:
- Is this pure?
- Is this immutable?
- Should parser handle this?
- Could foundry generate better examples?

If any answer suggests improvement, refactor.