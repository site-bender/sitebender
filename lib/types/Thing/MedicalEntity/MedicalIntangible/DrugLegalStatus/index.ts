import type AdministrativeArea from "../../../Place/AdministrativeArea/index.ts"
import type MedicalIntangible from "../index.ts"

export default interface DrugLegalStatus extends MedicalIntangible {
	/** The location in which the status applies. */
	applicableLocation?: AdministrativeArea
}
