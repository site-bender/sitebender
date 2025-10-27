#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * CLI wrapper for function generator
 * Supports both old-style CLI args and new TypeScript config files
 *
 * Usage:
 *   deno task new:function add.config.ts
 *   deno task new:function add.config.ts --keep
 *   deno task new:function add 2  (old style, still works)
 */

import { parseArgs } from "jsr:@std/cli/parse-args"
import { generateFunction } from "./generator.ts"
import type { FunctionConfig } from "./types.ts"

//++ Main entry point for the CLI
async function main(): Promise<void> {
	const args = parseArgs(Deno.args, {
		boolean: ["keep", "help"],
		string: ["_"],
		alias: { k: "keep", h: "help" },
	})

	if (args.help) {
		printHelp()
		Deno.exit(0)
	}

	const firstArg = args._[0] as string | undefined

	if (!firstArg) {
		console.error("Error: Function name or config file is required")
		printHelp()
		Deno.exit(1)
	}

	// Check if first arg is a config file
	if (firstArg.endsWith(".config.ts")) {
		await handleConfigFile(firstArg, args.keep)
	} else {
		// Old style: name + param count
		await handleOldStyle(args._)
	}
}

//++ Handles config file mode
async function handleConfigFile(configPath: string, keepConfig: boolean): Promise<void> {
	let resolvedPath = configPath

	// If relative path, try to resolve from current directory
	if (!configPath.startsWith("/")) {
		// Check if it exists in current directory
		try {
			await Deno.stat(configPath)
			resolvedPath = `${Deno.cwd()}/${configPath}`
		} catch {
			// Try .claude/generators/tmp/
			const tmpPath = `${Deno.cwd()}/.claude/generators/tmp/${configPath}`
			try {
				await Deno.stat(tmpPath)
				resolvedPath = tmpPath
			} catch {
				console.error(`Error: Config file not found: ${configPath}`)
				console.error(`Tried:`)
				console.error(`  - ${configPath}`)
				console.error(`  - .claude/generators/tmp/${configPath}`)
				Deno.exit(1)
			}
		}
	}

	console.log(`Loading config from: ${resolvedPath}`)

	// Import the config file
	let config: FunctionConfig
	try {
		const imported = await import(`file://${resolvedPath}`)
		config = imported.default
	} catch (error) {
		console.error(`Error loading config file: ${error.message}`)
		Deno.exit(1)
	}

	// Generate the function
	try {
		await generateFunction(config)
	} catch (error) {
		console.error(`Error generating function: ${error.message}`)
		Deno.exit(1)
	}

	// Delete config file unless --keep flag
	if (!keepConfig) {
		try {
			await Deno.remove(resolvedPath)
			console.log(`✓ Config file deleted: ${resolvedPath}`)
		} catch (error) {
			console.warn(`Warning: Could not delete config file: ${error.message}`)
		}
	} else {
		console.log(`✓ Config file preserved: ${resolvedPath}`)
	}

	printNextSteps(config.name)
}

//++ Handles old-style CLI arguments (backward compatibility)
async function handleOldStyle(args: Array<string | number>): Promise<void> {
	const functionName = args[0] as string
	const paramCount = parseInt(args[1] as string ?? "1", 10)

	if (isNaN(paramCount) || paramCount < 1 || paramCount > 5) {
		console.error("Error: paramCount must be between 1 and 5")
		Deno.exit(1)
	}

	if (!isCamelCase(functionName)) {
		console.error(`Error: Function name must be in camelCase: ${functionName}`)
		console.error("Examples: getUserData, calculateTotal, parseDocument")
		Deno.exit(1)
	}

	// Generate config from old-style args
	const parameters = []
	for (let i = 0; i < paramCount; i++) {
		parameters.push({
			name: `parameter${i + 1}`,
			type: "T" + (i + 1),
		})
	}

	const config: FunctionConfig = {
		name: functionName,
		conjunction: "With",
		parameters,
		returns: "ReturnType",
		description: `Brief description of what ${functionName} does`,
		generic: paramCount > 1
			? parameters.map((_, i) => `T${i + 1}`).join(", ") + ", ReturnType"
			: "T, ReturnType",
	}

	try {
		await generateFunction(config)
	} catch (error) {
		console.error(`Error generating function: ${error.message}`)
		Deno.exit(1)
	}

	printNextSteps(functionName)
}

//++ Checks if a string is in camelCase format
function isCamelCase(str: string): boolean {
	if (!/^[a-z]/.test(str)) return false
	if (!/^[a-zA-Z0-9]+$/.test(str)) return false
	if (/[A-Z]{2,}/.test(str)) return false
	return true
}

//++ Prints help message
function printHelp(): void {
	console.log(`
Function Generator

Usage:
  deno task new:function <config-file> [--keep]
  deno task new:function <name> <param-count>

Examples:
  # With config file (auto-deleted after use)
  deno task new:function add.config.ts

  # With config file (preserved)
  deno task new:function add.config.ts --keep

  # Old style (still works)
  deno task new:function calculateTotal 2

Config file format:
  import type { FunctionConfig } from "./.claude/skills/function-implementation/types.ts"

  export default {
    name: "add",
    conjunction: "To",
    parameters: [
      { name: "augend", type: "number" },
      { name: "addend", type: "number" },
    ],
    returns: "number",
  } satisfies FunctionConfig

Flags:
  --keep, -k    Preserve config file after generation
  --help, -h    Show this help message
`)
}

//++ Prints next steps after generation
function printNextSteps(functionName: string): void {
	console.log(`\nNext steps:`)
	console.log(`  1. Implement the function logic`)
	console.log(`  2. Write tests`)
	console.log(`  3. Run: deno task test ${functionName}`)
}

// Run the main function
if (import.meta.main) {
	await main()
}
