import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { MedicalOrganizationProps } from "../index.ts"
import type MedicalTest from "../../../MedicalEntity/MedicalTest/index.ts"

export interface DiagnosticLabProps {
	availableTest?: MedicalTest
}

type DiagnosticLab =
	& Thing
	& OrganizationProps
	& MedicalOrganizationProps
	& DiagnosticLabProps

export default DiagnosticLab
