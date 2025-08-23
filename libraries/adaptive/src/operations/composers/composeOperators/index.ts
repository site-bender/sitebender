import type {
	AdaptiveError,
	ComparatorConfig,
	GlobalAttributes,
	Operand,
	OperationFunction,
	OperatorConfig,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../../constructors/constants/index.ts"
import Error from "../../../constructors/Error/index.ts"
import getOperandKeys from "../../../operations/helpers/getOperandKeys/index.ts"
import not from "../../../utilities/predicates/not/index.ts"
import toCamel from "../../../utilities/string/toCamel/index.ts"

const composeOperators = async (
	operation: Operand | undefined,
): Promise<OperationFunction> => {
	if (not(operation) || not(operation.tag)) {
		return () =>
			Promise.resolve({
				left: [
					Error((operation as ComparatorConfig).tag || "Unknown")("Operation")(
						`Operation undefined or malformed: ${JSON.stringify(operation)}.`,
					) as AdaptiveError,
				],
			})
	}

	const operandKeys = getOperandKeys(operation)

	const resolvedOperandPromises = operandKeys.map(async (key: string) => {
		const value = (operation as Record<string, unknown>)[key]
		const resolvedValue = Array.isArray(value)
			? await Promise.all(value.map((op: Operand) => composeOperators(op)))
			: await composeOperators(value)
		return [key, resolvedValue]
	})

	const resolvedOperands = Object.fromEntries(
		await Promise.all(resolvedOperandPromises),
	)

	const hydratedOperation = { ...operation, ...resolvedOperands }

	try {
		if (operation.type === OPERAND_TYPES.operator) {
			const { default: operatorExecutor } = await import(
				`../../operators/${toCamel(operation.tag)}/index.js`
			)
			return operatorExecutor(hydratedOperation)
		}

		if (operation.type === OPERAND_TYPES.injector) {
			const { default: injectorExecutor } = await import(
				`../../../injectors/${toCamel(operation.tag)}/index.js`
			)
			return injectorExecutor(hydratedOperation)
		}

		return () =>
			Promise.resolve({
				left: [
					Error(operation.tag || "Unknown")("Operation")(
						`Unknown type: ${operation.type}`,
					) as AdaptiveError,
				],
			})
	} catch (e: Error) {
		return () =>
			Promise.resolve({
				left: [
					Error((operation as ComparatorConfig).tag || "Unknown")("Operation")(
						`Operation "${operation.tag}" with type "${operation.type}" could not be loaded. ${e.message}`,
					) as AdaptiveError,
				],
			})
	}
}

export default composeOperators

// TODO
// import Error from "../../../constructors/Error"
// import toCamelCase from "../../../utilities/toCamelCase/index.ts"

// const composeOperators = async operation =>
// 	(await import(`../../../injectors/${toCamelCase(operation?.tag)}`)?.catch(
// 		operation,
// 	)) ??
// 	(() => ({
// 		left: [
// 			Error(operation)("Operation")(
// 				`Operation "${operation.tag}" does not exist.`,
// 			),
// 		],
// 	}))

// export default composeOperators
