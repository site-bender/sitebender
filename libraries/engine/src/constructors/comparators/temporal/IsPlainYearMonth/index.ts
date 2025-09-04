import type { Operand } from "@sitebender/engine-types/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsPlainYearMonth = (operand: Operand) => ({
	tag: "IsPlainYearMonth",
	type: OPERAND_TYPES.comparator,
	datatype: "PlainYearMonth",
	operand,
})

export default IsPlainYearMonth
