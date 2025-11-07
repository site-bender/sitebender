// @sitebender/arborist/src/parsers/denoAst/wasm/build.ts
// Build script for compiling Rust WASM bindings

import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

//++ Build the WASM package using wasm-pack
async function buildWasm() {
	console.log("Building WASM package (development mode)...")

	const command = new Deno.Command("wasm-pack", {
		args: [
			"build",
			"--target",
			"bundler",
			"--out-dir",
			"pkg",
			"--dev",
		],
		cwd: "./src/parsers/denoAst/wasm",
	})

	const { code, stdout, stderr } = await command.output()

	if (code !== 0) {
		const errorText = new TextDecoder().decode(stderr)
		throw new Error(`wasm-pack build failed: ${errorText}`)
	}

	console.log(new TextDecoder().decode(stdout))
	console.log("✅ WASM build completed successfully")
}

//++ Build optimized production WASM package
async function buildWasmProd() {
	console.log("Building WASM package (production mode)...")

	const command = new Deno.Command("wasm-pack", {
		args: [
			"build",
			"--target",
			"bundler",
			"--out-dir",
			"pkg",
			"--release",
		],
		cwd: "./src/parsers/denoAst/wasm",
	})

	const { code, stdout, stderr } = await command.output()

	if (code !== 0) {
		const errorText = new TextDecoder().decode(stderr)
		throw new Error(`wasm-pack build failed: ${errorText}`)
	}

	console.log(new TextDecoder().decode(stdout))
	console.log("✅ WASM production build completed successfully")
}

//++ Clean build artifacts
async function cleanWasm() {
	console.log("Cleaning WASM build artifacts...")

	const command = new Deno.Command("rm", {
		args: ["-rf", "pkg"],
		cwd: "./src/parsers/denoAst/wasm",
	})

	const { code, stderr } = await command.output()

	if (code !== 0) {
		const errorText = new TextDecoder().decode(stderr)
		throw new Error(`Clean failed: ${errorText}`)
	}

	console.log("✅ WASM artifacts cleaned successfully")
}

// Main CLI handler
async function main() {
	const args = Deno.args

	if (isEqual(getOrElse(0)(length(args)))(0)) {
		await buildWasm()
	} else {
		const command = args[0]

		switch (command) {
			case "prod":
				await buildWasmProd()
				break
			case "clean":
				await cleanWasm()
				break
			default:
				console.error(`Unknown command: ${command}`)
				console.log("Usage: deno run build.ts [prod|clean]")
				Deno.exit(1)
		}
	}
}

// Run the script when executed
main().catch(console.error)
