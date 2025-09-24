# Linguist Library Contract v1.0.0

> Last Updated: 2025-01-11

## Purpose

Single source of truth for TypeScript/JSX parsing. Provides normalized AST data to other libraries.

## Public API

### Exported Functions

#### `parseFile`

**Signature:** `(filePath: string) => ContractOutput<ParsedFile>`

Parse a single TypeScript/JSX file and return normalized AST data

#### `parseProject`

**Signature:** `(rootPath: string) => ContractOutput<ParsedProject>`

Parse an entire project and return normalized AST data for all files

#### `parseString`

**Signature:** `(source: string, fileName?: string) => ContractOutput<ParsedFile>`

Parse TypeScript/JSX source code from a string

### Exported Types

#### `ContractOutput`

Wrapper for all Linguist outputs ensuring contract compliance

**Fields:**

- `contractVersion: string`
- `libraryVersion: string`
- `timestamp: number`
- `checksum: string`
- `data: Readonly<T>`
- `validate(): boolean`

#### `ParsedFile`

Normalized representation of a parsed TypeScript/JSX file

**Fields:**

- `filePath: string`
- `functions: ParsedFunction[]`
- `types: ParsedType[]`
- `constants: ParsedConstant[]`
- `imports: ParsedImport[]`
- `exports: ParsedExport[]`
- `comments: ParsedComment[]`

#### `ParsedComment`

Raw comment data without interpretation

**Fields:**

- `text: string`
- `lineNumber: number`
- `columnNumber: number`
- `type: 'line' | 'block' | 'leading' | 'trailing'`
- `associatedNodeId?: string`
- `associatedNodeType?: string`

> **Note:** Linguist does NOT interpret comment syntax (//++, //--, etc). That is Envoy's responsibility.

#### `ParsedFunction`

Normalized function data

**Fields:**

- `id: string`
- `name: string`
- `signature: string`
- `parameters: ParsedParameter[]`
- `returnType: string`
- `isAsync: boolean`
- `isExported: boolean`
- `isDefault: boolean`
- `lineNumber: number`
- `associatedComments: string[]`

#### `ParsedType`

Normalized type/interface data

**Fields:**

- `id: string`
- `name: string`
- `kind: 'type' | 'interface' | 'enum'`
- `definition: string`
- `properties?: ParsedProperty[]`
- `isExported: boolean`
- `lineNumber: number`
- `associatedComments: string[]`

## Responsibilities

### Linguist Owns

- TypeScript compiler interaction
- AST parsing and traversal
- Type extraction and analysis
- Comment extraction (raw text only)
- Import/export analysis
- Function signature parsing

### Linguist Provides

- Normalized, validated data structures
- Immutable, frozen outputs
- Contract-validated responses
- Self-validating checksums

### Linguist Must Never

- ❌ Interpreting Envoy comment syntax
- ❌ Generating documentation
- ❌ Generating tests
- ❌ Making network requests
- ❌ Modifying source files
- ❌ Caching parsed data

## Implementation Rules

### Allowed Internal Operations

- ✅ Import TypeScript compiler
- ✅ Import ts-morph
- ✅ Read file system
- ✅ Use Quarrier for test data generation

### Forbidden Exports

- ❌ Export TypeScript compiler
- ❌ Export ts-morph
- ❌ Export raw AST nodes
- ❌ Allow mutation of output objects
- ❌ Expose internal parsing functions

## Output Requirements

Every output from Linguist must:

- All output objects must be frozen (Object.freeze)
- All output objects must be sealed (Object.seal)
- Include contract version in every response
- Include validation checksum
- Provide self-validation method
- Timestamp every output

## Validation Layers

### Compile-Time Validation

- TypeScript types enforce structure
- Exports folder hides internals

### Runtime Validation

- Contract version checking
- Checksum validation
- Object immutability checks

### Test-Time Validation

- No forbidden exports
- Output immutability
- Contract compliance

## Authorized Consumers

### Allowed to consume Linguist output:

- ✅ envoy
- ✅ logician
- ✅ quarrier

### Forbidden from consuming Linguist output:

- ❌ toolsmith
- ❌ codewright
- ❌ architect
- ❌ formulator
- ❌ agent

---

**This document is auto-generated from contract.json. DO NOT EDIT DIRECTLY.**
