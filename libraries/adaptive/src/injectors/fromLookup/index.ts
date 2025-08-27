import Error from "../../constructors/Error/index.ts"
import castValue from "../../utilities/castValue/index.ts"
import getValue from "@adaptiveSrc/pending/dom/getValue/index.ts"
import isDefined from "@toolkit/simple/validation/isDefined/index.ts"

// deno-lint-ignore no-explicit-any
const fromLookup = (op: any) => (_arg: unknown, localValues?: Record<string, unknown>) => {
	const { datatype } = op

	const result = castValue(datatype)(getValue(op)(localValues))

	const maybeLeft = (result as { left?: unknown }).left
	if (isDefined(maybeLeft)) {
		return { left: [Error("FromLookup")("FromLookup")(String(maybeLeft))] }
	}

	return result
}

export default fromLookup
