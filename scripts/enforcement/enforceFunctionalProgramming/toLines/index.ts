import map from "@sitebender/toolsmith/array/map/index.ts"
import pipe from "@sitebender/toolsmith/combinator/pipe/index.ts"
import split from "@sitebender/toolsmith/string/split/index.ts"
import trim from "@sitebender/toolsmith/string/trim/index.ts"

import stripCommentsAndStrings from "../stripCommentsAndStrings/index.ts"

export default function toLines(pedantic: boolean) {
	return function toLinesFromSource(source: string): Array<string> {
		const body = pedantic ? source : stripCommentsAndStrings(source)

		return pipe([split("\n"), map(trim)])(body)
	}
}
