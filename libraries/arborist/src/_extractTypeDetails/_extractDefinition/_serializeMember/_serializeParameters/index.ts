import type { SwcFnParam } from "../../../../types/index.ts"
import _serializeParameter from "../../_serializeParameter/index.ts"

//++ Reducer function to serialize parameters into array of strings
export default function _serializeParameters(accumulator: ReadonlyArray<string>, param: SwcFnParam): ReadonlyArray<string> {
	return [...accumulator, _serializeParameter(param)]
}
