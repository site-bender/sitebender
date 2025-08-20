import type {
	Dataset,
	GlobalAttributeOverrides,
	HttpEquiv,
	Override,
} from "../../shared"

// TODO: Make flow and phrasing if itemprop present
export interface MetaElement {
	attributes?: Override<
		Omit<Partial<HTMLMetaElement>, "scheme">,
		GlobalAttributeOverrides & {
			charset?: "utf-8"
			httpEquiv?: HttpEquiv
		}
	>
	dataset?: Dataset
	readonly tagName: "META"
}
