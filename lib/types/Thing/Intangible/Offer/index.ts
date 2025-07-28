import type {
	Boolean,
	Date,
	DateTime,
	Number,
	Text,
	Time,
	URL,
} from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type AdultOrientedEnumeration from "../Enumeration/AdultOrientedEnumeration/index.ts"
import type AggregateOffer from "./AggregateOffer/index.ts"
import type AggregateRating from "../Rating/AggregateRating/index.ts"
import type BusinessEntityType from "../Enumeration/BusinessEntityType/index.ts"
import type BusinessFunction from "../Enumeration/BusinessFunction/index.ts"
import type CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import type CreativeWork from "../../CreativeWork/index.ts"
import type DeliveryMethod from "../Enumeration/DeliveryMethod/index.ts"
import type Duration from "../Quantity/Duration/index.ts"
import type Event from "../../Event/index.ts"
import type GeoShape from "../StructuredValue/GeoShape/index.ts"
import type ItemAvailability from "../Enumeration/ItemAvailability/index.ts"
import type LoanOrCredit from "../Service/FinancialProduct/LoanOrCredit/index.ts"
import type MemberProgramTier from "../MemberProgramTier/index.ts"
import type MenuItem from "../MenuItem/index.ts"
import type MerchantReturnPolicy from "../MerchantReturnPolicy/index.ts"
import type OfferItemCondition from "../Enumeration/OfferItemCondition/index.ts"
import type OfferShippingDetails from "../StructuredValue/OfferShippingDetails/index.ts"
import type Organization from "../../Organization/index.ts"
import type PaymentMethod from "../PaymentMethod/index.ts"
import type Person from "../../Person/index.ts"
import type PhysicalActivityCategory from "../Enumeration/PhysicalActivityCategory/index.ts"
import type Place from "../../Place/index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"
import type Product from "../../Product/index.ts"
import type PropertyValue from "../StructuredValue/PropertyValue/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"
import type Review from "../../CreativeWork/Review/index.ts"
import type Service from "../Service/index.ts"
import type Trip from "../Trip/index.ts"
import type TypeAndQuantityNode from "../StructuredValue/TypeAndQuantityNode/index.ts"
import type WarrantyPromise from "../StructuredValue/WarrantyPromise/index.ts"

import OfferComponent from "../../../../../components/Thing/Intangible/Offer/index.tsx"

export interface OfferProps {
	acceptedPaymentMethod?: LoanOrCredit | PaymentMethod | Text
	additionalProperty?: PropertyValue
	addOn?: Offer
	advanceBookingRequirement?: QuantitativeValue
	aggregateRating?: AggregateRating
	areaServed?: AdministrativeArea | GeoShape | Place | Text
	asin?: Text | URL
	availability?: ItemAvailability
	availabilityEnds?: Date | DateTime | Time
	availabilityStarts?: Date | DateTime | Time
	availableAtOrFrom?: Place
	availableDeliveryMethod?: DeliveryMethod
	businessFunction?: BusinessFunction
	category?: CategoryCode | PhysicalActivityCategory | Text | Thing | URL
	checkoutPageURLTemplate?: Text
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
	hasAdultConsideration?: AdultOrientedEnumeration
	hasGS1DigitalLink?: URL
	hasMeasurement?: QuantitativeValue
	hasMerchantReturnPolicy?: MerchantReturnPolicy
	includesObject?: TypeAndQuantityNode
	ineligibleRegion?: GeoShape | Place | Text
	inventoryLevel?: QuantitativeValue
	isFamilyFriendly?: Boolean
	itemCondition?: OfferItemCondition
	itemOffered?:
		| AggregateOffer
		| CreativeWork
		| Event
		| MenuItem
		| Product
		| Service
		| Trip
	leaseLength?: Duration | QuantitativeValue
	mobileUrl?: Text
	mpn?: Text
	offeredBy?: Organization | Person
	price?: Number | Text
	priceCurrency?: Text
	priceSpecification?: PriceSpecification
	priceValidUntil?: Date
	review?: Review
	reviews?: Review
	seller?: Organization | Person
	serialNumber?: Text
	shippingDetails?: OfferShippingDetails
	sku?: Text
	validForMemberTier?: MemberProgramTier
	validFrom?: Date | DateTime
	validThrough?: Date | DateTime
	warranty?: WarrantyPromise
}

type Offer =
	& Thing
	& IntangibleProps
	& OfferProps

export default Offer
