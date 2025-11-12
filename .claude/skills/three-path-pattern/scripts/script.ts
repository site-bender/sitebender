/**
 * CLI script for generating three-path pattern functions
 * Usage: deno run --allow-read --allow-write script.ts <functionName> <basePath> "<description>"
 */

import generateThreePathFunction from "./generator.ts"

function main(): void {
	const args = Deno.args

	if (args.length < 3) {
		console.error("❌ Error: Missing required arguments\n")
		console.log("Usage:")
		console.log(
			'  deno run --allow-read --allow-write script.ts <functionName> <basePath> "<description>"\n',
		)
		console.log("Example:")
		console.log(
			'  deno run --allow-read --allow-write script.ts filter ./src/array "Filters array elements using a predicate"\n',
		)
		Deno.exit(1)
	}

	const [name, basePath, description] = args

	// Validate function name (camelCase)
	if (!/^[a-z][a-zA-Z0-9]*$/.test(name)) {
		console.error(`❌ Error: Function name must be camelCase: ${name}\n`)
		Deno.exit(1)
	}

	// Validate base path
	try {
		const stat = Deno.statSync(basePath)
		if (!stat.isDirectory) {
			console.error(`❌ Error: Base path is not a directory: ${basePath}\n`)
			Deno.exit(1)
		}
	} catch (_error) {
		console.error(`❌ Error: Base path does not exist: ${basePath}\n`)
		Deno.exit(1)
	}

	// Generate function
	generateThreePathFunction({
		name,
		basePath,
		description,
	})
}

if (import.meta.main) {
	main()
}
