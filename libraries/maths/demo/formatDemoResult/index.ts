import type { DemoResult } from "../types/index.ts"

// Formats a single demo result for display
export default function formatDemoResult(
	demo: DemoResult,
	index: number,
): string {
	const header = `\n${index + 1}. ${demo.title}:`
	const formula = `Formula: ${demo.formula}`
	const description = demo.description ? `(${demo.description})` : ""
	const status = demo.result.ok
		? "✅ Parsed successfully!"
		: `❌ Error: ${demo.result.error.message}`
	const output = demo.result.ok
		? `Output: ${JSON.stringify(demo.result.value, null, 2)}`
		: ""

	return [header, formula, description, status, output].filter(Boolean).join(
		"\n",
	)
}
