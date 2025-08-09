import { OPERAND_TYPES } from "../../../../constants.ts.js"

const makeLengthConstructor =
	(tag) => (datatype = "String") => (operand) => (test) => ({
		tag,
		type: OPERAND_TYPES.operator,
		datatype,
		operand,
		test,
	})

export default makeLengthConstructor
