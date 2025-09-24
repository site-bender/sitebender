import pipe from "@sitebender/toolsmith/vanilla/combinator/pipe/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"
import { FP_FORBIDDEN } from "../../../constants/index.ts"
import type { Violation } from "../../../../types/enforcement/Violation.ts"
import scanRule from "./scanRule/index.ts"
import concatViolations from "./concatViolations/index.ts"

export default function scanForbidden(file: string) {
  return function scanForbiddenInLines(lines: Array<string>): Array<Violation> {

    return pipe([
      map(scanRule(file, lines)),
      reduce(concatViolations)([] as Array<Violation>),
    ])(FP_FORBIDDEN)
  }
}
