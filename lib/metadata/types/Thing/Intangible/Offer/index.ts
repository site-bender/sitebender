import type {
	Boolean,
	Date,
	DateTime,
	Number,
	Text,
	Time,
} from "../../../DataType/index.ts"
import type { CreativeWork } from "../../CreativeWork/index.ts"
import type { Review } from "../../CreativeWork/Review/index.ts"
import type { Event } from "../../Event/index.ts"
import type {
	AdministrativeArea,
	AggregateOffer,
	AggregateRating,
	BusinessEntityType,
	BusinessFunction,
	CategoryCode,
	DeliveryMethod,
	Duration,
	GeoShape,
	ItemAvailability,
	LoanOrCredit,
	MenuItem,
	MerchantReturnPolicy,
	OfferItemCondition,
	OfferShippingDetails,
	PaymentMethod,
	PhysicalActivityCategory,
	PriceSpecification,
	PropertyValue,
	Service,
	Thing,
	Trip,
	TypeAndQuantityNode,
	URL,
	WarrantyPromise,
} from "../../index.ts"
import type { Organization } from "../../Organization/index.ts"
import type { Person } from "../../Person/index.ts"
import type { Place } from "../../Place/index.ts"
import type { Product } from "../../Product/index.ts"
import type { Intangible } from "../index.ts"
import type { QuantitativeValue } from "../StructuredValue/QuantitativeValue/index.ts"

// Offer interface - extends Intangible
// An offer to transfer some rights to an item or to provide a service
export interface Offer extends Intangible {
	acceptedPaymentMethod?: LoanOrCredit | PaymentMethod | Text
	addOn?: Offer
	additionalProperty?: PropertyValue
	advanceBookingRequirement?: QuantitativeValue
	aggregateRating?: AggregateRating
	areaServed?: AdministrativeArea | GeoShape | Place | Text
	availability?: ItemAvailability
	availabilityEnds?: DateTime | Time
	availabilityStarts?: DateTime | Time
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
	gtin?: Text
	gtin12?: Text
	gtin13?: Text
	gtin14?: Text
	gtin8?: Text
	hasGS1DigitalLink?: URL
	hasMeasurement?: QuantitativeValue
	hasMerchantReturnPolicy?: MerchantReturnPolicy
	hasOfferShippingDetails?: OfferShippingDetails
	hasWarranty?: WarrantyPromise
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
	mpn?: Text
	offeredBy?: Organization | Person
	price?: Number | Text
	priceCurrency?: Text
	priceSpecification?: PriceSpecification
	priceValidUntil?: Date
	review?: Review
	seller?: Organization | Person
	serialNumber?: Text
	shippingDetails?: OfferShippingDetails
	sku?: Text
	validFrom?: Date | DateTime
	validThrough?: Date | DateTime
	warranty?: WarrantyPromise
}
