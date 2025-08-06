import type {
	Boolean,
	Integer,
	Number,
	Text,
	URL,
} from "../../DataType/index.ts"
import type Certification from "../CreativeWork/Certification/index.ts"
import type Map from "../CreativeWork/Map/index.ts"
import type ImageObject from "../CreativeWork/MediaObject/ImageObject/index.ts"
import type Photograph from "../CreativeWork/Photograph/index.ts"
import type Review from "../CreativeWork/Review/index.ts"
import type Event from "../Event/index.ts"
import type Thing from "../index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type GeospatialGeometry from "../Intangible/GeospatialGeometry/index.ts"
import type AggregateRating from "../Intangible/Rating/AggregateRating/index.ts"
import type PostalAddress from "../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type GeoCoordinates from "../Intangible/StructuredValue/GeoCoordinates/index.ts"
import type GeoShape from "../Intangible/StructuredValue/GeoShape/index.ts"
import type OpeningHoursSpecification from "../Intangible/StructuredValue/OpeningHoursSpecification/index.ts"
import type PropertyValue from "../Intangible/StructuredValue/PropertyValue/index.ts"
import type LocationFeatureSpecification from "../Intangible/StructuredValue/PropertyValue/LocationFeatureSpecification/index.ts"
import type { AccommodationType } from "./Accommodation/index.ts"
import type { AdministrativeAreaType } from "./AdministrativeArea/index.ts"
import type { CivicStructureType } from "./CivicStructure/index.ts"
import type { LandformType } from "./Landform/index.ts"
import type { LandmarksOrHistoricalBuildingsType } from "./LandmarksOrHistoricalBuildings/index.ts"
import type { LocalBusinessType } from "./LocalBusiness/index.ts"
import type { ResidenceType } from "./Residence/index.ts"
import type { TouristAttractionType } from "./TouristAttraction/index.ts"
import type { TouristDestinationType } from "./TouristDestination/index.ts"

import { Certification as CertificationComponent } from "../../../../components/index.tsx"
import { Map as MapComponent } from "../../../../components/index.tsx"
import { ImageObject as ImageObjectComponent } from "../../../../components/index.tsx"
import { Photograph as PhotographComponent } from "../../../../components/index.tsx"
import { Review as ReviewComponent } from "../../../../components/index.tsx"
import { Event as EventComponent } from "../../../../components/index.tsx"
import { DefinedTerm as DefinedTermComponent } from "../../../../components/index.tsx"
import { GeospatialGeometry as GeospatialGeometryComponent } from "../../../../components/index.tsx"
import { AggregateRating as AggregateRatingComponent } from "../../../../components/index.tsx"
import { PostalAddress as PostalAddressComponent } from "../../../../components/index.tsx"
import { GeoCoordinates as GeoCoordinatesComponent } from "../../../../components/index.tsx"
import { GeoShape as GeoShapeComponent } from "../../../../components/index.tsx"
import { OpeningHoursSpecification as OpeningHoursSpecificationComponent } from "../../../../components/index.tsx"
import { PropertyValue as PropertyValueComponent } from "../../../../components/index.tsx"
import { LocationFeatureSpecification as LocationFeatureSpecificationComponent } from "../../../../components/index.tsx"
import { Place as PlaceComponent } from "../../../../components/index.tsx"

export type PlaceType =
	| "Place"
	| ResidenceType
	| LandformType
	| TouristAttractionType
	| AdministrativeAreaType
	| TouristDestinationType
	| CivicStructureType
	| LocalBusinessType
	| LandmarksOrHistoricalBuildingsType
	| AccommodationType

export interface PlaceProps {
	"@type"?: PlaceType
	additionalProperty?: PropertyValue | ReturnType<typeof PropertyValueComponent>
	address?: PostalAddress | Text | ReturnType<typeof PostalAddressComponent>
	aggregateRating?:
		| AggregateRating
		| ReturnType<typeof AggregateRatingComponent>
	amenityFeature?:
		| LocationFeatureSpecification
		| ReturnType<typeof LocationFeatureSpecificationComponent>
	branchCode?: Text
	containedIn?: Place | ReturnType<typeof PlaceComponent>
	containedInPlace?: Place | ReturnType<typeof PlaceComponent>
	containsPlace?: Place | ReturnType<typeof PlaceComponent>
	event?: Event | ReturnType<typeof EventComponent>
	events?: Event | ReturnType<typeof EventComponent>
	faxNumber?: Text
	geo?:
		| GeoCoordinates
		| GeoShape
		| ReturnType<typeof GeoCoordinatesComponent>
		| ReturnType<typeof GeoShapeComponent>
	geoContains?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoCoveredBy?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoCovers?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoCrosses?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoDisjoint?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoEquals?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoIntersects?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoOverlaps?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoTouches?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	geoWithin?:
		| GeospatialGeometry
		| Place
		| ReturnType<typeof GeospatialGeometryComponent>
		| ReturnType<typeof PlaceComponent>
	globalLocationNumber?: Text
	hasCertification?: Certification | ReturnType<typeof CertificationComponent>
	hasDriveThroughService?: Boolean
	hasGS1DigitalLink?: URL
	hasMap?: Map | URL | ReturnType<typeof MapComponent>
	isAccessibleForFree?: Boolean
	isicV4?: Text
	keywords?: DefinedTerm | Text | URL | ReturnType<typeof DefinedTermComponent>
	latitude?: Number | Text
	logo?: ImageObject | URL | ReturnType<typeof ImageObjectComponent>
	longitude?: Number | Text
	map?: URL
	maps?: URL
	maximumAttendeeCapacity?: Integer
	openingHoursSpecification?:
		| OpeningHoursSpecification
		| ReturnType<typeof OpeningHoursSpecificationComponent>
	photo?:
		| ImageObject
		| Photograph
		| ReturnType<typeof ImageObjectComponent>
		| ReturnType<typeof PhotographComponent>
	photos?:
		| ImageObject
		| Photograph
		| ReturnType<typeof ImageObjectComponent>
		| ReturnType<typeof PhotographComponent>
	publicAccess?: Boolean
	review?: Review | ReturnType<typeof ReviewComponent>
	reviews?: Review | ReturnType<typeof ReviewComponent>
	slogan?: Text
	smokingAllowed?: Boolean
	specialOpeningHoursSpecification?:
		| OpeningHoursSpecification
		| ReturnType<typeof OpeningHoursSpecificationComponent>
	telephone?: Text
	tourBookingPage?: URL
}

type Place = Thing & PlaceProps

export default Place
