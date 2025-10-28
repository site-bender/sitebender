import type {
	Boolean,
	Date,
	DateTime,
	Number,
	Text,
	Time,
	URL,
} from "../../../DataType/index.ts"
import type CreativeWork from "../../CreativeWork/index.ts"
import type Review from "../../CreativeWork/Review/index.ts"
import type Event from "../../Event/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type Place from "../../Place/index.ts"
import type Product from "../../Product/index.ts"
import type CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import type AdultOrientedEnumeration from "../Enumeration/AdultOrientedEnumeration/index.ts"
import type BusinessEntityType from "../Enumeration/BusinessEntityType/index.ts"
import type BusinessFunction from "../Enumeration/BusinessFunction/index.ts"
import type DeliveryMethod from "../Enumeration/DeliveryMethod/index.ts"
import type ItemAvailability from "../Enumeration/ItemAvailability/index.ts"
import type OfferItemCondition from "../Enumeration/OfferItemCondition/index.ts"
import type PhysicalActivityCategory from "../Enumeration/PhysicalActivityCategory/index.ts"
import type { IntangibleProps } from "../index.ts"
import type MemberProgramTier from "../MemberProgramTier/index.ts"
import type MenuItem from "../MenuItem/index.ts"
import type MerchantReturnPolicy from "../MerchantReturnPolicy/index.ts"
import type PaymentMethod from "../PaymentMethod/index.ts"
import type Duration from "../Quantity/Duration/index.ts"
import type AggregateRating from "../Rating/AggregateRating/index.ts"
import type LoanOrCredit from "../Service/FinancialProduct/LoanOrCredit/index.ts"
import type Service from "../Service/index.ts"
import type GeoShape from "../StructuredValue/GeoShape/index.ts"
import type OfferShippingDetails from "../StructuredValue/OfferShippingDetails/index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"
import type PropertyValue from "../StructuredValue/PropertyValue/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"
import type TypeAndQuantityNode from "../StructuredValue/TypeAndQuantityNode/index.ts"
import type WarrantyPromise from "../StructuredValue/WarrantyPromise/index.ts"
import type Trip from "../Trip/index.ts"
import type AggregateOffer from "./AggregateOffer/index.ts"
import type { AggregateOfferType } from "./AggregateOffer/index.ts"
import type { OfferForLeaseType } from "./OfferForLease/index.ts"
import type { OfferForPurchaseType } from "./OfferForPurchase/index.ts"

import CreativeWorkComponent from "../../../../../../pagewright/src/define/Thing/CreativeWork/index.tsx"
import ReviewComponent from "../../../../../../pagewright/src/define/Thing/CreativeWork/Review/index.tsx"
import EventComponent from "../../../../../../pagewright/src/define/Thing/Event/index.tsx"
import ThingComponent from "../../../../../../pagewright/src/define/Thing/index.tsx"
import CategoryCodeComponent from "../../../../../../pagewright/src/define/Thing/Intangible/DefinedTerm/CategoryCode/index.tsx"
import AdultOrientedEnumerationComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/AdultOrientedEnumeration/index.tsx"
import BusinessEntityTypeComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/BusinessEntityType/index.tsx"
import BusinessFunctionComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/BusinessFunction/index.tsx"
import DeliveryMethodComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/DeliveryMethod/index.tsx"
import ItemAvailabilityComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/ItemAvailability/index.tsx"
import OfferItemConditionComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/OfferItemCondition/index.tsx"
import PhysicalActivityCategoryComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/PhysicalActivityCategory/index.tsx"
import MemberProgramTierComponent from "../../../../../../pagewright/src/define/Thing/Intangible/MemberProgramTier/index.tsx"
import MenuItemComponent from "../../../../../../pagewright/src/define/Thing/Intangible/MenuItem/index.tsx"
import MerchantReturnPolicyComponent from "../../../../../../pagewright/src/define/Thing/Intangible/MerchantReturnPolicy/index.tsx"
import AggregateOfferComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Offer/AggregateOffer/index.tsx"
import OfferComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Offer/index.tsx"
import PaymentMethodComponent from "../../../../../../pagewright/src/define/Thing/Intangible/PaymentMethod/index.tsx"
import DurationComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Quantity/Duration/index.tsx"
import AggregateRatingComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Rating/AggregateRating/index.tsx"
import LoanOrCreditComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Service/FinancialProduct/LoanOrCredit/index.tsx"
import ServiceComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Service/index.tsx"
import GeoShapeComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/GeoShape/index.tsx"
import OfferShippingDetailsComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/OfferShippingDetails/index.tsx"
import PriceSpecificationComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/PriceSpecification/index.tsx"
import PropertyValueComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/PropertyValue/index.tsx"
import QuantitativeValueComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import TypeAndQuantityNodeComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/TypeAndQuantityNode/index.tsx"
import WarrantyPromiseComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/WarrantyPromise/index.tsx"
import TripComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Trip/index.tsx"
import OrganizationComponent from "../../../../../../pagewright/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../pagewright/src/define/Thing/Person/index.tsx"
import AdministrativeAreaComponent from "../../../../../../pagewright/src/define/Thing/Place/AdministrativeArea/index.tsx"
import PlaceComponent from "../../../../../../pagewright/src/define/Thing/Place/index.tsx"
import ProductComponent from "../../../../../../pagewright/src/define/Thing/Product/index.tsx"

