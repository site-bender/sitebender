import type { Element } from "../"
import type { MediaType } from "../../../media/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
	ReferrerPolicy,
} from "../../shared"

// Remove deprecated attributes
// Make all attributes optional
// Force tagName to "A"
// Overrides attributes with more specific types
export interface AnchorElement {
	attributes?: Override<
		Omit<
			Partial<HTMLAnchorElement>,
			"charset" | "coords" | "name" | "relList" | "rev" // deprecated
		>,
		GlobalAttributeOverrides & {
			// narrowed types
			referrerpolicy?: ReferrerPolicy
			rel?: AnchorRel
			role?: AnchorRole
			target?: AnchorTarget
			type?: MediaType
		}
	>
	// TODO: transparent with no interactive and no tabindex
	children?: Array<Element>
	dataset?: Dataset
	readonly tagName: "A"
}

export type AnchorRel =
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

export type AnchorRole = Extract<
	AriaRole,
	| "button"
	| "checkbox"
	| "menuitem"
	| "menuitemcheckbox"
	| "option"
	| "radio"
	| "switch"
	| "tab"
	| "treeitem"
>

export type AnchorTarget =
	| "_blank"
	| "_parent"
	| "_self"
	| "_top"
	| "_unfencedTop"
