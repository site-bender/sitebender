#!/usr/bin/env -S deno run --allow-read --allow-write

/*++
 + CSS styling generator CLI script
 + Usage: deno run --allow-read --allow-write script.ts ComponentName [options]
 */

import { generateCSS, toKebabCase } from "./generator.ts"
import type { CSSConfig } from "./types.ts"

/*++
 + Print usage information
 */
function printUsage(): void {
	console.log(`
CSS Styling Generator

Usage:
  deno task new:css ComponentName [options]

Options:
  --no-accessibility    Skip accessibility boilerplate
  --no-responsive       Skip responsive styles
  --no-print           Skip print styles
  --output <path>      Custom output path (default: ./ComponentName/index.css)

Examples:
  deno task new:css SubmitButton
  deno task new:css TextField --output forms/TextField/index.css
  deno task new:css Navigation --no-print

Generated CSS includes:
  - Component base styles with IE11 fallback
  - Custom properties (three-tier system)
  - Accessibility features (focus states, touch targets, reduced motion)
  - Print media query section
  - Envoy comments
`)
}

/*++
 + Parse command line arguments into CSSConfig
 */
function parseArguments(args: ReadonlyArray<string>): CSSConfig | null {
	if (args.length === 0) {
		return null
	}

	const componentName = args[0]

	if (!componentName || componentName === "--help" || componentName === "-h") {
		return null
	}

	const className = toKebabCase(componentName)

	const config: CSSConfig = {
		componentName,
		className,
		includeAccessibility: !args.includes("--no-accessibility"),
		includeResponsive: !args.includes("--no-responsive"),
		includePrint: !args.includes("--no-print"),
	}

	return config
}

/*++
 + Get output path from arguments or default
 */
function getOutputPath(args: ReadonlyArray<string>): (componentName: string) => string {
	return function getPathForComponent(componentName: string): string {
		const outputIndex = args.indexOf("--output")

		if (outputIndex !== -1 && outputIndex + 1 < args.length) {
			return args[outputIndex + 1]
		}

		return `./${componentName}/index.css`
	}
}

/*++
 + Write CSS to file
 + Takes path, returns function that takes CSS content
 */
function writeCSS(path: string): (css: string) => Promise<void> {
	return async function writeCSSToPath(css: string): Promise<void> {
		const directory = path.substring(0, path.lastIndexOf("/"))

		if (directory) {
			await Deno.mkdir(directory, { recursive: true })
		}

		await Deno.writeTextFile(path, css)

		console.log(`✅ Generated CSS: ${path}`)
	}
}

/*++
 + Main entry point
 */
async function main(): Promise<void> {
	const args = Deno.args

	const config = parseArguments(args)

	if (!config) {
		printUsage()
		Deno.exit(1)
	}

	const css = generateCSS(config)

	const outputPath = getOutputPath(args)(config.componentName)

	await writeCSS(outputPath)(css)

	console.log(`
Generated CSS for ${config.componentName}

Features included:
  ✅ IE11 baseline + progressive enhancement
  ✅ Three-tier custom properties
  ${config.includeAccessibility ? "✅" : "❌"} Accessibility features
  ${config.includeResponsive ? "✅" : "❌"} Responsive styles
  ${config.includePrint ? "✅" : "❌"} Print styles

Next steps:
  1. Review generated CSS in ${outputPath}
  2. Customize styles for your component
  3. Add sub-element selectors as needed
  4. Verify contrast ratios (APCA + WCAG 2.1 AAA)
  5. Test in IE11 if possible
`)
}

/*++ Run main function */
if (import.meta.main) {
	main().catch(function handleError(error: unknown): void {
		console.error("❌ Error:", error)
		Deno.exit(1)
	})
}
