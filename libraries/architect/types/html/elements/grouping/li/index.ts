import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

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
