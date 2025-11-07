# Result and Validation Monad Implementation Plan

## Architect Library (@sitebender/arborist)

**Document Version:** 1.0\
**Date:** 2025-11-06\
**Status:** Planning Phase

---

## Executive Summary

The Architect library currently strips away Validation/Result wrappers and always returns success, losing all error information during AST extraction. This plan outlines a phased approach to implement proper Result and Validation monad usage throughout the library.

### Current Problems

1. **Lost Error Information**: Functions like `extractFunctions`, `extractClasses`, `extractTypes`, etc. always return `success()`, even when individual extractions fail
2. **Silent Failures**: Malformed AST nodes are silently ignored rather than reported
3. **No Error Accumulation**: Cannot collect multiple extraction errors from a file
4. **Inconsistent Error Handling**: Some functions return Validation, others return plain values, creating confusion

### Goals

1. **Proper Error Propagation**: All extraction functions return Result or Validation based on their needs
2. **Error Accumulation**: Functions processing arrays use Validation to collect all errors
3. **Fail-Fast Where Appropriate**: Single-item operations use Result for immediate failure
4. **Type Safety**: Leverage discriminated union error types for precise error handling
5. **Constitutional Compliance**: No exceptions, no loops, no mutations, pure functions only

### Key Decisions

| Function Area                | Monad Choice | Reasoning                                           |
| ---------------------------- | ------------ | --------------------------------------------------- |
| **parseFile**                | Result       | IO boundary, fail-fast, single file                 |
| **extractFunctions**         | Validation   | Array processing, accumulate errors per function    |
| **extractClasses**           | Validation   | Array processing, accumulate errors per class       |
| **extractImports**           | Validation   | Array processing, accumulate errors per import      |
| **extractExports**           | Validation   | Array processing, accumulate errors per export      |
| **extractTypes**             | Validation   | Array processing, accumulate errors per type        |
| **extractConstants**         | Validation   | Array processing, accumulate errors per constant    |
| **extractComments**          | Validation   | Array processing, accumulate errors per comment     |
| **_extractFunctionDetails**  | Result       | Single item, fail-fast if node is invalid           |
| **_extractClassDetails**     | Result       | Single item, fail-fast if node is invalid           |
| **analyzeFunctionBody**      | Result       | Sequential analysis, fail on first invalid node     |
| **_serializeExpression**     | Result       | Sequential serialization, fail on unsupported nodes |
| **_serializeTypeAnnotation** | Result       | Sequential serialization, fail on unsupported types |

---

## Phase Breakdown

### Phase 1: Foundation and Helper Functions

**Goal:** Establish error types and update low-level helper functions to return Result/Validation

**Duration:** 2-3 batches\
**Dependencies:** None\
**Risk:** Low - these are leaf functions with no dependencies

---

### Phase 2: Serialization Functions

**Goal:** Update all serialization functions (_serializeExpression, _serializeTypeAnnotation, etc.) to return Result

**Duration:** 3-4 batches\
**Dependencies:** Phase 1 complete\
**Risk:** Medium - many functions depend on these

---

### Phase 3: Detail Extraction Functions

**Goal:** Update functions that extract details from single AST nodes to return Result

**Duration:** 4-5 batches\
**Dependencies:** Phase 2 complete\
**Risk:** Medium - affects all top-level extractors

---

### Phase 4: Top-Level Extractors

**Goal:** Update top-level extraction functions to use traverse/sequence for proper error accumulation

**Duration:** 4-5 batches\
**Dependencies:** Phase 3 complete\
**Risk:** High - these are public API functions

---

### Phase 5: Integration and Testing

**Goal:** Comprehensive testing, documentation updates, and error handling verification

**Duration:** 3-4 batches\
**Dependencies:** Phase 4 complete\
**Risk:** Low - testing and verification

---

## Detailed Batch Plans

### Phase 1: Foundation and Helper Functions

#### Batch 1.1: Error Type Enhancement and Basic Helpers

**Description:** Enhance error types with more specific kind discriminators and update the simplest helper functions.

**Files to Modify:**

1. `src/types/errors/index.ts`
   - Add more specific error kinds to each error type
   - Add `context` field for additional debugging information
   - Ensure all error types have proper discriminated union structure

2. `src/_extractPosition/index.ts`
   - Convert to return `Result<ExtractionError, Position>`
   - Add error for invalid span values (negative, end < start)

3. `src/_extractSpan/index.ts`
   - Convert to return `Result<ExtractionError, Span>`
   - Add error for missing span on node

4. `src/_extractLocalName/index.ts`
   - Convert to return `Result<ExtractionError, string>`
   - Add error for missing identifier

**Expected Monad Usage:**

- Result (fail-fast) - all functions process single values

**Dependencies:** None

**Testing Requirements:**

- Unit tests for each error condition
- Property-based tests for valid inputs
- Test error message quality and suggestions

**Checklist:**

- [x] Fully tested and all tests pass
- [x] Linter passes with no errors (on this library)
- [x] Type check passes (on this library)
- [x] All constitutional rules followed explicitly
- [x] All functions properly commented
- [x] This checklist updated with current status

---

#### Batch 1.2: Import and Export Name Extraction

**Description:** Update functions that extract names from import/export nodes.

**Files to Modify:**

1. `src/_extractImportedName/index.ts`
   - Convert to return `Result<ImportExtractionError, string>`
   - Add error for malformed import specifier

2. `src/_extractNamedBindings/index.ts`
   - Convert to return `Result<ImportExtractionError, ReadonlyArray<string>>`
   - Add error for invalid binding structure

