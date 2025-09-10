import * as ts from "npm:typescript@5.7.2"

import type { ParseError } from "../types/index.ts"
import type { Either } from "../either/index.ts"

import { Left, Right } from "../either/index.ts"
import extractFunctions from "../extractFunctions/index.ts"

// Re-export TypeScript for envoy to use (without direct import)
export { ts }

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

import type { FunctionSignature } from "../types/index.ts"

/**
 * Parses a TypeScript file using the compiler API and returns structured module data
 */
export default function parseFileWithCompiler(
	content: string,
	filePath: string,
): Either<ParseError, ParsedModule> {
	try {
		// Create source file
		const sourceFile = ts.createSourceFile(
			filePath,
			content,
			ts.ScriptTarget.Latest,
			true, // setParentNodes
			ts.ScriptKind.TS,
		)

		if (!sourceFile) {
			return Left({
				type: "ParseError",
				message: "Failed to create source file",
				file: filePath,
				line: 0,
				column: 0,
			})
		}

		// Extract functions using existing function
		const functionsResult = extractFunctions(sourceFile)
		if (!functionsResult.ok) {
			return Left(functionsResult.error)
		}

		// Add metadata to each function
		const functionsWithMetadata = functionsResult.value.map((func) => ({
			node: func.node,
			signature: func.signature,
			metadata: computeMetadata(func.node),
		}))

		return Right({
			sourceFile,
			functions: functionsWithMetadata,
			types: [], // TODO: Implement extractTypes
			constants: [], // TODO: Implement extractConstants
			exports: [], // TODO: Implement extractExports
		})
	} catch (error) {
		return Left({
			type: "ParseError",
			message: error instanceof Error ? error.message : "Unknown error",
			file: filePath,
			line: 0,
			column: 0,
		})
	}
}

/**
 * Computes traversal metadata for a TypeScript node
 */
function computeMetadata(node: ts.Node): TraversalMetadata {
	const metadata: Partial<TraversalMetadata> = {
		hasThrowStatements: false,
		hasAwaitExpressions: false,
		hasGlobalAccess: false,
		cyclomaticComplexity: 1,
		hasReturnStatements: false,
		hasIfStatements: false,
		hasLoops: false,
		hasTryCatch: false,
		parameterCount: 0,
		isArrowFunction: false,
		isAsync: false,
		isGenerator: false,
		nestingDepth: 0,
		referencedIdentifiers: new Set(),
		callExpressions: [],
		propertyAccesses: [],
	}

	// Check node type
	if (ts.isArrowFunction(node)) {
		metadata.isArrowFunction = true
	}

	if (ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || 
		ts.isArrowFunction(node) || ts.isMethodDeclaration(node)) {
		const funcNode = node as ts.FunctionLikeDeclaration
		metadata.parameterCount = funcNode.parameters.length
		metadata.isAsync = Boolean(funcNode.modifiers?.some(m => m.kind === ts.SyntaxKind.AsyncKeyword))
		metadata.isGenerator = 'asteriskToken' in funcNode && Boolean(funcNode.asteriskToken)
	}

	// Traverse the node to collect metadata
	function visit(n: ts.Node, depth: number = 0): void {
		// Update nesting depth
		if (depth > (metadata.nestingDepth || 0)) {
			metadata.nestingDepth = depth
		}

		// Check for throw statements
		if (ts.isThrowStatement(n)) {
			metadata.hasThrowStatements = true
		}

		// Check for await expressions
		if (ts.isAwaitExpression(n)) {
			metadata.hasAwaitExpressions = true
		}

		// Check for global access
		if (ts.isIdentifier(n)) {
			const text = n.getText()
			if (isGlobalIdentifier(text)) {
				metadata.hasGlobalAccess = true
			}
			metadata.referencedIdentifiers?.add(text)
		}

		// Check for return statements
		if (ts.isReturnStatement(n)) {
			metadata.hasReturnStatements = true
		}

		// Check for if statements
		if (ts.isIfStatement(n)) {
			metadata.hasIfStatements = true
			metadata.cyclomaticComplexity = (metadata.cyclomaticComplexity || 1) + 1
		}

		// Check for loops
		if (ts.isForStatement(n) || ts.isForInStatement(n) || 
			ts.isForOfStatement(n) || ts.isWhileStatement(n) || 
			ts.isDoStatement(n)) {
			metadata.hasLoops = true
			metadata.cyclomaticComplexity = (metadata.cyclomaticComplexity || 1) + 1
		}

		// Check for try-catch
		if (ts.isTryStatement(n)) {
			metadata.hasTryCatch = true
		}

		// Check for call expressions
		if (ts.isCallExpression(n) && ts.isIdentifier(n.expression)) {
			(metadata.callExpressions as string[]).push(n.expression.getText())
		}

		// Check for property access
		if (ts.isPropertyAccessExpression(n)) {
			(metadata.propertyAccesses as string[]).push(n.getText())
		}

		// Continue traversing
		ts.forEachChild(n, (child) => visit(child, depth + 1))
	}

	visit(node)

	return metadata as TraversalMetadata
}

/**
 * Checks if an identifier is a global
 */
function isGlobalIdentifier(name: string): boolean {
	const globals = new Set([
		"console", "window", "document", "global", "process",
		"Buffer", "setTimeout", "setInterval", "clearTimeout",
		"clearInterval", "setImmediate", "clearImmediate",
		"require", "module", "exports", "__dirname", "__filename",
		"alert", "confirm", "prompt", "fetch", "XMLHttpRequest",
	])
	return globals.has(name)
}