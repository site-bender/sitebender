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

import BroadcastChannelComponent from "../../../../../../src/define/Thing/Intangible/BroadcastChannel/index.tsx"
import BroadcastFrequencySpecificationComponent from "../../../../../../src/define/Thing/Intangible/BroadcastFrequencySpecification/index.tsx"
import LanguageComponent from "../../../../../../src/define/Thing/Intangible/Language/index.tsx"
import BroadcastServiceComponent from "../../../../../../src/define/Thing/Intangible/Service/BroadcastService/index.tsx"
import OrganizationComponent from "../../../../../../src/define/Thing/Organization/index.tsx"
import PlaceComponent from "../../../../../../src/define/Thing/Place/index.tsx"

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
