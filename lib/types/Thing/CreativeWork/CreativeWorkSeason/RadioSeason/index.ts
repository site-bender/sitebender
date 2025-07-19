// RadioSeason extends CreativeWorkSeason but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { CreativeWorkSeasonProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface RadioSeasonProps {}

type RadioSeason =
	& Thing
	& CreativeWorkProps
	& CreativeWorkSeasonProps
	& RadioSeasonProps

export default RadioSeason
