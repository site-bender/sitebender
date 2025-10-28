import type { MetadataContent } from "../../categories/metadata/index.ts"
import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"

export interface HeadElement {
	attributes?: Override<Partial<HTMLHeadElement>, GlobalAttributeOverrides>
	children?: Array<HeadContent>
	dataset?: Dataset
	readonly tagName: "HEAD"
}

export type HeadContent = Exclude<MetadataContent, { tagName: "HEAD" }>