export type OfferType =
	| "Offer"
	| OfferForPurchaseType
	| AggregateOfferType
	| OfferForLeaseType

export interface OfferProps {
	"@type"?: OfferType
	acceptedPaymentMethod?:
		| LoanOrCredit
		| PaymentMethod
		| Text
		| ReturnType<typeof LoanOrCreditComponent>
		| ReturnType<typeof PaymentMethodComponent>
	additionalProperty?:
		| PropertyValue
		| ReturnType<typeof PropertyValueComponent>
	addOn?: Offer | ReturnType<typeof OfferComponent>
	advanceBookingRequirement?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	aggregateRating?:
		| AggregateRating
		| ReturnType<typeof AggregateRatingComponent>
	areaServed?:
		| AdministrativeArea
		| GeoShape
		| Place
		| Text
		| ReturnType<typeof AdministrativeAreaComponent>
		| ReturnType<typeof GeoShapeComponent>
		| ReturnType<typeof PlaceComponent>
	asin?: Text | URL
	availability?:
		| ItemAvailability
		| ReturnType<typeof ItemAvailabilityComponent>
	availabilityEnds?: Date | DateTime | Time
	availabilityStarts?: Date | DateTime | Time
	availableAtOrFrom?: Place | ReturnType<typeof PlaceComponent>
	availableDeliveryMethod?:
		| DeliveryMethod
		| ReturnType<typeof DeliveryMethodComponent>
	businessFunction?:
		| BusinessFunction
		| ReturnType<typeof BusinessFunctionComponent>
	category?:
		| CategoryCode
		| PhysicalActivityCategory
		| Text
		| Thing
		| URL
		| ReturnType<typeof CategoryCodeComponent>
		| ReturnType<typeof PhysicalActivityCategoryComponent>
		| ReturnType<typeof ThingComponent>
	checkoutPageURLTemplate?: Text
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
	hasAdultConsideration?:
		| AdultOrientedEnumeration
		| ReturnType<typeof AdultOrientedEnumerationComponent>
	hasGS1DigitalLink?: URL
	hasMeasurement?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	hasMerchantReturnPolicy?:
		| MerchantReturnPolicy
		| ReturnType<typeof MerchantReturnPolicyComponent>
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
	isFamilyFriendly?: Boolean
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
	leaseLength?:
		| Duration
		| QuantitativeValue
		| ReturnType<typeof DurationComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	mobileUrl?: Text
	mpn?: Text
	offeredBy?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	price?: Number | Text
	priceCurrency?: Text
	priceSpecification?:
		| PriceSpecification
		| ReturnType<typeof PriceSpecificationComponent>
	priceValidUntil?: Date
	review?: Review | ReturnType<typeof ReviewComponent>
	reviews?: Review | ReturnType<typeof ReviewComponent>
	seller?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	serialNumber?: Text
	shippingDetails?:
		| OfferShippingDetails
		| ReturnType<typeof OfferShippingDetailsComponent>
	sku?: Text
	validForMemberTier?:
		| MemberProgramTier
		| ReturnType<typeof MemberProgramTierComponent>
	validFrom?: Date | DateTime
	validThrough?: Date | DateTime
	warranty?: WarrantyPromise | ReturnType<typeof WarrantyPromiseComponent>
}

type Offer = Thing & IntangibleProps & OfferProps

export default Offer
