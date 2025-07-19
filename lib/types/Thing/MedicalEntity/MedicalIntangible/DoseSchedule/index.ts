import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type QualitativeValue from "../../../Intangible/Enumeration/QualitativeValue/index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIntangibleProps } from "../index.ts"

export interface DoseScheduleProps {
	/** The unit of the dose, e.g. 'mg'. */
	doseUnit?: Text
	/** The value of the dose, e.g. 500. */
	doseValue?: QualitativeValue | Number
	/** How often the dose is taken, e.g. 'daily'. */
	frequency?: Text
	/** Characteristics of the population for which this is intended, or which typically uses it, e.g. 'adults'. */
	targetPopulation?: Text
}

type DoseSchedule =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& DoseScheduleProps

export default DoseSchedule
