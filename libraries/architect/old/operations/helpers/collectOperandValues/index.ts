import filter from "@sitebender/toolsmith/vanilla/array/filter/index.ts"
import path from "@sitebender/toolsmith/vanilla/object/path/index.ts"
import isNotNullish from "@sitebender/toolsmith/vanilla/validation/isNotNullish/index.ts"

import type {
	ComparatorConfig,
	Operand,
	OperatorConfig,
} from "../../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
					const op = operand as Partial<
						{ selector: string; value: unknown }
					>
					if (typeof op.selector === "string") {
						// path from toolsmith expects a Value base; cast narrowly here
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
