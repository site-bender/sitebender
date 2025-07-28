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

import CertificationComponent from "../../../components/Thing/CreativeWork/Certification/index.ts"
import MapComponent from "../../../components/Thing/CreativeWork/Map/index.ts"
import ImageObjectComponent from "../../../components/Thing/CreativeWork/MediaObject/ImageObject/index.ts"
import PhotographComponent from "../../../components/Thing/CreativeWork/Photograph/index.ts"
import ReviewComponent from "../../../components/Thing/CreativeWork/Review/index.ts"
import EventComponent from "../../../components/Thing/Event/index.ts"
import DefinedTermComponent from "../../../components/Thing/Intangible/DefinedTerm/index.ts"
import GeospatialGeometryComponent from "../../../components/Thing/Intangible/GeospatialGeometry/index.ts"
import AggregateRatingComponent from "../../../components/Thing/Intangible/Rating/AggregateRating/index.ts"
import PostalAddressComponent from "../../../components/Thing/Intangible/StructuredValue/ContactPoint/PostalAddress/index.ts"
import GeoCoordinatesComponent from "../../../components/Thing/Intangible/StructuredValue/GeoCoordinates/index.ts"
import GeoShapeComponent from "../../../components/Thing/Intangible/StructuredValue/GeoShape/index.ts"
import OpeningHoursSpecificationComponent from "../../../components/Thing/Intangible/StructuredValue/OpeningHoursSpecification/index.ts"
import PropertyValueComponent from "../../../components/Thing/Intangible/StructuredValue/PropertyValue/index.ts"
import LocationFeatureSpecificationComponent from "../../../components/Thing/Intangible/StructuredValue/PropertyValue/LocationFeatureSpecification/index.ts"
import PlaceComponent from "../../../components/Thing/Place/index.ts"

export interface PlaceProps {
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
