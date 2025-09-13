import type { JsonValue } from "../types/index.ts"

import join from "../../../libraries/toolkit/src/vanilla/array/join/index.ts"
import map from "../../../libraries/toolkit/src/vanilla/array/map/index.ts"
import concat from "../../../libraries/toolkit/src/vanilla/string/concat/index.ts"
import formatJsonValue from "../formatJsonValue/index.ts"
import formatKey from "../formatKey/index.ts"

//++ Formats metadata entries into a markdown block
export default function formatMetadata(metadata: Array<[string, JsonValue]>): string {
	const formatEntry = ([key, value]: [string, JsonValue]) => {
		const formattedKey = formatKey(key)
		const formattedValue = formatJsonValue(0)(value)
		
		return concat("**")(concat(formattedKey)(concat("**: ")(formattedValue)))
	}
	
	const lines = map(formatEntry)(metadata)
	const joined = join("  \n")(lines)
	
	return concat(joined)("\n")
}

//?? [EXAMPLE]
// formatMetadata([["version", "1.0"]]) // "**Version**: 1.0\n"