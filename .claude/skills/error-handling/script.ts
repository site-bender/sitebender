//++ CLI script for generating error types
//++ Usage: deno task new:error <ErrorTypeName> or deno task new:error <config-file>

import generateErrorType from "./generator.ts"
import type { ErrorTypeConfig } from "./types.ts"

//++ Main entry point
async function main(args: ReadonlyArray<string>): Promise<void> {
	if (args.length === 0) {
		console.error("Usage: deno task new:error <ErrorTypeName>")
		console.error("   or: deno task new:error <config-file.ts>")
		Deno.exit(1)
	}

	const input = args[0]

	//++ Check if input is a config file
	if (input.endsWith(".ts") || input.endsWith(".config.ts")) {
		await _generateFromConfigFile(input)
	} else {
		await _generateSimpleError(input)
	}
}

//++ Generate from config file
async function _generateFromConfigFile(configPath: string): Promise<void> {
	try {
		//++ [IO] Import config file
		const configModule = await import(configPath)
		const config: ErrorTypeConfig = configModule.default

		//++ Generate code
		const code = generateErrorType(config)

		//++ Output file path
		const outputPath = config.name
			? `${config.name}/index.ts`
			: "error/index.ts"

		//++ [IO] Write file
		await Deno.writeTextFile(outputPath, code)

		console.log(`✓ Generated error type at ${outputPath}`)
	} catch (err) {
		console.error(`Error generating from config file: ${err}`)
		Deno.exit(1)
	}
}

//++ Generate simple error type with basic structure
async function _generateSimpleError(name: string): Promise<void> {
	//++ Create basic config
	const config: ErrorTypeConfig = {
		name,
		variants: [
			{
				tag: `${name}`,
				description: `${name} occurred`,
				fields: [
					{
						name: "message",
						type: "string",
						description: "Error message",
					},
				],
			},
		],
		description: `${name} error type`,
	}

	//++ Generate code
	const code = generateErrorType(config)

	//++ Output file path
	const outputPath = `${name}/index.ts`

	try {
		//++ [IO] Create directory
		await Deno.mkdir(name, { recursive: true })

		//++ [IO] Write file
		await Deno.writeTextFile(outputPath, code)

		console.log(`✓ Generated simple error type at ${outputPath}`)
		console.log("")
		console.log("Next steps:")
		console.log(`1. Edit ${outputPath} to customize error structure`)
		console.log(
			"2. Or create a config file for complex error types with multiple variants",
		)
	} catch (err) {
		console.error(`Error generating error type: ${err}`)
		Deno.exit(1)
	}
}

//++ Run if executed directly
if (import.meta.main) {
	await main(Deno.args)
}

export { main }
