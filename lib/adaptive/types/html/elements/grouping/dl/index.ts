import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { ScriptElement } from "../scripting/script"
import type { TemplateElement } from "../scripting/template"
import type { DescriptionDetailsElement } from "./dd"
import type { DivisionElement } from "./div"
import type { DescriptionTermElement } from "./dt"

export interface DescriptionListElement {
	attributes?: Override<
		Omit<Partial<HTMLDListElement>, "compact">,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	children?: Array<
		| DivisionElement
		| DescriptionDetailsElement
		| DescriptionTermElement
		| ScriptElement
		| TemplateElement
	>
	dataset?: Dataset
	readonly tagName: "DL"
}
