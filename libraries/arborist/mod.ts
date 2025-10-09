//-- [MODULE] Arborist: Dual-Mode TypeScript/JSX Parser with Semantic Analysis
//-- [DESCRIPTION] Provides fast syntax parsing (SWC) and full semantic analysis (deno_ast) for the Sitebender ecosystem
//-- [API] Use tree-shakeable deep imports only - no barrel exports allowed per constitutional rules
//--
//-- ## Core Philosophy
//--
//-- Arborist eliminates parsing duplication across libraries by providing a single, consistent parsing interface with two modes:
//-- - **SWC Mode**: 20-50x faster syntax-only parsing for structural analysis (Architect)
//-- - **deno_ast Mode**: Full semantic analysis for type inference and advanced analysis (Envoy/Auditor/Quarrier)
//--
//-- ## Public API Functions
//--
//-- ### Primary Parsing Functions
//-- - [parseFile](./src/api/parseFile/index.ts) - Auto-detects optimal parser based on file content and consumer needs
//-- - [parseFileWithSemantics](./src/api/parseFileWithSemantics/index.ts) - Full semantic analysis using deno_ast (replaces Envoy's missing parseFileWithCompiler)
//-- - [parseFileWithSwc](./src/api/parseFileWithSwc/index.ts) - Fast syntax-only parsing using SWC (optimized for Architect)
//--
//-- ### File Building Functions
//-- - [buildParsedFile](./src/api/buildParsedFile/index.ts) - Extract all structural data from parsed AST
//-- - [buildSemanticFile](./src/api/buildSemanticFile/index.ts) - Extract structural + semantic data from semantic AST
//--
//-- ### Extraction Functions (Advanced Usage)
//-- - [extractFunctions](./src/extractors/extractFunctions/index.ts) - Function signatures, bodies, and metadata
//-- - [extractComments](./src/extractors/extractComments/index.ts) - Comments with Envoy marker detection
//-- - [extractImports](./src/extractors/extractImports/index.ts) - Import statements and bindings
//-- - [extractExports](./src/extractors/extractExports/index.ts) - Export statements and metadata
//-- - [extractTypes](./src/extractors/extractTypes/index.ts) - Type aliases and interface definitions
//-- - [extractConstants](./src/extractors/extractConstants/index.ts) - Const declarations and values
//-- - [detectViolations](./src/extractors/detectViolations/index.ts) - Constitutional rule violations
//--
//-- ## Usage Examples
//--
//-- ### For Envoy (Documentation Generation)
//-- ```typescript
//-- import parseFileWithSemantics from "@sitebender/arborist/src/api/parseFileWithSemantics/index.ts"
//-- import buildSemanticFile from "@sitebender/arborist/src/api/buildSemanticFile/index.ts"
//--
//-- const result = await parseFileWithSemantics("./src/userService.ts")
//-- // Result contains: inferred types, purity analysis, complexity metrics, symbol table
//--
//-- const semanticFile = buildSemanticFile(result.ast)(result.filePath)
//-- // semanticFile contains all structural + semantic information
//-- ```
//--
//-- ### For Architect (JSX Structure Analysis)
//-- ```typescript
//-- import parseFileWithSwc from "@sitebender/arborist/src/api/parseFileWithSwc/index.ts"
//-- import buildParsedFile from "@sitebender/arborist/src/api/buildParsedFile/index.ts"
//--
//-- const result = await parseFileWithSwc("./components/Calculator.tsx")
//-- // Fast parsing focused on JSX structure, not semantics
//--
//-- const parsedFile = buildParsedFile(result.ast)(result.filePath)
//-- // parsedFile contains structural information for IR generation
//-- ```
//--
//-- ### Auto-Detection (General Usage)
//-- ```typescript
//-- import parseFile from "@sitebender/arborist/src/api/parseFile/index.ts"
//--
//-- // Automatically chooses optimal parser based on:
//-- // - File extension (.tsx triggers semantic analysis)
//-- // - Import patterns (Envoy markers suggest semantic analysis)
//-- // - Consumer library (known usage patterns)
//-- const result = await parseFile("./src/component.tsx")
//-- ```
//--
//-- ## Architecture Details
//--
//-- ### Parser Selection Logic
//--
//-- Arborist automatically selects the optimal parser:
//--
//-- | Consumer | File Type | Parser | Reason |
//-- |----------|-----------|--------|---------|
//-- | Envoy | Any | deno_ast | Needs semantic analysis for documentation intelligence |
//-- | Auditor | Any | deno_ast | Needs type information for test generation |
//-- | Quarrier | Any | deno_ast | Needs symbol resolution for property generation |
//-- | Architect | .tsx | SWC | JSX structure parsing only |
//-- | Architect | .ts | SWC | Type annotations sufficient |
//--
//-- ### Performance Characteristics
//--
//-- - **SWC Mode**: 20-50x faster than TSC, suitable for real-time parsing
//-- - **deno_ast Mode**: 2-5x slower than SWC but provides full semantic analysis
//-- - **Memory**: Both modes optimized for large codebases
//-- - **WASM**: deno_ast supports client-side parsing for browser-based tools
//--
//-- ### Error Handling
//--
//-- All functions return Toolsmith monads:
//-- - **Result**: Fail-fast operations (parsing errors)
//-- - **Validation**: Accumulating errors (extraction failures)
//--
//-- ```typescript
//-- import { fold as foldResult } from "@sitebender/toolsmith/monads/result/fold"
//-- import { fold as foldValidation } from "@sitebender/toolsmith/monads/validation/fold"
//--
//-- const result = await parseFile("./invalid.ts")
//-- const output = foldResult(
//--   (error) => console.error("Parse failed:", error.message),
//--   (ast) => console.log("Parsed successfully")
//-- )(result)
//-- ```
//--
//-- ## Dependencies
//--
//-- - **[@swc/wasm-web@1.13.20](https://npmjs.com/@swc/wasm-web)** - Fast syntax parsing (Rust-based)
//-- - **[deno_ast@0.38.1](https://deno.land/x/deno_ast)** - Semantic analysis (Rust-based, WASM-ready)
//--
//-- Both dependencies are locked to specific versions for reproducibility.
//--
//-- ## Integration Points
//--
//-- ### Envoy (Documentation Intelligence)
//-- Uses semantic analysis to generate:
//-- - Function purity analysis
//-- - Complexity metrics (cyclomatic, cognitive)
//-- - Mathematical property detection
//-- - Type relationship graphs
//-- - Automated documentation from code structure
//--
//-- ### Auditor (Test Generation)
//-- Leverages semantic information for:
//-- - Type-aware test data generation
//-- - Property-based testing boundaries
//-- - Mock data respecting type constraints
//-- - Coverage analysis with type information
//--
//-- ### Quarrier (Property Testing)
//-- Uses semantic analysis for:
//-- - Intelligent property generation
//-- - Type-constrained random data
//-- - Mathematical invariant detection
//-- - Edge case identification
//--
//-- ### Architect (JSX Compilation)
//-- Uses syntax parsing for:
//-- - JSX structure analysis
//-- - Component hierarchy extraction
//-- - IR generation for runtime compilation
//-- - Fast iterative development
//--
//-- ## Future Enhancements
//--
//-- - **WASM Client Support**: Browser-based parsing for web tools
//-- - **Incremental Parsing**: Cache and reuse parse results
//-- - **Multi-Language Support**: Extend beyond TypeScript/JSX
//-- - **Performance Profiling**: Built-in benchmarking tools
//--
//-- ## Constitutional Compliance
//--
//-- Arborist follows all Sitebender constitutional rules:
//-- - ✅ One function per file, default export
//-- - ✅ Curried functions with meaningful inner names
//-- - ✅ Immutable data structures (Readonly types)
//-- - ✅ Monadic error handling (Result/Validation)
//-- - ✅ No classes, no mutations, no loops, no exceptions
//-- - ✅ Tree-shakeable deep imports only
//-- - ✅ Comprehensive error messages with suggestions
//--
//-- ## See Also
//--
//-- - [Envoy](../envoy/README.md) - Documentation intelligence using semantic analysis
//-- - [Architect](../architect/README.md) - JSX compilation using syntax parsing
//-- - [Auditor](../auditor/README.md) - Test generation using type information
//-- - [Quarrier](../quarrier/README.md) - Property testing using semantic analysis
//-- - [Toolsmith](../toolsmith/README.md) - Monadic utilities powering error handling
