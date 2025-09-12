import generateContractDoc from "../../../contracts/generateContractDoc/index.ts"
//++ Generates Parser contract documentation using shared generator

import contract from "../contract.json" with { type: "json" }

export default function generateParserDoc(): string {
	return generateContractDoc(contract)
}

// If run directly, generate the markdown file
if (import.meta.main) {
	const markdown = generateParserDoc()
	await Deno.writeTextFile(
		"libraries/parser/contracts/contract.md",
		markdown,
	)
	console.log("✅ Generated Parser contract documentation")
}
