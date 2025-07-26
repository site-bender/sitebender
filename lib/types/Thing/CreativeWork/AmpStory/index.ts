import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { MediaObjectProps } from "../../MediaObject/index.ts"

export interface AmpStoryProps {
}

type AmpStory =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& AmpStoryProps

export default AmpStory
