import type {
	ComplexDatatype,
	FromLookupInjector,
	Value,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../constants/index.ts"

const FromLookup =
	(datatype: ComplexDatatype = "Json") =>
	(id: string, defaultValue?: Value): FromLookupInjector => ({
		tag: "FromLookup",
		type: OPERAND_TYPES.injector,
		datatype,
		source: { class: "lookup", id, local: id },
		defaultValue,
	})

export default FromLookup
