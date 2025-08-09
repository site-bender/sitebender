import { OPERAND_TYPES } from "../../../operations/constants.js"

const FromArgument = (datatype = "Number") => ({
	tag: "FromArgument",
	type: OPERAND_TYPES.injector,
	datatype,
})

export default FromArgument
