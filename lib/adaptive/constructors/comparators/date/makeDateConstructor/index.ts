import { OPERAND_TYPES } from "../../../../constants.ts.js"

const makeDateConstructor =
	(tag) => (datatype = "PlainDate") => (operand) => (test) => ({
		tag,
		type: OPERAND_TYPES.operator,
		datatype,
		operand,
		test,
	})

export default makeDateConstructor
