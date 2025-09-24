# @sitebender/linguist

> Shared TypeScript AST parsing and code analysis for the @sitebender ecosystem. Zero dependencies (except TypeScript compiler). Zero duplication. Maximum coordination.

## Current State: 20% Complete

**WARNING: This library is NOT production-ready. It's a proof of concept with aspirational documentation.**

### What Actually Works

- ✅ `parseSourceFile` - Parses TypeScript files into AST
- ✅ `extractFunctions` - Finds functions in AST
- ✅ `extractSignature` - Extracts basic signatures
- ✅ `extractComments` - Gets raw comments from source
- ⚠️ `detectProperties` - Partial (async/generator/curried work, purity detection is weak)

### What Doesn't Exist Yet

- ❌ `analyzeBranches` - Not implemented
- ❌ `extractTypes` - Not implemented
- ❌ `extractImports` - Not implemented
- ❌ Integration with other libraries - Zero imports/exports
- ❌ Test coverage - Only 1 test file, ~10% coverage

## Purpose (ASPIRATIONAL)

Linguist WILL BE the **single source of truth** for TypeScript code analysis across all @sitebender libraries. It WILL eliminate the 95% code duplication between envoy and logician, while providing consistent type understanding for quarrier.

**CURRENT REALITY:** Linguist is orphaned code that no other library uses yet.

## Core Responsibilities

1. **TypeScript AST Parsing** - Using TypeScript compiler API
2. **Function Signature Extraction** - Consistent across all libraries
3. **Type Information Analysis** - Parameters, returns, generics
4. **Property Detection** - Purity, currying, async, generator
5. **Branch Analysis** - For coverage testing
6. **Comment Extraction** - Raw comments with node association
7. **Code Complexity Analysis** - Big-O detection (future)

## Integration with Other Libraries

### How Linguist Serves Each Library

```
                    @sitebender/linguist
                   (TypeScript AST parsing)
                           ↓
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                  ↓
@sitebender/logician  @sitebender/envoy   @sitebender/quarrier
  (test generation)   (documentation)    (data generation)
        ↓                  ↓                  ↓
        └──────────────────┼──────────────────┘
                           ↓
                    Your TypeScript Code
                    (100% tested & documented)
```

### What Each Library Gets from Linguist

#### Logician Gets:

- Function signatures for test generation
- Branch information for coverage analysis
- Type constraints for edge case generation
- Purity/currying detection for property tests
- Parameter types for appropriate test data

#### Envoy Gets:

- Function signatures for documentation
- Type information for API docs
- Purity/currying/async properties
- Raw comments with node associations
- Comment extraction (leading/trailing)
- Complexity analysis for docs
- Generic constraints for examples

#### Quarrier Gets:

- Type information for generator creation
- Constraint analysis for data bounds
- Interface/type definitions for record generation
- Union/intersection types for variant generation

## Coordination Protocol for AI Agents

### When Working on Linguist

**BEFORE making changes:**

1. Check if the change affects the shared `FunctionSignature` type
2. Consider impact on logician's test generation
3. Consider impact on envoy's documentation
4. Consider impact on quarrier's data generation

**COMMUNICATE these needs:**

- "I need to add a `complexity` field to FunctionSignature for envoy"
- "I'm extracting branch analysis from logician into linguist"
- "I need to add literal type detection for quarrier generators"

### When Working on Logician

**TELL linguist team:**

- What parsing functionality you need extracted
- What property detection you're duplicating
- What branch analysis patterns you need
- What type constraints affect test generation

**USE linguist for:**

- All TypeScript parsing (no local TypeScript compiler usage)
- Function signature extraction
- Property detection (purity, currying)
- Branch analysis

### When Working on Envoy

**TELL linguist team:**

- What documentation metadata you need
- What code analysis you're implementing
- What property detection you need
- What complexity analysis patterns you find

**USE linguist for:**

- All TypeScript parsing (no local TypeScript compiler usage)
- Function signature extraction
- Property detection
- AST traversal utilities

### When Working on Quarrier

**TELL linguist team:**

- What type information you need for generators
- What constraints affect data generation
- What literal types you need to handle
- What complex types need analysis

**USE linguist for:**

- Type extraction from interfaces/types
- Constraint analysis for bounded types
- Union/intersection type decomposition
- Generic type parameter extraction

## API Structure

### Currently Implemented

```typescript
// Parse TypeScript source file
import parseSourceFile from "@sitebender/linguist/parseSourceFile/index.ts"

// Extract functions from AST
import extractFunctions from "@sitebender/linguist/extractFunctions/index.ts"

// Extract function signature
import extractSignature from "@sitebender/linguist/extractSignature/index.ts"

// Extract comments
import extractComments from "@sitebender/linguist/extractComments/index.ts"

// Detect properties (bundled, not separate)
import detectProperties from "@sitebender/linguist/extractSignature/detectProperties/index.ts"
```

