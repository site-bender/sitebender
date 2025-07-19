import type { Boolean } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../index.ts"

export interface ThreeDModelProps {
	/** Whether the 3DModel allows resizing. For example, room layout applications often do not allow 3DModel elements to be resized to reflect reality. */
	isResizable?: Boolean
}

type ThreeDModel =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& ThreeDModelProps

export default ThreeDModel
