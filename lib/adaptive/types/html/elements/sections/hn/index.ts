import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { PhrasingContent } from "../categories/phrasing"

export interface Heading1Element {
	attributes?: Override<
		Partial<HeadingAttributes>,
		GlobalAttributeOverrides & {
			role?: HeadingRole
		}
	>
	children?: Array<PhrasingContent>
	dataset?: Dataset
	readonly tagName: "H1"
}

export interface Heading2Element {
	attributes?: Override<
		Partial<HeadingAttributes>,
		GlobalAttributeOverrides & {
			role?: HeadingRole
		}
	>
	children?: Array<PhrasingContent>
	dataset?: Dataset
	readonly tagName: "H2"
}

export interface Heading3Element {
	attributes?: Override<
		Partial<HeadingAttributes>,
		GlobalAttributeOverrides & {
			role?: HeadingRole
		}
	>
	children?: Array<PhrasingContent>
	dataset?: Dataset
	readonly tagName: "H3"
}

export interface Heading4Element {
	attributes?: Override<
		Partial<HeadingAttributes>,
		GlobalAttributeOverrides & {
			role?: HeadingRole
		}
	>
	children?: Array<PhrasingContent>
	dataset?: Dataset
	readonly tagName: "H4"
}

export interface Heading5Element {
	attributes?: Override<
		Partial<HeadingAttributes>,
		GlobalAttributeOverrides & {
			role?: HeadingRole
		}
	>
	children?: Array<PhrasingContent>
	dataset?: Dataset
	readonly tagName: "H5"
}

export interface Heading6Element {
	attributes?: Override<
		Partial<HeadingAttributes>,
		GlobalAttributeOverrides & {
			role?: HeadingRole
		}
	>
	children?: Array<PhrasingContent>
	dataset?: Dataset
	readonly tagName: "H6"
}

export interface HeadingElement {
	attributes?: Override<
		Partial<HeadingAttributes>,
		GlobalAttributeOverrides & {
			role?: HeadingRole
		}
	>
	children?: Array<PhrasingContent>
	dataset?: Dataset
	readonly tagName: "HN"
}

export type HeadingAttributes = Omit<HTMLHeadingElement, "align">

export type HeadingRole = Extract<
	AriaRole,
	"heading" | "none" | "presentation" | "tab"
>
