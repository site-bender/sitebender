import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { MetadataContent } from "../categories/metadata"

export interface HeadElement {
	attributes?: Override<Partial<HTMLHeadElement>, GlobalAttributeOverrides>
	children?: Array<HeadContent>
	dataset?: Dataset
	readonly tagName: "HEAD"
}

export type HeadContent = Exclude<MetadataContent, { tagName: "HEAD" }>
