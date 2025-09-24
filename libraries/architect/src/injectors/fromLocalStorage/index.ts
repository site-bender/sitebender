import getFromLocal from "@sitebender/architect/pending/dom/getValue/getFromLocal/index.ts"
import isDefined from "@sitebender/toolsmith/vanilla/validation/isDefined/index.ts"

import Error from "../../constructors/Error/index.ts"
import castValue, {
	Either as CastEither,
} from "../../utilities/castValue/index.ts"

const fromLocalStorage =
	(op: unknown) => (_: unknown, localValues?: Record<string, unknown>) => {
		const local = getFromLocal(
			op as import("@sitebender/architect/pending/dom/getValue/getFromLocal/index.ts").SelectorOp,
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

		const casted = castValue<unknown, string>(datatype)(
			{ right: value } as CastEither<unknown, string>,
		)

		if (isDefined((casted as { right?: unknown }).right)) {
			return casted
		}
		const leftVal = (casted as { left?: unknown }).left
		return {
			left: [
				Error("FromLocalStorage")("FromLocalStorage")(
					String(leftVal),
				),
			],
		}
	}

export default fromLocalStorage
