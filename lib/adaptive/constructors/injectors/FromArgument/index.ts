import type { Datatype, FromArgumentInjector } from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../constants/index.ts"

const FromArgument =
	(datatype: Datatype = "Number") => (name?: string): FromArgumentInjector => ({
		tag: "FromArgument",
		type: OPERAND_TYPES.injector,
		datatype,
		name,
	})

export default FromArgument
