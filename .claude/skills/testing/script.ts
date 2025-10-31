//++ CLI script for test generator
//++ Usage: deno task new:test <configPath>

import type { TestConfig } from "./types.ts"
import generateTest from "./generator.ts"

//++ Main entry point
async function main() {
	const args = Deno.args

	if (args.length === 0) {
		console.error("Usage: deno task new:test <configPath>")
		console.error("Example: deno task new:test myTest.config.ts")
		Deno.exit(1)
	}

	const configPath = args[0]
	const keepConfig = args.includes("--keep")

	try {
		const config = await _loadConfig(configPath)
		const testCode = generateTest(config)
		const outputPath = _determineOutputPath(config)

		await Deno.writeTextFile(outputPath, testCode)

		console.log(`✓ Test file generated: ${outputPath}`)

		if (!keepConfig) {
			await Deno.remove(configPath)
			console.log(`✓ Config file removed: ${configPath}`)
		}
	} catch (error) {
		console.error("Error generating test:", error)
		Deno.exit(1)
	}
}

//++ Loads test config from file
async function _loadConfig(path: string): Promise<TestConfig> {
	try {
		const module = await import(new URL(path, import.meta.url).href)
		return module.default
	} catch (error) {
		throw new Error(`Failed to load config from ${path}: ${error}`)
	}
}

//++ Determines output path for test file
function _determineOutputPath(config: TestConfig): string {
	const { functionPath } = config

	if (functionPath.endsWith("/index.ts")) {
		return functionPath.replace("/index.ts", "/index.test.ts")
	}

	if (functionPath.endsWith(".ts")) {
		return functionPath.replace(".ts", ".test.ts")
	}

	throw new Error(
		`Cannot determine test file path from function path: ${functionPath}`,
	)
}

main()
