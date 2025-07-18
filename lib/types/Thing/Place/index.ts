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

export interface PlaceProps {
	/** A property-value pair representing an additional characteristic of the entity, e.g. a product feature or another characteristic for which there is no matching property in schema.org.\n\nNote: Publishers should be aware that applications designed to use specific schema.org properties (e.g. https://schema.org/width, https://schema.org/color, https://schema.org/gtin13, ...) will typically expect such data to be provided using those properties, rather than using the generic property/value mechanism. */
	additionalProperty?: PropertyValue
	/** Physical address of the item. */
	address?: Text | PostalAddress
	/** The overall rating, based on a collection of reviews or ratings, of the item. */
	aggregateRating?: AggregateRating
	/** An amenity feature (e.g. a characteristic or service) of the Accommodation. This generic property does not make a statement about whether the feature is included in an offer for the main accommodation or available at extra costs. */
	amenityFeature?: LocationFeatureSpecification
	/** A short textual code (also called "store code") that uniquely identifies a place of business. The code is typically assigned by the parentOrganization and used in structured URLs.\n\nFor example, in the URL http://www.starbucks.co.uk/store-locator/etc/detail/3047 the code "3047" is a branchCode for a particular branch. */
	branchCode?: Text
	/** The basic containment relation between a place and one that contains it. */
	containedIn?: Place
	/** The basic containment relation between a place and one that contains it. */
	containedInPlace?: Place
	/** The basic containment relation between a place and another that it contains. */
	containsPlace?: Place
	/** Upcoming or past event associated with this place, organization, or action. */
	event?: Event
	/** Upcoming or past events associated with this place or organization. */
	events?: Event
	/** The fax number. */
	faxNumber?: Text
	/** The geo coordinates of the place. */
	geo?: GeoShape | GeoCoordinates
	/** Represents a relationship between two geometries (or the places they represent), relating a containing geometry to a contained geometry. "a contains b iff no points of b lie in the exterior of a, and at least one point of the interior of b lies in the interior of a". As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
	geoContains?: Place | GeospatialGeometry
	/** Represents a relationship between two geometries (or the places they represent), relating a geometry to another that covers it. As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
	geoCoveredBy?: GeospatialGeometry | Place
	/** Represents a relationship between two geometries (or the places they represent), relating a covering geometry to a covered geometry. "Every point of b is a point of (the interior or boundary of) a". As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
	geoCovers?: GeospatialGeometry | Place
	/** Represents a relationship between two geometries (or the places they represent), relating a geometry to another that crosses it: "a crosses b: they have some but not all interior points in common, and the dimension of the intersection is less than that of at least one of them". As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
	geoCrosses?: GeospatialGeometry | Place
	/** Represents spatial relations in which two geometries (or the places they represent) are topologically disjoint: "they have no point in common. They form a set of disconnected geometries." (A symmetric relationship, as defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM).) */
	geoDisjoint?: Place | GeospatialGeometry
	/** Represents spatial relations in which two geometries (or the places they represent) are topologically equal, as defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). "Two geometries are topologically equal if their interiors intersect and no part of the interior or boundary of one geometry intersects the exterior of the other" (a symmetric relationship). */
	geoEquals?: Place | GeospatialGeometry
	/** Represents spatial relations in which two geometries (or the places they represent) have at least one point in common. As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
	geoIntersects?: GeospatialGeometry | Place
	/** Represents a relationship between two geometries (or the places they represent), relating a geometry to another that geospatially overlaps it, i.e. they have some but not all points in common. As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
	geoOverlaps?: GeospatialGeometry | Place
	/** Represents spatial relations in which two geometries (or the places they represent) touch: "they have at least one boundary point in common, but no interior points." (A symmetric relationship, as defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM).) */
	geoTouches?: Place | GeospatialGeometry
	/** Represents a relationship between two geometries (or the places they represent), relating a geometry to one that contains it, i.e. it is inside (i.e. within) its interior. As defined in [DE-9IM](https://en.wikipedia.org/wiki/DE-9IM). */
	geoWithin?: Place | GeospatialGeometry
	/** The [Global Location Number](http://www.gs1.org/gln) (GLN, sometimes also referred to as International Location Number or ILN) of the respective organization, person, or place. The GLN is a 13-digit number used to identify parties and physical locations. */
	globalLocationNumber?: Text
	/** Certification information about a product, organization, service, place, or person. */
	hasCertification?: Certification
	/** Indicates whether some facility (e.g. [[FoodEstablishment]], [[CovidTestingFacility]]) offers a service that can be used by driving through in a car. In the case of [[CovidTestingFacility]] such facilities could potentially help with social distancing from other potentially-infected users. */
	hasDriveThroughService?: Boolean
	/** The <a href="https://www.gs1.org/standards/gs1-digital-link">GS1 digital link</a> associated with the object. This URL should conform to the particular requirements of digital links. The link should only contain the Application Identifiers (AIs) that are relevant for the entity being annotated, for instance a [[Product]] or an [[Organization]], and for the correct granularity. In particular, for products:<ul><li>A Digital Link that contains a serial number (AI <code>21</code>) should only be present on instances of [[IndividualProduct]]</li><li>A Digital Link that contains a lot number (AI <code>10</code>) should be annotated as [[SomeProduct]] if only products from that lot are sold, or [[IndividualProduct]] if there is only a specific product.</li><li>A Digital Link that contains a global model number (AI <code>8013</code>)  should be attached to a [[Product]] or a [[ProductModel]].</li></ul> Other item types should be adapted similarly. */
	hasGS1DigitalLink?: URL
	/** A URL to a map of the place. */
	hasMap?: URL | Map
	/** A flag to signal that the item, event, or place is accessible for free. */
	isAccessibleForFree?: Boolean
	/** The International Standard of Industrial Classification of All Economic Activities (ISIC), Revision 4 code for a particular organization, business person, or place. */
	isicV4?: Text
	/** Keywords or tags used to describe some item. Multiple textual entries in a keywords list are typically delimited by commas, or by repeating the property. */
	keywords?: URL | Text | DefinedTerm
	/** The latitude of a location. For example ```37.42242``` ([WGS 84](https://en.wikipedia.org/wiki/World_Geodetic_System)). */
	latitude?: Text | Number
	/** An associated logo. */
	logo?: URL | ImageObject
	/** The longitude of a location. For example ```-122.08585``` ([WGS 84](https://en.wikipedia.org/wiki/World_Geodetic_System)). */
	longitude?: Text | Number
	/** A URL to a map of the place. */
	map?: URL
	/** A URL to a map of the place. */
	maps?: URL
	/** The total number of individuals that may attend an event or venue. */
	maximumAttendeeCapacity?: Integer
	/** The opening hours of a certain place. */
	openingHoursSpecification?: OpeningHoursSpecification
	/** A photograph of this place. */
	photo?: ImageObject | Photograph
	/** Photographs of this place. */
	photos?: ImageObject | Photograph
	/** A flag to signal that the [[Place]] is open to public visitors.  If this property is omitted there is no assumed default boolean value. */
	publicAccess?: Boolean
	/** A review of the item. */
	review?: Review
	/** Review of the item. */
	reviews?: Review
	/** A slogan or motto associated with the item. */
	slogan?: Text
	/** Indicates whether it is allowed to smoke in the place, e.g. in the restaurant, hotel or hotel room. */
	smokingAllowed?: Boolean
	/** The special opening hours of a certain place.\n\nUse this to explicitly override general opening hours brought in scope by [[openingHoursSpecification]] or [[openingHours]]. */
	specialOpeningHoursSpecification?: OpeningHoursSpecification
	/** The telephone number. */
	telephone?: Text
	/** A page providing information on how to book a tour of some [[Place]], such as an [[Accommodation]] or [[ApartmentComplex]] in a real estate setting, as well as other kinds of tours as appropriate. */
	tourBookingPage?: URL
}

type Place = Thing & PlaceProps

export default Place
