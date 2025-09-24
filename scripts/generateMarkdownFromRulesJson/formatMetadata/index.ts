import type { JsonValue } from "../types/index.ts"

import join from "../../../libraries/toolsmith/src/vanilla/array/join/index.ts"
import map from "../../../libraries/toolsmith/src/vanilla/array/map/index.ts"
import pipe from "../../../libraries/toolsmith/src/vanilla/combinator/pipe/index.ts"
import concatTo from "../../../libraries/toolsmith/src/vanilla/string/concatTo/index.ts"
import formatMetadataEntry from "./formatMetadataEntry/index.ts"

//++ Formats metadata entries into a markdown block
export default function formatMetadata(
	metadata: Array<[string, JsonValue]>,
): string {
	return pipe([
		map(formatMetadataEntry),
		join("  \n"),
		concatTo("\n"),
	])(metadata)
}

//?? [EXAMPLE]
// formatMetadata([["version", "1.0"]]) // "**Version**: 1.0\n"
