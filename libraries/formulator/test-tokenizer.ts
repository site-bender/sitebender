import tokenizer from "./src/tokenizer/index.ts"

const input = Deno.args[0] || "2 + 3 * alpha"

console.log("=".repeat(80))
console.log("FORMULATOR TOKENIZER TEST")
console.log("=".repeat(80))
console.log()
console.log(`Input: "${input}"`)
console.log(`Length: ${input.length} characters`)
console.log()

const tokens = Array.from(tokenizer(input))

console.log("Tokenizer Output:")
console.log("-".repeat(80))

tokens.forEach((result, index) => {
	if (result._tag === "Ok") {
		const token = result.value
		const typeStr = token.type.padEnd(12)
		const valueStr = token.value.padEnd(10)
		const posStr = `pos=${token.position.toString().padStart(2)}`
		console.log(
			`[${
				index.toString().padStart(2)
			}] ${posStr} type=${typeStr} value="${valueStr}"`,
		)
	} else {
		console.log(`[${index.toString().padStart(2)}] ERROR: ${result.error}`)
	}
})

console.log("-".repeat(80))
console.log()
console.log(`Total tokens: ${tokens.length}`)

const successCount = tokens.filter((r) => r._tag === "Ok").length
const errorCount = tokens.filter((r) => r._tag === "Error").length

console.log(`Success: ${successCount}`)
console.log(`Errors: ${errorCount}`)

if (successCount > 0) {
	const tokenTypes = new Set<string>()
	tokens.forEach((result) => {
		if (result._tag === "Ok") {
			tokenTypes.add(result.value.type)
		}
	})

	console.log()
	console.log(`Token types: ${Array.from(tokenTypes).sort().join(", ")}`)
}

console.log()
console.log("=".repeat(80))