3. `src/extractExports/_extractDefaultExportName/index.ts`
   - Convert to return `Result<ExportExtractionError, string>`
   - Add error for unidentifiable default export

4. `src/_extractImportDetails/index.ts`
   - Convert to return `Result<ImportExtractionError, ParsedImport>`
   - Compose errors from _extractImportedName and _extractNamedBindings

**Expected Monad Usage:**

- Result (fail-fast) - sequential extraction of import/export details

**Dependencies:** Batch 1.1

**Testing Requirements:**

- Test all import patterns (default, named, namespace, type-only)
- Test all export patterns (default, named, re-export, export *)
- Test error cases for malformed nodes

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 1.3: Pattern and Parameter Helpers

**Description:** Update functions that serialize patterns and parameters.

**Files to Modify:**

1. `src/_serializePattern/index.ts`
   - Convert to return `Result<FunctionExtractionError, string>`
   - Add error for unsupported pattern types

2. `src/_serializePattern/_serializeProperty/index.ts`
   - Convert to return `Result<FunctionExtractionError, string>`
   - Add error for invalid property structure

3. `src/_serializeTypeParameters/index.ts`
   - Convert to return `Result<TypeExtractionError, string>`
   - Add error for malformed type parameters

**Expected Monad Usage:**

- Result (fail-fast) - sequential serialization

**Dependencies:** Batch 1.1

**Testing Requirements:**

- Test all pattern types (identifier, array, object, rest)
- Test nested patterns
- Test type parameter constraints and defaults

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

### Phase 2: Serialization Functions

#### Batch 2.1: Type Annotation Serialization - Basic Types

**Description:** Update _serializeTypeAnnotation for basic type cases (keywords, references, arrays).

**Files to Modify:**

1. `src/_serializeTypeAnnotation/index.ts`
   - Convert return type to `Result<TypeExtractionError, string>`
   - Update cases: TsKeywordType, TsTypeReference, TsArrayType, TsTupleType
   - Use `bind` to chain Result operations
   - Replace switch statement with functional pattern matching

2. `src/_serializeTypeAnnotation/_filterNonEmpty/index.ts`
   - Already pure, but verify Result compatibility
   - May need to update return type if used in monadic chains

**Expected Monad Usage:**

- Result (fail-fast) - sequential serialization of type nodes

**Dependencies:** Batch 1.3

**Testing Requirements:**

- Test all basic type cases
- Test nested generics (Array&lt;Array&lt;string&gt;&gt;)
- Test error propagation for invalid type nodes

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 2.2: Type Annotation Serialization - Complex Types

**Description:** Update _serializeTypeAnnotation for complex type cases (unions, intersections, functions, conditionals).

**Files to Modify:**

1. `src/_serializeTypeAnnotation/index.ts`
   - Update cases: TsUnionType, TsIntersectionType, TsFunctionType, TsConditionalType
   - Use `traverse` for arrays of types (union/intersection members)
   - Use `bind` for sequential composition (conditional type components)

**Expected Monad Usage:**

- Result with traverse for parallel type collection
- Result with bind for sequential type extraction

**Dependencies:** Batch 2.1

**Testing Requirements:**

- Test union types with many members
- Test deeply nested conditional types
- Test function types with complex parameters
- Test error accumulation for malformed unions

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 2.3: Type Annotation Serialization - Advanced Types

**Description:** Complete _serializeTypeAnnotation with advanced type cases (mapped, indexed, literals, type queries).

**Files to Modify:**

1. `src/_serializeTypeAnnotation/index.ts`
   - Update cases: TsTypeLiteral, TsMappedType, TsIndexedAccessType, TsTypeQuery, TsLiteralType
   - Handle edge cases for each type
   - Add default case that returns error for unknown type

**Expected Monad Usage:**

- Result (fail-fast) for all cases

**Dependencies:** Batch 2.2

**Testing Requirements:**

- Test all remaining type cases
- Test error for unknown/unsupported type nodes
- Verify complete type coverage

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 2.4: Expression Serialization - Literals and Basic Expressions

**Description:** Update _serializeExpression for literal and basic expression cases.

**Files to Modify:**

1. `src/extractConstants/_serializeExpression/index.ts`
   - Convert return type to `Result<ConstantExtractionError, string>`
   - Update cases: NumericLiteral, StringLiteral, BooleanLiteral, NullLiteral, Identifier
   - Update cases: BinaryExpression, UnaryExpression, MemberExpression
   - Replace switch with functional pattern matching

2. `src/extractConstants/_serializeExpression/_reduceTemplatePart/index.ts`
   - Update to work with Result context
   - Handle errors in template part serialization

**Expected Monad Usage:**

- Result (fail-fast) for sequential expression serialization

**Dependencies:** Batch 2.3

**Testing Requirements:**

- Test all literal types
- Test basic expressions with operators
- Test member access (computed and non-computed)

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 2.5: Expression Serialization - Complex Expressions

**Description:** Complete _serializeExpression with complex expression cases.

**Files to Modify:**

1. `src/extractConstants/_serializeExpression/index.ts`
   - Update cases: ObjectExpression, ArrayExpression, CallExpression
   - Update cases: ArrowFunctionExpression, FunctionExpression, ConditionalExpression
   - Add error for unsupported expression types

2. `src/extractConstants/_serializeExpression/_serializeObjectProperty/index.ts`
   - Convert to return `Result<ConstantExtractionError, string>`
   - Handle property serialization errors

