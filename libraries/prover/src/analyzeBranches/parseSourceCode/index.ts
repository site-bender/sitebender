import type { SourceNode } from "./types/index.ts"

/**
 * Parses TypeScript/JavaScript source code into an AST representation
 * Pure function that converts source code string to AST nodes
 * @param sourceCode - The source code to parse
 * @returns AST representation of the source code
 * @example
 * const ast = parseSourceCode("if (x > 0) { return x }")
 * // Returns: { type: "IfStatement", test: {...}, consequent: {...} }
 */
export default function parseSourceCode(sourceCode: string): SourceNode {
	// Simple AST parser for common patterns
	// In production, would use TypeScript Compiler API or similar

	const lines = sourceCode.split("\n")
	const nodes: Array<SourceNode> = []

	// Parse each line for branch patterns
	lines.forEach((line, index) => {
		const trimmed = line.trim()

		if (trimmed.startsWith("if")) {
			nodes.push({
				type: "IfStatement",
				start: index,
				end: index,
				test: {
					type: "Expression",
					start: index,
					end: index,
					value: extractCondition(trimmed),
				},
			})
		} else if (trimmed.includes("?") && trimmed.includes(":")) {
			nodes.push({
				type: "ConditionalExpression",
				start: index,
				end: index,
				test: {
					type: "Expression",
					start: index,
					end: index,
					value: extractTernaryCondition(trimmed),
				},
			})
		} else if (trimmed.startsWith("switch")) {
			nodes.push({
				type: "SwitchStatement",
				start: index,
				end: index,
				value: extractSwitchExpression(trimmed),
			})
		} else if (trimmed.startsWith("try")) {
			nodes.push({
				type: "TryStatement",
				start: index,
				end: index,
			})
		} else if (trimmed.includes("&&") || trimmed.includes("||")) {
			nodes.push({
				type: "LogicalExpression",
				start: index,
				end: index,
				operator: trimmed.includes("&&") ? "&&" : "||",
				value: trimmed,
			})
		}
	})

	return {
		type: "Program",
		start: 0,
		end: lines.length - 1,
		children: nodes,
	}
}

function extractCondition(line: string): string {
	const match = line.match(/if\s*\((.*?)\)/)
	return match ? match[1] : ""
}

function extractTernaryCondition(line: string): string {
	const match = line.match(/(.*?)\s*\?/)
	return match ? match[1].trim() : ""
}

function extractSwitchExpression(line: string): string {
	const match = line.match(/switch\s*\((.*?)\)/)
	return match ? match[1] : ""
}
