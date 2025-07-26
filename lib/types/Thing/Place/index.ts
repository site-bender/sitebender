import type {
	Boolean,
	Integer,
	Number,
	Text,
	URL,
} from "../../DataType/index.ts"
import type Thing from "../index.ts"
import type AggregateRating from "../Intangible/Rating/AggregateRating/index.ts"
import type Certification from "../CreativeWork/Certification/index.ts"
import type DefinedTerm from "../Intangible/DefinedTerm/index.ts"
import type Event from "../Event/index.ts"
import type GeoCoordinates from "../Intangible/StructuredValue/GeoCoordinates/index.ts"
import type GeoShape from "../Intangible/StructuredValue/GeoShape/index.ts"
import type GeospatialGeometry from "../Intangible/GeospatialGeometry/index.ts"
import type ImageObject from "../CreativeWork/MediaObject/ImageObject/index.ts"
import type LocationFeatureSpecification from "../Intangible/StructuredValue/PropertyValue/LocationFeatureSpecification/index.ts"
import type Map from "../CreativeWork/Map/index.ts"
import type OpeningHoursSpecification from "../Intangible/StructuredValue/OpeningHoursSpecification/index.ts"
import type Photograph from "../CreativeWork/Photograph/index.ts"
import type PostalAddress from "../Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import type PropertyValue from "../Intangible/StructuredValue/PropertyValue/index.ts"
import type Review from "../CreativeWork/Review/index.ts"

export interface PlaceProps {
	additionalProperty?: PropertyValue
	address?: PostalAddress | Text
	aggregateRating?: AggregateRating
	amenityFeature?: LocationFeatureSpecification
	branchCode?: Text
	containedIn?: Place
	containedInPlace?: Place
	containsPlace?: Place
	event?: Event
	events?: Event
	faxNumber?: Text
	geo?: GeoCoordinates | GeoShape
	geoContains?: GeospatialGeometry | Place
	geoCoveredBy?: GeospatialGeometry | Place
	geoCovers?: GeospatialGeometry | Place
	geoCrosses?: GeospatialGeometry | Place
	geoDisjoint?: GeospatialGeometry | Place
	geoEquals?: GeospatialGeometry | Place
	geoIntersects?: GeospatialGeometry | Place
	geoOverlaps?: GeospatialGeometry | Place
	geoTouches?: GeospatialGeometry | Place
	geoWithin?: GeospatialGeometry | Place
	globalLocationNumber?: Text
	hasCertification?: Certification
	hasDriveThroughService?: Boolean
	hasGS1DigitalLink?: URL
	hasMap?: Map | URL
	isAccessibleForFree?: Boolean
	isicV4?: Text
	keywords?: DefinedTerm | Text | URL
	latitude?: Number | Text
	logo?: ImageObject | URL
	longitude?: Number | Text
	map?: URL
	maps?: URL
	maximumAttendeeCapacity?: Integer
	openingHoursSpecification?: OpeningHoursSpecification
	photo?: ImageObject | Photograph
	photos?: ImageObject | Photograph
	publicAccess?: Boolean
	review?: Review
	reviews?: Review
	slogan?: Text
	smokingAllowed?: Boolean
	specialOpeningHoursSpecification?: OpeningHoursSpecification
	telephone?: Text
	tourBookingPage?: URL
}

type Place =
	& Thing
	& PlaceProps

export default Place
