import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type BedType from "../Enumeration/QualitativeValue/BedType/index.ts"

import BedDetailsComponent from "../../../../../components/Thing/Intangible/BedDetails/index.tsx"

export interface BedDetailsProps {
	numberOfBeds?: Number
	typeOfBed?: BedType | Text
}

type BedDetails =
	& Thing
	& IntangibleProps
	& BedDetailsProps

export default BedDetails
