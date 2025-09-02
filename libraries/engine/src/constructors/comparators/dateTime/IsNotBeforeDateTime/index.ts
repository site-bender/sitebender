import type { Operand, TemporalDatatype } from "../../../../types/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsNotBeforeDateTime =
	(datatype: TemporalDatatype = "DateTime") =>
	(operand: Operand) =>
	(test: Operand) => ({
		tag: "IsNotBeforeDateTime",
		type: OPERAND_TYPES.comparator,
		datatype,
		operand,
		test,
	})

export default IsNotBeforeDateTime
