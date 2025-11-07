import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type AtlasType = "Atlas"

export interface AtlasProps {
	"@type"?: AtlasType
}

type Atlas = Thing & CreativeWorkProps & AtlasProps

export default Atlas
