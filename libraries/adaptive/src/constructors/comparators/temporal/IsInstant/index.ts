import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand } from "@adaptiveTypes/index.ts"

const IsInstant = (operand: Operand) => ({
	tag: "IsInstant",
	type: OPERAND_TYPES.comparator,
	datatype: "Instant",
	operand,
})

export default IsInstant
