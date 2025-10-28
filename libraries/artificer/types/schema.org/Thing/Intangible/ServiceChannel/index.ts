import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Place from "../../Place/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Language from "../Language/index.ts"
import type Duration from "../Quantity/Duration/index.ts"
import type Service from "../Service/index.ts"
import type ContactPoint from "../StructuredValue/ContactPoint/index.ts"
import type PostalAddress from "../StructuredValue/ContactPoint/PostalAddress/index.ts"

import LanguageComponent from "../../../../../../architect/src/define/Thing/Intangible/Language/index.tsx"
import DurationComponent from "../../../../../../architect/src/define/Thing/Intangible/Quantity/Duration/index.tsx"
import ServiceComponent from "../../../../../../architect/src/define/Thing/Intangible/Service/index.tsx"
import ContactPointComponent from "../../../../../../architect/src/define/Thing/Intangible/StructuredValue/ContactPoint/index.tsx"
import PostalAddressComponent from "../../../../../../architect/src/define/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.tsx"
import PlaceComponent from "../../../../../../architect/src/define/Thing/Place/index.tsx"

export type ServiceChannelType = "ServiceChannel"

export interface ServiceChannelProps {
	"@type"?: ServiceChannelType
	availableLanguage?: Language | Text | ReturnType<typeof LanguageComponent>
	processingTime?: Duration | ReturnType<typeof DurationComponent>
	providesService?: Service | ReturnType<typeof ServiceComponent>
	serviceLocation?: Place | ReturnType<typeof PlaceComponent>
	servicePhone?: ContactPoint | ReturnType<typeof ContactPointComponent>
	servicePostalAddress?:
		| PostalAddress
		| ReturnType<typeof PostalAddressComponent>
	serviceSmsNumber?: ContactPoint | ReturnType<typeof ContactPointComponent>
	serviceUrl?: URL
}

type ServiceChannel = Thing & IntangibleProps & ServiceChannelProps

export default ServiceChannel
