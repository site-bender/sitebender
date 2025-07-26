import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIntangibleProps } from "../index.ts"
import type AdministrativeArea from "../../../Place/AdministrativeArea/index.ts"

export interface DrugLegalStatusProps {
	applicableLocation?: AdministrativeArea
}

type DrugLegalStatus =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& DrugLegalStatusProps

export default DrugLegalStatus
