import getFromLocal from "@sitebender/architect/pending/dom/getValue/getFromLocal/index.ts"
import isDefined from "@sitebender/toolsmith/vanilla/validation/isDefined/index.ts"

import Error from "../../constructors/Error/index.ts"
import castValue, {
	Either as CastEither,
} from "../../utilities/castValue/index.ts"

const fromSessionStorage =
	(op: unknown) => (_: unknown, localValues?: Record<string, unknown>) => {
		const local = getFromLocal(
			op as import("@sitebender/architect/pending/dom/getValue/getFromLocal/index.ts").SelectorOp,
		)(localValues)

		if (isDefined(local)) {
			return local
		}

		const { datatype, key } = op as { datatype: unknown; key: string }
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

		const casted = castValue<unknown, string>(datatype)(
			{ right: value } as CastEither<unknown, string>,
		)

		if (isDefined((casted as { right?: unknown }).right)) {
			return casted
		}
		const leftVal = (casted as { left?: unknown }).left
		return {
			left: [
				Error("FromSessionStorage")("FromSessionStorage")(
					String(leftVal),
				),
			],
		}
	}

export default fromSessionStorage
