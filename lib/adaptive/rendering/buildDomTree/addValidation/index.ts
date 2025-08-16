import composeValidator from "../../../operations/composers/composeValidator/index.ts"

const addValidation = (elem) => (validation) => {
	if (validation) {
		const validate = composeValidator(validation)

		elem.__sbValidate = validate
	}
}

export default addValidation
