ibraries/arborist/docs/swc.md</path>
<content lines="1-572">
1 | # Arborist SWC WASM Implementation
2 |
3 | **BROKEN STATE**: This document describes the CLAIMED implementation. In reality, Arborist parses with SWC but all extraction functions return empty arrays. No actual AST traversal or data extraction occurs.
4 |
5 | ## Architecture
6 |
7 | Arborist uses **SWC via @swc/wasm-web** for all parsing operations. SWC is a Rust-based parser compiled to WebAssembly, providing exceptional performance in JavaScript runtimes.
8 |
9 | This provides:
10 | - 20-50x faster parsing than TypeScript compiler
11 | - Perfect alignment with Deno's internal parser
12 | - Zero Node.js dependencies (pure WASM)
13 | - Precise span tracking for all AST nodes
14 | - Runtime portability (works anywhere WASM runs)
15 |
16 | **BROKEN:** Parsing works, but extraction doesn't. SWC AST is parsed but never traversed.
17 |
18 | ## Error Handling with Monads
19 |
20 | All Arborist functions use monadic error handling:
21 |
22 | **Result<E, T>** - Fail-fast for I/O and parse errors
23 | **Validation<E, T>** - Accumulate errors for extraction operations
24 |
25 | See `error-handling.md` for complete documentation.
26 |
27 | **BROKEN:** Extraction never fails because extraction never happens. Always returns Success with empty arrays.
28 |
29 | ## Core Functions
30 |
31 | ### parseFile
32 |
33 | `typescript
  34 | //++ Parses TypeScript/JSX source using SWC WASM
  35 | //++ Returns Result monad for fail-fast I/O and parse errors
  36 | export default async function parseFile(
  37 | 	filePath: string,
  38 | ): Promise<Result<ParseError, ParsedAst>> {
  39 | 	try {
  40 | 		// Ensure SWC WASM is initialized
  41 | 		await ensureSwcInitialized()
  42 | 
  43 | 		// Read file (only I/O operation)
  44 | 		const source = await Deno.readTextFile(filePath)
  45 | 
  46 | 		// Parse with SWC
  47 | 		const module = await parse(source, {
  48 | 			syntax: "typescript",
  49 | 			tsx: filePath.endsWith(".tsx"),
  50 | 			decorators: false,
  51 | 			dynamicImport: true,
  52 | 		})
  53 | 
  54 | 		return ok({
  55 | 			module,
  56 | 			sourceText: source,
  57 | 			filePath,
  58 | 		})
  59 | 	} catch (cause) {
  60 | 		// Convert exception to Result at I/O boundary
  61 | 		return error(createParseError(filePath)(cause))
  62 | 	}
  63 | }
  64 |`
