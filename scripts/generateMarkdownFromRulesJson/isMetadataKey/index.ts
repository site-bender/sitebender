import includes from "../../../libraries/toolsmith/src/array/includes/index.ts"
import { METADATA_KEYS } from "../constants/index.ts"

//++ Checks if a key is a metadata key
export default function isMetadataKey(key: string): boolean {
	return includes(key)(METADATA_KEYS)
}

//?? [EXAMPLE]
// isMetadataKey("version") // true
// isMetadataKey("primeDirective") // false
