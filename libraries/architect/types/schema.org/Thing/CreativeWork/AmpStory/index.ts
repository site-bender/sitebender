import type Thing from "../../index.ts"
import type { MediaObjectProps } from "../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type AmpStoryType = "AmpStory"

export interface AmpStoryProps {
	"@type"?: AmpStoryType
}

type AmpStory = Thing & CreativeWorkProps & MediaObjectProps & AmpStoryProps

export default AmpStory