### NOT YET IMPLEMENTED

```typescript
// These imports will fail - functions don't exist yet:

// Extract type information
import extractTypes from "@sitebender/linguist/extractTypes/index.ts" // ❌ DOESN'T EXIST

// Analyze branches for coverage
import analyzeBranches from "@sitebender/linguist/analyzeBranches/index.ts" // ❌ DOESN'T EXIST

// Extract imports
import extractImports from "@sitebender/linguist/extractImports/index.ts" // ❌ DOESN'T EXIST
```

### Shared Types

```typescript
import type {
	BranchInfo,
	FunctionSignature,
	Parameter,
	ParseError,
	RawComment,
	TypeInfo,
} from "@sitebender/linguist/types/index.ts"
```

### Comment Extraction Contract

Linguist provides **structural** comment extraction. Envoy handles **semantic** interpretation.

```typescript
// What Linguist provides
type RawComment = {
  kind: 'line' | 'block'        // Comment type
  text: string                  // Trimmed content
  fullText: string              // Original with markers
  start: number                 // Absolute position
  end: number                   
  line: number                  // 1-based
  column: number                // 1-based
  nodeId?: string               // Associated function name
}

// Linguist functions
extractComments(sourceFile: ts.SourceFile): Array<RawComment>
associateComments(
  comments: Array<RawComment>, 
  functions: Array<FunctionNode>
): Array<RawComment>
```

**Division of Labor:**

- Linguist: Extracts raw comments, associates with nodes
- Envoy: Interprets markers (`//++`, `//??`, `//--`), generates diagnostics
- Linguist stays purely structural, no documentation decisions

## Implementation Status

### Actually Completed

- ✅ Basic TypeScript parsing with `parseSourceFile`
- ✅ Function extraction from AST
- ✅ Signature extraction (parameters, return type, generics)
- ✅ Comment extraction from source
- ⚠️ Property detection (async, generator, curried - purity needs work)

### Phase 1: Core Functions (CRITICAL - NOT STARTED)

- ❌ Extract TypeScript parsing from envoy (no integration)
- ❌ Extract TypeScript parsing from logician (no integration)
- ❌ Implement `analyzeBranches` for coverage
- ❌ Implement `extractTypes` for deep type analysis
- ❌ Implement `extractImports` for dependency tracking

### Phase 2: Testing & Integration (BLOCKED)

- ❌ Write tests for ALL functions (currently ~10% coverage)
- ❌ Integrate with logician
- ❌ Integrate with envoy
- ❌ Fix violations of toolsmith usage rules
- ❌ Fix nested function violations

### Phase 3: Enhancement (FUTURE)

- ❌ Add complexity analysis
- ❌ Add literal type detection
- ❌ Add constraint extraction
- ❌ Add union/intersection decomposition
- ❌ Improve purity detection beyond trivial cases

### Phase 4: Optimization (DISTANT FUTURE)

- ❌ Cache parsed ASTs
- ❌ Incremental parsing
- ❌ Performance profiling
- ❌ Multi-file analysis

## Migration Guide

### For Logician

```typescript
// OLD (in logician)
import { parseSignature } from "./parseSignature/index.ts"

// NEW (using linguist)
import extractSignature from "@sitebender/linguist/extractSignature/index.ts"
```

### For Envoy

```typescript
// OLD (in envoy)
import { parseWithCompiler } from "./linguist/parseWithCompiler/index.ts"

// NEW (using linguist)
import parseSourceFile from "@sitebender/linguist/parseSourceFile/index.ts"
```

## Communication Examples

### Good Communication

**AI working on Envoy:** "I need to detect whether functions are idempotent for documentation. Should this go in linguist's detectProperties?"

**AI working on Logician:** "I'm seeing that branch analysis could be useful for envoy to show code complexity. Should we make analyzeBranches more generic?"

**AI working on Quarrier:** "I need to extract enum values to generate valid enum data. Can linguist add extractEnumValues?"

### Bad Communication

**AI working on Envoy:** _Silently reimplements type extraction locally_

**AI working on Logician:** _Adds new fields to FunctionSignature without telling anyone_

**AI working on Quarrier:** _Uses TypeScript compiler directly instead of linguist_

## Design Principles

1. **Single Source of Truth** - One linguist to rule them all
2. **No Duplication** - Extract shared functionality immediately
3. **Consistent Types** - Same FunctionSignature everywhere
4. **Pure Functions** - No classes, no mutations
5. **Result Monads** - No throws, no null/undefined
6. **Direct Imports** - No barrel files

## The Bottom Line

Linguist exists to:

1. **Eliminate duplication** between envoy and logician
2. **Provide consistency** across all libraries
3. **Enable coordination** between AI agents
4. **Maintain single source of truth** for TypeScript analysis

When in doubt, ask: "Does another library need this?" If yes, it belongs in linguist.

---

_"Parse once, use everywhere."_
