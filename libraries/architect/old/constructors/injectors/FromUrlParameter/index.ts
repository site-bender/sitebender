import type {
	Datatype,
	FromUrlParameterInjector,
	Value,
} from "../../../types/index.ts"

import { OPERAND_TYPES } from "../../constants/index.ts"

interface UrlParameterOptions {
	segment: number
	defaultValue?: Value
}

const FromUrlParameter =
	(datatype: Datatype = "Number") =>
	(options: UrlParameterOptions): FromUrlParameterInjector => ({
		tag: "FromUrlParameter",
		type: OPERAND_TYPES.injector,
		datatype,
		...options,
	})

export default FromUrlParameter
