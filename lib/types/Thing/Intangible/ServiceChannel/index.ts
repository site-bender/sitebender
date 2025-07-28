import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Place from "../../Place/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Language from "../Language/index.ts"
import type Duration from "../Quantity/Duration/index.ts"
import type Service from "../Service/index.ts"
import type ContactPoint from "../StructuredValue/ContactPoint/index.ts"
import type PostalAddress from "../StructuredValue/ContactPoint/PostalAddress/index.ts"

import LanguageComponent from "../../../../components/Thing/Intangible/Language/index.ts"
import DurationComponent from "../../../../components/Thing/Intangible/Quantity/Duration/index.ts"
import ServiceComponent from "../../../../components/Thing/Intangible/Service/index.ts"
import ContactPointComponent from "../../../../components/Thing/Intangible/StructuredValue/ContactPoint/index.ts"
import PostalAddressComponent from "../../../../components/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import PlaceComponent from "../../../../components/Thing/Place/index.ts"

export interface ServiceChannelProps {
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
