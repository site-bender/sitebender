#!/usr/bin/env -S deno run --allow-all

/**
 * Development mode runner
 * Automatically configures environment for development and runs commands
 */

import { mergeConfigs } from "./configureEnvironment/index.ts"

const runDev = async () => {
	// Set development environment
	Deno.env.set("DENO_ENV", "dev")

	// Create merged config
	const configPath = await mergeConfigs()

	// Get the command to run (everything after script name)
	const args = Deno.args

	if (args.length === 0) {
		console.log(`
Usage: deno task dev:run <command> [args...]

Examples:
  deno task dev:run test
  deno task dev:run build
  deno task dev:run "deno run --allow-read my-script.ts"
		`)
		Deno.exit(0)
	}

	// Build the command with the merged config
	const command = new Deno.Command("deno", {
		args: ["task", "--config", configPath, ...args],
		stdout: "inherit",
		stderr: "inherit",
		stdin: "inherit",
	})

	// Execute the command
	const { code } = await command.output()

	// Clean up temp config file
	try {
		await Deno.remove(configPath)
	} catch {
		// Ignore cleanup errors
	}

	Deno.exit(code)
}

if (import.meta.main) {
	await runDev()
}
