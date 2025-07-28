import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type Person from "../../Person/index.ts"

import ComicStoryComponent from "../../../../../components/Thing/CreativeWork/ComicStory/index.tsx"

export interface ComicStoryProps {
	artist?: Person
	colorist?: Person
	inker?: Person
	letterer?: Person
	penciler?: Person
}

type ComicStory =
	& Thing
	& CreativeWorkProps
	& ComicStoryProps

export default ComicStory
