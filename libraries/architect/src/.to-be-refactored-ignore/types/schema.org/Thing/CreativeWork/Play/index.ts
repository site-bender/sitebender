import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type PlayType = "Play"

export interface PlayProps {
	"@type"?: PlayType
}

type Play = Thing & CreativeWorkProps & PlayProps

export default Play
