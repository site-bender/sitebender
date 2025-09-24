import { TARGET_PREFIXES } from "../constants/index.ts"

//++ Checks if an import specifier needs rewriting from deep path to relative
export default function needsRewrite(spec: string): string | null {
	//-- [REFACTOR] For loop should be replaced with functional approach
	for (const p of TARGET_PREFIXES) {
		if (spec.startsWith(p)) return p
	}

	return null
}

//?? [EXAMPLE]
// needsRewrite("libraries/toolsmith/src/utils") // Returns: "libraries/toolsmith/src/"
// needsRewrite("./local/path") // Returns: null
// needsRewrite("@external/package") // Returns: null
