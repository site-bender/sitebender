#!/usr/bin/env -S deno run --allow-read --allow-write --allow-env

/**
 * Merges environment-specific configuration with the main deno.jsonc
 * Creates a temporary deno.env.json file that combines base config with env-specific imports
 */

import { parse, stringify } from "jsr:@std/jsonc@1.0.1"

const getEnvironment = (): "dev" | "prod" => {
	const env = Deno.env.get("DENO_ENV") || Deno.env.get("NODE_ENV") || "dev"
	return env === "production" || env === "prod" ? "prod" : "dev"
}

const readJsonc = async (path: string) => {
	try {
		const content = await Deno.readTextFile(path)
		return parse(content)
	} catch (error) {
		console.error(`Failed to read ${path}:`, error)
		return null
	}
}

const mergeConfigs = async () => {
	const environment = getEnvironment()
	console.log(`Configuring for ${environment} environment...`)

	// Read base config
	const baseConfig = await readJsonc("deno.jsonc")
	if (!baseConfig) {
		console.error("Failed to read base deno.jsonc")
		Deno.exit(1)
	}

	// Read environment-specific config
	const envConfigPath = `deno.${environment}.jsonc`
	const envConfig = await readJsonc(envConfigPath)
	if (!envConfig) {
		console.error(`Failed to read ${envConfigPath}`)
		Deno.exit(1)
	}

	// Merge configs (env imports override base imports)
	const mergedConfig = {
		...baseConfig,
		imports: {
			...(baseConfig as any).imports,
			...(envConfig as any).imports,
		},
	}

	// Write merged config to a temporary file (using .jsonc extension for comments/trailing commas support)
	const outputPath = "deno.env.jsonc"
	await Deno.writeTextFile(
		outputPath,
		JSON.stringify(mergedConfig, null, 2),
	)

	console.log(`✓ Created ${outputPath} with ${environment} configuration`)
	return outputPath
}

// Main execution
if (import.meta.main) {
	const args = Deno.args

	if (args.includes("--help")) {
		console.log(`
Usage: deno run --allow-read --allow-write --allow-env scripts/configureEnvironment/index.ts [options]

Options:
  --help     Show this help message

Environment Variables:
  DENO_ENV   Set to 'production' or 'prod' for production mode (default: dev)
  NODE_ENV   Alternative to DENO_ENV

This script merges environment-specific configuration from deno.dev.jsonc or
deno.prod.jsonc with the base deno.jsonc configuration.
		`)
		Deno.exit(0)
	}

	await mergeConfigs()
}

export { getEnvironment, mergeConfigs }
