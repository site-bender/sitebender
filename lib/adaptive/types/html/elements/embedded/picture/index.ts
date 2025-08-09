import type { Dataset, GlobalAttributeOverrides, Override } from "../../shared"
import type { ImageElement } from "./img"
import type { SourceElement } from "./source"

// TODO
export interface PictureElement {
	attributes?: Override<Partial<HTMLPictureElement>, GlobalAttributeOverrides>
	children?: PictureContent
	dataset?: Dataset
	readonly tagName: "PICTURE"
}

export type PictureContent = [...Array<SourceElement>, ImageElement]
