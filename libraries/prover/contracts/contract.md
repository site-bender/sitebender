# Prover Library Contract v1.0.0

> Last Updated: 2025-01-11

## Purpose

Revolutionary test generator achieving 100% coverage automatically. Generates comprehensive test suites from Parser output.

## Public API

### Exported Functions

#### `generateTests`

**Signature:** `(input: ContractOutput<ParsedProject>) => TestSuite`

Generate comprehensive tests for an entire project from Parser output

#### `generateFileTests`

**Signature:** `(input: ContractOutput<ParsedFile>) => FileTestSuite`

Generate tests for a single file from Parser output

#### `generatePropertyTests`

**Signature:** `(input: ContractOutput<ParsedFunction>, properties: PropertySpec[]) => PropertyTestSuite`

Generate property-based tests for a function

#### `analyzeCoverage`

**Signature:** `(input: ContractOutput<ParsedFile>) => CoverageReport`

Analyze code paths and branch coverage requirements

### Exported Types

#### `TestSuite`

Complete test suite for a project

**Fields:**

- `projectName: string`
- `files: Map<string, FileTestSuite>`
- `coverage: CoverageReport`
- `propertyTests: PropertyTestSuite[]`
- `timestamp: number`

#### `FileTestSuite`

Test suite for a single file

**Fields:**

- `filePath: string`
- `unitTests: UnitTest[]`
- `propertyTests: PropertyTest[]`
- `edgeCases: EdgeCaseTest[]`
- `coverage: FileCoverage`

#### `PropertyTest`

Property-based test definition

**Fields:**

- `property: string`
- `description: string`
- `generator: GeneratorSpec`
- `predicate: string`
- `numTests: number`

#### `CoverageReport`

Coverage analysis for code

**Fields:**

- `branches: BranchCoverage[]`
- `lines: LineCoverage[]`
- `functions: FunctionCoverage[]`
- `percentage: number`
- `uncoveredPaths: CodePath[]`

> **Note:** Prover ensures 100% coverage or explicit ignores with reasons

## Responsibilities

### Prover Owns

- Test generation logic
- Property-based testing strategies
- Coverage analysis and validation
- Edge case detection
- Test optimization
- Algebraic law verification

### Prover Consumes

- Parser's ContractOutput only
- AST data from Parser
- Type information from Parser
- Function signatures from Parser
- Foundry's generated test data

### Prover Must Never

- ❌ Parsing TypeScript/JSX directly
- ❌ Using TypeScript compiler
- ❌ Using ts-morph
- ❌ Reading source files for parsing
- ❌ Modifying Parser's output
- ❌ Generating documentation
- ❌ Making network requests

## Implementation Rules

### Allowed Operations

- ✅ Import from @sitebender/parser/exports/types
- ✅ Import from @sitebender/foundry/exports
- ✅ Generate test code
- ✅ Analyze AST for branches
- ✅ Detect mathematical properties

### Forbidden Operations

- ❌ Import TypeScript compiler
- ❌ Import ts-morph
- ❌ Import from @sitebender/parser/internal
- ❌ Access .ts/.tsx files for parsing
- ❌ Generate documentation

## Input Requirements

Every input to Prover must:

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
- 100% coverage achieved

## Dependencies

### Allowed dependencies:

- ✅ parser
- ✅ foundry

### Forbidden dependencies:

- ❌ envoy
- ❌ toolkit
- ❌ components
- ❌ engine
- ❌ maths
- ❌ mesh

---

**This document is auto-generated from contract.json. DO NOT EDIT DIRECTLY.**
