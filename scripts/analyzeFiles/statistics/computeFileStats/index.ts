import type { FileStats, PerFileAnalysis } from "../../types/index.ts"

export default function computeFileStats(files: PerFileAnalysis[]): FileStats {
  if (files.length === 0) {
    return {
      longestFile: { path: "<none>", lines: 0 },
      mean: 0,
      median: 0,
      stdDev: 0,
    }
  }

  let total = 0
  let longest = files[0]
  for (const f of files) {
    total += f.lines
    if (f.lines > longest.lines) longest = f
  }
  const mean = total / files.length
  const sorted = files.map((f) => f.lines).sort((a, b) => a - b)
  const median = sorted.length % 2 ? sorted[(sorted.length - 1) / 2] : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
  const variance = sorted.reduce((acc, n) => acc + Math.pow(n - mean, 2), 0) / sorted.length
  const stdDev = Math.sqrt(variance)

  return {
    longestFile: { path: longest.pathRel, lines: longest.lines },
    mean,
    median,
    stdDev,
  }
}
