import { OPERAND_TYPES } from "../../../operations/constants.js"

const FromSessionStorage = (datatype = "Number") => (key) => ({
	tag: "FromSessionStorage",
	type: OPERAND_TYPES.injector,
	datatype,
	key,
	options: {
		local: key,
	},
})

export default FromSessionStorage
