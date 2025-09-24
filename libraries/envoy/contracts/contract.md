# Envoy Library Contract v1.0.0

> Last Updated: 2025-01-11

## Purpose

Generate comprehensive documentation from Linguist output. Creates graphs, diagrams, and human-readable docs.

## Public API

### Exported Functions

#### `generateDocumentation`

**Signature:** `(input: ContractOutput<ParsedProject>) => Documentation`

Generate documentation for an entire project from Linguist output

#### `generateFileDocumentation`

**Signature:** `(input: ContractOutput<ParsedFile>) => FileDocumentation`

Generate documentation for a single file from Linguist output

#### `generateGraph`

**Signature:** `(input: ContractOutput<ParsedProject>) => CodebaseGraph`

Generate a dependency graph of the entire codebase

### Exported Types

#### `Documentation`

Complete documentation for a project

**Fields:**

- `projectName: string`
- `files: Map<string, FileDocumentation>`
- `graph: CodebaseGraph`
- `index: SearchIndex`
- `timestamp: number`

#### `FileDocumentation`

Documentation for a single file

**Fields:**

- `filePath: string`
- `description: string`
- `functions: FunctionDoc[]`
- `types: TypeDoc[]`
- `constants: ConstantDoc[]`
- `examples: Example[]`
- `techDebt: TechDebtItem[]`
- `links: Link[]`

#### `EnvoyComment`

Parsed Envoy comment with interpreted syntax

**Fields:**

- `type: 'description' | 'techDebt' | 'help' | 'critical' | 'link'`
- `content: string`
- `lineNumber: number`
- `associatedNode: string`

> **Note:** Envoy interprets comment syntax (//++, //--, etc.) that Linguist provides as raw text

#### `CodebaseGraph`

Dependency and relationship graph of the codebase

**Fields:**

- `nodes: GraphNode[]`
- `edges: GraphEdge[]`
- `clusters: GraphCluster[]`
- `metadata: GraphMetadata`

## Responsibilities

### Envoy Owns

- Envoy comment syntax interpretation
- Documentation generation
- Graph visualization
- Folder hierarchy analysis
- Configuration file reading (deno.jsonc, .editorconfig)
- Markdown/HTML output formatting
- Search index generation

### Envoy Consumes

- Linguist's ContractOutput only
- Raw comment text from Linguist
- AST data from Linguist
- Type information from Linguist

### Envoy Must Never

- ❌ Parsing TypeScript/JSX directly
- ❌ Using TypeScript compiler
- ❌ Using ts-morph
- ❌ Reading source files for parsing
- ❌ Modifying Linguist's output
- ❌ Generating tests
- ❌ Making network requests

## Implementation Rules

### Allowed Operations

- ✅ Import from @sitebender/linguist/exports/types
- ✅ Read configuration files
- ✅ Walk folder hierarchy
- ✅ Generate markdown/HTML
- ✅ Create graphs and diagrams

### Forbidden Operations

- ❌ Import TypeScript compiler
- ❌ Import ts-morph
- ❌ Import from @sitebender/linguist/internal
- ❌ Use regex to parse TypeScript
- ❌ Redefine Linguist's types
- ❌ Access .ts/.tsx files for parsing

## Input Requirements

Every input to Envoy must:

- Must validate contract version
- Must check input.validate() before processing
- Must handle frozen/immutable data
- Must not attempt to modify input

## Validation Layers

### Compile-Time Validation

- TypeScript enforces ContractOutput type
- Cannot import from wrong paths

### Runtime Validation

- Contract version validation
- Input validation check
- Checksum verification

### Test-Time Validation

- No forbidden imports
- No TypeScript parsing
- Contract compliance

## Dependencies

### Allowed dependencies:

- ✅ linguist

### Forbidden dependencies:

- ❌ logician
- ❌ quarrier
- ❌ toolsmith
- ❌ codewright
- ❌ architect
- ❌ formulator
- ❌ agent

### Comment Syntax

Envoy interprets these comment patterns:

- `//++` - Description of function/component/type/constant
- `//--` - Technical debt marker
- `//??` - Help text, examples, gotchas
- `//!!` - Critical problem or warning
- `//>>>` - Link to external resource
- `//` - Regular comment (not included in docs)

---

**This document is auto-generated from contract.json. DO NOT EDIT DIRECTLY.**
