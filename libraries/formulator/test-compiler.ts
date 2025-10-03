#!/usr/bin/env -S deno run --unstable-temporal

import compiler from "./src/compiler/index.ts"

//++ Test script for Formulator compiler - run with: deno run --unstable-temporal test-compiler.ts "your formula"

const formula = Deno.args[0] || "(a - b) / (c + d + e) * f"

console.log("\n" + "=".repeat(80))
console.log("FORMULATOR COMPILER TEST")
console.log("=".repeat(80))
console.log(`\nInput Formula: "${formula}"`)
console.log(`Length: ${formula.length} characters\n`)

try {
	const compiled = compiler(formula)

	console.log("Compilation: SUCCESS")
	console.log("-".repeat(80))

	console.log("\nEnriched AST:")
	console.log(JSON.stringify(compiled.ast, null, 2))

	console.log("\n" + "-".repeat(80))
	console.log("METADATA")
	console.log("-".repeat(80))

	console.log("\nVariables:")
	if (compiled.metadata.variables.size === 0) {
		console.log("  (none)")
	} else {
		compiled.metadata.variables.forEach((varMeta) => {
			console.log(
				`  ${varMeta.name}: ${varMeta.datatype} (positions: ${
					varMeta.positions.join(", ")
				})`,
			)
		})
	}

	console.log("\nConstants:")
	if (compiled.metadata.constants.size === 0) {
		console.log("  (none)")
	} else {
		compiled.metadata.constants.forEach((constMeta) => {
			console.log(
				`  ${constMeta.name} = ${constMeta.value} (${constMeta.datatype})`,
			)
		})
	}

	console.log("\nFunctions:")
	if (compiled.metadata.functions.size === 0) {
		console.log("  (none)")
	} else {
		compiled.metadata.functions.forEach((funcMeta) => {
			console.log(
				`  ${funcMeta.name}(${funcMeta.arity} args) → ${funcMeta.returnDatatype}`,
			)
		})
	}

	console.log("\nOutput Datatype:", compiled.metadata.outputDatatype)
	console.log()
} catch (error) {
	console.log("Compilation: ERROR")
	console.log("-".repeat(80))
	console.log(`\nError: ${error.message}\n`)
}

console.log("=".repeat(80) + "\n")
