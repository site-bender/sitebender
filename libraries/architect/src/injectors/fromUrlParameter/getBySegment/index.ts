import isDefined from "@sitebender/toolsmith/vanilla/validation/isDefined/index.ts"
import isUndefined from "@sitebender/toolsmith/vanilla/validation/isUndefined/index.ts"

import Error from "../../../constructors/Error/index.ts"
import castValue, {
	Either as CastEither,
} from "../../../utilities/castValue/index.ts"

// deno-lint-ignore no-explicit-any
const getBySegment = (op: any) => {
	const {
		datatype,
		options: { segment },
	} = op
	const index = castValue<unknown, number>("Integer")(
		{ right: segment } as CastEither<unknown, number>,
	)

	if (isDefined(index.left)) {
		return {
			left: [Error(op)("FromUrlParameter")("Segment is not an integer.")],
		}
	}

	const idx = index.right as number | undefined
	const value = (globalThis.location?.pathname ?? "").split("/").at(
		idx ?? -1,
	)

	if (isUndefined(value)) {
		return {
			left: [
				Error(op)("FromUrlParameter")(
					`Unable to find value at segment ${segment} in URL path.`,
				),
			],
		}
	}

	const casted = castValue<unknown, string | number | boolean>(datatype)(
		{ right: value } as CastEither<unknown, string | number | boolean>,
	)

	if (isDefined((casted as { right?: unknown }).right)) {
		return casted
	}
	const leftVal = (casted as { left?: unknown }).left
	return {
		left: [Error(op)("FromUrlParameter")(String(leftVal))],
	}
}

export default getBySegment
