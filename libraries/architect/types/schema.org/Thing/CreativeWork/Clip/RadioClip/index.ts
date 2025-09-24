import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ClipProps } from "../index.ts"

export type RadioClipType = "RadioClip"

export interface RadioClipProps {
	"@type"?: RadioClipType
}

type RadioClip = Thing & CreativeWorkProps & ClipProps & RadioClipProps

export default RadioClip
