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

import { DeliveryEvent as DeliveryEventComponent } from "../../../../../components/index.tsx"
import { DeliveryMethod as DeliveryMethodComponent } from "../../../../../components/index.tsx"
import { Order as OrderComponent } from "../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"
import { PostalAddress as PostalAddressComponent } from "../../../../../components/index.tsx"
import { Product as ProductComponent } from "../../../../../components/index.tsx"

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