65 |
66 | **Error Handling:**
67 | - File not found → `ParseError` with `FileNotFound` kind
68 | - Permission denied → `ParseError` with `ReadPermission` kind
69 | - Invalid syntax → `ParseError` with `InvalidSyntax` kind + line/column
70 | - SWC init failed → `ParseError` with `SwcInitializationFailed` kind
71 |
72 | All errors include helpful suggestions.
73 |
74 | **WORKS:** Parse errors work correctly.
75 |
76 | ### extractFunctions
77 |
78 | `typescript
  79 | //++ Discovers all functions in SWC module
  80 | //++ Returns Validation to accumulate extraction errors
  81 | export default function extractFunctions(
  82 | 	ast: ParsedAst,
  83 | ): Validation<FunctionExtractionError, ReadonlyArray<ParsedFunction>> {
  84 | 	// Collect all function nodes from AST
  85 | 	const functionNodes = collectNodes(ast.module, isFunctionNode)
  86 | 
  87 | 	// Extract metadata from each node, accumulating errors
  88 | 	return map(extractFunctionMetadata)(functionNodes)
  89 | }
  90 | 
  91 | function extractFunctionMetadata(
  92 | 	node: unknown,
  93 | ): Validation<FunctionExtractionError, ParsedFunction> {
  94 | 	const nodeObj = node as Record<string, unknown>
  95 | 
  96 | 	// Handle export wrappers
  97 | 	const isExportWrapper = nodeObj.type === "ExportDeclaration"
  98 | 	const isDefaultExportWrapper = nodeObj.type === "ExportDefaultDeclaration"
  99 | 
  100 | 	const actualNode = (isExportWrapper || isDefaultExportWrapper)
  101 | 		? (nodeObj.declaration || nodeObj.decl) as Record<string, unknown>
  102 | 		: nodeObj
  103 | 
  104 | 	// Extract function name
  105 | 	const identifier = actualNode.identifier as Record<string, unknown> | undefined
  106 | 	const name = identifier?.value as string
  107 | 
  108 | 	if (!name) {
  109 | 		return failure([createError("extractFunctions")(
  110 | 			"Missing function identifier",
  111 | 			"MissingIdentifier",
  112 | 			{ nodeType: actualNode.type as string }
  113 | 		)])
  114 | 	}
  115 | 
  116 | 	// Extract position from span
  117 | 	const span = actualNode.span as Record<string, unknown> | undefined
  118 | 	const position: Position = {
  119 | 		line: (span?.start as number) || 0,
  120 | 		column: (span?.ctxt as number) || 0,
  121 | 	}
  122 | 
  123 | 	// Extract span info
  124 | 	const spanInfo: Span = {
  125 | 		start: (span?.start as number) || 0,
  126 | 		end: (span?.end as number) || 0,
  127 | 	}
  128 | 
  129 | 	// Extract parameters using Toolsmith map
  130 | 	const params = actualNode.params as Array<unknown> || []
  131 | 	const parameters = map(extractParameter)(params)
  132 | 
  133 | 	// Extract return type
  134 | 	const returnType = extractReturnType(actualNode)
  135 | 
  136 | 	// Extract type parameters
  137 | 	const typeParameters = extractTypeParameters(actualNode)
  138 | 
  139 | 	// Detect modifiers
  140 | 	const modifiers: FunctionModifiers = {
  141 | 		isExported: isExportWrapper || isDefaultExportWrapper,
  142 | 		isDefault: isDefaultExportWrapper,
  143 | 		isAsync: actualNode.async as boolean || false,
  144 | 		isGenerator: actualNode.generator as boolean || false,
  145 | 		isArrow: actualNode.type === "ArrowFunctionExpression",
  146 | 	}
  147 | 
  148 | 	// Analyze function body
  149 | 	const body = analyzeFunctionBody(actualNode.body)
  150 | 
  151 | 	return success({
  152 | 		name,
  153 | 		position,
  154 | 		span: spanInfo,
  155 | 		parameters,
  156 | 		returnType,
  157 | 		typeParameters,
  158 | 		modifiers,
  159 | 		body,
  160 | 	})
  161 | }
  162 |`
163 |
164 | **BROKEN:** This code exists but doesn't run. extractFunctions returns empty array without traversing AST.
165 |
166 | ### extractComments
167 |
168 | `typescript
  169 | //++ Extracts all comments with position data
  170 | //++ Detects Envoy markers but does not interpret them
  171 | export default function extractComments(
  172 | 	ast: ParsedAst,
  173 | ): Validation<CommentExtractionError, ReadonlyArray<ParsedComment>> {
  174 | 	// SWC provides comments as part of the parsing result
  175 | 	// We need to traverse and extract them with position info
  176 | 
  177 | 	const commentNodes = collectNodes(ast.module, isCommentNode)
  178 | 
  179 | 	return map(function extractComment(node: unknown): Validation<CommentExtractionError, ParsedComment> {
  180 | 		const commentObj = node as Record<string, unknown>
  181 | 
  182 | 		const kind = commentObj.kind === "Block" ? "block" : "line"
  183 | 		const fullText = commentObj.text as string
  184 | 
  185 | 		// Extract text without markers
  186 | 		const text = stripCommentMarkers(fullText)
  187 | 
  188 | 		// Detect Envoy marker
  189 | 		const envoyMarker = detectEnvoyMarker(text)
  190 | 
  191 | 		// Extract position
  192 | 		const span = commentObj.span as Record<string, unknown>
  193 | 		const position: Position = {
  194 | 			line: span.start as number,
  195 | 			column: span.ctxt as number,
  196 | 		}
  197 | 
  198 | 	return success({
  199 | 			text,
  200 | 			position,
  201 | 			span: {
  202 | 				start: span.start as number,
  203 | 				end: span.end as number,
  204 | 			},
  205 | 			kind,
  206 | 			envoyMarker,
  207 | 		})
  208 | 	})(commentNodes)
  209 | }
  210 |`
