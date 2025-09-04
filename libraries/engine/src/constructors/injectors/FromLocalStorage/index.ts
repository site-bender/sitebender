import type {
	Datatype,
	FromLocalStorageInjector,
	Value,
} from "@sitebender/engine-types/index.ts"

import { OPERAND_TYPES } from "@sitebender/engine/constructors/constants/index.ts"

interface FromLocalStorageWithOptions extends FromLocalStorageInjector {
	options: {
		local: string
	}
}

const FromLocalStorage =
	(datatype: Datatype = "Number") =>
	(key: string, defaultValue?: Value): FromLocalStorageWithOptions => ({
		tag: "FromLocalStorage",
		type: OPERAND_TYPES.injector,
		datatype,
		key,
		defaultValue,
		options: {
			local: key,
		},
	})

export default FromLocalStorage