3. `src/extractConstants/_serializeExpression/_serializeArrayElement/index.ts`
   - Convert to return `Result<ConstantExtractionError, string>`
   - Handle element serialization errors (including null/spread)

4. `src/extractConstants/_serializeExpression/_serializeCallArgument/index.ts`
   - Convert to return `Result<ConstantExtractionError, string>`
   - Handle argument serialization errors (including spread)

**Expected Monad Usage:**

- Result with traverse for arrays (object properties, array elements, call arguments)
- Result with bind for sequential composition

**Dependencies:** Batch 2.4

**Testing Requirements:**

- Test nested objects and arrays
- Test function calls with various argument types
- Test ternary expressions
- Test error propagation through complex structures

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

### Phase 3: Detail Extraction Functions

#### Batch 3.1: Type Definition Extraction - Parameters and Members

**Description:** Update helper functions for type definition extraction.

**Files to Modify:**

1. `src/_extractTypeDetails/_extractDefinition/_serializeParameter/index.ts`
   - Convert to return `Result<TypeExtractionError, string>`
   - Use Result from _serializeTypeAnnotation
   - Handle missing parameter names

2. `src/_extractTypeDetails/_extractDefinition/_serializeMember/_serializeParameters/index.ts`
   - Convert to return `Result<TypeExtractionError, string>`
   - Use traverse for parameter array
   - Compose with _serializeParameter

3. `src/_extractTypeDetails/_extractDefinition/_serializeMember/index.ts`
   - Convert to return `Result<TypeExtractionError, string>`
   - Use Result from _serializeParameters
   - Handle different member types

4. `src/_extractTypeDetails/_extractDefinition/_serializeMembers/index.ts`
   - Convert to return `Result<TypeExtractionError, string>`
   - Use traverse for member array
   - Compose with _serializeMember

**Expected Monad Usage:**

- Result with traverse for arrays
- Result with bind for composition

**Dependencies:** Batch 2.5

**Testing Requirements:**

- Test interface members (properties, methods, index signatures)
- Test type alias members
- Test error propagation through member hierarchy

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 3.2: Type Definition Extraction - Main Function

**Description:** Update main type definition extraction function.

**Files to Modify:**

1. `src/_extractTypeDetails/_extractDefinition/index.ts`
   - Convert to return `Result<TypeExtractionError, string>`
   - Use Result from _serializeMembers, _serializeTypeAnnotation, etc.
   - Handle both type aliases and interfaces
   - Compose with _serializeExtendsClause

2. `src/_serializeExtendsClause/index.ts`
   - Convert to return `Result<TypeExtractionError, string>`
   - Use traverse for extends array

3. `src/_serializeExtendsClause/_serializeExtend/index.ts`
   - Convert to return `Result<TypeExtractionError, string>`
   - Handle single extends clause

4. `src/_extractTypeDetails/index.ts`
   - Convert to return `Result<TypeExtractionError, ParsedType>`
   - Use Result from _extractDefinition
   - Compose with _extractPosition and _extractSpan

**Expected Monad Usage:**

- Result (fail-fast) for single type extraction
- Result with traverse for extends clauses

**Dependencies:** Batch 3.1

**Testing Requirements:**

- Test type aliases with various definitions
- Test interfaces with extends
- Test generic type parameters
- Test error cases for malformed definitions

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 3.3: Class Member Extraction

**Description:** Update class member extraction functions.

**Files to Modify:**

1. `src/extractClasses/_extractClassMember/index.ts`
   - Convert to return `Result<ClassExtractionError, ClassMember>`
   - Handle different member types (property, method, constructor)
   - Use Result from _serializeTypeAnnotation for member types
   - Compose with _extractPosition and _extractSpan

**Expected Monad Usage:**

- Result (fail-fast) for single member extraction

**Dependencies:** Batch 3.2

**Testing Requirements:**

- Test all member types
- Test public/private/protected modifiers
- Test static/abstract modifiers
- Test error cases for malformed members

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 3.4: Class Details Extraction

**Description:** Update main class details extraction function.

**Files to Modify:**

1. `src/extractClasses/_extractClassDetails/index.ts`
   - Keep return type as `Result<ClassExtractionError, ParsedClass>`
   - Use traverse for class members (accumulate errors)
   - Use Result from _extractClassMember
   - Remove manual filtering of successful validations
   - Use `sequence` to convert `ReadonlyArray<Result<E, A>>` to `Result<E, ReadonlyArray<A>>`

2. `src/extractClasses/_isClassOrExportedClass/index.ts`
   - Already pure predicate, no changes needed

**Expected Monad Usage:**

- Result for single class extraction
- traverse for member array (converts to single Result with all members or first error)

**Dependencies:** Batch 3.3

**Testing Requirements:**

- Test classes with various member combinations
- Test inheritance and implements
- Test abstract classes
- Test error accumulation for multiple invalid members

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 3.5: Function Body Analysis Helpers

**Description:** Update helper functions for function body analysis.

**Files to Modify:**

1. `src/analyzeFunctionBody/_collectAstNodes/_reduceArrayValues/index.ts`
   - Already returns plain value, verify Result compatibility
   - Update to handle Result context if needed

2. `src/analyzeFunctionBody/_collectAstNodes/_reduceArrayValuesWithAccumulator/index.ts`
   - Already returns plain value, verify Result compatibility
   - Update to handle Result context if needed

3. `src/analyzeFunctionBody/_collectAstNodes/_reduceChildNodes/index.ts`
   - Already returns plain value, verify Result compatibility
   - Update to handle Result context if needed

