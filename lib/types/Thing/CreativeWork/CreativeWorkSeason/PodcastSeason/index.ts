import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { CreativeWorkSeasonProps } from "../index.ts"

import PodcastSeasonComponent from "../../../../../../components/Thing/CreativeWork/CreativeWorkSeason/PodcastSeason/index.tsx"

export interface PodcastSeasonProps {
}

type PodcastSeason =
	& Thing
	& CreativeWorkProps
	& CreativeWorkSeasonProps
	& PodcastSeasonProps

export default PodcastSeason
