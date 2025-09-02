import type Thing from "../../../index.ts"
import type MedicalTest from "../../../MedicalEntity/MedicalTest/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { MedicalOrganizationProps } from "../index.ts"

import { MedicalTest as MedicalTestComponent } from "../../../../../../components/index.tsx"

export type DiagnosticLabType = "DiagnosticLab"

export interface DiagnosticLabProps {
	"@type"?: DiagnosticLabType
	availableTest?: MedicalTest | ReturnType<typeof MedicalTestComponent>
}

type DiagnosticLab =
	& Thing
	& OrganizationProps
	& MedicalOrganizationProps
	& DiagnosticLabProps

export default DiagnosticLab
