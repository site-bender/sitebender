import type { MediaType } from "../../../media/index.ts"
import type {
	CrossOrigin,
	Dataset,
	FetchPriority,
	GlobalAttributeOverrides,
	Override,
	ReferrerPolicy,
} from "../../shared"

// TODO: Make flow and phrasing if itemprop present
export interface LinkElement {
	attributes?: Override<
		Omit<Partial<HTMLLinkElement>, "charset" | "rev" | "target">,
		GlobalAttributeOverrides & {
			crossOrigin?: CrossOrigin
			fetchPriority?: FetchPriority
			referrerPolicy?: LinkReferrerPolicy
			type?: MediaType
		}
	>
	dataset?: Dataset
	readonly tagName: "LINK"
}

export type LinkReferrerPolicy = Extract<
	ReferrerPolicy,
	| "no-referrer"
	| "no-referrer-when-downgrade"
	| "origin"
	| "origin-when-cross-origin"
	| "unsafe-url"
>
