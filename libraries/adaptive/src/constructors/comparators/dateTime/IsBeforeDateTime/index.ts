import type { Operand, TemporalDatatype } from "../../../../types/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsBeforeDateTime =
	(datatype: TemporalDatatype = "DateTime") =>
	(operand: Operand) =>
	(test: Operand) => ({
		tag: "IsBeforeDateTime",
		type: OPERAND_TYPES.comparator,
		datatype,
		operand,
		test,
	})

export default IsBeforeDateTime
