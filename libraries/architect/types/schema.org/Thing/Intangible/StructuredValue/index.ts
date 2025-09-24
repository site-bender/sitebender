import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type { CDCPMDRecordType } from "./CDCPMDRecord/index.ts"
import type { ContactPointType } from "./ContactPoint/index.ts"
import type { DatedMoneySpecificationType } from "./DatedMoneySpecification/index.ts"
import type { DefinedRegionType } from "./DefinedRegion/index.ts"
import type { EngineSpecificationType } from "./EngineSpecification/index.ts"
import type { ExchangeRateSpecificationType } from "./ExchangeRateSpecification/index.ts"
import type { GeoCoordinatesType } from "./GeoCoordinates/index.ts"
import type { GeoShapeType } from "./GeoShape/index.ts"
import type { InteractionCounterType } from "./InteractionCounter/index.ts"
import type { MonetaryAmountType } from "./MonetaryAmount/index.ts"
import type { NutritionInformationType } from "./NutritionInformation/index.ts"
import type { OfferShippingDetailsType } from "./OfferShippingDetails/index.ts"
import type { OpeningHoursSpecificationType } from "./OpeningHoursSpecification/index.ts"
import type { OwnershipInfoType } from "./OwnershipInfo/index.ts"
import type { PostalCodeRangeSpecificationType } from "./PostalCodeRangeSpecification/index.ts"
import type { PriceSpecificationType } from "./PriceSpecification/index.ts"
import type { PropertyValueType } from "./PropertyValue/index.ts"
import type { QuantitativeValueType } from "./QuantitativeValue/index.ts"
import type { QuantitativeValueDistributionType } from "./QuantitativeValueDistribution/index.ts"
import type { RepaymentSpecificationType } from "./RepaymentSpecification/index.ts"
import type { ServicePeriodType } from "./ServicePeriod/index.ts"
import type { ShippingConditionsType } from "./ShippingConditions/index.ts"
import type { ShippingDeliveryTimeType } from "./ShippingDeliveryTime/index.ts"
import type { ShippingRateSettingsType } from "./ShippingRateSettings/index.ts"
import type { ShippingServiceType } from "./ShippingService/index.ts"
import type { TypeAndQuantityNodeType } from "./TypeAndQuantityNode/index.ts"
import type { WarrantyPromiseType } from "./WarrantyPromise/index.ts"

export type StructuredValueType =
	| "StructuredValue"
	| ShippingDeliveryTimeType
	| PriceSpecificationType
	| CDCPMDRecordType
	| GeoShapeType
	| ServicePeriodType
	| QuantitativeValueType
	| TypeAndQuantityNodeType
	| RepaymentSpecificationType
	| ContactPointType
	| OpeningHoursSpecificationType
	| OwnershipInfoType
	| InteractionCounterType
	| PropertyValueType
	| DatedMoneySpecificationType
	| ExchangeRateSpecificationType
	| WarrantyPromiseType
	| DefinedRegionType
	| ShippingRateSettingsType
	| MonetaryAmountType
	| ShippingConditionsType
	| OfferShippingDetailsType
	| GeoCoordinatesType
	| NutritionInformationType
	| ShippingServiceType
	| QuantitativeValueDistributionType
	| EngineSpecificationType
	| PostalCodeRangeSpecificationType

export interface StructuredValueProps {
	"@type"?: StructuredValueType
}

type StructuredValue = Thing & IntangibleProps & StructuredValueProps

export default StructuredValue
