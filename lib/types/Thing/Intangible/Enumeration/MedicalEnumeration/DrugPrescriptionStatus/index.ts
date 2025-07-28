import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

export interface DrugPrescriptionStatusProps {}

type DrugPrescriptionStatus =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& DrugPrescriptionStatusProps

export default DrugPrescriptionStatus
