import type { FlowContent } from "../../categories/flow/index.ts"
import type { ScriptElement } from "../../scripting/script/index.ts"
import type { TemplateElement } from "../../scripting/template/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { DescriptionDetailsElement } from "../dd/index.ts"
import type { DescriptionTermElement } from "../dt/index.ts"

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