4. `src/analyzeFunctionBody/_collectAstNodes/index.ts`
   - Convert to return `Result<FunctionExtractionError, ReadonlyArray<unknown>>`
   - Add error for malformed AST structure

5. `src/analyzeFunctionBody/createInitialState/index.ts`
   - Already pure, no changes needed (creates initial state)

6. `src/analyzeFunctionBody/updateStateForNode/index.ts`
   - Convert to return `Result<FunctionExtractionError, FunctionBody>`
   - Add error for unsupported node types

**Expected Monad Usage:**

- Result (fail-fast) for AST traversal

**Dependencies:** Batch 3.4

**Testing Requirements:**

- Test collection of various node types
- Test state updates for each node type
- Test error cases for invalid nodes

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 3.6: Function Body Analysis Main

**Description:** Update main function body analysis function.

**Files to Modify:**

1. `src/analyzeFunctionBody/index.ts`
   - Convert to return `Result<FunctionExtractionError, FunctionBody>`
   - Use Result from _collectAstNodes
   - Use Result-aware reduce with updateStateForNode
   - Handle errors during AST traversal

**Expected Monad Usage:**

- Result (fail-fast) for sequential analysis

**Dependencies:** Batch 3.5

**Testing Requirements:**

- Test analysis of various function bodies
- Test complexity calculation
- Test pattern detection (loops, try-catch, etc.)
- Test error propagation from helpers

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 3.7: Function Details Extraction

**Description:** Update function details extraction.

**Files to Modify:**

1. `src/extractFunctionDetails/index.ts`
   - Convert to return `Result<FunctionExtractionError, ParsedFunction>`
   - Use Result from analyzeFunctionBody
   - Add error for missing identifier
   - Add error for invalid parameter structure
   - Use traverse for parameters and type parameters

2. `src/extractFunctions/_extractDetails/index.ts`
   - Update to return `Result<FunctionExtractionError, ParsedFunction>`
   - Simply delegate to extractFunctionDetails (which now returns Result)

3. `src/extractFunctions/_isFunctionOrExportedFunction/index.ts`
   - Already pure predicate, no changes needed

**Expected Monad Usage:**

- Result (fail-fast) for single function extraction
- traverse for parameter and type parameter arrays

**Dependencies:** Batch 3.6

**Testing Requirements:**

- Test various function signatures
- Test async/generator functions
- Test arrow vs regular functions
- Test error cases for malformed functions

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

### Phase 4: Top-Level Extractors

#### Batch 4.1: extractFunctions with Error Accumulation

**Description:** Update extractFunctions to properly accumulate errors using Validation.

**Files to Modify:**

1. `src/extractFunctions/index.ts`
   - Change approach: use traverse to apply _extractDetails to each node
   - `traverse` will convert `ReadonlyArray<Node>` to `Validation<E, ReadonlyArray<ParsedFunction>>`
   - If any extraction fails, Validation accumulates all errors
   - Remove manual success() wrapper
   - Remove TODO comments about Phase 5

**Expected Monad Usage:**

- Validation with traverse for error accumulation across functions

**Migration Pattern:**

```typescript
// Before
const functions = map(_extractDetails)(functionNodes)
return success(functions)

// After
const functionsValidation = traverse(_extractDetails)(functionNodes)
return functionsValidation
```

**Dependencies:** Batch 3.7

**Testing Requirements:**

- Test file with multiple valid functions
- Test file with one invalid function (should accumulate error, continue with others)
- Test file with multiple invalid functions (should accumulate all errors)
- Test error message quality

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 4.2: extractClasses with Error Accumulation

**Description:** Update extractClasses to properly accumulate errors using Validation.

**Files to Modify:**

1. `src/extractClasses/index.ts`
   - Change approach: use traverse to apply _extractClassDetails to each node
   - Remove manual filtering of successful validations
   - Remove manual map to extract values
   - `traverse` handles all of this automatically
   - Remove TODO comments about Phase 5

**Expected Monad Usage:**

- Validation with traverse for error accumulation across classes

**Migration Pattern:**

```typescript
// Before
const classValidations = map(_extractClassDetails(ast))(classNodes)
const successfulValidations = filter(isSuccess)(classValidations)
const classes = map(extractValue)(successfulValidations)
return success(classes)

// After
const classesValidation = traverse(_extractClassDetails(ast))(classNodes)
return classesValidation
```

**Dependencies:** Batch 3.4

**Testing Requirements:**

- Test file with multiple valid classes
- Test file with one invalid class (should accumulate error, continue with others)
- Test file with multiple invalid classes (should accumulate all errors)
- Test class with invalid members (should accumulate member errors)

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 4.3: extractImports with Error Accumulation

**Description:** Update extractImports to properly accumulate errors using Validation.

**Files to Modify:**

1. `src/extractImports/index.ts`
   - Update to use traverse with _extractImportDetails
   - _extractImportDetails now returns Result, so we need a wrapper
   - Create helper to convert Result to Validation for traverse compatibility
   - Remove manual success() wrapper

**Expected Monad Usage:**

- Validation with traverse for error accumulation across imports

**Helper Pattern:**

```typescript
// Helper to convert Result to Validation for use with traverse
function resultToValidation<E, A>(result: Result<E, A>): Validation<E, A> {
	return isOk(result) ? success(result.value) : failure([result.error])
}
```

**Dependencies:** Batch 1.2

**Testing Requirements:**

