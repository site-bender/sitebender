import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { FlowContent } from "../categories/flow"
import type { ScriptElement } from "../scripting/script"
import type { TemplateElement } from "../scripting/template"
import type { DescriptionDetailsElement } from "./dd"
import type { DescriptionTermElement } from "./dt"

export interface DivisionElement {
	attributes?: Override<
		Omit<Partial<HTMLDivElement>, "align">,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	children?: Array<
		| FlowContent
		| DescriptionDetailsElement
		| DescriptionTermElement
		| ScriptElement
		| TemplateElement
	>
	dataset?: Dataset
	readonly tagName: "DIV"
}
