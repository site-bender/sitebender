import composeValidator from "../../../calculations/composers/composeValidator"

const addValidation = elem => validation => {
	if (validation) {
		const validate = composeValidator(validation)

		elem.__sbValidate = validate
	}
}

export default addValidation
