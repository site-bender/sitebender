import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsPlainDate = (operand) => ({
	tag: "IsPlainDate",
	type: OPERAND_TYPES.operator,
	datatype: "PlainDate",
	operand,
})

export default IsPlainDate
