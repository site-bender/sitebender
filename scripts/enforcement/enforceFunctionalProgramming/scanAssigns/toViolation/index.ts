import trim from "@sitebender/toolsmith/vanilla/string/trim/index.ts"
import type { Violation } from "../../../../../types/enforcement/Violation.ts"
import countNewlines from "../../string/countNewlines/index.ts"
import lastNewlineIndex from "../../string/lastNewlineIndex/index.ts"
import split from "@sitebender/toolsmith/vanilla/string/split/index.ts"

export default function toViolation(file: string, source: string) {
  return function toViolationFromAssign(a: { index: number; text: string }): Violation {

    const head = source.substring(0, a.index)
    const line = countNewlines(head) + 1
    const col = a.index - (lastNewlineIndex(head) + 1) + 1

    return {
      file,
      line,
      col,
      rule: "Object.assign(non-literal-target)",
      snippet: trim(split(/\r?\n/)(source)[line - 1] ?? a.text),
    }
  }
}
