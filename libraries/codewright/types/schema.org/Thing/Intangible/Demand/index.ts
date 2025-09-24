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

import CreativeWorkComponent from "../../../../../src/define/Thing/CreativeWork/index.tsx"
import EventComponent from "../../../../../src/define/Thing/Event/index.tsx"
import BusinessEntityTypeComponent from "../../../../../src/define/Thing/Intangible/Enumeration/BusinessEntityType/index.tsx"
import BusinessFunctionComponent from "../../../../../src/define/Thing/Intangible/Enumeration/BusinessFunction/index.tsx"
import DeliveryMethodComponent from "../../../../../src/define/Thing/Intangible/Enumeration/DeliveryMethod/index.tsx"
import ItemAvailabilityComponent from "../../../../../src/define/Thing/Intangible/Enumeration/ItemAvailability/index.tsx"
import OfferItemConditionComponent from "../../../../../src/define/Thing/Intangible/Enumeration/OfferItemCondition/index.tsx"
import MenuItemComponent from "../../../../../src/define/Thing/Intangible/MenuItem/index.tsx"
import AggregateOfferComponent from "../../../../../src/define/Thing/Intangible/Offer/AggregateOffer/index.tsx"
import PaymentMethodComponent from "../../../../../src/define/Thing/Intangible/PaymentMethod/index.tsx"
import LoanOrCreditComponent from "../../../../../src/define/Thing/Intangible/Service/FinancialProduct/LoanOrCredit/index.tsx"
import ServiceComponent from "../../../../../src/define/Thing/Intangible/Service/index.tsx"
import GeoShapeComponent from "../../../../../src/define/Thing/Intangible/StructuredValue/GeoShape/index.tsx"
import PriceSpecificationComponent from "../../../../../src/define/Thing/Intangible/StructuredValue/PriceSpecification/index.tsx"
import QuantitativeValueComponent from "../../../../../src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import TypeAndQuantityNodeComponent from "../../../../../src/define/Thing/Intangible/StructuredValue/TypeAndQuantityNode/index.tsx"
import WarrantyPromiseComponent from "../../../../../src/define/Thing/Intangible/StructuredValue/WarrantyPromise/index.tsx"
import TripComponent from "../../../../../src/define/Thing/Intangible/Trip/index.tsx"
import OrganizationComponent from "../../../../../src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../src/define/Thing/Person/index.tsx"
import AdministrativeAreaComponent from "../../../../../src/define/Thing/Place/AdministrativeArea/index.tsx"
import PlaceComponent from "../../../../../src/define/Thing/Place/index.tsx"
import ProductComponent from "../../../../../src/define/Thing/Product/index.tsx"

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
