import { Number, Text } from "../../../../DataType/index.ts"
import QualitativeValue from "../../../Intangible/Enumeration/QualitativeValue/index.ts"
import MedicalIntangible from "../index.ts"

export default interface DoseSchedule extends MedicalIntangible {
	/** The unit of the dose, e.g. 'mg'. */
	doseUnit?: Text
	/** The value of the dose, e.g. 500. */
	doseValue?: QualitativeValue | Number
	/** How often the dose is taken, e.g. 'daily'. */
	frequency?: Text
	/** Characteristics of the population for which this is intended, or which typically uses it, e.g. 'adults'. */
	targetPopulation?: Text
}
