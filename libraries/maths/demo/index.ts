import formatAllDemos from "./formatAllDemos/index.ts"
#!/usr/bin/env -S deno run

import getDemoCases from "./getDemoCases/index.ts"

// Main demo execution - orchestrates the demo and outputs results
export default function main(): void {
	const demos = getDemoCases()
	const output = formatAllDemos(demos)
	console.log(output)
}

// Execute if run directly
if (import.meta.main) {
	main()
}
