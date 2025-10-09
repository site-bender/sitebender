#!/usr/bin/env -S deno run

import lexer from "./src/lexer/index.ts"

//++ Test script for Formulator lexer - run with: deno run test-lexer.ts "your formula here"

const formula = Deno.args[0] || "2 * π + α²"

console.log("\n" + "=".repeat(80))
console.log("FORMULATOR LEXER TEST")
console.log("=".repeat(80))
console.log(`\nInput: "${formula}"`)
console.log(`Length: ${formula.length} characters\n`)

const tokens = Array.from(lexer(formula))

console.log("Lexer Output:")
console.log("-".repeat(80))

tokens.forEach((token, i) => {
	const charDisplay = token.character === " "
		? "␣"
		: token.character === "\t"
		? "⇥"
		: token.character === "\n"
		? "⏎"
		: token.character

	const classInfo = "character" in token.characterClass
		? `${token.characterClass._tag}('${token.characterClass.character}')`
		: token.characterClass._tag

	console.log(
		`[${i.toString().padStart(3)}] pos=${
			token.position.toString().padStart(3)
		} ` +
			`char='${charDisplay}' (U+${
				token.character.charCodeAt(0).toString(16).toUpperCase().padStart(
					4,
					"0",
				)
			}) ` +
			`→ ${classInfo}`,
	)
})

console.log("-".repeat(80))
console.log(`\nTotal tokens: ${tokens.length}`)
console.log(
	`Character classes: ${
		Array.from(new Set(tokens.map((t) => t.characterClass._tag))).join(", ")
	}\n`,
)

// Statistics
const stats = tokens.reduce(
	(acc, token) => {
		acc[token.characterClass._tag] = (acc[token.characterClass._tag] || 0) + 1
		return acc
	},
	{} as Record<string, number>,
)

console.log("Statistics:")
Object.entries(stats)
	.sort((a, b) => b[1] - a[1])
	.forEach(([type, count]) => {
		console.log(`  ${type.padEnd(15)}: ${count}`)
	})

console.log("\n" + "=".repeat(80) + "\n")
