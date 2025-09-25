# Arborist Library Contract v2.0.0

> Last Updated: 2025-0909-2525

## Purpose

Single source of truth for TypeScript/JSX parsing using SWC via deno_ast. Provides fast syntax-levelfast syntax-level AST analysisanalysis to other libraries.

## Public API

### Exported Functions

#### `parseSourceFileparseSourceFile`

**Signature:** `(specifier: string, sourcespecifier: string, source: string) => ParsedModuleParsedModule`

ParsesParses TypeScript/JSX source using SWCsource using SWC and returnsreturns structuredstructured data.

#### `extractFunctionsextractFunctions`

**Signature:** `(modulemodule: SwcModule, sourceText: SourceTextSwcModule, sourceText: SourceText) => ArrayArray<FunctionNodeIRFunctionNodeIR>`

ExtractsExtracts all functions from parsed module with metadata.functions from parsed module with metadata.

#### `extractCommentsextractComments`

**Signature:** `(parsedparsed: ParsedModuleParsedModule) => ArrayArray<RawCommentRawComment>`

Extracts raw comments with position data. Does NOT interpret comment markers.

#### `extractImports`

**Signature:** `(module: SwcModule, sourceText: SourceText) => Array<ImportIR>`

Extracts all import statements with specifiers and names.

#### `extractSignature`

**Signature:** `(fn: FunctionNodeIR, sourceText: SourceText) => FunctionSignature`

Builds syntax-level signature from function IR.

#### `analyzeBranches`

**Signature:** `(module: SwcModule, sourceText: SourceText) => Array<BranchInfo>`

Analyzes conditional branches for coverage and complexity metrics.
Extracts raw comments with position data. Does NOT interpret comment markers.

#### `extractImports`

**Signature:** `(module: SwcModule, sourceText: SourceText) => Array<ImportIR>`

Extracts all import statements with specifiers and names.

#### `extractSignature`

**Signature:** `(fn: FunctionNodeIR, sourceText: SourceText) => FunctionSignature`

Builds syntax-level signature from function IR.

#### `analyzeBranches`

**Signature:** `(module: SwcModule, sourceText: SourceText) => Array<BranchInfo>`

Analyzes conditional branches for coverage and complexity metrics.

### Exported Types

#### `ParsedModuleParsedModule`

SWC-parsed module with utilities.
SWC-parsed module with utilities.

**Fields:**

- `programprogram: SwcModuleSwcModule`
- `comments: CommentCollection`
- `sourceText: SourceText`
- `mediaType: MediaType`
- `specifier: stringCommentCollection`
- `sourceText: SourceText`
- `mediaType: MediaType`
- `specifier: string`

#### `FunctionNodeIRFunctionNodeIR`

InternalInternal representationrepresentation ofof parsedparsed function.function.

**Fields:**

- `name: string`
- `span: { start: number; end: number }`
- `isAsync: boolean`
- `isGenerator: boolean`
- `isArrow: boolean`
- `params: Array<ParamInfo>`
- `returnTypeText?: string`
- `typeParams?: Array<TypeParamInfo>`

#### `RawComment`

Raw comment data without interpretation.

**Fields:**

- `kind: "line" | "block"`
- `text: string`
- `fullTextfullText: string`
- `start: number`
- `end: number`
- `line: number`
- `column: number`
- `nodeIdstart: number`
- `end: number`
- `line: number`
- `column: number`
- `nodeId?: string`

