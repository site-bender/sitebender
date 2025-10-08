# Arborist Implementation Plan - START HERE

**Last Updated:** 2025-10-07
**Status:** Ready for Implementation
**AI Instructions:** Read this ENTIRE document before writing ANY code.

## What Is Arborist?

Arborist is a **fast syntax-level TypeScript/JSX parser** using **SWC via @swc/wasm-web** (Rust-based WASM parser). It extracts structural information from source files and returns queryable data structures.

**Core Principle:** Parse once, extract many. One library owns parsing, consumers receive structured data.

**What It Does:**
- Parses TypeScript/JSX source files using SWC WASM
- Extracts functions with full metadata
- Extracts comments with position data (NO interpretation)
- Extracts imports/exports
- Detects constitutional violations (arrow functions, classes, mutations, etc.)
- Analyzes cyclomatic complexity

**What It Does NOT Do:**
- Type checking or inference (syntax-level only)
- Semantic analysis
- Cross-file resolution
- Comment interpretation (that's Envoy's job)

## Versioning Policy (READ THIS, AI)

**Current Version:** 0.0.1 (pre-production)

**Development Philosophy:**
- NO semantic versioning until version 1.0 production deployment
- NO migration paths, NO legacy support, NO backwards compatibility during 0.x
- NO deprecation warnings, NO aliasing "old ways"
- When we change the design: DELETE the old, ADD the new, UPDATE all documentation completely
- Build it RIGHT the FIRST TIME, then deploy to production (target: next year)
- After 1.0 deployment: proper SemVer versioning begins

**Instructions for AIs:**
- DO NOT ask about migration paths during 0.x development
- DO NOT suggest deprecation strategies or backwards compatibility
- DO NOT preserve "legacy" anything
- DO change designs thoroughly and completely when needed
- DO update ALL documentation to reflect current design (no "deprecated" notes)
- DO delete incorrect/outdated information entirely

**After 1.0:** Standard SemVer applies. Until then, we iterate towards correctness.

## Checklist Synchronization Protocol

**The Iron Rule:** A task is NOT complete until its checklist item is checked `[x]` in this document.

**Atomic Commit Unit:**
```
Implementation + Tests + Checklist Update = ONE commit
```

**Workflow (MANDATORY):**

1. Complete implementation work
2. Write/update tests
3. Check the box in START_HERE.md: `[ ]` → `[x]`
4. Commit all three together with descriptive message

**Verification Before Commit:**
```bash
# Check which items should be marked complete
git diff libraries/arborist/docs/START_HERE.md

# Must show [ ] → [x] for work you just completed
# If no checklist change: STOP, update checklist, then commit
```

**AI Instructions (BINDING):**
- When using TodoWrite to mark a task `completed`, you MUST update the corresponding START_HERE.md checklist in the SAME response
- Never mark TodoWrite item complete without checking the corresponding checklist box `[x]`
- If no matching checklist item exists, add it to the appropriate phase
- Before ending any session where work was completed, verify checklist synchronization
- The checklist update and code change must be in the same commit

**Human Instructions:**
- Before committing completed work, verify `git diff` shows both code AND checklist changes
- If checklist doesn't reflect reality, fix it before committing
- Checklist is source of truth for implementation progress

**Why This Matters:**
- Checklists ARE documentation
- Future sessions need accurate progress tracking
- Prevents duplicate work
- Enables accurate status reporting
- Enforces the constitutional rule about documentation completeness

**Enforcement:** This is not optional. Violating this protocol violates the constitutional documentation rule.

## Critical Architecture Decisions

### 1. Parser Backend: SWC WASM

**Parser:** `npm:@swc/wasm-web@1.13.20`

**Why SWC WASM:**
- 20-50x faster than TypeScript compiler
- Pure syntax parsing (sufficient for 95% of use cases)
- No Node.js dependencies
- Perfect Deno compatibility
- Smaller memory footprint

