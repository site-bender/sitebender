import type { DiscriminatedUnionConfig } from "../types.ts"

export default {
	name: "AsyncState",
	targetFolder: ".claude/skills/type-definition/examples",
	description: "Represents the state of an asynchronous operation",
	tagCase: "lowercase",
	variants: [
		{
			name: "Loading",
			properties: [],
		},
		{
			name: "Loaded",
			properties: [
				{ name: "data", type: "T" },
			],
		},
		{
			name: "Failed",
			properties: [
				{ name: "error", type: "string" },
			],
		},
	],
} satisfies DiscriminatedUnionConfig
