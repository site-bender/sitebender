import composeValidator from "../../../operations/composers/composeValidator/index.ts"
import type { LocalValues, OperationFunction, ComparatorConfig, LogicalConfig, Operand } from "../../../../types/index.ts"

type HTMLElementWithValidate = HTMLElement & {
	__sbValidate?: (arg: unknown, localValues?: LocalValues) => Promise<unknown>
}

const addValidation = (elem: HTMLElementWithValidate) => (validation: ComparatorConfig | LogicalConfig | Operand | undefined) => {
	if (!validation) return

	// Store a callable that lazily awaits the composed validator on first call
	let validatorPromise: Promise<OperationFunction<boolean>> | undefined

	elem.__sbValidate = async (arg: unknown, localValues?: LocalValues) => {
		if (!validatorPromise) validatorPromise = composeValidator(validation)
		const validator = await validatorPromise
		return validator(arg, localValues)
	}
}

export default addValidation
