import type { WardenConfig } from "../../types/index.ts"

import enforce from "./index.ts"

Deno.test("enforce function works with basic configuration", async () => {
	const config: WardenConfig = {
		targets: ["src/"],
		phase: "warn",
		privacyRules: [],
		contractPaths: [],
		performance: { maxExecutionTime: 5000, parallelProcessing: false },
		reporting: { format: "console" },
	}

	const enforceWithConfig = enforce(config)
	const result = await enforceWithConfig("warn")

	// Should return a result object
	console.assert(typeof result === "object", "Result should be an object")
	console.assert(
		typeof result.success === "boolean",
		"Result should have success property",
	)
	console.assert(
		Array.isArray(result.violations),
		"Result should have violations array",
	)
	console.assert(
		typeof result.executionTime === "number",
		"Result should have executionTime",
	)
	console.assert(typeof result.phase === "string", "Result should have phase")
})

Deno.test("enforce function handles empty targets", async () => {
	const config: WardenConfig = {
		targets: [],
		phase: "warn",
		privacyRules: [],
		contractPaths: [],
		performance: { maxExecutionTime: 5000, parallelProcessing: false },
		reporting: { format: "console" },
	}

	const enforceWithConfig = enforce(config)
	const result = await enforceWithConfig("warn")

	console.assert(result.success === true, "Empty targets should return success")
	console.assert(
		result.violations.length === 0,
		"Empty targets should have no violations",
	)
})
