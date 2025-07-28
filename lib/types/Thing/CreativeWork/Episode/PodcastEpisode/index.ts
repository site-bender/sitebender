import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { EpisodeProps } from "../index.ts"

import PodcastEpisodeComponent from "../../../../../../components/Thing/CreativeWork/Episode/PodcastEpisode/index.tsx"

export interface PodcastEpisodeProps {
}

type PodcastEpisode =
	& Thing
	& CreativeWorkProps
	& EpisodeProps
	& PodcastEpisodeProps

export default PodcastEpisode
