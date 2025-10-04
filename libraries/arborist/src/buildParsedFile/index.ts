// @sitebender/arborist/src/buildParsedFile
// Builds a ParsedFile from SWC AST

import type { ParsedFile } from "../types/index.ts"

// SWC AST Module type - using unknown since npm types aren't available at compile time
// Will be properly typed when we implement extraction functions
type SwcModule = unknown

//++ Builds a ParsedFile from SWC AST Module
//++ This is a curried function: (ast) => (filePath) => ParsedFile
export default function buildParsedFile(_ast: SwcModule) {
	return function buildParsedFileWithAST(filePath: string): ParsedFile {
		// TODO(@guy): Day 2+ - Implement extraction functions
		// - extractFunctions (Day 2) - IN PROGRESS
		// - extractImports (Day 3)
		// - extractExports (Day 3)
		// - extractComments (Day 4)
		// - extractTypes (Day 4)
		// - extractConstants (Day 4)
		// - detectViolations (Day 5)

		// For now, return a minimal ParsedFile structure
		// Will populate with extracted data as we implement extraction functions
		return {
			filePath,
			functions: [], // TODO(@guy): extractFunctions(_ast)
			types: [],
			constants: [],
			imports: [],
			exports: [],
			comments: [],
			violations: {
				hasArrowFunctions: false,
				arrowFunctions: [],
				hasClasses: false,
				classes: [],
				hasThrowStatements: false,
				throwStatements: [],
				hasTryCatch: false,
				tryCatchBlocks: [],
				hasLoops: false,
				loops: [],
				hasMutations: false,
				mutations: [],
			},
		}
	}
}
