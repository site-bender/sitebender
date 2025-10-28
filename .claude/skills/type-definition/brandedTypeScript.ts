import type { BrandedTypeConfig } from "./types.ts"
import { generateBrandedType } from "./brandedTypeGenerator.ts"

const configPath = Deno.args[0]

if (!configPath) {
	console.error("Usage: deno task new:branded <config-file>")
	console.error(
		"Example: deno task new:branded .claude/generators/tmp/Isbn.config.ts",
	)
	Deno.exit(1)
}

try {
	const configModule = await import(
		`file://${Deno.cwd()}/${configPath}`
	)
	const config: BrandedTypeConfig = configModule.default

	if (!config.name || !config.baseType) {
		console.error("Error: Config must have 'name' and 'baseType' properties")
		Deno.exit(1)
	}

	await generateBrandedType(config)
} catch (error) {
	console.error("Error loading config:", error)
	Deno.exit(1)
}
