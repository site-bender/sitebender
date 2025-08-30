import type { Operand } from "../../../../types/index.ts"

/**
 * Extracts all operands from an operations list
 *
 * @param operations - List of operations containing operands
 * @returns Array of all operands
 */
export type HasOperands = { operands?: Array<Operand> | null }

const getOperands = (
	operations: Array<HasOperands | Record<string, unknown>>,
): Array<Operand> => {
	const operands: Array<Operand> = []

	operations.forEach((operation) => {
		const ops = (operation as HasOperands)?.operands ?? []
		if (Array.isArray(ops)) operands.push(...ops)
	})

	return operands
}

export default getOperands
