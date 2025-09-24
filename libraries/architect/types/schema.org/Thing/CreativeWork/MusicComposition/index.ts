import type { Text } from "../../../DataType/index.ts"
import type Event from "../../Event/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MusicRecording from "../MusicRecording/index.ts"

import CreativeWorkComponent from "../../../../../../codewright/src/define/Thing/CreativeWork/index.tsx"
import MusicCompositionComponent from "../../../../../../codewright/src/define/Thing/CreativeWork/MusicComposition/index.tsx"
import MusicRecordingComponent from "../../../../../../codewright/src/define/Thing/CreativeWork/MusicRecording/index.tsx"
import EventComponent from "../../../../../../codewright/src/define/Thing/Event/index.tsx"
import OrganizationComponent from "../../../../../../codewright/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../codewright/src/define/Thing/Person/index.tsx"

export type MusicCompositionType = "MusicComposition"

export interface MusicCompositionProps {
	"@type"?: MusicCompositionType
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
