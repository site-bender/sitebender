import { OPERAND_TYPES } from "../../../../constants.ts.js"

const makeAmountConstructor =
	(tag) => (datatype = "Number") => (operand) => (test) => ({
		tag,
		type: OPERAND_TYPES.operator,
		datatype,
		operand,
		test,
	})

export default makeAmountConstructor
