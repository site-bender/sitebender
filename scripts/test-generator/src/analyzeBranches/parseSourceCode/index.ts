/**
 * Parse TypeScript/JavaScript source code to AST
 */

import type { ASTNode } from "../types/index.ts"

/**
 * Parse source code into an Abstract Syntax Tree
 * Using a simple regex-based parser for now (can upgrade to proper AST parser later)
 * @param sourceCode The source code to parse
 * @returns AST representation of the code
 */
export default function parseSourceCode(sourceCode: string): ASTNode {
	// For now, we'll create a simple AST-like structure from the source
	// In production, we'd use @swc/wasm or similar
	
	const lines = sourceCode.split('\n')
	const nodes: Array<ASTNode> = []
	
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]
		const lineNum = i + 1
		
		// Detect if statements
		if (line.includes('if') && line.includes('(')) {
			const ifMatch = line.match(/if\s*\((.*?)\)/)
			if (ifMatch) {
				nodes.push({
					type: 'IfStatement',
					test: {
						type: 'Condition',
						raw: ifMatch[1].trim()
					},
					loc: {
						start: { line: lineNum, column: line.indexOf('if') },
						end: { line: lineNum, column: line.length }
					}
				})
			}
		}
		
		// Detect ternary operators
		if (line.includes('?') && line.includes(':')) {
			const ternaryMatch = line.match(/(.*?)\s*\?\s*(.*?)\s*:\s*(.*)/)
			if (ternaryMatch) {
				nodes.push({
					type: 'ConditionalExpression',
					test: {
						type: 'Condition',
						raw: ternaryMatch[1].trim()
					},
					loc: {
						start: { line: lineNum, column: line.indexOf('?') },
						end: { line: lineNum, column: line.length }
					}
				})
			}
		}
		
		// Detect switch statements
		if (line.includes('switch')) {
			const switchMatch = line.match(/switch\s*\((.*?)\)/)
			if (switchMatch) {
				nodes.push({
					type: 'SwitchStatement',
					discriminant: {
						type: 'Identifier',
						name: switchMatch[1].trim()
					},
					cases: [],
					loc: {
						start: { line: lineNum, column: line.indexOf('switch') },
						end: { line: lineNum, column: line.length }
					}
				})
			}
		}
		
		// Detect logical operators
		if (line.includes('&&') || line.includes('||')) {
			const logicalMatch = line.match(/(.*?)\s*(&&|\|\|)\s*(.*)/)
			if (logicalMatch) {
				nodes.push({
					type: 'LogicalExpression',
					operator: logicalMatch[2],
					left: {
						type: 'Condition',
						raw: logicalMatch[1].trim()
					},
					right: {
						type: 'Condition',
						raw: logicalMatch[3].trim()
					},
					loc: {
						start: { line: lineNum, column: line.indexOf(logicalMatch[2]) },
						end: { line: lineNum, column: line.length }
					}
				})
			}
		}
		
		// Detect try-catch blocks
		if (line.includes('try')) {
			nodes.push({
				type: 'TryStatement',
				loc: {
					start: { line: lineNum, column: line.indexOf('try') },
					end: { line: lineNum, column: line.length }
				}
			})
		}
	}
	
	// Return a simplified AST structure
	return {
		type: 'Program',
		body: nodes
	}
}