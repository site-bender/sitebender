import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	AriaRole,
	Autocapitalize,
	Autocomplete,
	Dataset,
	FormEnctype,
	FormMethod,
	FormTarget,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

export interface FormElement {
	attributes?: Override<
		Partial<HTMLFormElement>,
		GlobalAttributeOverrides & {
			autocapitalize?: Autocapitalize
			autocomplete?: Autocomplete
			enctype?: FormEnctype
			method?: FormMethod
			name?: string
			role?: Extract<AriaRole, "search" | "none" | "presentation">
			target?: FormTarget | "_unfencedTop"
		}
	>
	children?: Array<FormContent>
	dataset?: Dataset
	readonly tagName: "FORM"
}

export type FormContent = Exclude<FlowContent, { tagName: "FORM" }>
