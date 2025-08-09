/**
 * Extracts all operands from an operations list
 *
 * @param operations - List of operations containing operands
 * @returns Array of all operands
 */
const getOperands = (operations: any[]): any[] => {
	const operands: any[] = []

	operations.forEach((operation: any) => {
		if (operation.operands) {
			operands.push(...operation.operands)
		}
	})

	return operands
}

export default getOperands
