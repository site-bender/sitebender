import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type ContactPoint from "../StructuredValue/ContactPoint/index.ts"
import type Duration from "../Quantity/Duration/index.ts"
import type Language from "../Language/index.ts"
import type Place from "../../Place/index.ts"
import type PostalAddress from "../StructuredValue/ContactPoint/PostalAddress/index.ts"
import type Service from "../Service/index.ts"

import ServiceChannelComponent from "../../../../../components/Thing/Intangible/ServiceChannel/index.tsx"

export interface ServiceChannelProps {
	availableLanguage?: Language | Text
	processingTime?: Duration
	providesService?: Service
	serviceLocation?: Place
	servicePhone?: ContactPoint
	servicePostalAddress?: PostalAddress
	serviceSmsNumber?: ContactPoint
	serviceUrl?: URL
}

type ServiceChannel =
	& Thing
	& IntangibleProps
	& ServiceChannelProps

export default ServiceChannel
