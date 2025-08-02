import type Thing from "../../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../index.ts"

export type ThreeDModelType = "ThreeDModel"

export interface ThreeDModelProps {
	"@type"?: ThreeDModelType
}

type ThreeDModel =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& ThreeDModelProps

export default ThreeDModel
