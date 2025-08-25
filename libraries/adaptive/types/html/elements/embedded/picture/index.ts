import type {
	Dataset,
	GlobalAttributeOverrides,
	Override,
} from "../../index.ts"
import type { ImageElement } from "../img/index.ts"
import type { SourceElement } from "../source/index.ts"

// TODO
export interface PictureElement {
	attributes?: Override<Partial<HTMLPictureElement>, GlobalAttributeOverrides>
	children?: PictureContent
	dataset?: Dataset
	readonly tagName: "PICTURE"
}

export type PictureContent = [...Array<SourceElement>, ImageElement]
