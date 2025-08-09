import { OPERAND_TYPES } from "../../../operations/constants.js"

const FromQueryString = (datatype = "Number") => (key) => ({
	tag: "FromQueryString",
	type: OPERAND_TYPES.injector,
	datatype,
	key,
	options: {
		local: key,
	},
})

export default FromQueryString
