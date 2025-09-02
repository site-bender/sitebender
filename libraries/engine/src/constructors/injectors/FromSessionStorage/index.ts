import type {
	Datatype,
	FromSessionStorageInjector,
	Value,
} from "@engineTypes/index.ts"

import { OPERAND_TYPES } from "@engineSrc/constructors/constants/index.ts"

interface FromSessionStorageWithOptions extends FromSessionStorageInjector {
	options: {
		local: string
	}
}

const FromSessionStorage =
	(datatype: Datatype = "Number") =>
	(key: string, defaultValue?: Value): FromSessionStorageWithOptions => ({
		tag: "FromSessionStorage",
		type: OPERAND_TYPES.injector,
		datatype,
		key,
		defaultValue,
		options: {
			local: key,
		},
	})

export default FromSessionStorage
