import getFromLocal from "@engineSrc/pending/dom/getValue/getFromLocal/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

import Error from "../../constructors/Error/index.ts"
import castValue from "../../utilities/castValue/index.ts"

// deno-lint-ignore no-explicit-any
const fromLocalStorage =
	(op: any) => (_: unknown, localValues?: Record<string, unknown>) => {
		const local = getFromLocal(op)(localValues)

		if (isDefined(local)) {
			return local
		}

		const { datatype, key } = op
		const value = globalThis.localStorage?.getItem(key)

		if (value === null || value === undefined) {
			return {
				left: [
					Error("FromLocalStorage")("FromLocalStorage")(
						`Value at key "${key}" not found.`,
					),
				],
			}
		}

		const casted = castValue(datatype)({ right: value })

		return isDefined(casted.right) ? casted : {
			left: [
				Error("FromLocalStorage")("FromLocalStorage")(String(casted.left)),
			],
		}
	}

export default fromLocalStorage
