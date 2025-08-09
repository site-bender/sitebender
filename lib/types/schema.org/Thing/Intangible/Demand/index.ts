import type {
	Date,
	DateTime,
	Text,
	Time,
	URL,
} from "../../../DataType/index.ts"
import type CreativeWork from "../../CreativeWork/index.ts"
import type Event from "../../Event/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type Place from "../../Place/index.ts"
import type Product from "../../Product/index.ts"
import type BusinessEntityType from "../Enumeration/BusinessEntityType/index.ts"
import type BusinessFunction from "../Enumeration/BusinessFunction/index.ts"
import type DeliveryMethod from "../Enumeration/DeliveryMethod/index.ts"
import type ItemAvailability from "../Enumeration/ItemAvailability/index.ts"
import type OfferItemCondition from "../Enumeration/OfferItemCondition/index.ts"
import type { IntangibleProps } from "../index.ts"
import type MenuItem from "../MenuItem/index.ts"
import type AggregateOffer from "../Offer/AggregateOffer/index.ts"
import type PaymentMethod from "../PaymentMethod/index.ts"
import type LoanOrCredit from "../Service/FinancialProduct/LoanOrCredit/index.ts"
import type Service from "../Service/index.ts"
import type GeoShape from "../StructuredValue/GeoShape/index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"
import type TypeAndQuantityNode from "../StructuredValue/TypeAndQuantityNode/index.ts"
import type WarrantyPromise from "../StructuredValue/WarrantyPromise/index.ts"
import type Trip from "../Trip/index.ts"

import { AdministrativeArea as AdministrativeAreaComponent } from "../../../../../components/index.tsx"
import { AggregateOffer as AggregateOfferComponent } from "../../../../../components/index.tsx"
import { BusinessEntityType as BusinessEntityTypeComponent } from "../../../../../components/index.tsx"
import { BusinessFunction as BusinessFunctionComponent } from "../../../../../components/index.tsx"
import { CreativeWork as CreativeWorkComponent } from "../../../../../components/index.tsx"
import { DeliveryMethod as DeliveryMethodComponent } from "../../../../../components/index.tsx"
import { Event as EventComponent } from "../../../../../components/index.tsx"
import { GeoShape as GeoShapeComponent } from "../../../../../components/index.tsx"
import { ItemAvailability as ItemAvailabilityComponent } from "../../../../../components/index.tsx"
import { LoanOrCredit as LoanOrCreditComponent } from "../../../../../components/index.tsx"
import { MenuItem as MenuItemComponent } from "../../../../../components/index.tsx"
import { OfferItemCondition as OfferItemConditionComponent } from "../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { PaymentMethod as PaymentMethodComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"
import { Place as PlaceComponent } from "../../../../../components/index.tsx"
import { PriceSpecification as PriceSpecificationComponent } from "../../../../../components/index.tsx"
import { Product as ProductComponent } from "../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../components/index.tsx"
import { Service as ServiceComponent } from "../../../../../components/index.tsx"
import { Trip as TripComponent } from "../../../../../components/index.tsx"
import { TypeAndQuantityNode as TypeAndQuantityNodeComponent } from "../../../../../components/index.tsx"
import { WarrantyPromise as WarrantyPromiseComponent } from "../../../../../components/index.tsx"

export type DemandType = "Demand"

export interface DemandProps {
	"@type"?: DemandType
	acceptedPaymentMethod?:
		| LoanOrCredit
		| PaymentMethod
		| Text
		| ReturnType<typeof LoanOrCreditComponent>
		| ReturnType<typeof PaymentMethodComponent>
	advanceBookingRequirement?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	areaServed?:
		| AdministrativeArea
		| GeoShape
		| Place
		| Text
		| ReturnType<typeof AdministrativeAreaComponent>
		| ReturnType<typeof GeoShapeComponent>
		| ReturnType<typeof PlaceComponent>
	asin?: Text | URL
	availability?: ItemAvailability | ReturnType<typeof ItemAvailabilityComponent>
	availabilityEnds?: Date | DateTime | Time
	availabilityStarts?: Date | DateTime | Time
	availableAtOrFrom?: Place | ReturnType<typeof PlaceComponent>
	availableDeliveryMethod?:
		| DeliveryMethod
		| ReturnType<typeof DeliveryMethodComponent>
	businessFunction?:
		| BusinessFunction
		| ReturnType<typeof BusinessFunctionComponent>
	deliveryLeadTime?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	eligibleCustomerType?:
		| BusinessEntityType
		| ReturnType<typeof BusinessEntityTypeComponent>
	eligibleDuration?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	eligibleQuantity?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	eligibleRegion?:
		| GeoShape
		| Place
		| Text
		| ReturnType<typeof GeoShapeComponent>
		| ReturnType<typeof PlaceComponent>
	eligibleTransactionVolume?:
		| PriceSpecification
		| ReturnType<typeof PriceSpecificationComponent>
	gtin?: Text | URL
	gtin12?: Text
	gtin13?: Text
	gtin14?: Text
	gtin8?: Text
	includesObject?:
		| TypeAndQuantityNode
		| ReturnType<typeof TypeAndQuantityNodeComponent>
	ineligibleRegion?:
		| GeoShape
		| Place
		| Text
		| ReturnType<typeof GeoShapeComponent>
		| ReturnType<typeof PlaceComponent>
	inventoryLevel?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	itemCondition?:
		| OfferItemCondition
		| ReturnType<typeof OfferItemConditionComponent>
	itemOffered?:
		| AggregateOffer
		| CreativeWork
		| Event
		| MenuItem
		| Product
		| Service
		| Trip
		| ReturnType<typeof AggregateOfferComponent>
		| ReturnType<typeof CreativeWorkComponent>
		| ReturnType<typeof EventComponent>
		| ReturnType<typeof MenuItemComponent>
		| ReturnType<typeof ProductComponent>
		| ReturnType<typeof ServiceComponent>
		| ReturnType<typeof TripComponent>
	mpn?: Text
	priceSpecification?:
		| PriceSpecification
		| ReturnType<typeof PriceSpecificationComponent>
	seller?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	serialNumber?: Text
	sku?: Text
	validFrom?: Date | DateTime
	validThrough?: Date | DateTime
	warranty?: WarrantyPromise | ReturnType<typeof WarrantyPromiseComponent>
}

type Demand = Thing & IntangibleProps & DemandProps

export default Demand