- Test file with multiple valid imports
- Test file with malformed import specifier
- Test all import patterns with errors
- Test error accumulation

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 4.4: extractExports with Error Accumulation

**Description:** Update extractExports to properly accumulate errors using Validation.

**Files to Modify:**

1. `src/extractExports/index.ts`
   - Update extractExportDetails to return Result
   - Create wrapper to convert Result to Validation
   - Use traverse for both named exports and re-exports
   - flatMap needs to work with Validation context
   - Consider splitting extractExportDetails into separate functions for clarity

**Expected Monad Usage:**

- Validation with traverse for error accumulation across exports
- Result for individual export detail extraction

**Dependencies:** Batch 1.2

**Testing Requirements:**

- Test file with multiple exports of different kinds
- Test malformed export names
- Test export lists (multiple exports from single statement)
- Test re-exports with errors

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 4.5: extractTypes with Error Accumulation

**Description:** Update extractTypes to properly accumulate errors using Validation.

**Files to Modify:**

1. `src/extractTypes/index.ts`
   - Update to use traverse with _extractTypeDetails
   - _extractTypeDetails returns Result, wrap with resultToValidation helper
   - Remove manual success() wrapper
   - Remove TODO comments

**Expected Monad Usage:**

- Validation with traverse for error accumulation across types

**Dependencies:** Batch 3.2

**Testing Requirements:**

- Test file with multiple type aliases and interfaces
- Test malformed type definitions
- Test complex generic types with errors
- Test error accumulation

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 4.6: extractConstants with Error Accumulation

**Description:** Update extractConstants to properly accumulate errors using Validation.

**Files to Modify:**

1. `src/extractConstants/index.ts`
   - Update extractConstantDetails to return Result
   - Wrap with resultToValidation helper
   - Use traverse for constant array
   - Remove manual success() wrapper

**Expected Monad Usage:**

- Validation with traverse for error accumulation across constants
- Result for individual constant extraction

**Dependencies:** Batch 2.5

**Testing Requirements:**

- Test file with multiple constants
- Test constants with unsupported value types
- Test constants with invalid type annotations
- Test error accumulation

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 4.7: extractComments Error Handling Review

**Description:** Review and enhance extractComments error handling (already uses Validation).

**Files to Modify:**

1. `src/extractComments/extractComments/index.ts`
   - Already returns Validation
   - Review for potential error cases (malformed comments, invalid positions)
   - Add error handling if needed
   - Verify reduce-based sorting handles errors correctly

2. `src/extractComments/_calculatePosition/index.ts`
   - Convert to return `Result<CommentExtractionError, Position>`
   - Add error for invalid offset

3. `src/extractComments/_detectEnvoyMarker/index.ts`
   - Already pure function returning optional marker
   - No changes needed

4. `src/extractComments/extractComments/_findInsertIndex/index.ts`
   - Already pure function
   - No changes needed

**Expected Monad Usage:**

- Validation for comment array
- Result for position calculation

**Dependencies:** None (comments are parsed separately from AST)

**Testing Requirements:**

- Test various comment patterns
- Test comments with invalid positions
- Test Envoy marker detection
- Test comment sorting

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

### Phase 5: Integration and Testing

#### Batch 5.1: Comprehensive Integration Tests

**Description:** Create integration tests that exercise complete extraction pipelines with various error scenarios.

**Files to Create:**

1. `src/integration.test.ts`
   - Test complete file parsing and extraction pipeline
   - Test files with multiple extraction types
   - Test error accumulation across extractors
   - Test error message quality and suggestions

**Test Scenarios:**

- Valid file with all extraction types (functions, classes, types, constants, imports, exports, comments)
- File with syntax errors (should fail at parse stage with Result error)
- File with malformed functions (should accumulate Validation errors)
- File with malformed classes (should accumulate Validation errors)
- File with mixed valid/invalid extractions (should return partial success with accumulated errors)
- File with deeply nested type definitions (stress test type serialization)
- File with complex expressions in constants (stress test expression serialization)

**Dependencies:** All Phase 4 batches complete

**Testing Requirements:**

- Cover all error paths
- Verify error accumulation works correctly
- Verify partial success scenarios
- Test error message quality

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 5.2: Error Handling Documentation

**Description:** Document error handling patterns and update all function comments.

**Files to Create/Modify:**

1. `src/ERROR_HANDLING.md`
   - Document Result vs Validation decision criteria
   - Provide examples of each monad usage
   - Document error type hierarchy
   - Provide error handling recipes for consumers

2. Update all function comment blocks
   - Add error cases to function comments
   - Document which monad each function returns
   - Add examples of error handling

**Documentation Sections:**

- When to use Result vs Validation
- Error type catalog with examples
- Common error handling patterns
- Migration guide for consumers
- Performance implications

**Dependencies:** Batch 5.1

**Testing Requirements:**

- Verify all examples in documentation compile and run
- Test all documented patterns

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 5.3: Performance Benchmarking

**Description:** Benchmark extraction performance with error handling to ensure no significant regression.

**Files to Create:**

1. `benchmarks/extraction.bench.ts`
   - Benchmark each extractor function
   - Compare with/without error accumulation
   - Test various file sizes
   - Identify any performance bottlenecks

**Benchmark Scenarios:**

- Small file (10 functions, 5 classes, 10 types)
- Medium file (100 functions, 20 classes, 50 types)
- Large file (1000 functions, 100 classes, 500 types)
- File with many errors vs file with no errors

**Performance Targets:**

