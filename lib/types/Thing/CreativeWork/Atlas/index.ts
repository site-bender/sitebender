import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface AtlasProps {
}

type Atlas =
	& Thing
	& CreativeWorkProps
	& AtlasProps

export default Atlas
