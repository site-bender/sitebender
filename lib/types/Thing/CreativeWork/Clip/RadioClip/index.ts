import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ClipProps } from "../index.ts"

export interface RadioClipProps {
	"@type"?: "RadioClip"}

type RadioClip = Thing & CreativeWorkProps & ClipProps & RadioClipProps

export default RadioClip
