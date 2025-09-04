import getFromLocal from "@sitebender/engine/pending/dom/getValue/getFromLocal/index.ts"
import isDefined from "@sitebender/toolkit/simple/validation/isDefined/index.ts"
import isUndefined from "@sitebender/toolkit/simple/validation/isUndefined/index.ts"

import Error from "../../constructors/Error/index.ts"
import castValue from "../../utilities/castValue/index.ts"

const fromQueryString =
	(op: unknown = {}) => (_: unknown, localValues?: Record<string, unknown>) => {
		const local = getFromLocal(op as import("@sitebender/engine/pending/dom/getValue/getFromLocal/index.ts").SelectorOp)(localValues)

		if (isDefined(local)) {
			return local
		}

		const { datatype, key } = op as { datatype: unknown; key: string }

		const value = new URLSearchParams(globalThis.location?.search ?? "").get(
			key,
		)

		if (isUndefined(value)) {
			return {
				left: [
					Error("FromQueryString")("FromQueryString")(
						`Unable to find key "${key}" in URL search string.`,
					),
				],
			}
		}

		const casted = castValue(datatype)({ right: value })

		return isDefined(casted.right) ? casted : {
			left: [
				Error("FromQueryString")("FromQueryString")(String(casted.left)),
			],
		}
	}

export default fromQueryString
