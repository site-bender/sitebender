import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { CreativeWorkSeasonProps } from "../index.ts"

export type RadioSeasonType = "RadioSeason"

export interface RadioSeasonProps {
	"@type"?: RadioSeasonType
}

type RadioSeason =
	& Thing
	& CreativeWorkProps
	& CreativeWorkSeasonProps
	& RadioSeasonProps

export default RadioSeason
