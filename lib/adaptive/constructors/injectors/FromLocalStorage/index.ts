import { OPERAND_TYPES } from "../../../operations/constants.js"

const FromLocalStorage = (datatype = "Number") => (key) => ({
	tag: "FromLocalStorage",
	type: OPERAND_TYPES.injector,
	datatype,
	key,
	options: {
		local: key,
	},
})

export default FromLocalStorage
