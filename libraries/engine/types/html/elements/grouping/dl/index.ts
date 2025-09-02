import type { ScriptElement } from "../../scripting/script/index.ts"
import type { TemplateElement } from "../../scripting/template/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { DescriptionDetailsElement } from "../dd/index.ts"
import type { DivisionElement } from "../div/index.ts"
import type { DescriptionTermElement } from "../dt/index.ts"

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
