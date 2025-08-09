import { OPERAND_TYPES } from "../../../../constants.ts.js"

const IsAfterDateTime =
	(datatype = "PlainDateTime") => (operand) => (test) => ({
		tag: "IsAfterDateTime",
		type: OPERAND_TYPES.operator,
		datatype,
		operand,
		test,
	})

export default IsAfterDateTime
