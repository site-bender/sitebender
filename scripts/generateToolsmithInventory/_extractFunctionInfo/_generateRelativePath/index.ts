import replace from "@sitebender/toolsmith/string/replace/index.ts"
import { relative } from "https://deno.land/std@0.208.0/path/mod.ts"

import { MATCH_TS_EXTENSION } from "../../constants/index.ts"

/**
 * Generate relative import path from file path
 */
export default function _generateRelativePath(filePath: string): string {
	const relativePath = relative(".", filePath)

	return replace(MATCH_TS_EXTENSION)(".ts")(relativePath)
}
