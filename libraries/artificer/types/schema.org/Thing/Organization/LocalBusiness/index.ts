import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { PlaceProps } from "../../Place/index.ts"
import type Organization from "../index.ts"
import type { OrganizationProps } from "../index.ts"
import type { AnimalShelterType } from "./AnimalShelter/index.ts"
import type { ArchiveOrganizationType } from "./ArchiveOrganization/index.ts"
import type { AutomotiveBusinessType } from "./AutomotiveBusiness/index.ts"
import type { ChildCareType } from "./ChildCare/index.ts"
import type { DentistType } from "./Dentist/index.ts"
import type { DryCleaningOrLaundryType } from "./DryCleaningOrLaundry/index.ts"
import type { EmergencyServiceType } from "./EmergencyService/index.ts"
import type { EmploymentAgencyType } from "./EmploymentAgency/index.ts"
import type { EntertainmentBusinessType } from "./EntertainmentBusiness/index.ts"
import type { FinancialServiceType } from "./FinancialService/index.ts"
import type { FoodEstablishmentType } from "./FoodEstablishment/index.ts"
import type { GovernmentOfficeType } from "./GovernmentOffice/index.ts"
import type { HealthAndBeautyBusinessType } from "./HealthAndBeautyBusiness/index.ts"
import type { HomeAndConstructionBusinessType } from "./HomeAndConstructionBusiness/index.ts"
import type { InternetCafeType } from "./InternetCafe/index.ts"
import type { LegalServiceType } from "./LegalService/index.ts"
import type { LibraryType } from "./Library/index.ts"
import type { LodgingBusinessType } from "./LodgingBusiness/index.ts"
import type { MedicalBusinessType } from "./MedicalBusiness/index.ts"
import type { ProfessionalServiceType } from "./ProfessionalService/index.ts"
import type { RadioStationType } from "./RadioStation/index.ts"
import type { RealEstateAgentType } from "./RealEstateAgent/index.ts"
import type { RecyclingCenterType } from "./RecyclingCenter/index.ts"
import type { SelfStorageType } from "./SelfStorage/index.ts"
import type { ShoppingCenterType } from "./ShoppingCenter/index.ts"
import type { SportsActivityLocationType } from "./SportsActivityLocation/index.ts"
import type { StoreType } from "./Store/index.ts"
import type { TelevisionStationType } from "./TelevisionStation/index.ts"
import type { TouristInformationCenterType } from "./TouristInformationCenter/index.ts"
import type { TravelAgencyType } from "./TravelAgency/index.ts"

import OrganizationComponent from "../../../../../../pagewright/src/define/Thing/Organization/index.tsx"

export type LocalBusinessType =
	| "LocalBusiness"
	| ShoppingCenterType
	| SportsActivityLocationType
	| GovernmentOfficeType
	| EntertainmentBusinessType
	| RecyclingCenterType
	| ArchiveOrganizationType
	| RadioStationType
	| ProfessionalServiceType
	| MedicalBusinessType
	| RealEstateAgentType
	| LibraryType
	| TouristInformationCenterType
	| DentistType
	| SelfStorageType
	| TravelAgencyType
	| FinancialServiceType
	| EmergencyServiceType
	| ChildCareType
	| DryCleaningOrLaundryType
	| TelevisionStationType
	| LegalServiceType
	| EmploymentAgencyType
	| AutomotiveBusinessType
	| InternetCafeType
	| HealthAndBeautyBusinessType
	| FoodEstablishmentType
	| AnimalShelterType
	| HomeAndConstructionBusinessType
	| StoreType
	| LodgingBusinessType

export interface LocalBusinessProps {
	"@type"?: LocalBusinessType
	branchOf?: Organization | ReturnType<typeof OrganizationComponent>
	currenciesAccepted?: Text
	openingHours?: Text
	paymentAccepted?: Text
	priceRange?: Text
}

type LocalBusiness = Thing & PlaceProps & OrganizationProps & LocalBusinessProps

export default LocalBusiness
