//++ Returns forbidden import patterns for a specific library

export default function getForbiddenPatterns(
	library: string,
): Array<{ regex: RegExp; description: string }> {
	const patterns: Record<
		string,
		Array<{ regex: RegExp; description: string }>
	> = {
		envoy: [
			{
				regex: /from ['"]typescript['"]/,
				description: "Direct TypeScript import",
			},
			{
				regex: /from ['"]@typescript/,
				description: "Direct @typescript import",
			},
			{
				regex: /from ['"].*\.tsx?['"]/,
				description: "Direct source file import",
			},
			{ regex: /from ['"].*prover/, description: "Importing from prover" },
		],
		prover: [
			{
				regex: /from ['"]typescript['"]/,
				description: "Direct TypeScript import",
			},
			{ regex: /from ['"].*envoy/, description: "Importing from envoy" },
		],
		toolkit: [
			{
				regex: /from ['"]@sitebender\//,
				description: "Toolkit importing other libraries",
			},
		],
		foundry: [
			{
				regex: /from ['"]@sitebender\//,
				description: "Foundry importing other libraries",
			},
		],
	}

	return patterns[library] || []
}