import composeValidator from "../../../operations/composers/composeValidator/index.ts"
import type { OperationFunction, ComparatorConfig, LogicalConfig, Operand, LocalValues } from "../../../../types/index.ts"

// Accept a plain HTMLElement and augment it internally; avoids strict call-site type mismatch
const addValidation = (elem: HTMLElement) => (validation: unknown) => {
	if (!validation) return

	// Store a callable that lazily awaits the composed validator on first call
	let validatorPromise: Promise<OperationFunction<boolean>> | undefined

	// Augment the element with a validate function at runtime
	;(elem as HTMLElement & { __sbValidate?: (arg: unknown, localValues?: unknown) => Promise<unknown> }).__sbValidate = async (arg: unknown, localValues?: unknown) => {
		if (!validatorPromise) validatorPromise = composeValidator(validation as ComparatorConfig | LogicalConfig | Operand)
		const validator = await validatorPromise
		return validator(arg, localValues as LocalValues | undefined)
	}
}

export default addValidation
