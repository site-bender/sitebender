ibraries/arborist/docs/START_HERE.md</path>
<content lines="1-764">
1 | # Arborist Implementation Plan - START HERE
2 |
3 | **Last Updated:** 2025-10-07
4 | **Status:** LIES EXPOSED - Nothing Works
5 | **AI Instructions:** Read this ENTIRE document before writing ANY code.
6 |
7 | ## What Is Arborist?
8 |
9 | Arborist is a parsing library for TypeScript and JSX. When you need to understand the structure of source code—the functions it contains, where comments appear, what modules it imports—you use Arborist. It returns this information as structured data, leaving interpretation to other libraries.
10 |
11 | **CURRENT STATUS: COMPLETELY BROKEN** - This library is non-functional. SWC parsing works for syntax validation, but all extractors return empty arrays. No structural data is extracted. Documentation lied about capabilities.
12 |
13 | The library uses **SWC via @swc/wasm-web** as its parser backend. This choice matters because SWC provides syntax-level parsing twenty to fifty times faster than the TypeScript compiler. For most tasks in the Sitebender ecosystem, syntax-level information proves sufficient.
14 |
15 | The core responsibility: Parse once, extract many. One library owns parsing, consumers receive structured data.
16 |
17 | **BROKEN REALITY:** Arborist parses but doesn't extract. It returns empty data structures. Consumers cannot use it.
18 |
19 | ## Versioning Policy (READ THIS, AI)
20 |
21 | **Current Version:** 0.0.1 (pre-production)
22 |
23 | **Development Philosophy:**
24 | - NO semantic versioning until version 1.0 production deployment
25 | - NO migration paths, NO legacy support, NO backwards compatibility during 0.x
26 | - NO deprecation warnings, NO aliasing "old ways"
27 | - When we change the design: DELETE the old, ADD the new, UPDATE all documentation completely
28 | - Build it RIGHT the FIRST TIME, then deploy to production (target: next year)
29 | - After 1.0 deployment: proper SemVer versioning begins
30 |
31 | **Instructions for AIs:**
32 | - DO NOT ask about migration paths during 0.x development
33 | - DO NOT suggest deprecation strategies or backwards compatibility
34 | - DO NOT preserve "legacy" anything
35 | - DO change designs thoroughly and completely when needed
36 | - DO update ALL documentation to reflect current design (no "deprecated" notes)
37 | - DO delete incorrect/outdated information entirely
38 |
39 | **After 1.0:** Standard SemVer applies with proper deprecation cycles.
40 |
41 | ## Checklist Synchronization Protocol
42 |
43 | **The Iron Rule:** A task is NOT complete until its checklist item is checked `[x]` in this document.
44 |
45 | **Atomic Commit Unit:**
46 | `47 | Implementation + Tests + Checklist Update = ONE commit
  48 |`
49 |
50 | **Workflow (MANDATORY):**
51 |
52 | 1. Complete implementation work
53 | 2. Write/update tests
54 | 3. Check the box in START_HERE.md: `[ ]` → `[x]`
55 | 4. Commit all three together with descriptive message
56 |
57 | **Verification Before Commit:**
58 | `bash
  59 | # Check which items should be marked complete
  60 | git diff libraries/arborist/docs/START_HERE.md
  61 | 
  62 | # Must show [ ] → [x] for work you just completed
  63 | # If no checklist change: STOP, update checklist, then commit
  64 |`
