import type {
	Autocapitalize,
	Autocomplete,
	Dataset,
	GlobalAttributeOverrides,
	Override,
	Spellcheck,
} from "../../shared"
import type { TextNode } from "../text-node"

export interface TextAreaElement {
	attributes?: Override<
		Partial<HTMLTextAreaElement>,
		GlobalAttributeOverrides & {
			autocapitalize?: Autocapitalize
			autocomplete?: Autocomplete
			autofocus?: boolean
			form?: string
			spellcheck?: Spellcheck
			wrap?: "hard" | "soft"
		}
	>
	children?: Array<TextNode>
	dataset?: Dataset
	readonly tagName: "TEXTAREA"
}
