# Arborist Rule Violations Fix Plan

## Overview

This document outlines a systematic plan to fix all rule violations identified in the `libraries/arborist/src` codebase. The fixes will be implemented in small, manageable batches to ensure correctness and allow for testing at each step.

## Relevant Rules Summary

### Constitutional Rules
- **All Functions Must Be Curried**: Every function must be curried for composition and partial application
- **No Exceptions**: Never use try/catch/throw except at explicit IO boundaries
- **No Classes**: Never use class keyword
- **One Function Per File**: Each file exports exactly one function
- **Pure Functions**: Functions must be pure except explicit IO boundaries
- **Immutable Data**: Use const, Readonly<T>, ReadonlyArray<T>

### Functional Programming Rules
- **No Loops**: Never use for/while loops, use map/filter/reduce
- **No Mutations**: No let declarations, use const only

### Syntax Rules
- **No Arrow Functions**: Never use => syntax, always use named function declarations
- **Semantic Functions**: Use Toolsmith functions instead of operators:
  - `isEqual` instead of `===`
  - `length(arr)` instead of `arr.length`
  - `or(a)(b)` instead of `a || b`
  - `not(condition)` instead of `!condition`

### TypeScript Rules
- **Explicit Type Annotations**: Always annotate function parameters and return types
- **Readonly Types**: Use Readonly<T> and ReadonlyArray<T> for immutability

## Current Violations Summary

1. **Non-curried functions**: ~50+ functions need to be curried
2. **Arrow functions**: 1 instance in `_serializeTypeParameters/index.ts`
3. **For loops**: 1 instance in `extractConstants/_serializeExpression/index.ts`
4. **let declarations**: 3 instances (2 in `_serializeExpression`, 1 in `parsers/denoAst/parseFile.ts`)
5. **Operator usage**: 191 `===`, 51 `||`, 109 `.length`, several `!`
6. **Try/catch/throw**: Used at IO boundaries (acceptable)

## Fix Batches

### Batch 1: Core Infrastructure Fixes
**Files**: `parsers/denoAst/parseFile.ts`
**Changes**:
- [x] Replace `let wasmInitialized = false` with const-based initialization pattern
**Verification**: File compiles without errors

### Batch 2: Arrow Function Removal
**Files**: `_serializeTypeParameters/index.ts`
**Changes**:
- [x] Replace `.map((param) => {...})` with named function in map
**Verification**: File compiles and tests pass

### Batch 3: Loop Removal
**Files**: `extractConstants/_serializeExpression/index.ts`
**Changes**:
- [x] Replace for loop with functional iteration (map/filter)
- [x] Remove let declarations, use const
**Verification**: Template literal serialization still works correctly

### Batch 4: Operator Substitutions - Equality
**Files**: All files with `===` usage
**Changes** (in groups of 5-10 files):
- [x] Import `isEqual` from Toolsmith
- [x] Replace `===` with `isEqual(a)(b)`
**Progress**: 22/35 files completed (approximately 80+ instances replaced)
**Completed Files**:
  - [x] `extractConstants/index.ts` (6 instances)
  - [x] `_extractNamedBindings/index.ts` (2 instances)
  - [x] `extractFunctionDetails/index.ts` (3 instances)
  - [x] `analyzeFunctionBody/updateStateForNode/index.ts` (11 instances)
  - [x] `_serializePattern/index.ts` (1 instance)
  - [x] `_serializeTypeParameters/index.ts` (1 instance)
  - [x] `_extractKindAndBindings/index.ts` (4 instances)
  - [x] `_serializeTypeAnnotation/index.ts` (4 instances)
  - [x] `extractExports/index.ts` (15 instances)
  - [x] `_extractDefinition/index.ts` (4 instances)
  - [x] `extractComments/extractComments/index.ts` (1 instance)
  - [x] `analyzeFunctionBody/_collectAstNodes/index.ts` (2 instances)
  - [x] `analyzeFunctionBody/_collectAstNodes/_reduceChildNodes/index.ts` (1 instance)
  - [x] `extractImports/index.ts` (1 instance)
  - [x] `_extractLocalName/index.ts` (1 instance)
  - [x] `_extractTypeDetails/index.ts` (1 instance)
  - [x] `_serializeExtendsClause/index.ts` (1 instance)
  - [x] `parsers/denoAst/wasm/build.ts` (1 instance)
  - [x] `detectViolations/_collectAllNodes/index.ts` (1 instance)
  - [x] `parsers/denoAst/wasm/_convertWasmSemanticInfo/index.ts` (1 instance)
  - [x] `detectViolations/_checkNodeForViolations/index.ts` (8 instances)
  - [x] `extractTypes/index.ts` (5 instances)
