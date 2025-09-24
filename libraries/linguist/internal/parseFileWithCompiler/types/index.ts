import type * as ts from "npm:typescript@5.7.2"

import type { FunctionSignature } from "../../types/index.ts"

export type ParsedModule = {
	readonly sourceFile: ts.SourceFile
	readonly functions: ReadonlyArray<ParsedFunction>
	readonly types: ReadonlyArray<ParsedType> // Future
	readonly constants: ReadonlyArray<ParsedConstant> // Future
	readonly exports: ReadonlyArray<ParsedExport> // Future
}

export type ParsedFunction = {
	readonly node: ts.Node
	readonly signature: FunctionSignature
	readonly metadata: TraversalMetadata
}

export type ParsedType = {
	readonly node: ts.Node
	readonly name: string
	// Add more as needed
}

export type ParsedConstant = {
	readonly node: ts.Node
	readonly name: string
	// Add more as needed
}

export type ParsedExport = {
	readonly node: ts.Node
	readonly name: string
	// Add more as needed
}

export type TraversalMetadata = {
	// PHASE 1: High Priority
	readonly hasThrowStatements: boolean
	readonly hasAwaitExpressions: boolean
	readonly hasGlobalAccess: boolean
	readonly cyclomaticComplexity: number
	readonly hasReturnStatements: boolean

	// PHASE 2: Medium Priority
	readonly hasIfStatements: boolean
	readonly hasLoops: boolean
	readonly hasTryCatch: boolean
	readonly parameterCount: number
	readonly isArrowFunction: boolean
	readonly isAsync: boolean
	readonly isGenerator: boolean
	readonly nestingDepth: number

	// PHASE 3: Future
	readonly referencedIdentifiers: ReadonlySet<string>
	readonly callExpressions: ReadonlyArray<string>
	readonly propertyAccesses: ReadonlyArray<string>
}
