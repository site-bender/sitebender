import type { MediaType } from "../../media"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { FlowContent } from "../categories/flow"

export interface ObjectElement {
	attributes?: Override<
		Omit<
			Partial<HTMLObjectElement>,
			| "align"
			| "archive"
			| "border"
			| "code"
			| "codeBase"
			| "codeType"
			| "declare"
			| "hspace"
			| "standby"
			| "useMap"
			| "vspace"
		>,
		GlobalAttributeOverrides & {
			form?: string
			role?: Extract<AriaRole, "application" | "document" | "img">
			type?: MediaType
		}
	>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "OBJECT"
}
