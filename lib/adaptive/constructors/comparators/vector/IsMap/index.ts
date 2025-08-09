import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsMap = (operand) => ({
	tag: "IsMap",
	type: OPERAND_TYPES.operator,
	datatype: "Map",
	operand,
})

export default IsMap
