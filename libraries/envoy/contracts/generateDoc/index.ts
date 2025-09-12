import generateContractDoc from "../../../contracts/generateContractDoc/index.ts"
//++ Generates Envoy contract documentation using shared generator

import contract from "../contract.json" with { type: "json" }

export default function generateEnvoyDoc(): string {
	return generateContractDoc(contract)
}

// If run directly, generate the markdown file
if (import.meta.main) {
	const markdown = generateEnvoyDoc()
	await Deno.writeTextFile(
		"libraries/envoy/contracts/contract.md",
		markdown,
	)
	console.log("✅ Generated Envoy contract documentation")
}
