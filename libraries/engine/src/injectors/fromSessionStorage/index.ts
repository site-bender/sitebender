import getFromLocal from "@sitebender/engine/pending/dom/getValue/getFromLocal/index.ts"
import isDefined from "@sitebender/toolkit/simple/validation/isDefined/index.ts"

import Error from "../../constructors/Error/index.ts"
import castValue from "../../utilities/castValue/index.ts"

// deno-lint-ignore no-explicit-any
const fromSessionStorage =
	(op: any) => (_: unknown, localValues?: Record<string, unknown>) => {
		const local = getFromLocal(op)(localValues)

		if (isDefined(local)) {
			return local
		}

		const { datatype, key } = op
		const value = globalThis.sessionStorage?.getItem(key)

		if (value === null || value === undefined) {
			return {
				left: [
					Error("FromSessionStorage")("FromSessionStorage")(
						`Value at key "${key}" not found.`,
					),
				],
			}
		}

		const casted = castValue(datatype)({ right: value })

		return isDefined(casted.right) ? casted : {
			left: [
				Error("FromSessionStorage")("FromSessionStorage")(
					String(casted.left),
				),
			],
		}
	}

export default fromSessionStorage
