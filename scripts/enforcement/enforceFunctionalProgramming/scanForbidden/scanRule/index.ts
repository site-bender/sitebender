import pipe from "@sitebender/toolkit/vanilla/combinator/pipe/index.ts"
import filter from "@sitebender/toolkit/vanilla/array/filter/index.ts"
import isNotNullViolation from "../isNotNullViolation/index.ts"
import mapRuleMatches from "../mapRuleMatches/index.ts"
import type { Violation } from "../../../../../types/enforcement/Violation.ts"

export default function scanRule(file: string, lines: Array<string>) {
  return function scanGivenRule(rule: { name: string; regex: RegExp }): Array<Violation> {

    return pipe([filter(isNotNullViolation)])(mapRuleMatches(file, lines, rule))
  }
}
