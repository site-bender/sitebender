// ComicCoverArt extends ComicStory but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ComicStoryProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface ComicCoverArtProps {}

type ComicCoverArt =
	& Thing
	& ComicStoryProps
	& CreativeWorkProps
	& ComicCoverArtProps

export default ComicCoverArt
