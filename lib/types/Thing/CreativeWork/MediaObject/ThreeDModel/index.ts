import type { Boolean } from "../../../../DataType/index.ts"
import type MediaObject from "../index.ts"

export default interface ThreeDModel extends MediaObject {
	/** Whether the 3DModel allows resizing. For example, room layout applications often do not allow 3DModel elements to be resized to reflect reality. */
	isResizable?: Boolean
}
