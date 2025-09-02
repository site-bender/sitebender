import type {
	AriaRole,
	CrossOrigin,
	Dataset,
	Decoding,
	FetchPriority,
	GlobalAttributeOverrides,
	Override,
	ReferrerPolicy,
} from "../../shared"

export interface ImageElement {
	attributes?: Override<
		Omit<
			Partial<HTMLImageElement>,
			"border" | "hspace" | "longDesc" | "lowsrc" | "name" | "vspace"
		>,
		// TODO: narrow types
		& GlobalAttributeOverrides
		& {
			crossOrigin?: CrossOrigin
			decoding?: Decoding
			fetchPriority?: FetchPriority
			referrerPolicy?: ReferrerPolicy
		}
		& (
			| {
				alt: string
				role?: Extract<
					AriaRole,
					| "button"
					| "checkbox"
					| "link"
					| "menuitem"
					| "menuitemcheckbox"
					| "menuitemradio"
					| "option"
					| "progressbar"
					| "scrollbar"
					| "separator"
					| "slider"
					| "switch"
					| "tab"
					| "treeitem"
				>
			}
			| {
				alt: ""
				role?: Extract<AriaRole, "none" | "presentation">
			}
		)
	>
	children?: never
	dataset?: Dataset
	readonly tagName: "IMG"
}
