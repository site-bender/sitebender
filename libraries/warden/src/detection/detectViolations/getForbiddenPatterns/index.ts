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
			{ regex: /from ['"].*logician/, description: "Importing from logician" },
		],
		logician: [
			{
				regex: /from ['"]typescript['"]/,
				description: "Direct TypeScript import",
			},
			{ regex: /from ['"].*envoy/, description: "Importing from envoy" },
		],
		toolsmith: [
			{
				regex: /from ['"]@sitebender\//,
				description: "Toolsmith importing other libraries",
			},
		],
		quarrier: [
			{
				regex: /from ['"]@sitebender\//,
				description: "Quarrier importing other libraries",
			},
		],
	}

	return patterns[library] || []
}
