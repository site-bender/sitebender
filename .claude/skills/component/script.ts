#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * CLI wrapper for component generator
 * Supports TypeScript config files
 *
 * Usage:
 *   deno task new:component Button.config.ts
 *   deno task new:component Button.config.ts --keep
 */

import { parseArgs } from "jsr:@std/cli/parse-args"
import { generateComponent } from "./generator.ts"
import type { ComponentConfig } from "./types.ts"

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
		console.error("Error: Config file is required")
		printHelp()
		Deno.exit(1)
	}

	// Check if first arg is a config file
	if (firstArg.endsWith(".config.ts")) {
		await handleConfigFile(firstArg, args.keep)
	} else {
		console.error("Error: Config file must end with .config.ts")
		printHelp()
		Deno.exit(1)
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
	let config: ComponentConfig
	try {
		const imported = await import(`file://${resolvedPath}`)
		config = imported.default
	} catch (error) {
		console.error(`Error loading config file: ${error.message}`)
		Deno.exit(1)
	}

	// Generate the component
	try {
		await generateComponent(config)
	} catch (error) {
		console.error(`Error generating component: ${error.message}`)
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

	const componentName = config.isHtmlElement ? `_${config.name}` : config.name
	printNextSteps(componentName)
}

//++ Prints help message
function printHelp(): void {
	console.log(`
Component Generator

Usage:
  deno task new:component <config-file> [--keep]

Examples:
  # With config file (auto-deleted after use)
  deno task new:component Button.config.ts

  # With config file (preserved)
  deno task new:component Button.config.ts --keep

Config file format:
  import type { ComponentConfig } from "./.claude/skills/component/types.ts"

  export default {
    name: "Button",
    targetFolder: "libraries/architect/src/interact/buttons/Button",
    tagName: "BUTTON",
    description: "Interactive button component",
    isHtmlElement: true,  // Optional: union Props with BaseProps (includes global attributes)
  } satisfies ComponentConfig

Flags:
  --keep, -k    Preserve config file after generation
  --help, -h    Show this help message
`)
}

//++ Prints next steps after generation
function printNextSteps(componentName: string): void {
	console.log(`\nNext steps:`)
	console.log(`  1. Implement the component logic`)
	console.log(`  2. Add custom Props if needed`)
	console.log(`  3. Write tests`)
	console.log(`  4. Run: deno task test ${componentName}`)
}

// Run the main function
if (import.meta.main) {
	await main()
}
