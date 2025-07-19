// PodcastSeason extends CreativeWorkSeason but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { CreativeWorkSeasonProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface PodcastSeasonProps {}

type PodcastSeason =
	& Thing
	& CreativeWorkProps
	& CreativeWorkSeasonProps
	& PodcastSeasonProps

export default PodcastSeason
