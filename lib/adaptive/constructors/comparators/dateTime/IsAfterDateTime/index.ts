import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsAfterDateTime =
	(datatype = "PlainDateTime") => (operand) => (test) => ({
		tag: "IsAfterDateTime",
		type: OPERAND_TYPES.comparator,
		datatype,
		operand,
		test,
	})

export default IsAfterDateTime
