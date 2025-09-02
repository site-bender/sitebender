import type {
	Datatype,
	FromLocalStorageInjector,
	Value,
} from "@engineTypes/index.ts"

import { OPERAND_TYPES } from "@engineSrc/constructors/constants/index.ts"

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
