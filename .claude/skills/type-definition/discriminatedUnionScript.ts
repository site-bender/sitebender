import type { DiscriminatedUnionConfig } from "./types.ts"
import { generateDiscriminatedUnion } from "./discriminatedUnionGenerator.ts"

const configPath = Deno.args[0]

if (!configPath) {
	console.error("Usage: deno task new:union <config-file>")
	console.error(
		"Example: deno task new:union .claude/generators/tmp/AsyncState.config.ts",
	)
	Deno.exit(1)
}

try {
	const configModule = await import(
		`file://${Deno.cwd()}/${configPath}`
	)
	const config: DiscriminatedUnionConfig = configModule.default

	if (!config.name || !config.variants || config.variants.length === 0) {
		console.error(
			"Error: Config must have 'name' and 'variants' array with at least one variant",
		)
		Deno.exit(1)
	}

	await generateDiscriminatedUnion(config)
} catch (error) {
	console.error("Error loading config:", error)
	Deno.exit(1)
}
