import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand, TemporalDatatype } from "../../../../types/index.ts"

const IsSameDateTime =
  (datatype: TemporalDatatype = "DateTime") => (operand: Operand) => (test: Operand) => ({
    tag: "IsSameDateTime",
    type: OPERAND_TYPES.comparator,
    datatype,
    operand,
    test,
  })

export default IsSameDateTime
