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
parseFile(filePath: string): Promise<Result<ParseError, ParsedAST>>
```

**Validation<E, T>** - Error accumulation for parallel/tree operations
```typescript
// Extract multiple features, accumulate ALL errors
buildParsedFile(ast: ParsedAST)(filePath: string): Validation<ExtractionError, ParsedFile>
extractFunctions(ast: ParsedAST): Validation<FunctionExtractionError, ReadonlyArray<ParsedFunction>>
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
): Promise<Result<ParseError, ParsedAST>>

//++ Builds ParsedFile from SWC AST
//++ Returns Validation to accumulate extraction errors from all features
//++ Extracts: functions, imports, exports, comments, types, constants, violations
export default function buildParsedFile(
	ast: ParsedAST,
) {
	return function buildFromAST(
		filePath: string,
	): Validation<ExtractionError, ParsedFile>
}

//++ Individual extraction functions (for granular usage)

export default function extractFunctions(
	ast: ParsedAST,
): Validation<FunctionExtractionError, ReadonlyArray<ParsedFunction>>

export default function extractComments(
	ast: ParsedAST,
): Validation<CommentExtractionError, ReadonlyArray<ParsedComment>>

export default function extractImports(
	ast: ParsedAST,
): Validation<ImportExtractionError, ReadonlyArray<ParsedImport>>

export default function extractExports(
	ast: ParsedAST,
): Validation<ExportExtractionError, ReadonlyArray<ParsedExport>>

export default function extractTypes(
	ast: ParsedAST,
): Validation<TypeExtractionError, ReadonlyArray<ParsedType>>

export default function extractConstants(
	ast: ParsedAST,
): Validation<ConstantExtractionError, ReadonlyArray<ParsedConstant>>

