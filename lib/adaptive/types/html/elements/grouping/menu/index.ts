import type { ScriptElement } from "../../scripting/script/index.ts"
import type { TemplateElement } from "../../scripting/template/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { ListItemElement } from "../li/index.ts"

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
