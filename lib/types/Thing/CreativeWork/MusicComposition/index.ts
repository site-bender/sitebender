import type { Text } from "../../../DataType/index.ts"
import type Event from "../../Event/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MusicRecording from "../MusicRecording/index.ts"

import CreativeWorkComponent from "../../../../components/Thing/CreativeWork/index.ts"
import MusicCompositionComponent from "../../../../components/Thing/CreativeWork/MusicComposition/index.ts"
import MusicRecordingComponent from "../../../../components/Thing/CreativeWork/MusicRecording/index.ts"
import EventComponent from "../../../../components/Thing/Event/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"

export interface MusicCompositionProps {
	"@type"?: "MusicComposition"
	composer?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	firstPerformance?: Event | ReturnType<typeof EventComponent>
	includedComposition?:
		| MusicComposition
		| ReturnType<typeof MusicCompositionComponent>
	iswcCode?: Text
	lyricist?: Person | ReturnType<typeof PersonComponent>
	lyrics?: CreativeWork | ReturnType<typeof CreativeWorkComponent>
	musicalKey?: Text
	musicArrangement?:
		| MusicComposition
		| ReturnType<typeof MusicCompositionComponent>
	musicCompositionForm?: Text
	recordedAs?: MusicRecording | ReturnType<typeof MusicRecordingComponent>
}

type MusicComposition = Thing & CreativeWorkProps & MusicCompositionProps

export default MusicComposition
