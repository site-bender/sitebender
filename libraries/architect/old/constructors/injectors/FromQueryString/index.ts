import type {
	Datatype,
	FromQueryStringInjector,
	Value,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../constants/index.ts"

const FromQueryString =
	(datatype: Datatype = "Number") =>
	(key: string, defaultValue?: Value): FromQueryStringInjector => ({
		tag: "FromQueryString",
		type: OPERAND_TYPES.injector,
		datatype,
		key,
		defaultValue,
		options: {
			local: key,
		},
	})

export default FromQueryString
