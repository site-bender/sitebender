// Series extends Intangible but adds no additional properties
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface SeriesProps {}

type Series =
	& Thing
	& IntangibleProps
	& SeriesProps

export default Series
