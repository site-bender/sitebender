# @sitebender/arborist

TypeScript/JSX parser using SWC via deno_ast. The single source of truth for AST analysis across the @sitebender ecosystem.

## Purpose

Arborist provides fast, syntax-level parsing for TypeScript and JSX code. It extracts functions, comments, imports, and code structure without semantic type analysis. All other libraries that need AST information use Arborist's normalized outputs.

## Architecture

Arborist uses SWC (via deno_ast) as its parser backend, providing:

- 20-50x faster parsing than TypeScript compiler
- Perfect alignment with Deno's internal parser
- Pure ESM with no Node dependencies
- Precise span and position tracking

## Core API

```typescript
//++ Parses source file using SWC and returns structured data
import parseSourceFile from "@sitebender/arborist/parseSourceFile/index.ts";

//++ Extracts all functions from parsed module
import extractFunctions from "@sitebender/arborist/extractFunctions/index.ts";

//++ Extracts function signature from function IR
import extractSignature from "@sitebender/arborist/extractSignature/index.ts";

//++ Extracts all comments with position data
import extractComments from "@sitebender/arborist/extractComments/index.ts";

//++ Extracts all imports from module
import extractImports from "@sitebender/arborist/extractImports/index.ts";

//++ Analyzes conditional branches for coverage
import analyzeBranches from "@sitebender/arborist/analyzeBranches/index.ts";
```

## Data Structures

### ParsedModule

```typescript
type ParsedModule = {
  program: SwcModule; // SWC AST module
  comments: CommentCollection; // deno_ast comments
  sourceText: SourceText; // Position utilities
  mediaType: MediaType; // File type detection
  specifier: string; // File path or URL
};
```

### FunctionNodeIR

```typescript
type FunctionNodeIR = {
  name: string;
  span: { start: number; end: number };
  isAsync: boolean;
  isGenerator: boolean;
  isArrow: boolean;
  params: Array<{
    name: string;
    optional: boolean;
    typeText?: string;
    span: { start: number; end: number };
  }>;
  returnTypeText?: string;
  typeParams?: Array<{
    name: string;
    constraintText?: string;
    defaultText?: string;
  }>;
};
```

### RawComment

```typescript
type RawComment = {
  kind: "line" | "block";
  text: string; // Content without markers
  fullText: string; // Original with // or /* */
  start: number; // Absolute position
  end: number;
  line: number; // 1-based
  column: number; // 1-based
  nodeId?: string; // Associated function name
};
```

### ImportIR

```typescript
type ImportIR = {
  specifier: string;
  kind: "named" | "default" | "namespace";
  names: Array<{
    imported: string;
    local: string;
  }>;
  span: { start: number; end: number };
};
```

### BranchInfo

```typescript
type BranchInfo = {
  kind: "if" | "ternary" | "logical" | "switch" | "try";
  span: { start: number; end: number };
  consequent?: { start: number; end: number };
  alternate?: { start: number; end: number };
};
```

## Usage Example

```typescript
import parseSourceFile from "@sitebender/arborist/parseSourceFile/index.ts";
import extractFunctions from "@sitebender/arborist/extractFunctions/index.ts";
import extractSignature from "@sitebender/arborist/extractSignature/index.ts";
import extractComments from "@sitebender/arborist/extractComments/index.ts";
import extractImports from "@sitebender/arborist/extractImports/index.ts";
import analyzeBranches from "@sitebender/arborist/analyzeBranches/index.ts";

const specifier = "/path/to/file.ts";
const source = await Deno.readTextFile(specifier);

// Parse with SWC
const parsed = parseSourceFile(specifier, source);

// Extract structured data
const comments = extractComments(parsed);
const functions = extractFunctions(parsed.program, parsed.sourceText);
const signatures = functions.map((fn) =>
  extractSignature(fn, parsed.sourceText),
);
const imports = extractImports(parsed.program, parsed.sourceText);
const branches = analyzeBranches(parsed.program, parsed.sourceText);
```

## Integration Points

### Envoy

- Uses Arborist for all TypeScript parsing
- Receives structured comments for documentation
- Gets function signatures for API docs
- Never parses TypeScript directly

### Auditor

- Uses branch analysis for coverage mapping
- Gets function signatures for test generation
- Receives parameter types for test data
- Never uses TypeScript compiler directly

### Quarrier

- Gets type information for generator creation
- Uses parameter types for data generation
- Receives constraint data for bounded types
- Never parses source code directly

## Performance

SWC parsing provides:

- Small files (10-50 functions): <10ms
- Medium files (100-500 functions): <50ms
- Large files (1000+ functions): <200ms

Compare to TypeScript compiler:

- 20-50x faster parsing
- Minimal memory footprint
- No type checking overhead

## Dependency

Arborist depends on deno_ast (pinned version):

```typescript
import {
  parseModule,
  MediaType,
  SourceText,
} from "https://deno.land/x/deno_ast@0.34.4/mod.ts";
```

This is the ONLY external dependency allowed in the entire @sitebender ecosystem (replacing the TypeScript compiler dependency).

## Division of Labor

### Arborist Provides

- Fast syntax-level parsing
- Span-accurate position data
- Comment extraction with locations
- Import/export analysis
- Branch enumeration
- Function discovery

### Arborist Does NOT Provide

- Semantic type analysis
- Type inference
- Symbol resolution
- Cross-file analysis
- Comment interpretation (that's Envoy's job)
- Test generation (that's Auditor's job)

## Media Type Support

```typescript
// Supported file types
.ts   → TypeScript
.tsx  → Tsx
.js   → JavaScript
.jsx  → Jsx
.mts  → Mts
.cts  → Cts
.mjs  → Mjs
.cjs  → Cjs
```

## Caching Strategy

```typescript
// Content-addressed caching
const cacheKey = await crypto.subtle.digest("SHA-256", encoder.encode(source));

// Batch parsing for performance
const results = await parseMany(files);
```

## Design Principles

1. **Syntax First** - Structure over semantics
2. **Speed Matters** - Parse time affects developer experience
3. **Pure Functions** - No mutations, no side effects
4. **Direct Exports** - No barrel files
5. **Single Responsibility** - Parse, don't interpret

---

_"Parse fast, fail fast, move fast."_
