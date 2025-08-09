/**
 * Extracts operand keys from an operations list
 *
 * @param operations - List of operations containing operands
 * @returns Array of operand keys
 */
const getOperandKeys = (operations: any[]): string[] => {
	const keys: string[] = []

	operations.forEach((operation: any) => {
		if (operation.operands) {
			operation.operands.forEach((operand: any) => {
				if (operand.key) {
					keys.push(operand.key)
				}
			})
		}
	})

	return keys
}

export default getOperandKeys
