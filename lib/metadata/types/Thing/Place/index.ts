import type { Boolean, Integer, Number, Text } from "../../DataType/index.ts"
import type { Event } from "../Event/index.ts"
import type {
	AggregateRating,
	Certification,
	GeoCoordinates,
	GeoShape,
	GeospatialGeometry,
	ImageObject,
	LocationFeatureSpecification,
	Map,
	OpeningHoursSpecification,
	Photograph,
	PostalAddress,
	PropertyValue,
	Review,
	Thing,
	URL,
} from "../index.ts"
import type { DefinedTerm } from "../Intangible/DefinedTerm/index.ts"

// Place interface - extends Thing
export interface Place extends Thing {
	additionalProperty?: PropertyValue
	address?: PostalAddress | Text
	aggregateRating?: AggregateRating
	amenityFeature?: LocationFeatureSpecification
	branchCode?: Text
	containedInPlace?: Place
	containsPlace?: Place
	event?: Event
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
	maximumAttendeeCapacity?: Integer
	openingHoursSpecification?: OpeningHoursSpecification
	photo?: ImageObject | Photograph
	publicAccess?: Boolean
	review?: Review
	slogan?: Text
	smokingAllowed?: Boolean
	specialOpeningHoursSpecification?: OpeningHoursSpecification
	telephone?: Text
	tourBookingPage?: URL
}
