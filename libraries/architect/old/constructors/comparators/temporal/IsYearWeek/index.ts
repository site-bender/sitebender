import type { Operand } from "@sitebender/architect-types/index.ts"

import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"

const IsYearWeek = (operand: Operand) => ({
	tag: "IsYearWeek",
	type: OPERAND_TYPES.comparator,
	datatype: "Date",
	operand,
})

export default IsYearWeek
