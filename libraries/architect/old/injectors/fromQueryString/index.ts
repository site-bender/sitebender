import getFromLocal from "@sitebender/architect/pending/dom/getValue/getFromLocal/index.ts"
import isDefined from "@sitebender/toolsmith/vanilla/validation/isDefined/index.ts"
import isUndefined from "@sitebender/toolsmith/vanilla/validation/isUndefined/index.ts"

import Error from "../../constructors/Error/index.ts"
import castValue, {
	Either as CastEither,
} from "../../utilities/castValue/index.ts"

const fromQueryString = (op: unknown = {}) =>
(
	_: unknown,
	localValues?: Record<string, unknown>,
) => {
	const local = getFromLocal(
		op as import("@sitebender/architect/pending/dom/getValue/getFromLocal/index.ts").SelectorOp,
	)(localValues)

	if (isDefined(local)) {
		return local
	}

	const { datatype, key } = op as { datatype: unknown; key: string }

	const value = new URLSearchParams(globalThis.location?.search ?? "")
		.get(
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

	const casted = castValue<unknown, string>(datatype)(
		{ right: value } as CastEither<unknown, string>,
	)

	if (isDefined((casted as { right?: unknown }).right)) {
		return casted
	}
	const leftVal = (casted as { left?: unknown }).left
	return {
		left: [
			Error("FromQueryString")("FromQueryString")(
				String(leftVal),
			),
		],
	}
}

export default fromQueryString
