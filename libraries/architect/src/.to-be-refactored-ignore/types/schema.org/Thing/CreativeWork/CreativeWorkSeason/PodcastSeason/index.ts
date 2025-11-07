import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { CreativeWorkSeasonProps } from "../index.ts"

export type PodcastSeasonType = "PodcastSeason"

export interface PodcastSeasonProps {
	"@type"?: PodcastSeasonType
}

type PodcastSeason =
	& Thing
	& CreativeWorkProps
	& CreativeWorkSeasonProps
	& PodcastSeasonProps

export default PodcastSeason
