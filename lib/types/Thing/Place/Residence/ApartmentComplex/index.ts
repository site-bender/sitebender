import type { Boolean, Number, Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { PlaceProps } from "../../index.ts"
import type { ResidenceProps } from "../index.ts"

export interface ApartmentComplexProps {
	/** Indicates the total (available plus unavailable) number of accommodation units in an [[ApartmentComplex]], or the number of accommodation units for a specific [[FloorPlan]] (within its specific [[ApartmentComplex]]). See also [[numberOfAvailableAccommodationUnits]]. */
	numberOfAccommodationUnits?: QuantitativeValue
	/** Indicates the number of available accommodation units in an [[ApartmentComplex]], or the number of accommodation units for a specific [[FloorPlan]] (within its specific [[ApartmentComplex]]). See also [[numberOfAccommodationUnits]]. */
	numberOfAvailableAccommodationUnits?: QuantitativeValue
	/** The total integer number of bedrooms in a some [[Accommodation]], [[ApartmentComplex]] or [[FloorPlan]]. */
	numberOfBedrooms?: Number | QuantitativeValue
	/** Indicates whether pets are allowed to enter the accommodation or lodging business. More detailed information can be put in a text value. */
	petsAllowed?: Boolean | Text
	/** A page providing information on how to book a tour of some [[Place]], such as an [[Accommodation]] or [[ApartmentComplex]] in a real estate setting, as well as other kinds of tours as appropriate. */
	tourBookingPage?: URL
}

type ApartmentComplex =
	& Thing
	& PlaceProps
	& ResidenceProps
	& ApartmentComplexProps

export default ApartmentComplex
