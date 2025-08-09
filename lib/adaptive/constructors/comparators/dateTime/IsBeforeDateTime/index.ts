import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsBeforeDateTime =
	(datatype = "PlainDateTime") => (operand) => (test) => ({
		tag: "IsBeforeDateTime",
		type: OPERAND_TYPES.operator,
		datatype,
		operand,
		test,
	})

export default IsBeforeDateTime
