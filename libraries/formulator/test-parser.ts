#!/usr/bin/env -S deno run --unstable-temporal

import parser from "./src/parser/index.ts"

//++ Test script for Formulator parser - run with: deno run --unstable-temporal test-parser.ts "your formula"

const formula = Deno.args[0] || "2 + 3 * 4"

console.log("\n" + "=".repeat(80))
console.log("FORMULATOR PARSER TEST")
console.log("=".repeat(80))
console.log(`\nInput: "${formula}"`)
console.log(`Length: ${formula.length} characters\n`)

const result = parser(formula)

if (result._tag === "Ok") {
	console.log("Parser Result: SUCCESS")
	console.log("-".repeat(80))
	console.log("\nAbstract Syntax Tree:")
	console.log(JSON.stringify(result.value, null, 2))
	console.log()
} else {
	console.log("Parser Result: ERROR")
	console.log("-".repeat(80))
	console.log(`\nError: ${result.error}\n`)
}

console.log("=".repeat(80) + "\n")
