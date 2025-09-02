import type { Operand, TemporalDatatype } from "../../../../types/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsAfterDateTime =
	(datatype: TemporalDatatype = "DateTime") =>
	(operand: Operand) =>
	(test: Operand) => ({
		tag: "IsAfterDateTime",
		type: OPERAND_TYPES.comparator,
		datatype,
		operand,
		test,
	})

export default IsAfterDateTime
