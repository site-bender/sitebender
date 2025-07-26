import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface ShortStoryProps {
}

type ShortStory =
	& Thing
	& CreativeWorkProps
	& ShortStoryProps

export default ShortStory
