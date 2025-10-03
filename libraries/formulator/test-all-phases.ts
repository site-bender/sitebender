#!/usr/bin/env -S deno run --unstable-temporal --no-check

import lexer from "./src/lexer/index.ts"
import tokenizer from "./src/tokenizer/index.ts"
import parser from "./src/parser/index.ts"
import compiler from "./src/compiler/index.ts"

//++ Demo script showing all phases of formula processing

const formula = Deno.args[0] || "sin(π / 2) + cos(x)"

console.log("\n" + "=".repeat(80))
console.log("FORMULATOR - ALL PHASES DEMO")
console.log("=".repeat(80))
console.log(`\nInput Formula: "${formula}"`)
console.log(`Length: ${formula.length} characters\n`)

// PHASE 1: LEXER
console.log("=".repeat(80))
console.log("PHASE 1: LEXER (Character Classification)")
console.log("=".repeat(80))
console.log("\nClassifies each character into categories:\n")

const lexemesGenerator = lexer(formula)
const lexemes = Array.from(lexemesGenerator)
const lexemeTable = lexemes.map((lexeme) => ({
	position: lexeme.position,
	character: lexeme.character,
	class: lexeme.characterClass,
}))

console.table(lexemeTable)

// PHASE 2: TOKENIZER
console.log("\n" + "=".repeat(80))
console.log("PHASE 2: TOKENIZER (Token Recognition)")
console.log("=".repeat(80))
console.log("\nGroups lexemes into meaningful tokens:\n")

const tokensGenerator = tokenizer(formula)
const tokenResults = Array.from(tokensGenerator)

// Check for tokenizer errors
const tokenError = tokenResults.find((result) => result._tag === "Error")
if (tokenError && tokenError._tag === "Error") {
	console.error(`Tokenizer error: ${tokenError.error}`)
	Deno.exit(1)
}

const tokens = tokenResults
	.filter((result) => result._tag === "Ok")
	.map((result) => result._tag === "Ok" ? result.value : null)
	.filter((token) => token !== null)

const tokenTable = tokens.map((token) => ({
	position: token.position,
	type: token.type,
	value: token.value,
}))

console.table(tokenTable)

// PHASE 3: PARSER
console.log("\n" + "=".repeat(80))
console.log("PHASE 3: PARSER (AST Construction)")
console.log("=".repeat(80))
console.log("\nBuilds Abstract Syntax Tree with operator precedence:\n")

const parseResult = parser(formula)

if (parseResult._tag === "Error") {
	console.error(`Parser error: ${parseResult.error}`)
	Deno.exit(1)
}

const ast = parseResult.value
console.log(JSON.stringify(ast, null, 2))

// PHASE 4: COMPILER
console.log("\n" + "=".repeat(80))
console.log("PHASE 4: COMPILER (Enriched AST + Metadata)")
console.log("=".repeat(80))
console.log("\nEnriches AST with datatypes and extracts metadata:\n")

try {
	const compiled = compiler(formula)

	console.log("Enriched AST:")
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
} catch (error) {
	console.error(`Compiler error: ${error.message}`)
	Deno.exit(1)
}

console.log("\n" + "=".repeat(80))
console.log("✓ ALL PHASES COMPLETED SUCCESSFULLY")
console.log("=".repeat(80) + "\n")
