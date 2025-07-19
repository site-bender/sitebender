// Atlas extends CreativeWork but adds no additional properties
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface AtlasProps {}

type Atlas =
	& Thing
	& CreativeWorkProps
	& AtlasProps

export default Atlas
