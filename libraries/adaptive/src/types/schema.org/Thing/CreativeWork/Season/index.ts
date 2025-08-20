import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type SeasonType = "Season"

export interface SeasonProps {
	"@type"?: SeasonType
}

type Season = Thing & CreativeWorkProps & SeasonProps

export default Season
