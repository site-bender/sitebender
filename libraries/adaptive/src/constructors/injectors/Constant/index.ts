import type { ConstantInjector, Datatype, Value } from "../../../../types/index.ts"

import { OPERAND_TYPES } from "../../constants/index.ts"

const Constant =
	(datatype: Datatype = "Number") => (value: Value): ConstantInjector => ({
		tag: "Constant",
		type: OPERAND_TYPES.injector,
		datatype,
		value,
	})

export default Constant
