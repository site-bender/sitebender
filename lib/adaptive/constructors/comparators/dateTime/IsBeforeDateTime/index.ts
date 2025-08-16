import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsBeforeDateTime =
	(datatype = "PlainDateTime") => (operand) => (test) => ({
		tag: "IsBeforeDateTime",
		type: OPERAND_TYPES.comparator,
		datatype,
		operand,
		test,
	})

export default IsBeforeDateTime
