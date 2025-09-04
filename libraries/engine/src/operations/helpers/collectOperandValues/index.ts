import filter from "@sitebender/toolkit/simple/array/filter/index.ts"
import path from "@sitebender/toolkit/simple/object/path/index.ts"
import isNotNullish from "@sitebender/toolkit/simple/validation/isNotNullish/index.ts"

import type {
	ComparatorConfig,
	Operand,
	OperatorConfig,
} from "../../../../types/index.ts"

/**
 * Collects operand values from a data object based on an operations list
 *
 * @param data - The data object to extract values from
 * @param operations - List of operations containing operands
 * @returns Array of extracted values
 */
const collectOperandValues = (
	data: Operand,
	operations: Array<ComparatorConfig | OperatorConfig>,
): readonly unknown[] => {
	const values = operations.reduce(
		(acc: Array<unknown>, operation: ComparatorConfig | OperatorConfig) => {
			const ops =
				(operation as unknown as { operands?: Array<Operand> }).operands
			if (Array.isArray(ops)) {
				const operandValues = ops.map((operand: unknown) => {
					const op = operand as Partial<{ selector: string; value: unknown }>
					if (typeof op.selector === "string") {
						// path from toolkit expects a Value base; cast narrowly here
						return path(op.selector)(data as unknown as never)
					}
					if (
						Object.prototype.hasOwnProperty.call(op, "value") &&
						op.value !== undefined
					) {
						return op.value
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
