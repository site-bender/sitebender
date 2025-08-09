import { OPERAND_TYPES } from "../../../operations/constants.js"

const FromApi = (datatype = "Json") => (options = {}) => ({
	tag: "FromApi",
	type: OPERAND_TYPES.injector,
	datatype,
	...options,
})

export default FromApi
