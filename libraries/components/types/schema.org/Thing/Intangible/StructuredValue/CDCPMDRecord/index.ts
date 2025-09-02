import type {
	Date,
	DateTime,
	Number,
	Text,
} from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"

export type CDCPMDRecordType = "CDCPMDRecord"

export interface CDCPMDRecordProps {
	"@type"?: CDCPMDRecordType
	cvdCollectionDate?: DateTime | Text
	cvdFacilityCounty?: Text
	cvdFacilityId?: Text
	cvdNumBeds?: Number
	cvdNumBedsOcc?: Number
	cvdNumC19Died?: Number
	cvdNumC19HOPats?: Number
	cvdNumC19HospPats?: Number
	cvdNumC19MechVentPats?: Number
	cvdNumC19OFMechVentPats?: Number
	cvdNumC19OverflowPats?: Number
	cvdNumICUBeds?: Number
	cvdNumICUBedsOcc?: Number
	cvdNumTotBeds?: Number
	cvdNumVent?: Number
	cvdNumVentUse?: Number
	datePosted?: Date | DateTime
}

type CDCPMDRecord =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& CDCPMDRecordProps

export default CDCPMDRecord
