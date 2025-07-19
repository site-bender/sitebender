import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type BedType from "../Enumeration/QualitativeValue/BedType/index.ts"
import type { IntangibleProps } from "../index.ts"

export interface BedDetailsProps {
	/** The quantity of the given bed type available in the HotelRoom, Suite, House, or Apartment. */
	numberOfBeds?: Number
	/** The type of bed to which the BedDetail refers, i.e. the type of bed available in the quantity indicated by quantity. */
	typeOfBed?: BedType | Text
}

type BedDetails =
	& Thing
	& IntangibleProps
	& BedDetailsProps

export default BedDetails
