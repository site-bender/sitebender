import type { RulesFile } from "../../types/index.ts"

import replace from "../../../../libraries/toolsmith/src/vanilla/string/replace/index.ts"

//++ Converts a location string to a RulesFile object if the file exists
export default function toRulesFile(
	location: string,
	projectRoot: string,
): RulesFile | null {
	const fullPath = `${projectRoot}/${location}`

	try {
		Deno.statSync(fullPath)

		return {
			path: replace("/index.json")("")(fullPath),
			jsonPath: fullPath,
			markdownPath: replace(".json")(".md")(fullPath),
		}
	} catch {
		return null
	}
}

//?? [EXAMPLE]
// toRulesFile("rules/index.json", "/path/to/project")
// Returns: { path: "/path/to/project/rules", jsonPath: "/path/to/project/rules/index.json", markdownPath: "/path/to/project/rules/index.md" }
// Or null if file doesn't exist
