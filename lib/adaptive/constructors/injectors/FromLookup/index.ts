import { OPERAND_TYPES } from "../../../operations/constants.js"

const FromLookup = (datatype = "Json") => (id) => ({
	tag: "FromLookup",
	type: OPERAND_TYPES.injector,
	datatype,
	source: { class: "lookup", id, local: id },
})

export default FromLookup
