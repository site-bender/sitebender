import Error from "../../../constructors/Error/index.js"
import getOperandKeys from "../../../operations/helpers/getOperandKeys/index.ts"
import not from "../../../utilities/predicates/not/index.js"
import toCamelCase from "../../../utilities/string/toCamelCase/index.js"
import { OPERAND_TYPES } from "../../constants.js"

const composeComparators = async (operation) => {
	if (not(operation) || not(operation.tag)) {
		return () =>
			Error(operation)("Comparison")(
				`Comparison undefined or malformed: ${JSON.stringify(operation)}.`,
			)
	}

	const operandKeys = getOperandKeys(operation)

	const resolvedOperandPromises = operandKeys.map(async (key) => {
		const value = operation[key]
		const resolvedValue = Array.isArray(value)
			? await Promise.all(value.map((op) => composeComparators(op)))
			: await composeComparators(value)
		return [key, resolvedValue]
	})

	const resolvedOperands = Object.fromEntries(
		await Promise.all(resolvedOperandPromises),
	)

	const hydratedOperation = { ...operation, ...resolvedOperands }

	try {
		// All comparators are organized by comparison type (alphabetical, numerical, etc.)
		if (operation.type === "comparator") {
			const { default: comparatorExecutor } = await import(
				`../../comparators/${operation.comparison}/${
					toCamelCase(operation.tag)
				}/index.js`
			)
			return comparatorExecutor(hydratedOperation)
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
			Error(operation)("Comparison")(
				`Comparison "${operation.tag}" with type "${operation.type}" could not be loaded. ${e.message}`,
			)
	}
}

export default composeComparators