- No more than 10% slowdown for valid files
- Error accumulation should not cause exponential slowdown
- Memory usage should remain reasonable

**Dependencies:** Batch 5.2

**Testing Requirements:**

- Run benchmarks on representative files
- Compare results against baseline (current implementation)
- Identify and fix any performance issues

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

#### Batch 5.4: Final Verification and Cleanup

**Description:** Final verification pass, cleanup TODO comments, update README.

**Files to Modify:**

1. Remove all TODO comments about Phase 5
2. Update README.md with error handling information
3. Update CHANGELOG.md with breaking changes
4. Verify all tests pass
5. Verify all constitutional rules are followed
6. Run full lint and type check

**Verification Checklist:**

- All TODO comments related to error handling removed
- All functions have proper type signatures
- All functions properly commented
- README updated
- CHANGELOG updated
- All tests pass
- Linter passes
- Type checker passes
- No constitutional rule violations
- No arrow functions
- No loops
- No mutations
- No exceptions (except at IO boundary in parseFile)
- All functions curried
- All functions pure

**Dependencies:** Batch 5.3

**Testing Requirements:**

- Full test suite passes
- All integration tests pass
- All benchmarks complete

**Checklist:**

- [ ] Fully tested and all tests pass
- [ ] Linter passes with no errors (on this library)
- [ ] Type check passes (on this library)
- [ ] All constitutional rules followed explicitly
- [ ] All functions properly commented
- [ ] This checklist updated with current status

---

## Error Type Catalog

### Complete Error Type Definitions

```typescript
// Base error structure from Artificer
type ArchitectError<TOperation extends string, TArgs extends unknown[] = []> = {
	readonly operation: TOperation
	readonly message: string
	readonly code: string
	readonly args: TArgs
	readonly timestamp: number
	readonly suggestion?: string
}

// Parse errors (IO boundary)
type ParseError = ArchitectError<"parseFile", [string]> & {
	readonly kind:
		| "FileNotFound"
		| "InvalidSyntax"
		| "ReadPermission"
		| "SwcInitializationFailed"
	readonly file: string
	readonly line?: number
	readonly column?: number
}

// Function extraction errors
type FunctionExtractionError = ArchitectError<"extractFunctions"> & {
	readonly kind:
		| "UnknownNodeType"
		| "MissingIdentifier"
		| "InvalidParameterStructure"
		| "UnsupportedPatternType"
		| "MalformedFunctionBody"
		| "InvalidTypeParameter"
	readonly nodeType?: string
	readonly span?: Span
	readonly context?: string
}

// Class extraction errors
type ClassExtractionError = ArchitectError<"extractClasses"> & {
	readonly kind:
		| "UnknownNodeType"
		| "MissingClassName"
		| "InvalidMemberStructure"
		| "InvalidExtendsClause"
		| "InvalidImplementsClause"
	readonly nodeType?: string
	readonly span?: Span
	readonly context?: string
}

// Import extraction errors
type ImportExtractionError = ArchitectError<"extractImports"> & {
	readonly kind:
		| "InvalidSpecifier"
		| "UnknownImportKind"
		| "MalformedImportSource"
		| "InvalidBinding"
	readonly specifier?: string
	readonly span?: Span
	readonly context?: string
}

// Export extraction errors
type ExportExtractionError = ArchitectError<"extractExports"> & {
	readonly kind:
		| "InvalidExportName"
		| "UnknownExportKind"
		| "MalformedExportSource"
		| "InvalidExportSpecifier"
	readonly exportName?: string
	readonly span?: Span
	readonly context?: string
}

// Type extraction errors
type TypeExtractionError = ArchitectError<"extractTypes"> & {
	readonly kind:
		| "UnknownTypeKind"
		| "MissingTypeName"
		| "UnsupportedTypeNode"
		| "InvalidTypeParameter"
		| "MalformedTypeMember"
		| "InvalidExtendsClause"
	readonly span?: Span
	readonly context?: string
}

// Constant extraction errors
type ConstantExtractionError = ArchitectError<"extractConstants"> & {
	readonly kind:
		| "NotConstant"
		| "MissingValue"
		| "UnsupportedExpressionType"
		| "InvalidTypeAnnotation"
	readonly span?: Span
	readonly context?: string
}

// Comment extraction errors
type CommentExtractionError = ArchitectError<"extractComments"> & {
	readonly kind:
		| "MalformedComment"
		| "InvalidPosition"
		| "InvalidOffset"
	readonly span?: Span
	readonly context?: string
}

// General extraction error union
type ExtractionError =
	| FunctionExtractionError
	| ClassExtractionError
	| ImportExtractionError
	| ExportExtractionError
	| TypeExtractionError
	| ConstantExtractionError
	| CommentExtractionError
```

---

## Migration Patterns

### Pattern 1: Converting plain return to Result

**Before:**

```typescript
function extractName(node: unknown): string {
	const nodeObj = node as Record<string, unknown>
	const identifier = nodeObj.identifier as Record<string, unknown> | undefined
	return identifier?.value as string ?? "unknown"
}
```

**After:**

```typescript
function extractName(node: unknown): Result<ExtractionError, string> {
	const nodeObj = node as Record<string, unknown>
	const identifier = nodeObj.identifier as Record<string, unknown> | undefined

	if (!identifier) {
		return error({
			operation: "extractName",
			kind: "MissingIdentifier",
			message: "Node has no identifier",
			code: "MISSING_IDENTIFIER",
			args: [],
			timestamp: Date.now(),
		})
	}

	const name = identifier.value as string | undefined

	if (!name) {
		return error({
			operation: "extractName",
			kind: "MissingIdentifier",
			message: "Identifier has no value",
			code: "MISSING_IDENTIFIER",
			args: [],
			timestamp: Date.now(),
		})
	}

	return ok(name)
}
```

