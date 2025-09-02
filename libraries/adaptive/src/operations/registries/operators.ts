import type { OperatorExecutor } from "../../../types/operations/registries/operators/index.ts"

const operators = new Map<string, OperatorExecutor>()

export function registerOperator(tag: string, exec: OperatorExecutor) {
	operators.set(tag, exec)
}

export function getOperator(tag: string): OperatorExecutor | undefined {
	return operators.get(tag)
}

export function listOperators(): string[] {
	return Array.from(operators.keys())
}