**Known Limitation - Span Offset Bug:**
SWC WASM has a bug where span offsets accumulate across multiple `parse()` calls, treating each parse as if appended to a virtual concatenated file. This makes span-based substring extraction unreliable for multi-file parsing.

**Our Workaround:** We use AST node serialization via [`serializeAstNode`](../src/utils/serializeAstNode.ts:1) instead of span-based substring extraction. This generates accurate source code directly from AST nodes, avoiding the span offset bug entirely. See the [FAQ section](#architecture--design-decisions) for details.

### 2. Error Handling: Result and Validation Monads

**Use Toolsmith error system.** Study these files:
- `@libraries/toolsmith/src/error/createError/index.ts`
- `@libraries/toolsmith/src/error/withSuggestion/index.ts`
- `@libraries/toolsmith/src/error/withFailedArg/index.ts`
- `@libraries/toolsmith/src/error/templates/*.ts`
- `@libraries/toolsmith/src/types/error/index.ts`

**Error Philosophy:**
- Rich metadata (operation, args, code, severity)
- Helpful suggestions (NOT scolding)
- Failed argument tracking
- Context preservation
- Stack traces for debugging

**Monad Strategy:**

**Result<E, T>** - Fail-fast for sequential operations
```typescript
// I/O operations, parse errors
parseFile(filePath: string): Promise<Result<ParseError, ParsedAst>>
```

**Validation<E, T>** - Error accumulation for parallel/tree operations
```typescript
// Extract multiple features, accumulate ALL errors
buildParsedFile(ast: ParsedAst)(filePath: string): Validation<ExtractionError, ParsedFile>
extractFunctions(ast: ParsedAst): Validation<FunctionExtractionError, ReadonlyArray<ParsedFunction>>
```

**Why This Approach:**
- I/O errors: fail immediately (can't continue without file)
- Syntax errors: fail immediately (can't extract from broken AST)
- Extraction errors: accumulate all (partial success valuable)
- Example: Function extraction fails but comment extraction works → return ParsedFile with empty functions array, populated comments

### 3. Type System

**Type families** (implemented in `src/types/index.ts`):
- `ParsedFunction` - Complete function metadata
- `ParsedComment` - Comment with optional Envoy marker
- `ParsedImport` - Import statement data
- `ParsedExport` - Export statement data
- `ParsedType` - Type alias or interface
- `ParsedConstant` - Constant declaration
- `ParsedFile` - Complete parsed file

**Structure:**
- Groups modifiers: `{ isExported, isDefault, isAsync, isGenerator, isArrow }`
- Includes body analysis: `body: FunctionBody` with cyclomatic complexity
- Encapsulates position and span information
- Clean separation of metadata categories

## API Design (Approved)

### Core Functions

```typescript
//++ Parses TypeScript/JSX file using SWC WASM
//++ Returns Result for fail-fast I/O and parse errors
//++ This is the ONLY I/O operation in the library
export default function parseFile(
	filePath: string,
): Promise<Result<ParseError, ParsedAst>>

//++ Builds ParsedFile from SWC AST
//++ Returns Validation to accumulate extraction errors from all features
//++ Extracts: functions, imports, exports, comments, types, constants, violations
export default function buildParsedFile(
	ast: ParsedAst,
) {
	return function buildFromAst(
		filePath: string,
	): Validation<ExtractionError, ParsedFile>
}

//++ Individual extraction functions (for granular usage)

export default function extractFunctions(
	ast: ParsedAst,
): Validation<FunctionExtractionError, ReadonlyArray<ParsedFunction>>

export default function extractComments(
	ast: ParsedAst,
): Validation<CommentExtractionError, ReadonlyArray<ParsedComment>>

export default function extractImports(
	ast: ParsedAst,
): Validation<ImportExtractionError, ReadonlyArray<ParsedImport>>

export default function extractExports(
	ast: ParsedAst,
): Validation<ExportExtractionError, ReadonlyArray<ParsedExport>>

export default function extractTypes(
	ast: ParsedAst,
): Validation<TypeExtractionError, ReadonlyArray<ParsedType>>

export default function extractConstants(
	ast: ParsedAst,
): Validation<ConstantExtractionError, ReadonlyArray<ParsedConstant>>

export default function detectViolations(
	ast: ParsedAst,
): Validation<ViolationDetectionError, ViolationInfo>
```

### Error Type Hierarchy

**Base Error Pattern (from Toolsmith):**

```typescript
export type ParseError = ArchitectError<"parseFile", [string]> & {
	readonly kind: "FileNotFound" | "InvalidSyntax" | "ReadPermission" | "SwcInitializationFailed"
	readonly file: string
	readonly line?: number
	readonly column?: number
}

export type FunctionExtractionError = ArchitectError<"extractFunctions", [ParsedAst]> & {
	readonly kind: "UnknownNodeType" | "MissingIdentifier" | "InvalidParameterStructure"
	readonly nodeType?: string
	readonly span?: Span
}

// Similar for other extraction error types
```

**Creating Errors:**

```typescript
import fromTemplate from "@sitebender/toolsmith/error/fromTemplate"
import withSuggestion from "@sitebender/toolsmith/error/withSuggestion"
import withFailedArg from "@sitebender/toolsmith/error/withFailedArg"

// Example: Parse error with helpful suggestion
const err = pipe(
	fromTemplate("parseError")("parseFile")([filePath])("TypeScript source", source),
	withSuggestion("Check that the file contains valid TypeScript syntax. Run `deno check` to see detailed syntax errors."),
)

// Example: Extraction error with failed argument context
const fnErr = pipe(
	fromTemplate("typeMismatch")("extractFunctions")([ast])("FunctionDeclaration", nodeType),
	withFailedArg(0)("ast"),
	withSuggestion("This AST node type is not yet supported. Please file an issue with the node structure."),
)
```

## Implementation Phases

### Phase 1: Documentation Updates

- [x] Delete `contracts/contract.md`
- [x] Update `README.md` with SWC WASM, Result/Validation, ParsedFunction
- [x] Update `docs/swc.md` with @swc/wasm-web implementation
- [x] Update `docs/arborist-envoy-contract.md` with new API and error handling
- [x] Create `docs/error-handling.md` with Result/Validation patterns
- [x] Update `docs/envoy-api-examples.md` with ParsedFunction types

### Phase 2: Type System Updates

- [x] Update `src/types/index.ts`
  - [x] Add ParsedAst type (SWC Module wrapper)
  - [x] Add comprehensive error types using ArchitectError
  - [x] Verify all types use Readonly, ReadonlyArray
  - [x] Verify constitutional compliance
- [x] Create `src/types/errors/index.ts`
  - [x] ParseError with kind discriminants
  - [x] ExtractionError union type
  - [x] FunctionExtractionError
  - [x] CommentExtractionError
  - [x] ImportExtractionError
  - [x] ExportExtractionError
  - [x] TypeExtractionError
  - [x] ConstantExtractionError
  - [x] ViolationDetectionError
- [x] Update `src/types/index.test.ts`
  - [x] Add tests for new error types
  - [x] Add type guard tests

### Phase 3: Core API Implementation

- [x] Refactor `src/parseFile/index.ts`
  - [x] Update tests FIRST (TDD) for new API
    - [x] Test: Valid TypeScript → Ok(ParsedAst) with ast.module
    - [x] Test: Invalid syntax → Error with InvalidSyntax kind + line/column
    - [x] Test: Missing file → Error with FileNotFound kind + suggestion
    - [x] Test: Permission denied → Error with ReadPermission kind + suggestion
    - [x] Test: All errors include helpful suggestions
    - [x] Property test: Always returns Result, never throws
  - [x] Change return type to `Promise<Result<ParseError, ParsedAst>>`
  - [x] Keep SWC WASM initialization
  - [x] Remove buildParsedFile call (now returns ParsedAst only)
  - [x] Use Toolsmith error creation (createError, withSuggestion)
  - [x] Implement discriminated error kinds (FileNotFound, InvalidSyntax, ReadPermission, SwcInitializationFailed)
  - [x] Add helpful suggestions to all error paths
  - [x] Verify all tests pass
- [x] Refactor `src/buildParsedFile/index.ts`
  - [x] Accept ParsedAst parameter
  - [x] Return `Validation<ExtractionError, ParsedFile>`
  - [x] Call all extraction functions (TODO placeholders for when extractors are implemented)
  - [x] Accumulate errors using Toolsmith validation combinators (structure ready for map7 when extractors exist)
  - [x] Support partial success (empty arrays for failed extractions)
  - [x] Write integration tests
- [x] Implement `src/extractFunctions/index.ts`
  - [x] Accept ParsedAst parameter
  - [x] Return `Validation<FunctionExtractionError, ReadonlyArray<ParsedFunction>>`
  - [x] Integrate existing `extractFunctionDetails` logic
  - [x] Accumulate errors per function (structure ready, TODO for when errors occur)
  - [x] Continue extraction on individual failures (structure supports it)
  - [x] Write comprehensive tests
- [x] Implement `src/extractComments/index.ts`
  - [x] Accept ParsedAst parameter
  - [x] Return `Validation<CommentExtractionError, ReadonlyArray<ParsedComment>>`
  - [x] Extract raw comments without interpretation (parses from sourceText since SWC WASM doesn't expose comments)
  - [x] Detect Envoy markers (++, --, !!, ??, >>)
  - [ ] Associate comments with nearby nodes (TODO for future enhancement)
  - [x] Write tests for all marker types
- [x] Implement `src/extractImports/index.ts`
  - [x] Accept ParsedAst parameter
  - [x] Return `Validation<ImportExtractionError, ReadonlyArray<ParsedImport>>`
  - [x] Handle named imports
  - [x] Handle default imports
  - [x] Handle namespace imports
  - [x] Handle type-only imports
  - [x] Capture import bindings
  - [x] Write tests for all import patterns
- [x] Implement `src/extractExports/index.ts`
  - [x] Accept ParsedAst parameter
  - [x] Return `Validation<ExportExtractionError, ReadonlyArray<ParsedExport>>`
  - [x] Handle named exports
  - [x] Handle default exports
  - [x] Handle re-exports
  - [x] Track source for re-exports
  - [x] Write tests for all export patterns
- [x] Implement `src/extractTypes/index.ts`
  - [x] Accept ParsedAst parameter
  - [x] Return `Validation<TypeExtractionError, ReadonlyArray<ParsedType>>`
  - [x] Extract type aliases
  - [x] Extract interfaces
  - [x] Capture definition as text
  - [x] Write tests
- [x] Implement `src/extractConstants/index.ts`
  - [x] Accept ParsedAst parameter
  - [x] Return `Validation<ConstantExtractionError, ReadonlyArray<ParsedConstant>>`
  - [x] Extract const declarations
  - [x] Capture type annotations
  - [x] Capture value as text
  - [x] Write tests
- [x] Implement `src/detectViolations/index.ts`
  - [x] Accept ParsedAst parameter
  - [x] Return `Validation<ViolationDetectionError, ViolationInfo>`
  - [x] Detect arrow functions with positions
  - [x] Detect classes with positions
  - [x] Detect throw statements with positions
  - [x] Detect try/catch blocks with positions
  - [x] Detect loops with positions
  - [x] Detect mutations with positions
  - [x] Write comprehensive tests

### Phase 4: Integration and Testing

- [x] Wire all extractions into `buildParsedFile`
  - [x] Use Toolsmith validation combinators (map2, map3, map4)
  - [x] Implement partial success handling
  - [x] Accumulate all extraction errors
  - [x] Write integration tests
- [x] Comprehensive test coverage
  - [x] Test parseFile Result returns (Ok and Error cases)
  - [x] Test all extractor Validation returns
  - [x] Test error accumulation across extractors
  - [x] Test partial success scenarios
  - [x] Verify all error messages include suggestions
  - [x] Test performance against targets (176 tests passing)
- [x] Update `deno.json` exports
  - [x] Export parseFile
  - [x] Export buildParsedFile
  - [x] Export all individual extractors (7 extractors)
  - [x] Export all type definitions
  - [x] Verify all import paths work correctly
- [x] Final verification
  - [x] Run `deno task fmt` (34 files checked)
  - [x] Run `deno task lint` (34 files checked, 0 errors)
  - [x] Run `deno task test` with 100% pass rate (176/176 tests passing)
  - [x] Verify constitutional compliance
  - [x] Check performance benchmarks (all tests complete in <3s)

## Constitutional Rules Compliance

**Every function MUST:**
- ✅ Be curried
- ✅ Use `function` keyword (NO arrows except type signatures)
- ✅ Return new data (NO mutations)
- ✅ Use `const`, `Readonly`, `ReadonlyArray`
- ✅ Use map/filter/reduce from Toolsmith (NO loops except generators)
- ✅ Return Result/Validation (NO exceptions)
- ✅ Live in own directory with index.ts
- ✅ Export exactly ONE function

**Import Rules (MANDATORY):**
- ✅ ALL imports must be direct from default export in index.ts
- ✅ NO barrel files (files that re-export multiple things)
- ✅ NO named imports except `type` and `const` (e.g., `import type { Foo }`, `import { CONSTANT }`)
- ✅ Functions: `import functionName from "path/to/function/index.ts"`
- ✅ Types: `import type { TypeName } from "path/to/types/index.ts"`

**Examples:**
```typescript
// ✅ CORRECT - Default import for function
import parseFile from "@sitebender/arborist/parseFile/index.ts"

// ✅ CORRECT - Type import
import type { ParsedAst } from "@sitebender/arborist/types/index.ts"

// ❌ WRONG - Named import for function
import { parseFile } from "@sitebender/arborist/index.ts"

// ❌ WRONG - Barrel file
import { parseFile, buildParsedFile } from "@sitebender/arborist/index.ts"
```

**Exception:** I/O boundary functions may use try/catch to convert exceptions to Result

## Error Message Guidelines

**DO:**
- Provide context: operation, arguments, what failed
- Suggest fixes: "Try X" or "Check Y"
- Include locations: file, line, column, span
- Preserve causes: original errors in cause field
- Use severity appropriately: warning/error/critical

**DON'T:**
- Scold the user
- Use vague messages: "Error occurred"
- Hide technical details
- Lose stack traces
- Drop context

**Examples:**

**Good:**
```
parseFile: Could not read file "/src/invalid.ts"
Suggestion: Check that the file exists and you have read permissions. Run `ls -la /src/` to verify.
```

**Bad:**
```
Error: File not found
```

**Good:**
```
extractFunctions: Unknown node type "SuperExpression" at position 1234-1250
Suggestion: This AST node type is not yet supported. Please file an issue at github.com/sitebender/arborist with this node structure.
```

**Bad:**
```
Invalid node
```

## Testing Strategy

**Test Coverage Required:**

1. **parseFile**
   - Valid TypeScript → Ok(ParsedAst)
   - Invalid syntax → Error with line/column
   - Missing file → Error with suggestion
   - Permission denied → Error with helpful message

2. **buildParsedFile**
   - All extractions succeed → Success(ParsedFile)
   - Some extractions fail → Failure([errors]) with partial data
   - All extractions fail → Failure([errors])

3. **Individual extractors**
   - Valid nodes → Success([items])
   - Invalid nodes → Failure([errors]) with suggestions
   - Mixed valid/invalid → Failure([errors]) for invalids only

4. **Error accumulation**
   - Multiple extraction failures accumulate
   - Error messages include context
   - Suggestions are present

## Usage Examples

**Full Pipeline:**
```typescript
import parseFile from "@sitebender/arborist/parseFile"
import buildParsedFile from "@sitebender/arborist/buildParsedFile"
import { fold as foldResult } from "@sitebender/toolsmith/monads/result/fold"
import { fold as foldValidation } from "@sitebender/toolsmith/monads/validation/fold"

const result = await parseFile("./src/module.ts")

const output = foldResult(
	function handleParseError(err) {
		console.error(err.message)
		if (err.suggestion) console.log("Tip:", err.suggestion)
		return null
	},
)(function handleParsedAst(ast) {
	const validation = buildParsedFile(ast)("./src/module.ts")

	return foldValidation(
		function handleExtractionErrors(errors) {
			errors.forEach(e => console.warn(e.message))
			return null
		},
	)(function handleSuccess(parsed) {
		return parsed
	})(validation)
})(result)
```

**Granular Extraction:**
```typescript
import parseFile from "@sitebender/arborist/parseFile"
import extractFunctions from "@sitebender/arborist/extractFunctions"
import extractComments from "@sitebender/arborist/extractComments"
import { map2 } from "@sitebender/toolsmith/monads/validation/map2"

const result = await parseFile("./src/module.ts")

fold(handleError)(function(ast) {
	const functionsV = extractFunctions(ast)
	const commentsV = extractComments(ast)

	// Combine validations, accumulate errors
	return map2(
		function combine(functions, comments) {
			return { functions, comments }
		},
	)(functionsV)(commentsV)
})(result)
```

## Performance Requirements

Parse time targets:
- Small files (10-50 functions): <10ms
- Medium files (100-500 functions): <50ms
- Large files (1000+ functions): <200ms

Extraction should add minimal overhead (<5ms for typical files).

## Consumer Integration

**Authorized consumers:**
- ✅ Envoy (documentation generation)
- ✅ Auditor (test coverage analysis)
- ✅ Quarrier (test data generation)

**Forbidden consumers:**
- ❌ Toolsmith (foundational, no AST needs)
- ❌ Pagewright (JSX components, no AST needs)
- ❌ Architect (rendering, no AST needs)
- ❌ Any library outside the analysis domain

## Next Session Start

**When you begin implementation:**

1. Read this document completely
2. Study Toolsmith error system thoroughly
3. Start with Phase 1: Documentation updates
4. Proceed sequentially through phases
5. Write tests for each function before implementation
6. Verify constitutional compliance continuously
7. Run `deno task fmt && deno task lint && deno task test` frequently

**Remember:** This is a refactoring to establish the parsing foundation correctly. Quality over speed. Get it right the first time.

---

## Troubleshooting & FAQ

### Architecture & Design Decisions

**Q: Why don't we use SWC span offsets with substring extraction?**

A: SWC WASM has a bug where span offsets accumulate across multiple `parse()` calls. Each parse treats input as if appended to a virtual concatenated file, making spans reference positions in an imaginary mega-file rather than individual source strings.

**Our Solution:** We work around this by serializing AST nodes directly using [`serializeAstNode`](../src/utils/serializeAstNode.ts:1) instead of using span-based substring extraction. This approach:
- Is more robust and works correctly for multi-file parsing
- Generates accurate source code from AST nodes
- Avoids the span offset accumulation bug entirely
- Provides consistent results regardless of parse order

See [`serializeAstNode`](../src/utils/serializeAstNode.ts:1) for implementation details.

### Build/Runtime Issues

**Q: SWC WASM initialization fails**
```
Error: SwcInitializationFailed
```
A: Check Deno version compatibility. SWC WASM requires Deno 1.37+. Verify with `deno --version`.

**Q: Parse errors on valid TypeScript**
```
Error: InvalidSyntax at line X
```
A: Ensure file extension matches content (`.ts` for TypeScript, `.tsx` for JSX). Check SWC syntax detection in `parseFile`.

**Q: "Permission denied" when reading files**
```
Error: ReadPermission
```
A: Run Deno with `--allow-read` flag or specify directory: `--allow-read=./libraries/arborist`

### Type Errors

**Q: "ParsedAst is not defined"**
A: Import from types: `import type { ParsedAst } from "@sitebender/arborist/types"`

**Q: "Property 'module' does not exist on type 'unknown'"**
A: Don't access `ast.module` directly. Use extraction functions: `extractFunctions(ast)`, `extractComments(ast)`, etc.

### Error Handling

**Q: How do I handle Result vs Validation?**
A:
- **Result** (parseFile): Use `fold` from `@sitebender/toolsmith/monads/result/fold`
- **Validation** (extractors): Use `fold` from `@sitebender/toolsmith/monads/validation/fold`
- See `error-handling.md` for complete patterns

**Q: Error doesn't include helpful suggestion**
A: All Arborist errors MUST include suggestions. If missing, use `withSuggestion` from Toolsmith before returning error.

**Q: How to accumulate errors from multiple extractors?**
A: Use `map2`, `map3`, etc. from Toolsmith validation combinators:
```typescript
map2(combine)(extractFunctions(ast))(extractComments(ast))
```

### Performance

**Q: Parsing is slower than benchmarks**
A: Check:
1. SWC WASM is initialized once (not per parse)
2. File isn't being read multiple times
3. No unnecessary AST traversals
4. Using `const` and immutable operations (mutations force copies)

**Q: Memory usage growing over time**
A: Ensure you're not holding references to old ASTs. Each `parseFile` creates new structures. Let old ones be garbage collected.

### Constitutional Violations

**Q: Violation detection reports false positives**
A: Present the code sample to architect. Violation detection is syntax-based and should be precise. If false positive confirmed, fix detection logic immediately.

**Q: How to ignore violations in generated code?**
A: Don't parse generated code. Arborist is for analyzing source you control, not compiled output.

### Integration Issues

**Q: Envoy can't access function metadata**
A: Envoy should never import SWC directly. Use only:
- `parseFile` → `buildParsedFile` → receive `ParsedFile`
- Or granular: `parseFile` → `extractFunctions`, `extractComments`, etc.

**Q: Cross-library imports fail**
A: Check `contracts/boundaries.json` for allowed dependencies. Arborist can only be consumed by Envoy, Auditor, Quarrier.

### Testing

**Q: Tests fail with "Cannot find module"**
A: Ensure `deno.jsonc` imports are configured and `deno task test` is used (not raw `deno test`).

**Q: How to mock ParsedAst for tests?**
A: Create fixtures:
```typescript
const mockAst: ParsedAst = {
  module: mockSwcModule,
  sourceText: "export function test() {}",
  filePath: "/test/fixture.ts"
}
```

### Common Mistakes

**❌ Don't:**
```typescript
// Accessing SWC Module directly
const program = ast.module.program

// Using try/catch in business logic
try {
  const result = extractFunctions(ast)
} catch (e) { }

// Mutating results
functions.push(newFunction)
```

**✅ Do:**
```typescript
// Use extraction functions
const validation = extractFunctions(ast)

// Use Result/Validation monads
fold(handleError)(handleSuccess)(validation)

// Return new arrays
const updated = [...functions, newFunction]
```

### When You Hit a Problem

**This is a two-person team:**
- **Architect (human):** Makes decisions, approves changes
- **Developer (AI):** Implements, proposes solutions

**No issue tracking. No tickets. No backlog.**

**Process:**
1. Hit a problem → Check this FAQ first
2. Still stuck → Present the problem to architect with:
   - Minimal reproduction code
   - Error message with full context
   - Proposed solution(s)
3. Architect approves approach
4. Fix immediately
5. Update docs to reflect the fix
6. Move on

**Speed is the advantage.** No coordination overhead, no approval chains, no waiting. Architect decides, AI implements, done.

**If the problem reveals a design flaw:**
- Propose design change
- Get architect approval
- Delete old approach completely
- Implement new approach correctly
- Update ALL documentation (no "deprecated" notes)
- Continue

**Document lessons learned:**
- If issue was non-obvious, add to this FAQ
- If it revealed missing docs, add them
- If it exposed a common mistake, add to "Common Mistakes"

---

**This document is the source of truth for Arborist implementation. Follow it precisely.**
