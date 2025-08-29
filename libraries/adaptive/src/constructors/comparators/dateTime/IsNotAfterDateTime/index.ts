import { OPERAND_TYPES } from "../../../../constructors/constants/index.ts"
import type { Operand, TemporalDatatype } from "../../../../types/index.ts"

const IsNotAfterDateTime =
  (datatype: TemporalDatatype = "DateTime") => (operand: Operand) => (test: Operand) => ({
    tag: "IsNotAfterDateTime",
    type: OPERAND_TYPES.comparator,
    datatype,
    operand,
    test,
  })

export default IsNotAfterDateTime
