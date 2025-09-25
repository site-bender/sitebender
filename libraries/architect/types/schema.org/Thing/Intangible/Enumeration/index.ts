import type Thing from "../../index.ts"
import type Class from "../Class/index.ts"
import type { IntangibleProps } from "../index.ts"
import type Property from "../Property/index.ts"
import type { AdultOrientedEnumerationType } from "./AdultOrientedEnumeration/index.ts"
import type { BoardingPolicyTypeType } from "./BoardingPolicyType/index.ts"
import type { BookFormatTypeType } from "./BookFormatType/index.ts"
import type { BusinessEntityTypeType } from "./BusinessEntityType/index.ts"
import type { BusinessFunctionType } from "./BusinessFunction/index.ts"
import type { CarUsageTypeType } from "./CarUsageType/index.ts"
import type { CertificationStatusEnumerationType } from "./CertificationStatusEnumeration/index.ts"
import type { ContactPointOptionType } from "./ContactPointOption/index.ts"
import type { DayOfWeekType } from "./DayOfWeek/index.ts"
import type { DeliveryMethodType } from "./DeliveryMethod/index.ts"
import type { DigitalDocumentPermissionTypeType } from "./DigitalDocumentPermissionType/index.ts"
import type { DigitalPlatformEnumerationType } from "./DigitalPlatformEnumeration/index.ts"
import type { EnergyEfficiencyEnumerationType } from "./EnergyEfficiencyEnumeration/index.ts"
import type { EventAttendanceModeEnumerationType } from "./EventAttendanceModeEnumeration/index.ts"
import type { FulfillmentTypeEnumerationType } from "./FulfillmentTypeEnumeration/index.ts"
import type { GameAvailabilityEnumerationType } from "./GameAvailabilityEnumeration/index.ts"
import type { GamePlayModeType } from "./GamePlayMode/index.ts"
import type { GenderTypeType } from "./GenderType/index.ts"
import type { GovernmentBenefitsTypeType } from "./GovernmentBenefitsType/index.ts"
import type { HealthAspectEnumerationType } from "./HealthAspectEnumeration/index.ts"
import type { IncentiveQualifiedExpenseTypeType } from "./IncentiveQualifiedExpenseType/index.ts"
import type { IncentiveStatusType } from "./IncentiveStatus/index.ts"
import type { IncentiveTypeType } from "./IncentiveType/index.ts"
import type { ItemAvailabilityType } from "./ItemAvailability/index.ts"
import type { ItemListOrderTypeType } from "./ItemListOrderType/index.ts"
import type { LegalValueLevelType } from "./LegalValueLevel/index.ts"
import type { MapCategoryTypeType } from "./MapCategoryType/index.ts"
import type { MeasurementMethodEnumType } from "./MeasurementMethodEnum/index.ts"
import type { MeasurementTypeEnumerationType } from "./MeasurementTypeEnumeration/index.ts"
import type { MediaEnumerationType } from "./MediaEnumeration/index.ts"
import type { MediaManipulationRatingEnumerationType } from "./MediaManipulationRatingEnumeration/index.ts"
import type { MedicalEnumerationType } from "./MedicalEnumeration/index.ts"
import type { MerchantReturnEnumerationType } from "./MerchantReturnEnumeration/index.ts"
import type { MusicAlbumProductionTypeType } from "./MusicAlbumProductionType/index.ts"
import type { MusicAlbumReleaseTypeType } from "./MusicAlbumReleaseType/index.ts"
import type { MusicReleaseFormatTypeType } from "./MusicReleaseFormatType/index.ts"
import type { NonprofitTypeType } from "./NonprofitType/index.ts"
import type { OfferItemConditionType } from "./OfferItemCondition/index.ts"
import type { PaymentMethodTypeType } from "./PaymentMethodType/index.ts"
import type { PhysicalActivityCategoryType } from "./PhysicalActivityCategory/index.ts"
import type { PriceComponentTypeEnumerationType } from "./PriceComponentTypeEnumeration/index.ts"
import type { PriceTypeEnumerationType } from "./PriceTypeEnumeration/index.ts"
import type { PurchaseTypeType } from "./PurchaseType/index.ts"
import type { QualitativeValueType } from "./QualitativeValue/index.ts"
import type { RefundTypeEnumerationType } from "./RefundTypeEnumeration/index.ts"
import type { RestrictedDietType } from "./RestrictedDiet/index.ts"
import type { ReturnFeesEnumerationType } from "./ReturnFeesEnumeration/index.ts"
import type { ReturnLabelSourceEnumerationType } from "./ReturnLabelSourceEnumeration/index.ts"
import type { ReturnMethodEnumerationType } from "./ReturnMethodEnumeration/index.ts"
import type { RsvpResponseTypeType } from "./RsvpResponseType/index.ts"
import type { SizeGroupEnumerationType } from "./SizeGroupEnumeration/index.ts"
import type { SizeSystemEnumerationType } from "./SizeSystemEnumeration/index.ts"
import type { SpecialtyType } from "./Specialty/index.ts"
import type { StatusEnumerationType } from "./StatusEnumeration/index.ts"
import type { TierBenefitEnumerationType } from "./TierBenefitEnumeration/index.ts"
import type { WarrantyScopeType } from "./WarrantyScope/index.ts"

import ClassComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Class/index.tsx"
import EnumerationComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/index.tsx"
import PropertyComponent from "../../../../../../pagewright/src/define/Thing/Intangible/Property/index.tsx"

export type EnumerationType =
	| "Enumeration"
	| ContactPointOptionType
	| TierBenefitEnumerationType
	| ItemListOrderTypeType
	| GamePlayModeType
	| MusicAlbumProductionTypeType
	| OfferItemConditionType
	| BoardingPolicyTypeType
	| GenderTypeType
	| PriceTypeEnumerationType
	| MediaManipulationRatingEnumerationType
	| CertificationStatusEnumerationType
	| IncentiveStatusType
	| MerchantReturnEnumerationType
	| HealthAspectEnumerationType
	| PhysicalActivityCategoryType
	| MusicAlbumReleaseTypeType
	| SizeGroupEnumerationType
	| WarrantyScopeType
	| MapCategoryTypeType
	| RestrictedDietType
	| BusinessFunctionType
	| CarUsageTypeType
	| EventAttendanceModeEnumerationType
	| DigitalPlatformEnumerationType
	| QualitativeValueType
	| MedicalEnumerationType
	| AdultOrientedEnumerationType
	| StatusEnumerationType
	| ReturnLabelSourceEnumerationType
	| DeliveryMethodType
	| GameAvailabilityEnumerationType
	| PriceComponentTypeEnumerationType
	| IncentiveQualifiedExpenseTypeType
	| SpecialtyType
	| RsvpResponseTypeType
	| NonprofitTypeType
	| IncentiveTypeType
	| MediaEnumerationType
	| LegalValueLevelType
	| MusicReleaseFormatTypeType
	| BusinessEntityTypeType
	| ReturnMethodEnumerationType
	| DigitalDocumentPermissionTypeType
	| DayOfWeekType
	| RefundTypeEnumerationType
	| BookFormatTypeType
	| GovernmentBenefitsTypeType
	| FulfillmentTypeEnumerationType
	| SizeSystemEnumerationType
	| PaymentMethodTypeType
	| ReturnFeesEnumerationType
	| MeasurementTypeEnumerationType
	| MeasurementMethodEnumType
	| PurchaseTypeType
	| EnergyEfficiencyEnumerationType
	| ItemAvailabilityType

export interface EnumerationProps {
	"@type"?: EnumerationType
	supersededBy?:
		| Class
		| Enumeration
		| Property
		| ReturnType<typeof ClassComponent>
		| ReturnType<typeof EnumerationComponent>
		| ReturnType<typeof PropertyComponent>
}

type Enumeration = Thing & IntangibleProps & EnumerationProps

export default Enumeration
