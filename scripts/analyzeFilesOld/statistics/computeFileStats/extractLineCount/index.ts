import type { PerFileAnalysis } from "../../../types/index.ts"

//++ Extracts the line count from a file analysis object
export default function extractLineCount(f: PerFileAnalysis): number {
	return f.lines
}