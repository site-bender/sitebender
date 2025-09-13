import type { JsonValue } from "../../types/index.ts"

import pipe from "../../../../libraries/toolkit/src/vanilla/combinator/pipe/index.ts"
import concat from "../../../../libraries/toolkit/src/vanilla/string/concat/index.ts"
import concatTo from "../../../../libraries/toolkit/src/vanilla/string/concatTo/index.ts"
import formatJsonValue from "../../formatJsonValue/index.ts"
import formatKey from "../../formatKey/index.ts"

//++ Formats a metadata entry as markdown with bold key
export default function formatMetadataEntry([key, value]: [string, JsonValue]): string {
	const formattedKey = formatKey(key)
	const formattedValue = formatJsonValue(0)(value)
	
	return pipe([
		concat("**"),
		concatTo("**: "),
		concatTo(formattedValue),
	])(formattedKey)
}

//?? [EXAMPLE]
// formatMetadataEntry(["version", "1.0"]) // "**Version**: 1.0"