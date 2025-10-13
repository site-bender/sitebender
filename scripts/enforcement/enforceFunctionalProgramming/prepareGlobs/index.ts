import filter from "@sitebender/toolsmith/array/filter/index.ts"
import pipe from "@sitebender/toolsmith/combinator/pipe/index.ts"

import isNotPedanticFlag from "../isNotPedanticFlag/index.ts"
import isPedantic from "../isPedantic/index.ts"

export default function prepareGlobs(args: Array<string>): Array<string> {
	return isPedantic(args) ? pipe([filter(isNotPedanticFlag)])(args) : args
}
