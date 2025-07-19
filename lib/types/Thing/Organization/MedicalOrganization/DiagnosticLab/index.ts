import type Thing from "../../../index.ts"
import type MedicalTest from "../../../MedicalEntity/MedicalTest/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { MedicalOrganizationProps } from "../index.ts"

export interface DiagnosticLabProps {
	/** A diagnostic test or procedure offered by this lab. */
	availableTest?: MedicalTest
}

type DiagnosticLab =
	& Thing
	& MedicalOrganizationProps
	& OrganizationProps
	& DiagnosticLabProps

export default DiagnosticLab
