import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { EpisodeProps } from "../index.ts"

import RadioEpisodeComponent from "../../../../../../components/Thing/CreativeWork/Episode/RadioEpisode/index.tsx"

export interface RadioEpisodeProps {
}

type RadioEpisode =
	& Thing
	& CreativeWorkProps
	& EpisodeProps
	& RadioEpisodeProps

export default RadioEpisode
