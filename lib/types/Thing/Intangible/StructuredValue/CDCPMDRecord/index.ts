import type {
	Date,
	DateTime,
	Number,
	Text,
} from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"

import CDCPMDRecordComponent from "../../../../../../components/Thing/Intangible/StructuredValue/CDCPMDRecord/index.tsx"

export interface CDCPMDRecordProps {
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
