# Linguist-Envoy Integration Contract

## Version 1.0 - Locked and Agreed

This document formalizes the integration contract between the Linguist and Envoy libraries. Both AIs have agreed to these terms.

---

## 1. API Alignment

### 1.1 Either/Result Compatibility

Linguist will provide Either-compatible constructors while maintaining backward compatibility:

```typescript
// Existing Result type remains
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }

// New Either constructors for monadic flow
const Right = <A>(value: A): Result<A, never> => ({ ok: true, value })
const Left = <E>(error: E): Result<never, E> => ({ ok: false, error })

// Main API returns Either-compatible Result
export function parseFileWithCompiler(
	content: string,
	filePath: string,
): Result<ParsedModule, ParseError>
```

### 1.2 ParsedModule Structure

```typescript
type ParsedModule = {
	functions: ReadonlyArray<ParsedFunction>
	types: ReadonlyArray<ParsedType> // Future
	constants: ReadonlyArray<ParsedConstant> // Future
	exports: ReadonlyArray<ParsedExport> // Future
}

type ParsedFunction = {
	node: typescript.Node // Real TS node, not wrapped
	signature: FunctionSignature // Existing signature type
	metadata: TraversalMetadata // NEW: Pre-computed analysis
}
```

---

## 2. Pre-Computed Metadata

### 2.1 TraversalMetadata Structure

Linguist will collect the following metadata during initial traversal:

```typescript
type TraversalMetadata = {
	// HIGH PRIORITY - Week 1
	hasThrowStatements: boolean // For purity detection
	hasAwaitExpressions: boolean // For purity detection
	hasGlobalAccess: boolean // For purity detection
	cyclomaticComplexity: number // For complexity analysis
	hasReturnStatements: boolean // For currying detection

	// MEDIUM PRIORITY - Week 3
	hasIfStatements: boolean
	hasLoops: boolean
	parameterCount: number
	nestingDepth: number

	// LOW PRIORITY - Future
	callExpressions?: ReadonlyArray<string>
	propertyAccesses?: ReadonlyArray<string>
	referencedIdentifiers?: ReadonlySet<string>
}
```

### 2.2 Metadata Benefits

- Eliminates redundant AST traversals in Envoy
- Provides fast-path optimization for purity detection
- Reduces complexity analysis from O(n) to O(1)

---

## 3. Shared Utilities

### 3.1 Location

`libraries/toolsmith/src/ast/` - New directory for shared AST utilities

### 3.2 Core Traversal Function

```typescript
// Works with real TypeScript nodes
export const traverseTypescriptNode = <S, A>(
  visitor: (node: typescript.Node) => State<S, A>
) => (root: typescript.Node): State<S, Array<A>>
```

### 3.3 Usage Pattern

Both libraries will use the same traversal pattern:

- Linguist: During initial parsing and metadata collection
- Envoy: For deep analysis when metadata fast-path isn't sufficient

---

## 4. Implementation Timeline

### Week 1: Core Integration ✅

- [ ] Linguist: Add Either constructors (Right/Left)
- [ ] Linguist: Collect HIGH PRIORITY metadata
- [ ] Envoy: Update to consume Either results
- [ ] Envoy: Use metadata for fast-path optimization

### Week 2: Shared Utilities

- [ ] Toolsmith: Create ast/traverseTypescriptNode
- [ ] Linguist: Refactor to use shared traversal
- [ ] Envoy: Convert detectors to shared traversal

### Week 3: Enhanced Metadata

- [ ] Linguist: Add MEDIUM PRIORITY metadata
- [ ] Both: Performance testing and optimization

### Week 4: Polish

- [ ] Documentation and examples
- [ ] Performance benchmarking
- [ ] Consider adapter pattern if needed

---

## 5. Technical Constraints

### 5.1 Non-Negotiable Requirements

1. **Performance**: Linguist must remain fast for large files (< 1s for 500 functions)
2. **TypeScript Compatibility**: Use real `typescript.Node`, no unnecessary wrapping
3. **Memory Efficiency**: Minimal object allocation during traversal
4. **Backward Compatibility**: Existing Result API continues to work

### 5.2 Deferred Features

- Streaming/incremental parsing (Phase 2)
- Full AstNode wrapper type (only if needed)
- Complete call expression tracking (Phase 2)

---

## 6. Integration Example

### Linguist Side

```typescript
const parseFileWithCompiler = (content: string, filePath: string) =>
	doEither<ParseError, ParsedModule>(function* () {
		const sourceFile = yield parseSourceFile(filePath)
		const functions = yield extractFunctionsWithMetadata(sourceFile)
		return {
			functions,
			types: [],
			constants: [],
			exports: [],
		}
	})
```

### Envoy Side

```typescript
const generateDocs = doEither<ParseError, Documentation>(function* () {
	const parsed = yield parseFileWithCompiler(content, filePath)
	const func = parsed.functions[0]

	// Use metadata for fast-path
	if (func.metadata.hasThrowStatements) {
		// Skip expensive purity analysis
	}

	return generateDocumentation(func)
})
```

---

## 7. Success Metrics

- ✅ Both libraries use monadic patterns
- ✅ Zero redundant AST traversals
- ✅ < 100ms for small files (10-50 functions)
- ✅ < 1s for medium files (100-500 functions)
- ✅ Full type safety across library boundary

---

## Agreement

**Linguist AI**: ✅ Agreed and committed to implementation
**Envoy AI**: ✅ Agreed and ready to integrate

**Date**: September 2025
**Version**: 1.0

---

## Amendments

Any changes to this contract require agreement from both Linguist and Envoy AIs.
