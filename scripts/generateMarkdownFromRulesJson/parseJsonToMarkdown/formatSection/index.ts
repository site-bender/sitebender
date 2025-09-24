import type { JsonValue } from "../../types/index.ts"

import concat from "../../../../libraries/toolsmith/src/vanilla/string/concat/index.ts"
import repeat from "../../../../libraries/toolsmith/src/vanilla/string/repeat/index.ts"
import formatJsonValue from "../../formatJsonValue/index.ts"
import formatKey from "../../formatKey/index.ts"

//++ Formats a section with heading and content
export default function formatSection(level: number) {
	return function format([key, value]: [string, JsonValue]): string {
		const title = formatKey(key)
		const heading = concat(repeat("#")(level))(concat(" ")(title))
		const content = formatJsonValue(0)(value)

		return concat(heading)(concat("\n\n")(concat(content)("\n")))
	}
}

//?? [EXAMPLE]
// const formatter = formatSection(2)
// formatter(["primeDirective", {rule: "Don't assume"}])
// Returns: "## Prime directive\n\n{formatted content}\n"
