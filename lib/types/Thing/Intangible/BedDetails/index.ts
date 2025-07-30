import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type BedType from "../Enumeration/QualitativeValue/BedType/index.ts"
import type { IntangibleProps } from "../index.ts"

import BedTypeComponent from "../../../../components/Thing/Intangible/Enumeration/QualitativeValue/BedType/index.ts"

export interface BedDetailsProps {
	"@type"?: "BedDetails"
	numberOfBeds?: Number
	typeOfBed?: BedType | Text | ReturnType<typeof BedTypeComponent>
}

type BedDetails = Thing & IntangibleProps & BedDetailsProps

export default BedDetails
