// Intentionally keep this helper generic: it collects any 'operands' arrays
// without constraining to specific Operand shapes.

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