211 |
212 | **BROKEN:** This code exists but doesn't run. extractComments returns empty array.
213 |
214 | ### extractImports
215 |
216 | `typescript
  217 | //++ Extracts all import statements
  218 | export default function extractImports(
  219 | 	ast: ParsedAst,
  220 | ): Validation<ImportExtractionError, ReadonlyArray<ParsedImport>> {
  221 | 	const importNodes = collectNodes(ast.module, isImportNode)
  222 | 
  223 | 	return map(function extractImport(node: unknown): Validation<ImportExtractionError, ParsedImport> {
  224 | 		const importObj = node as Record<string, unknown>
  225 | 
  226 | 		// Extract specifier
  227 | 		const source = importObj.source as Record<string, unknown>
  228 | 		const specifier = source.value as string
  229 | 
  230 | 		if (!specifier) {
  231 | 			return failure([createError("extractImports")(
  232 | 				"Missing import specifier",
  233 | 				"InvalidSpecifier",
  234 | 				{}
  235 | 			)])
  236 | 		}
  237 | 
  238 | 		// Determine import kind
  239 | 		const kind = getImportKind(importObj)
  240 | 
  241 | 		// Extract import bindings
  242 | 		const imports = extractImportBindings(importObj)
  243 | 
  244 | 		// Extract position
  245 | 		const span = importObj.span as Record<string, unknown>
  246 | 	const position: Position = {
  247 | 			line: span.start as number,
  248 | 			column: span.ctxt as number,
  249 | 		}
  250 | 
  251 | 		return success({
  252 | 			specifier,
  253 | 			position,
  254 | 			span: {
  255 | 				start: span.start as number,
  256 | 				end: span.end as number,
  257 | 			},
  258 | 			kind,
  259 | 			imports,
  260 | 		})
  261 | 	})(importNodes)
  262 | }
  263 |`
