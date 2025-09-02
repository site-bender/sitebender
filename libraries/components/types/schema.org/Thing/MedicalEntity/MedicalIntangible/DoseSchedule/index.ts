import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type QualitativeValue from "../../../Intangible/Enumeration/QualitativeValue/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIntangibleProps } from "../index.ts"
import type { MaximumDoseScheduleType } from "./MaximumDoseSchedule/index.ts"
import type { RecommendedDoseScheduleType } from "./RecommendedDoseSchedule/index.ts"
import type { ReportedDoseScheduleType } from "./ReportedDoseSchedule/index.ts"

import { QualitativeValue as QualitativeValueComponent } from "../../../../../../components/index.tsx"

export type DoseScheduleType =
	| "DoseSchedule"
	| ReportedDoseScheduleType
	| RecommendedDoseScheduleType
	| MaximumDoseScheduleType

export interface DoseScheduleProps {
	"@type"?: DoseScheduleType
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
