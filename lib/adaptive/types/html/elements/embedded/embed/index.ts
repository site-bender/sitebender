import type { MediaType } from "../../media"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

export interface EmbedElement {
	attributes?: Override<
		Omit<Partial<HTMLEmbedElement>, "align" | "name">,
		GlobalAttributeOverrides & {
			role?: Extract<
				AriaRole,
				"application" | "document" | "img" | "none" | "presentation"
			>
			type?: MediaType
		}
	>
	children?: never
	dataset?: Dataset
	readonly tagName: "EMBED"
}
