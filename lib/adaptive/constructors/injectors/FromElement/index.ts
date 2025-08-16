import type { Datatype, FromElementInjector } from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../constants/index.ts"

const FromElement =
	(datatype: Datatype = "Number") => (source: string): FromElementInjector => ({
		tag: "FromElement",
		type: OPERAND_TYPES.injector,
		datatype,
		source,
	})

export default FromElement