---

### Pattern 2: Converting map to traverse for arrays

**Before:**

```typescript
function extractFunctions(
	ast: ParsedAst,
): Validation<Error, ReadonlyArray<ParsedFunction>> {
	const functionNodes = filter(isFunctionNode)(ast.module.body)
	const functions = map(extractFunctionDetails)(functionNodes)
	return success(functions)
}
```

**After:**

```typescript
function extractFunctions(
	ast: ParsedAst,
): Validation<FunctionExtractionError, ReadonlyArray<ParsedFunction>> {
	const functionNodes = filter(isFunctionNode)(ast.module.body)

	// traverse automatically accumulates errors
	// If any extraction fails, we get Validation failure with all errors
	// If all succeed, we get Validation success with all functions
	return traverse(extractFunctionDetails)(functionNodes)
}
```

---

### Pattern 3: Composing Results with bind (sequential)

**Before:**

```typescript
function extractTypeDefinition(node: unknown): string {
	const name = extractName(node)
	const params = extractTypeParams(node)
	const definition = extractDefinition(node)
	return `${name}${params}: ${definition}`
}
```

**After:**

```typescript
function extractTypeDefinition(
	node: unknown,
): Result<TypeExtractionError, string> {
	return pipe(
		extractName(node),
		bind(function withName(name: string): Result<TypeExtractionError, string> {
			return pipe(
				extractTypeParams(node),
				bind(
					function withParams(
						params: string,
					): Result<TypeExtractionError, string> {
						return pipe(
							extractDefinition(node),
							map(function withDefinition(definition: string): string {
								return `${name}${params}: ${definition}`
							}),
						)
					},
				),
			)
		}),
	)
}
```

---

### Pattern 4: Converting switch statements to functional pattern matching

**Before:**

```typescript
function serializeType(node: unknown): string {
	const nodeObj = node as Record<string, unknown>
	const nodeType = nodeObj.type as string

	switch (nodeType) {
		case "TsKeywordType":
			return nodeObj.kind as string
		case "TsTypeReference":
			const name = (nodeObj.typeName as Record<string, unknown>).value as string
			return name
		default:
			return "unknown"
	}
}
```

**After:**

```typescript
function serializeType(node: unknown): Result<TypeExtractionError, string> {
  const nodeObj = node as Record<string, unknown>
  const nodeType = nodeObj.type as string
  
  // Map of node types to serializers
  const serializers: Record<string, (n: Record<string, unknown>) => Result<TypeExtractionError, string>> = {
    TsKeywordType: function serializeKeyword(n: Record<string, unknown>): Result<TypeExtractionError, string> {
      const kind = n.kind as string | undefined
      return kind ? ok(kind) : error({ kind: "MissingTypeKind", ... })
    },
    TsTypeReference: function serializeReference(n: Record<string, unknown>): Result<TypeExtractionError, string> {
      const typeName = n.typeName as Record<string, unknown> | undefined
      const name = typeName?.value as string | undefined
      return name ? ok(name) : error({ kind: "MissingTypeName", ... })
    },
  }
  
  const serializer = serializers[nodeType]
  
  if (!serializer) {
    return error({
      operation: "serializeType",
      kind: "UnsupportedTypeNode",
      message: `Unknown type node: ${nodeType}`,
      code: "UNSUPPORTED_TYPE_NODE",
      args: [],
      timestamp: Date.now(),
      nodeType,
    })
  }
  
  return serializer(nodeObj)
}
```

---

### Pattern 5: Using getOrElse for fallback values

**Before:**

```typescript
const value = someComputation() || defaultValue
```

**After:**

```typescript
const valueResult = someComputation()
const value = getOrElse(defaultValue)(valueResult)

// Or use nullish coalescing for plain values
const value = someComputation() ?? defaultValue
```

---

### Pattern 6: Converting Result to Validation for traverse

**Before:**

```typescript
// Function returns Result but we need Validation for traverse
function processItems(
	items: ReadonlyArray<Item>,
): Validation<Error, ReadonlyArray<ProcessedItem>> {
	const results = map(processItem)(items) // processItem returns Result
	// How to convert Result[] to Validation?
}
```

**After:**

```typescript
// Helper function to convert Result to Validation
function resultToValidation<E, A>(result: Result<E, A>): Validation<E, A> {
	return isOk(result) ? success(result.value) : failure([result.error])
}

// Wrapper function that converts Result to Validation
function processItemWithValidation(
	item: Item,
): Validation<Error, ProcessedItem> {
	return resultToValidation(processItem(item))
}

// Now use traverse
function processItems(
	items: ReadonlyArray<Item>,
): Validation<Error, ReadonlyArray<ProcessedItem>> {
	return traverse(processItemWithValidation)(items)
}
```

---

## Verification Steps

### 1. Type Safety Verification

**Goal:** Ensure all functions have correct type signatures and no `any` types.

**Steps:**

1. Run `deno check` on all modified files
2. Verify no `any` types in function signatures
3. Verify all Result/Validation types are properly annotated
4. Verify all error types are discriminated unions

**Command:**

```bash
deno check src/**/*.ts
```

---

### 2. Constitutional Rules Verification

**Goal:** Ensure no violations of constitutional rules.

**Steps:**

