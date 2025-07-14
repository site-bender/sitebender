import { Number, Text } from "../../../DataType/index.ts"
import BedType from "../Enumeration/QualitativeValue/BedType/index.ts"
import Intangible from "../index.ts"

export default interface BedDetails extends Intangible {
	/** The quantity of the given bed type available in the HotelRoom, Suite, House, or Apartment. */
	numberOfBeds?: Number
	/** The type of bed to which the BedDetail refers, i.e. the type of bed available in the quantity indicated by quantity. */
	typeOfBed?: BedType | Text
}
