import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsPlainDate = (operand) => ({
	tag: "IsPlainDate",
	type: OPERAND_TYPES.comparator,
	datatype: "PlainDate",
	operand,
})

export default IsPlainDate
