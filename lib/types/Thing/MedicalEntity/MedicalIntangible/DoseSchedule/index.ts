import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type QualitativeValue from "../../../Intangible/Enumeration/QualitativeValue/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIntangibleProps } from "../index.ts"

import QualitativeValueComponent from "../../../../../components/Thing/Intangible/Enumeration/QualitativeValue/index.ts"

export interface DoseScheduleProps {
	"@type"?: "DoseSchedule"
	doseUnit?: Text
	doseValue?:
		| Number
		| QualitativeValue
		| ReturnType<typeof QualitativeValueComponent>
	frequency?: Text
	targetPopulation?: Text
}

type DoseSchedule =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& DoseScheduleProps

export default DoseSchedule
