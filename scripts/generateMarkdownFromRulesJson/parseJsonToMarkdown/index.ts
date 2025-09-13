import type { JsonObject, JsonValue } from "../types/index.ts"

import filter from "../../../libraries/toolkit/src/vanilla/array/filter/index.ts"
import join from "../../../libraries/toolkit/src/vanilla/array/join/index.ts"
import map from "../../../libraries/toolkit/src/vanilla/array/map/index.ts"
import entries from "../../../libraries/toolkit/src/vanilla/object/entries/index.ts"
import concat from "../../../libraries/toolkit/src/vanilla/string/concat/index.ts"
import repeat from "../../../libraries/toolkit/src/vanilla/string/repeat/index.ts"
import isEmpty from "../../../libraries/toolkit/src/vanilla/validation/isEmpty/index.ts"
import extractMetadata from "../extractMetadata/index.ts"
import formatJsonValue from "../formatJsonValue/index.ts"
import formatKey from "../formatKey/index.ts"
import formatMetadata from "../formatMetadata/index.ts"
import isMetadataKey from "../isMetadataKey/index.ts"

//++ Parses JSON data into markdown sections
export default function parseJsonToMarkdown(
	data: JsonObject,
	level: number = 2,
): string {
	const metadata = extractMetadata(data)
	const metadataSection = isEmpty(metadata) ? "" : formatMetadata(metadata)

	const dataEntries = entries(data)
	const isNotMetadata = ([key]: [string, JsonValue]) => !isMetadataKey(key)
	const regularEntries = filter(isNotMetadata)(dataEntries)

	const formatSection = ([key, value]: [string, JsonValue]) => {
		const title = formatKey(key)
		const heading = concat(repeat("#")(level))(concat(" ")(title))
		const content = formatJsonValue(0)(value)

		return concat(heading)(concat("\n\n")(concat(content)("\n")))
	}

	const sections = map(formatSection)(regularEntries)
	const joinedSections = join("\n")(sections)

	return concat(metadataSection)(joinedSections)
}

//?? [EXAMPLE]
// parseJsonToMarkdown({version: "1.0", primeDirective: {...}})
// Returns metadata block followed by "## Prime directive" section
