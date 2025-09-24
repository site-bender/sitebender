import type { PerFileAnalysis, FunctionStats } from "../../types/index.ts"

import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"
import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"
import sort from "@sitebender/toolsmith/vanilla/array/sort/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import flatMap from "@sitebender/toolsmith/vanilla/array/flatMap/index.ts"

//++ Computes statistical metrics for functions across all analyzed files
export default function computeFunctionStats(
  files: Array<PerFileAnalysis>
): FunctionStats {
  const allFunctions = flatMap((f: PerFileAnalysis) => f.functions)(files)
  const total = length(allFunctions)

  if (total === 0) {
    return {
      total: 0,
      mean: 0,
      median: 0,
      stdDev: 0,
    }
  }

  const locs = map((f: { loc: number }) => f.loc)(allFunctions)

  const sum = reduce<number, number>((acc, n) => acc + n)(0)(locs)
  const mean = sum / total

  const sorted = sort((a: number, b: number) => a - b)(locs)
  const mid = Math.floor(length(sorted) / 2)
  const median = length(sorted) % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid]

  const squaredDiffs = map((n: number) => Math.pow(n - mean, 2))(locs)
  const variance = reduce<number, number>((acc, n) => acc + n)(0)(squaredDiffs) / total
  const stdDev = Math.sqrt(variance)

  return {
    total,
    mean,
    median,
    stdDev,
  }
}
