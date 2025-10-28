import type { Date, DateTime, Text, URL } from "../../../DataType/index.ts"
import type DeliveryEvent from "../../Event/DeliveryEvent/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type Product from "../../Product/index.ts"
import type DeliveryMethod from "../Enumeration/DeliveryMethod/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Order from "../Order/index.ts"
import type PostalAddress from "../StructuredValue/ContactPoint/PostalAddress/index.ts"

import DeliveryEventComponent from "../../../../../src/define/Thing/Event/DeliveryEvent/index.tsx"
import DeliveryMethodComponent from "../../../../../src/define/Thing/Intangible/Enumeration/DeliveryMethod/index.tsx"
import OrderComponent from "../../../../../src/define/Thing/Intangible/Order/index.tsx"
import PostalAddressComponent from "../../../../../src/define/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.tsx"
import OrganizationComponent from "../../../../../src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../src/define/Thing/Person/index.tsx"
import ProductComponent from "../../../../../src/define/Thing/Product/index.tsx"

export type ParcelDeliveryType = "ParcelDelivery"

export interface ParcelDeliveryProps {
	"@type"?: ParcelDeliveryType
	carrier?: Organization | ReturnType<typeof OrganizationComponent>
	deliveryAddress?: PostalAddress | ReturnType<typeof PostalAddressComponent>
	deliveryStatus?: DeliveryEvent | ReturnType<typeof DeliveryEventComponent>
	expectedArrivalFrom?: Date | DateTime
	expectedArrivalUntil?: Date | DateTime
	hasDeliveryMethod?:
		| DeliveryMethod
		| ReturnType<typeof DeliveryMethodComponent>
	itemShipped?: Product | ReturnType<typeof ProductComponent>
	originAddress?: PostalAddress | ReturnType<typeof PostalAddressComponent>
	partOfOrder?: Order | ReturnType<typeof OrderComponent>
	provider?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	trackingNumber?: Text
	trackingUrl?: URL
}

type ParcelDelivery = Thing & IntangibleProps & ParcelDeliveryProps

export default ParcelDelivery
