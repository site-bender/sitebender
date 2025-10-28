import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

export interface DialogElement {
	attributes?: Override<
		Partial<HTMLDialogElement>,
		GlobalAttributeOverrides & {
			role?: Extract<AriaRole, "alertdialog">
			tabIndex?: never
		}
	>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "DIALOG"
}
