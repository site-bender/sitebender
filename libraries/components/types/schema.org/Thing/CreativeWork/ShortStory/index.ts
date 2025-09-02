import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type ShortStoryType = "ShortStory"

export interface ShortStoryProps {
	"@type"?: ShortStoryType
}

type ShortStory = Thing & CreativeWorkProps & ShortStoryProps

export default ShortStory
