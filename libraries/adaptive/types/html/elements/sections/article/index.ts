import type { FlowContent } from "../../categories/flow/index.ts"
import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"

export interface ArticleElement {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: ArticleRole
		}
	>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "ARTICLE"
}

export type ArticleRole = Extract<
	AriaRole,
	| "application"
	| "document"
	| "feed"
	| "main"
	| "none"
	| "presentation"
	| "region"
>
