import type { GlobalAttributes } from "../../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"
import filter from "../../../utilities/array/filter/index.ts"
import map from "../../../utilities/array/map/index.ts"
import path from "../../../utilities/object/path/index.ts"
import isNotNullish from "../../../utilities/predicates/isNotNullish/index.ts"

/**
 * Collects operand values from a data object based on an operations list
 *
 * @param data - The data object to extract values from
 * @param operations - List of operations containing operands
 * @returns Array of extracted values
 */
const collectOperandValues = (
	data: Operand,
	operations: Array<unknown>,
): readonly unknown[] => {
	const values = operations.reduce(
		(acc: Array<unknown>, operation: ComparatorConfig | OperatorConfig) => {
			if (operation.operands) {
				const operandValues = operation.operands.map((operand: Operand) => {
					if (operand.selector) {
						return path(operand.selector)(data)
					}

					if (operand.value !== undefined) {
						return operand.value
					}

					return null
				})

				acc.push(...operandValues)
			}

			return acc
		},
		[],
	)

	return [...filter(isNotNullish)(values)]
}

export default collectOperandValues
