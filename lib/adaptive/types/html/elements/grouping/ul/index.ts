import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { ScriptElement } from "../scripting/script"
import type { TemplateElement } from "../scripting/template"
import type { ListItemElement } from "./li"

export interface UnorderedListElement {
	attributes?: Override<
		Omit<Partial<HTMLUListElement>, "compact" | "type">,
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
		}
	>
	children?: Array<ListItemElement | ScriptElement | TemplateElement>
	dataset?: Dataset
	readonly tagName: "UL"
}
