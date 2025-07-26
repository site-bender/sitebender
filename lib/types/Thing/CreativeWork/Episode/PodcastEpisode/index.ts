import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { EpisodeProps } from "../index.ts"

export interface PodcastEpisodeProps {
}

type PodcastEpisode =
	& Thing
	& CreativeWorkProps
	& EpisodeProps
	& PodcastEpisodeProps

export default PodcastEpisode
