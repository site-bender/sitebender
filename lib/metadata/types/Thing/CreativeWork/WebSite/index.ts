import type { Text } from "../../../DataType/index.ts"
import type { CreativeWork } from "../index.ts"

// WebSite interface - extends CreativeWork
// A WebSite is a set of related web pages and other items typically served from a single web domain and accessible via URLs.
export interface WebSite extends CreativeWork {
	issn?: Text
}
