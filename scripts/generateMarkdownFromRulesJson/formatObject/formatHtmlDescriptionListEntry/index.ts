import pipe from "../../../../libraries/toolsmith/src/vanilla/combinator/pipe/index.ts"
import concat from "../../../../libraries/toolsmith/src/vanilla/string/concat/index.ts"
import concatTo from "../../../../libraries/toolsmith/src/vanilla/string/concatTo/index.ts"
import formatKey from "../../formatKey/index.ts"

//++ Formats a key-value pair as an HTML description list entry
export default function formatHtmlDescriptionListEntry(
	[key, value]: [string, string],
): string {
	const formattedKey = formatKey(key)
	const ddContent = concat("<dd>")(concat(value)("</dd>\n</div>"))

	return pipe([
		concat("<dt><strong>"),
		concatTo("</strong></dt>\n"),
		concat("<div>\n"),
		concatTo(ddContent),
	])(formattedKey)
}

//?? [EXAMPLE]
// formatHtmlDescriptionListEntry(["name", "Test"])
// Returns: "<div>\n<dt><strong>Name</strong></dt>\n<dd>Test</dd>\n</div>"
