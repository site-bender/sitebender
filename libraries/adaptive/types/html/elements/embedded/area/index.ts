import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
	ReferrerPolicy,
} from "../../shared"

export interface AreaElement {
	attributes?: Override<
		Omit<Partial<HTMLAreaElement>, "noHref">,
		& GlobalAttributeOverrides
		& {
			referrerPolicy?: ReferrerPolicy
			rel?: AreaRel
			target?: AreaTarget
		}
		& (
			| {
				coords: string
				shape: "circle" | "poly" | "rect"
			}
			| {
				coords: never
				shape: "default"
			}
		)
	>
	children?: never
	dataset?: Dataset
	readonly tagName: "AREA"
}

export type AreaTarget = "_blank" | "_parent" | "_self" | "_top"

export type AreaRel =
	| "alternate"
	| "author"
	| "bookmark"
	| "external"
	| "help"
	| "license"
	| "me"
	| "next"
	| "nofollow"
	| "noopener"
	| "noreferrer"
	| "opener"
	| "prev"
	| "privacy-policy"
	| "search"
	| "tag"
	| "terms-of-service"
