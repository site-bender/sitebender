import * as ts from "npm:typescript@5.7.2"

import type { ParseError } from "../types/index.ts"
import type { ParsedModule, TraversalMetadata } from "./types/index.ts"

import extractFunctions from "../extractFunctions/index.ts"
import extractSignature from "../extractSignature/index.ts"

// Define Either type locally since it doesn't exist in either/index.ts
type Either<L, R> = { ok: false; error: L } | { ok: true; value: R }

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
			return {
				ok: false,
				error: {
					type: "ParseError",
					message: "Failed to create source file",
					file: filePath,
					line: 0,
					column: 0,
				},
			}
		}

		// Extract functions using existing function
		const functionsResult = extractFunctions(sourceFile)

		// Add metadata and signature to each function
		const functionsWithMetadata = functionsResult.functions.map((func) => ({
			node: func.node,
			signature: extractSignature(func.node, sourceFile, filePath),
			metadata: computeMetadata(func.node),
		}))

		return {
			ok: true,
			value: {
				sourceFile,
				functions: functionsWithMetadata,
				types: [], //!! [INCOMPLETE] extractTypes not implemented
				constants: [], //!! [INCOMPLETE] extractConstants not implemented
				exports: [], //!! [INCOMPLETE] extractExports not implemented
			},
		}
	} catch (error) {
		return {
			ok: false,
			error: {
				type: "ParseError",
				message: error instanceof Error ? error.message : "Unknown error",
				file: filePath,
				line: 0,
				column: 0,
			},
		}
	}
}

/**
 * Computes traversal metadata for a TypeScript node
 */
function computeMetadata(node: ts.Node): TraversalMetadata {
	// Initial metadata state
	const initialMetadata: TraversalMetadata = {
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

	// Get function-level metadata
	const functionMetadata = getFunctionMetadata(node)

	// Traverse and collect all metadata
	const traversalMetadata = traverseNode(node)

	// Combine all metadata
	return {
		...initialMetadata,
		...functionMetadata,
		...traversalMetadata,
	}
}

/**
 * Extract function-specific metadata
 */
function getFunctionMetadata(node: ts.Node): Partial<TraversalMetadata> {
	const isArrow = ts.isArrowFunction(node)
	const isFunction = ts.isFunctionDeclaration(node) ||
		ts.isFunctionExpression(node) ||
		ts.isArrowFunction(node) || ts.isMethodDeclaration(node)

	if (!isFunction) {
		return {}
	}

	const funcNode = node as ts.FunctionLikeDeclaration

	return {
		isArrowFunction: isArrow,
		parameterCount: funcNode.parameters.length,
		isAsync: Boolean(
			funcNode.modifiers?.some((m) => m.kind === ts.SyntaxKind.AsyncKeyword),
		),
		isGenerator: "asteriskToken" in funcNode && Boolean(funcNode.asteriskToken),
	}
}

/**
 * Traverse node and collect metadata without mutation
 */
function traverseNode(node: ts.Node): Partial<TraversalMetadata> {
	interface TraversalState {
		readonly hasThrowStatements: boolean
		readonly hasAwaitExpressions: boolean
		readonly hasGlobalAccess: boolean
		readonly cyclomaticComplexity: number
		readonly hasReturnStatements: boolean
		readonly hasIfStatements: boolean
		readonly hasLoops: boolean
		readonly hasTryCatch: boolean
		readonly nestingDepth: number
		readonly referencedIdentifiers: ReadonlySet<string>
		readonly callExpressions: ReadonlyArray<string>
		readonly propertyAccesses: ReadonlyArray<string>
	}

	const initialState: TraversalState = {
		hasThrowStatements: false,
		hasAwaitExpressions: false,
		hasGlobalAccess: false,
		cyclomaticComplexity: 1,
		hasReturnStatements: false,
		hasIfStatements: false,
		hasLoops: false,
		hasTryCatch: false,
		nestingDepth: 0,
		referencedIdentifiers: new Set(),
		callExpressions: [],
		propertyAccesses: [],
	}

	function visitNode(
		n: ts.Node,
		state: TraversalState,
		depth: number,
	): TraversalState {
		// Calculate all the updates based on the node type
		const isThrow = ts.isThrowStatement(n)
		const isAwait = ts.isAwaitExpression(n)
		const isReturn = ts.isReturnStatement(n)
		const isIf = ts.isIfStatement(n)
		const isLoop = ts.isForStatement(n) || ts.isForInStatement(n) ||
			ts.isForOfStatement(n) || ts.isWhileStatement(n) ||
			ts.isDoStatement(n)
		const isTry = ts.isTryStatement(n)
		const isIdent = ts.isIdentifier(n)
		const identText = isIdent ? n.getText() : null
		const hasGlobal = identText !== null && isGlobalIdentifier(identText)
		const isCall = ts.isCallExpression(n) && ts.isIdentifier(n.expression)
		const isPropAccess = ts.isPropertyAccessExpression(n)

		// Calculate complexity increment
		const complexityIncrement = (isIf ? 1 : 0) + (isLoop ? 1 : 0)

		// Build new state
		const newState: TraversalState = {
			hasThrowStatements: state.hasThrowStatements || isThrow,
			hasAwaitExpressions: state.hasAwaitExpressions || isAwait,
			hasGlobalAccess: state.hasGlobalAccess || hasGlobal,
			cyclomaticComplexity: state.cyclomaticComplexity + complexityIncrement,
			hasReturnStatements: state.hasReturnStatements || isReturn,
			hasIfStatements: state.hasIfStatements || isIf,
			hasLoops: state.hasLoops || isLoop,
			hasTryCatch: state.hasTryCatch || isTry,
			nestingDepth: Math.max(state.nestingDepth, depth),
			referencedIdentifiers: identText
				? new Set([...state.referencedIdentifiers, identText])
				: state.referencedIdentifiers,
			callExpressions: isCall
				? [
					...state.callExpressions,
					(n as ts.CallExpression).expression.getText(),
				]
				: state.callExpressions,
			propertyAccesses: isPropAccess
				? [...state.propertyAccesses, n.getText()]
				: state.propertyAccesses,
		}

		// Recursively visit children and accumulate state using reduce
		const childStates: Array<ts.Node> = []
		ts.forEachChild(n, (child) => childStates.push(child))

		return childStates.reduce(
			(accState, child) => visitNode(child, accState, depth + 1),
			newState,
		)
	}

	return visitNode(node, initialState, 0)
}

/**
 * Checks if an identifier is a global
 */
function isGlobalIdentifier(name: string): boolean {
	const globals = new Set([
		"console",
		"window",
		"document",
		"global",
		"process",
		"Buffer",
		"setTimeout",
		"setInterval",
		"clearTimeout",
		"clearInterval",
		"setImmediate",
		"clearImmediate",
		"require",
		"module",
		"exports",
		"__dirname",
		"__filename",
		"alert",
		"confirm",
		"prompt",
		"fetch",
		"XMLHttpRequest",
	])
	return globals.has(name)
}
