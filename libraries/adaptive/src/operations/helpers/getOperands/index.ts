import type { ComparatorConfig, Operand, OperatorConfig } from "../../../../types/index.ts"

/**
 * Extracts all operands from an operations list
 *
 * @param operations - List of operations containing operands
 * @returns Array of all operands
 */
const getOperands = (
	operations: Array<OperatorConfig | ComparatorConfig>,
): Array<Operand> => {
	const operands: Array<Operand> = []

	operations.forEach((operation: ComparatorConfig | OperatorConfig) => {
		if ('operands' in operation && operation.operands) {
			operands.push(...operation.operands)
		}
	})

	return operands
}

export default getOperands
