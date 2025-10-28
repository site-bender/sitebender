import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"

export interface BaseElement {
	attributes?: Override<
		Partial<HTMLBaseElement>,
		GlobalAttributeOverrides & {
			href: string
			target?: BaseTarget
		}
	>
	dataset?: Dataset
	readonly tagName: "BASE"
}

export type BaseTarget = "_blank" | "_parent" | "_self" | "_top"
