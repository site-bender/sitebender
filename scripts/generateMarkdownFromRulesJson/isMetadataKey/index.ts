//++ Checks if a key is a metadata key

import includes from "../../../libraries/toolkit/src/vanilla/array/includes/index.ts"

const METADATA_KEYS = [
	"version",
	"lastUpdated",
	"author",
	"scope",
	"description",
	"inherits",
]

export default function isMetadataKey(key: string): boolean {
	return includes(key)(METADATA_KEYS)
}

//?? [EXAMPLE]
// isMetadataKey("version") // true
// isMetadataKey("primeDirective") // false