export default function detectViolations(
	ast: ParsedAST,
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

export type FunctionExtractionError = ArchitectError<"extractFunctions", [ParsedAST]> & {
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

- [ ] Update `src/types/index.ts`
  - [ ] Add ParsedAST type (SWC Module wrapper)
  - [ ] Add comprehensive error types using ArchitectError
  - [ ] Verify all types use Readonly, ReadonlyArray
  - [ ] Verify constitutional compliance
- [ ] Create `src/types/errors/index.ts`
  - [ ] ParseError with kind discriminants
  - [ ] ExtractionError union type
  - [ ] FunctionExtractionError
  - [ ] CommentExtractionError
  - [ ] ImportExtractionError
  - [ ] ExportExtractionError
  - [ ] TypeExtractionError
  - [ ] ConstantExtractionError
  - [ ] ViolationDetectionError
- [ ] Update `src/types/index.test.ts`
  - [ ] Add tests for new error types
  - [ ] Add type guard tests

### Phase 3: Core API Implementation

- [ ] Refactor `src/parseFile/index.ts`
  - [ ] Change return to `Promise<Result<ParseError, ParsedAST>>`
  - [ ] Keep SWC WASM initialization
  - [ ] Return ParsedAST instead of ParsedFile
  - [ ] Use Toolsmith error creation
  - [ ] Add helpful suggestions to all errors
  - [ ] Write tests for all error cases
- [ ] Refactor `src/buildParsedFile/index.ts`
  - [ ] Accept ParsedAST parameter
  - [ ] Return `Validation<ExtractionError, ParsedFile>`
  - [ ] Call all extraction functions
  - [ ] Accumulate errors using Toolsmith validation combinators
  - [ ] Support partial success (empty arrays for failed extractions)
  - [ ] Write integration tests
- [ ] Implement `src/extractFunctions/index.ts`
  - [ ] Accept ParsedAST parameter
  - [ ] Return `Validation<FunctionExtractionError, ReadonlyArray<ParsedFunction>>`
  - [ ] Integrate existing `extractFunctionDetails` logic
  - [ ] Accumulate errors per function
  - [ ] Continue extraction on individual failures
  - [ ] Write comprehensive tests
- [ ] Implement `src/extractComments/index.ts`
  - [ ] Accept ParsedAST parameter
  - [ ] Return `Validation<CommentExtractionError, ReadonlyArray<ParsedComment>>`
  - [ ] Extract raw comments without interpretation
  - [ ] Detect Envoy markers (++, --, !!, ??, >>)
  - [ ] Associate comments with nearby nodes
  - [ ] Write tests for all marker types
- [ ] Implement `src/extractImports/index.ts`
  - [ ] Accept ParsedAST parameter
  - [ ] Return `Validation<ImportExtractionError, ReadonlyArray<ParsedImport>>`
  - [ ] Handle named imports
  - [ ] Handle default imports
  - [ ] Handle namespace imports
  - [ ] Handle type-only imports
  - [ ] Capture import bindings
  - [ ] Write tests for all import patterns
- [ ] Implement `src/extractExports/index.ts`
  - [ ] Accept ParsedAST parameter
  - [ ] Return `Validation<ExportExtractionError, ReadonlyArray<ParsedExport>>`
  - [ ] Handle named exports
  - [ ] Handle default exports
  - [ ] Handle re-exports
  - [ ] Track source for re-exports
  - [ ] Write tests for all export patterns
- [ ] Implement `src/extractTypes/index.ts`
  - [ ] Accept ParsedAST parameter
  - [ ] Return `Validation<TypeExtractionError, ReadonlyArray<ParsedType>>`
  - [ ] Extract type aliases
  - [ ] Extract interfaces
  - [ ] Capture definition as text
  - [ ] Write tests
- [ ] Implement `src/extractConstants/index.ts`
  - [ ] Accept ParsedAST parameter
  - [ ] Return `Validation<ConstantExtractionError, ReadonlyArray<ParsedConstant>>`
  - [ ] Extract const declarations
  - [ ] Capture type annotations
  - [ ] Capture value as text
  - [ ] Write tests
- [ ] Implement `src/detectViolations/index.ts`
  - [ ] Accept ParsedAST parameter
  - [ ] Return `Validation<ViolationDetectionError, ViolationInfo>`
  - [ ] Detect arrow functions with positions
  - [ ] Detect classes with positions
  - [ ] Detect throw statements with positions
  - [ ] Detect try/catch blocks with positions
  - [ ] Detect loops with positions
  - [ ] Detect mutations with positions
  - [ ] Write comprehensive tests

### Phase 4: Integration and Testing

- [ ] Wire all extractions into `buildParsedFile`
  - [ ] Use Toolsmith validation combinators (map2, map3, etc.)
  - [ ] Implement partial success handling
  - [ ] Accumulate all extraction errors
  - [ ] Write integration tests
- [ ] Comprehensive test coverage
  - [ ] Test parseFile Result returns (Ok and Error cases)
  - [ ] Test all extractor Validation returns
  - [ ] Test error accumulation across extractors
  - [ ] Test partial success scenarios
  - [ ] Verify all error messages include suggestions
  - [ ] Test performance against targets
- [ ] Update `deno.json` exports
  - [ ] Export parseFile
  - [ ] Export buildParsedFile
  - [ ] Export all individual extractors
  - [ ] Export all type definitions
  - [ ] Verify all import paths work correctly
- [ ] Final verification
  - [ ] Run `deno task fmt`
  - [ ] Run `deno task lint`
  - [ ] Run `deno task test` with 100% pass rate
  - [ ] Verify constitutional compliance
  - [ ] Check performance benchmarks

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
   - Valid TypeScript → Ok(ParsedAST)
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
)(function handleParsedAST(ast) {
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

**Q: "ParsedAST is not defined"**
A: Import from types: `import type { ParsedAST } from "@sitebender/arborist/types"`

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

**Q: How to mock ParsedAST for tests?**
A: Create fixtures:
```typescript
const mockAST: ParsedAST = {
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
