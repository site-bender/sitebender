import { OPERAND_TYPES } from "../../../operations/constants.js"

const Constant = (datatype = "Number") => (value) => ({
	tag: "Constant",
	type: OPERAND_TYPES.injector,
	datatype,
	value,
})

export default Constant
