import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { FlowContent } from "../categories/flow"

export interface ListItemElement {
	attributes?: Override<
		Omit<Partial<HTMLLIElement>, "type">,
		GlobalAttributeOverrides & {
			role?: Extract<
				AriaRole,
				| "menuitem"
				| "menuitemcheckbox"
				| "menuitemradio"
				| "option"
				| "none"
				| "presentation"
				| "radio"
				| "separator"
				| "tab"
				| "treeitem"
			>
		}
	>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "LI"
}
