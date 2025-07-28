import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ClipProps } from "../index.ts"

import RadioClipComponent from "../../../../../../components/Thing/CreativeWork/Clip/RadioClip/index.tsx"

export interface RadioClipProps {
}

type RadioClip =
	& Thing
	& CreativeWorkProps
	& ClipProps
	& RadioClipProps

export default RadioClip
