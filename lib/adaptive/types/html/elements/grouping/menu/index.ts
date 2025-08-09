import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { ScriptElement } from "../scripting/script"
import type { TemplateElement } from "../scripting/template"
import type { ListItemElement } from "./li"

export interface MenuElement {
	attributes?: Override<
		Omit<Partial<HTMLMenuElement>, "compact">,
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
	readonly tagName: "MENU"
}
