import { OPERAND_TYPES } from "../../../operations/constants.js"

const FromElement = (datatype = "Number") => (source) => ({
	tag: "FromElement",
	type: OPERAND_TYPES.injector,
	datatype,
	source,
})

export default FromElement