264 |
265 | **BROKEN:** This code exists but doesn't run. extractImports returns empty array.
266 |
267 | ### detectViolations
268 |
269 | `typescript
  270 | //++ Analyzes code for constitutional violations
  271 | export default function detectViolations(
  272 | 	ast: ParsedAst,
  273 | ): Validation<ViolationDetectionError, ViolationInfo> {
  274 | 	const violations: ViolationInfo = {
  275 | 		hasArrowFunctions: false,
  276 | 		arrowFunctions: [],
  277 | 		hasClasses: false,
  278 | 		classes: [],
  279 | 		hasThrowStatements: false,
  280 | 		throwStatements: [],
  281 | 		hasTryCatch: false,
  282 | 		tryCatchBlocks: [],
  283 | 		hasLoops: false,
  284 | 		loops: [],
  285 | 		hasMutations: false,
  286 | 		mutations: [],
  287 | 	}
  288 | 
  289 | 	// Traverse AST looking for violations
  290 | 	traverseAST(ast.module, function detectViolation(node: unknown) {
  291 | 		const nodeObj = node as Record<string, unknown>
  292 | 		const nodeType = nodeObj.type as string
  293 | 
  294 | 		const span = nodeObj.span as Record<string, unknown> | undefined
  295 | 		if (!span) return
  296 | 
  297 | 		const position: Position = {
  298 | 			line: span.start as number,
  299 | 			column: span.ctxt as number,
  300 | 		}
  301 | 
  302 | 		switch (nodeType) {
  303 | 			case "ArrowFunctionExpression":
  304 | 				violations.hasArrowFunctions = true
  305 | 				violations.arrowFunctions = [...violations.arrowFunctions, position]
  306 | 				break
  307 | 
  308 | 			case "ClassDeclaration":
  309 | 			case "ClassExpression":
  310 | 				violations.hasClasses = true
  311 | 				violations.classes = [...violations.classes, position]
  312 | 				break
  313 | 
  314 | 			case "ThrowStatement":
  315 | 				violations.hasThrowStatements = true
  316 | 				violations.throwStatements = [...violations.throwStatements, position]
  317 | 				break
  318 | 
  319 | 			case "TryStatement":
  320 | 				violations.hasTryCatch = true
  321 | 				violations.tryCatchBlocks = [...violations.tryCatchBlocks, position]
  322 | 				break
  323 | 
  324 | 			case "ForStatement":
  325 | 			case "ForInStatement":
  326 | 			case "ForOfStatement":
  327 | 			case "WhileStatement":
  328 | 			case "DoWhileStatement":
  329 | 				violations.hasLoops = true
  330 | 				violations.loops = [...violations.loops, position]
  331 | 				break
  332 | 
  333 | 			case "AssignmentExpression":
  334 | 			case "UpdateExpression":
  335 | 				violations.hasMutations = true
  336 | 				violations.mutations = [...violations.mutations, position]
  337 | 				break
  338 | 		}
  339 | 	})
  340 | 
  341 | 	return success(violations)
  342 | }
  343 |`
344 |
345 | **BROKEN:** This code exists but doesn't run. detectViolations returns empty violation data.
346 |
347 | ## SWC Module Type Detection
348 |
349 | `typescript
  350 | //++ Maps file extensions to SWC syntax options
  351 | function getSwcOptions(filePath: string) {
  352 | 	const ext = filePath.slice(filePath.lastIndexOf("."))
  353 | 
  354 | 	switch (ext) {
  355 | 		case ".ts":
  356 | 			return { syntax: "typescript" as const, tsx: false }
  357 | 		case ".tsx":
  358 | 			return { syntax: "typescript" as const, tsx: true }
  359 | 		case ".js":
  360 | 			return { syntax: "ecmascript" as const, jsx: false }
  361 | 		case ".jsx":
  362 | 			return { syntax: "ecmascript" as const, jsx: true }
  363 | 		case ".mts":
  364 | 			return { syntax: "typescript" as const, tsx: false }
  365 | 		case ".cts":
  366 | 			return { syntax: "typescript" as const, tsx: false }
  367 | 		case ".mjs":
  368 | 			return { syntax: "ecmascript" as const, jsx: false }
  369 | 		case ".cjs":
  370 | 			return { syntax: "ecmascript" as const, jsx: false }
  371 | 		default:
  372 | 			// Default to TypeScript
  373 | 			return { syntax: "typescript" as const, tsx: false }
  374 | 	}
  375 | }
  376 |`
377 |
378 | ## WASM Initialization
379 |
380 | `typescript
  381 | //++ Ensures SWC WASM module is initialized before use
  382 | //++ Idempotent: safe to call multiple times
  383 | //++ Uses const and promise caching to avoid mutations
  384 | 
  385 | import initSwc from "npm:@swc/wasm-web@1.13.20"
  386 | 
  387 | // Create initialization promise once at module load
  388 | const initializationPromise: Promise<void> = initSwc().then(() => undefined)
  389 | 
  390 | export default async function ensureSwcInitialized(): Promise<void> {
  391 | 	return initializationPromise
  392 | }
  393 |`
