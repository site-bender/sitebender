import type { Text } from "../../../DataType/index.ts"
import type Event from "../../Event/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type CreativeWork from "../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MusicRecording from "../MusicRecording/index.ts"

import { CreativeWork as CreativeWorkComponent } from "../../../../../components/index.tsx"
import { MusicComposition as MusicCompositionComponent } from "../../../../../components/index.tsx"
import { MusicRecording as MusicRecordingComponent } from "../../../../../components/index.tsx"
import { Event as EventComponent } from "../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"

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
