import type {
	AriaRole,
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../shared"
import type { FlowContent } from "../categories/flow"
import type { FigcaptionElement } from "./figcaption"

export interface FigureElementWithCaption {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: never
		}
	>
	children?:
		| [FigcaptionElement, ...Array<FlowContent>]
		| [...Array<FlowContent>, FigcaptionElement]
	dataset?: Dataset
	readonly tagName: "FIGURE"
}

export interface FigureElementWithoutCaption {
	attributes?: Override<
		Partial<HTMLElement>,
		GlobalAttributeOverrides & {
			role?: AriaRole
		}
	>
	children?: Array<FlowContent>
	dataset?: Dataset
	readonly tagName: "FIGURE"
}

export type FigureElement =
	| FigureElementWithCaption
	| FigureElementWithoutCaption
