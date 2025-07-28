import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type CreativeWork from "../index.ts"
import type Event from "../../Event/index.ts"
import type MusicRecording from "../MusicRecording/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"

import MusicCompositionComponent from "../../../../../components/Thing/CreativeWork/MusicComposition/index.tsx"

export interface MusicCompositionProps {
	composer?: Organization | Person
	firstPerformance?: Event
	includedComposition?: MusicComposition
	iswcCode?: Text
	lyricist?: Person
	lyrics?: CreativeWork
	musicalKey?: Text
	musicArrangement?: MusicComposition
	musicCompositionForm?: Text
	recordedAs?: MusicRecording
}

type MusicComposition =
	& Thing
	& CreativeWorkProps
	& MusicCompositionProps

export default MusicComposition
