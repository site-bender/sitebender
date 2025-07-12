import type { Text } from "../DataType/index.ts"
import type { Action } from "./Action/index.ts"
import type { CreativeWork } from "./CreativeWork/index.ts"
import type { Event } from "./Event/index.ts"

export type URL = string

// Additional basic types for Person
export type EducationalOrganization = string
export type ContactPoint = string
export type GenderType = string
export type Certification = string
export type EducationalOccupationalCredential = string
export type Occupation = string
export type OfferCatalog = string
export type Distance = string
export type MemberProgramTier = string
export type ProgramMembership = string
export type MonetaryAmount = string
export type PriceSpecification = string
export type OwnershipInfo = string
export type Mass = string

// Additional basic types for Organization
export type LoanOrCredit = string
export type PaymentMethod = string
export type NewsMediaOrganization = string
export type AdministrativeArea = string
export type GeoShape = string
export type Article = string
export type OpeningHoursSpecification = string
export type EducationalOccupationalProgram = string
export type Nonprofit501c3 = string
export type Nonprofit501c2 = string
export type Nonprofit501c4 = string
export type Nonprofit501c6 = string
export type Nonprofit501c12 = string
export type Nonprofit501c13 = string
export type Nonprofit501c19 = string
export type Nonprofit501c20 = string
export type Nonprofit501c21 = string
export type Nonprofit501c22 = string
export type Nonprofit501c23 = string
export type Nonprofit501c25 = string
export type Nonprofit501c26 = string
export type Nonprofit501c27 = string
export type Nonprofit501c28 = string
export type UniversityOrCollegeClassification = string
export type MerchantReturnPolicy = string
export type ProductReturnPolicy = string
export type NonprofitType = string

// Additional basic types for Place
export type LocationFeatureSpecification = string
export type GeoCoordinates = string
export type GeospatialGeometry = string
export type Map = string
export type Photograph = string

// Additional basic types for Product
export type CategoryCode = string
export type PhysicalActivityCategory = string
export type AdultOrientedEnumeration = string
export type EnergyConsumptionDetails = string
export type Service = string
export type OfferItemCondition = string
export type ProductModel = string
export type ListItem = string
export type WebContent = string

// Placeholder types for complex Schema.org objects (temporary string aliases)
export type TextObject = string
export type ImageObject = string

// Additional placeholders needed for PropertyValue
export type DefinedTermSet = string
export type MeasurementMethodEnum = string
export type MeasurementTypeEnumeration = string

export type QualitativeValue = string

// Additional placeholders needed for Action
export type HowTo = string
export type ActionStatusType = string
export type PostalAddress = string
export type VirtualLocation = string
export type EntryPoint = string

// Additional placeholders needed for Event
export type PerformingGroup = string
export type EventAttendanceModeEnumeration = string
export type Schedule = string
export type EventStatusType = string

// Additional placeholders needed for CreativeWork
export type ItemList = string
export type AggregateRating = string
export type MediaObject = string

export type AudioObject = string
export type Clip = string
export type MusicRecording = string
export type Comment = string
export type CorrectionComment = string
export type Country = string
export type AlignmentObject = string
export type InteractionCounter = string
export type Claim = string
export type Grant = string
export type Demand = string
export type Offer = string
export type PublicationEvent = string
export type Review = string
export type SizeSpecification = string
export type Duration = string
export type VideoObject = string

export type PropertyValue = string
export type Class = string
export type Property = string

// Thing interface - the base Schema.org type
export interface Thing {
	additionalType?: Text | URL
	alternateName?: Text
	description?: Text | TextObject
	disambiguatingDescription?: Text
	identifier?: PropertyValue | Text | URL
	image?: ImageObject | URL
	mainEntityOfPage?: CreativeWork | URL
	name?: Text
	potentialAction?: Action
	sameAs?: URL
	subjectOf?: CreativeWork | Event
	url?: URL
}
