import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { HeadingContent } from "../categories/heading"
import type { ParagraphElement } from "../grouping/p"

export interface HeadingGroupElement {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	children?: Array<HeadingGroupContent>
	dataset?: Dataset
	readonly tagName: "HGROUP"
}

export type HeadingOnlyElement = Exclude<
	HeadingContent,
	{ tagName: "HGROUP" }
>

export type HeadingGroupContent =
	| [Array<ParagraphElement>, HeadingOnlyElement, Array<ParagraphElement>]
	| [Array<ParagraphElement>, HeadingOnlyElement]
	| [HeadingOnlyElement, Array<ParagraphElement>]
	| HeadingOnlyElement
