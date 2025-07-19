// RadioEpisode extends Episode but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { EpisodeProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface RadioEpisodeProps {}

type RadioEpisode =
	& Thing
	& CreativeWorkProps
	& EpisodeProps
	& RadioEpisodeProps

export default RadioEpisode