1. Search for arrow functions: `grep -r "=>" src/` (should only appear in type annotations)
2. Search for loops: `grep -r "for\|while" src/` (should find none)
3. Search for mutations: `grep -r "\.push\|\.pop\|\.shift\|\.unshift\|\.splice" src/` (should find none)
4. Search for exceptions: `grep -r "throw\|try\|catch" src/` (should only find in parseFile IO boundary)
5. Search for classes: `grep -r "^class " src/` (should find none)
6. Verify all functions are curried (take one parameter)

---

### 3. Error Handling Verification

**Goal:** Ensure all error paths are properly handled and tested.

**Steps:**

1. For each extraction function, verify it returns Result or Validation
2. For each error kind, verify there's a test case
3. For each error, verify it has a helpful message and suggestion
4. Verify error accumulation works (Validation accumulates, Result fails fast)

**Test Commands:**

```bash
deno test --filter "error" src/
deno test --filter "validation" src/
deno test --filter "result" src/
```

---

### 4. Integration Verification

**Goal:** Ensure all extractors work together correctly.

**Steps:**

1. Create test file with all extraction types
2. Parse file and run all extractors
3. Verify results are correct
4. Create test file with mixed valid/invalid extractions
5. Verify error accumulation and partial success

---

### 5. Performance Verification

**Goal:** Ensure no significant performance regression.

**Steps:**

1. Run benchmarks on representative files
2. Compare with baseline (current implementation)
3. Verify no exponential slowdown
4. Verify memory usage is reasonable

**Benchmark Command:**

```bash
deno bench benchmarks/extraction.bench.ts
```

---

### 6. Documentation Verification

**Goal:** Ensure all functions are properly documented.

**Steps:**

1. Verify all functions have comment blocks starting with `//++`
2. Verify all error cases are documented
3. Verify all examples compile and run
4. Verify README is up to date

---

## Appendix A: Toolsmith Functions Reference

### Result Functions

```typescript
// Create Result values
ok<T>(value: T): Result<never, T>
error<E>(err: E): Result<E, never>

// Transform Result values
map<E, A, B>(f: (a: A) => B): (r: Result<E, A>) => Result<E, B>
bind<E, A, B>(f: (a: A) => Result<E, B>): (r: Result<E, A>) => Result<E, B>

// Extract values
getOrElse<A>(defaultValue: A): <E>(r: Result<E, A>) => A
isOk<E, A>(r: Result<E, A>): r is { readonly ok: true; readonly value: A }

// Array operations
sequence<E, A>(results: ReadonlyArray<Result<E, A>>): Result<E, ReadonlyArray<A>>
traverse<E, A, B>(f: (a: A) => Result<E, B>): (arr: ReadonlyArray<A>) => Result<E, ReadonlyArray<B>>
```

### Validation Functions

```typescript
// Create Validation values
success<T>(value: T): Validation<never, T>
failure<E>(errors: ReadonlyArray<E>): Validation<E, never>

// Transform Validation values
map<E, A, B>(f: (a: A) => B): (v: Validation<E, A>) => Validation<E, B>
bind<E, A, B>(f: (a: A) => Validation<E, B>): (v: Validation<E, A>) => Validation<E, B>

// Extract values
getOrElse<A>(defaultValue: A): <E>(v: Validation<E, A>) => A
isSuccess<E, A>(v: Validation<E, A>): v is { readonly success: true; readonly value: A }

// Array operations
sequence<E, A>(validations: ReadonlyArray<Validation<E, A>>): Validation<E, ReadonlyArray<A>>
traverse<E, A, B>(f: (a: A) => Validation<E, B>): (arr: ReadonlyArray<A>) => Validation<E, ReadonlyArray<B>>
```

---

## Appendix B: Constitutional Rules Quick Reference

1. **No Classes** - Use pure functions only
2. **No Mutations** - All data immutable
3. **No Loops** - Use map/filter/reduce
4. **No Exceptions** - Use Result/Validation monads
5. **One Function Per File** - Single responsibility
6. **Pure Functions** - Same input → same output (except IO boundaries)
7. **No Arrow Functions** - Use `function` keyword
8. **All Functions Curried** - One parameter each

---

## Appendix C: Glossary

**Result**: Monad for fail-fast error handling. Contains either `ok(value)` or `error(err)`. Used for sequential operations where first error should stop processing.

**Validation**: Monad for error accumulation. Contains either `success(value)` or `failure(errors)`. Used for parallel/tree operations where all errors should be collected.

**traverse**: Higher-order function that applies a monadic function to an array and combines results. For Result, fails on first error. For Validation, accumulates all errors.

**sequence**: Converts `ReadonlyArray<Monad<E, A>>` to `Monad<E, ReadonlyArray<A>>`. Combines array of monadic values into single monadic value containing array.

**bind** (also called flatMap or chain): Chains monadic operations sequentially. Type: `(a: A) => M<E, B>` → `M<E, A>` → `M<E, B>`.

**map**: Transforms value inside monad. Type: `(a: A) => B` → `M<E, A>` → `M<E, B>`.

**Currying**: Transforming a function that takes multiple parameters into nested functions each taking one parameter. ALL functions in this codebase must be curried.

**Pure Function**: Function with no side effects. Same input always produces same output. No mutation, no IO, no exceptions.

---

## Document History

| Version | Date       | Author       | Changes                            |
| ------- | ---------- | ------------ | ---------------------------------- |
| 1.0     | 2025-11-06 | AI Assistant | Initial comprehensive plan created |
