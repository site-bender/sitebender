import type Thing from "../index.ts"
import type { ActionAccessSpecificationType } from "./ActionAccessSpecification/index.ts"
import type { AlignmentObjectType } from "./AlignmentObject/index.ts"
import type { AudienceType } from "./Audience/index.ts"
import type { BedDetailsType } from "./BedDetails/index.ts"
import type { BrandType } from "./Brand/index.ts"
import type { BroadcastChannelType } from "./BroadcastChannel/index.ts"
import type { BroadcastFrequencySpecificationType } from "./BroadcastFrequencySpecification/index.ts"
import type { ClassType } from "./Class/index.ts"
import type { ComputerLanguageType } from "./ComputerLanguage/index.ts"
import type { ConstraintNodeType } from "./ConstraintNode/index.ts"
import type { DataFeedItemType } from "./DataFeedItem/index.ts"
import type { DefinedTermType } from "./DefinedTerm/index.ts"
import type { DemandType } from "./Demand/index.ts"
import type { DigitalDocumentPermissionType } from "./DigitalDocumentPermission/index.ts"
import type { EducationalOccupationalProgramType } from "./EducationalOccupationalProgram/index.ts"
import type { EnergyConsumptionDetailsType } from "./EnergyConsumptionDetails/index.ts"
import type { EntryPointType } from "./EntryPoint/index.ts"
import type { EnumerationType } from "./Enumeration/index.ts"
import type { FinancialIncentiveType } from "./FinancialIncentive/index.ts"
import type { FloorPlanType } from "./FloorPlan/index.ts"
import type { GameServerType } from "./GameServer/index.ts"
import type { GeospatialGeometryType } from "./GeospatialGeometry/index.ts"
import type { GrantType } from "./Grant/index.ts"
import type { HealthInsurancePlanType } from "./HealthInsurancePlan/index.ts"
import type { HealthPlanCostSharingSpecificationType } from "./HealthPlanCostSharingSpecification/index.ts"
import type { HealthPlanFormularyType } from "./HealthPlanFormulary/index.ts"
import type { HealthPlanNetworkType } from "./HealthPlanNetwork/index.ts"
import type { InvoiceType } from "./Invoice/index.ts"
import type { ItemListType } from "./ItemList/index.ts"
import type { JobPostingType } from "./JobPosting/index.ts"
import type { LanguageType } from "./Language/index.ts"
import type { ListItemType } from "./ListItem/index.ts"
import type { MediaSubscriptionType } from "./MediaSubscription/index.ts"
import type { MemberProgramType } from "./MemberProgram/index.ts"
import type { MemberProgramTierType } from "./MemberProgramTier/index.ts"
import type { MenuItemType } from "./MenuItem/index.ts"
import type { MerchantReturnPolicyType } from "./MerchantReturnPolicy/index.ts"
import type { MerchantReturnPolicySeasonalOverrideType } from "./MerchantReturnPolicySeasonalOverride/index.ts"
import type { ObservationType } from "./Observation/index.ts"
import type { OccupationType } from "./Occupation/index.ts"
import type { OccupationalExperienceRequirementsType } from "./OccupationalExperienceRequirements/index.ts"
import type { OfferType } from "./Offer/index.ts"
import type { OrderType } from "./Order/index.ts"
import type { OrderItemType } from "./OrderItem/index.ts"
import type { ParcelDeliveryType } from "./ParcelDelivery/index.ts"
import type { PaymentMethodType } from "./PaymentMethod/index.ts"
import type { PermitType } from "./Permit/index.ts"
import type { ProgramMembershipType } from "./ProgramMembership/index.ts"
import type { PropertyType } from "./Property/index.ts"
import type { PropertyValueSpecificationType } from "./PropertyValueSpecification/index.ts"
import type { QuantityType } from "./Quantity/index.ts"
import type { RatingType } from "./Rating/index.ts"
import type { ReservationType } from "./Reservation/index.ts"
import type { RoleType } from "./Role/index.ts"
import type { ScheduleType } from "./Schedule/index.ts"
import type { SeatType } from "./Seat/index.ts"
import type { SeriesType } from "./Series/index.ts"
import type { ServiceType } from "./Service/index.ts"
import type { ServiceChannelType } from "./ServiceChannel/index.ts"
import type { SpeakableSpecificationType } from "./SpeakableSpecification/index.ts"
import type { StatisticalPopulationType } from "./StatisticalPopulation/index.ts"
import type { StructuredValueType } from "./StructuredValue/index.ts"
import type { TicketType } from "./Ticket/index.ts"
import type { TripType } from "./Trip/index.ts"
import type { VirtualLocationType } from "./VirtualLocation/index.ts"

export type IntangibleType =
	| "Intangible"
	| SeriesType
	| OrderType
	| MerchantReturnPolicyType
	| OfferType
	| HealthPlanFormularyType
	| HealthPlanCostSharingSpecificationType
	| ConstraintNodeType
	| DataFeedItemType
	| HealthInsurancePlanType
	| ScheduleType
	| DefinedTermType
	| RoleType
	| OccupationType
	| RatingType
	| PaymentMethodType
	| HealthPlanNetworkType
	| GameServerType
	| StructuredValueType
	| MerchantReturnPolicySeasonalOverrideType
	| PropertyType
	| BedDetailsType
	| ItemListType
	| OccupationalExperienceRequirementsType
	| VirtualLocationType
	| GeospatialGeometryType
	| BrandType
	| EnumerationType
	| StatisticalPopulationType
	| JobPostingType
	| PropertyValueSpecificationType
	| ReservationType
	| MenuItemType
	| LanguageType
	| PermitType
	| FinancialIncentiveType
	| QuantityType
	| ActionAccessSpecificationType
	| BroadcastFrequencySpecificationType
	| ProgramMembershipType
	| ListItemType
	| ComputerLanguageType
	| BroadcastChannelType
	| SpeakableSpecificationType
	| MemberProgramType
	| TripType
	| MemberProgramTierType
	| MediaSubscriptionType
	| FloorPlanType
	| DigitalDocumentPermissionType
	| AlignmentObjectType
	| EntryPointType
	| ClassType
	| TicketType
	| OrderItemType
	| ParcelDeliveryType
	| ServiceType
	| ServiceChannelType
	| AudienceType
	| DemandType
	| EnergyConsumptionDetailsType
	| EducationalOccupationalProgramType
	| ObservationType
	| GrantType
	| SeatType
	| InvoiceType

export interface IntangibleProps {
	"@type"?: IntangibleType
}

type Intangible = Thing & IntangibleProps

export default Intangible
