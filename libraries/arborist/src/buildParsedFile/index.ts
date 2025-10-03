// @sitebender/arborist/src/buildParsedFile
// Builds a ParsedFile from source code

//-- [TODO] Day 2: Accept AST Module instead of source string
//-- For Day 1, using minimal implementation to unblock testing

import type { ParsedFile } from "../types/index.ts"

//++ Builds a ParsedFile from source code
//++ This is a curried function: (source) => (filePath) => ParsedFile
//-- [TODO] Day 2: Parse AST and extract all information
export default function buildParsedFile(_source: string) {
	return function buildParsedFileWithSource(filePath: string): ParsedFile {
		// TODO(@guy): Day 2+ - Implement extraction functions
		// - extractFunctions (Day 2)
		// - extractImports (Day 3)
		// - extractExports (Day 3)
		// - extractComments (Day 4)
		// - extractTypes (Day 4)
		// - extractConstants (Day 4)
		// - detectViolations (Day 5)

		// For now, return a minimal ParsedFile structure
		return {
			filePath,
			functions: [],
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
