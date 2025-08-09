import Error from "../../../constructors/Error/index.js"
import getOperandKeys from "../../../operations/helpers/getOperandKeys/index.ts"
import toCamelCase from "../../../utilities/string/toCamelCase/index.js"
import { OPERAND_TYPES } from "../../constants.js"
import not from "../../not/index.js"

const composeOperators = async (operation) => {
	if (not(operation) || not(operation.tag)) {
		return () =>
			Error(operation)("Operation")(
				`Operation undefined or malformed: ${JSON.stringify(operation)}.`,
			)
	}

	const operandKeys = getOperandKeys(operation)

	const resolvedOperandPromises = operandKeys.map(async (key) => {
		const value = operation[key]
		const resolvedValue = Array.isArray(value)
			? await Promise.all(value.map((op) => composeOperators(op)))
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
				`../../operators/${toCamelCase(operation.tag)}/index.js`
			)
			return operatorExecutor(hydratedOperation)
		}

		if (operation.type === OPERAND_TYPES.injector) {
			const { default: injectorExecutor } = await import(
				`../../../injectors/${toCamelCase(operation.tag)}/index.js`
			)
			return injectorExecutor(hydratedOperation)
		}

		throw new Error(`Unknown type: ${operation.type}`)
	} catch (e) {
		return () =>
			Error(operation)("Operation")(
				`Operation "${operation.tag}" with type "${operation.type}" could not be loaded. ${e.message}`,
			)
	}
}

export default composeOperators

// TODO
// import Error from "../../../constructors/Error"
// import toCamelCase from "../../../utilities/toCamelCase.js"

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