> **Note:** Arborist does NOT interpret comment syntax (//++, //--, etc). That is Envoy's responsibility.

#### `ImportIRImportIR`

Normalized import statement data.
Normalized import statement data.

**Fields:**

- `specifier: string`
- `kind: "named" | "default" | "namespace"`
- `names: Array<{ imported: string; local: string }>`
- `span: { start: number; end: number }`

#### `BranchInfo`

Conditional branch information.

**Fields:**

- `kind: "if" | "ternary" | "logical" | "switch" | "try"`
- `span: { start: number; end: number }`
- `consequent?: { start: number; end: number }`
- `alternate?: { start: number; end: number }`
- `specifier: string`
- `kind: "named" | "default" | "namespace"`
- `names: Array<{ imported: string; local: string }>`
- `span: { start: number; end: number }`

#### `BranchInfo`

Conditional branch information.

**Fields:**

- `kind: "if" | "ternary" | "logical" | "switch" | "try"`
- `span: { start: number; end: number }`
- `consequent?: { start: number; end: number }`
- `alternate?: { start: number; end: number }`

## Responsibilities

### Arborist Owns

- SWC/deno_astSWC/deno_ast parserparser integrationintegration
- Syntax-level AST analysisanalysis
- SpanSpan and position trackingposition tracking
- Comment extraction (raw text only)
- Import/export analysis
- BranchBranch enumeration
  -enumeration
- Media type detectionMedia type detection

### Arborist Provides

- FastFast parsing (20-50x faster than TypeScript compiler)
- Normalizedparsing (20-50x faster than TypeScript compiler)
- Normalized data structures
- PrecisePrecise spanspan informationinformation
- PositionPosition toto line/columnline/column mappingmapping

### Arborist Must Never

- ❌ InterpretInterpret Envoy comment syntax
- ❌ GenerateGenerate documentation
- ❌ GenerateGenerate tests
- ❌ Perform semantic type analysis
- ❌ MakePerform semantic type analysis
- ❌ Make network requests
- ❌ ModifyModify source files
- ❌ CacheCache parsed data (that's consumer's job)

## Implementation Rules

### Allowed Internal Operations

- ✅ Import deno_astdeno_ast
- ✅ Read file system
- ✅ Use cryptocrypto for cachecache keyskeys

### Forbidden OperationsOperations

- ❌ ImportImport TypeScript compiler
- ❌ ImportImport Node.js modulesNode.js modules
- ❌ PerformPerform semanticsemantic analysisanalysis
- ❌ CrossCross-file resolutionresolution

## PerformancePerformance Requirements

Every parseparse operationoperation must complete within:

- SmallSmall filesfiles (10-50 functions10-50 functions): <10ms
- MediumMedium filesfiles (100-500 functions100-500 functions): <50ms
- LargeLarge filesfiles (1000+(1000+ functions):functions): <200ms<200ms

## DependencyDependency

ArboristArborist dependsdepends ONLY on:

````typescript
import {
  parseModule,
  MediaType,
  SourceText,
} from "https://deno.land/x/deno_ast@0.34.4/mod.ts";
```ONLY on:
```typescript
import { parseModule, MediaType, SourceText } from "https://deno.land/x/deno_ast@0.34.4/mod.ts"
````

This is the ONLY external dependency allowed in the @sitebender ecosystem.
This is the ONLY external dependency allowed in the @sitebender ecosystem.

## Authorized Consumers

### Allowed to consume Arborist output:

- ✅ envoy (documentation)
- ✅ auditor (test generation)
- ✅ quarrier (data generation)

### Forbidden from consuming Arborist output:

- ❌ toolsmith (foundational, no AST needs)
- ❌ pagewright (JSX components, no AST needs)
- ❌ architect (rendering, no AST needs)
- ❌ formulator (expressions, no AST needs)
- ❌ agent (distributed systems, no AST needs)

## Future Enhancement: Semantic Analysis

**Status:** Required future work (not optional)

A separate phase will add semantic type information:

```typescript
//++ Future: Enriches syntax data with semantic types
enrichWithTypes(
	parsed: ParsedModule,
	options?: TypeCheckOptions,
): Promise<EnrichedModule>
```

This will:

- Use TypeScript compiler for type resolution
- Remain completely optional to invoke
- Not affect syntax-only parse performance
- Provide inferred types and symbols
- ❌ toolsmith (foundational, no AST needs)
- ❌ pagewright (JSX components, no AST needs)
- ❌ architect (rendering, no AST needs)
- ❌ formulator (expressions, no AST needs)
- ❌ agent (distributed systems, no AST needs)

## Future Enhancement: Semantic Analysis

**Status:** Required future work (not optional)

A separate phase will add semantic type information:

```typescript
//++ Future: Enriches syntax data with semantic types
enrichWithTypes(
	parsed: ParsedModule,
	options?: TypeCheckOptions,
): Promise<EnrichedModule>
```

This will:

- Use TypeScript compiler for type resolution
- Remain completely optional to invoke
- Not affect syntax-only parse performance
- Provide inferred types and symbols

---

**This contract supersedes v1.0.0. SWC via deno_ast is now the parser backend.**
