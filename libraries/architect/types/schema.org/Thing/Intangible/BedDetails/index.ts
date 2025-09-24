import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type BedType from "../Enumeration/QualitativeValue/BedType/index.ts"
import type { IntangibleProps } from "../index.ts"

import BedTypeComponent from "../../../../../../codewright/src/define/Thing/Intangible/Enumeration/QualitativeValue/BedType/index.tsx"

export type BedDetailsType = "BedDetails"

export interface BedDetailsProps {
	"@type"?: BedDetailsType
	numberOfBeds?: Number
	typeOfBed?: BedType | Text | ReturnType<typeof BedTypeComponent>
}

type BedDetails = Thing & IntangibleProps & BedDetailsProps

export default BedDetails
