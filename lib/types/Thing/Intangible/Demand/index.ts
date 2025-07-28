import type {
	Date,
	DateTime,
	Text,
	Time,
	URL,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type AggregateOffer from "../Offer/AggregateOffer/index.ts"
import type BusinessEntityType from "../Enumeration/BusinessEntityType/index.ts"
import type BusinessFunction from "../Enumeration/BusinessFunction/index.ts"
import type CreativeWork from "../../CreativeWork/index.ts"
import type DeliveryMethod from "../Enumeration/DeliveryMethod/index.ts"
import type Event from "../../Event/index.ts"
import type GeoShape from "../StructuredValue/GeoShape/index.ts"
import type ItemAvailability from "../Enumeration/ItemAvailability/index.ts"
import type LoanOrCredit from "../Service/FinancialProduct/LoanOrCredit/index.ts"
import type MenuItem from "../MenuItem/index.ts"
import type OfferItemCondition from "../Enumeration/OfferItemCondition/index.ts"
import type Organization from "../../Organization/index.ts"
import type PaymentMethod from "../PaymentMethod/index.ts"
import type Person from "../../Person/index.ts"
import type Place from "../../Place/index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"
import type Product from "../../Product/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"
import type Service from "../Service/index.ts"
import type Trip from "../Trip/index.ts"
import type TypeAndQuantityNode from "../StructuredValue/TypeAndQuantityNode/index.ts"
import type WarrantyPromise from "../StructuredValue/WarrantyPromise/index.ts"

import DemandComponent from "../../../../../components/Thing/Intangible/Demand/index.tsx"

export interface DemandProps {
	acceptedPaymentMethod?: LoanOrCredit | PaymentMethod | Text
	advanceBookingRequirement?: QuantitativeValue
	areaServed?: AdministrativeArea | GeoShape | Place | Text
	asin?: Text | URL
	availability?: ItemAvailability
	availabilityEnds?: Date | DateTime | Time
	availabilityStarts?: Date | DateTime | Time
	availableAtOrFrom?: Place
	availableDeliveryMethod?: DeliveryMethod
	businessFunction?: BusinessFunction
	deliveryLeadTime?: QuantitativeValue
	eligibleCustomerType?: BusinessEntityType
	eligibleDuration?: QuantitativeValue
	eligibleQuantity?: QuantitativeValue
	eligibleRegion?: GeoShape | Place | Text
	eligibleTransactionVolume?: PriceSpecification
	gtin?: Text | URL
	gtin12?: Text
	gtin13?: Text
	gtin14?: Text
	gtin8?: Text
	includesObject?: TypeAndQuantityNode
	ineligibleRegion?: GeoShape | Place | Text
	inventoryLevel?: QuantitativeValue
	itemCondition?: OfferItemCondition
	itemOffered?:
		| AggregateOffer
		| CreativeWork
		| Event
		| MenuItem
		| Product
		| Service
		| Trip
	mpn?: Text
	priceSpecification?: PriceSpecification
	seller?: Organization | Person
	serialNumber?: Text
	sku?: Text
	validFrom?: Date | DateTime
	validThrough?: Date | DateTime
	warranty?: WarrantyPromise
}

type Demand =
	& Thing
	& IntangibleProps
	& DemandProps

export default Demand
