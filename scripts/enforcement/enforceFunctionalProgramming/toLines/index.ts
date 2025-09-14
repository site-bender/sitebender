import pipe from "@sitebender/toolkit/vanilla/combinator/pipe/index.ts"
import map from "@sitebender/toolkit/vanilla/array/map/index.ts"
import split from "@sitebender/toolkit/vanilla/string/split/index.ts"
import trim from "@sitebender/toolkit/vanilla/string/trim/index.ts"
import stripCommentsAndStrings from "../stripCommentsAndStrings/index.ts"

export default function toLines(pedantic: boolean) {
  return function toLinesFromSource(source: string): Array<string> {
    const body = pedantic ? source : stripCommentsAndStrings(source)

    return pipe([split("\n"), map(trim)])(body)
  }
}
