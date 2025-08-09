import composeValidator from "../../../operations/composers/composeValidator.js"

const addValidation = (elem) => (validation) => {
	if (validation) {
		const validate = composeValidator(validation)

		elem.__sbValidate = validate
	}
}

export default addValidation
