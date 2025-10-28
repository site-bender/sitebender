import type { ScriptElement } from "../../scripting/script/index.ts"
import type { TemplateElement } from "../../scripting/template/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	ListType,
	Override,
} from "../../shared"
import type { ListItemElement } from "../li/index.ts"

export interface OrderedListElement {
	attributes?: Override<
		Omit<Partial<HTMLOListElement>, "compact">,
		GlobalAttributeOverrides & {
			role?: Extract<
				AriaRole,
				| "directory"
				| "group"
				| "listbox"
				| "menu"
				| "menubar"
				| "none"
				| "presentation"
				| "radiogroup"
				| "tablist"
				| "toolbar"
				| "tree"
			>
			type?: ListType
		}
	>
	children?: Array<ListItemElement | ScriptElement | TemplateElement>
	dataset?: Dataset
	readonly tagName: "OL"
}