**Remaining Files**: ~13 files still need processing (test files excluded)
**Verification**: Each file compiles and maintains logic

### Batch 5: Operator Substitutions - Logical OR
**Files**: All files with `||` usage
**Changes**:
- [ ] Import `or` from Toolsmith
- [ ] Replace `a || b` with `or(a)(b)`
**Progress**: 1/14 files completed
**Completed Files**:
  - [x] `extractFunctionDetails/index.ts` (13 instances)
**Verification**: Each file compiles and maintains logic

### Batch 6: Operator Substitutions - Length
**Files**: All files with `.length` usage
**Changes**:
- [ ] Import `length` from Toolsmith
- [ ] Replace `arr.length` with `length(arr)`
**Verification**: Each file compiles and maintains logic

### Batch 7: Operator Substitutions - Logical NOT
**Files**: All files with `!` usage
**Changes**:
- [ ] Import `not` from Toolsmith
- [ ] Replace `!condition` with `not(condition)`
**Verification**: Each file compiles and maintains logic

### Batch 8: Function Currying - Core Extractors
**Files**: `_extractDefinition`, `_extractImportDetails`, `_extractImportedName`, `_extractLocalName`, `_extractPosition`, `_extractSpan`
**Changes**:
- [ ] Convert each function to curried form
- [ ] Update all call sites
**Verification**: Functions return correct results, call sites work

### Batch 9: Function Currying - Serialization Functions
**Files**: `_serializeExtendsClause`, `_serializePattern`, `_serializeTypeAnnotation`, `_serializeTypeParameters`
**Changes**:
- [ ] Convert to curried form
- [ ] Update call sites
**Verification**: Serialization produces same output

### Batch 10: Function Currying - Analysis Functions
**Files**: `analyzeFunctionBody` and subfolders
**Changes**:
- [ ] Convert to curried form
- [ ] Update call sites
**Verification**: Analysis results unchanged

### Batch 11: Function Currying - Extraction Functions
**Files**: `extractComments`, `extractConstants`, `extractExports`, `extractFunctions`, `extractImports`, `extractTypes`
**Changes**:
- [ ] Convert main extraction functions to curried form
- [ ] Update call sites in `buildParsedFile`
**Verification**: Extractions produce same results

### Batch 12: Function Currying - Detection Functions
**Files**: `detectViolations` and subfolders
**Changes**:
- [ ] Convert to curried form
- [ ] Update call sites
**Verification**: Violation detection works correctly

### Batch 13: Function Currying - API and Build Functions
**Files**: `api/`, `buildParsedFile`, `parseFile`
**Changes**:
- [ ] Convert remaining functions to curried form
- [ ] Update all remaining call sites
**Verification**: Full pipeline works end-to-end

## Implementation Guidelines

### Currying Pattern
```typescript
// Before
function add(a: number, b: number): number {
  return a + b
}

// After
function add(augend: number) {
  return function addToAugend(addend: number): number {
    return augend + addend
  }
}
```

### Operator Substitution Pattern
```typescript
// Before
if (arr.length > 0 && item === target) {
  return item || defaultValue
}

// After
import length from "@sitebender/toolsmith/array/length/index.ts"
import isEqual from "@sitebender/toolsmith/validation/isEqual/index.ts"
import or from "@sitebender/toolsmith/logic/or/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"

if (not(isEqual(length(arr))(0)) && isEqual(item)(target)) {
  return or(item)(defaultValue)
}
```

### Loop Replacement Pattern
```typescript
// Before
let result = ""
for (let i = 0; i < items.length; i++) {
  result += process(items[i])
}

// After
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"

const result = reduce(
  function buildResult(acc: string) {
    return function addItem(item: string): string {
      return acc + process(item)
    }
  }
)("")(items)
```

## Testing Strategy

- **Unit Tests**: Run all existing tests after each batch
- **Integration Tests**: Run full parsing pipeline tests
- **Type Checking**: Ensure TypeScript compilation succeeds
- **Manual Verification**: Spot check key functionality

## Risk Mitigation

- **Small Batches**: Each batch affects limited scope
- **Backup**: Commit before each batch
- **Revert Plan**: Know how to undo changes if needed
- **Progressive Verification**: Test after each change

## Completion Criteria

- [ ] All functions are curried
- [ ] No arrow functions in implementation
- [ ] No loops or let declarations
- [ ] All operators replaced with semantic functions
- [ ] All tests pass
- [ ] TypeScript compilation succeeds
- [ ] Full parsing pipeline works correctly
