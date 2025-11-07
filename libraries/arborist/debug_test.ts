import extractNamedBindings from "./src/_extractNamedBindings/index.ts"

const specifiers = [
	{
		type: "ImportSpecifier",
		imported: {
			type: "Identifier",
			value: "myFunction",
		},
		local: {
			type: "Identifier",
			value: "myFunction",
		},
		isTypeOnly: false,
	},
]

const result = extractNamedBindings(specifiers)(false)

console.log("Result type:", typeof result)
console.log("Result:", result)
console.log("Result _tag:", result?._tag)
console.log("Result value:", result?.value)

if (result && result._tag === "error") {
	console.log("Error:", JSON.stringify(result.error, null, 2))
	console.log("Error kind:", result.error.kind)
	console.log("Error message:", result.error.message)
} else if (result && result._tag === "ok") {
	console.log("Value:", JSON.stringify(result.value, null, 2))
} else {
	console.log("UNEXPECTED: Result is not a valid Result monad!")
