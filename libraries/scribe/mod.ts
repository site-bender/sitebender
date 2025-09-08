/**
 * @module @sitebender/scribe
 * 
 * Automatic documentation generator for TypeScript code.
 * 
 * IMPORTANT: This library follows a one-function-per-file pattern.
 * Import specific functions directly from their paths:
 * 
 * @example
 * ```typescript
 * // Preferred: Import specific functions directly
 * import generateDocs from "@sitebender/scribe/generateDocs"
 * import parseFile from "@sitebender/scribe/parser/parseFile"
 * 
 * // Also available: Main entry point for convenience
 * import { generateDocs } from "@sitebender/scribe"
 * ```
 * 
 * Main exports:
 * - generateDocs - Generate documentation from TypeScript files
 * - generateDocsWithCompiler - Generate docs using TypeScript compiler API
 * - parseFile - Parse a TypeScript file for documentation
 * - parseFunction - Parse a single function
 * - detectPurity - Detect if a function is pure
 * - detectComplexity - Analyze function complexity
 * 
 * See src/index.ts for the complete export list.
 */

// Re-export from the main index for compatibility
// while encouraging direct imports via documentation
export * from "./src/index.ts"

export const VERSION = "0.1.0"
