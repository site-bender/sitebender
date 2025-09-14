import { IMPORT_SPECIFIER_AS_REGEX } from "../../../constants/index.ts"
import type { ImportSpec } from "../../types/index.ts"

//++ Parses a single import specifier with "as" renaming into an ImportSpec
export default function parseSpecifier(segment: string): ImportSpec | null {
	const matchResult = segment.match(IMPORT_SPECIFIER_AS_REGEX)
	if (!matchResult) return null

	return {
		original: segment,
		symbol: matchResult[1],
		component: matchResult[2],
	}
}

//?? [EXAMPLE]
// parseSpecifier("Person as PersonComponent")
// Returns: { original: "Person as PersonComponent", symbol: "Person", component: "PersonComponent" }
// parseSpecifier("invalidInput")
// Returns: null