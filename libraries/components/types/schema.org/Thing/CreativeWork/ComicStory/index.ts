import type Thing from "../../index.ts"
import type Person from "../../Person/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { ComicCoverArtType } from "./ComicCoverArt/index.ts"

import { Person as PersonComponent } from "../../../../../components/index.tsx"

export type ComicStoryType = "ComicStory" | ComicCoverArtType

export interface ComicStoryProps {
	"@type"?: ComicStoryType
	artist?: Person | ReturnType<typeof PersonComponent>
	colorist?: Person | ReturnType<typeof PersonComponent>
	inker?: Person | ReturnType<typeof PersonComponent>
	letterer?: Person | ReturnType<typeof PersonComponent>
	penciler?: Person | ReturnType<typeof PersonComponent>
}

type ComicStory = Thing & CreativeWorkProps & ComicStoryProps

export default ComicStory
