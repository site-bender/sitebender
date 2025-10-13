import type { JsonObject, JsonValue } from "../types/index.ts"

import filter from "../../../libraries/toolsmith/src/array/filter/index.ts"
import join from "../../../libraries/toolsmith/src/array/join/index.ts"
import map from "../../../libraries/toolsmith/src/array/map/index.ts"
import entries from "../../../libraries/toolsmith/src/object/entries/index.ts"
import concat from "../../../libraries/toolsmith/src/string/concat/index.ts"
import isEmpty from "../../../libraries/toolsmith/src/validation/isEmpty/index.ts"
import extractMetadata from "../extractMetadata/index.ts"
import formatMetadata from "../formatMetadata/index.ts"
import isMetadataKey from "../isMetadataKey/index.ts"
import formatSection from "./formatSection/index.ts"

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

	const sections = map(formatSection(level))(regularEntries)
	const joinedSections = join("\n")(sections)

	return concat(metadataSection)(joinedSections)
}

//?? [EXAMPLE]
// parseJsonToMarkdown({version: "1.0", primeDirective: {...}})
// Returns metadata block followed by "## Prime directive" section
