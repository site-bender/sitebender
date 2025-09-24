import type { JsonObject, JsonValue } from "../types/index.ts"

import filter from "../../../libraries/toolsmith/src/vanilla/array/filter/index.ts"
import entries from "../../../libraries/toolsmith/src/vanilla/object/entries/index.ts"
import isMetadataKey from "../isMetadataKey/index.ts"

//++ Extracts metadata fields from a JSON object
export default function extractMetadata(
	data: JsonObject,
): Array<[string, JsonValue]> {
	const dataEntries = entries(data)
	const isMetadata = ([key]: [string, JsonValue]) => isMetadataKey(key)

	return filter(isMetadata)(dataEntries)
}

//?? [EXAMPLE]
// extractMetadata({version: "1.0", other: "data"}) // [["version", "1.0"]]
