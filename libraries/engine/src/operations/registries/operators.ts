import type { OperatorExecutor } from "../../../types/operations/registries/operators/index.ts"

const operators = new Map<string, OperatorExecutor>()

function register(tag: string, exec: OperatorExecutor) {
	operators.set(tag, exec)
}

function get(tag: string): OperatorExecutor | undefined {
	return operators.get(tag)
}

function list(): string[] {
	return Array.from(operators.keys())
}

const registry = { register, get, list } as const
export default registry
