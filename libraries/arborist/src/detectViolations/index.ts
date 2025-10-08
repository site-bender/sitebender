// @sitebender/arborist/src/detectViolations
// Detects constitutional rule violations in TypeScript/JSX AST

import type { Validation } from "~libraries/toolsmith/src/types/validation/index.ts"
import type { ModuleItem } from "npm:@swc/wasm-web@1.13.20"

import success from "@sitebender/toolsmith/monads/validation/success/index.ts"

import type { ParsedAst, Position, ViolationInfo } from "../types/index.ts"
import type { ViolationDetectionError } from "../types/errors/index.ts"

//++ Detects constitutional rule violations in AST
//++ Returns Validation with ViolationInfo containing all detected violations
//++ Detects: arrow functions, classes, throw statements, try/catch, loops, mutations
export default function detectViolations(
	ast: ParsedAst,
): Validation<ViolationDetectionError, ViolationInfo> {
	const arrowFunctions: Array<Position> = []
	const classes: Array<Position> = []
	const throwStatements: Array<Position> = []
	const tryCatchBlocks: Array<Position> = []
	const loops: Array<Position> = []
	const mutations: Array<Position> = []

	// Walk the AST and detect violations
	function walkModuleItems(items: ReadonlyArray<ModuleItem>): void {
		for (const item of items) {
			walkNode(item)
		}
	}

	function walkNode(node: unknown): void {
		if (!node || typeof node !== "object") return

		const n = node as Record<string, unknown>

		// Detect arrow functions
		if (n.type === "ArrowFunctionExpression") {
			const span = (n as { span: { start: number } }).span
			arrowFunctions.push({
				line: span.start,
				column: 0,
			})
		}

		// Detect classes
		if (n.type === "ClassDeclaration") {
			const span = (n as { span: { start: number } }).span
			classes.push({
				line: span.start,
				column: 0,
			})
		}

		// Detect throw statements
		if (n.type === "ThrowStatement") {
			const span = (n as { span: { start: number } }).span
			throwStatements.push({
				line: span.start,
				column: 0,
			})
		}

		// Detect try/catch blocks
		if (n.type === "TryStatement") {
			const span = (n as { span: { start: number } }).span
			tryCatchBlocks.push({
				line: span.start,
				column: 0,
			})
		}

		// Detect loops
		if (
			n.type === "ForStatement" ||
			n.type === "ForInStatement" ||
			n.type === "ForOfStatement" ||
			n.type === "WhileStatement" ||
			n.type === "DoWhileStatement"
		) {
			const span = (n as { span: { start: number } }).span
			loops.push({
				line: span.start,
				column: 0,
			})
		}

		// Detect mutations (update expressions: ++, --, +=, etc.)
		if (n.type === "UpdateExpression") {
			const span = (n as { span: { start: number } }).span
			mutations.push({
				line: span.start,
				column: 0,
			})
		}

		// Detect assignment mutations
		if (n.type === "AssignmentExpression") {
			const span = (n as { span: { start: number } }).span
			mutations.push({
				line: span.start,
				column: 0,
			})
		}

		// Recursively walk properties
		for (const key in n) {
			const value = n[key]
			if (Array.isArray(value)) {
				for (const item of value) {
					walkNode(item)
				}
			} else if (value && typeof value === "object") {
				walkNode(value)
			}
		}
	}

	// Start walking from module body
	walkModuleItems(ast.module.body)

	const violationInfo: ViolationInfo = {
		hasArrowFunctions: arrowFunctions.length > 0,
		arrowFunctions,
		hasClasses: classes.length > 0,
		classes,
		hasThrowStatements: throwStatements.length > 0,
		throwStatements,
		hasTryCatch: tryCatchBlocks.length > 0,
		tryCatchBlocks,
		hasLoops: loops.length > 0,
		loops,
		hasMutations: mutations.length > 0,
		mutations,
	}

	return success(violationInfo)
}
