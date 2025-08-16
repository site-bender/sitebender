import type { MediaType } from "../../../media/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Loading,
	Override,
	ReferrerPolicy,
} from "../../shared"

export interface IFrameElement {
	attributes?: Override<
		Omit<
			Partial<HTMLIFrameElement>,
			| "align"
			| "frameBorder"
			| "longDesc"
			| "marginHeight"
			| "marginWidth"
			| "scrolling"
		>,
		GlobalAttributeOverrides & {
			loading?: Loading
			referrerPolicy?: ReferrerPolicy
			role?: Extract<
				AriaRole,
				"application" | "document" | "img" | "none" | "presentation"
			>
			type?: MediaType
		}
	>
	children?: never
	dataset?: Dataset
	readonly tagName: "IFRAME"
}
