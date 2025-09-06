import getFromLocal from "@sitebender/engine/pending/dom/getValue/getFromLocal/index.ts"
import isDefined from "@sitebender/toolkit/simple/validation/isDefined/index.ts"

import Error from "../../constructors/Error/index.ts"
import castValue from "../../utilities/castValue/index.ts"

const fromLocalStorage =
	(op: unknown) => (_: unknown, localValues?: Record<string, unknown>) => {
		const local = getFromLocal(
			op as import("@sitebender/engine/pending/dom/getValue/getFromLocal/index.ts").SelectorOp,
		)(localValues)

		if (isDefined(local)) {
			return local
		}

		const { datatype, key } = op as { datatype: unknown; key: string }
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
				Error("FromLocalStorage")("FromLocalStorage")(
					String(casted.left),
				),
			],
		}
	}

export default fromLocalStorage
