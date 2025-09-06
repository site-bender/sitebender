import type { Text, URL } from "../../../DataType/index.ts"
import type Certification from "../../CreativeWork/Certification/index.ts"
import type ImageObject from "../../CreativeWork/MediaObject/ImageObject/index.ts"
import type Review from "../../CreativeWork/Review/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type Place from "../../Place/index.ts"
import type Product from "../../Product/index.ts"
import type Audience from "../Audience/index.ts"
import type Brand from "../Brand/index.ts"
import type CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import type Demand from "../Demand/index.ts"
import type GovernmentBenefitsType from "../Enumeration/GovernmentBenefitsType/index.ts"
import type PhysicalActivityCategory from "../Enumeration/PhysicalActivityCategory/index.ts"
import type { IntangibleProps } from "../index.ts"
import type OfferCatalog from "../ItemList/OfferCatalog/index.ts"
import type Offer from "../Offer/index.ts"
import type AggregateRating from "../Rating/AggregateRating/index.ts"
import type ServiceChannel from "../ServiceChannel/index.ts"
import type GeoShape from "../StructuredValue/GeoShape/index.ts"
import type OpeningHoursSpecification from "../StructuredValue/OpeningHoursSpecification/index.ts"
import type { BroadcastServiceType } from "./BroadcastService/index.ts"
import type { CableOrSatelliteServiceType } from "./CableOrSatelliteService/index.ts"
import type { FinancialProductType } from "./FinancialProduct/index.ts"
import type { FoodServiceType } from "./FoodService/index.ts"
import type { GovernmentServiceType } from "./GovernmentService/index.ts"
import type { TaxiType } from "./Taxi/index.ts"
import type { TaxiServiceType } from "./TaxiService/index.ts"
import type { WebAPIType } from "./WebAPI/index.ts"

import { AdministrativeArea as AdministrativeAreaComponent } from "../../../../../components/index.tsx"
import { AggregateRating as AggregateRatingComponent } from "../../../../../components/index.tsx"
import { Audience as AudienceComponent } from "../../../../../components/index.tsx"
import { Brand as BrandComponent } from "../../../../../components/index.tsx"
import { CategoryCode as CategoryCodeComponent } from "../../../../../components/index.tsx"
import { Certification as CertificationComponent } from "../../../../../components/index.tsx"
import { Demand as DemandComponent } from "../../../../../components/index.tsx"
import { GeoShape as GeoShapeComponent } from "../../../../../components/index.tsx"
import { GovernmentBenefitsType as GovernmentBenefitsTypeComponent } from "../../../../../components/index.tsx"
import { ImageObject as ImageObjectComponent } from "../../../../../components/index.tsx"
import { Offer as OfferComponent } from "../../../../../components/index.tsx"
import { OfferCatalog as OfferCatalogComponent } from "../../../../../components/index.tsx"
import { OpeningHoursSpecification as OpeningHoursSpecificationComponent } from "../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../components/index.tsx"
import { PhysicalActivityCategory as PhysicalActivityCategoryComponent } from "../../../../../components/index.tsx"
import { Place as PlaceComponent } from "../../../../../components/index.tsx"
import { Product as ProductComponent } from "../../../../../components/index.tsx"
import { Review as ReviewComponent } from "../../../../../components/index.tsx"
import { Service as ServiceComponent } from "../../../../../components/index.tsx"
import { ServiceChannel as ServiceChannelComponent } from "../../../../../components/index.tsx"
import { Thing as ThingComponent } from "../../../../../components/index.tsx"

export type ServiceType =
	| "Service"
	| TaxiServiceType
	| FinancialProductType
	| FoodServiceType
	| CableOrSatelliteServiceType
	| TaxiType
	| WebAPIType
	| BroadcastServiceType
	| GovernmentServiceType

export interface ServiceProps {
	"@type"?: ServiceType
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
	audience?: Audience | ReturnType<typeof AudienceComponent>
	availableChannel?:
		| ServiceChannel
		| ReturnType<typeof ServiceChannelComponent>
	award?: Text
	brand?:
		| Brand
		| Organization
		| ReturnType<typeof BrandComponent>
		| ReturnType<typeof OrganizationComponent>
	broker?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	category?:
		| CategoryCode
		| PhysicalActivityCategory
		| Text
		| Thing
		| URL
		| ReturnType<typeof CategoryCodeComponent>
		| ReturnType<typeof PhysicalActivityCategoryComponent>
		| ReturnType<typeof ThingComponent>
	hasCertification?: Certification | ReturnType<typeof CertificationComponent>
	hasOfferCatalog?: OfferCatalog | ReturnType<typeof OfferCatalogComponent>
	hoursAvailable?:
		| OpeningHoursSpecification
		| ReturnType<typeof OpeningHoursSpecificationComponent>
	isRelatedTo?:
		| Product
		| Service
		| ReturnType<typeof ProductComponent>
		| ReturnType<typeof ServiceComponent>
	isSimilarTo?:
		| Product
		| Service
		| ReturnType<typeof ProductComponent>
		| ReturnType<typeof ServiceComponent>
	logo?: ImageObject | URL | ReturnType<typeof ImageObjectComponent>
	offers?:
		| Demand
		| Offer
		| ReturnType<typeof DemandComponent>
		| ReturnType<typeof OfferComponent>
	produces?: Thing | ReturnType<typeof ThingComponent>
	provider?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	providerMobility?: Text
	review?: Review | ReturnType<typeof ReviewComponent>
	serviceArea?:
		| AdministrativeArea
		| GeoShape
		| Place
		| ReturnType<typeof AdministrativeAreaComponent>
		| ReturnType<typeof GeoShapeComponent>
		| ReturnType<typeof PlaceComponent>
	serviceAudience?: Audience | ReturnType<typeof AudienceComponent>
	serviceOutput?: Thing | ReturnType<typeof ThingComponent>
	serviceType?:
		| GovernmentBenefitsType
		| Text
		| ReturnType<typeof GovernmentBenefitsTypeComponent>
	slogan?: Text
	termsOfService?: Text | URL
}

type Service = Thing & IntangibleProps & ServiceProps

export default Service
