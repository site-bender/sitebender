import getValue from "@sitebender/engine/pending/dom/getValue/index.ts"
import isDefined from "@sitebender/toolkit/simple/validation/isDefined/index.ts"

import Error from "../../constructors/Error/index.ts"
import castValue from "../../utilities/castValue/index.ts"

const fromLookup =
	(op: Record<string, unknown>) => (_arg: unknown, localValues?: Record<string, unknown>) => {
		const { datatype } = op

		const result = castValue(datatype)(getValue(op as unknown as import("../../constructors/elements/types/index.ts").ElementConfig)(localValues))

		const maybeLeft = (result as { left?: unknown }).left
		if (isDefined(maybeLeft)) {
			return { left: [Error("FromLookup")("FromLookup")(String(maybeLeft))] }
		}

		return result
	}

export default fromLookup
