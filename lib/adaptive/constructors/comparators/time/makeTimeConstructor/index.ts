import { OPERAND_TYPES } from "../../../../constants.ts.js"

const makeTimeConstructor =
	(tag) => (datatype = "PlainTime") => (operand) => (test) => ({
		tag,
		type: OPERAND_TYPES.operator,
		datatype,
		operand,
		test,
	})

export default makeTimeConstructor
