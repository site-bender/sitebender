import type Thing from "../../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../index.ts"

export interface ThreeDModelProps {}

type ThreeDModel =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& ThreeDModelProps

export default ThreeDModel
