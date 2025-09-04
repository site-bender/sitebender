import type { FileFunction, FunctionStats } from "../../types/index.ts"

export default function computeFunctionStats(fns: FileFunction[]): FunctionStats {
  if (fns.length === 0) return { total: 0, mean: 0, median: 0, stdDev: 0 }
  const total = fns.length
  const locs = fns.map((f) => f.loc).sort((a, b) => a - b)
  const sum = locs.reduce((a, b) => a + b, 0)
  const mean = sum / total
  const median = locs.length % 2 ? locs[(locs.length - 1) / 2] : (locs[locs.length / 2 - 1] + locs[locs.length / 2]) / 2
  const variance = locs.reduce((acc, n) => acc + Math.pow(n - mean, 2), 0) / locs.length
  const stdDev = Math.sqrt(variance)
  return { total, mean, median, stdDev }
}
