import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type AggregateRating from "../Rating/AggregateRating/index.ts"
import type Audience from "../Audience/index.ts"
import type Brand from "../Brand/index.ts"
import type CategoryCode from "../DefinedTerm/CategoryCode/index.ts"
import type Certification from "../../CreativeWork/Certification/index.ts"
import type Demand from "../Demand/index.ts"
import type GeoShape from "../StructuredValue/GeoShape/index.ts"
import type GovernmentBenefitsType from "../Enumeration/GovernmentBenefitsType/index.ts"
import type ImageObject from "../../CreativeWork/MediaObject/ImageObject/index.ts"
import type Offer from "../Offer/index.ts"
import type OfferCatalog from "../ItemList/OfferCatalog/index.ts"
import type OpeningHoursSpecification from "../StructuredValue/OpeningHoursSpecification/index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type PhysicalActivityCategory from "../Enumeration/PhysicalActivityCategory/index.ts"
import type Place from "../../Place/index.ts"
import type Product from "../../Product/index.ts"
import type Review from "../../CreativeWork/Review/index.ts"
import type ServiceChannel from "../ServiceChannel/index.ts"

import ServiceComponent from "../../../../../components/Thing/Intangible/Service/index.tsx"

export interface ServiceProps {
	aggregateRating?: AggregateRating
	areaServed?: AdministrativeArea | GeoShape | Place | Text
	audience?: Audience
	availableChannel?: ServiceChannel
	award?: Text
	brand?: Brand | Organization
	broker?: Organization | Person
	category?: CategoryCode | PhysicalActivityCategory | Text | Thing | URL
	hasCertification?: Certification
	hasOfferCatalog?: OfferCatalog
	hoursAvailable?: OpeningHoursSpecification
	isRelatedTo?: Product | Service
	isSimilarTo?: Product | Service
	logo?: ImageObject | URL
	offers?: Demand | Offer
	produces?: Thing
	provider?: Organization | Person
	providerMobility?: Text
	review?: Review
	serviceArea?: AdministrativeArea | GeoShape | Place
	serviceAudience?: Audience
	serviceOutput?: Thing
	serviceType?: GovernmentBenefitsType | Text
	slogan?: Text
	termsOfService?: Text | URL
}

type Service =
	& Thing
	& IntangibleProps
	& ServiceProps

export default Service
