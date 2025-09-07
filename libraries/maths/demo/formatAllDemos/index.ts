import type { DemoResult } from "../types/index.ts"
import formatDemoResult from "../formatDemoResult/index.ts"

// Formats all demo results into a complete output string
export default function formatAllDemos(demos: ReadonlyArray<DemoResult>): string {
	const separator = "=".repeat(60)
	const header = `${separator}\n@sitebender/maths Library Demo\n${separator}`
	const results = demos.map(formatDemoResult).join("\n")
	const footer = `\n${separator}\nDemo complete!\n${separator}`
	
	return `${header}${results}${footer}`
}