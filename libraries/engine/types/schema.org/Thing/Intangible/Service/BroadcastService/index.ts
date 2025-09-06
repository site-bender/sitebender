import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Place from "../../../Place/index.ts"
import type BroadcastChannel from "../../BroadcastChannel/index.ts"
import type BroadcastFrequencySpecification from "../../BroadcastFrequencySpecification/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Language from "../../Language/index.ts"
import type { ServiceProps } from "../index.ts"
import type { RadioBroadcastServiceType } from "./RadioBroadcastService/index.ts"

import { BroadcastChannel as BroadcastChannelComponent } from "../../../../../../components/index.tsx"
import { BroadcastFrequencySpecification as BroadcastFrequencySpecificationComponent } from "../../../../../../components/index.tsx"
import { BroadcastService as BroadcastServiceComponent } from "../../../../../../components/index.tsx"
import { Language as LanguageComponent } from "../../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../../components/index.tsx"
import { Place as PlaceComponent } from "../../../../../../components/index.tsx"

export type BroadcastServiceType =
	| "BroadcastService"
	| RadioBroadcastServiceType

export interface BroadcastServiceProps {
	"@type"?: BroadcastServiceType
	area?: Place | ReturnType<typeof PlaceComponent>
	broadcastAffiliateOf?:
		| Organization
		| ReturnType<typeof OrganizationComponent>
	broadcastDisplayName?: Text
	broadcaster?: Organization | ReturnType<typeof OrganizationComponent>
	broadcastFrequency?:
		| BroadcastFrequencySpecification
		| Text
		| ReturnType<typeof BroadcastFrequencySpecificationComponent>
	broadcastTimezone?: Text
	callSign?: Text
	hasBroadcastChannel?:
		| BroadcastChannel
		| ReturnType<typeof BroadcastChannelComponent>
	inLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	parentService?:
		| BroadcastService
		| ReturnType<typeof BroadcastServiceComponent>
	videoFormat?: Text
}

type BroadcastService =
	& Thing
	& IntangibleProps
	& ServiceProps
	& BroadcastServiceProps

export default BroadcastService
