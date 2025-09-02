import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"
import type { HeadElement } from "../../metadata/head/index.ts"
import type { BodyElement } from "../../sections/body/index.ts"

export interface HtmlElement {
	attributes?: Override<
		Omit<Partial<HTMLHtmlElement>, "version">,
		GlobalAttributeOverrides & {
			xmlns: string
		}
	>
	children?: [HeadElement, BodyElement]
	dataset?: Dataset
	readonly tagName: "HTML"
}
