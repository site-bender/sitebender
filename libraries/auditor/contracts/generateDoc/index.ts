import generateContractDoc from "../../../contracts/generateContractDoc/index.ts"
//++ Generates Auditor contract documentation using shared generator

import contract from "../contract.json" with { type: "json" }

export default function generateAuditorDoc(): string {
	return generateContractDoc(contract)
}

// If run directly, generate the markdown file
if (import.meta.main) {
	const markdown = generateAuditorDoc()
	await Deno.writeTextFile(
		"libraries/auditor/contracts/contract.md",
		markdown,
	)
	console.log("✅ Generated Auditor contract documentation")
}
