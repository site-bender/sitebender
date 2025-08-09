import { OPERAND_TYPES } from "../../../operations/constants.js"

const FromUrlParameter = (datatype = "Number") => (options = {}) => ({
	tag: "FromUrlParameter",
	type: OPERAND_TYPES.injector,
	datatype,
	options,
})

export default FromUrlParameter
