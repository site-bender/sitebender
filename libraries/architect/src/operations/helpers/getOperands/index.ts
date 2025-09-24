// Intentionally keep this helper generic: it collects any 'operands' arrays
// without constraining to specific Operand shapes.

/**
 * Extracts all operands from an operations list
 *
 * @param operations - List of operations containing operands
 * @returns Array of all operands
 */
export type HasOperands = { operands?: Array<unknown> | null }

const getOperands = (
	operations: Array<HasOperands | Record<string, unknown>>,
): Array<unknown> => {
	const operands: Array<unknown> = []

	operations.forEach((operation) => {
		const ops = (operation as HasOperands)?.operands ?? []
		if (Array.isArray(ops)) operands.push(...ops)
	})

	return operands
}

export default getOperands
