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

import CreativeWorkComponent from "../../../../components/Thing/CreativeWork/index.ts"
import ReviewComponent from "../../../../components/Thing/CreativeWork/Review/index.ts"
import EventComponent from "../../../../components/Thing/Event/index.ts"
import ThingComponent from "../../../../components/Thing/index.ts"
import CategoryCodeComponent from "../../../../components/Thing/Intangible/DefinedTerm/CategoryCode/index.ts"
import AdultOrientedEnumerationComponent from "../../../../components/Thing/Intangible/Enumeration/AdultOrientedEnumeration/index.ts"
import BusinessEntityTypeComponent from "../../../../components/Thing/Intangible/Enumeration/BusinessEntityType/index.ts"
import BusinessFunctionComponent from "../../../../components/Thing/Intangible/Enumeration/BusinessFunction/index.ts"
import DeliveryMethodComponent from "../../../../components/Thing/Intangible/Enumeration/DeliveryMethod/index.ts"
import ItemAvailabilityComponent from "../../../../components/Thing/Intangible/Enumeration/ItemAvailability/index.ts"
import OfferItemConditionComponent from "../../../../components/Thing/Intangible/Enumeration/OfferItemCondition/index.ts"
import PhysicalActivityCategoryComponent from "../../../../components/Thing/Intangible/Enumeration/PhysicalActivityCategory/index.ts"
import MemberProgramTierComponent from "../../../../components/Thing/Intangible/MemberProgramTier/index.ts"
import MenuItemComponent from "../../../../components/Thing/Intangible/MenuItem/index.ts"
import MerchantReturnPolicyComponent from "../../../../components/Thing/Intangible/MerchantReturnPolicy/index.ts"
import AggregateOfferComponent from "../../../../components/Thing/Intangible/Offer/AggregateOffer/index.ts"
import OfferComponent from "../../../../components/Thing/Intangible/Offer/index.ts"
import PaymentMethodComponent from "../../../../components/Thing/Intangible/PaymentMethod/index.ts"
import DurationComponent from "../../../../components/Thing/Intangible/Quantity/Duration/index.ts"
import AggregateRatingComponent from "../../../../components/Thing/Intangible/Rating/AggregateRating/index.ts"
import LoanOrCreditComponent from "../../../../components/Thing/Intangible/Service/FinancialProduct/LoanOrCredit/index.ts"
import ServiceComponent from "../../../../components/Thing/Intangible/Service/index.ts"
import GeoShapeComponent from "../../../../components/Thing/Intangible/StructuredValue/GeoShape/index.ts"
import OfferShippingDetailsComponent from "../../../../components/Thing/Intangible/StructuredValue/OfferShippingDetails/index.ts"
import PriceSpecificationComponent from "../../../../components/Thing/Intangible/StructuredValue/PriceSpecification/index.ts"
import PropertyValueComponent from "../../../../components/Thing/Intangible/StructuredValue/PropertyValue/index.ts"
import QuantitativeValueComponent from "../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import TypeAndQuantityNodeComponent from "../../../../components/Thing/Intangible/StructuredValue/TypeAndQuantityNode/index.ts"
import WarrantyPromiseComponent from "../../../../components/Thing/Intangible/StructuredValue/WarrantyPromise/index.ts"
import TripComponent from "../../../../components/Thing/Intangible/Trip/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"
import AdministrativeAreaComponent from "../../../../components/Thing/Place/AdministrativeArea/index.ts"
import PlaceComponent from "../../../../components/Thing/Place/index.ts"
import ProductComponent from "../../../../components/Thing/Product/index.ts"

export interface OfferProps {
	"@type"?: "Offer"
	acceptedPaymentMethod?:
		| LoanOrCredit
		| PaymentMethod
		| Text
		| ReturnType<typeof LoanOrCreditComponent>
		| ReturnType<typeof PaymentMethodComponent>
	additionalProperty?: PropertyValue | ReturnType<typeof PropertyValueComponent>
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
