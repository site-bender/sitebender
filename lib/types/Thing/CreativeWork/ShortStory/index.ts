import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

import ShortStoryComponent from "../../../../../components/Thing/CreativeWork/ShortStory/index.tsx"

export interface ShortStoryProps {
}

type ShortStory =
	& Thing
	& CreativeWorkProps
	& ShortStoryProps

export default ShortStory
