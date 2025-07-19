import type { Number } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type QuantitativeValue from "../../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { AccommodationProps } from "../../index.ts"
import type { HouseProps } from "../index.ts"

export interface SingleFamilyResidenceProps {
	/** The number of rooms (excluding bathrooms and closets) of the accommodation or lodging business. Typical unit code(s): ROM for room or C62 for no unit. The type of room can be put in the unitText property of the QuantitativeValue. */
	numberOfRooms?: QuantitativeValue | Number
	/** The allowed total occupancy for the accommodation in persons (including infants etc). For individual accommodations, this is not necessarily the legal maximum but defines the permitted usage as per the contractual agreement (e.g. a double room used by a single person). Typical unit code(s): C62 for person. */
	occupancy?: QuantitativeValue
}

type SingleFamilyResidence =
	& Thing
	& AccommodationProps
	& HouseProps
	& PlaceProps
	& SingleFamilyResidenceProps

export default SingleFamilyResidence
