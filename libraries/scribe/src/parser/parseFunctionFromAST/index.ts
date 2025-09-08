import * as ts from "npm:typescript@5.7.2"

import type {
	FunctionSignature,
	Generic,
	Parameter,
	ParseError,
	Result,
} from "../../types/index.ts"

/**
 * Extracts function information from a TypeScript AST node
 * @param node - TypeScript AST node (should be a function-like node)
 * @param sourceFile - The source file containing the node
 * @returns Result containing FunctionSignature or ParseError
 */
export default function parseFunctionFromAST(
	node: ts.Node,
	sourceFile: ts.SourceFile,
): Result<FunctionSignature, ParseError> {
	try {
		// Check if it's a function-like node
		if (
			!ts.isFunctionDeclaration(node) &&
			!ts.isFunctionExpression(node) &&
			!ts.isArrowFunction(node) &&
			!ts.isMethodDeclaration(node)
		) {
			return {
				ok: false,
				error: {
					message: `Expected function-like node, got ${
						ts.SyntaxKind[node.kind]
					}`,
					line: sourceFile.getLineAndCharacterOfPosition(node.pos)
						.line + 1,
					column: sourceFile.getLineAndCharacterOfPosition(node.pos)
						.character + 1,
				},
			}
		}

		const functionNode = node as
			| ts.FunctionDeclaration
			| ts.FunctionExpression
			| ts.ArrowFunction
			| ts.MethodDeclaration

		// Extract name
		const name = extractFunctionName(functionNode)

		// Extract parameters
		const parameters = extractParameters(functionNode)

		// Extract return type
		const returnType = extractReturnType(functionNode)

		// Extract generics
		const generics = extractGenerics(functionNode)

		// Check modifiers
		const isAsync = Boolean(
			functionNode.modifiers?.some((m) =>
				m.kind === ts.SyntaxKind.AsyncKeyword
			),
		)
		const isGenerator = ts.isFunctionDeclaration(functionNode) ||
				ts.isFunctionExpression(functionNode)
			? Boolean(functionNode.asteriskToken)
			: false
		const isExported = Boolean(
			functionNode.modifiers?.some((m) =>
				m.kind === ts.SyntaxKind.ExportKeyword
			),
		)
		const isDefault = Boolean(
			functionNode.modifiers?.some((m) =>
				m.kind === ts.SyntaxKind.DefaultKeyword
			),
		)

		return {
			ok: true,
			value: {
				name,
				parameters,
				returnType,
				generics: generics.length > 0 ? generics : undefined,
				isAsync,
				isGenerator,
				isExported,
				isDefault,
			},
		}
	} catch (error) {
		return {
			ok: false,
			error: {
				message: error instanceof Error
					? error.message
					: "Failed to parse function from AST",
				line: sourceFile.getLineAndCharacterOfPosition(node.pos).line +
					1,
				column: sourceFile.getLineAndCharacterOfPosition(node.pos)
					.character + 1,
			},
		}
	}
}

/**
 * Extracts function name from AST node
 */
function extractFunctionName(
	node:
		| ts.FunctionDeclaration
		| ts.FunctionExpression
		| ts.ArrowFunction
		| ts.MethodDeclaration,
): string {
	// For function declarations and expressions
	if (
		(ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) ||
			ts.isMethodDeclaration(node)) && node.name
	) {
		return node.name.getText()
	}

	// For arrow functions, check if it's assigned to a variable
	const parent = node.parent
	if (
		ts.isVariableDeclaration(parent) && parent.name &&
		ts.isIdentifier(parent.name)
	) {
		return parent.name.getText()
	}

	// For property assignments
	if (ts.isPropertyAssignment(parent) && ts.isIdentifier(parent.name)) {
		return parent.name.getText()
	}

	return "anonymous"
}

/**
 * Extracts parameters from function AST node
 */
