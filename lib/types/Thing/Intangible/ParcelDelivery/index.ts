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

import DeliveryEventComponent from "../../../../components/Thing/Event/DeliveryEvent/index.ts"
import DeliveryMethodComponent from "../../../../components/Thing/Intangible/Enumeration/DeliveryMethod/index.ts"
import OrderComponent from "../../../../components/Thing/Intangible/Order/index.ts"
import PostalAddressComponent from "../../../../components/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"
import ProductComponent from "../../../../components/Thing/Product/index.ts"

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
