import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { HeadElement } from "../metadata/head"
import type { BodyElement } from "../sections/body"

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
