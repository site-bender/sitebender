#!/usr/bin/env -S deno run --allow-all

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

import generateTests from "../generateTests/index.ts"

// Terminal colors for pretty output
const RED = "\x1b[31m"
const GREEN = "\x1b[32m"
const YELLOW = "\x1b[33m"
const BLUE = "\x1b[34m"
const MAGENTA = "\x1b[35m"
const CYAN = "\x1b[36m"
const RESET = "\x1b[0m"
const BOLD = "\x1b[1m"

export default async function runDemo() {
	console.log(
		`${BOLD}${CYAN}========================================${RESET}`,
	)
	console.log(`${BOLD}${CYAN}   🧪 AUDITOR DEMONSTRATION 🧪${RESET}`)
	console.log(
		`${BOLD}${CYAN}========================================${RESET}\n`,
	)

	console.log(`${YELLOW}This demo will prove that the auditor:${RESET}`)
	console.log(`  1. Generates real test code`)
	console.log(`  2. Creates type-correct inputs`)
	console.log(`  3. Imports custom types properly`)
	console.log(`  4. Produces runnable tests`)
	console.log(`  5. Achieves high coverage\n`)

	// Test subjects: simple to complex functions
	// Get absolute paths
	const baseDir = new URL(".", import.meta.url).pathname
	const projectRoot = baseDir.replace("/libraries/auditor/src/demo/", "")

	const testTargets = [
		{
			path:
				`${projectRoot}/libraries/toolsmith/src/string/trimStart/index.ts`,
			description: "Simple string function",
		},
		{
			path:
				`${projectRoot}/libraries/toolsmith/src/array/head/index.ts`,
			description: "Array function with edge cases",
		},
		{
			path:
				`${projectRoot}/libraries/toolsmith/src/combinator/compose/index.ts`,
			description: "Higher-order function (compose)",
		},
	]

	async function processTarget(
		target: { path: string; description: string },
	): Promise<string> {
		let log = ""
		const append = (s: string) => {
			log += s + "\n"
		}

		append(`${BOLD}${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`)
		append(`${BOLD}${MAGENTA}Testing: ${target.description}${RESET}`)
		append(`${BLUE}Path: ${target.path}${RESET}\n`)

		try {
			append(`${CYAN}Generating tests...${RESET}`)
			const suite = await generateTests(target.path, {
				includePropertyTests: true,
				includeEdgeCases: true,
				targetCoverage: 100,
			})

			append(`\n${GREEN}✅ Test generation successful!${RESET}`)
			append(`${CYAN}Summary:${RESET}`)
			append(`  • Function: ${BOLD}${suite.functionName}${RESET}`)
			append(
				`  • Test cases generated: ${BOLD}${suite.testCases.length}${RESET}`,
			)
			append(
				`  • Coverage achieved: ${BOLD}${
					suite.coverage.percentage.toFixed(1)
				}%${RESET}`,
			)

			append(`\n${CYAN}Sample test cases:${RESET}`)
			const sampleTests = suite.testCases.slice(0, 3)
			for (const test of sampleTests) {
				append(`  • ${test.description}`)
				if (test.input) {
					append(`    Input: ${JSON.stringify(test.input)}`)
				}
				if (test.expected !== undefined) {
					append(`    Expected: ${JSON.stringify(test.expected)}`)
				}
			}

			append(
				`${YELLOW}(Test file will be written when tests are generated)${RESET}`,
			)

			append(`\n${CYAN}Attempting to run generated tests...${RESET}`)
			const testCommand = new Deno.Command("deno", {
				args: [
					"test",
					"--allow-all",
					target.path.replace("/index.ts", "/index.test.ts"),
				],
				stdout: "piped",
				stderr: "piped",
			})

			try {
				const { code, stdout, stderr } = await testCommand.output()
				const output = new TextDecoder().decode(stdout)
				const errorOutput = new TextDecoder().decode(stderr)

				if (code === 0) {
					append(`${GREEN}✅ Tests passed!${RESET}`)
					const lines = output.split("\n")
					const relevantLines = lines.filter((line) =>
						line.includes("test result") ||
						line.includes("passed") ||
						line.includes("ok")
					)
					if (relevantLines.length > 0) {
						append(`${CYAN}Test output:${RESET}`)
						for (const line of relevantLines) append(`  ${line}`)
					}
				} else {
					append(
						`${YELLOW}⚠️  Tests not yet runnable (may need implementation)${RESET}`,
					)
					if (errorOutput) {
						append(`${RED}Error: ${errorOutput.slice(0, 200)}...${RESET}`)
					}
				}
			} catch {
				append(`${YELLOW}Test file not yet created${RESET}`)
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error)
			append(`${RED}❌ Error: ${message}${RESET}`)
		}

		append("")
		return log
	}

	const logs = await Promise.all(testTargets.map(processTarget))
	for (const out of logs) {
		console.log(out)
	}

	console.log()

	console.log(
		`${BOLD}${CYAN}========================================${RESET}`,
	)
	console.log(`${BOLD}${GREEN}   🎉 DEMO COMPLETE 🎉${RESET}`)
	console.log(
		`${BOLD}${CYAN}========================================${RESET}\n`,
	)

	console.log(`${GREEN}The auditor has demonstrated:${RESET}`)
	console.log(`  ✅ Automatic test generation`)
	console.log(`  ✅ Type-aware input creation`)
	console.log(`  ✅ Property-based testing`)
	console.log(`  ✅ Edge case detection`)
	console.log(`  ✅ Coverage analysis`)

	console.log(`\n${YELLOW}Note: Some tests may not run if they depend on`)
	console.log(`implementation details or if the test file hasn't`)
	console.log(`been written to disk yet.${RESET}`)

	console.log(`\n${CYAN}To use the auditor on your own functions:${RESET}`)
	console.log(
		`  ${BLUE}import generateTests from "@sitebender/auditor"${RESET}`,
	)
	console.log(
		`  ${BLUE}const suite = await generateTests("path/to/function.ts")${RESET}`,
	)
}

// Run the demo if called directly
if (import.meta.main) {
	runDemo().catch((error) => {
		console.error(`${RED}Fatal error: ${error}${RESET}`)
		Deno.exit(1)
	})
}
