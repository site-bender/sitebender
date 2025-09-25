import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import pipe from "@sitebender/toolsmith/vanilla/combinator/pipe/index.ts"
import split from "@sitebender/toolsmith/vanilla/string/split/index.ts"
import trim from "@sitebender/toolsmith/vanilla/string/trim/index.ts"

import stripCommentsAndStrings from "../stripCommentsAndStrings/index.ts"

export default function toLines(pedantic: boolean) {
	return function toLinesFromSource(source: string): Array<string> {
		const body = pedantic ? source : stripCommentsAndStrings(source)

		return pipe([split("\n"), map(trim)])(body)
	}
}