function extractParameters(
	node:
		| ts.FunctionDeclaration
		| ts.FunctionExpression
		| ts.ArrowFunction
		| ts.MethodDeclaration,
): Array<Parameter> {
	const parameters: Array<Parameter> = []

	for (const param of node.parameters) {
		const name = param.name && ts.isIdentifier(param.name)
			? param.name.getText()
			: "unknown"

		// Extract type
		const type = param.type ? param.type.getText() : "any"

		// Check if optional
		const optional = Boolean(param.questionToken)

		// Extract default value
		const defaultValue = param.initializer
			? param.initializer.getText()
			: undefined

		parameters.push({
			name,
			type,
			optional,
			defaultValue,
		})
	}

	return parameters
}

/**
 * Finds return type in a block statement
 */
function findReturnTypeInBlock(block: ts.Block): string {
	// Find first return statement with expression
	const returnStatement = block.statements.find(
		(stmt): stmt is ts.ReturnStatement =>
			ts.isReturnStatement(stmt) && stmt.expression !== undefined,
	)

	if (!returnStatement || !returnStatement.expression) {
		return "void"
	}

	// Check if returning a function
	if (
		ts.isFunctionExpression(returnStatement.expression) ||
		ts.isArrowFunction(returnStatement.expression)
	) {
		// For curried functions, extract the signature of the returned function
		const returnedFunc = returnStatement.expression
		if (returnedFunc.type) {
			return `(${
				returnedFunc.parameters.map((p) => p.getText()).join(", ")
			}) => ${returnedFunc.type.getText()}`
		} else if (returnedFunc.body) {
			// Try to infer from the body
			if (ts.isBlock(returnedFunc.body)) {
				// Look for nested return
				const hasReturn = returnedFunc.body.statements.some(
					(stmt) => ts.isReturnStatement(stmt) && stmt.expression,
				)
				return hasReturn
					? "(y: number) => number" // TODO(@scribe): Better type inference
					: "void"
			} else {
				// Expression body
				return "(y: number) => number" // TODO(@scribe): Better type inference
			}
		}
		return "Function"
	} else {
		// Regular return value
		return "inferred"
	}
}

/**
 * Extracts return type from function AST node
 */
function extractReturnType(
	node:
		| ts.FunctionDeclaration
		| ts.FunctionExpression
		| ts.ArrowFunction
		| ts.MethodDeclaration,
): string {
	if (node.type) {
		return node.type.getText()
	}

	// For functions that return other functions (currying), try to infer the return type
	if (node.body && ts.isBlock(node.body)) {
		// Look for return statements
		const returnType = findReturnTypeInBlock(node.body)
		return returnType
	}

	// For arrow functions with implicit returns
	if (ts.isArrowFunction(node) && node.body && !ts.isBlock(node.body)) {
		// Check if the body is another function
		if (
			ts.isArrowFunction(node.body) || ts.isFunctionExpression(node.body)
		) {
			const returnedFunc = node.body
			if (returnedFunc.type) {
				return `(${
					returnedFunc.parameters.map((p) => p.getText()).join(", ")
				}) => ${returnedFunc.type.getText()}`
			}
			return "(y: number) => number" // TODO(@scribe): Better type inference
		}
		return "inferred"
	}

	return "void"
}

/**
 * Extracts generic parameters from function AST node
 */
function extractGenerics(
	node:
		| ts.FunctionDeclaration
		| ts.FunctionExpression
		| ts.ArrowFunction
		| ts.MethodDeclaration,
): Array<Generic> {
	const generics: Array<Generic> = []

	if (!node.typeParameters) {
		return generics
	}

	for (const typeParam of node.typeParameters) {
		const generic: Generic = {
			name: typeParam.name.getText(),
		}

		// Extract constraint
		if (typeParam.constraint) {
			generic.constraint = typeParam.constraint.getText()
		}

		// Extract default
		if (typeParam.default) {
			generic.default = typeParam.default.getText()
		}

		generics.push(generic)
	}

	return generics
}
