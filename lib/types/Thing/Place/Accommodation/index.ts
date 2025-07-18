import type {
	Boolean,
	Integer,
	Number,
	Text,
	URL,
} from "../../../DataType/index.ts"
import type BedDetails from "../../Intangible/BedDetails/index.ts"
import type BedType from "../../Intangible/Enumeration/QualitativeValue/BedType/index.ts"
import type FloorPlan from "../../Intangible/FloorPlan/index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type LocationFeatureSpecification from "../../Intangible/StructuredValue/PropertyValue/LocationFeatureSpecification/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Place from "../index.ts"

export default interface Accommodation extends Place {
	/** Category of an [[Accommodation]], following real estate conventions, e.g. RESO (see [PropertySubType](https://ddwiki.reso.org/display/DDW17/PropertySubType+Field), and [PropertyType](https://ddwiki.reso.org/display/DDW17/PropertyType+Field) fields  for suggested values). */
	accommodationCategory?: Text
	/** A floorplan of some [[Accommodation]]. */
	accommodationFloorPlan?: FloorPlan
	/** An amenity feature (e.g. a characteristic or service) of the Accommodation. This generic property does not make a statement about whether the feature is included in an offer for the main accommodation or available at extra costs. */
	amenityFeature?: LocationFeatureSpecification
	/** The type of bed or beds included in the accommodation. For the single case of just one bed of a certain type, you use bed directly with a text.       If you want to indicate the quantity of a certain kind of bed, use an instance of BedDetails. For more detailed information, use the amenityFeature property. */
	bed?: Text | BedDetails | BedType
	/** The floor level for an [[Accommodation]] in a multi-storey building. Since counting   systems [vary internationally](https://en.wikipedia.org/wiki/Storey#Consecutive_number_floor_designations), the local system should be used where possible. */
	floorLevel?: Text
	/** The size of the accommodation, e.g. in square meter or squarefoot. Typical unit code(s): MTK for square meter, FTK for square foot, or YDK for square yard. */
	floorSize?: QuantitativeValue
	/** Length of the lease for some [[Accommodation]], either particular to some [[Offer]] or in some cases intrinsic to the property. */
	leaseLength?: Duration | QuantitativeValue
	/** The total integer number of bathrooms in some [[Accommodation]], following real estate conventions as [documented in RESO](https://ddwiki.reso.org/display/DDW17/BathroomsTotalInteger+Field): "The simple sum of the number of bathrooms. For example for a property with two Full Bathrooms and one Half Bathroom, the Bathrooms Total Integer will be 3.". See also [[numberOfRooms]]. */
	numberOfBathroomsTotal?: Integer
	/** The total integer number of bedrooms in a some [[Accommodation]], [[ApartmentComplex]] or [[FloorPlan]]. */
	numberOfBedrooms?: Number | QuantitativeValue
	/** Number of full bathrooms - The total number of full and ¾ bathrooms in an [[Accommodation]]. This corresponds to the [BathroomsFull field in RESO](https://ddwiki.reso.org/display/DDW17/BathroomsFull+Field). */
	numberOfFullBathrooms?: Number
	/** Number of partial bathrooms - The total number of half and ¼ bathrooms in an [[Accommodation]]. This corresponds to the [BathroomsPartial field in RESO](https://ddwiki.reso.org/display/DDW17/BathroomsPartial+Field). */
	numberOfPartialBathrooms?: Number
	/** The number of rooms (excluding bathrooms and closets) of the accommodation or lodging business. Typical unit code(s): ROM for room or C62 for no unit. The type of room can be put in the unitText property of the QuantitativeValue. */
	numberOfRooms?: QuantitativeValue | Number
	/** The allowed total occupancy for the accommodation in persons (including infants etc). For individual accommodations, this is not necessarily the legal maximum but defines the permitted usage as per the contractual agreement (e.g. a double room used by a single person). Typical unit code(s): C62 for person. */
	occupancy?: QuantitativeValue
	/** Indications regarding the permitted usage of the accommodation. */
	permittedUsage?: Text
	/** Indicates whether pets are allowed to enter the accommodation or lodging business. More detailed information can be put in a text value. */
	petsAllowed?: Boolean | Text
	/** A page providing information on how to book a tour of some [[Place]], such as an [[Accommodation]] or [[ApartmentComplex]] in a real estate setting, as well as other kinds of tours as appropriate. */
	tourBookingPage?: URL
	/** The year an [[Accommodation]] was constructed. This corresponds to the [YearBuilt field in RESO](https://ddwiki.reso.org/display/DDW17/YearBuilt+Field). */
	yearBuilt?: Number
}
