import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Place from "../../../Place/index.ts"
import type BroadcastChannel from "../../BroadcastChannel/index.ts"
import type BroadcastFrequencySpecification from "../../BroadcastFrequencySpecification/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Language from "../../Language/index.ts"
import type { ServiceProps } from "../index.ts"

import BroadcastChannelComponent from "../../../../../components/Thing/Intangible/BroadcastChannel/index.ts"
import BroadcastFrequencySpecificationComponent from "../../../../../components/Thing/Intangible/BroadcastFrequencySpecification/index.ts"
import LanguageComponent from "../../../../../components/Thing/Intangible/Language/index.ts"
import BroadcastServiceComponent from "../../../../../components/Thing/Intangible/Service/BroadcastService/index.ts"
import OrganizationComponent from "../../../../../components/Thing/Organization/index.ts"
import PlaceComponent from "../../../../../components/Thing/Place/index.ts"

export interface BroadcastServiceProps {
	"@type"?: "BroadcastService"
	area?: Place | ReturnType<typeof PlaceComponent>
	broadcastAffiliateOf?: Organization | ReturnType<typeof OrganizationComponent>
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
