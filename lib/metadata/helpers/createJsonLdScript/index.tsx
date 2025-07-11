import type { JsonObject } from "./JsonValue/index.ts"

import cleanObject from "./cleanObject/index.ts"

export default function createJsonLdScript(
	data: JsonObject | null,
): JSX.Element | null {
	if (!data) return null

	const cleanData = cleanObject(data)

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(cleanData, null, 2),
			}}
		/>
	)
}