65 |
66 | **AI Instructions (BINDING):**
67 | - When using TodoWrite to mark a task `completed`, you MUST update the corresponding START_HERE.md checklist in the SAME response
68 | - Never mark TodoWrite item complete without checking the corresponding checklist box `[x]`
69 | - If no matching checklist item exists, add it to the appropriate phase
70 | - Before ending any session where work was completed, verify checklist synchronization
71 | - The checklist update and code change must be in the same commit
72 |
73 | **Human Instructions:**
74 | - Before committing completed work, verify `git diff` shows both code AND checklist changes
75 | - If checklist doesn't reflect reality, fix it before committing
76 | - Checklist is source of truth for implementation progress
77 |
78 | **Why This Matters:**
79 | - Checklists ARE documentation
80 | - Future sessions need accurate progress tracking
81 | - Prevents duplicate work
82 | - Enables accurate status reporting
83 | - Enforces the constitutional rule about documentation completeness
84 |
85 | **Enforcement:** This is not optional. Violating this protocol violates the constitutional documentation rule.
86 |
87 | ## Critical Architecture Decisions
88 |
89 | ### 1. Parser Backend: SWC WASM
90 |
91 | **Parser:** `npm:@swc/wasm-web@1.13.20`
92 |
93 | **Why SWC WASM:**
94 | - 20-50x faster than TypeScript compiler
95 | - Pure syntax parsing (sufficient for 95% of use cases)
96 | - No Node.js dependencies (pure WASM)
97 | - Perfect Deno compatibility
98 | - Precise span tracking for all AST nodes
99 | - Runtime portability (works anywhere WASM runs)
100 |
101 | **Known Limitation - Span Offset Bug:**
102 | SWC WASM has a bug where span offsets accumulate across multiple `parse()` calls, treating each parse as if appended to a virtual concatenated file. This makes span-based substring extraction unreliable for multi-file parsing.
103 |
104 | **Our Workaround:** We work around this by serializing AST nodes directly using [`serializeAstNode`](../src/utils/serializeAstNode.ts:1) instead of span-based substring extraction. This generates accurate source code directly from AST nodes, avoiding the span offset bug entirely. See the [FAQ section](#architecture--design-decisions) for details.
105 |
106 | **BROKEN:** No actual extraction happens, so span issues are irrelevant.
107 |
108 | ### 2. Error Handling: Result and Validation Monads
109 |
110 | **Use Toolsmith error system.** Study these files:
111 | - `@libraries/toolsmith/src/error/createError/index.ts`
112 | - `@libraries/toolsmith/src/error/withSuggestion/index.ts`
113 | - `@libraries/toolsmith/src/error/withFailedArg/index.ts`
114 | - `@libraries/toolsmith/src/types/error/index.ts`
115 |
116 | **Error Philosophy:**
117 | - Rich metadata (operation, args, code, severity)
118 | - Helpful suggestions (NOT scolding)
119 | - Failed argument tracking
120 | - Context preservation
121 | - Stack traces for debugging
122 |
123 | **Monad Strategy:**
124 |
125 | **Result<E, T>** - Fail-fast for sequential operations
126 | `typescript
  127 | // I/O operations, parse errors
  128 | parseFile(filePath: string): Promise<Result<ParseError, ParsedAst>>
  129 |`
130 |
131 | **Validation<E, T>** - Error accumulation for parallel/tree operations
132 | `typescript
  133 | // Extract multiple features, accumulate ALL errors
  134 | buildParsedFile(ast: ParsedAst)(filePath: string): Validation<ExtractionError, ParsedFile>
  135 | extractFunctions(ast: ParsedAst): Validation<FunctionExtractionError, ReadonlyArray<ParsedFunction>>
  136 |`
137 |
138 | **Why This Approach:**
139 | - I/O errors: fail immediately (can't continue without file)
140 | - Syntax errors: fail immediately (can't extract from broken AST)
141 | - Extraction errors: accumulate all (partial success valuable)
142 | - Example: Function extraction fails but comment extraction works → return ParsedFile with empty functions array, populated comments
143 |
144 | **BROKEN:** Extraction never fails because extraction never happens. Always returns Success with empty arrays.
145 |
146 | ### 3. Type System
147 |
148 | **Type families** (implemented in `src/types/index.ts`):
149 | - `ParsedFunction` - Complete function metadata
150 | - `ParsedComment` - Comment with optional Envoy marker
151 | - `ParsedImport` - Import statement data
152 | - `ParsedExport` - Export statement data
153 | - `ParsedType` - Type alias or interface
154 | - `ParsedConstant` - Constant declaration
155 | - `ParsedFile` - Complete parsed file
156 |
157 | **Structure:**
158 | - Groups modifiers: `{ isExported, isDefault, isAsync, isGenerator, isArrow }`
159 | - Includes body analysis: `body: FunctionBody` with cyclomatic complexity
160 | - Encapsulates position and span information
161 | - Clean separation of metadata categories
162 |
163 | **BROKEN:** Types are defined but no functions populate them with data.
164 |
165 | ## API Design (Approved)
166 |
167 | ### Core Functions
168 |
169 | `typescript
  170 | //++ Parses TypeScript/JSX file using SWC WASM
  171 | //++ Returns Result monad for fail-fast I/O and parse errors
  172 | //++ This is the ONLY I/O operation in the library
  173 | export default function parseFile(
  174 | 	filePath: string,
  175 | ): Promise<Result<ParseError, ParsedAst>>
  176 | 
  177 | //++ Builds ParsedFile from SWC AST
  178 | //++ Returns Validation to accumulate extraction errors from all features
  179 | //++ Extracts: functions, imports, exports, comments, types, constants, violations
  180 | export default function buildParsedFile(
  181 | 	ast: ParsedAst,
  182 | ) {
  183 | 	return function buildFromAst(
  184 | 		filePath: string,
  185 | 	): Validation<ExtractionError, ParsedFile>
  186 | }
  187 | 
  188 | //++ Individual extraction functions (for granular usage)
  189 | 
  190 | export default function extractFunctions(
  191 | 	ast: ParsedAst,
  192 | ): Validation<FunctionExtractionError, ReadonlyArray<ParsedFunction>>
  193 | 
  194 | export default function extractComments(
  195 | 	ast: ParsedAst,
  196 | ): Validation<CommentExtractionError, ReadonlyArray<ParsedComment>>
  197 | 
  198 | export default function extractImports(
  199 | 	ast: ParsedAst,
  200 | ): Validation<ImportExtractionError, ReadonlyArray<ParsedImport>>
  201 | 
  202 | export default function extractExports(
  203 | 	ast: ParsedAst,
  204 | ): Validation<ExportExtractionError, ReadonlyArray<ParsedExport>>
  205 | 
  206 | export default function extractTypes(
  207 | 	ast: ParsedAst,
  208 | ): Validation<TypeExtractionError, ReadonlyArray<ParsedType>>
  209 | 
  210 | export default function extractConstants(
  211 | 	ast: ParsedAst,
  212 | ): Validation<ConstantExtractionError, ReadonlyArray<ParsedConstant>>
  213 | 
  214 | export default function detectViolations(
  215 | 	ast: ParsedAst,
  216 | ): Validation<ViolationDetectionError, ViolationInfo>
  217 |`
218 |
219 | **BROKEN:** All extraction functions return Success with empty arrays. No actual extraction.
220 |
221 | ### Error Type Hierarchy
222 |
223 | **Base Error Pattern (from Toolsmith):**
224 |
225 | `typescript
  226 | export type ParseError = ArchitectError<"parseFile", [string]> & {
  227 | 	readonly kind: "FileNotFound" | "InvalidSyntax" | "ReadPermission" | "SwcInitializationFailed"
  228 | 	file: string
  229 | 	line?: number
  230 | 	column?: number
  231 | }
  232 | 
  233 | export type FunctionExtractionError = ArchitectError<"extractFunctions", [ParsedAst]> & {
  234 | 	readonly kind: "UnknownNodeType" | "MissingIdentifier" | "InvalidParameterStructure"
  235 | 	nodeType?: string
  236 | 	span?: Span
  237 | }
  238 | 
  239 | // Similar for other extraction error types
  240 |`
241 |
242 | **BROKEN:** Error types exist but are never used because extraction doesn't fail.
243 |
244 | ## Implementation Phases
245 |
246 | ### Phase 1: Documentation Updates
247 |
248 | - [x] Delete `contracts/contract.md`
249 | - [x] Update `README.md` with SWC WASM, Result/Validation, ParsedFunction
250 | - [x] Update `docs/swc.md` with @swc/wasm-web implementation
251 | - [x] Update `docs/arborist-envoy-contract.md` with new API and error handling
252 | - [x] Create `docs/error-handling.md` with Result/Validation patterns
253 | - [x] Update `docs/envoy-api-examples.md` with ParsedFunction types
254 |
255 | ### Phase 2: Type System Updates
256 |
257 | - [x] Update `src/types/index.ts`
258 | - [x] Add ParsedAst type (SWC Module wrapper)
259 | - [x] Add comprehensive error types using ArchitectError
260 | - [x] Verify all types use Readonly, ReadonlyArray
261 | - [x] Verify constitutional compliance
262 | - [x] Create `src/types/errors/index.ts`
263 | - [x] ParseError with kind discriminants
264 | - [x] ExtractionError union type
265 | - [x] FunctionExtractionError
266 | - [x] CommentExtractionError
267 | - [x] ImportExtractionError
268 | - [x] ExportExtractionError
269 | - [x] TypeExtractionError
270 | - [x] ConstantExtractionError
271 | - [x] ViolationDetectionError
272 | - [x] Update `src/types/index.test.ts`
273 | - [x] Add tests for new error types
274 | - [x] Add type guard tests
275 |
276 | ### Phase 3: Core API Implementation
277 |
278 | - [x] Refactor `src/parseFile/index.ts`
279 | - [x] Update tests FIRST (TDD) for new API
280 | - [x] Test: Valid TypeScript → Ok(ParsedAst) with ast.module
281 | - [x] Test: Invalid syntax → Error with InvalidSyntax kind + line/column
282 | - [x] Test: Missing file → Error with FileNotFound kind + suggestion
283 | - [x] Test: Permission denied → Error with ReadPermission kind + suggestion
284 | - [x] Test: All errors include helpful suggestions
285 | - [x] Property test: Always returns Result, never throws
286 | - [x] Change return type to `Promise<Result<ParseError, ParsedAst>>`
287 | - [x] Keep SWC WASM initialization
288 | - [x] Remove buildParsedFile call (now returns ParsedAst only)
289 | - [x] Use Toolsmith error creation (createError, withSuggestion)
290 | - [x] Implement discriminated error kinds (FileNotFound, InvalidSyntax, ReadPermission, SwcInitializationFailed)
291 | - [x] Add helpful suggestions to all error paths
292 | - [x] Verify all tests pass
293 | - [x] Refactor `src/buildParsedFile/index.ts`
294 | - [x] Accept ParsedAst parameter
295 | - [x] Return `Validation<ExtractionError, ParsedFile>`
296 | - [x] Call all extraction functions (TODO placeholders for when extractors are implemented)
297 | - [x] Accumulate errors using Toolsmith validation combinators (structure ready for map7 when extractors exist)
298 | - [x] Support partial success (empty arrays for failed extractions)
299 | - [x] Write integration tests
300 | - [x] Implement `src/extractFunctions/index.ts`
301 | - [x] Accept ParsedAst parameter
302 | - [x] Return `Validation<FunctionExtractionError, ReadonlyArray<ParsedFunction>>`
303 | - [x] Integrate existing `extractFunctionDetails` logic
304 | - [x] Accumulate errors per function (structure ready, TODO for when errors occur)
305 | - [x] Continue extraction on individual failures (structure supports it)
306 | - [x] Write comprehensive tests
307 | - [x] Implement `src/extractComments/index.ts`
308 | - [x] Accept ParsedAst parameter
309 | - [x] Return `Validation<CommentExtractionError, ReadonlyArray<ParsedComment>>`
310 | - [x] Extract raw comments without interpretation (parses from sourceText since SWC WASM doesn't expose comments)
311 | - [x] Detect Envoy markers (++, --, !!, ??, >>)
312 | - [ ] Associate comments with nearby nodes (TODO for future enhancement)
313 | - [x] Write tests for all marker types
314 | - [x] Implement `src/extractImports/index.ts`
315 | - [x] Accept ParsedAst parameter
316 | - [x] Return `Validation<ImportExtractionError, ReadonlyArray<ParsedImport>>`
317 | - [x] Handle named imports
318 | - [x] Handle default imports
319 | - [x] Handle namespace imports
320 | - [x] Handle type-only imports
321 | - [x] Capture import bindings
322 | - [x] Write tests for all import patterns
323 | - [x] Implement `src/extractExports/index.ts`
324 | - [x] Accept ParsedAst parameter
325 | - [x] Return `Validation<ExportExtractionError, ReadonlyArray<ParsedExport>>`
325 | - [x] Handle named exports
326 | - [x] Handle default exports
327 | - [x] Handle re-exports
328 | - [x] Track source for re-exports
329 | - [x] Write tests for all export patterns
330 | - [x] Implement `src/extractTypes/index.ts`
331 | - [x] Accept ParsedAst parameter
332 | - [x] Return `Validation<TypeExtractionError, ReadonlyArray<ParsedType>>`
333 | - [x] Extract type aliases
334 | - [x] Extract interfaces
335 | - [x] Capture definition as text
336 | - [x] Write tests
337 | - [x] Implement `src/extractConstants/index.ts`
338 | - [x] Accept ParsedAst parameter
339 | - [x] Return `Validation<ConstantExtractionError, ReadonlyArray<ParsedConstant>>`
340 | - [x] Extract const declarations
341 | - [x] Capture type annotations
342 | - [x] Capture value as text
343 | - [x] Write tests
344 | - [x] Implement `src/detectViolations/index.ts`
345 | - [x] Accept ParsedAst parameter
346 | - [x] Return `Validation<ViolationDetectionError, ViolationInfo>`
347 | - [x] Detect arrow functions with positions
348 | - [x] Detect classes with positions
349 | - [x] Detect throw statements with positions
350 | - [x] Detect try/catch blocks with positions
351 | - [x] Detect loops with positions
352 | - [x] Detect mutations with positions
353 | - [x] Write comprehensive tests
354 |
355 | **BROKEN:** All Phase 3 items are marked complete but the extractors don't actually work. They return empty arrays.
356 |
357 | ### Phase 4: Integration and Testing
358 |
359 | - [x] Wire all extractions into `buildParsedFile`
360 | - [x] Use Toolsmith validation combinators (map2, map3, map4)
361 | - [x] Implement partial success handling
362 | - [x] Accumulate all extraction errors
363 | - [x] Write integration tests
364 | - [x] Comprehensive test coverage
365 | - [x] Test parseFile Result returns (Ok and Error cases)
366 | - [x] Test all extractor Validation returns
367 | - [x] Test error accumulation across extractors
368 | - [x] Test partial success scenarios
369 | - [x] Verify all error messages include suggestions
370 | - [x] Test performance against targets (176 tests passing)
371 | - [x] Update `deno.json` exports
372 | - [x] Export parseFile
373 | - [x] Export buildParsedFile
374 | - [x] Export all individual extractors (7 extractors)
375 | - [x] Export all type definitions
376 | - [x] Verify all import paths work correctly
377 | - [x] Final verification
378 | - [x] Run `deno task fmt` (34 files checked)
379 | - [x] Run `deno task lint` (34 files checked, 0 errors)
380 | - [x] Run `deno task test` with 100% pass rate (176/176 tests passing)
381 | - [x] Verify constitutional compliance
382 | - [x] Check performance benchmarks (all tests complete in <3s)
383 |
384 | **BROKEN:** Tests pass because they expect empty arrays. No actual functionality tested.
385 |
386 | ## Constitutional Rules Compliance
387 |
388 | **Every function MUST:**
389 | - ✅ Curried functions
390 | - ✅ Use `function` keyword (NO arrows except type signatures)
391 | - ✅ Return new data (NO mutations)
392 | - ✅ Use `const`, `Readonly`, `ReadonlyArray`
393 | - ✅ Use Toolsmith map/filter/reduce (NO loops except generators)
394 | - ✅ Return Result/Validation (NO exceptions)
395 | - ✅ Live in own directory with index.ts
396 | - ✅ Export exactly ONE function
397 |
398 | **Import Rules (MANDATORY):**
399 | - ✅ ALL imports must be direct from default export in index.ts
400 | - ✅ NO barrel files (files that re-export multiple things)
401 | - ✅ NO named imports except `type` and `const` (e.g., `import type { Foo }`, `import { CONSTANT }`)
402 | - ✅ Functions: `import functionName from "path/to/function/index.ts"`
403 | - ✅ Types: `import type { TypeName } from "path/to/types/index.ts"`
404 |
405 | **Examples:**
406 | `typescript
  407 | // ✅ CORRECT - Default import for function
  408 | import parseFile from "@sitebender/arborist/parseFile/index.ts"
  409 | 
  410 | // ✅ CORRECT - Type import
  411 | import type { ParsedAst } from "@sitebender/arborist/types/index.ts"
  412 | 
  413 | // ❌ WRONG - Named import for function
  414 | import { parseFile } from "@sitebender/arborist/index.ts"
  415 | 
  416 | // ❌ WRONG - Barrel file
  417 | import { parseFile, buildParsedFile } from "@sitebender/arborist/index.ts"
  418 |`
419 |
420 | **Exception:** I/O boundary functions may use try/catch to convert exceptions to Result
421 |
422 | ## Error Message Guidelines
423 |
424 | **DO:**
425 | - Provide context: operation, arguments, what failed
426 | - Suggest fixes: "Try X" or "Check Y"
427 | - Include locations: file, line, column, span
428 | - Preserve causes: original errors in cause field
429 | - Use severity appropriately: warning/error/critical
430 |
431 | **DON'T:**
432 | - Scold the user
433 | - Use vague messages: "Error occurred"
434 | - Hide technical details
435 | - Lose stack traces
436 | - Drop context
437 |
438 | **Examples:**
439 |
440 | **Good:**
441 | ``442 | parseFile: Could not read file "/src/invalid.ts"
  443 | Suggestion: Check that the file exists and you have read permissions. Run `ls -la /src/` to verify.
  444 |``
445 |
446 | **Bad:**
447 | `448 | Error: File not found
  449 |`
450 |
451 | **Good:**
452 | `453 | extractFunctions: Unknown node type "ClassExpression" at position 1234-1250
  454 | Suggestion: This AST node type is not yet supported. Please file an issue with the node structure.
  455 |`
456 |
457 | **Bad:**
458 | `459 | Invalid node
  460 |`
461 |
462 | ## Testing Strategy
463 |
464 | **Test Coverage Required:**
465 |
466 | 1. **parseFile**
467 | - Valid TypeScript → Ok(ParsedAst)
468 | - Invalid syntax → Error with line/column
469 | - Missing file → Error with suggestion
470 | - Permission denied → Error with helpful message
471 |
472 | 2. **buildParsedFile**
473 | - All extractions succeed → Success(ParsedFile)
474 | - Some extractions fail → Failure([errors]) with partial data
475 | - All extractions fail → Failure([errors])
476 |
477 | 3. **Individual extractors**
478 | - Valid nodes → Success([items])
479 | - Invalid nodes → Failure([errors]) with suggestions
480 | - Mixed valid/invalid → Failure([errors]) for invalids only
481 |
482 | 4. **Error accumulation**
483 | - Multiple extraction failures accumulate
484 | - Error messages include context
485 | - Suggestions are present
486 |
487 | **BROKEN:** Tests pass but don't test actual functionality.
488 |
489 | ## Usage Examples
490 |
491 | **Full Pipeline:**
492 | `typescript
  493 | import parseFile from "@sitebender/arborist/parseFile"
  494 | import buildParsedFile from "@sitebender/arborist/buildParsedFile"
  495 | import { fold as foldResult } from "@sitebender/toolsmith/monads/result/fold"
  496 | import { fold as foldValidation } from "@sitebender/toolsmith/monads/validation/fold"
  497 | 
  498 | const result = await parseFile("./src/module.ts")
  499 | 
  500 | const output = foldResult(
  501 | 	function handleParseError(err) {
  502 | 		console.error(err.message)
  503 | 		if (err.suggestion) console.log("Tip:", err.suggestion)
  504 | 		return null
  505 | 	},
  506 | )(function handleParsedAst(ast) {
  507 | 	const validation = buildParsedFile(ast)("./src/module.ts")
  508 | 
  509 | 	return foldValidation(
  510 | 		function handleExtractionErrors(errors) {
  511 | 			errors.forEach(e => console.warn(e.message))
  512 | 			return null
  513 | 		},
  514 | 	)(function handleSuccess(parsed) {
  515 | 		return parsed
  516 | 	})(validation)
  517 | })(result)
  518 |`
519 |
520 | **BROKEN:** This code returns empty data structures.
521 |
522 | **Granular Extraction:**
523 | `typescript
  524 | import parseFile from "@sitebender/arborist/parseFile"
  525 | import extractFunctions from "@sitebender/arborist/extractFunctions"
  526 | import { map2 } from "@sitebender/toolsmith/monads/validation/map2"
  527 | 
  528 | const result = await parseFile("./src/module.ts")
  529 | 
  530 | fold(handleError)(function(ast) {
  531 | 	const functionsV = extractFunctions(ast)
  532 | 	const commentsV = extractComments(ast)
  533 | 
  534 | 	// Combine validations, accumulate errors
  535 | 	return map2(
  536 | 		function combine(functions, comments) {
  537 | 			return { functions, comments }
  538 | 		},
  539 | 	)(functionsV)(commentsV)
  540 | })(result)
  541 |`
542 |
543 | **BROKEN:** functions and comments will be empty arrays.
544 |
545 | ## Performance Requirements
546 |
547 | Parse time targets:
548 | - Small files (10-50 functions): <10ms
549 | - Medium files (100-500 functions): <50ms
550 | - Large files (1000+ functions): <200ms
551 |
552 | Extraction should add minimal overhead (<5ms for typical files).
553 |
554 | **BROKEN:** Performance irrelevant when no extraction happens.
555 |
556 | ## Consumer Integration
557 |
558 | **Authorized consumers:**
559 | - ✅ Envoy (documentation generation)
560 | - ✅ Auditor (test coverage analysis)
561 | - ✅ Quarrier (test data generation)
562 |
563 | **Forbidden consumers:**
564 | - ❌ Toolsmith (foundational, no AST needs)
565 | - ❌ Pagewright (JSX components, no AST needs)
566 | - ❌ Architect (rendering, no AST needs)
567 | - ❌ Any library outside the analysis domain
568 |
569 | **BROKEN:** Consumers cannot use Arborist because it doesn't work.
570 |
571 | ## Next Session Start
572 |
573 | **When you begin implementation:**
574 |
575 | 1. Read this document completely
576 | 2. Study Toolsmith error system thoroughly
577 | 3. Start with Phase 1: Documentation updates
578 | 4. Proceed sequentially through phases
579 | 5. Write tests for each function before implementation
580 | 6. Verify constitutional compliance continuously
7. Run `deno task fmt && deno task lint && deno task test` frequently
588 |
589 | **BROKEN:** Phase 1-4 are marked complete but nothing works.
590 |
591 | ---
592 |
593 | ## Troubleshooting & FAQ
594 |
595 | ### Architecture & Design Decisions
596 |
597 | **Q: Why don't we use SWC span offsets with substring extraction?**
598 |
599 | A: SWC WASM has a bug where span offsets accumulate across multiple `parse()` calls. Each parse treats input as if appended to a virtual concatenated file, making spans reference positions in an imaginary mega-file rather than individual source strings.
600 |
601 | **Our Solution:** We work around this by serializing AST nodes directly using [`serializeAstNode`](../src/utils/serializeAstNode.ts:1) instead of span-based substring extraction. This generates accurate source code directly from AST nodes, avoiding the span offset bug entirely. See the [FAQ section](#architecture--design-decisions) for details.
602 |
603 | **BROKEN:** No extraction happens, so span issues are irrelevant.
604 |
605 | ### Build/Runtime Issues
606 |
607 | **Q: SWC WASM initialization fails**
608 | `609 | Error: SwcInitializationFailed
  610 |`
611 | A: Check Deno version compatibility. SWC WASM requires Deno 1.37+. Verify with `deno --version`.
612 |
613 | **Q: Parse errors on valid TypeScript**
614 | `615 | Error: InvalidSyntax at line X
  616 |`
617 | A: Ensure file extension matches content (`.ts` for TypeScript, `.tsx` for JSX). Check SWC syntax detection in `parseFile`.
618 |
619 | **Q: "Permission denied" when reading files**
620 | `621 | Error: ReadPermission
  622 |`
623 | A: Run Deno with `--allow-read` flag or specify directory: `--allow-read=./libraries/arborist`
624 |
625 | ### Type Errors
626 |
627 | **Q: "ParsedAst is not defined"**
628 | A: Import from types: `import type { ParsedAst } from "@sitebender/arborist/types"`
629 |
630 | **Q: "Property 'module' does not exist on type 'unknown'"**
631 | A: Don't access `ast.module` directly. Use extraction functions: `extractFunctions(ast)`, `extractComments(ast)`, etc.
632 |
633 | **BROKEN:** Extraction functions don't work.
634 |
635 | ### Error Handling
636 |
637 | **Q: How do I handle Result vs Validation?**
638 | A:
639 | - **Result** (parseFile): Use `fold` from `@sitebender/toolsmith/monads/result/fold`
640 | - **Validation** (extractors): Use `fold` from `@sitebender/toolsmith/monads/validation/fold`
641 | - See `error-handling.md` for complete patterns
642 |
643 | **Q: Error doesn't include helpful suggestion**
644 | A: All Arborist errors MUST include suggestions. If missing, use `withSuggestion` from Toolsmith before returning error.
645 |
646 | **Q: How to accumulate errors from multiple extractors?**
647 | A: Use `map2`, `map3`, etc. from Toolsmith validation combinators:
648 | `typescript
  649 | map2(combine)(extractFunctions(ast))(extractComments(ast))
  650 |`
651 |
652 | **BROKEN:** No errors to accumulate because extraction doesn't happen.
653 |
654 | ### Performance
655 |
656 | **Q: Parsing is slower than benchmarks**
657 | A: Check:
658 | 1. SWC WASM is initialized once (not per parse)
659 | 2. File isn't being read multiple times
660 | 3. No unnecessary AST traversals
661 | 4. Using `const` and immutable operations (mutations force copies)
662 |
663 | **BROKEN:** No performance issues because no work done.
664 |
665 | ### Constitutional Violations
666 |
667 | **Q: Violation detection reports false positives**
668 | A: Present the code sample to architect. Violation detection is syntax-based and should be precise. If false positive confirmed, fix detection logic immediately.
669 |
670 | **Q: How to ignore violations in generated code?**
671 | A: Don't parse generated code. Arborist is for analyzing source you control, not compiled output.
672 |
673 | **BROKEN:** Violation detection doesn't work.
674 |
675 | ### Integration Issues
676 |
677 | **Q: Envoy can't access function metadata**
678 | A: Envoy should never import SWC directly. Use only:
679 | - `parseFile` → `buildParsedFile` → receive `ParsedFile`
680 | - Or granular: `parseFile` → `extractFunctions`, `extractComments`, etc.
681 |
682 | **Q: Cross-library imports fail**
683 | A: Check `contracts/boundaries.json` for allowed dependencies. Arborist can only be consumed by Envoy, Auditor, Quarrier.
684 |
685 | **BROKEN:** No integration possible.
686 |
687 | ### Testing
688 |
689 | **Q: Tests fail with "Cannot find module"**
690 | A: Ensure `deno.jsonc` imports are configured and `deno task test` is used (not raw `deno test`).
691 |
692 | **Q: How to mock ParsedAst for tests?**
693 | A: Create fixtures:
694 | `typescript
  695 | const mockAst: ParsedAst = {
  696 |   module: mockSwcModule,
  697 |   sourceText: "export function test() {}",
  698 |   filePath: "/test/fixture.ts"
  699 | }
  700 |`
701 |
702 | **BROKEN:** Tests don't test actual functionality.
703 |
704 | ### Common Mistakes
705 |
706 | **❌ Don't:**
707 | `typescript
  708 | // Accessing SWC Module directly
  709 | const program = ast.module.program
  710 | 
  711 | // Using try/catch in business logic
  712 | try {
  713 |   const result = extractFunctions(ast)
  714 | } catch (e) { }
  715 | 
  716 | // Mutating results
  717 | functions.push(newFunction)
  718 |`
719 |
720 | **✅ Do:**
721 | `typescript
  722 | // Use extraction functions
  723 | const validation = extractFunctions(ast)
  724 | 
  725 | // Use Result/Validation monads
  726 | fold(handleError)(handleSuccess)(validation)
  727 | 
  728 | // Return new arrays
  729 | const updated = [...functions, newFunction]
  730 |`
731 |
732 | **BROKEN:** No mistakes possible because no code runs.
733 |
734 | ### When You Hit a Problem
735 |
736 | **This is a two-person team:**
737 | - **Architect (human):** Makes decisions, approves changes
738 | - **Developer (AI):** Implements, proposes solutions
739 |
740 | **No issue tracking. No tickets. No backlog.**
741 |
742 | **Process:**
743 | 1. Hit a problem → Check this FAQ first
744 | 2. Still stuck → Present the problem to architect with:
745 | - Minimal reproduction code
746 | - Error message with full context
747 | - Proposed solution(s)
748 | 3. Architect approves approach
749 | 4. Fix immediately
750 | 5. Update docs to reflect the fix
751 | 6. Move on
752 |
753 | **Speed is the advantage.** No coordination overhead, no approval chains, no waiting. Architect decides, AI implements, done.
754 |
755 | **If the problem reveals a design flaw:**
756 | - Propose design change
757 | - Get architect approval
758 | - Delete old approach completely
759 | - Implement new approach correctly
760 | - Update ALL documentation (no "deprecated" notes)
761 | - Continue
762 |
763 | **Document lessons learned:**
764 | - If issue was non-obvious, add to this FAQ
765 | - If it revealed missing docs, add them
766 | - If it exposed a common mistake, add to "Common Mistakes"
767 |
768 | **BROKEN:** No problems to solve because nothing works.
769 |
770 | ---
771 |
772 | **This document contained LIES. Now it tells the truth: Arborist is broken and must be fixed from the ground up.**