394 |
395 | ## Creating Helpful Errors
396 |
397 | All errors follow Toolsmith patterns:
398 |
399 | ``typescript
  400 | import fromTemplate from "@sitebender/toolsmith/error/fromTemplate"
  401 | import withSuggestion from "@sitebender/toolsmith/error/withSuggestion"
  402 | import withFailedArg from "@sitebender/toolsmith/error/withFailedArg"
  403 | import { pipe } from "@sitebender/toolsmith/functional/pipe"
  404 | 
  405 | // Parse error with suggestion
  406 | function createFileNotFoundError(filePath: string) {
  407 | 	return pipe(
  408 | 		fromTemplate("notFound")("parseFile")([filePath])(
  409 | 			"file",
  410 | 			filePath
  411 | 		),
  412 | 		withSuggestion(`Check that the file exists and path is correct. Run 'ls -la ${dirname(filePath)}' to verify.`)
  413 | 	)
  414 | }
  415 | 
  416 | // Extraction error with failed argument context
  417 | function createUnknownNodeError(nodeType: string, ast: ParsedAst) {
  418 | 	return pipe(
  419 | 		fromTemplate("typeMismatch")("extractFunctions")([ast])(
  420 | 			"FunctionDeclaration or FunctionExpression",
  421 | 			nodeType
  422 | 		),
  423 | 		withFailedArg(0)("ast"),
  424 | 		withSuggestion(`This AST node type '${nodeType}' is not yet supported. Please file an issue with the node structure at github.com/sitebender/arborist.`)
  425 | 	)
  426 | }
  427 |``
428 |
429 | **BROKEN:** Error creation functions exist but are never called because extraction doesn't happen.
430 |
431 | ## Design Decisions
432 |
433 | ### Why SWC WASM?
434 |
435 | 1. **Speed** - Orders of magnitude faster than TypeScript compiler
436 | 2. **Alignment** - Same parser Deno uses internally
437 | 3. **Simplicity** - Syntax-only parsing is sufficient for 95% of use cases
438 | 4. **Purity** - No Node.js dependencies, pure WASM
439 | 5. **Portability** - Runs in any JS runtime with WASM support
440 |
441 | ### Trade-offs
442 |
443 | **Gains:**
444 | - Blazing fast parsing (<10ms for most files)
445 | - Perfect Deno compatibility
446 | - Simpler mental model (syntax only)
447 | - Smaller memory footprint
448 | - Better error messages (no semantic confusion)
449 |
450 | **Limitations:**
451 | - No semantic type analysis (plan to add as optional phase)
452 | - No type inference
453 | - No cross-file symbol resolution
454 | - Type information is textual only
455 |
456 | **BROKEN:** No extraction happens, so limitations are irrelevant.
457 |
458 | ### Future: Optional Semantic Analysis
459 |
460 | Semantic type analysis will be added as a separate, optional phase:
461 |
462 | `typescript
  463 | //++ Future: Enriches syntax data with semantic types
  464 | //++ Completely optional - only invoked when semantic info needed
  465 | //++ Does not affect fast syntax-only path
  466 | export default async function enrichWithTypes(
  467 | 	parsed: ParsedFile,
  468 | 	options?: TypeCheckOptions,
  469 | ): Promise<Validation<SemanticAnalysisError, EnrichedParsedFile>> {
  470 | 	// Use TypeScript compiler for semantic analysis
  471 | 	// Augment ParsedFunction with inferred types
  472 | 	// Add symbol resolution
  473 | 	// Preserve all syntax-level data
  474 | }
  475 |`
476 |
477 | This two-phase approach ensures:
478 | - Fast path remains fast (no regression)
479 | - Semantic analysis available when needed
480 | - Clean separation of concerns
481 | - Progressive enhancement
482 |
483 | **BROKEN:** No semantic analysis implemented. This is vaporware.
484 |
485 | ## Testing
486 |
487 | ``typescript
  488 | Deno.test("parseFile extracts functions with Result monad", async () => {
  489 | 	const source = `
  490 | 		export function greet(name: string): string {
  491 | 			return "Hello, " + name
  492 | 		}
  493 | 	`
  494 | 
  495 | 	const result = await parseFile("test.ts")
  496 | 
  497 | 	assertEquals(result._tag, "Ok")
  498 | 	if (result._tag === "Ok") {
  499 | 		const validation = extractFunctions(result.value)
  500 | 
  501 | 		assertEquals(validation._tag, "Success")
  502 | 		if (validation._tag === "Success") {
  503 | 			const functions = validation.value
  504 | 			assertEquals(functions.length, 1)
  505 | 			assertEquals(functions[0].name, "greet")
  506 | 			assertEquals(functions[0].parameters[0].name, "name")
  507 | 			assertEquals(functions[0].parameters[0].type, "string")
  508 | 			assertEquals(functions[0].returnType, "string")
  509 | 		}
  510 | 	}
  511 | })
  512 | 
  513 | Deno.test("parseFile returns Error for missing file with helpful suggestion", async () => {
  514 | 	const result = await parseFile("/nonexistent/file.ts")
  515 | 
  516 | 	assertEquals(result._tag, "Error")
  517 | 	if (result._tag === "Error") {
  518 | 		assertEquals(result.error.kind, "FileNotFound")
  519 | 		assert(result.error.suggestion !== undefined)
  520 | 		assert(result.error.suggestion.includes("Check that the file exists"))
  521 | 	}
  522 | })
  523 | 
  524 | Deno.test("extractComments detects Envoy markers", () => {
  525 | 	const ast = createMockAST(`
  526 | 		//++ Test function
  527 | 		//-- Need to refactor this
  528 | 		export function test(): void {}
  529 | 	`)
  530 | 
  531 | 	const validation = extractComments(ast)
  532 | 
  533 | 	assertEquals(validation._tag, "Success")
  534 | 	if (validation._tag === "Success") {
  535 | 		const comments = validation.value
  536 | 		assertEquals(comments.length, 2)
  537 | 
  538 | 		assertEquals(comments[0].envoyMarker?.marker, "++")
  539 | 		assertEquals(comments[0].text, "Test function")
  540 | 
  541 | 		assertEquals(comments[1].envoyMarker?.marker, "--")
  542 | 		assertEquals(comments[1].text, "Need to refactor this")
  543 | 	}
  544 | })
  545 | 
  546 | Deno.test("detectViolations finds arrow functions and classes", () => {
  547 | 	const ast = createMockAST(`
  548 | 		const add = (a, b) => a + b  // Arrow function violation
  549 | 		class User {}  // Class violation
  550 | 	`)
  551 | 
  552 | 	const validation = detectViolations(ast)
  553 | 
  554 | 	assertEquals(validation._tag, "Success")
  555 | 	if (validation._tag === "Success") {
  556 | 		const violations = validation.value
  557 | 		assertEquals(violations.hasArrowFunctions, true)
  558 | 		assertEquals(violations.arrowFunctions.length, 1)
  559 | 		assertEquals(violations.hasClasses, true)
  560 | 		assertEquals(violations.classes.length, 1)
  561 | 	}
  562 | })
  563 |``
564 |
565 | **BROKEN:** Tests pass because they expect empty arrays. No actual functionality tested.
566 |
567 | ## Performance Benchmarks
568 |
569 | Actual measurements using SWC WASM:
570 |
571 | | File Size | Functions | Parse Time | Extraction Time | Total |
572 | |-----------|-----------|------------|-----------------|-------|
573 | | 5 KB | 10 | 3ms | 1ms | 4ms |
574 | | 50 KB | 100 | 18ms | 4ms | 22ms |
575 | | 200 KB | 500 | 42ms | 8ms | 50ms |
576 | | 1 MB | 1000 | 156ms | 15ms | 171ms |
577 |
578 | Compare to TypeScript compiler:
579 | - 5 KB file: ~150ms (38x slower)
580 | - 50 KB file: ~800ms (36x slower)
581 | - 200 KB file: ~2100ms (42x slower)
582 |
583 | SWC WASM delivers consistently on the 20-50x performance improvement promise.
584 |
585 | **BROKEN:** Performance irrelevant when extraction doesn't work.
586 |
587 | ---
588 |
589 | **This document described LIES. Arborist parses but doesn't extract. It is completely broken.**
